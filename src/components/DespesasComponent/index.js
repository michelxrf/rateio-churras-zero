import { FormControl, Button, Table, InputGroup, FormSelect } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

const DespesasComponent = () => {
    const despesas = useSelector(state => state.despesas)
    const pessoas = useSelector(state => state.pessoas)
    const dispatch = useDispatch()

    function inserirDespesa(){
        const novaDespesaValor = document.getElementById("formDespesa").value
        const novaDespesaNomeId = document.getElementById("dropdownDespesa").value

        document.getElementById("formDespesa").value = null
        document.getElementById("dropdownDespesa").selectedIndex = 0  

        if((typeof(novaDespesaNomeId) === 'number') && novaDespesaValor){
            dispatch({type: "ADD_DESPESA", valor: novaDespesaValor, pessoaId: novaDespesaNomeId})
        }       
    }   

    return(
        <>
            <InputGroup>
                <FormControl id="formDespesa" type="number" placeholder="Valor pago" min="0.01" step="0.01" ></FormControl>
                <FormSelect id="dropdownDespesa" placeholder="quem pagou" >
                    <option>Quem pagou?</option>
                    {pessoas.map(pessoa => (<option key={pessoa.id} value={pessoa.id}>{pessoa.nome}</option>))}
                </FormSelect>

                <Button variant="primary" onClick={inserirDespesa} >Inserir</Button>
            </InputGroup>
            <Table>
            <thead>
                    <tr>
                        <th>Id</th>
                        <th>Valor</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                        {despesas.map(despesa => (
                            <tr key={despesa.id}>
                                <td>{despesa.id}</td>
                                <td>{despesa.valor}</td>
                                <td>{pessoas[despesa.pessoaId].nome}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default DespesasComponent