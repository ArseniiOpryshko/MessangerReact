import React, { useEffect, useState } from 'react'
import ContextMenu from './ContextMenu';

export default function Displblock({ user, messages, sendMessage, members, chatdelete, connection}) {
    const [otherUser, setOtherUser] = useState(null);
    const [messId, setMessId] = useState(null);

    useEffect(()=>{
        if (members) {
            members.forEach(el => {
                if(el.id!=user.id){
                    setOtherUser(el);
                }
            });
        }
    }, [members]);

    const message = React.createRef();

    function send(){
        const data = {
            id: messId,
            content: message.current.value
        }
        sendMessage(data);
        setMessId(null);

        message.current.value = "";
    }

    if(messages == null ){
        return(
            <div className="displblock">
                <div className="displblocktop"></div>
                <div className="messchat"></div>
            </div>
        );
    }

  return (
    <div className="displblock">
            <div className="displblocktop">
                <div className="biginfo">
                    <img className="circular-img-main" src={"data:image/png;base64," + (otherUser!=null?otherUser.avatar:"") } />
                    <div className="inf">
                        <span className="bigname">{otherUser?otherUser.name:""}</span>
                        {otherUser!=null && otherUser.status==true?
                        <span className="whensee" style={{color:"rgb(51,144,236)"}}>online</span>
                        :<span className="whensee" style={{color:"rgb(170,170,170)"}}>offline</span>}
                        
                        
                    </div>
                </div>
                <div onClick={chatdelete} className="sett"></div>
            </div>
            <div className="messchat">
                <ContextMenu setMessId={setMessId} message={message} messages={messages} user={user} connection={connection}/>
                <div className="writeblock">
                    <input ref={message} type="text" className="writem" placeholder="Message"></input>
                    <input onClick={send} type="button" className="sendbttn" value="&#10148;"></input>
                </div>
                
            </div>
        </div>
  )
}
