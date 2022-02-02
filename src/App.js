import './App.css';
import { Navbar } from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { About } from './components/About';
import { Home } from './components/Home';
import NoteState from './contexapi/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert message="This is alert"/>
          <div className="container">
          <Switch>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
