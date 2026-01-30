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
  Alert,
  Tabs,
  Tab
} from 'react-bootstrap';
import {
  FaUsers,
  FaChartLine,
  FaFilter,
  FaDownload,
  FaEye,
  FaEnvelope,
  FaCalendarAlt,
  FaStar,
  FaBook,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserGraduate
} from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const StudentAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const [engagementStats, setEngagementStats] = useState({});
  const [completionRates, setCompletionRates] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [geographicData, setGeographicData] = useState([]);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      // Student data
      const mockStudents = [
        {
          id: 1,
          name: 'Alex Johnson',
          email: 'alex@example.com',
          course: 'Advanced React',
          enrollmentDate: '2024-11-15',
          progress: 85,
          lastActive: '2024-12-20',
          assignmentsCompleted: 12,
          totalAssignments: 15,
          rating: 4.8,
          country: 'USA'
        },
        {
          id: 2,
          name: 'Maria Garcia',
          email: 'maria@example.com',
          course: 'JavaScript Fundamentals',
          enrollmentDate: '2024-11-20',
          progress: 92,
          lastActive: '2024-12-19',
          assignmentsCompleted: 14,
          totalAssignments: 15,
          rating: 4.6,
          country: 'Spain'
        },
        {
          id: 3,
          name: 'David Chen',
          email: 'david@example.com',
          course: 'Node.js Masterclass',
          enrollmentDate: '2024-11-25',
          progress: 78,
          lastActive: '2024-12-18',
          assignmentsCompleted: 10,
          totalAssignments: 15,
          rating: 4.9,
          country: 'China'
        },
        {
          id: 4,
          name: 'Sarah Williams',
          email: 'sarah@example.com',
          course: 'UI/UX Design',
          enrollmentDate: '2024-11-30',
          progress: 65,
          lastActive: '2024-12-17',
          assignmentsCompleted: 8,
          totalAssignments: 12,
          rating: 4.5,
          country: 'UK'
        },
        {
          id: 5,
          name: 'James Wilson',
          email: 'james@example.com',
          course: 'Python for Data Science',
          enrollmentDate: '2024-12-05',
          progress: 45,
          lastActive: '2024-12-16',
          assignmentsCompleted: 6,
          totalAssignments: 15,
          rating: 4.7,
          country: 'Canada'
        },
        {
          id: 6,
          name: 'Lisa Park',
          email: 'lisa@example.com',
          course: 'Advanced React',
          enrollmentDate: '2024-12-10',
          progress: 95,
          lastActive: '2024-12-15',
          assignmentsCompleted: 14,
          totalAssignments: 15,
          rating: 4.8,
          country: 'South Korea'
        },
        {
          id: 7,
          name: 'Tom Brown',
          email: 'tom@example.com',
          course: 'JavaScript Fundamentals',
          enrollmentDate: '2024-12-12',
          progress: 30,
          lastActive: '2024-12-14',
          assignmentsCompleted: 4,
          totalAssignments: 15,
          rating: 4.3,
          country: 'Australia'
        },
        {
          id: 8,
          name: 'Emily Davis',
          email: 'emily@example.com',
          course: 'Node.js Masterclass',
          enrollmentDate: '2024-12-14',
          progress: 88,
          lastActive: '2024-12-20',
          assignmentsCompleted: 13,
          totalAssignments: 15,
          rating: 4.9,
          country: 'Germany'
        }
      ];

      // Engagement stats
      const mockEngagementStats = {
        totalStudents: 2547,
        activeStudents: 1842,
        completionRate: 72,
        avgProgress: 68,
        avgTimeSpent: '4.2 hours',
        avgRating: 4.7,
        assignmentsSubmitted: 15642,
        discussionPosts: 3247
      };

      // Completion rates by course
      const mockCompletionRates = [
        { course: 'Advanced React', students: 1245, completionRate: 78 },
        { course: 'JavaScript Fundamentals', students: 876, completionRate: 85 },
        { course: 'Node.js Masterclass', students: 543, completionRate: 72 },
        { course: 'UI/UX Design', students: 432, completionRate: 68 },
        { course: 'Python for Data Science', students: 789, completionRate: 65 }
      ];

      // Activity data for charts
      const mockActivityData = [
        { date: 'Dec 1', activeStudents: 125, assignments: 89, discussions: 45 },
        { date: 'Dec 5', activeStudents: 142, assignments: 102, discussions: 52 },
        { date: 'Dec 10', activeStudents: 158, assignments: 124, discussions: 67 },
        { date: 'Dec 15', activeStudents: 172, assignments: 145, discussions: 78 },
        { date: 'Dec 20', activeStudents: 185, assignments: 167, discussions: 92 }
      ];

      // Geographic data
      const mockGeographicData = [
        { country: 'USA', students: 654, percentage: 25.7 },
        { country: 'India', students: 432, percentage: 17.0 },
        { country: 'UK', students: 287, percentage: 11.3 },
        { country: 'Germany', students: 198, percentage: 7.8 },
        { country: 'Canada', students: 165, percentage: 6.5 },
        { country: 'Others', students: 811, percentage: 31.7 }
      ];

      setStudentData(mockStudents);
      setEngagementStats(mockEngagementStats);
      setCompletionRates(mockCompletionRates);
      setActivityData(mockActivityData);
      setGeographicData(mockGeographicData);
      setLoading(false);
    }, 1500);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const StatCard = ({ title, value, icon, change, description }) => (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h3 className="mb-0">{value}</h3>
            {description && <p className="text-muted small mb-0">{description}</p>}
          </div>
          <div className={`p-3 rounded bg-primary bg-opacity-10`}>
            <div className="text-primary" style={{ fontSize: '24px' }}>
              {icon}
            </div>
          </div>
        </div>
        {change && (
          <div className={`mt-3 ${change > 0 ? 'text-success' : 'text-danger'}`}>
            <small>
              {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last period
            </small>
          </div>
        )}
      </Card.Body>
    </Card>
  );

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'primary';
    if (progress >= 30) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading analytics...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Student Analytics</h1>
          <p className="text-muted mb-0">Track student engagement, progress, and performance</p>
        </div>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              <FaFilter className="me-2" />
              Course: {selectedCourse === 'all' ? 'All Courses' : selectedCourse}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedCourse('all')}>All Courses</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setSelectedCourse('Advanced React')}>Advanced React</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCourse('JavaScript Fundamentals')}>JavaScript Fundamentals</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCourse('Node.js Masterclass')}>Node.js Masterclass</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCourse('UI/UX Design')}>UI/UX Design</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedCourse('Python for Data Science')}>Python for Data Science</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              <FaCalendarAlt className="me-2" />
              {timeRange === '7days' ? '7 Days' : timeRange === '30days' ? '30 Days' : '90 Days'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setTimeRange('7days')}>Last 7 Days</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeRange('30days')}>Last 30 Days</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeRange('90days')}>Last 90 Days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="primary">
            <FaDownload className="me-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <StatCard
            title="Total Students"
            value={engagementStats.totalStudents.toLocaleString()}
            icon={<FaUsers />}
            change={12}
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard
            title="Active Students"
            value={engagementStats.activeStudents.toLocaleString()}
            icon={<FaUserGraduate />}
            change={8}
            description="Active in last 7 days"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard
            title="Completion Rate"
            value={`${engagementStats.completionRate}%`}
            icon={<FaCheckCircle />}
            change={5}
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard
            title="Average Rating"
            value={engagementStats.avgRating}
            icon={<FaStar />}
            change={2}
            description="Based on 2,547 reviews"
          />
        </Col>
      </Row>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        fill
      >
        <Tab eventKey="overview" title="Overview">
          <Row className="g-4">
            <Col lg={8}>
              {/* Activity Chart */}
              <Card className="shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-0">Student Activity Trend</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="activeStudents" stroke="#8884d8" name="Active Students" />
                        <Line type="monotone" dataKey="assignments" stroke="#82ca9d" name="Assignments Submitted" />
                        <Line type="monotone" dataKey="discussions" stroke="#ffc658" name="Discussion Posts" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>

              {/* Completion Rates by Course */}
              <Card className="shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">Completion Rates by Course</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={completionRates}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="course" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completionRate" fill="#8884d8" name="Completion Rate (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              {/* Geographic Distribution */}
              <Card className="shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-0">Geographic Distribution</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={geographicData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.country}: ${entry.percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="students"
                        >
                          {geographicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>

              {/* Engagement Metrics */}
              <Card className="shadow-sm">
                <Card.Header>
                  <h5 className="mb-0">Engagement Metrics</h5>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-3">
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Average Progress</span>
                        <span className="font-weight-bold">{engagementStats.avgProgress}%</span>
                      </div>
                      <ProgressBar now={engagementStats.avgProgress} variant="primary" />
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Avg Time Spent</span>
                        <span className="font-weight-bold">{engagementStats.avgTimeSpent}</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Assignments Submitted</span>
                        <span className="font-weight-bold">{engagementStats.assignmentsSubmitted.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Discussion Posts</span>
                        <span className="font-weight-bold">{engagementStats.discussionPosts.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="students" title="Student List">
          <Card className="shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Student Details</h5>
              <Form.Control
                type="text"
                placeholder="Search students..."
                style={{ width: '250px' }}
              />
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Course</th>
                      <th>Enrollment Date</th>
                      <th>Progress</th>
                      <th>Assignments</th>
                      <th>Last Active</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((student) => (
                      <tr key={student.id}>
                        <td>
                          <div>
                            <strong>{student.name}</strong>
                            <div className="small text-muted">{student.email}</div>
                            <Badge bg="light" text="dark" className="mt-1">
                              {student.country}
                            </Badge>
                          </div>
                        </td>
                        <td>{student.course}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="me-2 text-muted" />
                            {new Date(student.enrollmentDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="d-flex justify-content-between mb-1">
                              <small>{student.progress}%</small>
                            </div>
                            <ProgressBar now={student.progress} variant={getProgressColor(student.progress)} />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaBook className="me-2 text-muted" />
                            {student.assignmentsCompleted}/{student.totalAssignments}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaClock className="me-2 text-muted" />
                            {new Date(student.lastActive).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button size="sm" variant="outline-primary" title="View Profile">
                              <FaEye />
                            </Button>
                            <Button size="sm" variant="outline-success" title="Send Message">
                              <FaEnvelope />
                            </Button>
                            <Dropdown>
                              <Dropdown.Toggle size="sm" variant="outline-secondary">
                                More
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>View Progress</Dropdown.Item>
                                <Dropdown.Item>View Assignments</Dropdown.Item>
                                <Dropdown.Item>View Reviews</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="text-danger">Remove from Course</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="insights" title="Insights">
          <Row className="g-4">
            <Col lg={6}>
              <Card className="shadow-sm h-100">
                <Card.Header>
                  <h5 className="mb-0">At-Risk Students</h5>
                </Card.Header>
                <Card.Body>
                  <Alert variant="warning">
                    <FaTimesCircle className="me-2" />
                    <strong>12 students</strong> have less than 30% progress and haven't been active in over 2 weeks.
                  </Alert>
                  <Table size="sm">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Progress</th>
                        <th>Last Active</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tom Brown</td>
                        <td>
                          <Badge bg="danger">30%</Badge>
                        </td>
                        <td>14 days ago</td>
                        <td>
                          <Button size="sm" variant="outline-primary">Contact</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>James Wilson</td>
                        <td>
                          <Badge bg="warning">45%</Badge>
                        </td>
                        <td>4 days ago</td>
                        <td>
                          <Button size="sm" variant="outline-primary">Contact</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="shadow-sm h-100">
                <Card.Header>
                  <h5 className="mb-0">Top Performers</h5>
                </Card.Header>
                <Card.Body>
                  <Alert variant="success">
                    <FaCheckCircle className="me-2" />
                    <strong>8 students</strong> have completed the course with perfect scores.
                  </Alert>
                  <Table size="sm">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Progress</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alex Johnson</td>
                        <td>Advanced React</td>
                        <td>
                          <Badge bg="success">100%</Badge>
                        </td>
                        <td>
                          <FaStar className="text-warning" /> 4.8
                        </td>
                      </tr>
                      <tr>
                        <td>Maria Garcia</td>
                        <td>JavaScript Fundamentals</td>
                        <td>
                          <Badge bg="success">100%</Badge>
                        </td>
                        <td>
                          <FaStar className="text-warning" /> 4.9
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default StudentAnalytics;
