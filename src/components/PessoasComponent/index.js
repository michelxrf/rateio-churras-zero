import { Table, Form, Button, FormControl, InputGroup} from "react-bootstrap"
import { useState } from "react"

const PessoasComponent = () => {
    const [pessoas, setPessoas] = useState([])

    const inserirPessoa = () => {
        let novoNome = document.getElementById("formNome").value
        if(novoNome)
            setPessoas(pessoas.concat({id:pessoas.length, nome:novoNome}))
    }

    return(
        <>
            <InputGroup>
                <FormControl id="formNome" type="text" placeholder="Insira o nome" autoComplete='off' action={inserirPessoa} />
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