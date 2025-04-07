using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcadeApi.Models
{
    [Table("Players")]
    public class Player
    {
        [Key]
        public int PlayerID { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Membership { get; set; }
        public float Balance { get; set; }

        // Initialize an empty collection
        //this is for the relationship with Play (as per the suggestion of copilot)
        public ICollection<Play> Plays { get; set; } = new List<Play>();
    }
}