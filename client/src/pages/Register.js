import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import Spinner from "../components/Spinner";
import bg1 from "../data/bg1.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("users/register", values);
      message.success("Registeration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="wrapper">
        <div className="imagewrap">
          <img className="bgimg" src={bg1}></img>
        </div>
        <div className="register-page container">
          
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Register</h1>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex flex-column gap-3">
              <button className="btn btn-primary">Register</button>

              <Link to="/login">Already Registered ? Click Here to Login</Link>
            </div>
            {loading && <Spinner />}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
