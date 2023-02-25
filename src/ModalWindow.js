import React, {useEffect, useState} from 'react'

export default function ModalWindow({ getJwt, modalType, setModalType }) {

    const login = React.createRef(null);
    const name = React.createRef(null);
    const password = React.createRef(null);
    const confpassword = React.createRef(null);
    const [hasError, setError] = useState(null);


    async function submitLog() {     
        await fetch("https://localhost:7049/Account/Login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Login: login.current.value,
                Password: password.current.value
            })
        })
        .then(response => response.text())
        .then(data=>{
            CheckJwt(data);
        });
    };

    async function submitReg() {
            await fetch("https://localhost:7049/Account/Register",{
                method: 'POST', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    login: login.current.value,
                    password: password.current.value
                })
            })
            .then(response => response.text())
            .then(data=>{
                CheckJwt(data);
            })
    }
      
    function CheckJwt(jwt_token) {
        if (jwt_token) {
            localStorage.setItem("jwttoken", jwt_token);
            getJwt();
            setModalType("");
        }
        else{
            setError("The entered data is incorrect or user doesn't exist");
        }
    }


    let inputs = document.querySelectorAll(".input-wrapper");
    inputs.forEach(item => {
        item.addEventListener('click', ()=>{
            inputs.forEach(el => {
                el.classList.remove('sel');
            });
            item.classList.add('sel');
        });
    });

    
    if (localStorage.getItem("jwttoken") == null && modalType == null) {
      setModalType("log");
    }
    

    if (modalType === "log") {
        return (
            <div className="modalwindow">
                <div className="loginblock">
                <h1>Telegram v2</h1>
                <p>Input you data to log in</p>
                    <div className="input-wrapper sel">
                        <label>Login</label>
                        <input ref={login} type="text" className="datainpit"></input> 
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input ref={password} type="password" className="datainpit"></input> 
                    </div>        
                { hasError!=null ? <p style={{ color: 'red' }}>{hasError}</p> : null}         
                <input onClick={submitLog} type="button" value="Log in" className="logbutt"></input> 
                <span onClick={()=>{setModalType("reg")}}>no account yet?</span>
                
                </div>
            </div>
        )       
    }
    else if (modalType === "reg"){
        return (
            <div className="modalwindow">
                <div className="loginblock">
                <h1>Creating new account</h1>
                <p>Input your data</p>
                    <div className="input-wrapper">
                        <label>Name</label>
                        <input ref={name} type="text" className="datainpit"></input>
                    </div>
                    <div className="input-wrapper ">
                        <label>Login</label>
                        <input ref={login} type="text" className="datainpit"></input>
                    </div>
                    <div className="input-wrapper">
                        <label>Password</label>
                        <input ref={password}  type="password" className="datainpit"></input>
                    </div>             
                    <div className="input-wrapper">
                        <label>Confirm your password</label>
                        <input ref={confpassword} type="password" className="datainpit" ></input>
                    </div>         
                <input onClick={submitReg} type="button" value="Register" className="logbutt"></input>
                <span onClick={()=>{setModalType("log")}}>return to log in</span>
                </div>
            </div>
        )
    }
    else{
        return null;
    }   
}
