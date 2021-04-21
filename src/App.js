import { BrowserRouter as Router } from "react-router-dom";

import Container from './components/container/container';
import AppScene from './components/app-scene/app-scene';

const App = () => (
    <Router>
        <Container>
            <AppScene />
        </Container>
    </Router>
)

export default App;
