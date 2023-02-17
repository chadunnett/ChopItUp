import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginFormHandler(event) {
    event.preventDefault();

    if (email && password) {
      const response = await fetch('/routes/users', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

  return (
    <form className="login-form" onSubmit={loginFormHandler}>
      <input
        id="email-login"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        id="password-login"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signupFormHandler(event) {
    event.preventDefault();

    if (name && email && password) {
      const response = await fetch('/routes/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        window.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }

  return (
    <form className="signup-form" onSubmit={signupFormHandler}>
      <input
        id="name-signup"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        id="email-signup"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        id="password-signup"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

function AuthForm() {
  return (
    <>
      <Login />
      <Signup />
    </>
  );
}

export default AuthForm;