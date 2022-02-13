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

import Login from './components/Login';
import Signup from './components/Signup';
document.body.style.backgroundColor = 'rgb(157 132 160)';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          
          <div className="container my-5">
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
