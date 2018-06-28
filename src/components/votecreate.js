import React, { Component } from 'react'

const optionContent= {};
const encrease= [];
class Option extends Component {
	constructor(){
		super();
		this.state= {
			value: ""
		}
	}
	handleValueChange(id, event) {
		this.setState({
			value: event.target.value
		});
		optionContent.content[id]= event.target.value;
	}
	handleRadioChange(id, event){
		if(event.target.checked){
			encrease[id]= 1;
		}else{
			encrease[id]= 0;
		}
	}
	componentDidMount(){
		if(this.props.default){
			this.setState({
				value: this.props.default
			})
		}
		optionContent.number++;
		optionContent.content[optionContent.number]= this.props.default;
		encrease[optionContent.number]= 0;
	}
	render() {
		return (
			<div>
				{this.props.default? <input type='radio' onChange={this.handleRadioChange.bind(this, this.props.id)} />: null}
				<input type='text' name='op' placeholder='option' value={this.state.value} onChange={this.handleValueChange.bind(this, this.props.id)} />
			</div>
		)
	}
}

class Create extends Component {
	constructor(){
		super();
		this.state={
			count: 1
		}
		optionContent.number= -1;
		optionContent.content= [];
	}

	handleSubmitCreate(event) {
		event.preventDefault();   //? no need to check format ?
		let voteinfo= {};
		voteinfo.voteId= this.props.id? this.props.id: null;
		voteinfo.username= create.creator.value;
		voteinfo.userId= this.props.userId? this.props.userId: this.props.location.state.userId;
		if(!create.title.value){
			alert('title should not be empty');
			return;
		}
		voteinfo.title= create.title.value;
		voteinfo.describe= this.props.id? null: create.describe.value;
		voteinfo.options= [];
		optionContent.content.map(v=>{
			voteinfo.options.push({value: v, vote: 0});
		});
		if(this.props.id){
			encrease.map((v, i) => {
				voteinfo.options[i].vote= this.props.ops[i].vote+ v; //can not read vote????
			})
		}
		//fetch
		let init= {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(voteinfo)
		}
		fetch('http://localhost:9000/vote/publish', init)
		.then((res) => {
			if(res.ok){
				return res;
			}else{
				let error = new Error(res.statusText);
			    error.state = res.status;
			    error.response = res;
			    throw error;
			}
		})
		.then(res => res.json())
		.then((data) =>{
			if(data.title==1){
				if(this.props.id){
					alert('modify success!');
					location.reload();
				}else{
					this.props.history.push('/userinfo/'+ this.props.username);
				}
			}else{
				alert(data.content);
				return;
			}
		})
		.catch((err) => {
			console.log(err);
			if(err.state == 401){
				alert('login outdate, login again');
				return;
			}
			if(err.response){
				err.response.json().then((data) => {
					console.log(data);
					if(data.message){
						alert(data.message);//err????
					}
				})
			}
		})	
	}

	handleAddOption(){
		this.setState((prevState)=>({
			count: prevState.count+ 1
		}))
	}
	handleVote(){

	}

	render(){
		let arr=this.props.ops? this.props.ops: new Array(this.state.count).fill(1);
		return (
			<fieldset>
				<legend>{this.props.id? 'Edit the vote': 'Create a vote'}</legend>
				<form name="create" onSubmit={this.handleSubmitCreate.bind(this)} >
					<label htmlFor='creator'>Creator:</label> <input id='creator' type='text' name='creator' value= { this.props.username } readOnly='true' /><br />
					<label htmlFor='title'>Title:</label>{this.props.title? <input id='title' type='text' name='title' value={this.props.title} readOnly='true' />: <input id='title' type='text' name='title' /> }<br />
					{this.props.id? null: <div><label htmlFor='describe'>Describe:</label><input id='describe' type='text' name='describe' /><br /></div>}
					<label>Opthions:</label>
					<div id='options'>
						{ arr.map((v,i)=>(
								<Option key={i} default={v.value} id={i} />
							))
						}
					</div>
					{this.props.id? null: <input id='add' type='button' name='addOp' value='add option' onClick= {this.handleAddOption.bind(this)} />}<br />
					<input type='submit' name='sb' value={this.props.id? 'Update': 'Create'} />
				</form>
			</fieldset>
		)
	}
}

export default Create