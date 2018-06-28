import React, { Component } from 'react'
import Create from './votecreate'
import Chart from './chart'

class Votedetail extends Component {

	render() {
		console.log(this.props.item);
		return (
			<div className='show'>
				<Create title={this.props.item.title} id={this.props.item.id} ops={this.props.item.option} username={this.props.item.user.username} userId={this.props.item.user._id} />
				<Chart options={this.props.item.option} />
			</div>
		)
	}
}
export default Votedetail