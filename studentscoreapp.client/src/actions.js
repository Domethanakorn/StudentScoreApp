import axios from 'axios';


export const setStudents = (students) => ({ type: 'SET_STUDENTS', payload: students });
export const setSearchTerm = (term) => ({ type: 'SET_SEARCH_TERM', payload: term });


export const loadStudents = () => async (dispatch) => {
    try {
        const res = await axios.get("https://localhost:7061/Students");
        dispatch(setStudents(res.data));
    } catch (err) {
        console.log("Axios error", err);
    }
};