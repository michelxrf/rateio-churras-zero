import { Tab, Tabs } from 'react-bootstrap';
import HomeComponent from '../HomeComponent';

const TabsComponent = () => {
    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Home">
                <HomeComponent />
            </Tab>
            <Tab eventKey="pessoas" title="Pessoas">
                <p>TODO!</p>
            </Tab>
            <Tab eventKey="despesas" title="Despesas">
                <p>TODO!</p>
            </Tab>
            <Tab eventKey="ressarcimentos" title="Ressarcimentos">
                <p>TODO!</p>
            </Tab>
            <Tab eventKey="totais" title="Totais">
                <p>TODO!</p>
            </Tab>

        </Tabs>
    );
}

export default TabsComponent;
