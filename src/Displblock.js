import React from 'react'

export default function Displblock({currchat, sendMessage}) {
    const message = React.createRef();
    function send(){
        sendMessage(currchat.id, message.current.value);
    }
    if(currchat == null || typeof currchat == 'number'){
        return(
            <div class="displblock">
                <div class="displblocktop"></div>
                <div class="messchat"></div>
            </div>
        );
    }

    let user = {};
    currchat.users.forEach(el => {
        if(el.id!=2){
            user = el;
        }
    });
    
  return (
    <div class="displblock">
            <div class="displblocktop">
                <div class="biginfo">
                    <img class="circular-img-main" src="./images/forest.jpg" />
                    <div class="inf">
                        <span class="bigname">{user.name}</span>
                        <span class="whensee">{user.status == true ? "online" : "offline" }</span>
                    </div>
                </div>
                <div class="sett"></div>
            </div>
            <div class="messchat">
                <div class="messchatall">
                    {currchat.messages.map(el=> el.senderId!=1 ?
                         <div key={el.id} class="message-other"><p>{el.content}</p></div> :
                         <div key={el.id} class="message-own"><p>{el.content}</p></div>)}                  
                </div>
                <div class="writeblock">
                    <input ref={message} type="text" class="writem" placeholder="Message"></input>
                    <input onClick={send} type="button" class="sendbttn" value="&#10148;"></input>
                </div>
            </div>
        </div>
  )
}
