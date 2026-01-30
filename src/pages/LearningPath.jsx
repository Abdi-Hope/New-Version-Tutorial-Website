import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Container,
  Button,
  Badge,
  Form,
  ProgressBar,
  Alert,
  Tab,
  Tabs,
  ListGroup,
  Dropdown,
  Modal,
  Accordion,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import {
  FaRoad,
  FaGraduationCap,
  FaClock,
  FaBook,
  FaPlayCircle,
  FaCheckCircle,
  FaLock,
  FaStar,
  FaFilter,
  FaSort,
  FaDownload,
  FaShare,
  FaChartLine,
  FaCalendar,
  FaUserGraduate,
  FaTrophy,
  FaLightbulb,
  FaQuestionCircle,
  FaExclamationCircle,
  FaArrowRight
} from 'react-icons/fa';

const LearningPath = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [selectedPath, setSelectedPath] = useState(null);
  const [learningPaths, setLearningPaths] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPathDetails, setShowPathDetails] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillLevel, setSkillLevel] = useState('all');

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      const mockPaths = [
        {
          id: 1,
          title: 'Full-Stack Web Developer',
          description: 'Master both frontend and backend development to build complete web applications',
          category: 'Web Development',
          level: 'Intermediate to Advanced',
          duration: '6 months',
          courses: 12,
          totalHours: 240,
          progress: 65,
          enrolled: 15420,
          rating: 4.8,
          isEnrolled: true,
          isFeatured: true,
          skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'API Design', 'Deployment'],
          prerequisites: ['Basic programming knowledge', 'Understanding of web basics'],
          careerOutcomes: ['Full-Stack Developer', 'Web Developer', 'Software Engineer'],
          modules: [
            {
              id: 1,
              title: 'Frontend Fundamentals',
              courses: 3,
              hours: 60,
              completed: true,
              description: 'Learn HTML, CSS, and JavaScript essentials',
              items: [
                { id: 1, title: 'HTML & CSS Mastery', type: 'course', duration: '20 hours', completed: true },
                { id: 2, title: 'Modern JavaScript', type: 'course', duration: '25 hours', completed: true },
                { id: 3, title: 'Responsive Design', type: 'project', duration: '15 hours', completed: true }
              ]
            },
            {
              id: 2,
              title: 'React Development',
              courses: 2,
              hours: 50,
              completed: true,
              description: 'Build dynamic UIs with React',
              items: [
                { id: 4, title: 'React Fundamentals', type: 'course', duration: '30 hours', completed: true },
                { id: 5, title: 'Advanced React Patterns', type: 'course', duration: '20 hours', completed: true }
              ]
            },
            {
              id: 3,
              title: 'Backend Development',
              courses: 3,
              hours: 70,
              completed: false,
              description: 'Server-side programming with Node.js',
              items: [
                { id: 6, title: 'Node.js & Express', type: 'course', duration: '35 hours', completed: true },
                { id: 7, title: 'Database Design', type: 'course', duration: '20 hours', completed: false },
                { id: 8, title: 'API Development', type: 'project', duration: '15 hours', completed: false }
              ]
            },
            {
              id: 4,
              title: 'Full-Stack Projects',
              courses: 4,
              hours: 60,
              completed: false,
              description: 'Build complete applications',
              items: [
                { id: 9, title: 'E-commerce Platform', type: 'project', duration: '20 hours', completed: false },
                { id: 10, title: 'Social Media App', type: 'project', duration: '20 hours', completed: false },
                { id: 11, title: 'Real-time Chat', type: 'project', duration: '10 hours', completed: false },
                { id: 12, title: 'Portfolio Website', type: 'project', duration: '10 hours', completed: false }
              ]
            }
          ]
        },
        {
          id: 2,
          title: 'Data Science Professional',
          description: 'Learn data analysis, machine learning, and statistical modeling',
          category: 'Data Science',
          level: 'Intermediate',
          duration: '8 months',
          courses: 14,
          totalHours: 280,
          progress: 0,
          enrolled: 9870,
          rating: 4.9,
          isEnrolled: false,
          isFeatured: true,
          skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization', 'Statistics'],
          prerequisites: ['Python basics', 'Mathematics fundamentals'],
          careerOutcomes: ['Data Scientist', 'Data Analyst', 'ML Engineer']
        },
        {
          id: 3,
          title: 'Mobile App Developer',
          description: 'Build iOS and Android apps with React Native and Flutter',
          category: 'Mobile Development',
          level: 'Beginner to Intermediate',
          duration: '5 months',
          courses: 10,
          totalHours: 200,
          progress: 30,
          enrolled: 7650,
          rating: 4.7,
          isEnrolled: true,
          isFeatured: false,
          skills: ['React Native', 'Flutter', 'Mobile UI', 'API Integration', 'App Store Deployment'],
          prerequisites: ['JavaScript basics', 'Understanding of React'],
          careerOutcomes: ['Mobile Developer', 'App Developer', 'Frontend Engineer']
        },
        {
          id: 4,
          title: 'DevOps Engineer',
          description: 'Master infrastructure, CI/CD, and cloud technologies',
          category: 'DevOps',
          level: 'Advanced',
          duration: '7 months',
          courses: 15,
          totalHours: 300,
          progress: 0,
          enrolled: 5430,
          rating: 4.8,
          isEnrolled: false,
          isFeatured: true,
          skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure as Code', 'Monitoring'],
          prerequisites: ['Linux basics', 'Networking fundamentals'],
          careerOutcomes: ['DevOps Engineer', 'Cloud Engineer', 'SRE']
        },
        {
          id: 5,
          title: 'UI/UX Designer',
          description: 'Learn user-centered design principles and tools',
          category: 'Design',
          level: 'Beginner',
          duration: '4 months',
          courses: 8,
          totalHours: 160,
          progress: 0,
          enrolled: 4320,
          rating: 4.6,
          isEnrolled: false,
          isFeatured: false,
          skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
          prerequisites: ['No prior experience required'],
          careerOutcomes: ['UI Designer', 'UX Designer', 'Product Designer']
        },
        {
          id: 6,
          title: 'Machine Learning Engineer',
          description: 'Advanced ML algorithms, deep learning, and model deployment',
          category: 'AI/ML',
          level: 'Advanced',
          duration: '9 months',
          courses: 16,
          totalHours: 320,
          progress: 0,
          enrolled: 3210,
          rating: 4.9,
          isEnrolled: false,
          isFeatured: true,
          skills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'Computer Vision', 'NLP', 'Model Deployment'],
          prerequisites: ['Python advanced', 'Linear algebra', 'Calculus'],
          careerOutcomes: ['ML Engineer', 'AI Researcher', 'Data Scientist']
        }
      ];

      const mockProgress = {
        1: { completedCourses: 5, totalCourses: 12, lastAccessed: '2024-12-20' },
        3: { completedCourses: 3, totalCourses: 10, lastAccessed: '2024-12-15' }
      };

      setLearningPaths(mockPaths);
      setUserProgress(mockProgress);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEnroll = (pathId) => {
    setLearningPaths(paths => paths.map(path =>
      path.id === pathId ? { ...path, isEnrolled: true, progress: 0 } : path
    ));
    setShowEnrollModal(false);
    alert(`Successfully enrolled in the learning path!`);
  };

  const handleUnenroll = (pathId) => {
    setLearningPaths(paths => paths.map(path =>
      path.id === pathId ? { ...path, isEnrolled: false } : path
    ));
    alert(`You have left the learning path.`);
  };

  const filteredPaths = learningPaths.filter(path => {
    if (activeTab === 'enrolled') return path.isEnrolled;
    if (activeTab === 'featured') return path.isFeatured;
    if (skillLevel !== 'all') {
      if (skillLevel === 'beginner') return path.level.includes('Beginner');
      if (skillLevel === 'intermediate') return path.level.includes('Intermediate');
      if (skillLevel === 'advanced') return path.level.includes('Advanced');
    }
    return true;
  }).filter(path =>
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    path.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelBadge = (level) => {
    if (level.includes('Beginner')) return <Badge bg="success">Beginner</Badge>;
    if (level.includes('Intermediate')) return <Badge bg="warning">Intermediate</Badge>;
    if (level.includes('Advanced')) return <Badge bg="danger">Advanced</Badge>;
    return <Badge bg="secondary">{level}</Badge>;
  };

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
          <span className="visually-hidden">Loading learning paths...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Hero Section */}
      <Card className="bg-primary text-white mb-4 border-0 shadow-sm">
        <Card.Body className="p-5">
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-5 fw-bold mb-3">Learning Paths</h1>
              <p className="lead mb-4">
                Structured roadmaps to guide your learning journey. Follow expert-curated paths
                to achieve your career goals efficiently.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg">
                  <FaChartLine className="me-2" />
                  Take Skill Assessment
                </Button>
                <Button variant="outline-light" size="lg">
                  <FaQuestionCircle className="me-2" />
                  Need Help Choosing?
                </Button>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <div className="bg-white bg-opacity-10 p-4 rounded-3">
                <FaRoad size={64} className="mb-3" />
                <h4>Personalized Paths</h4>
                <p className="mb-0">Based on your skills and goals</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats Overview */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaRoad className="text-primary mb-2" size={24} />
              <h3>{learningPaths.length}</h3>
              <p className="text-muted mb-0">Learning Paths</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaUserGraduate className="text-success mb-2" size={24} />
              <h3>{learningPaths.filter(p => p.isEnrolled).length}</h3>
              <p className="text-muted mb-0">Your Paths</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaClock className="text-warning mb-2" size={24} />
              <h3>{learningPaths.reduce((sum, path) => sum + (path.isEnrolled ? path.progress : 0), 0) / learningPaths.filter(p => p.isEnrolled).length || 0}%</h3>
              <p className="text-muted mb-0">Avg Progress</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaTrophy className="text-danger mb-2" size={24} />
              <h3>{learningPaths.filter(p => p.progress === 100).length}</h3>
              <p className="text-muted mb-0">Completed</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search learning paths by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-3"
              />
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100 py-3">
                  <FaFilter className="me-2" />
                  Skill Level: {skillLevel === 'all' ? 'All Levels' : skillLevel}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSkillLevel('all')}>All Levels</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setSkillLevel('beginner')}>Beginner</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSkillLevel('intermediate')}>Intermediate</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSkillLevel('advanced')}>Advanced</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100 py-3">
                  <FaSort className="me-2" />
                  Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Most Popular</Dropdown.Item>
                  <Dropdown.Item>Highest Rated</Dropdown.Item>
                  <Dropdown.Item>Shortest Duration</Dropdown.Item>
                  <Dropdown.Item>Newest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
        fill
      >
        <Tab eventKey="recommended" title="Recommended For You" />
        <Tab eventKey="enrolled" title={`My Learning Paths (${learningPaths.filter(p => p.isEnrolled).length})`} />
        <Tab eventKey="featured" title="Featured Paths" />
        <Tab eventKey="all" title="All Paths" />
      </Tabs>

      {/* Learning Paths Grid */}
      {filteredPaths.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No learning paths found</Alert.Heading>
          <p>
            {searchTerm || skillLevel !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : activeTab === 'enrolled'
                ? "You haven't enrolled in any learning paths yet."
                : 'No learning paths match your criteria.'}
          </p>
          <Button variant="primary">
            Explore All Paths
          </Button>
        </Alert>
      ) : (
        <Row className="g-4">
          {filteredPaths.map((path) => (
            <Col key={path.id} xl={4} lg={6} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <Badge bg={path.category === 'Web Development' ? 'primary' : 
                                path.category === 'Data Science' ? 'success' :
                                path.category === 'Mobile Development' ? 'info' :
                                path.category === 'DevOps' ? 'dark' :
                                path.category === 'Design' ? 'warning' : 'secondary'}>
                        {path.category}
                      </Badge>
                      {path.isFeatured && (
                        <Badge bg="warning" className="ms-2">
                          <FaStar className="me-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="text-end">
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-1" />
                        <span className="fw-bold">{path.rating}</span>
                      </div>
                    </div>
                  </div>

                  <Card.Title className="h4 mb-3">{path.title}</Card.Title>
                  
                  <Card.Text className="text-muted mb-4">
                    {path.description}
                  </Card.Text>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <FaGraduationCap className="me-2" />
                        {getLevelBadge(path.level)}
                      </span>
                      <span className="text-muted">
                        <FaClock className="me-2" />
                        {path.duration}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <FaBook className="me-2" />
                        {path.courses} courses
                      </span>
                      <span className="text-muted">
                        <FaUserGraduate className="me-2" />
                        {path.enrolled.toLocaleString()} enrolled
                      </span>
                    </div>
                  </div>

                  {path.isEnrolled && (
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Your Progress</span>
                        <span className="fw-bold">{path.progress}%</span>
                      </div>
                      <ProgressBar now={path.progress} variant={getProgressColor(path.progress)} />
                      <div className="text-end mt-1">
                        <small className="text-muted">
                          {userProgress[path.id]?.completedCourses || 0}/{path.courses} courses completed
                        </small>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h6 className="mb-2">Skills You'll Learn:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {path.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                          {skill}
                        </Badge>
                      ))}
                      {path.skills.length > 4 && (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              {path.skills.slice(4).join(', ')}
                            </Tooltip>
                          }
                        >
                          <Badge bg="light" text="dark" className="mb-1">
                            +{path.skills.length - 4} more
                          </Badge>
                        </OverlayTrigger>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {path.isEnrolled ? (
                        <div className="text-success">
                          <FaCheckCircle className="me-2" />
                          <span>Enrolled</span>
                        </div>
                      ) : (
                        <div className="text-muted">
                          <FaLock className="me-2" />
                          <span>Not enrolled</span>
                        </div>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setSelectedPath(path);
                          setShowPathDetails(true);
                        }}
                      >
                        <FaArrowRight className="me-1" />
                        View Details
                      </Button>
                      {path.isEnrolled ? (
                        <Button
                          variant="primary"
                          size="sm"
                          as={Link}
                          to={`/learning-path/${path.id}`}
                        >
                          <FaPlayCircle className="me-1" />
                          Continue
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setSelectedPath(path);
                            setShowEnrollModal(true);
                          }}
                        >
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Learning Path Details Modal */}
      <Modal show={showPathDetails} onHide={() => setShowPathDetails(false)} size="lg" fullscreen="lg-down">
        {selectedPath && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedPath.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={8}>
                  <div className="mb-4">
                    <h4>Path Overview</h4>
                    <p>{selectedPath.description}</p>
                    
                    <div className="row mb-4">
                      <div className="col-md-4">
                        <div className="border rounded p-3 text-center">
                          <FaClock className="text-primary mb-2" size={20} />
                          <h5>{selectedPath.duration}</h5>
                          <p className="text-muted mb-0">Duration</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="border rounded p-3 text-center">
                          <FaBook className="text-success mb-2" size={20} />
                          <h5>{selectedPath.courses}</h5>
                          <p className="text-muted mb-0">Courses</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="border rounded p-3 text-center">
                          <FaUserGraduate className="text-warning mb-2" size={20} />
                          <h5>{selectedPath.enrolled.toLocaleString()}</h5>
                          <p className="text-muted mb-0">Students</p>
                        </div>
                      </div>
                    </div>

                    <h5 className="mb-3">Skills You'll Master</h5>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {selectedPath.skills.map((skill, index) => (
                        <Badge key={index} bg="primary" className="py-2 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {selectedPath.modules && (
                      <>
                        <h5 className="mb-3">Curriculum</h5>
                        <Accordion defaultActiveKey="0">
                          {selectedPath.modules.map((module, index) => (
                            <Accordion.Item key={module.id} eventKey={index.toString()}>
                              <Accordion.Header>
                                <div className="d-flex align-items-center w-100">
                                  <div className="me-3">
                                    {module.completed ? (
                                      <FaCheckCircle className="text-success" />
                                    ) : (
                                      <div className="text-muted">{index + 1}</div>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <h6 className="mb-0">{module.title}</h6>
                                    <small className="text-muted">
                                      {module.courses} courses • {module.hours} hours
                                    </small>
                                  </div>
                                  <Badge bg={module.completed ? 'success' : 'secondary'}>
                                    {module.completed ? 'Completed' : 'Pending'}
                                  </Badge>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <p className="text-muted">{module.description}</p>
                                <ListGroup variant="flush">
                                  {module.items.map((item) => (
                                    <ListGroup.Item key={item.id} className="border-0 px-0">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <div className="d-flex align-items-center">
                                            {item.completed ? (
                                              <FaCheckCircle className="text-success me-2" />
                                            ) : (
                                              <div className="me-2" style={{ width: '16px' }}></div>
                                            )}
                                            <span>{item.title}</span>
                                          </div>
                                          <small className="text-muted ms-4">
                                            {item.type} • {item.duration}
                                          </small>
                                        </div>
                                        <Button size="sm" variant="outline-primary">
                                          {item.completed ? 'Review' : 'Start'}
                                        </Button>
                                      </div>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </>
                    )}
                  </div>
                </Col>
                <Col lg={4}>
                  <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
                    <Card.Body>
                      <h5 className="mb-3">Path Details</h5>
                      
                      <ListGroup variant="flush" className="mb-4">
                        <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-2">
                          <span className="text-muted">Category:</span>
                          <span>{selectedPath.category}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-2">
                          <span className="text-muted">Level:</span>
                          <span>{getLevelBadge(selectedPath.level)}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-2">
                          <span className="text-muted">Rating:</span>
                          <span>
                            <FaStar className="text-warning me-1" />
                            {selectedPath.rating}
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between border-0 px-0 py-2">
                          <span className="text-muted">Total Hours:</span>
                          <span>{selectedPath.totalHours} hours</span>
                        </ListGroup.Item>
                      </ListGroup>

                      <h6 className="mb-2">Prerequisites</h6>
                      <ul className="text-muted small mb-4">
                        {selectedPath.prerequisites.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>

                      <h6 className="mb-2">Career Outcomes</h6>
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        {selectedPath.careerOutcomes.map((outcome, index) => (
                          <Badge key={index} bg="success" className="py-1">
                            {outcome}
                          </Badge>
                        ))}
                      </div>

                      <div className="d-grid gap-2">
                        {selectedPath.isEnrolled ? (
                          <>
                            <Button variant="primary" as={Link} to={`/learning-path/${selectedPath.id}`}>
                              <FaPlayCircle className="me-2" />
                              Continue Learning
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleUnenroll(selectedPath.id)}>
                              Leave Learning Path
                            </Button>
                          </>
                        ) : (
                          <Button variant="primary" onClick={() => {
                            setShowPathDetails(false);
                            setShowEnrollModal(true);
                          }}>
                            Enroll in This Path
                          </Button>
                        )}
                        <Button variant="outline-secondary">
                          <FaShare className="me-2" />
                          Share Path
                        </Button>
                        <Button variant="outline-secondary">
                          <FaDownload className="me-2" />
                          Download Syllabus
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* Enroll Modal */}
      <Modal show={showEnrollModal} onHide={() => setShowEnrollModal(false)}>
        {selectedPath && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Enroll in Learning Path</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert variant="info">
                <FaLightbulb className="me-2" />
                <strong>What you'll get:</strong>
                <ul className="mt-2 mb-0">
                  <li>Structured learning journey</li>
                  <li>Progress tracking and certificates</li>
                  <li>Community support and discussion forums</li>
                  <li>Access to all course materials</li>
                </ul>
              </Alert>
              <p>
                Are you ready to start your journey to become a {selectedPath.title}?
                This path includes {selectedPath.courses} courses and will take approximately {selectedPath.duration} to complete.
              </p>
              <div className="text-center mb-3">
                <h4 className="text-primary">{selectedPath.title}</h4>
                <p className="text-muted">{selectedPath.description}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEnrollModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleEnroll(selectedPath.id)}>
                Enroll Now
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Call to Action */}
      <Card className="bg-gradient shadow-sm mt-5 border-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Card.Body className="text-white text-center p-5">
          <FaTrophy size={64} className="mb-4" />
          <h2 className="mb-3">Ready to Start Your Journey?</h2>
          <p className="lead mb-4">
            Take our skill assessment to get personalized learning path recommendations.
          </p>
          <Button variant="light" size="lg" className="me-3">
            Take Assessment
          </Button>
          <Button variant="outline-light" size="lg">
            Browse All Paths
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LearningPath;
