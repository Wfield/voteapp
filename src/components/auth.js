import React, { Component } from 'react'

const Auth= {
	isAuthenticated: false,
	name: "",
	login: false,
	userId: '',
	authenticate(n, id) {
		this.isAuthenticated=true;
		this.login= true;
		this.name= n;
		this.userId= id;
		//setTimeout(cb, 100);
	},
	signout(){
		this.isAuthenticated= false;
		//setTimeout(cb, 100);
	}
}

export default Auth