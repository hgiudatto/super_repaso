import { useState, useEffect, useRef } from "react";
import CoursesCRUDApp from "./components/CoursesCRUDApp";
import TodosApp from "./components/TodosApp";

function App() {
  return (
    <div className="App">
      {/* <TodosApp /> */}
      <CoursesCRUDApp />
    </div>
  );
}

export default App;
