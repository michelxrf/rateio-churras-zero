import { Tab, Tabs } from 'react-bootstrap';
import HomeComponent from './components/HomeComponent';
import PessoasComponent from './components/PessoasComponent';
import DespesasComponent from './components/DespesasComponent';
import PagamentosComponent from './components/PagamentosComponent';
import TotaisComponent from './components/TotaisComponent';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return(
  <Provider store={store}>
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
      <Tab eventKey="pagamentos" title="Pagamentos">
          <PagamentosComponent />
      </Tab>
      <Tab eventKey="totais" title="Totais">
          <TotaisComponent />
      </Tab>
    </Tabs>
  </Provider>
  )
  
}

export default App;