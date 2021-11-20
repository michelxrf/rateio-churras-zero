import { composeWithDevTools } from 'redux-devtools-extension'
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
        
        case 'ADD_PAGAMENTO':
            return { ...state, pagamentos: [...state.pagamentos, {id: state.pagamentos.length, valor: action.valor, paganteId: action.paganteId, pagoId: action.pagoId}]}

        default:
            return state
    }
}

const store = createStore(storeRedux, composeWithDevTools())
export default store;