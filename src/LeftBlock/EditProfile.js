import React, { useEffect, useRef, useState } from 'react'
import jwt_decode from "jwt-decode";

export default function EditProfile({setCurPage, curPage, user, accountImage, getImg, setUser}) {

    const name = useRef(null);
    const login = useRef(null);
    const [back, setBack] = useState(null);
    const [fileBytes, setFileBytes] = useState(null);

    useEffect(()=>{
        setBack("data:image/png;base64," + accountImage);
    }, [accountImage])

    useEffect(()=>{
        let a = document.querySelectorAll('.accountblock'); 
        if (curPage == 2) {
            a[1].classList.add('on');
        }
        else{
            a[1].classList.remove('on');
        }      
        document.querySelector('.opStatus').style.display = 'none' ;
    }, [curPage])

    useEffect(()=>{
        if (user!=null) {
            name.current.value = user.name;
            login.current.value = user.login;
        }
    }, [user])

    async function submitChanges() {
        const changedData = { 
            Id: user.id, 
            Name: name.current.value, 
            Login: login.current.value
        };
        
        const formData = new FormData();
        formData.append('file', new Blob([fileBytes]), 'filename.bin');
        formData.append('otherData', JSON.stringify(changedData));
        
        fetch('https://localhost:7049/Account/AccountEdit', {
          method: 'POST',
          body: formData
        })
        .then(response => response.text())
        .then(jwt => {
            let stat = document.querySelector('.opStatus');
            
            if (jwt!== '') {
                localStorage.setItem("jwttoken", jwt);
                const decoded = jwt_decode(jwt);
                setUser({id: decoded.Id, name: decoded.Name, login: decoded.Login });                
                getImg();
             
                stat.style.display = 'block' ;
                stat.style.color = 'rgb(18, 225, 18)';
                stat.innerHTML="data successfully changed";
            }
            else{
                stat.style.display = 'block' ;
                stat.style.color = 'red';
                stat.innerHTML="User with this login already exists";
                
            }
        })
        .catch(error => {
          console.error(error);
        });
    }

    async function handleFileInputChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function (e) {
          const bytes = new Uint8Array(e.target.result);
          setFileBytes(bytes);
        };   
        reader.readAsArrayBuffer(file);

        const fff = event.target.files[0];
        const url = URL.createObjectURL(fff);
        setBack(url);
      }
    
    return (
            <div className="accountblock">
                <div className="chatstopblock">
                    <button onClick={()=>{setCurPage(1)}} className="back-btn">
                        &#8617;
                    </button>
                    <p>Edit profile</p>              
                </div>
                <div className="editlist">
                    <div className="imgselect">
                        <div className="round" style={{ backgroundImage: "url("+ (back!=null ? back : "" ) +")" }}>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFileInputChange}></input> 
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label>Name</label>
                        <input ref={name} name="name" type="text" className="datainpit" required></input>
                    </div>
                    <div className="input-wrapper ">
                        <label>Login</label>
                        <input ref={login} name="login" type="text" className="datainpit" required></input>
                    </div>
                    <button onClick={submitChanges}>Confirm changes</button> 
                    <span className='opStatus'></span>    
                </div>
            </div>
        
    )
}
