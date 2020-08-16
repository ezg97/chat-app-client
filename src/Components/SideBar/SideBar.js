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
        fetch('http://localhost:8000/user/links/1',
                {   method: "GET", 
                    'credentials': 'include',
                    headers: new Headers({
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin':'http://localhost:3000/',
                        'Content-Type': 'application/json',
                    }),
                })
                .then(userLinks => {
                    console.log('- Links have been returned');
                    console.log({userLinks});
                    if (!userLinks.ok) {
                        console.log('error:', userLinks);
                    }
                    return userLinks.json(); //the response is NOT Json
                })
                .then (userLinks => {
                    console.log({userLinks});
                    if (Object.keys(userLinks).length > 0) {
                        this.context.updateLinks({userLinks});
                    }
                });
    }

    render() {

        return(
        <div className='page sidebar'>

            {/* <Route exact path={['/','/home']} component={SearchBar} /> */}

            <ul className='chat-list'>
                <li>
                    <section>
                        <button> </button> 
                        <p>John Bluebarry</p>
                    </section>
                    <p>></p>    
                </li>
                <li>
                    <section>
                        <button> </button> 
                        <p>Alex Jones</p>
                    </section>
                    <p>></p>    
                </li>
                <li>
                    <section>
                        <button> </button> 
                        <p>John Cena</p>
                    </section>
                    <p>></p>    
                </li>
                <li>
                    <section>
                        <button> </button> 
                        <p>Elijah G</p>
                    </section>
                    <p>></p>    
                </li>
                <li>
                    <section>
                        <button> </button> 
                        <p>JJ Abrams</p>
                    </section>
                    <p>></p>    
                </li>
                <li>
                    <section>
                        <button> </button> 
                        <p>Muhhamad T</p>
                    </section>
                    <p>></p>    
                </li>
         
            </ul>
            
          
        </div>
        );
    }

}

export default SideBar;