import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";
export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, error } = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest({
      url:"/api/users/signin",
      method:"post",
      body:{ email, password },
      onSuccess : () => {
        Router.push("/");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>SignIn</h1>

      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control"
        />
      </div>

      {error}
      <button className="btn btn-primary">SignIn</button>
    </form>
  );
};
