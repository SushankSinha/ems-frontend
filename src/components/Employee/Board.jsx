import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal, Input, DatePicker, List, Avatar, message, Select } from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import api from '../../baseurl';

const { TextArea } = Input;
const { Option } = Select;

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '', // New field to store assigned employee ID
    priority: 'Medium', // Default priority
    dueDate: null,
    startDate: null,
  });
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task for details
  const [employees, setEmployees] = useState([]); // To store the list of employees for assignment

  // Fetch tasks and employees
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await api.get('/task'); // Assuming this endpoint fetches tasks
        setTasks(tasksResponse.data);

        setEmployees(employeesResponse.data);
      } catch (error) {
        message.destroy();
        message.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleCreateTask = async () => {
    try {
      // Posting the new task with updated fields based on schema
      const response = await api.post('/task', taskForm);
      setTasks([...tasks, response.data]);
      setModalVisible(false);
      setTaskForm({
        title: '',
        description: '',
        assignedTo: '', // Reset assignedTo field
        priority: 'Medium', // Reset to default priority
        dueDate: null,
        startDate: null,
      });
      message.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task", error);
      message.error("Failed to create task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await api.put(`/task/${taskId}`, { status });
      setTasks(tasks.map(task => (task._id === taskId ? response.data : task)));
      message.success(`Task marked as ${status}`);
    } catch (error) {
      console.error("Error updating task status", error);
      message.error("Failed to update task status");
    }
  };

  const openCreateTaskModal = () => {
    setModalVisible(true);
  };

  const handleTaskClick = (task) => {
    if (selectedTask?.id === task.id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  };

  return (
    <div>
      <Button type="primary" icon={<IoIosAddCircleOutline />} onClick={openCreateTaskModal} style={{ marginBottom: 16 }}>
        Create Task
      </Button>

      <Row gutter={16}>
        {['To-Do', 'In Progress', 'Done'].map(status => (
          <Col span={8} key={status}>
            <Card title={status} style={{ minHeight: 300 }}>
              <List
                itemLayout="horizontal"
                dataSource={tasks.filter(task => task.status === status)}
                renderItem={(task) => (
                  <List.Item
                    key={task._id}
                    onClick={() => handleTaskClick(task)}
                    style={{
                      cursor: 'pointer',
                      marginBottom: '10px',
                      padding: '10px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '4px',
                    }}
                  >
                    <List.Item.Meta
                      title={task.title}
                      description={<p><strong>Deadline:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>}
                    />
                    {selectedTask?.id === task.id && (
                      <div style={{ marginTop: '10px', width: '100%' }}>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Assigned To:</strong> {task.assignedTo?.name || 'N/A'}</p>
                        <p><strong>Priority:</strong> {task.priority}</p>
                        <p><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
                      </div>
                    )}
                    <Button type="link" onClick={() => updateTaskStatus(task._id, 'In Progress')}>Start</Button>
                    <Button type="link" onClick={() => updateTaskStatus(task._id, 'Done')}>Complete</Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Create New Task"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateTask}
      >
        <Input
          placeholder="Task Title"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        />
        <TextArea
          placeholder="Task Description"
          value={taskForm.description}
          onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
          rows={4}
          style={{ marginTop: 10 }}
        />
        <Select
          placeholder="Assign to"
          value={taskForm.assignedTo}
          onChange={(value) => setTaskForm({ ...taskForm, assignedTo: value })}
          style={{ width: '100%', marginTop: 10 }}
        >
          {employees.map(employee => (
            <Option key={employee._id} value={employee._id}>
              {employee.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Priority"
          value={taskForm.priority}
          onChange={(value) => setTaskForm({ ...taskForm, priority: value })}
          style={{ width: '100%', marginTop: 10 }}
        >
          {['Low', 'Medium', 'High', 'Critical'].map(priority => (
            <Option key={priority} value={priority}>
              {priority}
            </Option>
          ))}
        </Select>
        <DatePicker
          placeholder="Due Date"
          value={taskForm.dueDate}
          onChange={(date) => setTaskForm({ ...taskForm, dueDate: date })}
          style={{ marginTop: 10, width: '100%' }}
        />
        <DatePicker
          placeholder="Start Date"
          value={taskForm.startDate}
          onChange={(date) => setTaskForm({ ...taskForm, startDate: date })}
          style={{ marginTop: 10, width: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default Board;
