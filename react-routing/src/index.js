import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import UserForm from '../src/UserForm';

function Home() {
  return <h1>Home Page</h1>;
}

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<App />} />
      <Route path="/add-user" element={<UserForm />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
