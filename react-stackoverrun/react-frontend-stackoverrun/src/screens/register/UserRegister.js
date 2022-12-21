import axios from "axios";
import React, { useState, useEffect } from "react";
import './UserRegister.css'
function UserRegister(props) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    });
    const [hidden, setHidden] = useState(true);
    const [hidden2, setHidden2] = useState(true);
    const [hidden3, setHidden3] = useState(true);
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
            passwordConfirm: formData.passwordConfirm
        })
    }
    const onChangePasswordConfirm = (e) => {
        setFormData({
            username: formData.username,
            password: formData.password,
            passwordConfirm: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.username.length === 0 || formData.password.length === 0 || formData.passwordConfirm.length === 0) {
            return;
        }
        axios.post('http://localhost:8000/api/v2/users', formData).then(response => {
            console.log(response)
            setHidden(false);
        }).catch(err => {
            if (err.response.status == 409) {
                setHidden3(false);
            }
            if (err.response.status == 400) {
                setHidden2(false);
            }
        });
    }
    return (<div>
        <h1 data-cy="header" className="registerHeader">Crea tu cuenta</h1>
        <p data-cy='successText' className='responseUserFeedback' hidden={hidden}>¡Registro exitoso!</p>
        <p data-cy='errorPasswords' className='responseUserFeedback' hidden={hidden2}>No se ha registrado el usuario, quizá porque las contraseñas no coincidían</p>
        <p data-cy='errorAlreadyRegistered' className='responseUserFeedback' hidden={hidden3}>La petición ha fallado porque ya existe un usuario con ese nombre</p>
        <form data-cy="userRegisterForm" className="registerForm" onSubmit={onSubmit}>
            <input type="text" className="registerFormInput" onChange={onChangeUsername} placeholder='new.user' data-cy="inputUsername" />
            <br>
            </br>
            <input type="password" className="registerFormInput" onChange={onChangePassword} placeholder='Contraseña' data-cy="inputPassword" />
            <br>
            </br>
            <input type="password" className="registerFormInput" onChange={onChangePasswordConfirm} placeholder='Confirmar contraseña' data-cy="inputPasswordConfirm" />
            <br>
            </br>
            <input type="submit" className="registerFormInput" value="Empezar" data-cy="inputSubmit" />
        </form>
    </div>);
}
export default UserRegister;