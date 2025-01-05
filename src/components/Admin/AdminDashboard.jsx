import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import EmployeeManagement from './EmployeeManagement';
import TaskManagement from './TaskManagement';
import TimeLogs from './TimeLogs';
import Reports from './Reports';
import Project from './Project'; // Add the Project component
import ProjectDetailPage from './ProjectDetailPage'; // Add the ProjectDetailPage component

const { Sider, Content } = Layout;

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState('1'); // State for the selected sidebar item

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // Set the selected key when an item is clicked
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1">Employees</Menu.Item>
          <Menu.Item key="2">Tasks</Menu.Item>
          <Menu.Item key="3">Time Logs</Menu.Item>
          <Menu.Item key="4">Reports</Menu.Item>
          <Menu.Item key="5">Projects</Menu.Item> {/* Add Project menu item */}
          <Menu.Item key="6">Project Details</Menu.Item> {/* Add Project menu item */}
        </Menu>
      </Sider>

      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {selectedKey === '1' && <EmployeeManagement />}
          {selectedKey === '2' && <TaskManagement />}
          {selectedKey === '3' && <TimeLogs />}
          {selectedKey === '4' && <Reports />}
          {selectedKey === '5' && <Project />} {/* Render the Project component */}
          {selectedKey === '6' && <ProjectDetailPage />} {/* Render Project Detail Page */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
