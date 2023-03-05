import React, { useEffect, useState } from 'react'

export default function Chat({ user, chat, setCurrchatId}) {

    const [date, setDate] = useState(null);
    const [otherUser, setOtherUser] = useState(null);

    function changeChat(e){
        document.querySelectorAll('.chat-a').forEach(elem=>{
            elem.classList.remove("selected");
        });
        e.currentTarget.classList.add("selected");
        setCurrchatId(chat.id);
    }

    useEffect(()=>{
        chat.users.forEach(el => {
            if(el.id!=user.id){
                setOtherUser(el)
            }
        });    
    }, []);

    useEffect(()=>{
        if(chat){
            
            if (chat.messages.length!=0) {
                let d = new Date(chat.messages[chat.messages.length-1].dispatchTime);
                setDate((new Date).toDateString()===d.toDateString() ? d.getHours()+":"+d.getMinutes() : d.toLocaleDateString())
            }
            else{
                setDate("");
            }
        }
    }, [chat]);

  return (
    <div className="chat">
        <button className="chat-a" onClick={changeChat}>
            <img className="circular-img" src={"data:image/png;base64," + (otherUser!=null?otherUser.avatar:"") } />
            <div className="chatinnerflex">
                <div className="chattop">
                    <span className="name">{otherUser!=null?otherUser.name:""}</span>
                    <span className="lasttime">{ date }</span>
                </div>
                <div className="chatbottom">
                    <span className="lasttext">{chat.messages.length != 0 ?chat.messages[0].content:""}</span>     
                    {/* <span className="newmess">{ }</span>                       */}
                </div>
            </div>
        </button>
    </div>
  )
}
