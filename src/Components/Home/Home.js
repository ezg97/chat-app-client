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

    // static contextType = Store;
    static contextType = LoginContext;

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      typingHandle: '',
      isTyping: false,
      socketId: 0,
      rooms: [{name: '', messages: [], sockets: []}],
      // general: [{from: 'Elijah', msg: "Hey guys"}, {from: 'Jack', msg: "Hey"}, {from: 'Al', msg: "Hi"}],
      // sports: [{from: 'Elijah', msg: "football is cool"}, {from: 'Jack', msg: "yes"}, {from: 'Al', msg: "no"}],
      // code: [{from: 'Elijah', msg: "OOP?"}, {from: 'Jack', msg: "ew"}, {from: 'Al', msg: "nah"}],
    };
 
    //initialize
    this.socket = socketIOClient('http://localhost:8000');
    this.typing = 0;

    //listen for: Server will respond with the "socketID" once the user has been connected
    this.socket.on('id', id => {
      console.log('id is in: ',id);
      this.setState({socketId: id});
      this.socket.emit('addUser', this.context.user.id);
    })

    //listen for: Incoming Messages
    this.socket.on('message', (msg) => {
      console.log('recieved: ', msg);
      let index = this.getSelectedUserId();
      // this.state.rooms.find((obj,i) => {
      //   console.log(obj.name,' AND ',`${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`)
      //   if (obj.name === `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`) {
      //     console.log(true);
      //     index = i;
      //     return true;
      //   }
      // });

      if(index !== undefined){
        //updating temp updates the state for some reason so I'll leave it like this, or else i'll just setState({rooms: temp})
        const temp = [...this.state.rooms];
        temp[index].messages = [msg, ...temp[index].messages];
        this.setState({
          rooms: temp
        });
      }
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

    // LISTEN: for connection being made - updates state/re-renders
    this.socket.on('connectionMade', (room, toSocket) => {
      console.log('on CONNECTION');

      console.log(room);

      // CHECK: if the room we just connected to has already been connected to in a different tab (aka already)
      let obj = this.state.rooms.find((obj) => {
        // if the room has already been connected
        if (obj.name === room) {
          console.log('have already connected to: ',room);
          //and if the current socket hasn't connected to this room yet
          if (!obj.sockets.includes(toSocket)) {
            console.log('adding this socket: ',toSocket);
            //then add this socket to the already existing room
            this.setState({
              rooms: [...this.state.rooms, {...obj, sockets: [...obj.sockets, toSocket]} ]
            });
            //this.state.rooms[i] = [...this.state.rooms, {...obj, sockets: [...obj.sockets, toSocket]}];
          }
          // find needs something returned if the room name does already exist
          return true;
        }
      });
     //  if this room hasn't been added to state yet, then add.
     if (!obj) {
       console.log('Never connected to: ', room, 'creating connection');
        this.setState({
          rooms: [...this.state.rooms, {name: room, messages: [], sockets: [toSocket]}]
        });
     }

     console.log('CONNECTION HAS BEEN MADE');

   });
  }

  componentDidMount() {
    console.log('HOMEJS');
    this.context.getLinks();
    
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // })
    // console.log('JOINING ROOM//')
  }

  joinRoom = () => {
    const targetId = this.context.selectedUser;
    console.log(targetId);
    this.socket.emit('JoinRoom', {'room': `${Number(this.context.user.id) + Number(targetId)}to${Math.min(Number(this.context.user.id), Number(targetId))}`, 'targetId': targetId, 'myId':this.context.user.id})
  }

  typingMessage = (handle) => {
    console.log(`1 - sending handle because user:${handle} is typing.`);
    this.socket.emit('typing', {handle, isTyping: true, room: `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`});
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
      let index = this.getSelectedUserId();
      // this.state.rooms.find((obj,i) => {
      //   console.log(obj.name,' AND ',`${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`)
      //   if (obj.name === `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`) {
      //     console.log(true);
      //     index = i;
      //     return true;
      //   }
      // });

      if(index !== undefined){
        //updating temp updates the state for some reason so I'll leave it like this, or else i'll just setState({rooms: temp})
        const temp = [...this.state.rooms];
        temp[index].messages = [msg, ...temp[index].messages];
        this.setState({
          rooms: temp
        });
      }
      

      // this.setState({

      // })
      this.setState({ 'messages': [msg, ...this.state.messages] });
      this.socket.emit('message', {msg, room: `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`});
  }

  getSelectedUserId = () => {
    let index = 0;
    this.state.rooms.find((obj,i) => {
      console.log(obj.sockets,' AND ',`${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`)
      if (obj.name === `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`) {
        console.log(true);
        index = i;
        return index;
      }
    });
    console.log('returning index', this.context.selectedUser);

    return index;
  }

  render() {

    // this.socket.on('message', (msg) => {
    //   console.log('recieved: ', msg);
    //   this.setState({ 'messages': [...this.state.messages, msg] })
    // });
    if (this.context.selectedUser > 0) {
      console.log('yeeeehawww');
      this.joinRoom();
    }
    

    return (
      <Store.Provider value = {{sendMessage: this.sendMessage, typingMessage: this.typingMessage, getSelectedUserId: this.getSelectedUserId, 
      isTyping: this.state.isTyping, typingHandle: this.state.typingHandle, messages: this.state.messages, rooms: this.state.rooms}}>
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
