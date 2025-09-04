namespace StudentScoreApp.Server.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IdCard { get; set; }
        public int TotalScore { get; set; } // คะแนนรวม
        public string Address { get; set; }


        public int? MathScore { get; set; }
        public int? ScienceScore { get; set; }
        public int? HistoryScore { get; set; }
        public int? ArtScore { get; set; }
        public int? EnglishScore { get; set; }

        public string Room { get; set; } //ห้องเรียน

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}