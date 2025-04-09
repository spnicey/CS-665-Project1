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

        public PlaysController(ArcadeContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Play>>> GetPlays()
        {
            return await _context.Plays
                .Include(p => p.Player)
                .Include(p => p.Game)
                .ToListAsync();
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