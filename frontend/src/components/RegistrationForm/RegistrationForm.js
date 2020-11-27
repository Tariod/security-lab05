import React, { useState } from 'react';
import { register } from '../../services/auth.service';

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [mobilephone, setMobilephone] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangeMobilephone = (event) => {
    const mobilephone = event.target.value;
    setMobilephone(mobilephone);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setSuccessful(false);

    register(username, mobilephone, password)
      .then(() => setSuccessful(true))
      .catch((error) => {
        let message = 'Something happens';
        if (error.response && error.response.data && error.response.data.message) {
          message = '\n' + error.response.data.message.join('\n');
        }
        setSuccessful(false);
        alert(`Error: ${message}`);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleRegister}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Mobile Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobilephone"
                  value={mobilephone}
                  onChange={onChangeMobilephone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" onClick={handleRegister}>
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {successful && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                User login successfuly!
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
