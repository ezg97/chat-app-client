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
            <ul className='link-list'>
                {this.context.allLinks.length === 0
                    ? null
                    : this.context.allLinks.map(user => 
                        // on click for each li or section to add the person to context "selectedUser" and open chat with selectedUser
                        <li>
                            <section>
                                <div className='img-border'>
                                    <img class="img" src={user.user_thumbnail} alt="Logo"/>
                                </div>
                                <p>{user.user_name}</p>
                            </section>
                            <div className='lock-wrap del' onClick={() => this.context.deleteLink(user.id)}>
                                <div className='lock'>
                                    <p>&#128274;</p>
                                </div>
                            </div>    
                        </li>
                    )}
              </ul>
        </div>
        );
    }

}

export default SideBar;