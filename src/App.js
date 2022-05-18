import { useState, useEffect, useRef } from "react";
import CoursesCRUDApp from "./components/CoursesCRUDApp";
import TodosApp from "./components/TodosApp";
import Content from "./components/Content";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Emoji from "./components/Emoji";
import Emojis from "react-emoji-component";
import AddItem from "./components/AddItem";
import SearchItem from "./components/SearchItem";
import apiRequest from "./apiRequest";

const baseURL = "http://localhost:3000/items";
const itemsAPI = axios.create({ baseURL: `http://localhost:3000/items` });

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [itemCreated, setItemCreated] = useState(false);
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /* const fetchItems = async () => {
    try {
      const respGET = await itemsAPI.get(`/`);
      // if (!respGET.status === 200) throw Error("Did not receive expected data");
      console.log("/items - RESP STATUS: ", respGET.status);
      console.log("All the items: ", respGET.data);
      setItems(respGET.data);
      setFetchError(null);
    } catch (err) {
      console.log(err.message);
      setFetchError(err.message);
      if (err.response) {
        console.log(`Error: ${err.data}`);
        console.log(`Error: ${err.status}`);
        console.log(`Error: ${err.headera}`);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }; */

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {
      id,
      checked: false,
      item,
    };
    // const listItems = [...items, myNewItem];
    try {
      const respPOST = await axios.post(baseURL, myNewItem);
      console.log("Item POST - status: ", respPOST.status);
      if (respPOST === 201) {
        setItemCreated(true);
        /* fetchItems(); */
      }
    } catch (err) {
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
    } finally {
      setIsLoading(false);
    }
  };
 
  useEffect(() => {
    /* fetchItems(); */
    const fetchItems = async () => {
      try {
        const respGET = await itemsAPI.get(`/`);
        /* if (!respGET.status === 200)
          throw Error("Did not receive expected data"); */
        console.log("/items - RESP STATUS: ", respGET.status);
        console.log("All the items: ", respGET.data);
        setItems(respGET.data);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
        if (err.response) {
          console.log(`Error: ${err.data}`);
          console.log(`Error: ${err.status}`);
          console.log(`Error: ${err.headera}`);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    setItems(listItems);
  };

  const handleDelete = async (id) => {
    try {
      const respDEL = await itemsAPI.delete(`/${id}`);
      /* fetchItems(); */
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      {/* <TodosApp /> */}
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        itemCreated={itemCreated}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
        <Footer length={items.length} /> {/* <CoursesCRUDApp /> */}{" "}
      </main>
    </div>
  );
}

export default App;
