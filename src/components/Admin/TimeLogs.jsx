import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from '../../baseurl';

const TimeLogs = () => {
  const [timeLogs, setTimeLogs] = useState([]);

  // Fetch all time logs
  useEffect(() => {
    const fetchTimeLogs = async () => {
      try {
        const response = await axios.get('/time-logs');
        setTimeLogs(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
      } catch (error) {
        message.destroy();
        message.error('Failed to fetch time logs');
      }
    };
    fetchTimeLogs();
  }, []);

  const handleApproveTimeLog = async (logId) => {
    try {
      await axios.put(`/time-logs/approve/${logId}`);
      setTimeLogs(timeLogs.filter(log => log._id !== logId));
      message.success('Time log approved');
    } catch (error) {
      message.error('Failed to approve time log');
    }
  };

  const handleRejectTimeLog = async (logId) => {
    try {
      await axios.put(`/time-logs/reject/${logId}`);
      setTimeLogs(timeLogs.filter(log => log._id !== logId));
      message.success('Time log rejected');
    } catch (error) {
      message.error('Failed to reject time log');
    }
  };

  return (
    <div>
      <Table
        dataSource={timeLogs || []}
        rowKey="_id"
        columns={[
          { title: 'Employee', dataIndex: 'employee.name' },
          { title: 'Task', dataIndex: 'task.title' },
          { title: 'Start Time', dataIndex: 'startTime' },
          { title: 'End Time', dataIndex: 'endTime' },
          { title: 'Status', dataIndex: 'status' },
          {
            title: 'Actions',
            render: (_, record) => (
              <div>
                <Button onClick={() => handleApproveTimeLog(record._id)}>Approve</Button>
                <Button onClick={() => handleRejectTimeLog(record._id)}>Reject</Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default TimeLogs;
