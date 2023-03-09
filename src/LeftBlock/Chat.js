import React, { useEffect, useState } from 'react'

export default function Chat({ user, chat, setCurrchatId, currchatId, connection}) {

    const [date, setDate] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [unreadedCount, setUnreadedCount] = useState(null)


    function changeChat(e){
        document.querySelectorAll('.chat-a').forEach(elem=>{
            elem.classList.remove("selected");
        });
        e.currentTarget.classList.add("selected");
        setCurrchatId(chat.id);
        if (unreadedCount!=0) {
            connection.invoke('ReadAllMessages', chat.id, parseInt(user.id, 10))
        }
        setUnreadedCount(0);
    }

    useEffect(()=>{
        chat.users.forEach(el => {
            if(el.id!=user.id){
                setOtherUser(el)
            }
        });    
        if(chat.messages.length <= 0){
            setUnreadedCount(0);
        }
        else{
            setUnreadedCount((chat.messages.filter(e => e.isReaded === false && e.sender.id!=parseInt(user.id, 10))).length-1);
        }
        
    }, []);

    useEffect(()=>{
        if(chat){
            if (chat.messages[chat.messages.length-1]!=undefined) {
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
            
        }

        if(currchatId!=chat.id){
            setUnreadedCount(prev=>prev+1)
        }
        else{
            console.log(chat.messages[chat.messages.length-1].id)
            connection.invoke('ReadLastMessage', chat.messages[chat.messages.length-1].id);
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
                    {unreadedCount!=0 ? <span className="newmess"> { unreadedCount } </span>:""}
                                      
                </div>
            </div>
        </button>
    </div>
  )
}
