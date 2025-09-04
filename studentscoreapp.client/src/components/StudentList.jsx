import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Eye } from "lucide-react";
import StudentForm from "./StudentForm";
import ReactPaginate from "react-paginate";

function StudentList({ students, searchTerm, reload }) {
    const [editStudent, setEditStudent] = useState(null);
    const [detailStudent, setDetailStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState("");
    const itemsPerPage = 13;

    // Get unique rooms from students data
    const uniqueRooms = [...new Set(students.map(student => student.room || "N/A"))].sort();

    const deleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`https://localhost:7061/Students/${id}`);
            alert("Deleted successfully");
            reload();
        } catch (err) {
            console.error(err);
            alert("Failed to delete student");
        }
    };

    // Filter students by search term and selected room
    const filteredStudents = students.filter(student => {
        const matchesSearch = searchTerm
            ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.idCard?.toLowerCase().includes(searchTerm.toLowerCase()) // Include idCard in search
            : true;
        const matchesRoom = selectedRoom
            ? (student.room || "N/A") === selectedRoom
            : true;
        return matchesSearch && matchesRoom;
    });

    const offset = currentPage * itemsPerPage;
    const currentStudents = filteredStudents.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredStudents.length / itemsPerPage);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    useEffect(() => {
        if (currentPage >= pageCount) {
            setCurrentPage(0);
        }
    }, [filteredStudents, pageCount]);

    return (
        <div className="overflow-x-auto overflow-y-auto">
            {/* Room Filter Dropdown */}
            <div className="mb-4 flex items-center gap-4">
                <label htmlFor="roomFilter" className="font-semibold text-gray-700">
                    Filter by Room:
                </label>
                <select
                    id="roomFilter"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Rooms ({students.length})</option>
                    {uniqueRooms.map((room) => (
                        <option key={room} value={room}>
                            {room} ({students.filter(s => (s.room || "N/A") === room).length})
                        </option>
                    ))}
                </select>
                <span className="text-gray-600">
                    Showing {filteredStudents.length} students
                </span>
            </div>

            <table className="min-w-full w-full table-auto border-collapse border border-gray-300 bg-white rounded-md shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border border-gray-300 text-left">ID</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Name</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">ID Card</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Total Score</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Address</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Room</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Created At</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.length > 0 ? (
                        currentStudents.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-2 px-4 border border-gray-300">{s.id}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.name}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.idCard || "N/A"}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.totalScore}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.address}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.room || "N/A"}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {new Date(s.createAt + "Z").toLocaleDateString("en-GB", { timeZone: "Asia/Bangkok" })}
                                </td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <div className="flex justify-start gap-2 text-sm">
                                        <button
                                            onClick={() => setDetailStudent(s)}
                                            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                            title="Detail score"
                                        >
                                            <Eye className="w-3 h-3" />
                                            <span>Details</span>
                                        </button>
                                        <button
                                            onClick={() => setEditStudent(s)}
                                            className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                            title="Edit"
                                        >
                                            <Pencil className="w-3 h-3" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(s.id)}
                                            className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {filteredStudents.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"flex items-center gap-2"}
                        activeClassName={"bg-blue-500 text-white"}
                        pageClassName={"px-3 py-1 rounded-md bg-blue-200"}
                        previousClassName={"px-3 py-1 rounded-md bg-gray-200"}
                        nextClassName={"px-3 py-1 rounded-md bg-gray-200"}
                        disabledClassName={"opacity-50 cursor-not-allowed"}
                        forcePage={currentPage}
                    />
                </div>
            )}

            {detailStudent && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">Student Details</h2>
                        <div className="space-y-2">
                      
                            <p>
                                <span className="font-semibold">Math:</span> {detailStudent.mathScore || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Science:</span> {detailStudent.scienceScore || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">History:</span> {detailStudent.historyScore || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Art:</span> {detailStudent.artScore || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">English:</span> {detailStudent.englishScore || "N/A"}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setDetailStudent(null)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editStudent && (
                <StudentForm
                    reload={reload}
                    student={editStudent}
                    onClose={() => setEditStudent(null)}
                />
            )}
        </div>
    );
}

export default StudentList;