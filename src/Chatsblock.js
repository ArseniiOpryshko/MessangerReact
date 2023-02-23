import React from 'react'
import Chat from './Chat';

export default function Chatsblock({user, chats, setCurrchat}) {
  return (
    <div className="chatsblock"> 
            <div className="chatstopblock">
                <div className="menu"></div>
                <div className="search">
                    <input type="text" name="nick" className="nick" placeholder="Search"></input>
                </div>
            </div>
            <div className="chatsbottomblock">
                {chats.map(chat => <Chat key={chat.id} user={user} chat={chat} setCurrchat={setCurrchat}/>)}            
            </div>
        </div>
  )
}
