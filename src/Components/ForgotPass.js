import { Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

import { Card } from "react-bootstrap";

function ForgotPass() {
  // states
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  //handleChange

  const handleChange = ({ target: { value } }) => {
    // console.log(value);
    setEmail(value);
    setInfo("");
  };

  //submit ()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    if (email.length === 0) setErr("please Enter mail ");
    try {
      const res = await axios.post(
        "https://password-reset-gmail.herokuapp.com/resetpassword",
        { email: email }
      );
      console.log(res);

      setEmail("");
      setErr("");
      setInfo("Please Check your Email for Activation link");
    } catch (err) {
      console.log("Error is:", err.response.data);
      setErr(err.response.data);
    }
  };

  return (
    <>
      <div className="bg-primary card-container" style={{border:"none", borderRadius:"8px",backgroundColor:"#fff!important"}}>
        <Card className="card">
          <Card.Header className="text-center" style={{background:"#fff",border:"none",paddingBottom:"0"}}>
          <p className="logoimg"><img src="https://1000logos.net/wp-content/uploads/2021/05/Google-logo-768x432.png" /></p>
            <h4 className="text-dark">Forgot Password</h4>
          </Card.Header>
          <Card.Body>
            <form>
              <div className="form-group">
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <p className="error">{err}</p>
              </div>
              <div>
                <Button type="sumbit" variant="success" onClick={handleSubmit}>
                  Send Email
                </Button>
              </div>
              <p className="text-center">{info}</p>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ForgotPass;
