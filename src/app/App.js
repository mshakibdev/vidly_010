import "./App.css";
import React, {Component} from "react";
import MoviesChart from "../components/table/movieTableComponent";
import Nav from "../components/common/nav";
import {Redirect, Route, Switch} from "react-router";
import Customer from "../components/pages/customer";
import Rental from "../components/pages/rental";
import NotFound from "../components/pages/not-found";
import Login from "../components/forms/login";
import Register from "../components/forms/register";
import MovieForm from "../components/forms/movieForm";
class App extends Component {
	render() {
		return (
			<div>
				<Nav />

				<Switch>
					<Route path="/movies/:id" component={MovieForm} />
					<Route path="/customer" component={Customer} />
					<Route path="/rental" component={Rental} />
					<Route exact path="/movies" component={MoviesChart} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />

					<Route path="/not-found" component={NotFound} />

					<Redirect to="/not-found" />
					<Redirect from="/" exact to="/movies" />
				</Switch>
			</div>
		);
	}
}

export default App;
