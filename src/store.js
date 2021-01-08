import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


let newStore = {
    list: [],
    loading: false,
    save: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_LIST':
            return { ...state, list: [...state.list, action.payload], save: true };
        case 'REMOVE_FROM_LIST':
            return { ...state, list: state.list.filter((e, i) => i !== action.payload), save: true };
        case 'CHANGE_EM_LIST':
            const list = [...state.list];
            list.splice(action.payload.id, 1, action.payload.obj);
            return { ...state, list: list, save: true };
        case 'UPLOAD_LIST':
            return { ...state, list: action.payload };
        case 'SET_SAVE':
            return { ...state, save: action.payload }
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        default:
            return newStore
    }
}

export default createStore(reducer, applyMiddleware(thunk));