import { useSelector, useDispatch } from "react-redux"
import { Table, Alert } from "react-bootstrap"
import { useEffect } from "react"
import { formatador } from "../../utils"

const TotaisComponent = () => {
    const pessoas = useSelector(state => state.pessoas)
    const despesas = useSelector(state => state.despesas)
    const pagamentos = useSelector(state => state.pagamentos)
    const totais = useSelector(state => state.totais)
    const despesaPorPessoa = useSelector(state => state.despesaPorPessoa)

    const pessoasNaoExcluidos = pessoas.filter(({excluido}) => excluido === false)
    const despesasNaoExcluidos = despesas.filter(({excluido}) => excluido === false)
    const pagamentosNaoExcluidos = pagamentos.filter(({excluido}) => excluido === false)

    const dispatch = useDispatch()
    
    function consolidarTotais(){
        
        let despesaTotalPorPessoa = 0
        if(despesasNaoExcluidos.length > 0)
            despesaTotalPorPessoa = (despesasNaoExcluidos.reduce((sum, element) => sum + element.valor, 0)/pessoasNaoExcluidos.length)

        let novoTotais = []

        for(let pessoa of pessoasNaoExcluidos){
            
            //soma as despesas desta pessoa
            let despesaTotalDeste = 0
            let despesasFiltradas = despesasNaoExcluidos.filter(({pessoaId}) => pessoaId === pessoa.id)
            
            if(despesasFiltradas.length > 0)
                despesaTotalDeste = despesasFiltradas.reduce((sum, element) => sum + element.valor, 0)
    
            //Pagamentos feitos por esta pessoa
            let pagamentosFeitosDeste = 0
            let pagamentosFeitosAEste = 0
            
            let pagamentosFiltrados = pagamentosNaoExcluidos.filter(({paganteId}) => paganteId === pessoa.id)
            if(pagamentosFiltrados.length > 0)
                pagamentosFeitosDeste = pagamentosFiltrados.reduce((sum, element) => sum + element.valor, 0)

            pagamentosFiltrados = pagamentosNaoExcluidos.filter(({pagoId}) => pagoId === pessoa.id)
            if(pagamentosFiltrados.length > 0)    
                pagamentosFeitosAEste = pagamentosFiltrados.reduce((sum, element) => sum + element.valor, 0)

            //calcula os pagamentos devidos
            let esteDeveReceber = despesaTotalDeste - despesaTotalPorPessoa + pagamentosFeitosDeste - pagamentosFeitosAEste
            let esteDevePagar = 0

            if(esteDeveReceber < 0){
                esteDevePagar = -esteDeveReceber
                esteDeveReceber = 0
            }

            novoTotais.push({ id: novoTotais.length, pessoaId: pessoa.id, nome: pessoas[pessoa.id].nome, despesa: despesaTotalDeste, deveReceber: esteDeveReceber, devePagar: esteDevePagar})
        }
        dispatch({type:"ADD_TOTAIS", novoTotal: novoTotais, despesaPorPessoa: despesaTotalPorPessoa})
    }
    
    // eslint-disable-next-line
    useEffect(consolidarTotais,[pessoas, despesas, pagamentos, dispatch])

    return (
        <>
            <Alert variant='light'>
                <h2>Despesa por pessoa: {formatador.format(despesaPorPessoa)}</h2>
            </Alert>
            <p>Aqui ficam os totais de despesas que cada pessoa teve com o churraso e também quanto cada um deve pagar para os outros para ficar tudo bem dividido.</p>
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
                            <td>{pessoas[total.pessoaId].nome}</td>
                            <td>{formatador.format(total.despesa)}</td>
                            <td>{formatador.format(total.deveReceber)}</td>
                            <td>{formatador.format(total.devePagar)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default TotaisComponent