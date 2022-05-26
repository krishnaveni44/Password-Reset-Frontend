import React, { useContext } from "react";
import * as YUP from "yup";

import { Card, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { AppContext } from "../App";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const histroy = useHistory();
  const [log, setLog] = useContext(AppContext);


  //   https://nodejs-reset-password.herokuapp.com/
  
  //send login
  const sendLogin = async (values) => {
    const response = await axios.post(
      "https://nodejs-reset-password.herokuapp.com/users/login",
      {
        email: values.email,
        password: values.password,
      }
    );
    console.log(response);

    if (response.status === 200) {
      window.localStorage.setItem("auth-token", response.data.token);

      return true;
    } else {
      return false;
    }
  };

  // signin Schema using yup

  const signInSchema = YUP.object().shape({
    email: YUP.string().email().required("Please Enter Your email"),

    password: YUP.string()
      .min(6, "password should be more than 5 characters")
      .required("Please enter your password"),
  });

  return (
    <>
      <div className="bg-primary card-container" style={{border:"none", borderRadius:"8px",backgroundColor:"#fff!important"}}>
        <Card className="card" >
          <Card.Header className="text-center" style={{background:"#fff",border:"none",paddingBottom:"0"}}>
            <p className="logoimg"><img src="https://1000logos.net/wp-content/uploads/2021/05/Google-logo-768x432.png" /></p>
            <h4 className="text-dark">Sign in</h4>
            <p>to continue to Gmail</p>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signInSchema}
              onSubmit={async (values) => {
                console.log(values);
                let reset = await sendLogin(values); //if status 200 returns true; else false

                console.log(reset); //true or

                if (reset) {
                  console.log(log); //default false;
                  setLog(true); //now true
                  histroy.push("/protected");
                } else {
                  console.log("else in");
                  histroy.push("/protected");
                }
              }}
            >
              {() => {
                return (
                  <Form>
                    <div className="form-group mb-3">
                      <Field
                        className="form-control link"
                        id="email"
                        type="email"
                        name="email"
                        component="input"
                        placeholder="Email"
                      />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    <div className="form-group mb-3">

                      <Field
                        className="form-control inputfield"
                        id="password"
                        type="password"
                        name="password"
                        component="input"
                        placeholder="Password"
                      />
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <Button type="submit" variant="success" id="loginbut">
                        Log In
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Card.Body>
          <Card.Footer style={{background:"none",border:"none"}}>
            <div className="d-flex mt-3 justify-content-center">
              <Link to="/forgotpassword">
                <p className="forgotpass mx-2">forgot password?</p>
              </Link>
              <Link to="/register" className="ac link">
                New Here? Create Account
              </Link>
            </div>
            {/* <div><p>Error is: {log}</p></div> */}
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Login;
