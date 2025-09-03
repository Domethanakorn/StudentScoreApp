using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentScoreApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddScoreToStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Score",
                table: "Students",
                newName: "TotalScore");

            migrationBuilder.AddColumn<int>(
                name: "ArtScore",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateAt",
                table: "Students",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "EnglishScore",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HistoryScore",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MathScore",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScienceScore",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArtScore",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CreateAt",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "EnglishScore",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "HistoryScore",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "MathScore",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ScienceScore",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "TotalScore",
                table: "Students",
                newName: "Score");
        }
    }
}
