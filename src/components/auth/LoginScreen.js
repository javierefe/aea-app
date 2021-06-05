import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    // haciendo diapacth al store
    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui)
    // console.log(msgError);
    const {loading} = useSelector(state => state.ui)
    // console.log(loading);
    
    const [formValues, handleImputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formValues;

    const handeLogin = (e) => {
        e.preventDefault();

        if( isFormValid()){
            dispatch(startLoginEmailPassword(email, password));
        }
    }

    const isFormValid = () => {

        if(!validator.isEmail(email)){
            dispatch(setError('Email invalido'))
            return false;
        }else if(password.length < 5){
            dispatch(setError('Password debe ser mayor a 5 caracteres..'))
            return false;
        }

        dispatch(removeError())
        return true;
    }
    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    return (
        <div>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handeLogin}>
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
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleImputChange }
                />
                
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleImputChange }
                />          

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                   Login     
                </button>
                
                <div className="auth__social-networks">
                    <p>Login con redes sociales</p>
                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Crear nueva cuenta
                </Link>
            </form>
        </div>
    )
}
