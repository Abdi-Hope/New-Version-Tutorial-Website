import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  Row, 
  Col, 
  Container, 
  Table, 
  Badge, 
  Button, 
  ProgressBar,
  Dropdown,
  DropdownButton
} from 'react-bootstrap';
import { 
  FaBook, 
  FaUsers, 
  FaDollarSign, 
  FaStar, 
  FaChartLine, 
  FaCalendarAlt,
  FaPlayCircle,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisH
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0
  });
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [coursePerformance, setCoursePerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setStats({
        totalCourses: 8,
        totalStudents: 2547,
        totalRevenue: 42500,
        averageRating: 4.7
      });

      setRecentEnrollments([
        { id: 1, student: 'Alex Johnson', course: 'Advanced React', date: '2024-12-20', amount: 299 },
        { id: 2, student: 'Maria Garcia', course: 'JavaScript Fundamentals', date: '2024-12-19', amount: 199 },
        { id: 3, student: 'David Chen', course: 'Node.js Masterclass', date: '2024-12-18', amount: 349 },
        { id: 4, student: 'Sarah Williams', course: 'UI/UX Design', date: '2024-12-17', amount: 249 },
        { id: 5, student: 'James Wilson', course: 'Python for Data Science', date: '2024-12-16', amount: 399 }
      ]);

      setCoursePerformance([
        { id: 1, title: 'Advanced React', students: 1245, revenue: 37255, rating: 4.8, progress: 85 },
        { id: 2, title: 'JavaScript Fundamentals', students: 876, revenue: 17424, rating: 4.6, progress: 92 },
        { id: 3, title: 'Node.js Masterclass', students: 543, revenue: 18947, rating: 4.9, progress: 78 },
        { id: 4, title: 'UI/UX Design', students: 432, revenue: 10768, rating: 4.5, progress: 88 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon, change, color }) => (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h2 className="mb-0">{typeof value === 'number' ? value.toLocaleString() : value}</h2>
            {change && (
              <small className={change > 0 ? 'text-success' : 'text-danger'}>
                {change > 0 ? <FaArrowUp className="me-1" /> : <FaArrowDown className="me-1" />}
                {Math.abs(change)}% from last month
              </small>
            )}
          </div>
          <div className={`p-3 rounded bg-${color}-light`}>
            <div className={`text-${color}`} style={{ fontSize: '24px' }}>
              {icon}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading dashboard...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Instructor Dashboard</h1>
          <p className="text-muted mb-0">Welcome back! Here's what's happening with your courses.</p>
        </div>
        <Button variant="primary">
          <FaPlayCircle className="me-2" />
          Create New Course
        </Button>
      </div>

      {/* Stats Row */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <StatCard 
            title="Total Courses"
            value={stats.totalCourses}
            icon={<FaBook />}
            change={12}
            color="primary"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard 
            title="Total Students"
            value={stats.totalStudents}
            icon={<FaUsers />}
            change={8}
            color="success"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard 
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<FaDollarSign />}
            change={15}
            color="warning"
          />
        </Col>
        <Col md={3} sm={6}>
          <StatCard 
            title="Average Rating"
            value={stats.averageRating}
            icon={<FaStar />}
            change={2}
            color="info"
          />
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="g-4">
        {/* Left Column */}
        <Col lg={8}>
          {/* Course Performance */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Course Performance</h5>
              <DropdownButton
                variant="outline-secondary"
                title="Last 30 days"
                size="sm"
              >
                <Dropdown.Item>Last 7 days</Dropdown.Item>
                <Dropdown.Item>Last 30 days</Dropdown.Item>
                <Dropdown.Item>Last 90 days</Dropdown.Item>
                <Dropdown.Item>This year</Dropdown.Item>
              </DropdownButton>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Students</th>
                      <th>Revenue</th>
                      <th>Rating</th>
                      <th>Completion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursePerformance.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <div>
                            <strong>{course.title}</strong>
                            <div className="small text-muted">Web Development</div>
                          </div>
                        </td>
                        <td>{course.students.toLocaleString()}</td>
                        <td>
                          <strong className="text-success">${course.revenue.toLocaleString()}</strong>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaStar className="text-warning me-1" />
                            {course.rating}
                          </div>
                        </td>
                        <td>
                          <div>
                            <ProgressBar now={course.progress} className="mb-1" />
                            <small className="text-muted">{course.progress}%</small>
                          </div>
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
                              <FaEllipsisH />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item as={Link} to={`/instructor/courses/${course.id}`}>
                                View Details
                              </Dropdown.Item>
                              <Dropdown.Item>Edit Course</Dropdown.Item>
                              <Dropdown.Item>View Analytics</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item className="text-danger">Archive</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Button variant="outline-primary" className="w-100 h-100 p-3 d-flex flex-column align-items-center">
                    <FaBook className="mb-2" size={24} />
                    <span>Create Course</span>
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="outline-success" className="w-100 h-100 p-3 d-flex flex-column align-items-center">
                    <FaChartLine className="mb-2" size={24} />
                    <span>View Analytics</span>
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="outline-warning" className="w-100 h-100 p-3 d-flex flex-column align-items-center">
                    <FaUsers className="mb-2" size={24} />
                    <span>Manage Students</span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col lg={4}>
          {/* Recent Enrollments */}
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Enrollments</h5>
                <Badge bg="light" text="dark">
                  24 Today
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                {recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="list-group-item p-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{enrollment.student}</h6>
                        <p className="text-muted small mb-1">{enrollment.course}</p>
                        <small className="text-muted">
                          <FaCalendarAlt className="me-1" />
                          {new Date(enrollment.date).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="text-end">
                        <Badge bg="success" className="mb-2">
                          ${enrollment.amount}
                        </Badge>
                        <div>
                          <Button size="sm" variant="outline-primary">
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="link" as={Link} to="/instructor/students">
                View All Enrollments
              </Button>
            </Card.Footer>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Upcoming Tasks</h5>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                <div className="list-group-item px-0 py-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-primary bg-opacity-10 rounded">
                        <FaCalendarAlt className="text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Review Assignments</h6>
                      <p className="text-muted small mb-0">15 assignments pending review</p>
                    </div>
                    <Badge bg="warning">Due Today</Badge>
                  </div>
                </div>
                <div className="list-group-item px-0 py-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-success bg-opacity-10 rounded">
                        <FaBook className="text-success" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Update Course Content</h6>
                      <p className="text-muted small mb-0">React Course Module 5</p>
                    </div>
                    <Badge bg="info">Tomorrow</Badge>
                  </div>
                </div>
                <div className="list-group-item px-0 py-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-warning bg-opacity-10 rounded">
                        <FaUsers className="text-warning" />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">Live Q&A Session</h6>
                      <p className="text-muted small mb-0">Advanced React Q&A</p>
                    </div>
                    <Badge bg="success">Dec 25</Badge>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="outline-primary" className="w-100">
                View All Tasks
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
