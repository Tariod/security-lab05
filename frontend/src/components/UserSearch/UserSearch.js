import React, { useState } from "react";
import { findUser } from "../../services/search.service";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    findUser(username)
      .then(({ data }) => {
        if (data) {
          setUsername("");
          setUser(data);
        } else {
          alert("No such user.");
        }
      })
      .catch((error) => {
        let message = 'Something happens';
        if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
        }
        alert(`Error: ${message}`);
      });
  };

  return (
    <div className="container col-md-7">
      <h3 className="text-center mb-5">
          Search user contacts
      </h3>
      <form onSubmit={handleSearch}>
        <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
        </div>
      </form>
      {!!user && (
        <div className="card text-center mt-4">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card card-img-top"
          />
          <div className="card-body">
            <h3 className="card-title">{user.username + " Profile"}</h3>
            <p className="card-text">
              <strong>Mobile Phone</strong> {user.mobilephone}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
