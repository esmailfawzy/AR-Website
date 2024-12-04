import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';


const ArticleList = ({ articles }) => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>
      Latest Articles
    </Typography>
    <Grid container spacing={3}>
      {articles.map((article) => (
        <Grid item xs={12} md={4} key={article.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.body.substring(0, 100)}...
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to={`/article/${article.id}`}
                size="small"
                color="primary"
              >
                Read More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) return <Typography>Article not found</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Box sx={{
        width: '100%',
        height: '400px',
        mb: 2,
        border: '1px solid lightgrey',
        borderRadius: 2
      }}>
        <model-viewer
          src="/models/uploads-files-5365200-information_paper_-_laboratory__pbr__free.glb"
          ios-src="/models/pancakes.usdz"
          alt="3D model"
          ar
          camera-controls
          autoplay
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
      <Typography variant="body1">
        {article.body}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Back to Articles
      </Button>
    </Container>
  );
};


const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <Container><CircularProgress /></Container>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticleList articles={articles} />} />
        <Route path="/article/:id" element={<ArticleDetail articles={articles} />} />
      </Routes>
    </Router>
  );
};

export default App;