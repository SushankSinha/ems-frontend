import React, { useState } from 'react';
import { Button, Input, Form, Select, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../baseurl';

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const res = await api.post('/employee/register', {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      if (res.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ width: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Register</h2>

      {/* Error Alert */}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}

      {/* Registration Form */}
      <Form onFinish={handleRegister} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, type: 'string', message: 'Please input a valid name!' }
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, type: 'email', message: 'Please input a valid email!' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' }
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          initialValue="employee"
        >
          <Select>
            <Select.Option value="employee">Employee</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
