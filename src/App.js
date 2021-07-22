import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import BloodsList from "./components/bloods-list.component";
import EditBlood from "./components/edit-blood.component";
import CreateBlood from "./components/create-blood.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
	  <Router>
		  <div className = "container">
			<Navbar />
			<br />
			<Route path="/" exact component={BloodsList} />
			<Route path="/edit/:id" component={EditBlood} />
			<Route path="/create" component={CreateBlood} />
			<Route path="/user" component={CreateUser} />
		  </div>
	  </Router>
  );
}

export default App;
