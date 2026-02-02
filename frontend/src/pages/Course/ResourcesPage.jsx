import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Container, 
  Row, 
  Col, 
  ListGroup, 
  Form, 
  InputGroup,
  Badge,
  Alert,
  Dropdown,
  Pagination
} from 'react-bootstrap';

// Using Font Awesome icons instead since react-bootstrap-icons has different names
// Or use react-icons which is more commonly used
import { 
  FaSearch,
  FaDownload,
  FaBookOpen,
  FaFilePdf,
  FaVideo,
  FaCode,
  FaExternalLinkAlt,
  FaFilter,
  FaSortAmountUp,
  FaStar,
  FaEye,
  FaFilePowerpoint,
  FaBook
} from 'react-icons/fa';

const ResourcesPage = () => {
  const { courseId } = useParams();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [resourcesPerPage] = useState(8);
  const [selectedResource, setSelectedResource] = useState(null);
  const [downloadStats, setDownloadStats] = useState({});

  // Resource types with icons
  const resourceTypes = {
    pdf: { icon: <FaFilePdf className="text-danger" />, label: 'PDF', color: 'danger' },
    video: { icon: <FaVideo className="text-primary" />, label: 'Video', color: 'primary' },
    code: { icon: <FaCode className="text-success" />, label: 'Code', color: 'success' },
    link: { icon: <FaExternalLinkAlt className="text-info" />, label: 'External Link', color: 'info' },
    book: { icon: <FaBook className="text-warning" />, label: 'E-book', color: 'warning' },
    slides: { icon: <FaFilePowerpoint className="text-secondary" />, label: 'Slides', color: 'secondary' }
  };

  useEffect(() => {
    // Mock API call for resources
    setTimeout(() => {
      const mockResources = [
        {
          id: 1,
          title: 'React Hooks Cheat Sheet',
          description: 'Complete reference guide for all React hooks with examples',
          type: 'pdf',
          size: '2.4 MB',
          downloads: 1245,
          rating: 4.8,
          uploadDate: '2024-11-15',
          author: 'Sarah Johnson',
          tags: ['hooks', 'reference', 'cheatsheet'],
          url: '/resources/react-hooks-cheatsheet.pdf',
          previewUrl: '/preview/react-hooks-cheatsheet.pdf',
          isFeatured: true
        },
        {
          id: 2,
          title: 'Advanced React Patterns Tutorial',
          description: 'Video tutorial covering render props, HOCs, and compound components',
          type: 'video',
          size: '145 MB',
          downloads: 892,
          rating: 4.9,
          uploadDate: '2024-11-10',
          author: 'Mike Chen',
          tags: ['patterns', 'video', 'tutorial'],
          url: '/resources/advanced-patterns.mp4',
          duration: '45:22',
          isFeatured: true
        },
        {
          id: 3,
          title: 'Sample Project Source Code',
          description: 'Complete e-commerce React application with authentication',
          type: 'code',
          size: '15.2 MB',
          downloads: 1567,
          rating: 4.7,
          uploadDate: '2024-11-05',
          author: 'Alex Rivera',
          tags: ['project', 'source-code', 'github'],
          url: 'https://github.com/example/react-ecommerce',
          external: true
        },
        {
          id: 4,
          title: 'React Performance Optimization Guide',
          description: 'Comprehensive guide to optimizing React application performance',
          type: 'pdf',
          size: '3.1 MB',
          downloads: 987,
          rating: 4.6,
          uploadDate: '2024-10-28',
          author: 'Dr. Emily Watson',
          tags: ['performance', 'optimization', 'guide'],
          url: '/resources/performance-guide.pdf'
        },
        {
          id: 5,
          title: 'State Management Comparison',
          description: 'Comparison between Context API, Redux, and Zustand',
          type: 'slides',
          size: '5.7 MB',
          downloads: 743,
          rating: 4.5,
          uploadDate: '2024-10-20',
          author: 'Tom Wilson',
          tags: ['state-management', 'comparison', 'slides'],
          url: '/resources/state-management.pptx'
        },
        {
          id: 6,
          title: 'Testing React Components',
          description: 'Best practices for testing React components with Jest and RTL',
          type: 'book',
          size: '8.9 MB',
          downloads: 621,
          rating: 4.8,
          uploadDate: '2024-10-15',
          author: 'Lisa Park',
          tags: ['testing', 'jest', 'rtl'],
          url: '/resources/testing-guide.epub'
        },
        {
          id: 7,
          title: 'Official React Documentation',
          description: 'Link to official React documentation and API reference',
          type: 'link',
          size: 'N/A',
          downloads: 0,
          rating: 5.0,
          uploadDate: '2024-10-10',
          author: 'React Team',
          tags: ['documentation', 'official', 'reference'],
          url: 'https://reactjs.org/docs',
          external: true
        },
        {
          id: 8,
          title: 'CSS-in-JS Libraries Comparison',
          description: 'Detailed comparison of styled-components, emotion, and vanilla-extract',
          type: 'pdf',
          size: '1.8 MB',
          downloads: 532,
          rating: 4.4,
          uploadDate: '2024-10-05',
          author: 'David Kim',
          tags: ['styling', 'css-in-js', 'comparison'],
          url: '/resources/css-in-js.pdf'
        }
      ];

      setResources(mockResources);
      setFilteredResources(mockResources);
      setLoading(false);

      // Initialize download stats
      const stats = {};
      mockResources.forEach(resource => {
        stats[resource.id] = 0;
      });
      setDownloadStats(stats);
    }, 1000);
  }, [courseId]);

  useEffect(() => {
    let result = resources;

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(resource => resource.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term)) ||
        resource.author.toLowerCase().includes(term)
      );
    }

    // Sort results
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'popular':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredResources(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [resources, filterType, searchTerm, sortBy]);

  // Get current resources for pagination
  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  const handleDownload = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      // Update download stats
      setDownloadStats(prev => ({
        ...prev,
        [resourceId]: (prev[resourceId] || 0) + 1
      }));

      if (resource.external) {
        window.open(resource.url, '_blank');
      } else {
        // Mock download
        alert(`Downloading: ${resource.title}`);
        // In real app: window.location.href = resource.url;
      }
    }
  };

  const handlePreview = (resource) => {
    setSelectedResource(resource);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading resources...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/course/${courseId}`}>Course</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Resources
          </li>
        </ol>
      </nav>

      <Alert variant="info" className="mb-4">
        <Alert.Heading>Course Resources Library</Alert.Heading>
        <p>
          Access all course materials, supplementary content, and reference guides. 
          Download resources for offline learning or bookmark important materials.
        </p>
      </Alert>

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
                  placeholder="Search resources by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaFilter className="me-2" />
                  Filter: {filterType === 'all' ? 'All Types' : resourceTypes[filterType]?.label}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterType('all')}>All Types</Dropdown.Item>
                  <Dropdown.Divider />
                  {Object.entries(resourceTypes).map(([type, info]) => (
                    <Dropdown.Item key={type} onClick={() => setFilterType(type)}>
                      <span className="me-2">{info.icon}</span>
                      {info.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaSortAmountUp className="me-2" />
                  Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortBy('recent')}>Most Recent</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('popular')}>Most Popular</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('rating')}>Highest Rated</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy('title')}>Title A-Z</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={3} sm={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h2 className="text-primary">{resources.length}</h2>
              <p className="text-muted mb-0">Total Resources</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h2 className="text-success">
                {Object.values(downloadStats).reduce((a, b) => a + b, 0)}
              </h2>
              <p className="text-muted mb-0">Your Downloads</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h2 className="text-warning">
                {resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
              </h2>
              <p className="text-muted mb-0">Total Downloads</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h2 className="text-danger">
                {(resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)}
              </h2>
              <p className="text-muted mb-0">Average Rating</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Resources Grid */}
      {currentResources.length === 0 ? (
        <Alert variant="warning" className="text-center">
          <Alert.Heading>No resources found</Alert.Heading>
          <p>Try adjusting your search or filter criteria.</p>
        </Alert>
      ) : (
        <>
          <Row className="g-4 mb-4">
            {currentResources.map((resource) => {
              const typeInfo = resourceTypes[resource.type];
              return (
                <Col key={resource.id} lg={6} xl={3}>
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-3 me-2">
                            {typeInfo.icon}
                          </div>
                          <div>
                            <Badge bg={typeInfo.color} className="mb-1">
                              {typeInfo.label}
                            </Badge>
                            {resource.isFeatured && (
                              <Badge bg="warning" className="ms-1">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="small text-muted">
                            {new Date(resource.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <Card.Title className="h5 mb-3">{resource.title}</Card.Title>
                      <Card.Text className="text-muted small mb-3">
                        {resource.description}
                      </Card.Text>

                      <div className="mb-3">
                        {resource.tags.map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                        <div>
                          <FaStar className="text-warning me-1" size={12} />
                          {resource.rating}
                          <span className="ms-2">
                            <FaDownload className="me-1" size={12} />
                            {resource.downloads.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          {resource.size}
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleDownload(resource.id)}
                        >
                          <FaDownload className="me-2" />
                          Download
                          {downloadStats[resource.id] > 0 && (
                            <Badge bg="light" text="dark" className="ms-2">
                              {downloadStats[resource.id]}
                            </Badge>
                          )}
                        </Button>
                        {resource.previewUrl && (
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handlePreview(resource)}
                          >
                            <FaEye className="me-2" />
                            Preview
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-top-0">
                      <small className="text-muted">
                        By {resource.author}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First 
                  onClick={() => handlePageChange(1)} 
                  disabled={currentPage === 1}
                />
                <Pagination.Prev 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  disabled={currentPage === 1}
                />
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show limited pages around current page
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <Pagination.Ellipsis key={pageNumber} disabled />;
                  }
                  return null;
                })}
                
                <Pagination.Next 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last 
                  onClick={() => handlePageChange(totalPages)} 
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Resource Preview Modal */}
      {selectedResource && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedResource.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setSelectedResource(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <div className="fs-1 mb-3">
                    {resourceTypes[selectedResource.type].icon}
                  </div>
                  <p>{selectedResource.description}</p>
                  <Alert variant="info">
                    This is a preview. Download the resource for full access.
                  </Alert>
                </div>
              </div>
              <div className="modal-footer">
                <Button 
                  variant="secondary" 
                  onClick={() => setSelectedResource(null)}
                >
                  Close
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => {
                    handleDownload(selectedResource.id);
                    setSelectedResource(null);
                  }}
                >
                  Download Full Resource
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ResourcesPage;
