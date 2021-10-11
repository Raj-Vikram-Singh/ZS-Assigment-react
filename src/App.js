import './App.css';
import Table from './components/table'
import Graph from './components/graph'
import { BrowserRouter, NavLink, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <nav>
          <ul>
            <li><NavLink activeClassName='is_active' exact to="/">Table</NavLink></li>
            <li><NavLink activeClassName='is_active' exact to="/graph">Graph</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Table} />
          <Route exact path="/graph" component={Graph} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
