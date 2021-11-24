import React from "react";
import { NavLink} from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<NavLink to="/movies" className="navbar-brand">
					Vidly
				</NavLink>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink to="/movies" className="nav-link " aria-current="page">
								Movies
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/rental" className="nav-link " aria-current="page">
								Rental
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/customer" className="nav-link">
								Customer
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/login" className="nav-link">
								Login
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/register" className="nav-link">
								Register
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
