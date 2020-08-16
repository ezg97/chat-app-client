import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './ContextAPI/LoginContext';
//import Auth from './Auth/Auth';

import LandingPage from './Components/LandingPage/LandingPage'
import Login from './Components/Login/Login'
import Chat from './Components/Chat/Chat';
import Home from './Components/Home/Home';
import Authorization from './Components/Authorization';
import './App.css';

class App extends Component {

  static contextType = Auth;

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      id: 0,
      user: {},
      links: [],
      loggedIn: false,
      userHasBeenChecked: false, //this will be used to see if "authorize()" has been executed yet
      // general: [{from: 'Elijah', msg: "Hey guys"}, {from: 'Jack', msg: "Hey"}, {from: 'Al', msg: "Hi"}],
      // sports: [{from: 'Elijah', msg: "football is cool"}, {from: 'Jack', msg: "yes"}, {from: 'Al', msg: "no"}],
      // code: [{from: 'Elijah', msg: "OOP?"}, {from: 'Jack', msg: "ew"}, {from: 'Al', msg: "nah"}],
    };

    //initialize
    //Auth.res();
    // console.log('calling context function below:');
    // Auth.authorize();

  }

  authorize = () => {
    fetch('http://localhost:8000/auth/',
    {   method: "GET", 
        // 'Access-Control-Allow-Origin':'http://localhost:3000',
        // headers: {
         //  Origin: 'http://localhost:3000/auth',
         'credentials': 'include',

          //mode: 'no-cors',
          headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000/',
            'Content-Type': 'application/json',
            // 'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'withCredentials': 'true',

         }),
        // },
        // crossorigin: true,
        // credentials: 'include',
        // headers: {
          // 'Accept': 'application/json',
          // 'Access-Control-Allow-Origin':'http://localhost:8000',
            // 'Content-Type': 'application/json',
        // },
        

    })
    .then(validAuth => {
        if (!validAuth.ok) {
            console.log('error:', validAuth);
        }
        return validAuth.json(); //the response is NOT Json
    })
    .then (validAuth => {
        console.log('IS it valid? '+validAuth.user_email);
        if (Object.keys(validAuth).length > 0) {
            this.setState({ 
              loggedIn: true,
              user: validAuth,
              userHasBeenChecked: true,
             });
            // Auth.isAuthValid = true;
            return true;
        }
        else {
            // Auth.isAuthValid = false;
            this.setState({
              loggedIn: false,
              user: {},
              userHasBeenChecked: true,
            });
            return false;
        }
    });
  }


  componentDidMount() {
    console.log('app mounted');
    this.authorize();
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // })
  }

  updateLinks(userLinks) {
    this.setState({
      links: userLinks
    });
  }  

  render() {

    // this.socket.on('message', (msg) => {
    //   console.log('recieved: ', msg);
    //   this.setState({ 'messages': [...this.state.messages, msg] })
    // });
    

    return (
      <Auth.Provider value = {{username: this.state.username, password: this.state.password, token: this.state.token, id: this.state.id,
       isAuthValid: false, authorize: this.authorize, loggedIn: this.state.loggedIn, userHasBeenChecked: this.state.userHasBeenChecked,
       links: this.state.links, updateLinks: this.updateLinks}}>
        <div className='container'>
          <main className="App">
            { console.log('app state: ', this.state)}
            <Route component={Authorization} /> 
            {/* <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/login' component={Login} />

              <Route exact path='/chat'  component={Chat} />
              <Route exact path='/home' component={Home} />
            </Switch> */}
          </main>

        </div>
      </Auth.Provider>
    );
  }

}
  

export default App;


// need to merge the chat application below with the full paged application above

// import React, {Component} from 'react';
// import {Route, Switch} from 'react-router-dom';
// import socketIOClient from 'socket.io-client';
// import Store from './ContextAPI/Store';
// import Chat from './Components/Chat/Chat'
// import './App.css';

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       messages: [],
//       typingHandle: '',
//       isTyping: false,
//       socketId: 0,
//       // general: [{from: 'Elijah', msg: "Hey guys"}, {from: 'Jack', msg: "Hey"}, {from: 'Al', msg: "Hi"}],
//       // sports: [{from: 'Elijah', msg: "football is cool"}, {from: 'Jack', msg: "yes"}, {from: 'Al', msg: "no"}],
//       // code: [{from: 'Elijah', msg: "OOP?"}, {from: 'Jack', msg: "ew"}, {from: 'Al', msg: "nah"}],
//     };

//     //initialize
//     this.socket = socketIOClient('http://localhost:8000');
//     this.typing = 0;

//     this.socket.on('id', id => {
//       console.log('id is in: ',id);
//       this.setState({socketId: id});
//     })
//     //listen for: Incoming Messages
//     this.socket.on('message', (msg) => {
//       console.log('recieved: ', msg);
//       this.setState({ 'messages': [msg, ...this.state.messages] })
//     });

//     //listen for: Another user typing
//     this.socket.on('typing', obj => {
//       console.log('3 - RECEIVED FROM SERVER THAT THIS USER IS NOW TYPING: ' + obj.typing);
//       this.setState({
//         typingHandle: obj.handle,
//         isTyping: obj.typing
//       });
//       this.handleIsTyping();
//     });

//   }

//   static contextType = Store;



//   componentDidMount() {
    
//     // socket.on("FromAPI", data => {
//     //   setResponse(data);
//     // })
    

//   }

//   typingMessage = (handle) => {
//     console.log(`1 - sending handle because user:${handle} is typing.`);

//     this.socket.emit('typing', {handle, isTyping: true});
//   }

//   handleIsTyping = () => {
//     //clear the timer that way it doesn't get stacked
//     clearTimeout(this.typing);
    
//     //set timer for 3 seconds after most recent keypress and then add the hide class
//     this.typing = setTimeout(() => {
//       this.setState({isTyping: false});
//     }, 3000);
// }

//   sendMessage = (handle, content) => {
//       let msg = {
//         handle,
//         content
//       }
//       this.setState({ 'messages': [msg, ...this.state.messages] });
//       this.socket.emit('message', msg);
//   }

//   render() {

//     // this.socket.on('message', (msg) => {
//     //   console.log('recieved: ', msg);
//     //   this.setState({ 'messages': [...this.state.messages, msg] })
//     // });
    

//     return (
//       <Store.Provider value = {{sendMessage: this.sendMessage, typingMessage: this.typingMessage, isTyping: this.state.isTyping, typingHandle: this.state.typingHandle, messages: this.state.messages}}>
//         <div className='container'>
//           <main className="App">
//             {/* content goes here */ console.log('app state: ',this.state)}
//             <Switch>
//               <Route exact path='/' component={Chat} />

//             </Switch>
//           </main>

//         </div>
//       </Store.Provider>
//     );
//   }

// }
  

// export default App;
