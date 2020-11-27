import { useState } from "react";
import { login } from "../../services/auth.service";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setSuccessful(false);

    login(username, password)
      .then(() => setSuccessful(true))
      .catch((error) => {
        let message = 'Something happens';
        if (error.message) {
          message = error.message;
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

        <form onSubmit={handleLogin}>
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
            <button className="btn btn-primary btn-block" onClick={handleLogin}>
              Login
            </button>
          </div>

          {successful && (
            <div className="form-group">
              <div className="alert alert-success" role="alert">
                User register successfuly!
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default LoginForm;
