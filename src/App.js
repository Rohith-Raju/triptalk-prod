// pages import
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signup';
import Explore from './pages/explore';

//modules ,  private route  and contexts imports
import { Authprovider } from './contexts/Authcontext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Authprovider>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/explore" exact component={Explore} />
          </Switch>
        </Router>
      </Authprovider>
    </div>
  );
}

export default App;
