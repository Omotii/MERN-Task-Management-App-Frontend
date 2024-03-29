import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import SidePanel from './SidePanel'
import './styles.css'

const LogIn = () => {

    const userRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')


    //to focus the cursor on the email input field when the login component loads.
    //the ref is assigned in the email input field.
    useEffect(() => {
        userRef.current.focus();
    }, [])

    //to set the error Message incase of server failure or email/password mismatch
    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    //the login function that makes the api call usign axios
    //upon successful login, the user is navigated to the tasks page using navigate()
    const handleLogin = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('/api/login',
                JSON.stringify({ 
                    email: email,
                    password: password
                }),
                {
                    headers: { 'Content-Type' : 'application/json'},
                    withCredentials: true
                }
            );


            navigate('/tasks')
        }
        catch (error){
            if (!error?.response) {
                setErrMsg('No server response')
            } else if (error?.response.status === 401) {
                setErrMsg('Invalid email or password')
            } else {
                setErrMsg('Login failed')
            }
        }

    }

    return (
        <>
            <header className='login-header'>
                <img src='/images/task.png' alt='logo'/>
            </header>

            <main className='login-main'>
            <section className='main-section'>

                <h1>Welcome to TaskBit</h1>
                <p className='heading-paragraph'>Manange Task effectively</p>

                <p className={ errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                <h3 className='create-account-paragraph'>Log into your account</h3>

                <div className='form-container'>
                    <form id='login-form' className='login-form' onSubmit={handleLogin}>
                        <input type='email' id='login-email' ref={userRef} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
                        <input type='password' id='login-pwd' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                        <button type='submit'>Log in</button>
                    </form>

                    <p>Don't have an account? <Link to='/signup' className='login-span'>Sign up</Link></p>
                </div>                
                
            </section>
            
            <SidePanel />

            </main>           
            
        </>
    )
}

export default LogIn