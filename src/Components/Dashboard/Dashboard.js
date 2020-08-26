import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LoginContext from '../../ContextAPI/LoginContext';


import './Dashboard.css';

class Dashboard extends Component {

  constructor(props){
    super(props);
        this.state = {
            handle: '',
            content: ''
        };
    }

    static contextType = LoginContext;



  componentDidMount() {

  }

  render() {    
      return (
        <div className='page dashboard'>
            {/* {console.log('PASSED UNO :')} */}
       

            <main className="App">
                <h2> Welcome {this.context.user.user_name}</h2>         
            </main>

        </div>
      );
    }
}

export default Dashboard;