import { useEffect, useState } from 'react';
import  axios  from 'axios';
import './App.css';
import './components/StudentForm';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
function App() {

    const [students, setStudents] = useState([]);

    const loadStudents = async () => {
        try {
            const res = await axios.get("https://localhost:7061/Students");
            console.log(res.data);
            setStudents(res.data);
        } catch (err) {
            console.log("Axios error", err);
        }

        
    }

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-4 min-h-screen w-full p-6 bg-[#87ceeb]">
                {/* Header + ปุ่ม Add */}
                <div className="flex justify-between items-center  pb-2">
                    <h2 className="text-xl font-bold text-gray-700">
                        Student Details
                    </h2>
                    <div className="flex gap-3 rounded-md">
                        <input
                            className="flex-1 px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none "
                            placeholder="Search student"
                        />
                        <StudentForm reload={loadStudents} />
                    </div>
                </div>

                {/* รายการนักเรียน */}
                <div className="flex-1 p-4 rounded-md shadow-sm bg-white">
                    <StudentList students={students} reload={loadStudents} />
                </div>
            </div>
            

        </>
    );
   
}

export default App;