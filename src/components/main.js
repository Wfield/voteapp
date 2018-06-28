import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Votelist from './votelist'
import Sign from './sign'
import Log from './log'
import UserDetail from './userdetail'
import Create from './votecreate'
import Auth from './auth'

const Main = () => (
	<Switch>
		<Route exact path='/' component= { Votelist } />
		<Route path= '/sign' component={ Sign } />
		<Route path= '/login' component= { Log } />
		<Route path= '/userinfo/:username' render={(props)=>(
			<UserDetail {...props} userId={Auth.userId} username={Auth.name} />
		)} />
		<Route path= '/vote/create' render={(props)=>(
			<Create {...props} username={Auth.name} />
		)} />
		<Route path= '/logout' render={()=>{
			Auth.signout();
			return <Redirect to='/' />
		}} />
		<Route render= {(location)=>{
			alert("can not find path :"+ location.pathname);
			return <Redirect to='/' />
		}} />
	</Switch>
)

export default Main