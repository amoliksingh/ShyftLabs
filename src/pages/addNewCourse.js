import React, { Component } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class AddNewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      notification: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    const { courseName } = this.state;

    if (!courseName) {
      this.setState({ notification: "Please fill in the course name." });
      return;
    }

    const data = { course_name: courseName };

    axios
      .post("http://127.0.0.1:5000/api/course", data)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        let errorMsg = "Error: Something went wrong when adding the student.";
        if (error.message === "Request failed with status code 409") {
          errorMsg = "Error: Course: " + courseName + " already exists.";
        }
        toast.error(errorMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    this.setState({
      notification: "",
      courseName: "",
    });
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Add New Course
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              fullWidth
              label="Course Name"
              name="courseName"
              value={this.state.courseName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
        {this.state.notification && (
          <div className="notification">{this.state.notification}</div>
        )}
        <ToastContainer />
      </Container>
    );
  }
}

export default AddNewCourse;
