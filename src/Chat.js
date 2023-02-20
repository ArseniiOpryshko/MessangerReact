import React from 'react'

export default function Chat({chat, setCurrchat}) {
    function changeChat(e){
        document.querySelectorAll('.chat-a').forEach(elem=>{
            elem.classList.remove("selected");
        });
        e.currentTarget.classList.add("selected");
        setCurrchat(chat.id);
    }

    let names = "";
    chat.users.forEach(el => {
        if(el.id!=2){
            names+=el.name+", "
        }
    });
    names = names.slice(0, names.length-2)
    
  return (
    <div class="chat">
        <button class="chat-a" onClick={changeChat}>
            <img class="circular-img" src="./images/forest.jpg" />
            <div class="chatinnerflex">
                <div class="chattop">
                    <span class="name">{names}</span>
                    <span class="lasttime">{new Date(chat.lastTime).toLocaleDateString()}</span>
                </div>
                <div class="chatbottom">
                    <span class="lasttext">{chat.lastMessage}</span>     
                    <span class="newmess">{chat.notReaded}</span>                      
                </div>
            </div>
        </button>
    </div>
  )
}
