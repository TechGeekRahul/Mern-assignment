import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, age };

    await fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Age:
        <input value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}

export default App;
