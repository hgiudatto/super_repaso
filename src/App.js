import { useState, useEffect, useRef } from "react";
import CoursesCRUDApp from "./components/CoursesCRUDApp";
import TodosApp from "./components/TodosApp";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="App">
      {/* <TodosApp /> */}
      <Header title="Grocery List" />
      <Content />
      <Footer />
      {/* <CoursesCRUDApp /> */}
    </div>
  );
}

export default App;
