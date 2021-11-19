import { useState } from "react"
import { FormControl, Button, Table, InputGroup, Dropdown, FormSelect } from "react-bootstrap"

const DespesasComponent = () => {
    const [despesas, setDespesas] = useState([])
    const [pessoas, setPessoas] = useState([])//mock, remover quando implementar store
    
    return(
        <InputGroup>
            <FormControl id="formDespesa" type="number" placeholder="Valor pago" min="0.01" step="0.01" ></FormControl>
            <FormSelect>
                <option value="null">Quem pagou?</option>
                {pessoas.map(pessoa => (<option key={pessoa.id} value={pessoa.id}>{pessoa.name}</option>))}
            </FormSelect>

            <Button variant="primary" >Inserir</Button>
        </InputGroup>
    )
}

export default DespesasComponent