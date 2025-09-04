import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';


const initialState = {
    students: [],
    searchTerm: "",
};

function StudentReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_STUDENTS':
            return { ...state, students: action.payload };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    }
}

const store = createStore(StudentReducer, applyMiddleware(thunk));

export default store