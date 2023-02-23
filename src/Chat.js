import React from 'react'

export default function Chat({ user, chat, setCurrchat}) {
    function changeChat(e){
        document.querySelectorAll('.chat-a').forEach(elem=>{
            elem.classList.remove("selected");
        });
        e.currentTarget.classList.add("selected");
        setCurrchat(chat.id);
    }

    let names = "";
    chat.users.forEach(el => {
        if(el.id!=user.id){
            names+=el.name+", "
        }
    });
    names = names.slice(0, names.length-2)
    
  return (
    <div className="chat">
        <button className="chat-a" onClick={changeChat}>
            <img className="circular-img" src="./images/forest.jpg" />
            <div className="chatinnerflex">
                <div className="chattop">
                    <span className="name">{names}</span>
                    <span className="lasttime">{new Date(chat.lastTime).toLocaleDateString()}</span>
                </div>
                <div className="chatbottom">
                    <span className="lasttext">{chat.lastMessage}</span>     
                    <span className="newmess">{chat.notReaded}</span>                      
                </div>
            </div>
        </button>
    </div>
  )
}
