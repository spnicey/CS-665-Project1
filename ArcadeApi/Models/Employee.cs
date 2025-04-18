using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ArcadeApi.Models
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int EmployeeID { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }

        //I accidentaly made this an int in the DB, but it should be a string.
        //From what I understand, this shouldn't cause any issues (since the project is small)
        //sqlite is loosely typed, so this is technically allowed
        public string? Email { get; set; } // Matches INTEGER type in SQL
    }
}
//classes were generated by using Claude and then slightly modified