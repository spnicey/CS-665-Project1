using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Plays")]
public class Play
{
    [Key]
    public int PlayID { get; set; }

    [ForeignKey("Player")]
    public int PlayerID { get; set; }
    public Player Player { get; set; } // Matches the Player class

    [ForeignKey("Game")]
    public int GameID { get; set; }
    public Game Game { get; set; } // Matches the Game class

    public int Score { get; set; }
}