// https://www.youtube.com/watch?v=7L7MhxjI4PE
import { createStore } from "redux";

const INITIAL_STATE = {
    pessoas:[],
    despesas:[],
    restituicoes:[]
}

function algumNome(state, action){
    switch(action.type){
        case 'ADD_PESSOA':
            return { ...state, pessoas: [state.pessoas, action.id, action.nome]}
    }
}

const store = createStore()

export default store;