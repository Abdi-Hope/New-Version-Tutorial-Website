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
  InputGroup,
  Modal,
  Alert,
  Tab,
  Tabs,
  ListGroup,
  ProgressBar,
  Dropdown,
  Pagination
} from 'react-bootstrap';
import {
  FaSearch,
  FaPlus,
  FaUsers,
  FaCalendar,
  FaComment,
  FaVideo,
  FaBook,
  FaStar,
  FaLock,
  FaGlobe,
  FaFilter,
  FaSort,
  FaBell,
  FaUserPlus,
  FaPaperPlane,
  FaThumbsUp,
  FaShare,
  FaClock
} from 'react-icons/fa';

const StudyGroups = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [studyGroups, setStudyGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(9);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      const mockGroups = [
        {
          id: 1,
          name: 'React Masters Study Group',
          description: 'Advanced React concepts and projects discussion',
          members: 24,
          maxMembers: 30,
          category: 'Web Development',
          course: 'Advanced React',
          privacy: 'public',
          meetingFrequency: 'Weekly',
          nextMeeting: '2024-12-25T18:00:00',
          rating: 4.8,
          tags: ['react', 'hooks', 'projects', 'advanced'],
          isMember: true,
          isAdmin: true,
          createdBy: 'You',
          createdAt: '2024-11-15'
        },
        {
          id: 2,
          name: 'JavaScript Fundamentals',
          description: 'Beginners learning JavaScript basics together',
          members: 18,
          maxMembers: 25,
          category: 'Programming',
          course: 'JavaScript Fundamentals',
          privacy: 'public',
          meetingFrequency: 'Bi-weekly',
          nextMeeting: '2024-12-22T19:00:00',
          rating: 4.5,
          tags: ['javascript', 'beginners', 'fundamentals'],
          isMember: true,
          isAdmin: false,
          createdBy: 'Sarah Johnson',
          createdAt: '2024-11-20'
        },
        {
          id: 3,
          name: 'Node.js Backend Developers',
          description: 'Building scalable backend applications with Node.js',
          members: 32,
          maxMembers: 40,
          category: 'Backend',
          course: 'Node.js Masterclass',
          privacy: 'private',
          meetingFrequency: 'Weekly',
          nextMeeting: '2024-12-24T17:00:00',
          rating: 4.9,
          tags: ['nodejs', 'backend', 'api', 'express'],
          isMember: false,
          isAdmin: false,
          createdBy: 'Mike Chen',
          createdAt: '2024-11-10'
        },
        {
          id: 4,
          name: 'Data Science Enthusiasts',
          description: 'Machine learning and data analysis projects',
          members: 28,
          maxMembers: 35,
          category: 'Data Science',
          course: 'Python for Data Science',
          privacy: 'public',
          meetingFrequency: 'Monthly',
          nextMeeting: '2025-01-05T20:00:00',
          rating: 4.7,
          tags: ['python', 'ml', 'data-analysis', 'pandas'],
          isMember: false,
          isAdmin: false,
          createdBy: 'Dr. Emily Watson',
          createdAt: '2024-11-05'
        },
        {
          id: 5,
          name: 'UI/UX Design Community',
          description: 'Design principles, tools, and portfolio reviews',
          members: 22,
          maxMembers: 30,
          category: 'Design',
          course: 'UI/UX Design',
          privacy: 'public',
          meetingFrequency: 'Weekly',
          nextMeeting: '2024-12-23T16:00:00',
          rating: 4.6,
          tags: ['design', 'ui', 'ux', 'figma'],
          isMember: true,
          isAdmin: false,
          createdBy: 'Lisa Park',
          createdAt: '2024-11-25'
        },
        {
          id: 6,
          name: 'DevOps & Cloud Computing',
          description: 'Infrastructure, deployment, and cloud technologies',
          members: 15,
          maxMembers: 25,
          category: 'DevOps',
          course: 'DevOps Fundamentals',
          privacy: 'private',
          meetingFrequency: 'Bi-weekly',
          nextMeeting: '2024-12-28T19:00:00',
          rating: 4.4,
          tags: ['devops', 'aws', 'docker', 'kubernetes'],
          isMember: false,
          isAdmin: false,
          createdBy: 'Tom Wilson',
          createdAt: '2024-11-30'
        },
        {
          id: 7,
          name: 'Mobile App Development',
          description: 'React Native and Flutter app building',
          members: 20,
          maxMembers: 30,
          category: 'Mobile',
          course: 'Mobile App Development',
          privacy: 'public',
          meetingFrequency: 'Weekly',
          nextMeeting: '2024-12-26T18:30:00',
          rating: 4.8,
          tags: ['react-native', 'flutter', 'mobile', 'apps'],
          isMember: false,
          isAdmin: false,
          createdBy: 'Alex Rivera',
          createdAt: '2024-11-18'
        },
        {
          id: 8,
          name: 'Algorithm & Problem Solving',
          description: 'LeetCode challenges and coding interview prep',
          members: 45,
          maxMembers: 50,
          category: 'Algorithms',
          course: 'All Courses',
          privacy: 'public',
          meetingFrequency: 'Daily',
          nextMeeting: '2024-12-21T20:00:00',
          rating: 4.9,
          tags: ['algorithms', 'leetcode', 'interview', 'problems'],
          isMember: true,
          isAdmin: false,
          createdBy: 'David Kim',
          createdAt: '2024-11-08'
        },
        {
          id: 9,
          name: 'Web3 & Blockchain Developers',
          description: 'Smart contracts and decentralized applications',
          members: 12,
          maxMembers: 20,
          category: 'Blockchain',
          course: 'Blockchain Fundamentals',
          privacy: 'private',
          meetingFrequency: 'Monthly',
          nextMeeting: '2025-01-10T21:00:00',
          rating: 4.3,
          tags: ['blockchain', 'web3', 'solidity', 'smart-contracts'],
          isMember: false,
          isAdmin: false,
          createdBy: 'James Miller',
          createdAt: '2024-12-01'
        }
      ];

      setStudyGroups(mockGroups);
      setMyGroups(mockGroups.filter(group => group.isMember));
      setLoading(false);
    }, 1000);
  }, []);

  const handleJoinGroup = (groupId) => {
    setStudyGroups(groups => groups.map(group =>
      group.id === groupId ? { ...group, isMember: true, members: group.members + 1 } : group
    ));
    setMyGroups(groups => [...groups, studyGroups.find(g => g.id === groupId)]);
    setShowJoinModal(false);
    alert('Successfully joined the study group!');
  };

  const handleLeaveGroup = (groupId) => {
    setStudyGroups(groups => groups.map(group =>
      group.id === groupId ? { ...group, isMember: false, members: group.members - 1 } : group
    ));
    setMyGroups(groups => groups.filter(group => group.id !== groupId));
    alert('You have left the study group.');
  };

  const handleCreateGroup = (groupData) => {
    const newGroup = {
      id: studyGroups.length + 1,
      ...groupData,
      members: 1,
      rating: 0,
      isMember: true,
      isAdmin: true,
      createdBy: 'You',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStudyGroups([newGroup, ...studyGroups]);
    setMyGroups([newGroup, ...myGroups]);
    setShowCreateModal(false);
    alert('Study group created successfully!');
  };

  const filteredGroups = studyGroups.filter(group => {
    if (activeTab === 'my') return group.isMember;
    if (activeTab === 'public') return group.privacy === 'public';
    if (activeTab === 'private') return group.privacy === 'private';
    return true;
  }).filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const formatMeetingTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((date - now) / (1000 * 60 * 60));
    
    if (diffInHours < 0) return 'Meeting in progress';
    if (diffInHours < 24) return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    if (diffInHours < 48) return `Tomorrow at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading study groups...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Study Groups</h1>
          <p className="text-muted mb-0">Collaborate, learn, and grow with fellow students</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          <FaPlus className="me-2" />
          Create Study Group
        </Button>
      </div>

      {/* Stats Overview */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaUsers className="text-primary mb-2" size={24} />
              <h3>{studyGroups.reduce((sum, group) => sum + group.members, 0)}</h3>
              <p className="text-muted mb-0">Total Members</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaBook className="text-success mb-2" size={24} />
              <h3>{myGroups.length}</h3>
              <p className="text-muted mb-0">Your Groups</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaCalendar className="text-warning mb-2" size={24} />
              <h3>{studyGroups.filter(g => new Date(g.nextMeeting) > new Date()).length}</h3>
              <p className="text-muted mb-0">Upcoming Meetings</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaComment className="text-info mb-2" size={24} />
              <h3>{studyGroups.length}</h3>
              <p className="text-muted mb-0">Active Groups</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
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
                  placeholder="Search study groups by name, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaFilter className="me-2" />
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>All Categories</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Web Development</Dropdown.Item>
                  <Dropdown.Item>Data Science</Dropdown.Item>
                  <Dropdown.Item>Design</Dropdown.Item>
                  <Dropdown.Item>Mobile Development</Dropdown.Item>
                  <Dropdown.Item>DevOps</Dropdown.Item>
                  <Dropdown.Item>Algorithms</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaSort className="me-2" />
                  Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Most Popular</Dropdown.Item>
                  <Dropdown.Item>Most Recent</Dropdown.Item>
                  <Dropdown.Item>Most Active</Dropdown.Item>
                  <Dropdown.Item>Highest Rated</Dropdown.Item>
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
        <Tab eventKey="all" title={`All Groups (${studyGroups.length})`} />
        <Tab eventKey="my" title={`My Groups (${myGroups.length})`} />
        <Tab eventKey="public" title="Public Groups" />
        <Tab eventKey="private" title="Private Groups" />
      </Tabs>

      {/* Study Groups Grid */}
      {currentGroups.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No study groups found</Alert.Heading>
          <p>
            {searchTerm 
              ? 'Try adjusting your search criteria.'
              : activeTab === 'my'
                ? "You haven't joined any study groups yet."
                : 'No study groups match your filters.'}
          </p>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create Your First Study Group
          </Button>
        </Alert>
      ) : (
        <>
          <Row className="g-4 mb-4">
            {currentGroups.map((group) => (
              <Col key={group.id} xl={4} lg={6} md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Badge bg={group.category === 'Web Development' ? 'primary' : 
                                  group.category === 'Data Science' ? 'success' :
                                  group.category === 'Design' ? 'warning' :
                                  group.category === 'Mobile' ? 'info' : 'secondary'}>
                          {group.category}
                        </Badge>
                        {group.privacy === 'private' ? (
                          <Badge bg="dark" className="ms-2">
                            <FaLock className="me-1" />
                            Private
                          </Badge>
                        ) : (
                          <Badge bg="light" text="dark" className="ms-2">
                            <FaGlobe className="me-1" />
                            Public
                          </Badge>
                        )}
                      </div>
                      <div className="text-end">
                        <div className="d-flex align-items-center">
                          <FaStar className="text-warning me-1" />
                          <span className="fw-bold">{group.rating}</span>
                        </div>
                      </div>
                    </div>

                    <Card.Title className="h4 mb-3">{group.name}</Card.Title>
                    
                    <Card.Text className="text-muted mb-4">
                      {group.description}
                    </Card.Text>

                    <div className="mb-4">
                      {group.tags.map((tag, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">
                          <FaUsers className="me-2" />
                          {group.members}/{group.maxMembers} members
                        </span>
                        <span className="text-muted">{group.meetingFrequency}</span>
                      </div>
                      <ProgressBar 
                        now={(group.members / group.maxMembers) * 100} 
                        variant={group.members >= group.maxMembers ? 'danger' : 'primary'}
                      />
                    </div>

                    <div className="mb-4">
                      <div className="d-flex align-items-center text-muted">
                        <FaCalendar className="me-2" />
                        <div>
                          <strong>Next Meeting:</strong> {formatMeetingTime(group.nextMeeting)}
                        </div>
                      </div>
                      {group.course && (
                        <div className="d-flex align-items-center text-muted mt-2">
                          <FaBook className="me-2" />
                          <span>Related Course: {group.course}</span>
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-muted small">
                        Created by {group.createdBy} • {new Date(group.createdAt).toLocaleDateString()}
                      </div>
                      <div className="d-flex gap-2">
                        {group.isMember ? (
                          <>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              as={Link}
                              to={`/study-groups/${group.id}`}
                            >
                              <FaUsers className="me-1" />
                              View
                            </Button>
                            <Dropdown>
                              <Dropdown.Toggle variant="light" size="sm">
                                Actions
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <FaBell className="me-2" />
                                  Notifications
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <FaUserPlus className="me-2" />
                                  Invite Members
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <FaShare className="me-2" />
                                  Share Group
                                </Dropdown.Item>
                                {group.isAdmin && (
                                  <>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                      <FaPlus className="me-2" />
                                      Manage Group
                                    </Dropdown.Item>
                                  </>
                                )}
                                <Dropdown.Divider />
                                <Dropdown.Item 
                                  className="text-danger"
                                  onClick={() => handleLeaveGroup(group.id)}
                                >
                                  Leave Group
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        ) : (
                          <>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => {
                                setSelectedGroup(group.id);
                                setShowJoinModal(true);
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleJoinGroup(group.id)}
                              disabled={group.members >= group.maxMembers}
                            >
                              {group.members >= group.maxMembers ? 'Full' : 'Join Group'}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
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
          )}
        </>
      )}

      {/* Create Group Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Study Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a descriptive name for your study group"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the purpose and focus of your study group"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select required>
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Algorithms">Algorithms</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Related Course (Optional)</Form.Label>
                  <Form.Select>
                    <option value="">Select a course</option>
                    <option value="Advanced React">Advanced React</option>
                    <option value="JavaScript Fundamentals">JavaScript Fundamentals</option>
                    <option value="Node.js Masterclass">Node.js Masterclass</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Python for Data Science">Python for Data Science</option>
                    <option value="All Courses">All Courses</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Privacy</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      id="public"
                      name="privacy"
                      label={
                        <>
                          <FaGlobe className="me-2" />
                          Public - Anyone can join
                        </>
                      }
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      id="private"
                      name="privacy"
                      label={
                        <>
                          <FaLock className="me-2" />
                          Private - Requires approval to join
                        </>
                      }
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Maximum Members</Form.Label>
                  <Form.Select defaultValue="30">
                    <option value="10">10 members</option>
                    <option value="20">20 members</option>
                    <option value="30">30 members</option>
                    <option value="40">40 members</option>
                    <option value="50">50 members</option>
                    <option value="100">100 members</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Meeting Frequency</Form.Label>
              <Form.Select defaultValue="weekly">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add tags separated by commas (e.g., react, hooks, projects)"
              />
              <Form.Text className="text-muted">
                Tags help others find your group more easily.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleCreateGroup({
            name: 'New Study Group',
            description: 'A new study group for collaborative learning',
            category: 'Web Development',
            privacy: 'public',
            maxMembers: 30,
            meetingFrequency: 'Weekly',
            tags: ['learning', 'collaboration']
          })}>
            Create Study Group
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Join Group Modal */}
      <Modal show={showJoinModal} onHide={() => setShowJoinModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join Study Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            <strong>Note:</strong> By joining this study group, you agree to:
            <ul className="mt-2 mb-0">
              <li>Respect all members and maintain a positive learning environment</li>
              <li>Participate actively in group discussions and activities</li>
              <li>Follow the group rules and guidelines</li>
            </ul>
          </Alert>
          <p>Are you sure you want to join this study group?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJoinModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleJoinGroup(selectedGroup)}>
            Join Group
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Featured Groups Section */}
      <Card className="shadow-sm mt-5">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            <FaStar className="me-2" />
            Featured Study Groups
          </h4>
        </Card.Header>
        <Card.Body>
          <Row className="g-4">
            {studyGroups
              .filter(g => g.rating >= 4.7)
              .slice(0, 3)
              .map((group) => (
                <Col key={group.id} md={4}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FaUsers className="text-primary" size={20} />
                        </div>
                        <div>
                          <h5 className="mb-0">{group.name}</h5>
                          <div className="d-flex align-items-center">
                            <FaStar className="text-warning me-1" />
                            <span className="fw-bold">{group.rating}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted small mb-3">{group.description.substring(0, 80)}...</p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        className="w-100"
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        Join Group
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudyGroups;
