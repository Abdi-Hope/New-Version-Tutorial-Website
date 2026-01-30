// /src/pages/Achievements.jsx
import React from 'react';
import { Card, ListGroup, ProgressBar, Badge } from 'react-bootstrap';

const Achievements = () => {
  const achievements = [
    { id: 1, title: 'First Project', description: 'Complete your first React project', progress: 100, unlocked: true },
    { id: 2, title: 'Router Master', description: 'Implement React Router successfully', progress: 100, unlocked: true },
    { id: 3, title: 'State Pro', description: 'Use Redux or Context API', progress: 75, unlocked: false },
    { id: 4, title: 'API Expert', description: 'Integrate 3 different APIs', progress: 33, unlocked: false },
    { id: 5, title: 'UI Champion', description: 'Style 10 different components', progress: 80, unlocked: false },
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🎯 Achievements</h1>
      <p className="lead mb-4">Track your progress and unlock new achievements</p>
      
      <div className="row">
        <div className="col-md-8">
          <Card className="shadow-sm">
            <Card.Header>
              <h4 className="mb-0">Your Achievements</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {achievements.map((achievement) => (
                  <ListGroup.Item key={achievement.id} className="py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1">
                        <h5 className="mb-1">
                          {achievement.unlocked ? '🏆 ' : '🔒 '}
                          {achievement.title}
                          {achievement.unlocked && (
                            <Badge bg="success" className="ms-2">Unlocked</Badge>
                          )}
                        </h5>
                        <p className="text-muted mb-2">{achievement.description}</p>
                        <div className="mt-2">
                          <ProgressBar 
                            now={achievement.progress} 
                            label={`${achievement.progress}%`}
                            variant={achievement.progress === 100 ? "success" : "primary"}
                            className="mb-2"
                          />
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        
        <div className="col-md-4">
          <Card className="shadow-sm mb-4">
            <Card.Header>
              <h5 className="mb-0">Stats</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <h1 className="display-4">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </h1>
                <p className="text-muted">Achievements Unlocked</p>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Tips</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2">✅ Complete more components to unlock achievements</li>
                <li className="mb-2">✅ Integrate APIs to progress faster</li>
                <li className="mb-2">✅ Test your application thoroughly</li>
                <li className="mb-2">✅ Deploy your project to unlock special badges</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Achievements;
