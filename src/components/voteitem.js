import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Item extends Component {

	handleVote(){
		this.props.voteItem();
	}

	render() {
		return (
			<div className= 'item'>
				<span className= 'title'>{this.props.title}</span>
				<input type= 'button' name= 'vote' className='subvote' value= 'vote' onClick= { this.handleVote.bind(this) } />
			</div>
		)
	}
}

export default Item