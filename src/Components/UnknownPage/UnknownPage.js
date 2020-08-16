import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import './UnknownPage.css';

class UnkownPage extends Component {

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
            {/* {console.log('PASSED UNO :')} */}
       

            <main className="App">
                <h2> <NavLink to="/">Click here to return return home</NavLink></h2>         
            </main>

        </div>
      );
    }
}

export default UnkownPage;