import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Badge, Alert } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificatePage = () => {
  const { courseId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      const mockCertificate = {
        id: 'CERT-' + Date.now(),
        courseId: courseId,
        courseTitle: 'Advanced React Development',
        studentName: 'John Doe',
        completionDate: '2024-12-15',
        grade: 'A+',
        instructor: 'Dr. Sarah Johnson',
        certificateNumber: 'CERT-2024-REACT-001',
        issuedDate: '2024-12-16',
        expiryDate: null, // Lifetime access
        verificationUrl: 'https://verify.tutorialsite.com/cert/' + 'CERT-2024-REACT-001',
        skills: ['React Hooks', 'Context API', 'Performance Optimization', 'Testing'],
        hoursCompleted: 48,
        achievements: ['Top 10% of class', 'Perfect attendance', 'All assignments completed']
      };
      setCertificate(mockCertificate);
      setLoading(false);
    }, 1000);
  }, [courseId]);

  const handleDownloadPDF = () => {
    setDownloading(true);
    const certificateElement = document.getElementById('certificate-preview');
    
    html2canvas(certificateElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`certificate-${certificate.certificateNumber}.pdf`);
      setDownloading(false);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      setDownloading(false);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate: ${certificate.courseTitle}`,
        text: `I completed ${certificate.courseTitle} with grade ${certificate.grade}!`,
        url: certificate.verificationUrl,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(certificate.verificationUrl);
      alert('Certificate link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading certificate...</span>
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
            Certificate
          </li>
        </ol>
      </nav>

      <Alert variant="success" className="mb-4">
        <Alert.Heading>Congratulations! 🎉</Alert.Heading>
        <p>
          You have successfully completed the course. Your certificate is ready for download.
        </p>
      </Alert>

      <Row>
        <Col lg={8}>
          <div id="certificate-preview" className="certificate-preview mb-4">
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5 text-center">
                <div className="certificate-header mb-4">
                  <h1 className="display-4 fw-bold text-primary">CERTIFICATE OF COMPLETION</h1>
                  <p className="lead">This certifies that</p>
                </div>

                <div className="certificate-name mb-4">
                  <h2 className="display-3 fw-bold">{certificate.studentName}</h2>
                  <p className="fs-5">has successfully completed</p>
                </div>

                <div className="certificate-course mb-4">
                  <h3 className="display-6 fw-bold">{certificate.courseTitle}</h3>
                  <p className="fs-5">with a final grade of <Badge bg="success" className="fs-4">{certificate.grade}</Badge></p>
                </div>

                <div className="certificate-details mb-5">
                  <Row className="text-center">
                    <Col md={4} className="mb-3">
                      <div className="p-3 bg-light rounded">
                        <h6 className="text-muted">Completion Date</h6>
                        <p className="fw-bold mb-0">
                          {new Date(certificate.completionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="p-3 bg-light rounded">
                        <h6 className="text-muted">Hours Completed</h6>
                        <p className="fw-bold mb-0">{certificate.hoursCompleted} hours</p>
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <div className="p-3 bg-light rounded">
                        <h6 className="text-muted">Instructor</h6>
                        <p className="fw-bold mb-0">{certificate.instructor}</p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="certificate-skills mb-5">
                  <h5 className="mb-3">Skills Acquired</h5>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    {certificate.skills.map((skill, index) => (
                      <Badge key={index} bg="primary" className="fs-6 py-2 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="certificate-footer mt-5 pt-4 border-top">
                  <Row className="align-items-center">
                    <Col md={4}>
                      <div className="text-center">
                        <div className="signature-placeholder mb-2" style={{ height: '60px', borderBottom: '2px solid #000' }}></div>
                        <p className="mb-0 fw-bold">{certificate.instructor}</p>
                        <p className="text-muted small">Instructor</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <div className="seal-placeholder mb-2">
                          <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '3px solid #0d6efd',
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <span className="fw-bold">✓</span>
                          </div>
                        </div>
                        <p className="fw-bold">Official Seal</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <p className="mb-1">
                          <small>Certificate ID:</small>
                        </p>
                        <p className="fw-bold">{certificate.certificateNumber}</p>
                        <p className="text-muted small">
                          Verify at: <a href={certificate.verificationUrl} className="text-decoration-none">
                            {certificate.verificationUrl}
                          </a>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="d-flex gap-3 mb-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleDownloadPDF}
              disabled={downloading}
            >
              {downloading ? 'Generating PDF...' : 'Download Certificate (PDF)'}
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={handleShare}
            >
              Share Certificate
            </Button>
            <Button 
              variant="outline-secondary" 
              size="lg"
              onClick={() => window.print()}
            >
              Print Certificate
            </Button>
          </div>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Certificate Details</h5>
            </Card.Header>
            <Card.Body>
              <dl className="row">
                <dt className="col-sm-5">Certificate ID:</dt>
                <dd className="col-sm-7">
                  <code>{certificate.certificateNumber}</code>
                </dd>

                <dt className="col-sm-5">Issue Date:</dt>
                <dd className="col-sm-7">
                  {new Date(certificate.issuedDate).toLocaleDateString()}
                </dd>

                <dt className="col-sm-5">Expiry Date:</dt>
                <dd className="col-sm-7">
                  {certificate.expiryDate 
                    ? new Date(certificate.expiryDate).toLocaleDateString()
                    : <Badge bg="success">Lifetime Validity</Badge>
                  }
                </dd>

                <dt className="col-sm-5">Verification URL:</dt>
                <dd className="col-sm-7">
                  <a 
                    href={certificate.verificationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    Click to verify
                  </a>
                </dd>

                <dt className="col-sm-5">Grade:</dt>
                <dd className="col-sm-7">
                  <Badge bg="success" className="fs-6">{certificate.grade}</Badge>
                </dd>
              </dl>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Achievements</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {certificate.achievements.map((achievement, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-trophy-fill text-warning me-2"></i>
                    {achievement}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Next Steps</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">
                  Add to LinkedIn Profile
                </Button>
                <Button variant="outline-secondary">
                  Explore Advanced Courses
                </Button>
                <Button variant="outline-success">
                  Request Physical Copy
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .certificate-preview {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          border-radius: 15px;
        }
        
        @media print {
          .certificate-preview {
            background: none !important;
            padding: 0 !important;
          }
          
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default CertificatePage;
