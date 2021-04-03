import React, { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const LoginModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)} rounded>
        Login
      </Button>
      <Modal width={420} isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-5">Sign into Contest Pug</h2>
          <Button
            href="http://localhost:4000/auth/google"
            left={
              <svg
                viewBox="0 0 23 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
              >
                <path
                  d="M22.7887 12.8044C22.7887 19.4372 18.4203 24.1575 11.969 24.1575C5.78379 24.1575 0.788712 18.9638 0.788712 12.5325C0.788712 6.1013 5.78379 0.907547 11.969 0.907547C14.9805 0.907547 17.5141 2.05598 19.4662 3.94973L16.4231 6.99192C12.4424 2.99817 5.03994 5.99817 5.03994 12.5325C5.03994 16.5872 8.1551 19.8732 11.969 19.8732C16.3961 19.8732 18.0551 16.5732 18.3166 14.8622H11.969V10.8638H22.6129C22.7166 11.4591 22.7887 12.031 22.7887 12.8044Z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            Continue with Google
          </Button>
        </div>
      </Modal>
    </div>
  );
};
