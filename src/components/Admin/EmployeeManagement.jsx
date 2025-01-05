import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Form, message } from 'antd';
import axios from '../../baseurl';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '', role: '' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employee/all');
        setEmployees(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        message.error('Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async () => {
    try {
      const response = await axios.post('/employee', employeeForm);
      setEmployees([...employees, response.data]);
      setModalVisible(false);
      message.success('Employee created successfully');
    } catch (error) {
      message.error('Failed to create employee');
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await axios.put(`/employee/${editingEmployee._id}`, employeeForm);
      setEmployees(employees.map(emp => (emp._id === editingEmployee._id ? response.data : emp)));
      setModalVisible(false);
      message.success('Employee updated successfully');
    } catch (error) {
      message.error('Failed to update employee');
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`/employee/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
      message.success('Employee deleted successfully');
    } catch (error) {
      message.error('Failed to delete employee');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>Add Employee</Button>
      <Table
        dataSource={employees || []}
        rowKey="_id"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Role', dataIndex: 'role' },
          {
            title: 'Actions',
            render: (_, record) => (
              <div>
                <Button onClick={() => {
                  setEditingEmployee(record);
                  setEmployeeForm(record);
                  setModalVisible(true);
                }}>Edit</Button>
                <Button onClick={() => handleDeleteEmployee(record._id)}>Delete</Button>
              </div>
            ),
          },
        ]}
      />
      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Create Employee'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={employeeForm.name}
              onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={employeeForm.email}
              onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Role">
            <Input
              value={employeeForm.role}
              onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
