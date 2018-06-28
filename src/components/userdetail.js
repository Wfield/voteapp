import React, { Component } from 'react'
import Votedetail from './votedetail'
import Item from './voteitem';

class UserDetail extends Component {
	constructor() {
		super();
		this.state= {
			list: [],
			chooseId: 0
		}
	}

	componentDidMount() {
		fetch('https://secure-castle-72860.herokuapp.com/vote/fetchList?userId='+ this.props.userId)
		.then((res)=> {
			if(res.ok){
				return res;
			}else{
				var err= new Error(res.statusText);
				err.state= res.status;
				err.response= res;
				return err;
			}
		})
		.then(res => res.json())
		.then(data => {
			this.setState({
				list: data
			})
		})
		.catch(err => {
			console.log(err);
			if(err.state==401){
				alert('login outdate, login again');
				return;
			}
			if(err.response){
				err.response.json().then(data => {
					console.log(data);
					if(data.message){
						alert(data.message);
					}
				})
			}
		})
	}

	handleCreate(){
		this.props.history.push('/vote/create', { userId: this.props.userId});
	}
	handleVoteItem(id){
		this.setState({
			chooseId: id
		})
	}

	render() {
		return (
			<div className= 'plate'>
				<div className= 'list'>
					{ this.state.list.map(d => (
							<Item key= {d.id} title= {d.title} voteItem= {this.handleVoteItem.bind(this, d.id)} />
						))
					}
					<input type= 'button' name='create' value= 'create new vote' onClick={ this.handleCreate.bind(this)} />
				</div>
				<div className='detail'>
					{ this.state.list.map(d => {
						if(d.id== this.state.chooseId){
							return <Votedetail key={d.id} item={d} />
						}
					}) }
				</div>
			</div>
		)
	}
}

export default UserDetail