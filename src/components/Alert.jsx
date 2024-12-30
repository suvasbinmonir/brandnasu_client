import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
    
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const alertStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  const closeStyles = {
    success: "hover:bg-green-100 rounded-full text-white",
    error: "hover:bg-red-100 rounded-full text-white",
    info: "hover:bg-blue-100 rounded-full text-white",
  };

  // Only render the alert if there is a message
  if (!message) return null;

  return (
    <div className={`${alertStyles[type]} fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-4 w-80 rounded-md shadow-lg text-lightIndigo text-center flex items-center justify-between transition-all z-50`}>
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className={`${alertStyles[type]} ml-4 text-lightIndigo poppins-bold`}>
        <MdClose size={24} />
      </button>
    </div>
  );
};

export default Alert;
