import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import bg1 from "../data/bg1.jpg";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div>
        {/* <Spinner/> */}
        <div className="imagewrap">
          <img className="bgimg" src={bg1}></img>
        </div>
        <div className="register-page ">
          
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login Form</h1>

            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex flex-column gap-3">
              <button className="btn btn-primary">Login</button>
              <Link to="/register">New User ? Click Here to register</Link>
            </div>
            {loading && <Spinner />}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
