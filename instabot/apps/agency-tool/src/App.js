import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import { PrimaryButton } from 'ui-components';
import { WordPressClient } from 'shared-api-clients';
import { generateComment } from 'shared-llm-service';
import { extractArticle } from './ArticleExtractor';
import { Container, TextField, Button, Typography, Card, CardContent, CardActions } from '@mui/material';

const App = () => {
  const [client, setClient] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [baseUrl, setBaseUrl] = useState('');
  const [token, setToken] = useState('');

  const handleOnboard = (e) => {
    e.preventDefault();
    setClient(new WordPressClient(baseUrl, token));
  };

  const fetchMoreData = async () => {
    if (!client) return;

    try {
      const newPosts = await client.getPosts();
      if (newPosts.length === 0) {
        setHasMore(false);
        return;
      }
      setPosts(posts.concat(newPosts));
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    }
  };

  const handleExtractArticle = async (url) => {
    try {
      const content = await extractArticle(url);
      console.log("Extracted Content:", content);
    } catch (error) {
      console.error("Error extracting article:", error);
    }
  };

  useEffect(() => {
    if (client) {
      fetchMoreData();
    }
  }, [client]);

  if (!client) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>Onboard Client</Typography>
        <form onSubmit={handleOnboard}>
          <TextField
            label="WordPress URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            required
          />
          <TextField
            label="API Token"
            variant="outlined"
            fullWidth
            margin="normal"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <PrimaryButton type="submit" fullWidth style={{ marginTop: '1rem' }}>Connect</PrimaryButton>
        </form>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" component="h2" gutterBottom>Agency Commenting Tool Feed</Typography>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '1rem' }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {post.title.rendered}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.link}
                </Typography>
              </CardContent>
              <CardActions>
                <PrimaryButton size="small" onClick={() => handleExtractArticle(post.link)}>Extract Article</PrimaryButton>
                <PrimaryButton size="small">Approve</PrimaryButton>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default App;
