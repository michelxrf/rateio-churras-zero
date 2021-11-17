import { Tab, Tabs } from 'react-bootstrap';

import homeComponent from '../homeComponent';

const tabsComponent = () => {
    return (
        <Tabs 
            defaultActiveKey="home" 
            id="uncontrolled-tab-example"
            className="mb-4 mt-3">
            <Tab eventKey="home" title="Home">
                <homeComponent />
            </Tab>
            <Tab eventKey="nada" title="Nada">
                <h1>Nada aqui.</h1>
            </Tab>
        </Tabs>
    );
}

export default tabsComponent;
