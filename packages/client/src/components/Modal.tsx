import React from "react";
import ReactModal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { XOutline } from "heroicons-react";

export const Modal: React.FC<
  ReactModal["props"] & { width?: number; onRequestClose: () => void }
> = ({ children, width = 450, isOpen, onRequestClose, ...props }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <ReactModal
            shouldCloseOnEsc
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            style={{
              overlay: {
                backgroundColor: "rgba(27, 30, 35, 0.8)",
                zIndex: 1000,
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ffffff",
                border: "none",
                borderRadius: "8px",
                maxHeight: "80vh",
                width: "90%",
                maxWidth: width,
              },
            }}
            isOpen={isOpen}
            {...props}
          >
            <button
              className="absolute top-0 right-0 m-3 focus:outline-none focus:ring p-1 rounded"
              onClick={() => {
                onRequestClose();
              }}
            >
              <XOutline size={20} />
            </button>
            {children}
          </ReactModal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
