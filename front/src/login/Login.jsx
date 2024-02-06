import "./login.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, signin } from "../actions/userActions";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valideDt, setValideDt] = useState([]);
  console.log(valideDt);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo,errorF } = userSignin;
  console.log(errorF)
  const dispatch = useDispatch();

  let history = useHistory();


  useEffect(() => {
    if (userInfo && userInfo.IsAdmin === "admin") {
      toast.success("Admin Success Login", {
        position: "bottom-left",
      });
      history.push("/home");
    } else if (userInfo && userInfo.IsAdmin === "noadmin") {
      toast.success("Colaborator Success Login", {
        position: "bottom-left",
      });

      history.push("/calendar");
    }
  return () => {
      //
    };
  }, [userInfo]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    
     dispatch(signin(email, password));
    
  };

  return (
    <div className="login">
      <h3>user login</h3>
      <form onSubmit={submitHandler}>
        <div>
        {errorF && <div className="alert-err">error in enter password or email invalide !!</div>}

          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn">
          login
        </button>
      </form>
    </div>
  );
}
