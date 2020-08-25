import React from 'react';
import {Route} from 'react-router-dom';
import LoginContext from '../../ContextAPI/LoginContext';
// import SearchBar from '../SearchBar/SearchBar';


import './SearchResults.css';

class SearchResults extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            handle: '',
            content: ''
        };

    }

    static contextType = LoginContext;

    componentDidMount() {
    
    }

    

    render() {

        return(
        <div className='page search-results'>

            {/* <Route exact path={['/','/home']} component={SearchBar} /> */}

            <ul className='result-list'>
                {this.context.searchResults.length === 0
                    ? null
                    : this.context.searchResults.map(user => 
                        // on click for each li or section to add the person to context "selectedUser" and open chat with selectedUser
                        <li>
                            <section>
                                <div className='img-border'>
                                    {this.context.activeUsers.includes(user.id)
                                        ? <img class="img active" src={user.user_thumbnail} alt="Logo"/>
                                        : <img class="img away" src={user.user_thumbnail} alt="Logo"/>
                                    }
                                </div>
                                <p>{user.user_name}</p>
                            </section>
                            {/* open lock: &#128275;  closed lock: &#128274; */}
                            {/* if the searched user is one of the user links then... */}
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
        );
    }

}

export default SearchResults;