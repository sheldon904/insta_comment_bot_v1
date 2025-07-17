import React, { useState, useEffect } from 'react';
import { PrimaryButton } from 'ui-components';
import { Container, Typography, Button, Card, CardContent, CardActions } from '@mui/material';

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [comments, setComments] = useState([]);

  const handleConnect = () => {
    window.location.href = '/auth/facebook';
  };

  useEffect(() => {
    // In a real app, you would fetch comments from the connected accounts
    // For now, we'll just add some dummy data
    if (accounts.length > 0) {
      setComments([
        { id: 1, text: 'This is a great post!' },
        { id: 2, text: 'I have a question about this.' },
      ]);
    }
  }, [accounts]);

  if (accounts.length === 0) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>Client Auto-Reply Tool</Typography>
        <Button variant="contained" color="primary" onClick={handleConnect} fullWidth>
          Connect to Facebook
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h2" gutterBottom>Comment Review Feed</Typography>
      {comments.map((comment) => (
        <Card key={comment.id} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="body1">{comment.text}</Typography>
          </CardContent>
          <CardActions>
            <PrimaryButton size="small">Post Reply</PrimaryButton>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default App;
