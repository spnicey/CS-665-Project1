using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArcadeApi.Data;
using ArcadeApi.Models;

namespace ArcadeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaysController : ControllerBase
    {
        private readonly ArcadeContext _context;
        private readonly ILogger<PlaysController> _logger;

        public PlaysController(ArcadeContext context, ILogger<PlaysController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Play>>> GetPlays()
        {
            try
            {
                _logger.LogInformation("Starting to retrieve plays");
                
                var plays = await _context.Plays
                    .Include(p => p.Player)
                    .Include(p => p.Game)
                    .Select(p => new Play
                    {
                        PlayID = p.PlayID,
                        PlayerID = p.PlayerID,
                        GameID = p.GameID,
                        Score = p.Score,
                        Player = p.Player != null ? new Player 
                        { 
                            PlayerID = p.Player.PlayerID,
                            Name = p.Player.Name,
                            Membership = p.Player.Membership,
                            Balance = p.Player.Balance
                        } : null,
                        Game = p.Game != null ? new Game
                        {
                            GameID = p.Game.GameID,
                            Name = p.Game.Name,
                            Type = p.Game.Type,
                            Cost = p.Game.Cost
                        } : null
                    })
                    .ToListAsync();
                
                _logger.LogInformation($"Successfully retrieved {plays.Count} plays");
                return plays;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving plays: {Message}", ex.Message);
                _logger.LogError("Stack trace: {StackTrace}", ex.StackTrace);
                return StatusCode(500, new { error = "An error occurred while retrieving plays", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Play>> GetPlay(int id)
        {
            var play = await _context.Plays
                .Include(p => p.Player)
                .Include(p => p.Game)
                .FirstOrDefaultAsync(p => p.PlayID == id);

            if (play == null)
            {
                return NotFound();
            }

            return play;
        }

        [HttpPost]
        public async Task<ActionResult<Play>> PostPlay(Play play)
        {
            try
            {
                // Get the game to check its cost
                var game = await _context.Games.FindAsync(play.GameID);
                if (game == null)
                {
                    return BadRequest("Game not found");
                }

                // Get the player to check and update balance
                var player = await _context.Players.FindAsync(play.PlayerID);
                if (player == null)
                {
                    return BadRequest("Player not found");
                }

                // Calculate cost based on membership level
                float finalCost = CalculateDiscountedCost(game, player.Membership);

                // Check if player has enough balance
                if (player.Balance < finalCost)
                {
                    return BadRequest($"Insufficient balance. Required: ${finalCost:F2}");
                }

                // Update player's balance
                player.Balance -= finalCost;
                _context.Entry(player).State = EntityState.Modified;

                // Add the play record
                _context.Plays.Add(play);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetPlay), new { id = play.PlayID }, play);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating play record");
                return StatusCode(500, new { error = "Failed to create play record", details = ex.Message });
            }
        }

        private float CalculateDiscountedCost(Game game, int membershipLevel)
        {
            switch (membershipLevel)
            {
                case 0: // Basic
                    return game.Cost;

                case 1: // Premium
                    return game.Cost * 0.5f; // 50% off all games

                case 2: // VIP
                    // Free for classic games, 50% off others
                    if (game.Type.ToLower() == "classic")
                    {
                        return 0;
                    }
                    return game.Cost * 0.5f;

                default:
                    return game.Cost;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlay(int id, Play play)
        {
            if (id != play.PlayID)
            {
                return BadRequest();
            }
            _context.Entry(play).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlay(int id)
        {
            var play = await _context.Plays.FindAsync(id);
            if (play == null)
            {
                return NotFound();
            }
            _context.Plays.Remove(play);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}