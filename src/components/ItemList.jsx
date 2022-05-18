import React from "react";
import Emojis from "react-emoji-component";
import LineItem from "./LineItem";

const ItemList = ({ items, fetchItems, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
      <Emojis size={24}>😂</Emojis>
    </ul>
  );
};

export default ItemList;
