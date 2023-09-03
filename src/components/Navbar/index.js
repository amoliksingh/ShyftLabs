import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/addNewStudent" activeStyle>
            Add New Students
          </NavLink>
          <NavLink to="/studentsList" activeStyle>
            Students List
          </NavLink>
          <NavLink to="/addNewCourse" activeStyle>
            Add New Courses
          </NavLink>
          <NavLink to="/coursesList" activeStyle>
            Courses List
          </NavLink>
          <NavLink to="/addNewResult" activeStyle>
            Add New Results
          </NavLink>
          <NavLink to="/resultsList" activeStyle>
            Results List
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
