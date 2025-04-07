using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Games")]
public class Game
{
    [Key]
    public int GameID { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public float Cost { get; set; }
}