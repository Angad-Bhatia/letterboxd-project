import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      let credentialError;
      if (data[0] !== "An error occurred. Please try again.") {
        credentialError = data[0].split(' : ')[1]
        setErrors([credentialError]);
      } else {
        setErrors(data);
      }
    } else {
        closeModal()
    }
  };

  const demoClick = async (e) => {
		e.stopPropagation();
		await dispatch(login('demo@aa.io', 'password'));
    closeModal();
	}

  return (
    <div className="login-form-modal-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <p className="errors">{errors[0]}</p>
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <button onClick={demoClick}>Demo</button>
    </div>
  );
}

export default LoginFormModal;
