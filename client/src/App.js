import React from 'react';
import './App.css';
import 'materialize-css';
import {UseRoutes} from './routes';
import {BrowserRouter as Router} from 'react-router-dom'
import { Navbar } from './components/Navbar';

function App() {
  const routes = UseRoutes();
  return (
    <Router>
      <Navbar/>
    <div className="container">
      {routes}
    </div>
    </Router>
  );
}

export default App;
