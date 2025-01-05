// ProjectDetailPage.js
import React, { useState, useEffect } from 'react';
import { Descriptions, Table } from 'antd';
import axios from '../../baseurl'; // Replace with your axios instance

const ProjectDetailPage = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch project details and tasks when the component mounts
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectResponse = await axios.get(`/project/${projectId}`); // Fetch project by ID
        setProject(projectResponse.data);

        // const tasksResponse = await axios.get(`/project/${projectId}/tasks`); // Fetch tasks for the project
        // setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h2>{project.projectName} - Project Details</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Project Name">{project.projectName}</Descriptions.Item>
        <Descriptions.Item label="Status">{project.status}</Descriptions.Item>
        <Descriptions.Item label="Start Date">{project.startDate}</Descriptions.Item>
        <Descriptions.Item label="End Date">{project.endDate}</Descriptions.Item>
        <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
      </Descriptions>

      <h3>Tasks for this Project</h3>
      <Table
        dataSource={tasks}
        rowKey="_id"
        columns={[
          { title: 'Title', dataIndex: 'title' },
          { title: 'Assigned To', dataIndex: 'assignedTo' },
          { title: 'Status', dataIndex: 'status' },
          { title: 'Priority', dataIndex: 'priority' },
        ]}
      />
    </div>
  );
};

export default ProjectDetailPage;
