import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Alert } from 'antd';
import api from '../../baseurl';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = async (values) => {
    try {
      const res = await api.post('/employee/login', {
        email: values.email,
        password: values.password,
      });

      const data = res.data;
      console.log("data",data)

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // Store user role
        localStorage.setItem('name', data.name); // Store user role
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
        window.location.reload();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ width: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Login</h2>
      
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
      
      <Form onFinish={handleLogin} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
