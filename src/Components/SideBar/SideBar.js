import React from 'react';
import {Route} from 'react-router-dom';
import LoginContext from '../../ContextAPI/LoginContext';
// import SearchBar from '../SearchBar/SearchBar';


import './SideBar.css';

class SideBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            handle: '',
            content: ''
        };

    }

    static contextType = LoginContext;

    componentDidMount() {
        //get ALL of the user's links
        // fetch('http://localhost:8000/user/links/1',
        //         {   method: "GET", 
        //             'credentials': 'include',
        //             headers: new Headers({
        //                 'Accept': 'application/json',
        //                 'Access-Control-Allow-Origin':'http://localhost:3000/',
        //                 'Content-Type': 'application/json',
        //             }),
        //         })
        //         .then(userLinks => {
        //             console.log('- Links have been returned');
        //             console.log({userLinks});
        //             if (!userLinks.ok) {
        //                 console.log('error:', userLinks);
        //             }
        //             return userLinks.json(); //the response is NOT Json
        //         })
        //         .then (userLinks => {
        //             console.log({userLinks});
        //             if (Object.keys(userLinks).length > 0) {
        //                 this.context.updateLinks({userLinks});
        //             }
        //         });
        // console.log('SIDEBARJS');
        // this.context.getAllLinks();
        
    }

    

    render() {

        return(
        <div className='page sidebar'>

            {/* <Route exact path={['/','/home']} component={SearchBar} /> */}
            <div>
            <ul className='link-list'>
                {this.context.allLinks.length === 0
                    ? null
                    : this.context.allLinks.map(user => 
                        // on click for each li or section to add the person to context "selectedUser" and open chat with selectedUser
                        <li className="user_element">
                            <section className='select-user' onClick={() => this.context.selectUser(user.id)}>
                                <div className='img-border'>
                                    {this.context.activeUsers.includes(user.id)
                                        ? <img class="img active" src={user.user_thumbnail} alt="Logo"/>
                                        : <img class="img away" src={user.user_thumbnail} alt="Logo"/>
                                    }
                                </div>
                                <p className="user_name" tabindex={0}>{user.user_name}</p>
                            </section>
                            {/* <div className='lock-wrap del' onClick={() => this.context.deleteLink(user.id)}>
                                <div className='lock'>
                                    <p>&#128274;</p>
                                </div>
                            </div>     */}
                            {this.context.links.includes(user.id)
                                // LOCKed - DELETE
                                ?<div className='lock-wrap del' onClick={() => this.context.deleteLink(user.id)}>
                                    <div className='lock'>
                                        <p>&#128274;</p>
                                    </div>
                                </div>   
                                // if the searched user is NOT one of the current user's links 
                                // if the current user is equal to the searched user then do not display the "link" option
                                :this.context.user.id === user.id
                                    ?null
                                    // UNLOCKed - ADD
                                    :<div className='lock-wrap' onClick={() => this.context.addLink(user.id)}>
                                        <div className='lock'>
                                            <p>&#128275;</p>
                                        </div>
                                    </div>   
                            }
                        </li>
                    )}
              </ul>
              </div>
        </div>
        );
    }

}

export default SideBar;