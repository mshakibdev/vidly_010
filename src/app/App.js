import "./App.css";
import React, {Component} from "react";
import MoviesChart from "../components/table/movieTableComponent";
import Nav from "../components/common/nav";
import {Redirect, Route, Switch} from "react-router";
import Customer from "../components/pages/customer";
import Rental from "../components/pages/rental";
import NotFound from "../components/pages/not-found";
import MovieForm from "../components/forms/movieForm";
import Login from "../components/forms/login";
import Register from "../components/forms/register";
import CreateMovie from "./../components/forms/createMovie";
class App extends Component {
	render() {
		return (
			<div>
				<Nav />

				<Switch>
					<Route path="/movie/:id" component={MovieForm} />
					<Route path="/customer" component={Customer} />
					<Route path="/rental" component={Rental} />
					<Route path="/not-found" component={NotFound} />
					<Route exact path="/movies" component={MoviesChart} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/movies/new" component={CreateMovie} />
					<Redirect exact from="/" to="/movies" />

					<Redirect to="/not-found" />
				</Switch>
			</div>
		);
	}
}

export default App;
