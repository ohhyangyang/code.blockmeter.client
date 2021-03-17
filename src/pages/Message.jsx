import React from "react";
import { motion } from "framer-motion";

export default function Message() {
  const containerVariants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: "0vw",
      opacity: 1,
      transition: { durantion: 1 },
    },
    exit: {
      x: "-100vw",
      transition: { when: "beforeChildren", ease: "easeInOut", duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="message"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <p>
        <span>Thank you for your request</span>, we will reach back to you in a
        short time.
      </p>
    </motion.div>
  );
}
