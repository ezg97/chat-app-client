import React from 'react';
// import './Chat.css';
import {Route} from 'react-router-dom';
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

    render() {
        return(
        <nav className = 'app_nav'>
            <ul>
              <li><p>&#128490;</p></li>
              <li><h3>Chat App</h3></li>
            </ul>
            <Route exact path={['/','/home']} component={SearchBar} />
            <div class='img-border'>
                <img class="img" src={this.context.user.user_thumbnail} alt="Logo"/>
            </div>        
        </nav>
        );
    }

}

export default NavBar;