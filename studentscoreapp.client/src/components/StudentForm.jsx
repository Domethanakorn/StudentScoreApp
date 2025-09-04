import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm({ reload, student, onClose }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [idCard, setIdCard] = useState("");
    const [mathScore, setMathScore] = useState("");
    const [scienceScore, setScienceScore] = useState("");
    const [historyScore, setHistoryScore] = useState("");
    const [artScore, setArtScore] = useState("");
    const [englishScore, setEnglishScore] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
        if (student) {
            setOpen(true);
            setName(student.name);
            setAddress(student.address);
            setIdCard(student.idCard || "");
            setMathScore(student.mathScore || "");
            setScienceScore(student.scienceScore || "");
            setHistoryScore(student.historyScore || "");
            setArtScore(student.artScore || "");
            setEnglishScore(student.englishScore || "");
            setRoom(student.room || "");
        } else {
            setName("");
            setAddress("");
            setIdCard("");
            setMathScore("");
            setScienceScore("");
            setHistoryScore("");
            setArtScore("");
            setEnglishScore("");
            setRoom("");
        }
    }, [student]);

    const handleScoreChange = (setter) => (e) => {
        const value = e.target.value;
        if (value === "") {
            setter("");
            return;
        }
        const numberValue = parseInt(value);
        if (isNaN(numberValue) || numberValue > 20) {
            setter("20");
        } else if (numberValue < 0) {
            setter("0");
        } else {
            setter(value);
        }
    };

    const handleIdCardChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 13) {
            setIdCard(value);
        }
    };

    const getScore = (score) => (score ? parseInt(score) : null);

    const saveStudent = async () => {
        if (!name || !address || !idCard || !room) {
            alert("Please fill in all required fields (Name, Address, and ID Card)");
            return;
        }

        if (idCard.length !== 13) {
            alert("ID Card must be 13 digits");
            return;
        }

        if (student && student.room && room !== student.room) {
            alert("Cannot change room once assigned");
            return;
        }

        try {
            const studentData = {
                name,
                totalscore:
                    (getScore(mathScore) || 0) +
                    (getScore(scienceScore) || 0) +
                    (getScore(historyScore) || 0) +
                    (getScore(artScore) || 0) +
                    (getScore(englishScore) || 0),
                address,
                idCard,
                mathScore: getScore(mathScore),
                scienceScore: getScore(scienceScore),
                historyScore: getScore(historyScore),
                artScore: getScore(artScore),
                englishScore: getScore(englishScore),
                room,
                createAt: new Date().toISOString()
            };

            if (student) {
                await axios.put(`https://localhost:7061/Students/${student.id}`, studentData);
                alert("Updated successfully");
            } else {
                await axios.post("https://localhost:7061/Students", studentData);
                setName("");
                setAddress("");
                setIdCard("");
                setMathScore("");
                setScienceScore("");
                setHistoryScore("");
                setArtScore("");
                setEnglishScore("");
                setRoom("");
                alert("Added successfully");
            }

            setOpen(false);
            if (onClose) onClose();
            reload();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to save student");
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
                        onClick={() => {
                            setOpen(false);
                            if (onClose) onClose();
                        }}
                    ></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">{student ? "Edit Student" : "Add Student"}</h2>
                        <label htmlFor="name" className="block font-medium mb-1">Name</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="idCard" className="block font-medium mb-1">ID Card (13 digits)</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="ID Card (13 digits)"
                            value={idCard}
                            onChange={handleIdCardChange}
                            maxLength="13"
                        />
                        <label htmlFor="address" className="block font-medium mb-1">Address</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="room" className="block font-medium mb-1">Room (เช่น ม.3/1)</label>
                        <input
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${student ? "bg-gray-200" : "bg-white"
                                }`}
                            placeholder="Room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            disabled={!!student}
                        />
                        <label htmlFor="mathScore" className="block font-medium mb-1">Math Score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={mathScore}
                            onChange={handleScoreChange(setMathScore)}
                        />
                        <label htmlFor="scienceScore" className="block font-medium mb-1">Science Score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={scienceScore}
                            onChange={handleScoreChange(setScienceScore)}
                        />
                        <label htmlFor="historyScore" className="block font-medium mb-1">History Score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={historyScore}
                            onChange={handleScoreChange(setHistoryScore)}
                        />
                        <label htmlFor="artScore" className="block font-medium mb-1">Art Score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={artScore}
                            onChange={handleScoreChange(setArtScore)}
                        />
                        <label htmlFor="englishScore" className="block font-medium mb-1">English Score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={englishScore}
                            onChange={handleScoreChange(setEnglishScore)}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    if (onClose) onClose();
                                    setName("");
                                    setAddress("");
                                    setIdCard("");
                                    setMathScore("");
                                    setScienceScore("");
                                    setHistoryScore("");
                                    setArtScore("");
                                    setEnglishScore("");
                                    setRoom("");
                                }}
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