import React, {Component} from "react";

class Like extends Component {
	constructor() {
		super();
		this.state = {
			choice: false,
		};

		this.handleReaction = this.handleReaction.bind(this);
	}

	handleReaction() {
		let choice = this.state.choice;
		if (choice === true) {
			this.setState({choice: false});
		} else {
			this.setState({choice: true});
		}
	}
	render() {
		return <i onClick={this.handleReaction} className={this.changeClass()} aria-hidden="true"></i>;
	}

	changeClass() {
		return this.state.choice === true ? "fa fa-heart" : "fa fa-heart-o";
	}
}

export default Like;
