import React, { useState,useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Eye } from "lucide-react";
import StudentForm from "./StudentForm";
import ReactPaginate from "react-paginate";

function StudentList({ students, searchTerm, reload }) {
    const [editStudent, setEditStudent] = useState(null);
    const [detailStudent, setDetailStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // เริ่มที่หน้า 0 (ตาม react-paginate)
    const itemsPerPage = 13; // จำนวนรายการต่อหน้า

    const deleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`https://localhost:7061/Students/${id}`);
            alert("Deleted success")
            reload();
        } catch (err) {
            console.error(err);
            alert("Failed to delete student");
        }
    };

    // กรองข้อมูลตาม searchTerm
    const filteredStudents = searchTerm
        ? students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : students;

    // คำนวณข้อมูลที่แสดงในหน้าปัจจุบัน
    const offset = currentPage * itemsPerPage;
    const currentStudents = filteredStudents.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredStudents.length / itemsPerPage);

    // เปลี่ยนหน้า
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
            <table className="min-w-full w-full table-auto border-collapse border border-gray-300 bg-white rounded-md shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border border-gray-300 text-left">ID</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Name</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Totalscore (max100)</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Address</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">CreateAt</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.length > 0 ? (
                        currentStudents.map((s) => (
                            <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-2 px-4 border border-gray-300">{s.id}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.name}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.totalScore}</td>
                                <td className="py-2 px-4 border border-gray-300">{s.address}</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    {new Date(s.createAt + "Z").toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                                </td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setDetailStudent(s)}
                                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                            title="Detail score"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setEditStudent(s)}
                                            className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteStudent(s.id)}
                                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
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
                        <h2 className="text-lg font-semibold mb-2">Score Detail</h2>
                        <p><b>Math:</b> {detailStudent.mathScore}</p>
                        <p><b>Science:</b> {detailStudent.scienceScore}</p>
                        <p><b>History:</b> {detailStudent.historyScore}</p>
                        <p><b>Art:</b> {detailStudent.artScore}</p>
                        <p><b>English:</b> {detailStudent.englishScore}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setDetailStudent(null)}
                                className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
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