
import { createStore } from "redux";

const INITIAL_STATE = {
    pessoas: [],
    despesas: [],
    pagamentos: []
}

function storeRedux(state = INITIAL_STATE, action){  
    switch(action.type){
        case 'ADD_PESSOA':
            return { ...state, pessoas: [...state.pessoas, {id: state.pessoas.length, nome: action.nome}]}
        
        case 'ADD_DESPESA':
            return { ...state, despesas: [...state.despesas, {id: state.despesas.length, valor: action.valor, pessoaId: action.pessoaId}] }
        
        default:
            return state
    }
}

const store = createStore(storeRedux)
export default store;