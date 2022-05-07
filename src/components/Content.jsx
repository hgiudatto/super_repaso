import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Emoji from "./Emoji";
import Emojis from 'react-emoji-component'

const baseURL = "http://localhost:3000/items";
const itemsAPI = axios.create({ baseURL: `http://localhost:3000/items` });

const Content = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const respGET = await itemsAPI.get(`/`);
      console.log("/items - RESP STATUS: ", respGET.status);
      console.log("All the items: ", respGET.data);
      setItems(respGET.data);
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
    fetchItems();
  }, []);

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = async (id) => {
    try {
      const respDEL = await itemsAPI.delete(`/${id}`);
      console.log(`Deleting item: ${id}`);
      console.log("DELETE item - RESP STATUS: ", respDEL.status);
      console.log("All the items: ", respDEL.data);
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

  return (
    <main>
      {items.length ? (<ul>
        {items.map((item) => (
          <li className="item" key={item.id}>
            <input
              type="checkbox"
              onChange={() => handleCheck(item.id)}
              checked={item.checked}
            />
            <label
              style={item.checked ? { textDecoration: "line-through" } : null}
              onDoubleClick={() => handleCheck(item.id)}
            >
              {item.item}
            </label>
            <FaTrashAlt role="button" tabIndex="0" onClick={() => handleDelete(item.id)} />
          </li>
        ))}
        <Emojis size="24">😀</Emojis>
      </ul>) : (<Emoji symbol="😟" />)}
      
    </main>
  );
};

export default Content;
