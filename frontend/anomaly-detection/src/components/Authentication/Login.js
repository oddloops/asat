// Login Page
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { useAuthValue } from "../../AuthContext";
import "./authentication.css";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setTimeActive } = useAuthValue()
    const navigate = useNavigate()

    const login = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            if (!auth.currentUser.emailVerified) {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    setTimeActive(true)
                    navigate('/verify-email')
                })
                .catch(err => alert(err.message))
            } else {
                navigate("/")
            }
        })
        .catch(err => setError(err.message))
    }

    return(
        <div className='center'>
            <div className='auth'>
                <h1>Log in</h1>
                {error && <div className='auth__error'>{error}</div>}
                <form onSubmit={login} name='login_form'>
                <input 
                    type='email' 
                    value={email}
                    required
                    placeholder="Enter your email"
                    onChange={e => setEmail(e.target.value)}/>

                <input 
                    type='password'
                    value={password}
                    required
                    placeholder='Enter your password'
                    onChange={e => setPassword(e.target.value)}/>

                <button type='submit'>Login</button>
                </form>
                <p>
                Don't have an account? <Link to='/register'>Create account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login