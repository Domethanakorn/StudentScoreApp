
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStudents, setSearchTerm } from './actions';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { Search } from "lucide-react";

function App() {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students);
    const searchTerm = useSelector((state) => state.searchTerm);

    useEffect(() => {
        dispatch(loadStudents());
        
    }, [dispatch]);

    useEffect(() => {
        console.log(students);
    }, [students]);

   

    const reload = () => dispatch(loadStudents());

    return (
        <div className="flex flex-col gap-4 min-h-screen w-full p-6 bg-[#87ceeb]">
            <div className="flex justify-between items-center pb-2">
                <h2 className="text-xl font-bold text-gray-800">
                    Student Details
                </h2>
                <div className="flex gap-3 rounded-md">
                    <div className="relative flex-1">
                        <input
                            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none pl-10"
                            placeholder="Search student"
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <Search size={18} />
                        </span>
                    </div>
                    <StudentForm reload={reload} />
                </div>
            </div>


            {/* รายการนักเรียน */}
            <div className="flex-1 p-4 rounded-md shadow-sm bg-white">
                <StudentList
                    students={students}
                    searchTerm={searchTerm}
                    reload={reload}
                />
            </div>
        </div>
    );
}

export default App;