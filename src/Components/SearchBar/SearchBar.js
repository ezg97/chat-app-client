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
    
    getSuggestions = () => {
        //if zero it will
        if (this.state.text.length) {
            // console.log('has length');
            if (this.state.text.trim().length) {
                // console.log('has text');
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
                    console.log('- & matches have been returned');
                    console.log({matchedUsers});
                    if (!matchedUsers.ok) {
                        console.log('error:', matchedUsers);
                    }
                    return matchedUsers.json(); //the response is NOT Json
                })
                .then (matchedUsers => {
                    console.log({matchedUsers});
                    this.setState({
                        matchedUsers: matchedUsers
                    });
                    // if (Object.keys(matchedUsers).length > 0) {
                    //     this.context.updateLinks({matchedUsers});
                    // }
                });
            }
        }
   }

   searchClicked = () => {
       console.log(' - - - clicked search');
   }

   //debounce, wait a second to execute the method, all other calls to this method will be ignored if it is within a second
   whileSearching = debounce(() => { 
        this.getSuggestions();
    }, 1000);

    // search = debounce(console.log('been deBOUNCED'), 1000);

    render() {
        // console.log('updated: ',this.state.text)
        return(
        <div className='searchbar'>

            <div className="search">
                <input type='text' placeholder="Username" list="user-suggestions"
                onChange={(e) => this.updateText(e.target.value)}></input>

                <datalist id='user-suggestions'>
                    
                </datalist>

                <button onClick={() => this.searchClicked()}>Search</button>
            </div>

        </div>
        );
    }

}

export default SearchBar;