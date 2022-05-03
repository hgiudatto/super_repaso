import React from "react";
import { FaPlus } from "react-icons/fa";

const AddCourse = ({ newCourse, setNewCourse, handleSubmit }) => {
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addCourse">Add Course</label>
      <input
        autoFocus
        id="addCourse"
        type="text"
        placeholder="Add Course"
        required
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
      />
      <button type="submit" aria-label="Add Course">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddCourse;
