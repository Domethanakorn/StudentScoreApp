using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentScoreApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRoomToStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Room",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Room",
                table: "Students");
        }
    }
}
