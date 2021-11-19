import React from 'react'
import { Table, Button, FormControl, InputGroup} from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'

const PessoasComponent = () => {
    const pessoas = useSelector(state => state.pessoas)
    const dispatch = useDispatch()

    function inserirPessoa(){
        console.log({type: 'ADD_PESSOA', nome: document.getElementById("formNome").value})
        dispatch({type: 'ADD_PESSOA', nome: document.getElementById("formNome").value})
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
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                        {pessoas.map(pessoa => (
                            <tr key={pessoa.id}>
                                <td>{pessoa.id}</td>
                                <td>{pessoa.nome}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default PessoasComponent