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
  Form,
  InputGroup,
  Dropdown,
  Modal,
  Alert,
  Pagination
} from 'react-bootstrap';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaChartLine,
  FaFilter,
  FaSort,
  FaArchive,
  FaPlayCircle,
  FaBook,
  FaUsers,
  FaDollarSign,
  FaStar
} from 'react-icons/fa';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [courseToArchive, setCourseToArchive] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: 'Advanced React Development',
          category: 'Web Development',
          status: 'published',
          students: 1245,
          revenue: 37255,
          rating: 4.8,
          price: 299,
          lastUpdated: '2024-12-15',
          lessons: 48,
          featured: true
        },
        {
          id: 2,
          title: 'JavaScript Fundamentals',
          category: 'Programming',
          status: 'published',
          students: 876,
          revenue: 17424,
          rating: 4.6,
          price: 199,
          lastUpdated: '2024-12-10',
          lessons: 36,
          featured: false
        },
        {
          id: 3,
          title: 'Node.js Masterclass',
          category: 'Backend',
          status: 'draft',
          students: 543,
          revenue: 18947,
          rating: 4.9,
          price: 349,
          lastUpdated: '2024-12-05',
          lessons: 42,
          featured: true
        },
        {
          id: 4,
          title: 'UI/UX Design Principles',
          category: 'Design',
          status: 'published',
          students: 432,
          revenue: 10768,
          rating: 4.5,
          price: 249,
          lastUpdated: '2024-12-01',
          lessons: 32,
          featured: false
        },
        {
          id: 5,
          title: 'Python for Data Science',
          category: 'Data Science',
          status: 'archived',
          students: 789,
          revenue: 31560,
          rating: 4.7,
          price: 399,
          lastUpdated: '2024-11-28',
          lessons: 54,
          featured: true
        },
        {
          id: 6,
          title: 'Mobile App Development',
          category: 'Mobile',
          status: 'published',
          students: 321,
          revenue: 9620,
          rating: 4.4,
          price: 299,
          lastUpdated: '2024-11-25',
          lessons: 38,
          featured: false
        },
        {
          id: 7,
          title: 'DevOps Fundamentals',
          category: 'DevOps',
          status: 'draft',
          students: 0,
          revenue: 0,
          rating: 0,
          price: 249,
          lastUpdated: '2024-11-20',
          lessons: 28,
          featured: false
        },
        {
          id: 8,
          title: 'Machine Learning Basics',
          category: 'AI/ML',
          status: 'published',
          students: 654,
          revenue: 26160,
          rating: 4.8,
          price: 399,
          lastUpdated: '2024-11-15',
          lessons: 46,
          featured: true
        }
      ];

      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = courses;

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(course => course.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term)
      );
    }

    setFilteredCourses(result);
    setCurrentPage(1);
  }, [courses, statusFilter, searchTerm]);

  const handleDelete = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    setShowDeleteModal(false);
  };

  const handleArchive = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: 'archived' } : course
    ));
    setShowArchiveModal(false);
  };

  const handlePublish = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: 'published' } : course
    ));
  };

  const handleUnpublish = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: 'draft' } : course
    ));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <Badge bg="success">Published</Badge>;
      case 'draft':
        return <Badge bg="warning">Draft</Badge>;
      case 'archived':
        return <Badge bg="secondary">Archived</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading courses...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Course Management</h1>
          <p className="text-muted mb-0">Manage and organize all your courses in one place</p>
        </div>
        <Button variant="primary" as={Link} to="/instructor/courses/create">
          <FaPlus className="me-2" />
          Create New Course
        </Button>
      </div>

      {/* Stats Summary */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaBook className="text-primary mb-2" size={24} />
              <h3>{courses.filter(c => c.status === 'published').length}</h3>
              <p className="text-muted mb-0">Published Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaUsers className="text-success mb-2" size={24} />
              <h3>{courses.reduce((sum, course) => sum + course.students, 0).toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaDollarSign className="text-warning mb-2" size={24} />
              <h3>${courses.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaStar className="text-info mb-2" size={24} />
              <h3>{courses.length > 0 ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1) : 0}</h3>
              <p className="text-muted mb-0">Avg Rating</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search courses by title or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaFilter className="me-2" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setStatusFilter('all')}>All Status</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setStatusFilter('published')}>Published</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter('draft')}>Draft</Dropdown.Item>
                  <Dropdown.Item onClick={() => setStatusFilter('archived')}>Archived</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Button variant="outline-secondary" className="w-100">
                <FaSort className="me-2" />
                Sort By
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Courses Table */}
      <Card className="shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Your Courses</h5>
          <div className="text-muted">
            Showing {currentCourses.length} of {filteredCourses.length} courses
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Students</th>
                  <th>Revenue</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <Alert variant="info">
                        No courses found. Try adjusting your filters or create a new course.
                      </Alert>
                    </td>
                  </tr>
                ) : (
                  currentCourses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <div>
                          <strong>{course.title}</strong>
                          {course.featured && (
                            <Badge bg="primary" className="ms-2">Featured</Badge>
                          )}
                          <div className="small text-muted">
                            {course.lessons} lessons • Updated {new Date(course.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>{course.category}</td>
                      <td>{getStatusBadge(course.status)}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaUsers className="me-2 text-muted" />
                          {course.students.toLocaleString()}
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
                          <FaStar className="me-2 text-warning" />
                          {course.rating || 'N/A'}
                        </div>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${course.id}`}>
                            Actions
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/instructor/courses/${course.id}/edit`}>
                              <FaEdit className="me-2" />
                              Edit Course
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to={`/course/${course.id}`}>
                              <FaEye className="me-2" />
                              View Course
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to={`/instructor/courses/${course.id}/analytics`}>
                              <FaChartLine className="me-2" />
                              Analytics
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {course.status === 'published' ? (
                              <Dropdown.Item onClick={() => handleUnpublish(course.id)}>
                                <FaPlayCircle className="me-2" />
                                Unpublish
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item onClick={() => handlePublish(course.id)}>
                                <FaPlayCircle className="me-2 text-success" />
                                Publish
                              </Dropdown.Item>
                            )}
                            {course.status !== 'archived' ? (
                              <Dropdown.Item onClick={() => {
                                setCourseToArchive(course.id);
                                setShowArchiveModal(true);
                              }}>
                                <FaArchive className="me-2" />
                                Archive
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item onClick={() => handlePublish(course.id)}>
                                <FaPlayCircle className="me-2" />
                                Restore
                              </Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item
                              className="text-danger"
                              onClick={() => {
                                setCourseToDelete(course.id);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrash className="me-2" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        {totalPages > 1 && (
          <Card.Footer className="bg-white">
            <div className="d-flex justify-content-center">
              <Pagination className="mb-0">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (pageNumber === 1 || pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return <Pagination.Ellipsis key={pageNumber} disabled />;
                  }
                  return null;
                })}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            </div>
          </Card.Footer>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <strong>Warning:</strong> This action cannot be undone. All course data, student progress, and reviews will be permanently deleted.
          </Alert>
          <p>Are you sure you want to delete this course?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(courseToDelete)}>
            Delete Course
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Archive Confirmation Modal */}
      <Modal show={showArchiveModal} onHide={() => setShowArchiveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Archive Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            <strong>Note:</strong> Archived courses will no longer be visible to students, but all data will be preserved.
          </Alert>
          <p>Are you sure you want to archive this course?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowArchiveModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={() => handleArchive(courseToArchive)}>
            Archive Course
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CourseManagement;
