import React, { useState } from "react";
import { loginUser } from "../firebase";
import "../Login.css";

interface LoginProps {
  onAuthSuccess: () => void;
  setIsLogin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthSuccess, setIsLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
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
        <button type="submit" className="submit-btn">
          Login
        </button>
        <div className="switch-to-register">
          <button
            type="button"
            className="go-to-register"
            onClick={() => setIsLogin(false)}
          >
            Don’t have an account? Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
