import './App.css';
import Table from './components/table'
import Graph from './components/graph'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <nav>
          <ul>
            <li><NavLink activeClassName='is_active' to="/table">Table</NavLink></li>
            <li><NavLink activeClassName='is_active' to="/graph">Graph</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Table} />
          <Route exact path="/table" component={Table} />
          <Route exact path="/graph" component={Graph} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
