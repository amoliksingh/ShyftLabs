import React, { Component } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class AddNewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      familyName: "",
      dateOfBirth: "",
      email: "",
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
    const { firstName, familyName, dateOfBirth, email } = this.state;

    if (!firstName || !familyName || !dateOfBirth || !email) {
      this.setState({ notification: "Please fill in all fields." });
      return;
    }

    // Name validation (letters only)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(familyName)) {
      this.setState({
        notification: "First name and family name should contain only letters.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.setState({ notification: "Invalid email address." });
      return;
    }

    // Date of birth validation (assuming dateOfBirth is in MM/DD/YYYY format)
    const dobParts = dateOfBirth.split("/");
    const dobYear = parseInt(dobParts[2]);
    const currentYear = new Date().getFullYear();
    if (dobParts.length !== 3 || isNaN(dobYear) || currentYear - dobYear < 10) {
      this.setState({
        notification:
          "Date of birth must be a valid date and the student must be at least 10 years old.",
      });
      return;
    }

    const data = {
      first_name: firstName.toUpperCase(),
      family_name: familyName.toUpperCase(),
      date_of_birth:
        dobYear + "-" + parseInt(dobParts[1]) + "-" + parseInt(dobParts[0]),
      email: email,
    };

    axios
      .post("http://127.0.0.1:5000/api/student", data)
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        let errorMsg = "Error: Something went wrong when adding the student.";
        if (error.message === "Request failed with status code 409") {
          errorMsg =
            "Error: Student: " +
            firstName +
            " " +
            familyName +
            " already exists.";
        }
        toast.error(errorMsg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    this.setState({
      notification: "",
      firstName: "",
      familyName: "",
      dateOfBirth: "",
      email: "",
    });
  };

  render() {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Add New Student
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Family Name"
              name="familyName"
              value={this.state.familyName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Date of Birth (MM/DD/YYYY)"
              name="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              value={this.state.email}
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

export default AddNewStudent;
