import React from 'react';
// import './Chat.css';
import {Route, NavLink} from 'react-router-dom';
import LoginContext from '../../ContextAPI/LoginContext';

import SearchBar from '../SearchBar/SearchBar';


import './NavBar.css';


class NavBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            text: '',
            content: ''
        };
    }

    static contextType = LoginContext;

    logout = () => {
    console.log('logging out')
    fetch(`http://localhost:8000/auth/logout`,
    {   method: "GET", 
         'credentials': 'include',
          headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000/',
            'Content-Type': 'application/json',
         }),
    })
    .then(res => {
        if (!res.ok) {
            console.log('error:', res);
        }
        return res.json(); //the response is NOT Json
    })
    .then (res => {
        this.context.selectUser(0);
        this.context.authorize();
        // if (Object.keys(links).length > 0) {
          //had to remove above line, because if the user deletes all of their links then they will have zero
    });
    }

    onHomeClick = () => {
        //pass empty string and zero that way in Home.js the homepage will load
        this.context.updateSearchResults('');
        this.context.selectUser(0);
    }

    render() {
        return(
        <nav className = 'app_nav'>
            <ul tabindex={0} onClick={() => this.onHomeClick()}>
              <li><p>&#128490;</p></li>
              <li><h3>Chat App</h3></li>
            </ul>
            <Route exact path={['/','/home']} component={SearchBar} />
            <div className='dropdown' tabindex={0} >
                <div className='img-border'>
                    <img className="img profile" src={this.context.user.user_thumbnail} alt="Logo"/>
                </div> 
                <div className="dropdown-content" tabindex={0}>
                    <a href="#" tabindex={0}>Dark Mode</a>
                    <a href="#" tabindex={0}>Settings</a>
                    <a onClick={() => this.logout()}>Logout</a>
                </div>   
            </div>     
        </nav>
        );
    }

}

export default NavBar;