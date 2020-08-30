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
            // console.log('has length');
            if (this.state.text.trim().length) {
                return true;
            }
        }
        return false;
    }
    
    getSuggestions = () => {
        if (this.checkText()) {
            //make a get request for the users and pass this.text to the api
            fetch(`http://localhost:8000/user/search/${this.state.text}`,
            {   method: "GET", 
                'credentials': 'include',
                  headers: new Headers({
                      'Accept': 'application/json',
                      'Access-Control-Allow-Origin':'http://localhost:3000/',
                      'Content-Type': 'application/json',
                  }),
             })
            .then(matchedUsers => {
                if (!matchedUsers.ok) {
                    // console.log('error:', matchedUsers);
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
       console.log(' - - - clicked search');
       
       if (this.checkText()) {
            fetch(`http://localhost:8000/user/searched/${this.state.text}`,
            {   method: "GET", 
                'credentials': 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000/',
                    'Content-Type': 'application/json',
                }),
            })
            .then(searchedUsers => {
                console.log('- & matches have been returned');
                if (!searchedUsers.ok) {
                    console.log('error:', searchedUsers);
                }
                return searchedUsers.json(); //the response is NOT Json
            })
            .then (results => {
                console.log({results});
                console.log(results)
                console.log(results.length === 0);
                if(results.length === 0){
                    this.context.updateSearchResults(['No results found']);
                }
                else {
                    this.context.updateSearchResults(results);
                    this.context.updateSearched(this.state.text);
                }
                        // if (Object.keys(matchedUsers).length > 0) {
                        //     this.context.updateLinks({matchedUsers});
                        // }
            });
        }
   }

   //debounce, wait a second to execute the method, all other calls to this method will be ignored if it is within a second
   whileSearching = debounce(() => { 
        this.getSuggestions();
    }, 500);

    // search = debounce(console.log('been deBOUNCED'), 1000);

    render() {
        // console.log('updated: ',this.state.text)
        return(
        <div className='searchbar'>

            <div className="search">
                <input type='text' placeholder="Username" list="user-suggestions"
                onChange={(e) => this.updateText(e.target.value)}></input>

                <datalist id='user-suggestions'>
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