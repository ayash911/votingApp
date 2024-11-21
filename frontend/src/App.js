import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/login';
import Register from './components/Register';
import VoteForm from './components/VoteForm';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/vote" component={VoteForm} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    );
};

export default App;
