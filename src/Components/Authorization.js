import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from '../ContextAPI/LoginContext';
//import Auth from './Auth/Auth';

import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login'
import Chat from './Chat/Chat';
import Home from './Home/Home';
import UnknownPage from './UnknownPage/UnknownPage';

import '../App.css';

class Authorization extends Component {

  static contextType = Auth;

  constructor(props){
    super(props);
    this.state = {
        handle: '',
        content: ''
    };

}




  componentDidMount() {
    
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // })
    

  }

  

  render() {
    console.log('AUTHORIZATION JS');
  
    //checks to see if the user has been validated. Aka, have we ran "authorized()" to even know if he's logged in or out
    if (this.context.userHasBeenChecked) {
     // console.log('has been checked');
      if (this.context.loggedIn) {
     //   console.log('logged in');
        return (
          <div className='container'>

            <main className="App">
              <Switch>
                <Route exact path={['/', '/home','/settings']} component={Home} />
                <Route path='/' component={UnknownPage} />
              </Switch>
            </main>

          </div>
        );
      }
      else {
      //  console.log('NOT loggged in');
        return (
          <div className='container'>

            <main className="App">
              <Switch>
                <Route exact path={['/', '/home']} component={LandingPage} />
                <Route exact path={['/login', '/signup']} component={Login} />
                <Route path='/' component={UnknownPage} />

              </Switch>
            </main>

          </div>
      );
      }
    }
    //if the user has not been verified to be logged in or off, then show loading screen.
    else{
      //console.log('Hasn\'t been checked yet');
      return(
        //add loading screen maybe? or a electronic pulse across the screen (from right to left)
        <div className='container'>

        </div>
      )
    }

    // return (
    //     <div className='container'>
    //         {console.log('UNO :')}
    //         {console.log(this.context.loggedIn)}
    //         {/* {this.context.isAuthValid = true} */}
    //         {/* {console.log('OTRA VEZ:')}
    //         {console.log(this.context.loggedIn)} */}
    //         {/* {console.log('calling context function below:')}
    //         {console.log(this.context.authorize())} */}
    //         {console.log('LA ULTIMA:')}
    //         {console.log(this.context.loggedIn)}

    //       <main className="App">
    //         <Switch>
    //           <Route exact path='/' component={LandingPage} />
    //           <Route exact path='/login' component={Login} />

    //           <Route exact path='/chat'  component={Chat} />
    //           <Route exact path='/home' component={Home} />
    //         </Switch>
    //       </main>

    //     </div>
    // );
  }

}
  

export default Authorization;