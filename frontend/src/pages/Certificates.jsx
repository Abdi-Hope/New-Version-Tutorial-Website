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
  Dropdown,
  Modal,
  Alert,
  Tab,
  Tabs,
  ProgressBar,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import {
  FaAward,
  FaSearch,
  FaDownload,
  FaShare,
  FaPrint,
  FaEye,
  FaFilter,
  FaSort,
  FaCalendar,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaBook,
  FaExternalLinkAlt,
  FaEnvelope,
  FaLinkedin,
  FaFilePdf,
  FaCertificate,
  FaTrophy,
  FaGraduationCap
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificates = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      const mockCertificates = [
        {
          id: 1,
          title: 'Advanced React Development',
          courseId: 'react-101',
          issueDate: '2024-12-15',
          expiryDate: null,
          grade: 'A+',
          certificateNumber: 'CERT-2024-REACT-001',
          verificationUrl: 'https://verify.tutorialsite.com/cert/CERT-2024-REACT-001',
          status: 'issued',
          progress: 100,
          skills: ['React Hooks', 'Context API', 'Performance Optimization', 'Testing'],
          hoursCompleted: 48,
          instructor: 'Dr. Sarah Johnson',
          institution: 'Tech Learning Academy',
          issuedBy: 'Tech Learning Academy',
          isFeatured: true,
          category: 'Web Development',
          level: 'Advanced',
          shareCount: 124,
          downloads: 89,
          lastAccessed: '2024-12-20'
        },
        {
          id: 2,
          title: 'JavaScript Fundamentals',
          courseId: 'js-101',
          issueDate: '2024-11-30',
          expiryDate: '2025-11-30',
          grade: 'A',
          certificateNumber: 'CERT-2024-JS-045',
          verificationUrl: 'https://verify.tutorialsite.com/cert/CERT-2024-JS-045',
          status: 'issued',
          progress: 100,
          skills: ['ES6+', 'DOM Manipulation', 'Async Programming', 'Debugging'],
          hoursCompleted: 36,
          instructor: 'Mike Chen',
          institution: 'Tech Learning Academy',
          issuedBy: 'Tech Learning Academy',
          isFeatured: false,
          category: 'Programming',
          level: 'Beginner',
          shareCount: 76,
          downloads: 54,
          lastAccessed: '2024-12-10'
        },
        {
          id: 3,
          title: 'Node.js Masterclass',
          courseId: 'node-201',
          issueDate: '2024-11-15',
          expiryDate: null,
          grade: 'A+',
          certificateNumber: 'CERT-2024-NODE-012',
          verificationUrl: 'https://verify.tutorialsite.com/cert/CERT-2024-NODE-012',
          status: 'issued',
          progress: 100,
          skills: ['Express.js', 'REST APIs', 'Authentication', 'Database Integration'],
          hoursCompleted: 42,
          instructor: 'Alex Rivera',
          institution: 'Tech Learning Academy',
          issuedBy: 'Tech Learning Academy',
          isFeatured: true,
          category: 'Backend',
          level: 'Intermediate',
          shareCount: 92,
          downloads: 67,
          lastAccessed: '2024-12-05'
        },
        {
          id: 4,
          title: 'UI/UX Design Principles',
          courseId: 'design-101',
          issueDate: '2024-10-28',
          expiryDate: null,
          grade: 'B+',
          certificateNumber: 'CERT-2024-DESIGN-078',
          verificationUrl: 'https://verify.tutorialsite.com/cert/CERT-2024-DESIGN-078',
          status: 'issued',
          progress: 100,
          skills: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
          hoursCompleted: 32,
          instructor: 'Lisa Park',
          institution: 'Tech Learning Academy',
          issuedBy: 'Tech Learning Academy',
          isFeatured: false,
          category: 'Design',
          level: 'Beginner',
          shareCount: 45,
          downloads: 32,
          lastAccessed: '2024-11-30'
        },
        {
          id: 5,
          title: 'Python for Data Science',
          courseId: 'python-ds-201',
          issueDate: '2024-10-15',
          expiryDate: '2025-10-15',
          grade: 'A',
          certificateNumber: 'CERT-2024-PYDS-023',
          verificationUrl: 'https://verify.tutorialsite.com/cert/CERT-2024-PYDS-023',
          status: 'issued',
          progress: 100,
          skills: ['Pandas', 'NumPy', 'Data Visualization', 'Machine Learning'],
          hoursCompleted: 54,
          instructor: 'Dr. Emily Watson',
          institution: 'Tech Learning Academy',
          issuedBy: 'Tech Learning Academy',
          isFeatured: true,
          category: 'Data Science',
          level: 'Intermediate',
          shareCount: 108,
          downloads: 78,
          lastAccessed: '2024-11-25'
        },
        {
          id: 6,
          title: 'DevOps Fundamentals',
          courseId: 'devops-101',
          issueDate: '2024-09-30',
          expiryDate: null,
          grade: 'A-',
          certificateNumber: 'CERT-2024-DEVOPS-056',
          verificationUrl: 'https://verify.tutorialsite.com/cert/CERT-2024-DEVOPS-056',
          status: 'issued',
          progress: 100,
          skills: ['Docker', 'CI/CD', 'Cloud Infrastructure', 'Monitoring'],
          hoursCompleted: 40,
          instructor: 'Tom Wilson',
          institution: 'Tech Learning Academy',
          issuedBy: 'Tech Learning Academy',
          isFeatured: false,
          category: 'DevOps',
          level: 'Intermediate',
          shareCount: 63,
          downloads: 45,
          lastAccessed: '2024-11-20'
        },
        {
          id: 7,
          title: 'Mobile App Development',
          courseId: 'mobile-201',
          issueDate: null,
          expiryDate: null,
          grade: null,
          certificateNumber: null,
          verificationUrl: null,
          status: 'in-progress',
          progress: 65,
          skills: ['React Native', 'Mobile UI', 'API Integration', 'App Deployment'],
          hoursCompleted: 26,
          instructor: 'David Kim',
          institution: 'Tech Learning Academy',
          issuedBy: null,
          isFeatured: false,
          category: 'Mobile',
          level: 'Intermediate',
          shareCount: 0,
          downloads: 0,
          lastAccessed: '2024-12-18'
        },
        {
          id: 8,
          title: 'Machine Learning Basics',
          courseId: 'ml-101',
          issueDate: null,
          expiryDate: null,
          grade: null,
          certificateNumber: null,
          verificationUrl: null,
          status: 'not-started',
          progress: 0,
          skills: ['TensorFlow', 'Neural Networks', 'Model Training', 'Evaluation'],
          hoursCompleted: 0,
          instructor: 'James Miller',
          institution: 'Tech Learning Academy',
          issuedBy: null,
          isFeatured: false,
          category: 'AI/ML',
          level: 'Advanced',
          shareCount: 0,
          downloads: 0,
          lastAccessed: null
        }
      ];

      setCertificates(mockCertificates);
      setFilteredCertificates(mockCertificates);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = certificates;

    // Filter by tab
    if (activeTab === 'issued') {
      result = result.filter(cert => cert.status === 'issued');
    } else if (activeTab === 'in-progress') {
      result = result.filter(cert => cert.status === 'in-progress');
    } else if (activeTab === 'featured') {
      result = result.filter(cert => cert.isFeatured);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(cert =>
        cert.title.toLowerCase().includes(term) ||
        cert.category.toLowerCase().includes(term) ||
        cert.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }

    // Sort results
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.issueDate || 0) - new Date(a.issueDate || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.progress - a.progress;
        case 'grade':
          return (b.grade || '').localeCompare(a.grade || '');
        default:
          return 0;
      }
    });

    setFilteredCertificates(result);
  }, [certificates, activeTab, searchTerm, sortBy]);

  const handleDownloadPDF = async (certificate) => {
    setDownloading(true);
    try {
      // In a real app, you would have a certificate template element
      // For now, we'll create a simple PDF
      const pdf = new jsPDF('l', 'mm', 'a4');
      
      // Add certificate content
      pdf.setFontSize(24);
      pdf.text('CERTIFICATE OF COMPLETION', 105, 50, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.text('This certifies that', 105, 70, { align: 'center' });
      
      pdf.setFontSize(20);
      pdf.text('John Doe', 105, 85, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.text(`has successfully completed the course`, 105, 100, { align: 'center' });
      
      pdf.setFontSize(18);
      pdf.text(certificate.title, 105, 115, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.text(`Issued on: ${certificate.issueDate || 'Pending'}`, 105, 130, { align: 'center' });
      pdf.text(`Certificate ID: ${certificate.certificateNumber || 'N/A'}`, 105, 140, { align: 'center' });
      
      pdf.save(`certificate-${certificate.certificateNumber || certificate.id}.pdf`);
      
      // Update download count
      if (certificate.status === 'issued') {
        setCertificates(certs => certs.map(cert =>
          cert.id === certificate.id ? { ...cert, downloads: cert.downloads + 1 } : cert
        ));
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error downloading certificate. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = (certificate, platform) => {
    if (certificate.status !== 'issued') {
      alert('Certificate must be issued before sharing.');
      return;
    }

    const shareText = `I completed "${certificate.title}" with grade ${certificate.grade}!`;
    const shareUrl = certificate.verificationUrl || window.location.href;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Certificate link copied to clipboard!');
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: `Certificate: ${certificate.title}`,
            text: shareText,
            url: shareUrl,
          });
        } else {
          navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          alert('Certificate link copied to clipboard!');
        }
    }

    // Update share count
    setCertificates(certs => certs.map(cert =>
      cert.id === certificate.id ? { ...cert, shareCount: cert.shareCount + 1 } : cert
    ));
    setShowShareModal(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'issued':
        return <Badge bg="success">Issued</Badge>;
      case 'in-progress':
        return <Badge bg="warning">In Progress</Badge>;
      case 'not-started':
        return <Badge bg="secondary">Not Started</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  const getGradeBadge = (grade) => {
    if (!grade) return null;
    
    let color = 'secondary';
    if (grade.includes('A+') || grade.includes('A')) color = 'success';
    else if (grade.includes('B')) color = 'info';
    else if (grade.includes('C')) color = 'warning';
    else if (grade.includes('D') || grade.includes('F')) color = 'danger';
    
    return <Badge bg={color} className="ms-2">{grade}</Badge>;
  };

  const getCategoryBadge = (category) => {
    const colors = {
      'Web Development': 'primary',
      'Programming': 'info',
      'Backend': 'dark',
      'Design': 'warning',
      'Data Science': 'success',
      'DevOps': 'secondary',
      'Mobile': 'purple',
      'AI/ML': 'danger'
    };
    
    return <Badge bg={colors[category] || 'secondary'}>{category}</Badge>;
  };

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    inProgress: certificates.filter(c => c.status === 'in-progress').length,
    featured: certificates.filter(c => c.isFeatured).length,
    totalHours: certificates.filter(c => c.status === 'issued').reduce((sum, cert) => sum + cert.hoursCompleted, 0),
    avgGrade: certificates.filter(c => c.grade).length > 0 
      ? certificates.filter(c => c.grade).reduce((sum, cert) => {
          const gradeValue = cert.grade === 'A+' ? 4.3 : 
                           cert.grade === 'A' ? 4.0 :
                           cert.grade === 'A-' ? 3.7 :
                           cert.grade === 'B+' ? 3.3 :
                           cert.grade === 'B' ? 3.0 :
                           cert.grade === 'B-' ? 2.7 :
                           cert.grade === 'C+' ? 2.3 :
                           cert.grade === 'C' ? 2.0 : 0;
          return sum + gradeValue;
        }, 0) / certificates.filter(c => c.grade).length
      : 0
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading certificates...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Hero Section */}
      <Card className="bg-gradient border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Card.Body className="text-white p-5">
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-5 fw-bold mb-3">
                <FaAward className="me-3" />
                Your Certificates
              </h1>
              <p className="lead mb-4">
                Showcase your achievements and share your learning journey with the world.
                Download, print, or share your certificates on professional networks.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg">
                  <FaDownload className="me-2" />
                  Download All
                </Button>
                <Button variant="outline-light" size="lg">
                  <FaShare className="me-2" />
                  Share Profile
                </Button>
              </div>
            </Col>
            <Col lg={4} className="text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-3">
                <FaTrophy size={64} className="mb-3" />
                <h4>{stats.issued} Certificates Earned</h4>
                <p className="mb-0">{stats.totalHours} hours of learning</p>
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
              <FaAward className="text-primary mb-2" size={24} />
              <h3>{stats.issued}</h3>
              <p className="text-muted mb-0">Certificates Issued</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaClock className="text-warning mb-2" size={24} />
              <h3>{stats.inProgress}</h3>
              <p className="text-muted mb-0">In Progress</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaStar className="text-success mb-2" size={24} />
              <h3>{stats.avgGrade.toFixed(1)}</h3>
              <p className="text-muted mb-0">Average Grade</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaGraduationCap className="text-info mb-2" size={24} />
              <h3>{stats.totalHours}</h3>
              <p className="text-muted mb-0">Total Hours</p>
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
                  placeholder="Search certificates by title, category, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaFilter className="me-2" />
                  Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortBy('recent')}>Most Recent</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('title')}>Title A-Z</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('progress')}>Progress</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('grade')}>Grade</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Button variant="outline-primary" className="w-100">
                <FaFilter className="me-2" />
                Advanced Filters
              </Button>
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
        <Tab eventKey="all" title={`All (${stats.total})`} />
        <Tab eventKey="issued" title={`Issued (${stats.issued})`} />
        <Tab eventKey="in-progress" title={`In Progress (${stats.inProgress})`} />
        <Tab eventKey="featured" title="Featured" />
      </Tabs>

      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No certificates found</Alert.Heading>
          <p>
            {searchTerm
              ? 'Try adjusting your search criteria.'
              : activeTab === 'issued'
                ? "You haven't earned any certificates yet."
                : activeTab === 'in-progress'
                ? "You don't have any courses in progress."
                : 'No certificates match your filters.'}
          </p>
          <Button variant="primary" as={Link} to="/courses">
            Browse Courses
          </Button>
        </Alert>
      ) : (
        <Row className="g-4">
          {filteredCertificates.map((certificate) => (
            <Col key={certificate.id} xl={4} lg={6} md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      {getStatusBadge(certificate.status)}
                      {certificate.grade && getGradeBadge(certificate.grade)}
                      {certificate.isFeatured && (
                        <Badge bg="warning" className="ms-2">
                          <FaStar className="me-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div>
                      {getCategoryBadge(certificate.category)}
                    </div>
                  </div>

                  <Card.Title className="h4 mb-3">
                    {certificate.title}
                    {certificate.level && (
                      <span className="text-muted fs-6 ms-2">({certificate.level})</span>
                    )}
                  </Card.Title>
                  
                  <div className="mb-4">
                    {certificate.status === 'issued' ? (
                      <div className="text-success">
                        <FaCheckCircle className="me-2" />
                        <span>Completed on {new Date(certificate.issueDate).toLocaleDateString()}</span>
                      </div>
                    ) : certificate.status === 'in-progress' ? (
                      <div>
                        <div className="d-flex justify-content-between mb-1">
                          <span className="text-warning">
                            <FaClock className="me-2" />
                            In Progress
                          </span>
                          <span className="fw-bold">{certificate.progress}%</span>
                        </div>
                        <ProgressBar now={certificate.progress} variant="warning" />
                        <div className="text-end mt-1">
                          <small className="text-muted">
                            {certificate.hoursCompleted} of {Math.round(certificate.hoursCompleted / (certificate.progress / 100))} hours
                          </small>
                        </div>
                      </div>
                    ) : (
                      <div className="text-secondary">
                        <FaClock className="me-2" />
                        <span>Not Started</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">Skills Acquired:</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                          {skill}
                        </Badge>
                      ))}
                      {certificate.skills.length > 3 && (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip>
                              {certificate.skills.slice(3).join(', ')}
                            </Tooltip>
                          }
                        >
                          <Badge bg="light" text="dark" className="mb-1">
                            +{certificate.skills.length - 3} more
                          </Badge>
                        </OverlayTrigger>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="row small text-muted">
                      <div className="col-6">
                        <div className="d-flex align-items-center mb-2">
                          <FaBook className="me-2" />
                          <span>{certificate.hoursCompleted} hours</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <FaUsers className="me-2" />
                          <span>{certificate.instructor}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        {certificate.certificateNumber && (
                          <div className="d-flex align-items-center mb-2">
                            <FaCertificate className="me-2" />
                            <span>ID: {certificate.certificateNumber}</span>
                          </div>
                        )}
                        {certificate.lastAccessed && (
                          <div className="d-flex align-items-center">
                            <FaCalendar className="me-2" />
                            <span>Last: {new Date(certificate.lastAccessed).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                      {certificate.shareCount} shares • {certificate.downloads} downloads
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setSelectedCertificate(certificate);
                          setShowDetailsModal(true);
                        }}
                      >
                        <FaEye className="me-1" />
                        Details
                      </Button>
                      
                      {certificate.status === 'issued' ? (
                        <>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => handleDownloadPDF(certificate)}
                            disabled={downloading}
                          >
                            <FaDownload className="me-1" />
                            {downloading ? '...' : 'PDF'}
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => {
                              setSelectedCertificate(certificate);
                              setShowShareModal(true);
                            }}
                          >
                            <FaShare className="me-1" />
                            Share
                          </Button>
                        </>
                      ) : certificate.status === 'in-progress' ? (
                        <Button
                          variant="primary"
                          size="sm"
                          as={Link}
                          to={`/course/${certificate.courseId}`}
                        >
                          <FaPlayCircle className="me-1" />
                          Continue
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          as={Link}
                          to={`/course/${certificate.courseId}`}
                        >
                          Start Course
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

      {/* Certificate Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        {selectedCertificate && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCertificate.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={8}>
                  <div className="mb-4">
                    <h4>Certificate Details</h4>
                    <p className="text-muted">{selectedCertificate.description || 'No description available.'}</p>
                    
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <Card className="border">
                          <Card.Body>
                            <h6 className="text-muted mb-3">Certificate Information</h6>
                            <dl className="row mb-0">
                              <dt className="col-sm-5">Status:</dt>
                              <dd className="col-sm-7">{getStatusBadge(selectedCertificate.status)}</dd>
                              
                              <dt className="col-sm-5">Issue Date:</dt>
                              <dd className="col-sm-7">
                                {selectedCertificate.issueDate 
                                  ? new Date(selectedCertificate.issueDate).toLocaleDateString()
                                  : 'Not issued yet'}
                              </dd>
                              
                              <dt className="col-sm-5">Expiry Date:</dt>
                              <dd className="col-sm-7">
                                {selectedCertificate.expiryDate 
                                  ? new Date(selectedCertificate.expiryDate).toLocaleDateString()
                                  : 'No expiry'}
                              </dd>
                              
                              <dt className="col-sm-5">Certificate ID:</dt>
                              <dd className="col-sm-7">
                                <code>{selectedCertificate.certificateNumber || 'N/A'}</code>
                              </dd>
                              
                              <dt className="col-sm-5">Grade:</dt>
                              <dd className="col-sm-7">
                                {selectedCertificate.grade ? getGradeBadge(selectedCertificate.grade) : 'Not graded'}
                              </dd>
                            </dl>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-md-6">
                        <Card className="border">
                          <Card.Body>
                            <h6 className="text-muted mb-3">Course Information</h6>
                            <dl className="row mb-0">
                              <dt className="col-sm-5">Instructor:</dt>
                              <dd className="col-sm-7">{selectedCertificate.instructor}</dd>
                              
                              <dt className="col-sm-5">Institution:</dt>
                              <dd className="col-sm-7">{selectedCertificate.institution}</dd>
                              
                              <dt className="col-sm-5">Hours Completed:</dt>
                              <dd className="col-sm-7">{selectedCertificate.hoursCompleted} hours</dd>
                              
                              <dt className="col-sm-5">Category:</dt>
                              <dd className="col-sm-7">{getCategoryBadge(selectedCertificate.category)}</dd>
                              
                              <dt className="col-sm-5">Level:</dt>
                              <dd className="col-sm-7">{selectedCertificate.level}</dd>
                            </dl>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>

                    <h5 className="mb-3">Skills Acquired</h5>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {selectedCertificate.skills.map((skill, index) => (
                        <Badge key={index} bg="primary" className="py-2 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {selectedCertificate.verificationUrl && (
                      <Alert variant="info">
                        <FaExternalLinkAlt className="me-2" />
                        <strong>Verification URL:</strong>{' '}
                        <a 
                          href={selectedCertificate.verificationUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {selectedCertificate.verificationUrl}
                        </a>
                      </Alert>
                    )}
                  </div>
                </Col>
                <Col lg={4}>
                  <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
                    <Card.Body>
                      <h5 className="mb-3">Quick Actions</h5>
                      
                      <div className="d-grid gap-2 mb-4">
                        {selectedCertificate.status === 'issued' ? (
                          <>
                            <Button 
                              variant="primary" 
                              onClick={() => handleDownloadPDF(selectedCertificate)}
                              disabled={downloading}
                            >
                              <FaDownload className="me-2" />
                              {downloading ? 'Downloading...' : 'Download PDF'}
                            </Button>
                            <Button 
                              variant="outline-primary"
                              onClick={() => {
                                setShowDetailsModal(false);
                                setShowShareModal(true);
                              }}
                            >
                              <FaShare className="me-2" />
                              Share Certificate
                            </Button>
                            <Button variant="outline-secondary">
                              <FaPrint className="me-2" />
                              Print Certificate
                            </Button>
                          </>
                        ) : selectedCertificate.status === 'in-progress' ? (
                          <Button 
                            variant="primary" 
                            as={Link} 
                            to={`/course/${selectedCertificate.courseId}`}
                          >
                            <FaPlayCircle className="me-2" />
                            Continue Learning
                          </Button>
                        ) : (
                          <Button 
                            variant="primary" 
                            as={Link} 
                            to={`/course/${selectedCertificate.courseId}`}
                          >
                            Start Course
                          </Button>
                        )}
                      </div>

                      <h6 className="mb-3">Share Statistics</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Downloads:</span>
                        <span className="fw-bold">{selectedCertificate.downloads}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Shares:</span>
                        <span className="fw-bold">{selectedCertificate.shareCount}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Last Accessed:</span>
                        <span className="fw-bold">
                          {selectedCertificate.lastAccessed 
                            ? new Date(selectedCertificate.lastAccessed).toLocaleDateString()
                            : 'Never'}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* Share Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
        {selectedCertificate && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Share Certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center mb-4">
                <FaAward size={48} className="text-primary mb-3" />
                <h4>{selectedCertificate.title}</h4>
                <p className="text-muted">
                  Share your achievement on social media or professional networks.
                </p>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <Button 
                    variant="outline-primary" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => handleShare(selectedCertificate, 'linkedin')}
                  >
                    <FaLinkedin size={24} className="mb-2" />
                    <span>LinkedIn</span>
                  </Button>
                </div>
                <div className="col-6">
                  <Button 
                    variant="outline-info" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => handleShare(selectedCertificate, 'twitter')}
                  >
                    <FaShare size={24} className="mb-2" />
                    <span>Twitter</span>
                  </Button>
                </div>
                <div className="col-6">
                  <Button 
                    variant="outline-primary" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => handleShare(selectedCertificate, 'facebook')}
                  >
                    <FaShare size={24} className="mb-2" />
                    <span>Facebook</span>
                  </Button>
                </div>
                <div className="col-6">
                  <Button 
                    variant="outline-secondary" 
                    className="w-100 h-100 p-3 d-flex flex-column align-items-center"
                    onClick={() => handleShare(selectedCertificate, 'copy')}
                  >
                    <FaEnvelope size={24} className="mb-2" />
                    <span>Copy Link</span>
                  </Button>
                </div>
              </div>

              {selectedCertificate.verificationUrl && (
                <div className="mb-3">
                  <Form.Label>Verification Link</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={selectedCertificate.verificationUrl}
                      readOnly
                    />
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedCertificate.verificationUrl);
                        alert('Link copied to clipboard!');
                      }}
                    >
                      Copy
                    </Button>
                  </InputGroup>
                </div>
              )}

              <Alert variant="info">
                <FaStar className="me-2" />
                Sharing your certificates can help showcase your skills to employers and peers.
              </Alert>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* Call to Action */}
      <Card className="bg-light border-0 shadow-sm mt-5">
        <Card.Body className="text-center p-5">
          <FaTrophy size={64} className="text-warning mb-4" />
          <h2 className="mb-3">Build Your Portfolio</h2>
          <p className="lead mb-4">
            Complete more courses to earn additional certificates and build an impressive portfolio.
          </p>
          <Button variant="primary" size="lg" className="me-3" as={Link} to="/courses">
            Browse Courses
          </Button>
          <Button variant="outline-primary" size="lg" as={Link} to="/learning-path">
            View Learning Paths
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Certificates;
