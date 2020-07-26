import React from 'react';
// import './Chat.css';
import LoginContext from '../../ContextAPI/LoginContext';

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

    



    render() {

        

        return(
        <div className='page sidebar'>

            <div className="search">
                <input type='text' placeholder="Username"></input>
                <button>Search</button>
            </div>

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