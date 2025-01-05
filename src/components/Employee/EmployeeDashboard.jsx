import React from 'react';
import { Tabs } from 'antd';
import Board from './Board';
import Table from './Table';

const EmployeeDashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Board" key="1">
          <Board />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Table" key="2">
          <Table />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
