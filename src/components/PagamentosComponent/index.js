import { useSelector, useDispatch} from 'react-redux'
import { FormControl, Table, Button, FormSelect, InputGroup } from 'react-bootstrap'

const PagamentosComponent = () => {
    const pessoas = useSelector(state => state.pessoas)
    const pagamentos = useSelector(state => state.pagamentos)
    const dispatch = useDispatch()

    function inserirPagamento(){
        const novoPagamentoValor = document.getElementById("formPagamento").value
        const novoPagamentoPagante = document.getElementById("dropdownPagador").value
        const novoPagamentoPago = document.getElementById("dropdownPago").value

        document.getElementById("formPagamento").value = null
        document.getElementById("dropdownPagador").selectedIndex = 0
        document.getElementById("dropdownPago").selectedIndex = 0

        if((novoPagamentoValor) && (novoPagamentoPagante !== "null") && (novoPagamentoPago !== "null") && (novoPagamentoPago !== novoPagamentoPagante))
            dispatch({type: "ADD_PAGAMENTO", valor: novoPagamentoValor, paganteId: novoPagamentoPagante, pagoId: novoPagamentoPago})
    }

    return(
        <>
            <InputGroup>
                <FormControl id="formPagamento" type="number" placeholder="Valor" step="0.01" min="0.01" ></FormControl>
                <FormSelect  id="dropdownPagador">
                    <option value="null" >Quem pagou?</option>
                    {pessoas.map( pessoa => (<option key={pessoa.id} value={pessoa.id} >{pessoa.nome}</option>))}
                </FormSelect>
                <FormSelect  id="dropdownPago">
                    <option value="null" >Quem foi pago?</option>
                    {pessoas.map( pessoa => (<option key={pessoa.id} value={pessoa.id} >{pessoa.nome}</option>))}
                </FormSelect>

                <Button onClick={inserirPagamento}>Inserir</Button>
            </InputGroup>

            <Table>
                <thead>
                    <tr>
                        <th>Valor</th>
                        <th>Quem pagou</th>
                        <th>Pagou para</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos.map(pagamento => (
                        <tr key={pagamento.id} >
                            <td>{pagamento.valor}</td>
                            <td>{pessoas[pagamento.paganteId].nome}</td>
                            <td>{pessoas[pagamento.pagoId].nome}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>   
        </>
    )

}

export default PagamentosComponent