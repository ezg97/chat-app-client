import React from 'react';
// import './Chat.css';
import LoginContext from '../../ContextAPI/LoginContext';
import {debounce} from 'lodash';
import './SearchBar.css';


class SearchBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            text: '',
            matchedUsers: []
        };
    }

    static contextType = LoginContext;

    updateText = (newText) => {
        this.setState({
            text: newText
        });
        this.whileSearching();
    }

    //checks if the string contains a real value (not just spaces)
    checkText = () => { 
                //if zero it will
        if (this.state.text.length) {
            if (this.state.text.trim().length) {
                return true;
            }
        }
        return false;
    }
    
    getSuggestions = () => {
        if (this.checkText()) {
            //make a get request for the users and pass this.text to the api
            fetch(`https://protected-taiga-95742.herokuapp.com/user/search/${this.state.text}`,
            {   method: "GET", 
                'credentials': 'include',
                  headers: new Headers({
                      'Accept': 'application/json',
                      'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
                      'Content-Type': 'application/json',
                  }),
             })
            .then(matchedUsers => {
                if (!matchedUsers.ok) {
                    //console.log('error:', matchedUsers);
                }
                return matchedUsers.json(); //the response is NOT Json
            })
            .then (matchedUsers => {
                this.setState({
                    matchedUsers: matchedUsers
                });
            });
        } 
   }

   searchClicked = () => {
       //console.log(' - - - clicked search');
       
       if (this.checkText()) {
            fetch(`https://protected-taiga-95742.herokuapp.com/user/searched/${this.state.text}`,
            {   method: "GET", 
                'credentials': 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
                    'Content-Type': 'application/json',
                }),
            })
            .then(searchedUsers => {
                if (!searchedUsers.ok) {
                }
                return searchedUsers.json(); //the response is NOT Json
            })
            .then (results => {
              
                if(results.length === 0){
                    this.context.updateSearchResults(['No results found']);
                }
                else {
                    this.context.updateSearchResults(results);
                    this.context.updateSearched(this.state.text);
                }
            });
        }
   }

   //debounce, wait a second to execute the method, all other calls to this method will be ignored if it is within a second
   whileSearching = debounce(() => { 
        this.getSuggestions();
    }, 500);

    onSuggestionClick = (user) => {
        this.setState({
            text: user
        });
        this.searchClicked();

    }


    render() {
        return(
        <div className='searchbar'>

            <div className="search">
                <input type='text' placeholder="Username" list="user-suggestions"
                onChange={(e) => this.updateText(e.target.value)}
                onKeyDown={(e) => e.keyCode === 13 ? this.searchClicked() :null}></input>

                <datalist id='user-suggestions'
                onClick={(e) => this.onSuggestionClick(e.target.value)}>
                    {this.state.matchedUsers === []? 
                        null 
                        :this.state.matchedUsers.map((suggestedUsers) => 
                            <option value= {suggestedUsers}/> //doesn't work unless you provide the /> end tag
                        )
                    }
                </datalist>

                <button onClick={() => this.searchClicked()}>Search</button>
            </div>

        </div>
        );
    }

}

export default SearchBar;