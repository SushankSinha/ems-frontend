import React, {useState, useEffect} from 'react';
import { Button, Layout, Typography } from 'antd';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');

    if (token && role) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login")
    window.location.reload();
  };
  return (
    <Header style={{ background: '#001529', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          Employee Management System
        </Title>
        <div>
          {!isAuthenticated ? (
            <div>
              <Button
                type="primary"
                icon={<FaSignInAlt />}
                onClick={() => (window.location.href = '/login')}
                style={{ marginRight: '10px' }}
              >
                Login
              </Button>
              <Button
                type="default"
                onClick={() => (window.location.href = '/register')}
              >
                Register
              </Button>
            </div>
          ) : (
            <div>
              <span style={{ color: '#fff', marginRight: '10px' }}>Welcome, {userName}</span>
              <Button
                type="default"
                icon={<FaSignOutAlt />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
