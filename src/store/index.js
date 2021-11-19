// https://www.youtube.com/watch?v=7L7MhxjI4PE
import { createStore } from "redux";

const INITIAL_STATE = {
    pessoas: [
        'nome1','nome2'
    ]
}

function pessoasRedux(state = INITIAL_STATE, action){
    let novoId = state.pessoas.length
    switch(action.type){
        case 'ADD_PESSOA':
            return { ...state, pessoas: [state.pessoas, action.nome]}
        default:
            return state
    }
}

const store = createStore(pessoasRedux)
export default store;