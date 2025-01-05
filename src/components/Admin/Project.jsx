import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, DatePicker, Select, Modal, message } from 'antd';
import axios from '../../baseurl'; // Replace with your axios instance
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false); // New state for details modal
  const [selectedProject, setSelectedProject] = useState(null); // State to store selected project
  const [form] = Form.useForm();

  const navigate = useNavigate();

  // Fetch projects and employees when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/project');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/employee/all'); // Assume there's an endpoint to fetch employees
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  const handleCreateProject = async (values) => {
    const { projectName, startDate, endDate, budget, description, assignedEmployees } = values;

    try {
      const response = await axios.post('/project', {
        projectName,
        startDate,
        endDate,
        budget,
        description,
        employees: assignedEmployees,
      });

      setProjects([...projects, response.data]); // Add new project to the list
      setIsModalVisible(false);
      message.success('Project created successfully');
      form.resetFields();
    } catch (error) {
      console.error('Error creating project:', error);
      message.error('Failed to create project');
    }
  };

  // Handle view details and fetch project details
  const handleViewDetails = async (projectId) => {
  
    try {
      // Navigate to the /project-details route and pass projectId in the state
      navigate('/project-details', { state: { projectId } });
  
      setIsDetailsModalVisible(true); // Open the details modal
    } catch (error) {
      console.error('Error fetching project details:', error);
      message.error('Failed to fetch project details');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDetailsModalCancel = () => {
    setIsDetailsModalVisible(false);
  };

  return (
    <div>
      <h2>Projects</h2>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 20 }}>
        Create New Project
      </Button>
      <Table
        dataSource={projects}
        rowKey="_id"
        columns={[
          { title: 'Project Name', dataIndex: 'projectName' },
          { title: 'Status', dataIndex: 'status' },
          {
            title: 'Actions',
            render: (_, record) => (
              <Button onClick={() => handleViewDetails(record.projectId)}>View Details</Button>
            ),
          },
        ]}
      />

      {/* Modal to create a new project */}
      <Modal
        title="Create New Project"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleCreateProject} layout="vertical">
          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[{ required: true, message: 'Please input the project name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select the start date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'Please select the end date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Budget" name="budget">
            <Input type="number" min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Assign Employees"
            name="assignedEmployees"
            rules={[{ required: true, message: 'Please assign at least one employee!' }]}>
            <Select mode="multiple" placeholder="Select employees">
              {employees.map((employee) => (
                <Option key={employee._id} value={employee._id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Create Project
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Project;
