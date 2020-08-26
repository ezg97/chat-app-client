import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import socketIOClient from 'socket.io-client';

import Store from '../../ContextAPI/Store';
import LoginContext from '../../ContextAPI/LoginContext';

import Chat from '../Chat/Chat'
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import SearchResults from '../SearchResults/SearchResults';
import Settings from '../Settings/Settings';


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
      rooms: [],
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
    });


    //listen for: Incoming Messages
    this.socket.on('message', (msg) => {
      console.log('recieved: ', msg);
      console.log('cypt message: ',msg);
      //get the index of the user who sent in the request by passing their id as a parameter
      let index = this.getSelectedUserId(msg.user.id);
      // this.state.rooms.find((obj,i) => {
      //   console.log(obj.name,' AND ',`${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`)
      //   if (obj.name === `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`) {
      //     console.log(true);
      //     index = i;
      //     return true;
      //   }
      // });

      // IF: The sender and reciever have a room (they should!)
          // THEN: Update the messages that correspond with the room
      console.log('index cypt', index);
      if(index >= 0){
        console.log('passed');
        //updating temp updates the state for some reason so I'll leave it like this, or else i'll just setState({rooms: temp})
        const temp = [...this.state.rooms];
        temp[index].messages = [msg.message, ...temp[index].messages];
        this.setState({
          rooms: temp
        });

        let exists = false;
        this.context.allLinks.find((obj, i) => {
          if (obj.id === msg.user.id) {
            exists = true;
          }
        });

        if (!exists) {
          console.log('adding another link');
          console.log(index);
          console.log()
          this.context.addNonLink(msg.user.id, msg.message.handle, msg.user.thumbnail);
        }
      }

      //ELSE: listen for messages from links I haven't selected yet, or users I've NEVER linked to!!!!

      //messages array has been depricated
      this.setState({ 'messages': [msg.message, ...this.state.messages] })
    });

    //listen for: Another user typing
    this.socket.on('typing', obj => {
      console.log('problem?');

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

      //IF this.state.rooms has a length greater than zero . maybe not
      // CHECK: if the room we just connected to has already been connected to in a different tab (aka already)
      let obj = this.state.rooms.find((obj) => {
        // if the room has already been connected
        //if the array has a length of zero, this line won't execute, thus no error will be thrown
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
          rooms: [...this.state.rooms, {name: room, messages: [], sockets: [toSocket], content: ''}]
        });
     }

     console.log('CONNECTION HAS BEEN MADE');

   });


   this.socket.on('activeUsers', (users) => {
     console.log('updating active user roster');
     console.log(users);
     this.context.updateActiveUsers(users);
   });

   this.socket.on('user disconnected', (users) => {
    console.log('updating active user roster DELETION');
    console.log(users);
    this.context.updateActiveUsers(users);
   } )

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

  sendMessage = (handle, content, id, thumbnail) => {
    console.log('in send message');
      let msg = {
        handle,
        content,
        id
      }
      let user = {
        id,
        thumbnail
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

      console.log('will it send?');
      console.log(index);

      if(index >= 0){
        //updating temp updates the state for some reason so I'll leave it like this, or else i'll just setState({rooms: temp})
        const temp = [...this.state.rooms];
        temp[index].messages = [msg, ...temp[index].messages];
        this.setState({
          rooms: temp
        });

        //clear the content after being sent
        this.onContentChange('');
      }
      

      // this.setState({

      // })
      this.setState({ 'messages': [msg, ...this.state.messages] });
      this.socket.emit('message', 
      {msg, 
      room: `${Number(this.context.user.id) + Number(this.context.selectedUser)}to${ Math.min(Number(this.context.user.id), Number(this.context.selectedUser)) }`,
      user
    });
  }

  // IF no parameter is passed THEN -> RETURNS: the selected user's index in the "rooms" array. If no user selected, returns -1.
  // IF paramater is passed THEN -> RETURNS: the the index, of user who sent a message, in the "rooms" array. If the room hasn't been created for this user yet, returns -1.
  getSelectedUserId = (targetUserId = this.context.selectedUser) => {
    console.log('before selection made');
    console.log('user who sent the message to me: ', targetUserId)
    let index = -1;
    //If rooms is an empty array, no error will be thrown because the find method won't execute.
    this.state.rooms.find((obj,i) => {
      console.log(obj.sockets,' AND ',`${Number(this.context.user.id) + Number(targetUserId)}to${ Math.min(Number(this.context.user.id), Number(targetUserId)) }`)
      if (obj.name === `${Number(this.context.user.id) + Number(targetUserId)}to${ Math.min(Number(this.context.user.id), Number(targetUserId)) }`) {
        console.log(true);
        index = i;
        return index;
      }
    });
    console.log('selected user', this.context.selectedUser);
    console.log('but the one who sent me the message doe: ', targetUserId);
    console.log('index in rooms', index);
    return index;
  }

  onContentChange = (content) => {
    let index = this.getSelectedUserId();
    console.log('content is changing');
    console.log('content: ', content);
    console.log('index: ',index);

      // IF: a user has been selected (should always be the case, but just to be safe)
          // THEN: Update the content that corresponds with the room
      if(index >= 0){
        // Make a deep copy using the spread operator, alter only the content of the room I've selected, override state with the temp variable
        // "temp" would be unnecessary, but state can only be altered using "setState", so this was the only way to do it.
        const temp = [...this.state.rooms];
        temp[index].content = content;
        this.setState({
          rooms: temp
        });
      }
  }

  render() {

    // this.socket.on('message', (msg) => {
    //   console.log('recieved: ', msg);
    //   this.setState({ 'messages': [...this.state.messages, msg] })
    // });
    if (this.context.selectedUser > 0) {
      console.log('yeeeehawww join');
      this.joinRoom();
    }
    

    return (
      <Store.Provider value = {{sendMessage: this.sendMessage, typingMessage: this.typingMessage, getSelectedUserId: 
        this.getSelectedUserId, onContentChange: this.onContentChange,
      isTyping: this.state.isTyping, typingHandle: this.state.typingHandle, messages: this.state.messages, rooms: this.state.rooms,
      user_name: this.context.user.user_name, id: this.context.user.id, user_thumbnail: this.context.user.user_thumbnail}}>
        <div className='container'>

        <Route exact path={['/','/home','/settings']} component={NavBar} />

          <main className="App">
            {/* content goes here */ console.log('home state: ',this.state)}
            <Route exact path={['/','/home','/settings']} component={SideBar} />

            {/* if there are no search results then load the chat, if there are then load the results */}
            {this.context.searchResults.length === 0
              ?<Switch>
                  <Route exact path={'/settings'} component={Settings}/>
                  {(this.context.selectedUser > 0)
                    ? <Route exact path={['/','/home']} component={Chat} />
                    : <Route exact path={['/','/home']} component={Chat} />
                  
                  }
                  

                
               </Switch>

              :<Route exact path={['/','/home']} component={SearchResults} />
            }
          </main>

        </div>
      </Store.Provider>
    );
  }

}
  

export default Home;
