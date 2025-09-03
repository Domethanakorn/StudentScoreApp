import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { Search } from "lucide-react";
function App() {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const loadStudents = async () => {
        try {
            const res = await axios.get("https://localhost:7061/Students");
            setStudents(res.data);
        } catch (err) {
            console.log("Axios error", err);
        }
    }

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <div className="flex flex-col gap-4 min-h-screen w-full p-6 bg-[#87ceeb]">
           
            <div className="flex justify-between items-center pb-2">
                <h2 className="text-xl font-bold text-gray-700">
                    Student Details
                </h2>
                <div className="flex gap-3 rounded-md">
                    <div className="relative flex-1">
                        <input
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none pl-10"
                            placeholder="Search student"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <Search size={18} /> 
                        </span>
                    </div>
                    <StudentForm reload={loadStudents} />
                </div>
            </div>

            {/* รายการนักเรียน */}
            <div className="flex-1 p-4 rounded-md shadow-sm bg-white">
                <StudentList
                    students={students}
                    searchTerm={searchTerm}  // ส่ง searchTerm ไปให้ filter
                    reload={loadStudents}
                />
            </div>
        </div>
    );
}

export default App;
