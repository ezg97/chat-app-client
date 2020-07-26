import React from 'react';
// import './Chat.css';
import LoginContext from '../../ContextAPI/LoginContext';

import './Login.css';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            handle: '',
            content: ''
        };

    }

    static contextType = LoginContext;

    


    onChange = (handle, content, className) => {

        if (handle) {
            this.setState({
                handle
            });
        }
        if (content) {
            this.setState({
                content
            });
        }

        this.isTyping()
    }

    isTyping = () => {
        this.context.typingMessage(this.state.handle);
    }


    btnGoogle = (e) => {
        e.preventDefault();
        console.log('google clicked');
        // let myWindow = window.open("http://localhost:8000/auth/google","google","width=600,height=800");

        // console.log(myWindow);
        // console.log(myWindow.closed);

        

        fetch('http://localhost:8000',
        { method: "GET", redirect: "follow", 'content-type': 'application/json'})
        .then(res => {
            console.log('google 2');
            if(!res.ok){
                console.log('error:', res);
            }

            return res.json(); //the response is NOT Json
        })
        .then(res => {
            console.log('succsess: ', res);
            // let myWindow = window.location.href="http://localhost:8000/auth/google";

            // console.log(myWindow);
            // console.log(myWindow.closed);
            

        })
        .catch(err => {
            console.log('ERROR: ', err);
        })
     }

    render() {

        

        return(
        <div className='page'>
            <h3>Log In</h3>

            <form className="user-info-form" onSubmit={e => this.handleSubmit(e)}>

                <section className="section-form">
                    <div className="section-form-inner">
                        <label htmlFor="business_name">Business Name:</label>
                        {/* Name INPUT */}
                        <input 
                            type="text"
                            className="name-box" 
                            name="business_name" 
                            id="business_name" 
                            value={this.state.business_name}
                            onChange={(e) => this.updateBusinessName(e.target.value)}
                        />
                    </div>

                </section>
                <section className="section-form">
                    <div className="section-form-inner">
                        <label htmlFor="password">Password:</label>
                        {/* Name INPUT */}
                        <input 
                            type="password"
                            className="name-box" 
                            name="password" 
                            id="password" 
                            value={this.state.password}
                            onChange={(e) => this.updatePassword(e.target.value)}
                        />
                    </div>
                </section>
                

                <button type='submit' className='submit'>Submit</button>

                <section>
                    <button className='google' onClick={(e) => this.btnGoogle(e)}>Google</button>
                </section>
                <section className={this.state.errorClass}>
                    <p>{this.state.errorMessage}</p>
                </section>

            </form>
            
            {/* {console.log('here -:', this.context)}
            
                
                {/* </div> */}
            {/* <input id='handle' onChange={(event) => this.onChange(event.target.value, null, event)} type='text' placeholder='Handle'>
            </input>
            <input id='message' onChange={(event) => this.onChange(null, event.target.value)}  type='text' placeholder='Message'></input>
            <button id="send" onClick={() => this.context.sendMessage(this.state.handle, this.state.content)}>Send</button>  */}

        </div>
        );
    }

}

export default Login;