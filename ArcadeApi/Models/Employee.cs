using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Employees")]
public class Employee
{
    [Key]
    public int EmployeeID { get; set; }
    public string Name { get; set; }
    public string Role { get; set; }
    public int Email { get; set; } // Matches INTEGER type in SQL
}