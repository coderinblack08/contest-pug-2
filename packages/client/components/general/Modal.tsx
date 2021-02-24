import React from "react";
import ReactModal, { Props } from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .6)",
    zIndex: 999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(32, 32, 35)",
    border: "none",
    width: "100%",
    maxWidth: 500,
  },
};

export const Modal: React.FC<Props> = ({ children, ...props }) => {
  return (
    <ReactModal style={customStyles} {...props}>
      {children}
    </ReactModal>
  );
};
