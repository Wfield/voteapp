import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Auth from './auth'

const LinkSign = () => {
	if(Auth.isAuthenticated){
		return <Link to={`/userinfo/${Auth.name}`}><span className ='sign'>{Auth.name}</span></Link>
	}else{
		return <Link to='/sign'><span className ='sign'>signup</span></Link>
	}
}
const LinkLog =() =>{
	if(Auth.isAuthenticated){
		return <Link to= '/logout'><span className= 'log'>logout</span></Link>
	}else{
		return <Link to= '/login'><span className ='log'>login</span></Link>
	}
}


class Header extends Component{

	render(){
		return (
			<div className= 'header'>
				<Link to= '/'><span className= 'vote'>Vote</span></Link>
				<LinkSign />
				<LinkLog />
			</div>
		)
	}
}
export default Header