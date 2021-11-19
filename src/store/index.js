// https://www.youtube.com/watch?v=7L7MhxjI4PE
import { createStore } from "redux";

const INITIAL_STATE = {
    pessoas: [
        {id: 0, nome: "alan"},
        {id: 1, nome: "beta"},
        {id: 2, nome: "claudio"},
    ]
}

function pessoasRedux(state = INITIAL_STATE, action){
    switch(action.type){
        case 'ADD_PESSOA':
            return { ...state, pessoas: [...state.pessoas, {id: state.pessoas.length, nome: action.nome}]}
        default:
            return state
    }
}

const store = createStore(pessoasRedux)
export default store;