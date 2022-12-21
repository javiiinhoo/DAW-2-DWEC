import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './UserLogin.css';
import { useOutletContext } from "react-router-dom";
function UserLogin(props) {
    const [loggedIn, setLoggedIn] = useOutletContext();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [hidden, setHidden] = useState(true);
    const [hidden2, setHidden2] = useState(true);
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        if ((formData.username.length == 0) || (formData.password.length == 0)) {
            return;

        }
        axios.post('http://localhost:8000/api/v2/sessions', formData).then(response => {

            setHidden(false);
            navigate(`/`);

            localStorage.setItem("sessionToken", response.data.session_token);
            localStorage.setItem("sessionId", response.data.session_id);
            setLoggedIn(true);
        }).catch(err => {
            if (err.response.status == 401) {
                setHidden(false);
            }
            if (err.response.status == 404) {
                setHidden2(false);
            }
        });
    }
    const onChangeUsername = (e) => {
        setFormData({
            username: e.target.value,
            password: formData.password,
            passwordConfirm: formData.passwordConfirm
        })
    }
    const onChangePassword = (e) => {
        setFormData({
            username: formData.username,
            password: e.target.value,
        })
    }
    return (<div>
        <h1 data-cy="header" className="registerHeader">Inicia sesión</h1>
        <form data-cy="loginForm" className="loginForm" onSubmit={onSubmit} >
            <input type="text" className="loginFormInput" onChange={onChangeUsername} placeholder='new.user' data-cy="inputUsername" />
            <p data-cy='errorWrongPassword' className='loginUserFeedback' hidden={hidden}>Contraseña incorrecta</p>
            <p data-cy='errorUserNotFound' className='loginUserFeedback' hidden={hidden2}>No se ha encontrado una cuenta de usuario para ese nombre</p>

            <br></br>
            <input type="password" className="loginFormInput" onChange={onChangePassword} placeholder='Contraseña' data-cy="inputPassword" />
            <br></br>
            <input type="submit" className="loginFormInput" value="Autenticarse" data-cy="inputSubmit" />
        </form>
    </div>
    )
}
export default UserLogin;