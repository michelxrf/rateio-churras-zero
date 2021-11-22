import { useSelector, useDispatch } from "react-redux";
import { Table, Alert } from "react-bootstrap";
import { useEffect } from "react";

const TotaisComponent = () => {
    const pessoas = useSelector(state => state.pessoas)
    const despesas = useSelector(state => state.despesas)
    const pagamentos = useSelector(state => state.pagamentos)
    const totais = useSelector(state => state.totais)
    const porPessoa = useSelector(state => state.despesaPorPessoa)

    const dispatch = useDispatch()
    
    function consolidarTotais(){
        
        let despesaTotalPorPessoa = 0
        if(despesas.length > 0)
            despesaTotalPorPessoa = (despesas.reduce((sum, element) => sum + element.valor,0)/pessoas.length)
        console.log("Despesa por pessoa: " + despesaTotalPorPessoa)
        console.log("despesas.length: " + despesas.length)

        let novoTotais = []

        for(let pessoa of pessoas){
            
            //soma as despesas desta pessoa
            let despesaTotalDeste = 0
            let despesasFiltradas = despesas.filter(({pessoaId}) => pessoaId === pessoa.id)
            if(despesasFiltradas.length > 0)
                despesaTotalDeste = despesasFiltradas.reduce((sum, element) => sum + element.valor)
    
            //Pagamentos feitos por esta pessoa
            let pagamentosFeitosDeste = 0
            let pagamentosFeitosAEste = 0
            
            let pagamentosFiltrados = pagamentos.filter(({paganteId}) => paganteId === pessoa.id)
            if(pagamentosFiltrados.length > 0)
                pagamentosFeitosDeste = pagamentosFiltrados.reduce((sum, element) => sum + element.valor)
            
            pagamentosFiltrados = pagamentos.filter(({pagoId}) => pagoId === pessoa.id)
            if(pagamentosFiltrados > 0)    
                pagamentosFeitosAEste = pagamentosFiltrados.reduce((sum, element) => sum + element.valor)
    
            //calcula os pagamentos devidos
            let esteDeveReceber = 0
            let esteDevePagar = 0
            
            if(despesaTotalDeste + pagamentosFeitosDeste > despesaTotalPorPessoa - pagamentosFeitosAEste){
                esteDeveReceber = despesaTotalDeste - despesaTotalPorPessoa + pagamentosFeitosDeste - pagamentosFeitosAEste
                console.log("if")
            }

            else if(despesaTotalPorPessoa + pagamentosFeitosAEste > despesaTotalDeste - pagamentosFeitosDeste){
                esteDevePagar = despesaTotalPorPessoa - despesaTotalDeste - pagamentosFeitosDeste + pagamentosFeitosAEste
                console.log("else")
            }
            console.log(esteDevePagar)
            console.log(esteDeveReceber)
            //monta o state totais, falta o dispatch no final
            
            novoTotais.push({ id: pessoa.id, nome: pessoas[pessoa.id].nome, despesa: despesaTotalDeste, deveReceber: esteDeveReceber, devePagar: esteDevePagar})
        }
        dispatch({type:"ADD_TOTAIS", novoTotal: novoTotais, despesaPorPessoa: despesaTotalPorPessoa})
    }
    
    useEffect(consolidarTotais,[pessoas, despesas, pagamentos, dispatch])

    return (
        <>
            <Alert variant='secondary'>
                <h2>Aqui vai dizer se está tudo quitado ou não.</h2>
                <p>Despesa por pessoa: {porPessoa.toFixed(2)}</p>
            </Alert>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Despesas</th>
                        <th>Deve Receber</th>
                        <th>Deve Pagar</th>
                    </tr>
                </thead>
                <tbody>
                    {totais.map(total => (
                        <tr key={total.id}>
                            <td>{pessoas[total.id].nome}</td>
                            <td>{total.despesa.toFixed(2)}</td>
                            <td>{total.deveReceber.toFixed(2)}</td>
                            <td>{total.devePagar.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default TotaisComponent