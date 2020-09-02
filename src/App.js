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
      links: [], //ids
      allLinks: [], //names, thumbnails, ids
      searchResults: [],
      topActiveUsers: [],
      selectedUser: 0, //the ids (from database) of the users that I'm talking to
      activeUsers: [],
      searched: '',
      loggedIn: false,
      unread: [],//store the rooms that have unread messages
      userHasBeenChecked: false, //this will be used to see if "authorize()" has been executed yet
      // general: [{from: 'Elijah', msg: "Hey guys"}, {from: 'Jack', msg: "Hey"}, {from: 'Al', msg: "Hi"}],
      // sports: [{from: 'Elijah', msg: "football is cool"}, {from: 'Jack', msg: "yes"}, {from: 'Al', msg: "no"}],
      // code: [{from: 'Elijah', msg: "OOP?"}, {from: 'Jack', msg: "ew"}, {from: 'Al', msg: "nah"}],
    };

    //initialize
    //Auth.res();
    // //console.log('calling context function below:');
    // Auth.authorize();

  }

  authorize = () => {
    fetch('https://protected-taiga-95742.herokuapp.com/auth/',
    {   method: "GET", 
        // 'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
        // headers: {
         //  Origin: 'https://www.chat-app.dev/auth',
         'credentials': 'include',

          //mode: 'no-cors',
          headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
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
          // 'Access-Control-Allow-Origin':'https://protected-taiga-95742.herokuapp.com',
            // 'Content-Type': 'application/json',
        // },
        

    })
    .then(validAuth => {
        if (!validAuth.ok) {
            //console.log('error:', validAuth);
        }
        return validAuth.json(); //the response is NOT Json
    })
    .then (validAuth => {
        //console.log('IS it valid? '+validAuth.user_email);
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
    //console.log('app mounted');
    this.authorize();
    //need to figure out how to let me get authorized so I can get the user value (id mainly) and then 
    // get the links, and then get the users for the links....
    //this.getLinks(); //authorize is asynch and takes longer so i need to run this somewhere else
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // })
  }

  getLinks = () => {
    //console.log('here',this.state.user.id)
    fetch(`https://protected-taiga-95742.herokuapp.com/user/links/${this.state.user.id}`,
    {   method: "GET", 
         'credentials': 'include',
          headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
            'Content-Type': 'application/json',
         }),
    })
    .then(links => {
        if (!links.ok) {
            //console.log('error:', links);
        }
        return links.json(); //the response is NOT Json
    })
    .then (links => {
        //console.log({links});
        // if (Object.keys(links).length > 0) {
          //had to remove above line, because if the user deletes all of their links then they will have zero
          this.setState({ 
            links: links
          });
        this.getAllLinks();
    });
  }

  //this IS A GET but bc I need to send the body, it's marked as a POST
  getAllLinks = () => {
    //console.log('getting all links');
    const id = this.state.links;
    //console.log({id});
    
    if (id.length > 0) {
      fetch(`https://protected-taiga-95742.herokuapp.com/user/allLinks`,
      {   method: "POST", 
          'credentials': 'include',
            headers: new Headers({
              'Accept': 'application/json',
              'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify( id )
      })
      .then(linkData => {
          if (!linkData.ok) {
              //console.log('error:', linkData);
          }
          return linkData.json(); //the response is NOT Json
      })
      .then (linkData => {
          //console.log('returned from chain');
          //console.log({linkData});
          // if (Object.keys(linkData).length > 0) {
                    //had to remove above line, because if the user deletes all of their links then they will have zero
            this.setState({ 
              allLinks: linkData
            });
      });
    }
  
    else {
      this.setState({
        allLinks: []
      });
    }
  }

  // This adds users that are not linked to the "allLinks" array which ultimately adds them to the side bar
  addNonLink = (id, user_name, user_thumbnail) => {
    this.setState({
      allLinks: [{id,user_name,user_thumbnail}, ...this.state.allLinks]
    });
  }

  addLink = (id) => {
    //console.log('linked clicked!', id);
    fetch(`https://protected-taiga-95742.herokuapp.com/user/addLink`,
        {   method: "POST", 
            'credentials': 'include',
            headers: new Headers({
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify( 
                { toid: id, fromid: this.state.user.id}
            )
        })
        .then(searchedUsers => {
            //console.log('returned from link service');
            if (!searchedUsers.ok) {
                //console.log('error:', searchedUsers);
            }
            return searchedUsers.json(); //the response is NOT Json
        })
        .then (results => {
            this.getLinks();  
        });
    }

    deleteLink = (id) => {
      //console.log('linked clicked!', id);
      fetch(`https://protected-taiga-95742.herokuapp.com/user/deleteLink`,
          {   method: "DELETE", 
              'credentials': 'include',
              headers: new Headers({
                  'Accept': 'application/json',
                  'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
                  'Content-Type': 'application/json',
              }),
              body: JSON.stringify( 
                  { toid: id, fromid: this.state.user.id}
              )
          })
          .then(searchedUsers => {
              //console.log('returned from link service');
              if (!searchedUsers.ok) {
                  //console.log('error:', searchedUsers);
              }
              return searchedUsers.json(); //the response is NOT Json
          })
          .then (results => {
              this.getLinks();
          });
      }
    
  
  selectUser = (id) => {
    //console.log('clicked why?',id);
    this.setState({
      selectedUser: id
    });
    //clear search results or else the chat page won't be rendered... note: for some reason I can't pass an empty array to the method
    //so I passed an empty string because: ''.length is equal to zero so it operates like an empty array []
    this.updateSearchResults('');
    //console.log('1st unread',this.state.unread);

    //clear the unread messages
    if (this.state.unread.includes(id)) {
      this.state.unread.splice(this.state.unread.indexOf(id), 1);
      //console.log('2nd unread',this.state.unread);

    }
  }

  updateSearched = (text) => {
    this.setState({
      searched: text
    });
  }

  updateLinks = (userLinks) => {
    this.setState({
      links: userLinks
    });
  } 
  
  updateSearchResults = (results) => {
    this.setState({
      searchResults: results
    });
  } 

  updateActiveUsers = (activeUsers) => {
    this.setState({
      activeUsers: activeUsers
    });
  }

  updateTopActiveUsers = (users) => {
    this.setState({
      topActiveUsers: users
    });
  }

  updateUnread = (update) => {
    this.setState({
      unread: [update, ...this.state.unread]
    });
  }

  render() {


    return (
      <Auth.Provider value = {{username: this.state.username, password: this.state.password, token: this.state.token, id: this.state.id,
       isAuthValid: false, loggedIn: this.state.loggedIn, userHasBeenChecked: this.state.userHasBeenChecked, 
       links: this.state.links, allLinks: this.state.allLinks, searchResults: this.state.searchResults, user: this.state.user,
       selectedUser: this.state.selectedUser, activeUsers: this.state.activeUsers, topActiveUsers: this.state.topActiveUsers,
       unread: this.state.unread, searched: this.state.searched,
       authorize: this.authorize, updateLinks: this.updateLinks, updateSearchResults: this.updateSearchResults,
       getLinks: this.getLinks, getAllLinks: this.getAllLinks,
       addLink: this.addLink, deleteLink: this.deleteLink, updateTopActiveUsers: this.updateTopActiveUsers, 
       selectUser: this.selectUser, addNonLink: this.addNonLink, updateActiveUsers: this.updateActiveUsers,
       updateUnread: this.updateUnread, updateSearched: this.updateSearched}}>
        <div className='container'>
        { console.log('app state: ', this.state)}

          <main className="App">
            <Route component={Authorization} /> 
          </main>

        </div>
      </Auth.Provider>
    );
  }

}
  

export default App;

