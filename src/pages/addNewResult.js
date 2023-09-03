import React, { useState, useEffect } from "react";
import { Container, Typography, Select, MenuItem, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddNewResult() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedScore, setSelectedScore] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/course")
      .then((response) => {
        setCourses(response.data);
        axios
          .get("http://127.0.0.1:5000/api/student")
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => {
            toast.error(
              "Error: Something went wrong when fetching student data.",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
          });
      })
      .catch((error) => {
        toast.error("Error: Something went wrong when fetching course data.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    if (selectedCourse && selectedStudent && selectedScore) {
      const data = {
        course_name: selectedCourse,
        student_name: selectedStudent,
        score: selectedScore,
      };
      // Send a POST request to add the new result to the system
      axios
        .post("http://127.0.0.1:5000/api/result", data)
        .then((response) => {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          let errorMsg = "Error: Something went wrong when adding the result.";
          if (error.message === "Request failed with status code 409") {
            errorMsg =
              "Error: Result for Course: " +
              selectedCourse +
              ", Student: " +
              selectedStudent +
              " already exists.";
          }
          toast.error(errorMsg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      setNotification("");
      setSelectedCourse("");
      setSelectedStudent("");
      setSelectedScore("");
    } else {
      // Display an error message if any field is missing
      setNotification("Please select all fields");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Result
      </Typography>
      <form>
        <div>
          <label>Course name:</label>
          <Select
            fullWidth
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">
              <em>Select a course</em>
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course[0]} value={course[1]}>
                {course[1]}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <label>Student Name:</label>
          <Select
            fullWidth
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <MenuItem value="">
              <em>Select a student</em>
            </MenuItem>
            {students.map((student) => (
              <MenuItem key={student[0]} value={student[1]}>
                {student[1]}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <label>Score:</label>
          <Select
            fullWidth
            value={selectedScore}
            onChange={(e) => setSelectedScore(e.target.value)}
          >
            <MenuItem value="">
              <em>Select a score</em>
            </MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </form>
      {notification && <div>{notification}</div>}
      <ToastContainer />
    </Container>
  );
}

export default AddNewResult;
