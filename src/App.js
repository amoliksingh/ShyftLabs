import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import AddNewCourse from './pages/addNewCourse';
import AddNewResult from './pages/addNewResult';
import AddNewStudent from './pages/addNewStudent';
import CoursesList from './pages/coursesList';
import ResultsList from './pages/resultsList';
import StudentsList from './pages/studentsList';
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/addNewCourse' element={<AddNewCourse />} />
                <Route path='/addNewResult' element={<AddNewResult />} />
                <Route path='/addNewStudent' element={<AddNewStudent />} />
                <Route path='/coursesList' element={<CoursesList />} />
                <Route path='/resultsList' element={<ResultsList />} />
                <Route path='/studentsList' element={<StudentsList />} />
            </Routes>
        </Router>
    );
}
 
export default App;