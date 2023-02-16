import React from 'react'
import Chat from './Chat';

export default function Chatsblock({chats, setCurrchat}) {
  return (
    <div class="chatsblock"> 
            <div class="chatstopblock">
                <div class="menu"></div>
                <div class="search">
                    <input type="text" name="nick" class="nick" placeholder="Search"></input>
                </div>
            </div>
            <div class="chatsbottomblock">
                {chats.map(chat => <Chat key={chat.id} chat={chat} setCurrchat={setCurrchat}/>)}            
            </div>
        </div>
  )
}
