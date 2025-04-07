using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Players")]
public class Player
{
    [Key]
    public int PlayerID { get; set; }
    public string Name { get; set; }
    public int Membership { get; set; }
    public float Balance { get; set; }
}