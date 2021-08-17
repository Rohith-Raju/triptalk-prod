import Homepage from './pages/homepage';
import Login from './pages/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/signin" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
