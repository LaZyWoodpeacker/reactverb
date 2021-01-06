import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


let newStore = {
    list: [1, 2, 3],
    loading: true
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            return { ...state, list: [...state.list, action.payload] };
        case 'REMOVE_FROM_LIST':
            return { ...state, list: state.list.filter((e, i) => i !== action.payload) };
        case 'CHANGE_EM_LIST':
            const list = [...state.list];
            list.splice(action.payload, 1, 23);
            return { ...state, list: list };
        case 'UPLOAD_LIST':
            return { ...state, list: action.payload };
        default:
            return newStore
    }
}

export default createStore(reducer, applyMiddleware(thunk));