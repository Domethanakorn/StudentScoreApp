import React, { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import StudentForm from "./StudentForm";

function StudentList({ students, reload }) {
    const [editStudent, setEditStudent] = useState(null);

    const deleteStudent = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`https://localhost:7061/Students/${id}`);
            reload();
        } catch (err) {
            console.error(err);
            alert("Failed to delete student");
        }
    };

    return (
        <div className="overflow-x-auto overflow-y-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white rounded-md shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border border-gray-300 text-left">#</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Name</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Score</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Address</th>
                        <th className="py-2 px-4 border border-gray-300 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((s, index) => (
                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                            <td className="py-2 px-4 border border-gray-300">{s.name}</td>
                            <td className="py-2 px-4 border border-gray-300">{s.score}</td>
                            <td className="py-2 px-4 border border-gray-300">{s.address}</td>
                            <td className="py-2 px-4 border border-gray-300">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditStudent(s)}
                                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteStudent(s.id)}
                                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit popup */}
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
