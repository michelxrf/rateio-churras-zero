import { Table, Button, FormControl, InputGroup} from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { BsTrash } from 'react-icons/bs'

const PessoasComponent = () => {
    const pessoas = useSelector(state => state.pessoas)
    const despesas = useSelector(state => state.despesas)
    const pagamentos = useSelector(state => state.pagamentos)
    const dispatch = useDispatch()

    const pessoasNaoExcluidos = pessoas.filter(({excluido}) => excluido === false)

    function removerPessoa(id){
        let novoPessoas = pessoas
        let novoDespesas = despesas
        let novoPagamentos = pagamentos

        novoPessoas[id].excluido = true

        novoDespesas.forEach((despesa) => {
            if(id === despesa.pessoaId)
                despesa.excluido = true
        })

        novoPagamentos.forEach((pagamento) => {
            if(id === pagamento.pagoId)
                pagamento.excluido = true
            else if(id === pagamento.paganteId)
                pagamento.excluido = true
        })

        dispatch({type:'RM_PESSOA', novoPessoas: novoPessoas, novoPagamentos: novoPagamentos, novoDespesas: novoDespesas})
    }
    
    function inserirPessoa(){
        let novaPessoa = document.getElementById("formNome").value
        
        document.getElementById("formNome").value = null

        if(novaPessoa)
            dispatch({type: 'ADD_PESSOA', nome: novaPessoa})
    }

    return(
        <>
            <InputGroup>
                <FormControl id="formNome" type="text" placeholder="Insira o nome" autoComplete='off' />
                <Button variant="primary" onClick={inserirPessoa} >Inserir</Button>
            </InputGroup>

            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                        {pessoasNaoExcluidos.map(pessoa => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                                <td><BsTrash onClick={() => removerPessoa(pessoa.id)}/></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default PessoasComponent