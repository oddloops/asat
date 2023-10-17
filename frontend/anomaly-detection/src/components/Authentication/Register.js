// Register Page
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { auth } from "./firebase"
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import "./authentication.css";

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validate password function
    const validatePassword = () => {
        let validPass = true;
        if (password !== ' ' && confirmPassword !== ' ') {
            if (password !== confirmPassword) {
                validPass = false;
                setError("Passwords do not match");
            }
        }
        return validPass;
    }

    const register = e => {
        e.preventDefault()
        setError("")
        if (validatePassword()) {
            // Create a new user with the given credientials using firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    navigate('/verify-email')
                }).catch((err) => alert(err.message))
            })
            .catch(err => setError(err.message));
        }
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    return (
        <div className='center'>
            <div className='auth'>
                <h1>Register</h1>
                {error && <div className='auth__error'>{error}</div>}
                <form onSubmit={register} name='registration_form'>
                <input 
                    type='email' 
                    value={email}
                    placeholder="Enter your email"
                    required
                    onChange={e => setEmail(e.target.value)}/>

                <input 
                    type='password'
                    value={password} 
                    required
                    placeholder='Enter your password'
                    onChange={e => setPassword(e.target.value)}/>

                    <input 
                    type='password'
                    value={confirmPassword} 
                    required
                    placeholder='Confirm password'
                    onChange={e => setConfirmPassword(e.target.value)}/>

                <button type='submit'>Register</button>
                </form>
                <span>
                Already have an account?  
                <Link to='/login'>login</Link>
                </span>
            </div>
        </div>
    )
}

export default Register