using Microsoft.EntityFrameworkCore;
using StudentScoreApp.Server.Models;

namespace StudentScoreApp.Server.Data
{
    public class StudentDb : DbContext

    {
        public StudentDb(DbContextOptions<StudentDb> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
        
    }
}
