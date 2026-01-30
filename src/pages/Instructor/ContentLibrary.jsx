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
  InputGroup,
  Dropdown,
  Modal,
  Alert,
  ProgressBar,
  Pagination
} from 'react-bootstrap';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaDownload,
  FaUpload,
  FaFolder,
  FaFile,
  FaFilePdf,
  FaFileVideo,
  FaFileImage,
  FaFileAudio,
  FaFileArchive,
  FaLink,
  FaFilter,
  FaSort,
  FaFolderPlus,
  FaCopy,
  FaShare
} from 'react-icons/fa';

const ContentLibrary = () => {
  const [contentItems, setContentItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentFolder, setCurrentFolder] = useState('root');
  const [folderPath, setFolderPath] = useState(['root']);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const contentTypes = {
    pdf: { icon: <FaFilePdf className="text-danger" />, label: 'PDF', color: 'danger' },
    video: { icon: <FaFileVideo className="text-primary" />, label: 'Video', color: 'primary' },
    image: { icon: <FaFileImage className="text-success" />, label: 'Image', color: 'success' },
    audio: { icon: <FaFileAudio className="text-warning" />, label: 'Audio', color: 'warning' },
    archive: { icon: <FaFileArchive className="text-secondary" />, label: 'Archive', color: 'secondary' },
    link: { icon: <FaLink className="text-info" />, label: 'Link', color: 'info' },
    folder: { icon: <FaFolder className="text-muted" />, label: 'Folder', color: 'muted' }
  };

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      const mockContent = [
        {
          id: 1,
          name: 'React Hooks Cheat Sheet',
          type: 'pdf',
          size: '2.4 MB',
          uploaded: '2024-12-15',
          folder: 'root',
          course: 'Advanced React',
          downloads: 1245,
          status: 'published',
          tags: ['hooks', 'reference', 'cheatsheet']
        },
        {
          id: 2,
          name: 'Advanced Patterns Tutorial',
          type: 'video',
          size: '145 MB',
          uploaded: '2024-12-10',
          folder: 'root',
          course: 'Advanced React',
          downloads: 892,
          status: 'published',
          tags: ['patterns', 'video', 'tutorial']
        },
        {
          id: 3,
          name: 'Sample Project Source Code',
          type: 'archive',
          size: '15.2 MB',
          uploaded: '2024-12-05',
          folder: 'root',
          course: 'Advanced React',
          downloads: 1567,
          status: 'published',
          tags: ['project', 'source-code']
        },
        {
          id: 4,
          name: 'Performance Optimization Guide',
          type: 'pdf',
          size: '3.1 MB',
          uploaded: '2024-11-28',
          folder: 'root',
          course: 'Advanced React',
          downloads: 987,
          status: 'published',
          tags: ['performance', 'optimization']
        },
        {
          id: 5,
          name: 'Course Slides - Module 1',
          type: 'pdf',
          size: '5.7 MB',
          uploaded: '2024-11-20',
          folder: 'Slides',
          course: 'JavaScript Fundamentals',
          downloads: 743,
          status: 'published',
          tags: ['slides', 'module-1']
        },
        {
          id: 6,
          name: 'Official React Docs',
          type: 'link',
          size: 'N/A',
          uploaded: '2024-11-15',
          folder: 'References',
          course: 'Advanced React',
          downloads: 0,
          status: 'published',
          tags: ['documentation', 'official']
        },
        {
          id: 7,
          name: 'Course Thumbnails',
          type: 'folder',
          size: '48 items',
          uploaded: '2024-11-10',
          folder: 'root',
          course: 'All Courses',
          downloads: 0,
          status: 'published',
          tags: ['images', 'thumbnails']
        },
        {
          id: 8,
          name: 'Lecture Recordings',
          type: 'folder',
          size: '24 items',
          uploaded: '2024-11-05',
          folder: 'root',
          course: 'All Courses',
          downloads: 0,
          status: 'published',
          tags: ['recordings', 'lectures']
        },
        {
          id: 9,
          name: 'Assignment Templates',
          type: 'folder',
          size: '12 items',
          uploaded: '2024-10-30',
          folder: 'Templates',
          course: 'All Courses',
          downloads: 0,
          status: 'published',
          tags: ['templates', 'assignments']
        },
        {
          id: 10,
          name: 'Course Certificate Design',
          type: 'image',
          size: '8.9 MB',
          uploaded: '2024-10-25',
          folder: 'Design Assets',
          course: 'All Courses',
          downloads: 621,
          status: 'published',
          tags: ['certificate', 'design']
        },
        {
          id: 11,
          name: 'Audio Lecture - Introduction',
          type: 'audio',
          size: '45.2 MB',
          uploaded: '2024-10-20',
          folder: 'Audio Lectures',
          course: 'UI/UX Design',
          downloads: 432,
          status: 'draft',
          tags: ['audio', 'lecture']
        },
        {
          id: 12,
          name: 'Project Wireframes',
          type: 'pdf',
          size: '1.8 MB',
          uploaded: '2024-10-15',
          folder: 'Design Assets',
          course: 'UI/UX Design',
          downloads: 532,
          status: 'published',
          tags: ['wireframes', 'design']
        }
      ];

      setContentItems(mockContent);
      setFilteredItems(mockContent.filter(item => item.folder === currentFolder));
      setLoading(false);
    }, 1000);
  }, [currentFolder]);

  useEffect(() => {
    let result = contentItems.filter(item => item.folder === currentFolder);

    // Filter by type
    if (typeFilter !== 'all') {
      result = result.filter(item => item.type === typeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.course.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredItems(result);
    setCurrentPage(1);
  }, [contentItems, currentFolder, typeFilter, searchTerm]);

  const handleDelete = (itemId) => {
    setContentItems(contentItems.filter(item => item.id !== itemId));
    setShowDeleteModal(false);
  };

  const handleUpload = (files) => {
    // Mock upload functionality
    console.log('Uploading files:', files);
    setShowUploadModal(false);
    alert('Files uploaded successfully!');
  };

  const handleFolderClick = (folderName) => {
    setCurrentFolder(folderName);
    setFolderPath([...folderPath, folderName]);
  };

  const handleNavigateBack = (index) => {
    setCurrentFolder(folderPath[index]);
    setFolderPath(folderPath.slice(0, index + 1));
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading content library...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-1">Content Library</h1>
          <p className="text-muted mb-0">Manage all your course materials, files, and resources</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={() => setShowUploadModal(true)}>
            <FaUpload className="me-2" />
            Upload Files
          </Button>
          <Button variant="primary">
            <FaFolderPlus className="me-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              {folderPath.map((folder, index) => (
                <li key={index} className={`breadcrumb-item ${index === folderPath.length - 1 ? 'active' : ''}`}>
                  {index === folderPath.length - 1 ? (
                    <span>{folder === 'root' ? 'Home' : folder}</span>
                  ) : (
                    <Button variant="link" className="p-0" onClick={() => handleNavigateBack(index)}>
                      {folder === 'root' ? 'Home' : folder}
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Card.Body>
      </Card>

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
                  placeholder="Search files by name, course, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <FaFilter className="me-2" />
                  Type: {typeFilter === 'all' ? 'All Types' : contentTypes[typeFilter]?.label}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setTypeFilter('all')}>All Types</Dropdown.Item>
                  <Dropdown.Divider />
                  {Object.entries(contentTypes).map(([type, info]) => (
                    <Dropdown.Item key={type} onClick={() => setTypeFilter(type)}>
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
                  <FaSort className="me-2" />
                  Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Name A-Z</Dropdown.Item>
                  <Dropdown.Item>Date Added</Dropdown.Item>
                  <Dropdown.Item>File Size</Dropdown.Item>
                  <Dropdown.Item>Downloads</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats Summary */}
      <Row className="g-4 mb-4">
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaFile className="text-primary mb-2" size={24} />
              <h3>{contentItems.length}</h3>
              <p className="text-muted mb-0">Total Files</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaFolder className="text-success mb-2" size={24} />
              <h3>{new Set(contentItems.map(item => item.folder)).size}</h3>
              <p className="text-muted mb-0">Folders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaDownload className="text-warning mb-2" size={24} />
              <h3>{contentItems.reduce((sum, item) => sum + (item.downloads || 0), 0).toLocaleString()}</h3>
              <p className="text-muted mb-0">Total Downloads</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={6}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <FaFilePdf className="text-danger mb-2" size={24} />
              <h3>{contentItems.filter(item => item.type === 'pdf').length}</h3>
              <p className="text-muted mb-0">PDF Files</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content Grid/List */}
      {currentItems.length === 0 ? (
        <Alert variant="info" className="text-center">
          <Alert.Heading>No content found</Alert.Heading>
          <p>
            {searchTerm || typeFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'This folder is empty. Upload some files or create a new folder.'}
          </p>
          <Button variant="primary" onClick={() => setShowUploadModal(true)}>
            <FaUpload className="me-2" />
            Upload Your First File
          </Button>
        </Alert>
      ) : (
        <>
          <Row className="g-4 mb-4">
            {currentItems.map((item) => {
              const typeInfo = contentTypes[item.type];
              return (
                <Col key={item.id} xl={3} lg={4} md={6}>
                  <Card className="shadow-sm h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="d-flex align-items-center">
                          <div className="fs-3 me-2">
                            {typeInfo.icon}
                          </div>
                          <div>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm" className="p-1">
                            ⋮
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <FaEye className="me-2" />
                              Preview
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaDownload className="me-2" />
                              Download
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaEdit className="me-2" />
                              Edit Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaCopy className="me-2" />
                              Duplicate
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <FaShare className="me-2" />
                              Share
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              className="text-danger"
                              onClick={() => {
                                setItemToDelete(item.id);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrash className="me-2" />
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      {item.type === 'folder' ? (
                        <Button 
                          variant="link" 
                          className="p-0 text-start w-100"
                          onClick={() => handleFolderClick(item.name)}
                        >
                          <Card.Title className="h5 mb-3">{item.name}</Card.Title>
                        </Button>
                      ) : (
                        <Card.Title className="h5 mb-3">{item.name}</Card.Title>
                      )}

                      <Card.Text className="text-muted small mb-3">
                        <div className="mb-1">
                          <strong>Course:</strong> {item.course}
                        </div>
                        <div className="mb-1">
                          <strong>Size:</strong> {item.size}
                        </div>
                        <div>
                          <strong>Uploaded:</strong> {new Date(item.uploaded).toLocaleDateString()}
                        </div>
                      </Card.Text>

                      <div className="mb-3">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {item.type !== 'folder' && item.type !== 'link' && (
                        <div className="d-flex justify-content-between align-items-center text-muted small">
                          <div>
                            <FaDownload className="me-1" />
                            {item.downloads} downloads
                          </div>
                          <div>
                            <Button size="sm" variant="outline-primary">
                              <FaDownload className="me-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
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

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="info">
            <strong>Supported formats:</strong> PDF, MP4, MP3, JPG, PNG, ZIP, PPTX, DOCX
            <br />
            <strong>Max file size:</strong> 100MB per file
          </Alert>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FaUpload className="text-muted mb-3" size={48} />
            <h5>Drag and drop files here</h5>
            <p className="text-muted mb-4">or click to browse files</p>
            <Form.Group>
              <Form.Control type="file" multiple />
            </Form.Group>
          </div>
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Folder</Form.Label>
              <Form.Select>
                <option value="root">Home</option>
                <option value="Slides">Slides</option>
                <option value="References">References</option>
                <option value="Templates">Templates</option>
                <option value="Design Assets">Design Assets</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select>
                <option value="All Courses">All Courses</option>
                <option value="Advanced React">Advanced React</option>
                <option value="JavaScript Fundamentals">JavaScript Fundamentals</option>
                <option value="Node.js Masterclass">Node.js Masterclass</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleUpload([])}>
            Upload Files
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <strong>Warning:</strong> This action cannot be undone. The file will be permanently deleted.
          </Alert>
          <p>Are you sure you want to delete this file?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(itemToDelete)}>
            Delete File
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContentLibrary;
