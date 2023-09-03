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
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/course")
      .then((response) => {
        setCourses(response.data);
      })
      .catch(() => {
        toast.error("Error: Something went wrong when fetching student data.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  const handleDelete = (courseName) => {
    // Send a DELETE request to remove the course from the system
    const data = {
      course_name: courseName,
    };
    axios
      .delete("http://127.0.0.1:5000/api/course", {
        data: data,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        // Remove the deleted course from the state
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course[1] !== courseName)
        );
      })
      .catch((error) => {
        toast.error("Error: Something went wrong when deleting the course.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Courses List Page
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course[0]}>
                <TableCell>{course[1]}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(course[1])}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CoursesList;
