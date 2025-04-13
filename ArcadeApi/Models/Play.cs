using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcadeApi.Models
{
    [Table("Plays")]
    public class Play
    {
        [Key]
        public int PlayID { get; set; }

        [ForeignKey("Player")]
        public int PlayerID { get; set; }
        public Player? Player { get; set; } // Made optional by removing required and adding ?

        [ForeignKey("Game")]
        public int GameID { get; set; }
        public Game? Game { get; set; } // Made optional by removing required and adding ?

        public int Score { get; set; }
    }
}