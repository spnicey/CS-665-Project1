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
            _context.Plays.Add(play);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlay), new { id = play.PlayID }, play);
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