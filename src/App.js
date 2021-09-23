import Homepage from './pages/homepage';
import Login from './pages/login';
import { Authprovider } from './contexts/Authcontext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Authprovider>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/signin" exact component={Login} />
          </Switch>
        </Router>
      </Authprovider>
    </div>
  );
}

export default App;
