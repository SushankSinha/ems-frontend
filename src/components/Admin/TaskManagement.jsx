import React, { useState, useEffect } from 'react';
import axios from '../../baseurl'; // Update the base URL if needed
import { Button, Table, Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);  // Holds tasks for a selected project
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);  // Track selected project
  const [taskForm, setTaskForm] = useState({ 
    title: '', 
    description: '', 
    assignedTo: '', 
    status: 'To-Do',
    project: '',  // Make sure project is correctly set
    priority: 'Low', // Default priority value
  });
  const priority = ['Low', 'Medium', 'High', 'Critical'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get('/employee/all');
        const projectResponse = await axios.get('/project');
        setEmployees(employeeResponse.data);
        setProjects(projectResponse.data);
      } catch (error) {
        message.error('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const fetchTasksForProject = async (projectId) => {
    try {
      const taskResponse = await axios.get(`/task/${projectId}`); // Adjust the endpoint if needed
      setTasks(taskResponse.data);
    } catch (error) {
      message.error('Failed to fetch tasks for the selected project');
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);  // Set the selected project ID
    setTaskForm(prevForm => ({ ...prevForm, project: projectId }));  // Set the project ID in task form
    fetchTasksForProject(projectId);  // Fetch tasks for this project
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(`/task/${selectedProjectId}`, taskForm); // Ensure projectId is part of taskForm
      setTasks([...tasks, response.data]);
      setModalVisible(false);
      message.success('Task created successfully');
    } catch (error) {
      message.error('Failed to create task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/task/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>Create Task</Button>

      <h2>Projects</h2>
      <Table
        dataSource={projects}
        rowKey="_id"
        columns={[
          { title: 'Project Name', dataIndex: 'projectName', render: (text, record) => <a onClick={() => handleProjectClick(record._id)}>{text}</a> },
          { title: 'Description', dataIndex: 'description' },
        ]}
        pagination={false}
      />

      {selectedProjectId && (
        <>
          <h3>Tasks for this Project</h3>
          <Table
            dataSource={tasks}
            rowKey="_id"
            columns={[
              { title: 'Title', dataIndex: 'title' },
              { title: 'Description', dataIndex: 'description' },
              { title: 'Assigned To', dataIndex: 'assignedTo', render: (assignedTo) => assignedTo.name },
              { title: 'Status', dataIndex: 'status' },
              {
                title: 'Actions',
                render: (_, record) => (
                  <Button onClick={() => handleDeleteTask(record._id)}>Delete</Button>
                ),
              },
            ]}
          />
        </>
      )}

      <Modal
        title="Create New Task"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateTask}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Assign To">
            <Select
              value={taskForm.assignedTo}
              onChange={(value) => setTaskForm({ ...taskForm, assignedTo: value })}
            >
              {employees.map((emp) => (
                <Option key={emp._id} value={emp._id}>{emp.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Priority">
            <Select
              value={taskForm.priority}
              onChange={(value) => setTaskForm({ ...taskForm, priority: value })}
            >
              {priority.map((val, index) => (
                <Option key={index} value={val}>{val}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Project">
            <Select
              value={taskForm.project}
              onChange={(value) => setTaskForm({ ...taskForm, project: value })}
            >
              {projects.map((project) => (
                <Option key={project._id} value={project._id}>{project.projectName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={taskForm.status}
              onChange={(value) => setTaskForm({ ...taskForm, status: value })}
            >
              <Option value="To-Do">To-Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManagement;
