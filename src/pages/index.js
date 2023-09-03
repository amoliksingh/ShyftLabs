import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteAllData = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(
        "http://127.0.0.1:5000/api/everything"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/student");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/course");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResultData = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/result");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Student Result Management System
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchStudentData}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Fetch Student Data"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchCourseData}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Fetch Course Data"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchResultData}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Fetch Result Data"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteAllData}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Delete All Data"}
            </Button>
          </Grid>
        </Grid>
        {data && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Fetched Data
            </Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
