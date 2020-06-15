// import React, {Component} from 'react';
// import {Route, Switch} from 'react-router-dom';
// import LoginContext from './ContextAPI/LoginContext';
// import LandingPage from './Components/LandingPage/LandingPage'
// import Login from './Components/Login/Login'
// import Chat from './Components/Chat/Chat';
// import './App.css';

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       token: '',
//       id: 0
//       // general: [{from: 'Elijah', msg: "Hey guys"}, {from: 'Jack', msg: "Hey"}, {from: 'Al', msg: "Hi"}],
//       // sports: [{from: 'Elijah', msg: "football is cool"}, {from: 'Jack', msg: "yes"}, {from: 'Al', msg: "no"}],
//       // code: [{from: 'Elijah', msg: "OOP?"}, {from: 'Jack', msg: "ew"}, {from: 'Al', msg: "nah"}],
//     };

//     //initialize
   

//   }

//   static contextType = LoginContext;



//   componentDidMount() {
    
//     // socket.on("FromAPI", data => {
//     //   setResponse(data);
//     // })
    

//   }

  

//   render() {

//     // this.socket.on('message', (msg) => {
//     //   console.log('recieved: ', msg);
//     //   this.setState({ 'messages': [...this.state.messages, msg] })
//     // });
    

//     return (
//       <LoginContext.Provider value = {{username: this.state.username, password: this.state.password, token: this.state.token, id: this.state.id}}>
//         <div className='container'>
//           <main className="App">
//             { console.log('app state: ',this.state)}
//             <Switch>
//               <Route exact path='/' component={LandingPage} />
//               <Route exact path='/login' component={Login} />
//               <Route exact path='/chat'  component={Chat} />

//             </Switch>
//           </main>

//         </div>
//       </LoginContext.Provider>
//     );
//   }

// }
  

// export default App;


// need to merge the chat application below with the full paged application above

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Store from './ContextAPI/Store';
import Chat from './Components/Chat/Chat'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      typingHandle: '',
      isTyping: false,
      socketId: 0,
      // general: [{from: 'Elijah', msg: "Hey guys"}, {from: 'Jack', msg: "Hey"}, {from: 'Al', msg: "Hi"}],
      // sports: [{from: 'Elijah', msg: "football is cool"}, {from: 'Jack', msg: "yes"}, {from: 'Al', msg: "no"}],
      // code: [{from: 'Elijah', msg: "OOP?"}, {from: 'Jack', msg: "ew"}, {from: 'Al', msg: "nah"}],
    };

    //initialize
    this.socket = socketIOClient('http://localhost:8000');
    this.typing = 0;

    this.socket.on('id', id => {
      console.log('id is in: ',id);
      this.setState({socketId: id});
    })
    //listen for: Incoming Messages
    this.socket.on('message', (msg) => {
      console.log('recieved: ', msg);
      this.setState({ 'messages': [msg, ...this.state.messages] })
    });

    //listen for: Another user typing
    this.socket.on('typing', obj => {
      console.log('3 - RECEIVED FROM SERVER THAT THIS USER IS NOW TYPING: ' + obj.typing);
      this.setState({
        typingHandle: obj.handle,
        isTyping: obj.typing
      });
      this.handleIsTyping();
    });

  }

  static contextType = Store;



  componentDidMount() {
    
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // })
    

  }

  typingMessage = (handle) => {
    console.log(`1 - sending handle because user:${handle} is typing.`);

    this.socket.emit('typing', {handle, isTyping: true});
  }

  handleIsTyping = () => {
    //clear the timer that way it doesn't get stacked
    clearTimeout(this.typing);
    
    //set timer for 3 seconds after most recent keypress and then add the hide class
    this.typing = setTimeout(() => {
      this.setState({isTyping: false});
    }, 3000);
}

  sendMessage = (handle, content) => {
      let msg = {
        handle,
        content
      }
      this.setState({ 'messages': [msg, ...this.state.messages] });
      this.socket.emit('message', msg);
  }

  render() {

    // this.socket.on('message', (msg) => {
    //   console.log('recieved: ', msg);
    //   this.setState({ 'messages': [...this.state.messages, msg] })
    // });
    

    return (
      <Store.Provider value = {{sendMessage: this.sendMessage, typingMessage: this.typingMessage, isTyping: this.state.isTyping, typingHandle: this.state.typingHandle, messages: this.state.messages}}>
        <div className='container'>
          <main className="App">
            {/* content goes here */ console.log('app state: ',this.state)}
            <Switch>
              <Route exact path='/' component={Chat} />

            </Switch>
          </main>

        </div>
      </Store.Provider>
    );
  }

}
  

export default App;
