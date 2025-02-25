import { motion, AnimatePresence } from "motion/react";
import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
import { useMessenger } from "../hooks/useMessenger";

function MessagePanel() {
  const { messageDetails } = useMessenger();

  const getMessageStyle = () => {
    switch (messageDetails.type) {
      case "success":
        return "bg-green-100 text-green-800 border-green-500";
      case "error":
        return "bg-red-100 text-red-800 border-red-500";
      case "loading":
        return "bg-blue-100 text-blue-800 border-blue-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  return (
    <AnimatePresence>
      {messageDetails.type !== "none" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Slide up animation
          animate={{ opacity: 1, y: 0 }} // Fade in
          exit={{ opacity: 0, y: 50 }} // Fade out and slide down
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed bottom-0 max-md:left-0 right-0 z-50 p-4 min-w-xs w-fit rounded-t-lg border ${getMessageStyle()} shadow-lg max-md:mx-auto`}
        >
          <div className="flex items-center space-x-2">
            {messageDetails.type === "success" && <FiCheckCircle />}
            {messageDetails.type === "error" && <FiXCircle />}
            {messageDetails.type === "loading" && (
              <FiLoader className="animate-spin" />
            )}
            <span>{messageDetails.content}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MessagePanel;
