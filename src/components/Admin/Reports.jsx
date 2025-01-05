import React, { useState } from 'react';
import { DatePicker, Button, message } from 'antd';
import axios from '../../baseurl';

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [dates, setDates] = useState([null, null]);

  const handleGenerateReport = async () => {
    const [startDate, endDate] = dates;
    if (!startDate || !endDate) {
      message.error('Please select a start and end date');
      return;
    }
    try {
      const response = await axios.get('/reports', {
        params: { startDate, endDate },
      });
      setReportData(response.data);
    } catch (error) {
      message.error('Failed to generate report');
    }
  };

  return (
    <div>
      <DatePicker.RangePicker value={dates} onChange={(dates) => setDates(dates)} />
      <Button type="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>
      {reportData && (
        <div>
          <h3>Total Hours Worked</h3>
          <ul>
            {reportData.map((record) => (
              <li key={record.employee._id}>
                {record.employee.name}: {record.totalHours} hours
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reports;
