import { useEffect } from "react";
import axios from "axios";
import Emoji from "./Emoji";
import ItemList from "./ItemList";

const Content = ({
  items,
  handleCheck,
  handleDelete,
  itemCreated,
}) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <Emoji size={24} symbol="😟" />
      )}
    </>
  );
};

export default Content;
