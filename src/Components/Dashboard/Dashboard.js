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
            content: '',
            classMobile: '',

        };
    }

    static contextType = LoginContext;



    updateClass = (updatedClass) => {
        console.log('updated class',updatedClass)
        this.setState({
            classMobile: updatedClass
        });
    }

  render() {    
      return (
          <>
        {((this.context.searchResults.length === 0) && (this.context.selectedUser < 1))
            ?  (this.state.classMobile === 'hide')
                ? null
                : this.updateClass('hide') 
            : (this.state.classMobile === 'hide')
                ? this.updateClass('') 
                : null  
        }
        <div className={`page dashboard ${this.state.classMobile}`}>
            {/* {console.log('PASSED UNO :')} */}
       
            <div className='box'>
               
                <div>
                    <h1 className={'welcome'}> Welcome </h1>   

                    {this.context.topActiveUsers.length > 0
                        ?<section className="dashboard-section">
                            <h2 className={'topUsersTitle'}>Active Users</h2>
                            <ul className = {'topActiveUsers'}>
                                {this.context.topActiveUsers.map((obj,i) =>
                                    <li><h4>{i+1}: {obj.user_name}</h4></li>
                                ) }
                                <li>

                                </li>
                            </ul>
                        </section>  
                        :<h2 className={'none'}>There are currently no active users online</h2>    
                    }
                </div>
                {/*this.context.user.user_name*/}
                {/*Top {this.context.topActiveUsers.length*/}
            </div>

        </div>
        </>
      );
    }
}

export default Dashboard;