import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Alert, ProgressBar, Badge } from 'react-bootstrap';

const AssignmentPage = () => {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [grade, setGrade] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock assignment data
  useEffect(() => {
    const mockAssignment = {
      id: assignmentId || '1',
      title: 'React Hooks Implementation',
      description: 'Create a custom React hook for form validation and implement it in a sample form component.',
      instructions: `
1. Create a custom hook called useFormValidation that handles form state and validation
2. Implement validation rules for email, password, and confirm password fields
3. Create a SignUpForm component that uses your custom hook
4. Add proper error messages and form submission handling
5. Include unit tests for your hook using Jest and React Testing Library
      `,
      dueDate: '2024-12-30T23:59:59',
      points: 100,
      weight: '15% of final grade',
      status: 'pending',
      submissionType: 'text_and_file',
      allowedExtensions: ['.js', '.jsx', '.txt', '.pdf', '.zip'],
      maxFileSize: 10 // MB
    };
    
    setAssignment(mockAssignment);
    setDueDate(mockAssignment.dueDate);
    setIsSubmitted(mockAssignment.status === 'submitted');
    
    // Mock grade if submitted
    if (mockAssignment.status === 'submitted') {
      setGrade({
        score: 85,
        maxScore: 100,
        feedback: 'Great work! The custom hook is well-structured. Consider adding more edge cases in validation.',
        gradedBy: 'Dr. Sarah Johnson',
        gradedAt: '2024-12-15T14:30:00'
      });
    }
  }, [assignmentId]);

  // Calculate time left
  useEffect(() => {
    if (dueDate) {
      const updateTimeLeft = () => {
        const now = new Date();
        const due = new Date(dueDate);
        const diff = due - now;
        
        if (diff <= 0) {
          setTimeLeft('Overdue');
          return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      };
      
      updateTimeLeft();
      const interval = setInterval(updateTimeLeft, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [dueDate]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In real app, upload to server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submission:', {
        assignmentId,
        courseId,
        text: submission,
        files: files.map(f => f.name)
      });
      
      setIsSubmitted(true);
      setGrade(null); // Reset grade since new submission
      alert('Assignment submitted successfully!');
      
    } catch (error) {
      alert('Error submitting assignment: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Mock template download
    alert('Downloading assignment template...');
  };

  if (!assignment) {
    return <div className="container mt-4">Loading assignment...</div>;
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/course/${courseId}`}>Course</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/course/${courseId}/assignments`}>Assignments</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {assignment.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0">{assignment.title}</h3>
              <Badge bg={timeLeft === 'Overdue' ? 'danger' : 'warning'}>
                Due: {new Date(dueDate).toLocaleDateString()}
              </Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h5>Description</h5>
                <p className="text-muted">{assignment.description}</p>
              </div>

              <div className="mb-4">
                <h5>Instructions</h5>
                <pre className="bg-light p-3 rounded" style={{ whiteSpace: 'pre-wrap' }}>
                  {assignment.instructions}
                </pre>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <Card>
                    <Card.Body>
                      <h6 className="card-subtitle mb-2 text-muted">Assignment Details</h6>
                      <ul className="list-unstyled">
                        <li><strong>Points:</strong> {assignment.points}</li>
                        <li><strong>Weight:</strong> {assignment.weight}</li>
                        <li><strong>Type:</strong> {assignment.submissionType}</li>
                        <li><strong>Status:</strong> 
                          <Badge bg={isSubmitted ? 'success' : 'secondary'} className="ms-2">
                            {isSubmitted ? 'Submitted' : 'Not Submitted'}
                          </Badge>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card>
                    <Card.Body>
                      <h6 className="card-subtitle mb-2 text-muted">File Requirements</h6>
                      <ul className="list-unstyled">
                        <li><strong>Allowed:</strong> {assignment.allowedExtensions.join(', ')}</li>
                        <li><strong>Max Size:</strong> {assignment.maxFileSize}MB per file</li>
                        <li><strong>Time Left:</strong> {timeLeft}</li>
                      </ul>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={handleDownloadTemplate}
                      >
                        Download Template
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              {!isSubmitted ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <h5>Your Submission</h5>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      value={submission}
                      onChange={(e) => setSubmission(e.target.value)}
                      placeholder="Write your answer here. You can include code snippets, explanations, or any additional notes..."
                      required
                    />
                    <Form.Text className="text-muted">
                      Please provide a detailed explanation of your implementation.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Attach Files</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept={assignment.allowedExtensions.map(ext => ext.startsWith('.') ? ext : `.${ext}`).join(',')}
                    />
                    <Form.Text className="text-muted">
                      Maximum file size: {assignment.maxFileSize}MB per file
                    </Form.Text>
                    
                    {files.length > 0 && (
                      <div className="mt-2">
                        <h6>Selected Files:</h6>
                        <ul className="list-group">
                          {files.map((file, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              {file.name}
                              <Badge bg="info">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/course/${courseId}`)}
                    >
                      Back to Course
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                    </Button>
                  </div>
                </Form>
              ) : (
                <Alert variant="success">
                  <Alert.Heading>Assignment Submitted!</Alert.Heading>
                  <p>
                    Your assignment has been submitted successfully on {new Date().toLocaleDateString()}.
                    {grade ? ' Your work has been graded.' : ' Waiting for instructor review.'}
                  </p>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {grade && (
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">Grading Results</h4>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-4">
                  <h2>{grade.score}/{grade.maxScore}</h2>
                  <ProgressBar 
                    now={(grade.score / grade.maxScore) * 100} 
                    label={`${grade.score}%`}
                    variant="success"
                    className="mb-3"
                  />
                </div>
                
                <div className="mb-3">
                  <h5>Feedback from Instructor</h5>
                  <Card>
                    <Card.Body>
                      <p>{grade.feedback}</p>
                      <div className="text-end text-muted">
                        <small>Graded by: {grade.gradedBy}</small>
                        <br />
                        <small>{new Date(grade.gradedAt).toLocaleString()}</small>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                
                <Button variant="outline-success" onClick={() => alert('Resubmission feature coming soon!')}>
                  Request Regrade
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>

        <div className="col-lg-4">
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Submission Tips</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2">✅ Test your code before submitting</li>
                <li className="mb-2">✅ Include comments explaining your approach</li>
                <li className="mb-2">✅ Follow the required file naming convention</li>
                <li className="mb-2">✅ Check for any plagiarism issues</li>
                <li className="mb-2">✅ Submit before the deadline to avoid penalties</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Need Help?</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button variant="outline-primary">
                  <i className="bi bi-question-circle me-2"></i>
                  Ask Instructor
                </Button>
                <Button variant="outline-secondary">
                  <i className="bi bi-people me-2"></i>
                  Discussion Forum
                </Button>
                <Button variant="outline-info">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  View Sample Solution
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
