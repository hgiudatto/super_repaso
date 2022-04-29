import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: `http://localhost:3000/courses` });

const CoursesCRUDApp = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await api.get(`/`);
      console.log("Getting the courses...", res.data);
      setCourses(res.data);
    } catch (err) {
      if (err.response) {
        console.log(`Error: ${err.data}`);
        console.log(`Error: ${err.status}`);
        console.log(`Error: ${err.headera}`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  async function createCourse() {
    debugger;
    let respPOST = await api.post(`/`, {
      title: "Test Post 1",
      id: 5,
      author: `test`,
    });
    console.log("Test POST: ", respPOST);
    fetchCourses();
  }

  const deleteCourse = async (id) => {
    debugger;
    try {
      console.log(`Deleting course: ${id}`);
      let respDEL = api.delete(`/${id}`);
      fetchCourses();
    } catch (err) {
      if (err.response) {
        console.log(`Error: ${err.data}`);
        console.log(`Error: ${err.status}`);
        console.log(`Error: ${err.headera}`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const updateCourse = async (id, val) => {
    let respUPD = api.patch(`/${id}`, { title: val });
    fetchCourses();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Courses</h1>
        <button onClick={() => createCourse()}>Create Course</button>
        {courses.map((course) => (
          <h2 key={course.id}>
            {course.title}
            <button onClick={() => deleteCourse(course.id)}>X</button>
          </h2>
        ))}
      </header>
    </div>
  );
};

export default CoursesCRUDApp;
