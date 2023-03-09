import React, { useState, useRef } from 'react'

export default function ContextMenu({ setMessId, message, connection, messages, user}) {
    const [isVisible, setIsVisible] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [currItem, setCurrItem] = useState(0);
    const lastDate = useRef(null);
    let dateblock = useRef();

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

    function onedit(){
        message.current.value = currItem.content;
        setMessId(currItem.id);
        
        setIsVisible(false);
    }

    function addZero(time) {
        return (time).toString().padStart(2, '0');
    }
    return (
      <>
        <div className="messchatall">
            {messages.map(el=> el.senderId!=user.id ?
                (
                <div onClick={resetContextMenu} onContextMenu={(event) => event.preventDefault()} key={el.id} className="message-other">
                    <p>{el.content}
                        <span className="timeMark">
                            {     
                                addZero(new Date(el.dispatchTime).getHours())
                                + ":" +
                                addZero(new Date(el.dispatchTime).getMinutes())
                            }
                        </span>
                    </p>
                </div> 
                ) : (
                    <div onClick={resetContextMenu} onContextMenu={(event) => handleContextMenu(event, el)} key={el.id} className="message-own">
                        <p>{el.content}
                            <span className="timeMark">
                                {     
                                    addZero(new Date(el.dispatchTime).getHours()) 
                                    + ":" +
                                    addZero(new Date(el.dispatchTime).getMinutes())
                                }
                            </span>
                        </p>
                    </div>
                ))}                  
        </div>

        {isVisible && (
          <div className="context_menu"
            style={{
              top: y,
              left: x
            }}
          >
            <ul className="context-block">
              <li onClick={onedit}>Edit</li>
              <li onClick={ondelete}>Delete</li>
            </ul>
          </div>
        )}
      </>
    );  
}
