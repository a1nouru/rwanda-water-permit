import { motion } from "framer-motion";

export function Testimonial() {
  return (
    <div className="relative flex items-center space-x-2 text-white">
      <motion.svg 
        width="16" 
        height="20" 
        viewBox="0 0 16 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{ y: 0, opacity: 0.7 }}
        animate={{ 
          y: [0, -3, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path 
          d="M8 0C8 0 14 8.5 14 13C14 16.5 11.5 19 8 19C4.5 19 2 16.5 2 13C2 8.5 8 0 8 0Z"
          fill="#60A5FA"
        />
        <motion.ellipse 
          cx="6" 
          cy="9" 
          rx="1.5" 
          ry="2"
          fill="rgba(255, 255, 255, 0.5)"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.svg>
      <p className="text-sm md:text-base lg:text-lg font-medium text-white">
        "Our mission is to ensure the availability of enough and well managed water resources for sustainable development."
      </p>
    </div>
  )
} 