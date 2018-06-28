import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import Votedetail from './votedetail'
import Item from './voteitem';

class Votelist extends Component {
	constructor() {
		super();
		this.state= {
			voteList: [],
			chooseId: 0
		};
	}

	componentDidMount() {
		fetch("http://localhost:9000/vote/fetchList")
		.then((res)=>{
			if(res.ok){
				return res;
			}else{
				let err= new Error(res.statusText);
				err.state= res.status;
				err.response= res;
				return err;
			}
		})
		.then((response) => response.json()) //err???
		.then((resData) => {
			this.setState({voteList: resData});
		})
		.catch((err) =>{
			console.log(err);  //??????
			if(err.state== 401){
				alert('login outdate, login again');
				return;
			}
			if(err.response){
				err.response.json().then((data) => {
					console.log(data);
					if(data.message){
						alert(data.message);
					}
				})
			}
		})
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
					{ this.state.voteList.map(d => (
							<Item key= {d.id} title= {d.title} voteItem= {this.handleVoteItem.bind(this, d.id)} />
						))
					}
				</div>
				<div className='detail'>
					{ this.state.voteList.map(d => {
						if(d.id== this.state.chooseId){
							return <Votedetail key={d.id} item={d} />
						}
					}) }
				</div>
			</div>
		)
	}
}
export default Votelist