import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Store from '../../ContextAPI/Store';
import LoginContext from '../../ContextAPI/LoginContext';

import Chat from '../Chat/Chat'
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import SearchResults from '../SearchResults/SearchResults';


class Home extends Component {
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

  // static contextType = Store;
  static contextType = LoginContext;




  componentDidMount() {
    console.log('HOMEJS');
    this.context.getLinks();
    
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

        <Route exact path={['/','/home']} component={NavBar} />

          <main className="App">
            {/* content goes here */ console.log('home state: ',this.state)}
            <Route exact path={['/','/home']} component={SideBar} />

            {/* if there are no search results then load the chat, if there are then load the results */}
            {this.context.searchResults.length === 0
              ?<Route exact path={['/','/home']} component={Chat} />
              :<Route exact path={['/','/home']} component={SearchResults} />
            }
          </main>

        </div>
      </Store.Provider>
    );
  }

}
  

export default Home;
