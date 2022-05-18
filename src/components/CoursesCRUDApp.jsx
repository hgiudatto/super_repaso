import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import AddCourse from "./AddCourse";
import Emoji from "./Emoji";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./CoursesCRUDApp.module.css";

const baseURL = "http://localhost:3000/courses";
const api = axios.create({ baseURL: `http://localhost:3000/courses` });

const CoursesCRUDApp = () => {
  const [courses, setCourses] = useState([]);

  const [editFormData, setEditFormData] = useState({ title: "", author: "" });

  const [addFormData, setAddFormData] = useState({
    product_name: "",
    unit_price: "",
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [created, setCreated] = useState(false);
  const [crudError, setCrudError] = useState(false);

  const titleRef = useRef("");

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
  }, [created]);

  async function createCourse() {
    let respPOST = await api.post(`/`, {
      title: "Test Post 1",
      id: 5,
      author: `test`,
    });
    console.log("Test POST: ", respPOST);
    fetchCourses();
  }

  const updateCourse = async (id, val) => {
    let respUPD = api.patch(`/${id}`, { title: val });
    fetchCourses();
  };

  const deleteCourse = async (id) => {
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

  const addCourse = async (course, titleVal, authorVal) => {
    const author = "hgiudatto";
    let title = course;

    const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
    const myNewCourse = { id, title, author };
    /* const listCourses = [...courses, myNewCourse];
    setCourses(listCourses); */

    try {
      // throw new Error("This is a crud operation error!");
      const respAdd = await axios.post(baseURL, myNewCourse);
      console.log("Add Post STATUS: ", respAdd.status);
      if (respAdd.status === 201) {
        setCreated(true);
      }
    } catch (err) {
      setCrudError(true);
      console.error(err.name);
      console.error(err.message);
      console.error(err.stack);
      if (err.response) {
        console.log(`Error: ${err.data}`);
        console.log(`Error: ${err.status}`);
        console.log(`Error: ${err.headers}`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    console.log("handleAddFormChange -> ", newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    addCourse({ title }, { author });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCourse) return;
    addCourse(newCourse);
    setNewCourse("");
  };

  function watchTitle() {
    let titleValue = "";
    titleValue = titleRef.current.value;
    console.log(titleValue);
    titleRef.current.focus();
  }

  const handleCheck = (id) => {
    const listCourses = courses.map((course) =>
      course.id === id ? { ...course, checked: !course.checked } : course
    );
  };

  return (
    <div className={styles.container}>
      <h1>Courses</h1>
      <br></br>
      <div className={styles.body}>
        <Header title="Courses List" />
        <AddCourse
          newCourse={newCourse}
          setNewCourse={setNewCourse}
          handleSubmit={handleSubmit}
        />

        {created ? (
          <Emoji symbol="😀" label="created" />
        ) : (
          <Emoji symbol="😑" label="nothing happened" />
        )}

        {crudError ? (
          <Emoji symbol="😟" label="not created" />
        ) : (
          <Emoji symbol="" label="crenothing happenedted" />
        )}

        <Content courses={courses} />
        <Footer />
      </div>

      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => createCourse()}>Create Course</button>
      {courses.map((course) => (
        <h2 key={course.id}>
          {course.title}
          <button onClick={() => deleteCourse(course.id)}>X</button>
        </h2>
      ))}
      <br></br>
      <form onSubmit={handleAddFormSubmit}>
        <p>Title</p>
        <input
          type="text"
          placeholder="Enter a course title"
          onChange={handleTitleChange}
        />
        <p>Author</p>
        <input
          type="text"
          placeholder="Enter a course author"
          onChange={handleAuthorChange}
        />
        <br></br>
        <button type="submit">Add a course</button>
      </form>
    </div>
  );
};

export default CoursesCRUDApp;
