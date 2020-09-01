import React from 'react';
import './Chat.css';
import Store from '../../ContextAPI/Store';

import {throttle} from 'lodash';



class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            handle: '',
            content: ''
        };

        this.typing = 0;
        this.myRef = React.createRef();
    }

    static contextType = Store;

    


    // onChange = (handle, content, className) => {
    onChange = (content) => {

        // if (handle) {
        //     this.setState({
        //         handle
        //     });
        // }
        // if (content) {
        //     this.setState({
        //         content
        //     });
        // }
        
        this.context.onContentChange(content);
        

        this.isTyping()
    }

    //debounce, wait a second to execute the method, all other calls to this method will be ignored if it is within a second
    isTyping = throttle(() => { 
        this.context.typingMessage(this.context.user_name);
    }, 3000);

    // isTyping = () => {
    //     this.context.typingMessage(this.context.user_name);
    // }

    //this function will add and remove the hide class to a reference... 3 second intervals between class being most recently added and removed
    // isTyping = (className) => {
    //     //clear the timer that way it doesn't get stacked
    //     clearTimeout(this.typing);
    //     //if the hide class is already included, then remove
    //     if (this.myRef.current.classList.value.includes('hide')) {
    //         this.myRef.current.classList.toggle('hide');
    //     }
    //     //set timer for 3 seconds after most recent keypress and then add the hide class
    //     this.typing = setTimeout(() => {
    //         this.myRef.current.classList.toggle('hide')

    //     }, 3000);
    // }



    render() {

        console.log('all links was gud', this.context.selectedUser);
        
        return(
        <div className='page chat'>
          
          <div className='user-header'>
              {this.context.allLinks.map(obj => 
                (obj.id === this.context.selectedUser)
                    ?<ul>
                        <li><div className='img-border'><img class="img active" src={obj.user_thumbnail} alt="Logo"/></div></li>
                        <li>{obj.user_name}</li>
                    </ul>
                    :null

            )}
                    
                </div>
            {/* {console.log('here -:', this.context)} */}
            <div id='chat-window'>
                
                {/* <div id='output'> */}
                <div className="typing" ref={ this.myRef }>
                    {this.context.isTyping
                        ? this.context.typingId === this.context.selectedUser
                            ? <p>{`${this.context.typingHandle}`} is typing...</p>
                            : null
                        : null
                    }
                    
                </div>
                {/* using messages var from context 
                {
                this.context.messages.map(msgs => 
                    <p className='messages'> {msgs.handle} - {msgs.content}</p>
                )} */}
                {console.log('loopa', this.context.getSelectedUserId())}
                {(this.context.getSelectedUserId() >= 0) ?console.log('msgs: ',this.context.rooms[this.context.getSelectedUserId()].messages):null}
                {console.log('rooms', this.context.rooms)}
                {/*IF: The index of the user's object (form getSelectedUserId)  is NOT "-1", 
                        THEN:   Access the the object from the rooms array by index (getSelectedUserId) 
                                and display the messages that correspond with that room  
                        ELSE:   Nothing, no user has been selected. */}
                {(this.context.getSelectedUserId() >= 0)
                    ? this.context.rooms[this.context.getSelectedUserId()].messages.map(msgs =>
                        (msgs.id == this.context.id)
                            ?<p className='messages-right'> {/*<span className='meta-right'>{msgs.handle}</span>*/}
                            <span className='text-message'>{msgs.content}</span></p>
                            :<p className='messages'> {/*<span className='meta'>{msgs.handle}</span>*/}
                            <span className='text-message'>{msgs.content}</span></p>
                         
                        // <>
                        // {console.log('attn: ', msgs.handle)}
                        /* <p className='messages'> <span className='meta'>{msgs.handle}</span>
                         <span className='text-message'>{msgs.content}</span></p>
                         </> */
                        // (msgs.id == this.context.user.id)
                            // ?<p className='messages'> <span className='meta'>{msgs.handle}</span>
                            // <span className='text-message'>{msgs.content}</span></p>
                            // :<p className='messages-right'> <span className='meta-right'>{msgs.handle}</span>
                            // <span className='text-message'>{msgs.content}</span></p>
                         
                    )
                    : <p className='offline'> User is offline and cannot receive messages right now.</p>
                }
                
                {/* </div> */}
            </div>
            {/* <input id='handle' onChange={(event) => this.onChange(event.target.value, null, event)} type='text' placeholder='Handle'> */}
            {/* </input> */}
            {(this.context.getSelectedUserId() >= 0)
            ?   <div className='text-area'>
                    <textarea rows="3" id='message' 
                        onKeyDown={(e) => e.keyCode === 13 && !e.shiftKey ? this.context.sendMessage(e, this.context.user_name, this.context.getSelectedUserId() >= 0? this.context.rooms[this.context.getSelectedUserId()].content : null, this.context.id, this.context.user_thumbnail) : null} 
                        onChange={(event) => this.onChange(event.target.value)}  
                        type='text' placeholder='Message' 
                        value={this.context.user_name, this.context.getSelectedUserId() >= 0? this.context.rooms[this.context.getSelectedUserId()].content : null}>
                     </textarea>
                    <button className={'send-button'} id="send" onClick={(e) => this.context.sendMessage(e, this.context.user_name, this.context.getSelectedUserId() >= 0? this.context.rooms[this.context.getSelectedUserId()].content : null, this.context.id, this.context.user_thumbnail)}><i class="far fa-paper-plane"></i>{/*&#11165;*/}</button>
                </div>
            : null
            }
        </div>
        );
    }

}

export default Chat;