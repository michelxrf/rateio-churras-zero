import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from "redux"

const INITIAL_STATE = {
    pessoas: [],
    despesas: [],
    pagamentos: [],
    totais: [],
    despesaPorPessoa: 0.00
}



function storeRedux(state = INITIAL_STATE, action){  
    switch(action.type){
        case 'ADD_PESSOA':
            return { ...state, pessoas: [...state.pessoas, {id: state.pessoas.length, nome: action.nome, excluido: false}]}
        
        case 'RM_PESSOA':
            return { ...state, pessoas: [...action.novoPessoas], despesas: [...action.novoDespesas], pagamentos: [...action.novoPagamentos]}
            
        case 'ADD_DESPESA':
            return { ...state, despesas: [...state.despesas, {id: state.despesas.length, valor: action.valor, pessoaId: action.pessoaId, excluido: false}] }
        
        case 'RM_DESPESA':
            return { ...state, despesas: [...action.novoState]}

        case 'ADD_PAGAMENTO':
            return { ...state, pagamentos: [...state.pagamentos, {id: state.pagamentos.length, valor: action.valor, paganteId: action.paganteId, pagoId: action.pagoId, excluido: false}]}

        case 'RM_PAGAMENTO':
            return { ...state, pagamentos: [...action.novoState]}

        case 'ADD_TOTAIS':
            return { ...state, despesaPorPessoa: action.despesaPorPessoa, totais: action.novoTotal}

        default:
            return state
    }
}

const store = createStore(storeRedux, composeWithDevTools())
export default store