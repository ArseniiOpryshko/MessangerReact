import React, { useState, useRef } from 'react'

export default function ContextMenu({connection, messages, user}) {
    const [isVisible, setIsVisible] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [currItem, setCurrItem] = useState(0);

    function handleContextMenu(event, item) {
        event.preventDefault();
        setX(event.pageX);
        setY(event.pageY);
        setIsVisible(true);
        setCurrItem(item)      
    }

    function resetContextMenu(){
        setIsVisible(false);
    }

    function ondelete(){
        connection.invoke('DeleteMessage', currItem.id);
        setIsVisible(false);
    }
    return (
      <>
        <div className="messchatall">
            {messages.map(el=> el.senderId!=user.id ?
             <div onClick={resetContextMenu} onContextMenu={(event) => event.preventDefault()} key={el.id} className="message-other"><p>{el.content}</p></div> :
             <div onClick={resetContextMenu} onContextMenu={(event) => handleContextMenu(event, el)} key={el.id} className="message-own"><p>{el.content}</p></div>)}                  
        </div>

        {isVisible && (
          <div className="context_menu"
            style={{
              top: y,
              left: x
            }}
          >
            <ul className="context-block">
              <li>Change</li>
              <li onClick={ondelete}>Delete</li>
            </ul>
          </div>
        )}
      </>
    );  
}
