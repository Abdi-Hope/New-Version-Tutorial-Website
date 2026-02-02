import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Container,
  Table,
  Badge,
  Button,
  Form,
  Dropdown,
  ProgressBar,
  Alert
} from 'react-bootstrap';
import {
  FaDollarSign,
  FaChartLine,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaUsers,
  FaBook,
  FaArrowUp,
  FaArrowDown,
  FaShoppingCart,
  FaCreditCard,
  FaPaypal,
  FaStar
} from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const RevenueAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [revenueStats, setRevenueStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [courseRevenue, setCourseRevenue] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      // Revenue stats
      const mockRevenueStats = {
        totalRevenue: 42500,
        monthlyRevenue: 12500,
        dailyRevenue: 417,
        growthRate: 15.2,
        totalSales: 2547,
        refunds: 125,
        netRevenue: 42375,
        avgOrderValue: 299
      };

      // Revenue trend data
      const mockRevenueData = [
        { date: 'Nov 1', revenue: 1200, sales: 4 },
        { date: 'Nov 5', revenue: 1800, sales: 6 },
        { date: 'Nov 10', revenue: 2200, sales: 8 },
        { date: 'Nov 15', revenue: 3100, sales: 11 },
        { date: 'Nov 20', revenue: 2800, sales: 9 },
        { date: 'Nov 25', revenue: 3500, sales: 12 },
        { date: 'Nov 30', revenue: 4200, sales: 14 },
        { date: 'Dec 5', revenue: 3800, sales: 13 },
        { date: 'Dec 10', revenue: 4500, sales: 15 },
        { date: 'Dec 15', revenue: 5200, sales: 17 },
        { date: 'Dec 20', revenue: 5800, sales: 19 }
      ];

      // Course revenue data
      const mockCourseRevenue = [
        { course: 'Advanced React', revenue: 37255, students: 1245, growth: 12 },
        { course: 'JavaScript Fundamentals', revenue: 17424, students: 876, growth: 8 },
        { course: 'Node.js Masterclass', revenue: 18947, students: 543, growth: 15 },
        { course: 'UI/UX Design', revenue: 10768, students: 432, growth: 5 },
        { course: 'Python for Data Science', revenue: 31560, students: 789, growth: 18 }
      ];

      // Recent transactions
      const mockRecentTransactions = [
        { id: 1, student: 'Alex Johnson', course: 'Advanced React', date: '2024-12-20', amount: 299, method: 'credit_card', status: 'completed' },
        { id: 2, student: 'Maria Garcia', course: 'JavaScript Fundamentals', date: '2024-12-19', amount: 199, method: 'paypal', status: 'completed' },
        { id: 3, student: 'David Chen', course: 'Node.js Masterclass', date: '2024-12-18', amount: 349, method: 'credit_card', status: 'completed' },
        { id: 4, student: 'Sarah Williams', course: 'UI/UX Design', date: '2024-12-17', amount: 249, method: 'stripe', status: 'completed' },
        { id: 5, student: 'James Wilson', course: 'Python for Data Science', date: '2024-12-16', amount: 399, method: 'paypal', status: 'refunded' },
        { id: 6, student: 'Lisa Park', course: 'Advanced React', date: '2024-12-15', amount: 299, method: 'credit_card', status: 'completed' },
        { id: 7, student: 'Tom Brown', course: 'JavaScript Fundamentals', date: '2024-12-14', amount: 199, method: 'stripe', status: 'pending' },
        { id: 8, student: 'Emily Davis', course: 'Node.js Masterclass', date: '2024-12-13', amount: 349, method: 'paypal', status: 'completed' }
      ];

      // Payment methods distribution
      const mockPaymentMethods = [
        { method: 'Credit Card', percentage: 65, revenue: 27625 },
        { method: 'PayPal', percentage: 25, revenue: 10625 },
        { method: 'Stripe', percentage: 8, revenue: 3400 },
        { method: 'Bank Transfer', percentage: 2, revenue: 850 }
      ];

      setRevenueStats(mockRevenueStats);
      setRevenueData(mockRevenueData);
      setCourseRevenue(mockCourseRevenue);
      setRecentTransactions(mockRecentTransactions);
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 1500);
  }, []);

  const StatCard = ({ title, value, icon, change, description, color = 'primary' }) => (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h3 className="mb-0">{typeof value === 'number' && title.includes('Revenue') ? `$${value.toLocaleString()}` : value}</h3>
            {description && <p className="text-muted small mb-0">{description}</p>}
          </div>
          <div className={`p-3 rounded bg-${color} bg-opacity-10`}>
            <div className={`text-${color}`} style={{ fontSize: '24px' }}>
              {icon}
            </div>
          </div>
        </div>
        {change !== undefined && (
          <div className={`mt-3 ${change > 0 ? 'text-success' : change < 0 ? 'text-danger' : 'text-muted'}`}>
            <small>
              {change > 0 ? <FaArrowUp className="me-1" /> : change < 0 ? <FaArrowDown className="me-1" /> : null}
              {Math.abs(change)}% {change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change'} from last period
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'refunded':
        return <Badge bg="danger">Refunded</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'credit_card':
        return <FaCreditCard className="text-primary" />;
      case 'paypal':
        return <FaPaypal className="text-info" />;
      case 'stripe':
        return <FaShoppingCart className="text-success" />;
      default:
        return <FaCreditCard className="text-muted" />;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading revenue analytics...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Revenue Analytics</h1>
          <p className="text-muted mb-0">Track your earnings, sales, and revenue trends</p>
        </div>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              <FaCalendarAlt className="me-2" />
              {timeRange === '7days' ? '7 Days' : timeRange === '30days' ? '30 Days' : '90 Days'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTimeRange('7days')}>Last 7 Days</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeRange('30days')}>Last 30 Days</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeRange('90days')}>Last 90 Days</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeRange('year')}>This Year</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary">
            <FaDownload className="me-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Stats */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <StatCard
            title="Total Revenue"
            value={`$${revenueStats.totalRevenue.toLocaleString()}`}
            icon={<FaDollarSign />}
            change={revenueStats.growthRate}
            color="primary"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard
            title="Monthly Revenue"
            value={`$${revenueStats.monthlyRevenue.toLocaleString()}`}
            icon={<FaChartLine />}
            change={12.5}
            color="success"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard
            title="Total Sales"
            value={revenueStats.totalSales.toLocaleString()}
            icon={<FaUsers />}
            change={8.3}
            color="warning"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard
            title="Avg Order Value"
            value={`$${revenueStats.avgOrderValue}`}
            icon={<FaShoppingCart />}
            change={4.2}
            color="info"
            description="Per transaction"
          />
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="g-4">
        {/* Left Column */}
        <Col lg={8}>
          {/* Revenue Trend Chart */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Revenue Trend</h5>
              <div className="text-muted">
                Total: <strong>${revenueData.reduce((sum, day) => sum + day.revenue, 0).toLocaleString()}</strong>
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Revenue ($)" />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" name="Sales Count" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>

          {/* Course Revenue Performance */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Course Revenue Performance</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Revenue</th>
                      <th>Students</th>
                      <th>Growth</th>
                      <th>Avg. Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseRevenue.map((course, index) => (
                      <tr key={index}>
                        <td>
                          <div>
                            <strong>{course.course}</strong>
                            <div className="small text-muted">Web Development</div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaDollarSign className="me-2 text-success" />
                            <strong>${course.revenue.toLocaleString()}</strong>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaUsers className="me-2 text-muted" />
                            {course.students.toLocaleString()}
                          </div>
                        </td>
                        <td>
                          <div className={`d-flex align-items-center ${course.growth > 0 ? 'text-success' : 'text-danger'}`}>
                            {course.growth > 0 ? <FaArrowUp className="me-1" /> : <FaArrowDown className="me-1" />}
                            {Math.abs(course.growth)}%
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaStar className="me-2 text-warning" />
                            4.8
                          </div>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-primary">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col lg={4}>
          {/* Payment Methods */}
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Payment Methods</h5>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                {paymentMethods.map((method, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between mb-1">
                      <div className="d-flex align-items-center">
                        {getMethodIcon(method.method.toLowerCase().replace(' ', '_'))}
                        <span className="ms-2">{method.method}</span>
                      </div>
                      <span className="font-weight-bold">{method.percentage}%</span>
                    </div>
                    <ProgressBar now={method.percentage} variant={index === 0 ? 'primary' : index === 1 ? 'info' : 'success'} />
                    <div className="text-end text-muted small">
                      ${method.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Recent Transactions */}
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Transactions</h5>
                <Badge bg="light" text="dark">
                  {recentTransactions.length} today
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{transaction.student}</h6>
                        <p className="text-muted small mb-1">{transaction.course}</p>
                        <small className="text-muted">
                          <FaCalendarAlt className="me-1" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="text-end">
                        <div className="mb-2">
                          <strong className={transaction.status === 'refunded' ? 'text-danger' : 'text-success'}>
                            ${transaction.amount}
                          </strong>
                        </div>
                        <div>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="link" size="sm">
                View All Transactions
              </Button>
            </Card.Footer>
          </Card>

          {/* Refund Stats */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Refund Overview</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h2 className="text-danger">${revenueStats.totalRevenue - revenueStats.netRevenue}</h2>
                <p className="text-muted">Total Refunds</p>
              </div>
              <Alert variant="info">
                <div className="d-flex justify-content-between">
                  <span>Refund Rate:</span>
                  <strong>
                    {((revenueStats.refunds / revenueStats.totalSales) * 100).toFixed(2)}%
                  </strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Refund Count:</span>
                  <strong>{revenueStats.refunds}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Net Revenue:</span>
                  <strong className="text-success">${revenueStats.netRevenue.toLocaleString()}</strong>
                </div>
              </Alert>
              <Button variant="outline-danger" className="w-100">
                Manage Refunds
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Insights Section */}
      <Row className="g-4 mt-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Revenue Insights</h5>
            </Card.Header>
            <Card.Body>
              <Alert variant="success">
                <FaArrowUp className="me-2" />
                <strong>Best Performing Day:</strong> Friday average revenue is 23% higher than weekly average.
              </Alert>
              <Alert variant="warning">
                <FaCalendarAlt className="me-2" />
                <strong>Seasonal Trend:</strong> Revenue typically increases by 18% during holiday seasons.
              </Alert>
              <Alert variant="info">
                <FaBook className="me-2" />
                <strong>Course Performance:</strong> Advanced courses generate 45% more revenue per student than beginner courses.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Revenue Forecast</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="text-primary">${(revenueStats.monthlyRevenue * 1.15).toLocaleString()}</h3>
                <p className="text-muted">Projected Next Month Revenue</p>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Current Month</span>
                    <span>${revenueStats.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <ProgressBar now={100} variant="primary" />
                </div>
                <div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>Next Month (Projected)</span>
                    <span className="text-success">${(revenueStats.monthlyRevenue * 1.15).toLocaleString()}</span>
                  </div>
                  <ProgressBar now={115} variant="success" />
                </div>
              </div>
              <div className="mt-4">
                <small className="text-muted">
                  Based on current growth rate of {revenueStats.growthRate}% and seasonal trends.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RevenueAnalytics;
