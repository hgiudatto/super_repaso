import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import Emoji from "./Emoji";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const itemInput = useRef("");
  const messageSpan = useRef("");

  const validateItemName = () => {
    let itemName = itemInput.current.value;
    console.log(`Item name: ${itemName}`);
    let itemChunk = itemName.slice(2, itemName.length);
    alert(`Item chunk: ${itemChunk}`);
    messageSpan.current.innerHTML = "You entered something like: ".concat(
      itemChunk
    );
  };

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={itemInput}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        /* onBlur={() => validateItemName()} */
        onChange={(e) => setNewItem(e.target.value)}
      />
      <span ref={messageSpan}></span>
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => itemInput.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
