import React, { useState } from 'react';
import { registerUser } from '../firebase';
import '../Login.css'; 

interface RegisterProps {
  onAuthSuccess: () => void;
  setIsLogin: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ onAuthSuccess, setIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to register.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2 className="form-title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
        <div className="switch-to-register">
          <button
            type="button"
            className="go-to-register"
            onClick={() => setIsLogin(true)}
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
