import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import './Settings.css';

class Settings extends Component {

  constructor(props){
    super(props);
        this.state = {
            handle: '',
            content: ''
        };
    }




  componentDidMount() {

  }

  render() {    
      return (
        <div className='container'>       

            <main className="App">
                <h2> Settings </h2>         
            </main>

        </div>
      );
    }
}

export default Settings;