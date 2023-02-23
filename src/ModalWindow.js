import React, {useEffect, useState} from 'react'

export default function ModalWindow({ getJwt, connection, modalType, setModalType }) {

    const login = React.createRef(null);
    const name = React.createRef(null);
    const password = React.createRef(null);
    const confpassword = React.createRef(null);
    const [hasError, setError] = useState(null);


    const submitLog = ()=>{
        connection.invoke("Login", login.current.value, password.current.value).catch((err) => console.error(err));
    };

    function submitReg() {
        connection.invoke("Register", name.current.value, 
            login.current.value, password.current.value).catch((err) => console.error(err));
    }
      
    useEffect(()=>{
        if (connection) {
            connection.on("JwtToken", jwt_token=>{
                if (jwt_token) {
                    localStorage.setItem("jwttoken", jwt_token);
                    getJwt();
                    setModalType("");
                }
                else{
                    console.log("The entered data is incorrect or user doesn't exist");
                    setError("The entered data is incorrect or user doesn't exist");
                }
                
            }); 
        }
    }, [connection]);


    let inputs = document.querySelectorAll(".input-wrapper");
    inputs.forEach(item => {
        item.addEventListener('click', ()=>{
            inputs.forEach(el => {
                el.classList.remove('sel');
            });
            item.classList.add('sel');
        });
    });

    
    // const onBlurHandler = (refInput) => {
    //     if (refInput.current?.value === "") {
    //         setError(true);
    //     }  
    //     else{
    //         setError(false);
    //     }
    // }
    
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
                        {/* onBlur={onBlurHandler.bind(this, login)} */}
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
