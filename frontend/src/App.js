import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import USerSearch from './components/UserSearch/UserSearch';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={USerSearch} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/register" component={RegistrationForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
