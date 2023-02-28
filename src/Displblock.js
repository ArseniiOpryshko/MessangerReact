import React, { useEffect, useState } from 'react'

export default function Displblock({ user, messages, sendMessage, members}) {
    const [otherUser, setOtherUser] = useState(null);
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
        sendMessage(message.current.value);
        message.current.value = "";
    }
    if(messages == null){
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
                    <img className="circular-img-main" src="./images/forest.jpg" />
                    <div className="inf">
                        <span className="bigname">{otherUser.name}</span>
                        <span className="whensee">{otherUser.status==true?"online":"offline"}</span>
                    </div>
                </div>
                <div className="sett"></div>
            </div>
            <div className="messchat">
                <div className="messchatall">
                    {messages.map(el=> el.senderId!=user.id ?
                         <div key={el.id} className="message-other"><p>{el.content}</p></div> :
                         <div key={el.id} className="message-own"><p>{el.content}</p></div>)}                  
                </div>
                <div className="writeblock">
                    <input ref={message} type="text" className="writem" placeholder="Message"></input>
                    <input onClick={send} type="button" className="sendbttn" value="&#10148;"></input>
                </div>
            </div>
        </div>
  )
}
