import React from 'react';
import {Route} from 'react-router-dom';
import LoginContext from '../../ContextAPI/LoginContext';


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

    updateClass = (updatedClass) => {
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
                                    
                            </section>
                            
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