import { Table, Button, FormControl, InputGroup} from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'

const PessoasComponent = () => {
    const pessoas = useSelector(state => state.pessoas)
    const dispatch = useDispatch()

    function inserirPessoa(){
        const novaPessoa = document.getElementById("formNome").value
        
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
                        {pessoas.map(pessoa => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.nome}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default PessoasComponent