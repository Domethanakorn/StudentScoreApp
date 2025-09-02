import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm({ reload, student, onClose }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [address, setAddress] = useState("");

    // ถ้ามี student ส่งเข้ามา (edit) ให้เติมค่า default และเปิด popup
    useEffect(() => {
        if (student) {
            setOpen(true);
            setName(student.name);
            setScore(student.score);
            setAddress(student.address);
        }
    }, [student]);

    const saveStudent = async () => {
        if (!name || !score || !address) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (student) {
                // Edit
                await axios.put(`https://localhost:7061/Students/${student.id}`, {
                    name,
                    score: parseInt(score),
                    address,
                });
            } else {
                // Add
                await axios.post("https://localhost:7061/Students", {
                    name,
                    score: parseInt(score),
                    address,
                });
            }
            setName("");
            setScore("");
            setAddress("");
            setOpen(false);
            if (onClose) onClose(); // ปิด popup ของ parent
            reload();
        } catch (err) {
            console.error(err);
            alert("Failed to save student");
        }
    };

    return (
        <>
            {!student && (
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
                >
                    Add Student
                </button>
            )}

            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black opacity-20"
                        onClick={() => { setOpen(false); if (onClose) onClose(); }}
                    ></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">{student ? "Edit Student" : "Add Student"}</h2>

                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Score"
                            type="number"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            min={0}
                            max={20}
                        />
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => { setOpen(false); if (onClose) onClose(); }}
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveStudent}
                                className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StudentForm;
