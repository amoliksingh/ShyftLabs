import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ResultsList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/result")
      .then((response) => {
        setResults(response.data);
      })
      .catch(() => {
        toast.error("Error: Something went wrong when fetching student data.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Results List Page
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result[0]}>
                <TableCell>{result[1]}</TableCell>
                <TableCell>{result[2]}</TableCell>
                <TableCell>{result[3]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ResultsList;
