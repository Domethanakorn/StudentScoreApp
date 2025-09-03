import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentForm({ reload, student, onClose }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mathScore, setMathScore] = useState("");
    const [scienceScore, setScienceScore] = useState("");
    const [historyScore, setHistoryScore] = useState("");
    const [artScore, setArtScore] = useState("");
    const [englishScore, setEnglishScore] = useState("");
  

    useEffect(() => {
        if (student) {
            setOpen(true);
            setName(student.name);
            setAddress(student.address);
            setMathScore(student.mathScore || "");
            setScienceScore(student.scienceScore || "");
            setHistoryScore(student.historyScore || "");
            setArtScore(student.artScore || "");
            setEnglishScore(student.englishScore || "");
        } else {
            setName("");
            setAddress("");
            setMathScore("");
            setScienceScore("");
            setHistoryScore("");
            setArtScore("");
            setEnglishScore("");
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

    // handle บันทึกข้อมูลนักเรียน
    const saveStudent = async () => {
        if (!name || !address) {
            alert("Please fill in all required fields (Name and Address)");
            return;
        }

        const totalScore =
            (parseInt(mathScore) || 0) +
            (parseInt(scienceScore) || 0) +
            (parseInt(historyScore) || 0) +
            (parseInt(artScore) || 0) +
            (parseInt(englishScore) || 0);

        if (totalScore > 100) {
            alert("Total score cannot exceed 100. Please check the scores for each subject.");
            return;
        }

        try {
            const studentData = {
                name,
                totalscore: totalScore,
                address,
                mathScore: parseInt(mathScore) || 0,
                scienceScore: parseInt(scienceScore) || 0,
                historyScore: parseInt(historyScore) || 0,
                artScore: parseInt(artScore) || 0,
                englishScore: parseInt(englishScore) || 0,
                createAt: new Date().toISOString()
            };

            if (student) {
                await axios.put(`https://localhost:7061/Students/${student.id}`, studentData);
                alert("Updated suceess");
               
            } else {
                await axios.post("https://localhost:7061/Students", studentData);
                setName("");
                setAddress("");
                setMathScore("");
                setScienceScore("");
                setHistoryScore("");
                setArtScore("");
                setEnglishScore("");
                alert("Added suceess");
            }

            setOpen(false);
            if (onClose) onClose();
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
                        <label htmlFor="name" className="block font-medium mb-1">Name</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="name" className="block font-medium mb-1">Address</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label htmlFor="name" className="block font-medium mb-1">Math score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={mathScore}
                            onChange={handleScoreChange(setMathScore)}
                        />
                        <label htmlFor="name" className="block font-medium mb-1">Science score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={scienceScore}
                            onChange={handleScoreChange(setScienceScore)}
                        />
                        <label htmlFor="name" className="block font-medium mb-1">History score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={historyScore}
                            onChange={handleScoreChange(setHistoryScore)}
                        />
                        <label htmlFor="name" className="block font-medium mb-1">Art score</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="(max 20)"
                            type="number"
                            value={artScore}
                            onChange={handleScoreChange(setArtScore)}
                        />
                        <label htmlFor="name" className="block font-medium mb-1">English score</label>
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
                                    setMathScore("");
                                    setScienceScore("");
                                    setHistoryScore("");
                                    setArtScore("");
                                    setEnglishScore("");
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