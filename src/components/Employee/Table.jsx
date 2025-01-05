import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, message } from 'antd';
import api from '../../baseurl';

const { Option } = Select;

const TableComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

  // Fetch tasks for the employee
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/task'); // Assuming this endpoint fetches tasks for the current employee
        setTasks(response.data);
      } catch (error) {
        message.destroy();
        message.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => <span>{status}</span>,
    },
    {
      title: 'Project',
      dataIndex: 'project',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      render: deadline => (deadline ? new Date(deadline).toLocaleDateString() : 'N/A'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: createdAt => new Date(createdAt).toLocaleString(),
    },
    {
      title: 'Started At',
      dataIndex: 'startedAt',
      render: startedAt => (startedAt ? new Date(startedAt).toLocaleString() : 'N/A'),
    },
    {
      title: 'Completed At',
      dataIndex: 'completedAt',
      render: completedAt => (completedAt ? new Date(completedAt).toLocaleString() : 'N/A'),
    },
  ];

  const filteredTasks = statusFilter ? tasks.filter(task => task.status === statusFilter) : tasks;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="All">All</Option>
          <Option value="To-Do">To-Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default TableComponent;
