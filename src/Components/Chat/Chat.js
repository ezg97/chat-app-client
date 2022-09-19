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

    
    onChange = (content) => {
      
        this.context.onContentChange(content);
        

        this.isTyping()
    }

    //debounce, wait a second to execute the method, all other calls to this method will be ignored if it is within a second
    isTyping = throttle(() => { 
        this.context.typingMessage(this.context.user_name);
    }, 3000);


    render() {

        
        return(
        <div className='page chat'>
          
          <div className='user-header'>
              {this.context.allLinks.map(obj => 
                (obj.id === this.context.selectedUser)
                    ?<ul>
                        <li><div className='img-border'><img class="img black" src={obj.user_thumbnail} alt="Logo" onError={({ currentTarget }) => {
                            currentTarget.onError = null; // prevents looping
                            currentTarget.src = "https://qph.cf2.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a"
                        }}/></div></li>
                        <li>{obj.user_name}</li>
                    </ul>
                    :null

            )}
                    
                </div>
            <div id='chat-window'>
                
                <div className="typing" ref={ this.myRef }>
                    {this.context.isTyping
                        ? this.context.typingId === this.context.selectedUser
                            ? <p>{`${this.context.typingHandle}`} is typing...</p>
                            : null
                        : null
                    }
                    
                </div>

               
                {/*IF: The index of the user's object (form getSelectedUserId)  is NOT "-1", 
                        THEN:   Access the the object from the rooms array by index (getSelectedUserId) 
                                and display the messages that correspond with that room  
                        ELSE:   Nothing, no user has been selected. */}
                <div className={'msg-list'}>
                    {(this.context.getSelectedUserId() >= 0)
                        ? this.context.rooms[this.context.getSelectedUserId()].messages.map(msgs =>
                            (msgs.id == this.context.id)
                                ?<p className='messages-right'> {/*<span className='meta-right'>{msgs.handle}</span>*/}
                                <span className='text-message'>{msgs.content}</span></p>
                                :<p className='messages'> {/*<span className='meta'>{msgs.handle}</span>*/}
                                <span className='text-message'>{msgs.content}</span></p>
                            
                            // <>
                            // {//console.log('attn: ', msgs.handle)}
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
                </div>
                
                {/* </div> */}
            </div>
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