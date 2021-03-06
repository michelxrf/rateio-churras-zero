import { FormControl, Button, Table, InputGroup, FormSelect } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { formatador } from "../../utils"
import { BsTrash } from "react-icons/bs"

const DespesasComponent = () => {
    const despesas = useSelector(state => state.despesas)
    const pessoas = useSelector(state => state.pessoas)
    const dispatch = useDispatch()

    const pessoasNaoExcluidos = pessoas.filter(({excluido}) => excluido === false)
    const despesasNaoExcluidos = despesas.filter(({excluido}) => excluido === false)

    function removerDespesa(id){
        let novoState = despesas
        novoState[id].excluido = true

        dispatch({type:'RM_DESPESA', novoState: novoState})
    }

    function inserirDespesa(){
        const novaDespesaValor = Number(document.getElementById("formDespesa").value)
        const novaDespesaNomeId = Number(document.getElementById("dropdownDespesa").value)

        document.getElementById("formDespesa").value = null
        document.getElementById("dropdownDespesa").selectedIndex = 0

        if((novaDespesaNomeId >= 0) && novaDespesaValor)
            dispatch({type: "ADD_DESPESA", valor: novaDespesaValor, pessoaId: novaDespesaNomeId})
    }

    return(
        <>
            <p>Cadastre as despesas que cada pessoa teve. Você pode cadastrar quantas despesas quiser.</p>
            <InputGroup>
                <FormControl id="formDespesa" type="number" placeholder="Valor pago" min="0.01" step="0.01" ></FormControl>
                <FormSelect id="dropdownDespesa">
                    <option value="null">Quem pagou?</option>
                    {pessoasNaoExcluidos.map(pessoa => (<option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>))}
                </FormSelect>

                <Button variant="primary" onClick={inserirDespesa} >Inserir</Button>
            </InputGroup>
            <Table>
            <thead>
                    <tr>
                        <th>Valor</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                        {despesasNaoExcluidos.map(despesa => (
                            <tr key={despesa.id}>
                                <td>{formatador.format(despesa.valor)}</td>
                                <td>{pessoas[despesa.pessoaId].nome}</td>
                                <td onClick={ () => {removerDespesa(despesa.id)}} ><BsTrash /></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default DespesasComponent