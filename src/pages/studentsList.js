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

function StudentsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/student")
      .then((response) => {
        setStudents(response.data);
      })
      .catch(() => {
        toast.error("Error: Something went wrong when fetching student data.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  const handleDelete = (studentName) => {
    // Send a DELETE request to remove the student from the system
    const data = {
      student_name: studentName,
    };
    axios
      .delete("http://127.0.0.1:5000/api/student", {
        data: data,
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        // Remove the deleted student from the state
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student[1] !== studentName)
        );
      })
      .catch((error) => {
        toast.error("Error: Something went wrong when deleting the student.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Students List Page
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name & Family Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student[0]}>
                <TableCell>{student[1]}</TableCell>
                <TableCell>
                  {student[2].split(" ").slice(1, 4).join(" ")}
                </TableCell>
                <TableCell>{student[3]}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(student[1])}
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

export default StudentsList;
