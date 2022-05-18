import React from "react";
import Emojis from "react-emoji-component";

const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {length} List{" "}
        {length === 1 ? (
          <Emojis size={24}>😟 item</Emojis>
        ) : (
          <Emojis size={24}>😀 items</Emojis>
        )}
      </p>
    </footer>
  );
};

export default Footer;
