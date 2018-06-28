import React, {Component} from 'react';
import Auth from './auth'

class Log extends Component {
	handleLog(event) {
		event.preventDefault()
		switch(''){
			case logForm.user.value:
				alert('username should not be empty');
				return;
				break;
			case logForm.pw.value:
				alert('password should not be empty');
				return;
				break;
		}
		let userInfo= {
			username: logForm.user.value,
			password: logForm.pw.value
		}
		let init= {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		}
		fetch('https://secure-castle-72860.herokuapp.com/user/login', init)
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
				Auth.authenticate(userInfo.username, data.content.userId);
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

	render() {
		return (
			<form id='log' name='logForm' onSubmit= { this.handleLog.bind(this) } >
				username: <input type= 'text' name= 'user' />
				password: <input type= 'password' name= 'pw' />
				<input type= 'submit' name='sb' value= 'login' />
			</form>
		)
	}
}

export default Log