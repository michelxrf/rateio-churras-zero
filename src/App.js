import { Tab, Tabs } from 'react-bootstrap';
import HomeComponent from './components/HomeComponent';
import PessoasComponent from './components/PessoasComponent';
import DespesasComponent from './components/DespesasComponent';

const App = () => {
  return(
  <>
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="home" title="Home">
          <HomeComponent />
      </Tab>
      <Tab eventKey="pessoas" title="Pessoas">
          <PessoasComponent />
      </Tab>
      <Tab eventKey="despesas" title="Despesas">
          <DespesasComponent />
      </Tab>
      <Tab eventKey="ressarcimentos" title="Ressarcimentos">
          <p>TODO!</p>
      </Tab>
      <Tab eventKey="totais" title="Totais">
          <p>TODO!</p>
      </Tab>
    </Tabs>
  </>
  )
  
}

export default App;