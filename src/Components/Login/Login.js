import React from 'react';
// import './Chat.css';
import LoginContext from '../../ContextAPI/LoginContext';

import './Login.css';


class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            password: '',
            email: ''
        };

    }

    static contextType = LoginContext;

    


    onChangePassword = (password) => {
        this.setState({
            password
        });
    }

    onChangeEmail = (email) => {
        this.setState({
            email
        });
    }

    btnLocal = (e) => {
       /* e.preventDefault();
        console.log('LOCAL clicked');
        console.log('state: ', this.state);
//?username=ezg@yahoo.com&password=alskdjf
        fetch('https://protected-taiga-95742.herokuapp.com/local/login?' + new URLSearchParams({
            email: 'elijah@yahoo.com',
            password: 'wakawaka97'
        }),
        {   method: "POST", 
            'credentials': 'include',
            // headers: {
            //     'Accept': 'application/json',
            //     'Access-Control-Allow-Origin':'https://www.chat-app.dev',
            //     'Content-Type': 'application/json',
            //     'redirect': 'follow'
            // },
            headers: new Headers({
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev/',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify( 
                { email: this.state.email, password: this.state.password }
            )
        })
        .then(res => {
             console.log('local auth returned');
            if(!res.ok){
                console.log('error:', res);
            }
            // console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            console.log('local 2');
            console.log('succsess: ', res);
        })
        .catch(err => {
            console.log('ERROR: ', err);
        })*/

        e.preventDefault();
        console.log('google clicked');
        // let myWindow = window.open("https://protected-taiga-95742.herokuapp.com/auth/google","google","width=600,height=800");

        // console.log(myWindow);
        // console.log(myWindow.closed);

        

        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/github',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // console.log('google 2');
            if(!res.ok){
                console.log('error:', res);
            }
            // console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/github";

            console.log(myWindow);
            // console.log(myWindow.closed);
            

        })
        .catch(err => {
            console.log('ERROR: ', err);
        })
     }

     //TWITCH
     btnTwitch = (e) => {
        e.preventDefault();
        console.log('twitch clicked');

        //this don't matter bc it gonna return nothing so we can open a new tab
        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/github',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // console.log('google 2');
            if(!res.ok){
                console.log('error:', res);
            }
            // console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/twitch";

            console.log(myWindow);
            // console.log(myWindow.closed);
            

        })
        .catch(err => {
            console.log('ERROR: ', err);
        })
     }

    btnGoogle = (e) => {
        e.preventDefault();
        console.log('google clicked');
        // let myWindow = window.open("https://protected-taiga-95742.herokuapp.com/auth/google","google","width=600,height=800");

        // console.log(myWindow);
        // console.log(myWindow.closed);

        

        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/google',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // console.log('google 2');
            if(!res.ok){
                console.log('error:', res);
            }
            // console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/google";

            console.log(myWindow);
            // console.log(myWindow.closed);
            

        })
        .catch(err => {
            console.log('ERROR: ', err);
        })
     }


     btnLinkedIn = (e) => {
        e.preventDefault();
        console.log('linkedin clicked');

        //this don't matter bc it gonna return nothing so we can open a new tab
        fetch('https://protected-taiga-95742.herokuapp.com/auth/login/github',
        {   method: "GET", 
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'https://www.chat-app.dev',
                'Content-Type': 'applications/json',
                'redirect': 'follow'
            }
        })
        .then(res => {
            // console.log('google 2');
            if(!res.ok){
                console.log('error:', res);
            }
            // console.log('made it');
            return res.json(); //the response is NOT Json
        })
        .then(res => {
            // console.log('succsess: ', res);
            let myWindow = window.location.href="https://protected-taiga-95742.herokuapp.com/auth/linkedin";

            console.log(myWindow);
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
            {/* {console.log('cookie%c:'+document.cookie,'color: blue; font-size: 16px')} */}

            <form className="user-info-form" onSubmit={e => this.handleSubmit(e)}>

                <section className="section-form">
                    <div className="section-form-inner">
                        <label htmlFor="business_name">Email:</label>
                        {/* Name INPUT */}
                        <input 
                            type="text"
                            className="name-box" 
                            name="business_name" 
                            id="business_name" 
                            value={this.state.email}
                            onChange={(e) => this.onChangeEmail(e.target.value)}
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
                            onChange={(e) => this.onChangePassword(e.target.value)}
                        />
                    </div>
                </section>
                

                <button type='submit' className='submit' onClick={(e) => this.btnLocal(e)}>Github</button>

                <section>
                    <button className='google' onClick={(e) => this.btnGoogle(e)}>Google</button>
                    <button className='submit' onClick={(e) => this.btnTwitch(e)}>Twitch</button>
                    <button className='submit' onClick={(e) => this.btnLinkedIn(e)}>LinkedIn</button>


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