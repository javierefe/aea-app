import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';

import {setError} from '../../actions/ui'
import {removeError} from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    
    const {msgError} = useSelector(state => state.ui) // recibe un callback
    // console.log(msgError);


    const [formValues, handleImputChange]= useForm({
        // name: 'Hernando',
        // email: 'nando@gmail.com',
        // password: '123456',
        // password2: '123456'
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formValues;
    
    const handleRegister = (e) => {
        // para que no haga la propagacion del fomruilario por la url
        e.preventDefault()
        
        if(isFormValid()) {
            // console.log('Formulario correcto');
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {

        if(name.trim().length === 0){
            // console.log('Name es required');
            dispatch(setError('Name es required'))
            return false;
        }else if(!validator.isEmail(email)){
            // console.log('Email is not valid');
            dispatch(setError('Email is not valid'))
            return false;
        }else if( password !== password2 || password.length < 5){
            // console.log('Password invalido, necesita mas de 5 caracteres..');
            dispatch(setError('Password invalido, necesita mas de 5 caracteres..'))
            return false;
        }
        
        dispatch(removeError())
        return true;
    }

    return (
        <div>
            <h3 className="auth__title">Registro</h3>

            <form onSubmit={handleRegister}>
                {/* El mensaje solo se mostrara Si msgError es diferente de null, es la forma corta del operador ternario */}
                {   
                    msgError&&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={handleImputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={handleImputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={handleImputChange}
                />    

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={handleImputChange}
                />       

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                
                >
                   Registrar    
                </button>
                
                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Ya estas registrado?
                </Link>
            </form>
        </div>
    )
}