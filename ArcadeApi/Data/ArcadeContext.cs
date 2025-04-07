using Microsoft.EntityFrameworkCore;
using ArcadeApi.Models;

namespace ArcadeApi.Data
{
    public class ArcadeContext : DbContext
    {
        public ArcadeContext(DbContextOptions<ArcadeContext> options)
            : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Play> Plays { get; set; }
        public DbSet<Employee> Employees { get; set; }
    }
}