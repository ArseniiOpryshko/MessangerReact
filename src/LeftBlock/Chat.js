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

            const lastMessDate = new Date(chat.messages[chat.messages.length-1].dispatchTime);
            const today = new Date();

            if (lastMessDate.getDate() === today.getDate()) {
                setDate(
                lastMessDate.getHours().toString() +
                    ':' +
                    lastMessDate.getMinutes().toString().padStart(2, '0')
                );
            } else if (
                Math.floor((today - lastMessDate) / (1000 * 60 * 60 * 24)) >= 7
            ) {
                const options = { day: 'numeric', month: 'short' };
                const dateStr = lastMessDate.toLocaleDateString(undefined, options);
                setDate(dateStr);
            } else {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const dayName = days[lastMessDate.getDay()];
                setDate(dayName);
            }
        }
    }, [chat.messages]);

  return (
    <div className="chat">
        <button className="chat-a" onClick={changeChat}>
            <img className="circular-img" src={"data:image/png;base64," + (otherUser!=null?otherUser.avatar:"") } />
            { otherUser!=null && otherUser.status==true ? 
            <div style={{display: 'block'}} className='greendot'></div> : 
            <div style={{display: 'none'}} className='greendot'></div>}

            <div className="chatinnerflex">
                <div className="chattop">
                    <span className="name">{otherUser!=null?otherUser.name:""}</span>
                    <span className="lasttime">{ date }</span>
                </div>
                
                <div className="chatbottom">
                    <span className="lasttext">{chat.messages.length != 0 ?chat.messages[chat.messages.length-1].content:""}</span>     
                    {/* <span className="newmess">{ }</span>                       */}
                </div>
            </div>
        </button>
    </div>
  )
}
