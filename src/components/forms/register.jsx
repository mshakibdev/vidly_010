import React, {Component} from "react";
import Joi from "joi-browser";

class Register extends Component {
	state = {
		account: {
			username: "",
			password: "",
			name: "",
		},
		errors: {},
	};
	// ** Joi schema

	schema = {
		username: Joi.string().required().label("Username"),
		name: Joi.string().required().label("Name"),
		password: Joi.string().required().label("Password"),
	};
	// !! Runtime validation
	validateProperty(inputElement) {
		// ** validate input
		const obj = {[inputElement.name]: inputElement.value};

		const schema = {[inputElement.name]: this.schema[inputElement.name]};

		const result = Joi.validate(obj, schema);
		// ** return error message
		return result.error ? result.error.details[0].message : null;
	}
	handleOnChange(e) {
		// ** validate input

		const errorMessage = this.validateProperty(e.currentTarget);
		const newErrors = {...this.state.errors};

		if (errorMessage) {
			newErrors[e.currentTarget.name] = errorMessage;
		} else {
			delete newErrors[e.currentTarget.name];
		}

		// ** updating state with validate input value
		const newAccount = {...this.state.account};
		newAccount[e.currentTarget.name] = e.currentTarget.value;

		//** update state */
		this.setState({
			account: newAccount,
			errors: newErrors,
		});
	}

	// !! After submit validation
	validate() {
		// ** validate input
		let result = Joi.validate(this.state.account, this.schema, {abortEarly: false});

		//** return error message
		if (!result.error) return null;
		const errors = {};

		for (let item of result.error.details) {
			errors[item.path[0]] = item.message;
		}

		return errors;
	}

	handleSubmit(e) {
		// ** validate input
		e.preventDefault();
		const errors = this.validate();
		// ** update state
		this.setState({
			errors: errors || {},
		});
		// call the server
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="username">User name</label>
						<input
							onChange={(e) => this.handleOnChange(e)}
							id="username"
							name="username"
							type="text"
							className="form-control"
							value={this.state.account.username}
						/>
					</div>
					{this.state.errors.username && <div className="alert alert-danger">{this.state.errors.username}</div>}

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							onChange={(e) => this.handleOnChange(e)}
							id="password"
							name="password"
							type="password"
							className="form-control"
						/>
					</div>
					{this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}

					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							onChange={(e) => this.handleOnChange(e)}
							id="name"
							name="name"
							type="name"
							className="form-control"
						/>
					</div>
					{this.state.errors.name && <div className="alert alert-danger">{this.state.errors.name}</div>}
					<button disabled={this.validate()} type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Register;
