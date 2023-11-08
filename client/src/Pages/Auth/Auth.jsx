import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'

const Auth = () => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSwitch = () => {
		setIsSignUp(!isSignUp);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!email && !password){
			alert("Enter email and password");
		}
		if(isSignUp){
			if(!name){
				alert("Enter a name to continue");
			}
			dispatch(signup({ name, email, password }, navigate))
		}else{
			dispatch(login( { email, password }, navigate))
		}
		console.log({ name, email, password });
	}

	return (
		<section className="auth-section">
		{ isSignUp && <AboutAuth />}
			<div className="auth-container-2">
				{!isSignUp && <img src={icon} alt='stack overflow' className="login-logo" />}
				<form onSubmit={handleSubmit}>
					{
						isSignUp && (
							<label htmlFor="name">
								<h4>Display Name </h4>
								<input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}}/>
							</label>
						)
					}
					<label htmlFor="email">
						<h4>Email</h4>
						<input type="email" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
					</label>
					<label htmlFor="password">
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<h4>Password</h4>
							{ !isSignUp && <p style={{ color: '#007ac6', fontSize: '13px' }}>forgot password?</p>}
						</div>
						<input type="email" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
						{isSignUp && <p style={{ color: '#666767', fontSize: '13px' }}>Passwords must contain at least eight characters,<br /> including at least 1 letter and 1 number.</p>}
					</label>
					{
						isSignUp && (
							<label htmlFor="check">
								<input type="checkbox" id="check" />
								<p style={{ fontSize: '14px' }}>Opt-in to receive occasional product<br />updates, user research invitations, company<br />announcements, and digests.</p>
							</label>
						)
					}
					<button type="submit" className="auth-btn">{isSignUp ? 'Sign up' : 'Log in'}</button>
					{
						isSignUp && (
							<p style={{ color: '#666767', fontSize: '13px' }}>By clicking “Sign up”, you agree to our
								<span style={{ color: '#007ac6' }}>terms of<br />service</span> and acknowledge that you have read and<br />understand our
								<span style={{ color: '#007ac6' }}>privacy policy</span> and
								<span style={{ color: '#007ac6' }}>code of<br />conduct</span>.</p>
						)
					}
				</form>
				<p>
					{isSignUp ? 'already have an account?' : "Dont't have an account"}
					<button type="button" className="handle-switch-btn" onClick={handleSwitch}> {isSignUp ? 'Log in' : 'Sign up'}</button>
				</p>
			</div>
		</section>
	);
};

export default Auth;
