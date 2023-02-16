import React from 'react'

export default function Chat({chat, setCurrchat}) {
    function changeChat(e){
        document.querySelectorAll('.chat-a').forEach(elem=>{
            elem.classList.remove("selected");
        });
        e.currentTarget.classList.add("selected")
        setCurrchat(chat);
    }

  return (
    <div class="chat">
        <button class="chat-a" onClick={changeChat}>
            <img class="circular-img" src="./images/forest.jpg" />
            <div class="chatinnerflex">
                <div class="chattop">
                    <span class="name">{chat.name}</span>
                    <span class="lasttime">{chat.lasttime}</span>
                </div>
                <div class="chatbottom">
                    <span class="lasttext">{chat.lastmessage}</span>     
                    <span class="newmess">{chat.newCount}</span>                      
                </div>
            </div>
        </button>
    </div>
  )
}
