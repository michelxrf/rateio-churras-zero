import { Table, Form, Button, FormControl} from "react-bootstrap"
import { useState } from "react"

const PessoasComponent = () => {
    const [pessoas, setPessoas] = useState([{id:0,nome:"alan"}])

    const inserirPessoa = () => {
        let novoNome = document.getElementById("formNome").value
        if(novoNome)
            setPessoas(pessoas.concat({id:pessoas.length, nome:novoNome}))
    }

    return(
        <div>
            <Form>
                <FormControl id="formNome" type="text" placeholder="Insira o nome" />
                <Button variant="primary" onClick={inserirPessoa} >Inserir</Button>
            </Form>

            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                        {pessoas.map(people => (
                            <tr key={people.id}>
                                <td>{people.id}</td>
                                <td>{people.nome}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PessoasComponent