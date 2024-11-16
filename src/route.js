import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import About from './Pages/About';
import NotFound from './NotFound';

function App() {
return (
    <Router>
    <Switch>
        <Route exact path="/" element={App} />
        <Route path="/about" element={About} />
        <Route element={NotFound} />
    </Switch>
    </Router>
);
}
export default App;