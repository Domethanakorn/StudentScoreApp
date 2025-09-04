using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentScoreApp.Server.Data;
using StudentScoreApp.Server.Models;
namespace StudentScoreApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentDb _studentDb;

        public  StudentsController(StudentDb studentDb)
        {
            _studentDb = studentDb;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var students = await _studentDb.Students.ToListAsync();
            return Ok(students);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Student student)
        {
            // ตรวจว่า IdCard ซ้้าไหม
            var exists = await _studentDb.Students
                .AnyAsync(s => s.IdCard == student.IdCard);

            if (exists)
            {
                return BadRequest(new { message = "This ID card number is already in use." });
            }

            await _studentDb.AddAsync(student);
            await _studentDb.SaveChangesAsync();

            return Ok(student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Student student)
        {
            var existing =  await _studentDb.Students.FindAsync(id);
            if (existing == null) return NotFound(new {message ="Student not found"});

            existing.Name = student.Name;
            existing.Address = student.Address;
            existing.MathScore = student.MathScore;
            existing.ScienceScore = student.ScienceScore;
            existing.HistoryScore = student.HistoryScore;
            existing.ArtScore = student.ArtScore;
            existing.EnglishScore = student.EnglishScore;
            existing.TotalScore = student.TotalScore;
            await _studentDb.SaveChangesAsync();
            return Ok(existing);

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _studentDb.Students.FindAsync(id);
            if (student == null) return NotFound(new {message = "Student not found"});
            _studentDb.Students.Remove(student);
            await _studentDb.SaveChangesAsync();
            return Ok(student);
        }
    }
}
