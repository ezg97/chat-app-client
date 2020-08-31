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
            content: '',
            classMobile: '',
        };

    }

    static contextType = LoginContext;

    componentDidMount() {
        //get ALL of the user's links
        // fetch('https://protected-taiga-95742.herokuapp.com/user/links/1',
        //         {   method: "GET", 
        //             'credentials': 'include',
        //             headers: new Headers({
        //                 'Accept': 'application/json',
        //                 'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
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

    updateClass = (updatedClass) => {
        console.log('updated class',updatedClass)
        this.setState({
            classMobile: updatedClass
        });
    }

    render() {

        

        return(
        <>
        {/* IF there are no search results AND no selected user
            THEN it's the home page and the classname needs to show "mobile" so that css can update to show 100% width on mobile devices
            */}
        

        {((this.context.searchResults.length === 0) && (this.context.selectedUser < 1))
            ?  (this.state.classMobile === 'mobile')
                ? null
                : this.updateClass('mobile') 
            : (this.state.classMobile === 'mobile')
                ? this.updateClass('') 
                : null  
        }

        <div className={`page sidebar ${this.state.classMobile}`}>
        {console.log('mobile state: ',this.state.classMobile)}
            {/* <Route exact path={['/','/home']} component={SearchBar} /> */}
            <div>
            <ul className='link-list'>
                <li className="sidebar_title">
                    <h2>Links</h2>
                </li>
                {this.context.allLinks.length === 0
                    ? <p>No links, search for someone you know...</p>
                    : this.context.allLinks.map(user => 
                        // on click for each li or section to add the person to context "selectedUser" and open chat with selectedUser
                        <li className="list_item">
                        
                            <section className='select-user' onClick={() => this.context.selectUser(user.id)}>
                                {(this.context.unread.includes(user.id))
                                    ?<div className="badge">
                                        <button className="Numberbadge">1</button>
                                    </div>
                                    :null
                                }
                                
                                <div className='img-border'>
                                    {this.context.activeUsers.includes(user.id)
                                        ? <img class="img active" src={user.user_thumbnail} alt="Logo"/>
                                        : <img class="img away" src={user.user_thumbnail} alt="Logo"/>
                                    }
                                </div>
                                <p className="user_name" tabindex={0}>{user.user_name}</p>
                                {/* <div className="testing"> */}
                                    
                                {/* </div> */}
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
        </>
        );
    }

}

export default SideBar;