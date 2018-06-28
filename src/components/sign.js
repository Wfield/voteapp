import React, {Component} from 'react';
import Auth from './auth'

class Sign extends Component {
	handleSign(event){
		event.preventDefault();
		let signup= signForm.user.value|| 'signup';
		switch(''){
			case signForm.user.value:
				alert('username should not be empty');
				return;
				break;
			case signForm.email.value:
				alert('email should not be empty');
				return;
				break;
			case signForm.pw.value:
				alert('password should not be empty');
				return;
				break;
		}
		if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(signForm.email.value))){
			alert('email format worng');
			return;
		}
		let userInfo= {
			username: signForm.user.value,
			email: signForm.email.value,
			password: signForm.pw.value
		}
		let init= {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		}
		fetch('http://localhost:9000/user/register', init)
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
			if(data.id==1){
				Auth.authenticate(signup, data.content.userId);
				this.props.history.push('/');
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
						alert(data.message);
					}
				})
			}
		})	
	}

	render(){
		return (
			<form id='sign' name= 'signForm' onSubmit= { this.handleSign.bind(this) } >
				username: <input type= 'text' name= 'user' />
				email: <input type= 'email' name= 'email' />
				password: <input type= 'password' name= 'pw' />
				<input type= 'submit' name= 'sub' value= 'signup' />
			</form>
		)
	}
}

export default Sign