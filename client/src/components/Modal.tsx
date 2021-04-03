import React from "react";
import ReactModal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { XOutline } from "heroicons-react";

export const Modal: React.FC<
  ReactModal["props"] & { width?: number; onRequestClose: () => void }
> = ({ children, width, isOpen, onRequestClose, ...props }) => {
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
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                zIndex: 1000,
              },
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                borderRadius: 8,
                padding: "30px",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#ffffff",
                border: "none",
                maxHeight: "80vh",
                width: "90%",
                maxWidth: width ?? 530,
              },
            }}
            isOpen={isOpen}
            {...props}
          >
            <button
              className="absolute top-0 right-0 m-3 focus:outline-none focus:ring-2 focus:text-primary-500 focus:ring-primary-500 p-1 rounded"
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
