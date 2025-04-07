import "./hero.scss";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faFacebook, faLinkedin, faHashnode, } from "@fortawesome/free-brands-svg-icons";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType:"mirror",
      duration: 20,
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}
          style={{ fontSize: "50px"}}>ARNAV SAGAR</motion.h2>
          <motion.h1 variants={textVariants}
          style={{ padding: "1px", backgroundColor: "grey", borderRadius: "8px", fontSize: "20px" }}>
           MERN | DEVOPS | CLOUD 
          </motion.h1>

          <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ display: "flex", gap: "10px", marginTop: "20px" }}
      >
        {/* Twitter */}
        <motion.a
          href="https://x.com/arnav_sagar07"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          style={{ color: "#1DA1F2" }}
        >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </motion.a>

        {/* GitHub */}
        <motion.a
          href="https://github.com/sagararnav07"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          style={{ color: "#333" }}
        >
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </motion.a>

        {/* Facebook */}
        <motion.a
          href="https://www.facebook.com/arnav.sagar.50"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          style={{ color: "#1877F2" }}
        >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/arnav-sagar-88b03a291/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          style={{ color: "#0077B5" }}
        >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </motion.a>

        {/* Hashnode */}
        <motion.a
          href="https://hashnode.com/@Arnav07"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          style={{ color: "#2962FF" }}
        >
          <FontAwesomeIcon icon={faHashnode} size="2x" />
        </motion.a>

      {/* Leetcode */}
        <motion.a
        href="https://leetcode.com/u/Arnav_07/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        style={{ color: "#1877F2" }}
        >
  <img
    src="/leetcode.png" // Replace with the actual path to your .png file
    alt="Leetcode"
    style={{ width: '40px', height: '40px' }} // Adjust the size as needed
  />
     </motion.a>
  {/* Leetcode */}
  <motion.a
        href="https://www.geeksforgeeks.org/user/arnav07n1nj/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        style={{ color: "#1877F2" }}
>
  <img
    src="/geeksforgeeks.png" // Replace with the actual path to your .png file
    alt="GeeksforGeeks"
    style={{ width: '50px', height: '40px' }} // Adjust the size as needed
  />
     
     
</motion.a>
        <motion.a
        href="https://drive.google.com/drive/folders/1dUvFdaSnas69JPCZcWFSWDk0WNCcvSNH?usp=sharing" // The link to redirect
        target="_blank"
        rel="noopener noreferrer"
        className="redirect-link"
        initial={{ opacity: 0, x: 100 }} // Start slightly off-screen
        animate={{ opacity: 1, x: 0 }}   // Fade and slide in
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.2 }} // Add hover effect
        style={{
          position: "absolute",
          cursor: "pointer",
          marginLeft:"600px",
          top:"185px"
          
        }}
        >
          {/* Use any image as a logo */}
          <img src="/CV.png" alt="Logo" style={{ width: "60px", height: "60px" }} /> {/* Adjust the size */}
        </motion.a>
  
      </motion.div>
          <motion.div
      initial={{ opacity: 0, x: -100 }} // Start with 0 opacity and slightly off-screen to the left
      animate={{ opacity: 1, x: 0 }}    // Animate to full opacity and centered
      transition={{ duration: 0.8 }}    // Animation duration of 0.8 seconds
      style={{ padding: "20px", backgroundColor: "black", borderRadius: "8px" }}
    >
      <h2>About Me</h2>
      <p>Hello, I'm Arnav Sagar, a driven and passionate tech enthusiast currently in my final year of pursuing a Bachelor of Technology at Kalinga Institute of Industrial Technology, my work experience was as a DevOps and open-source contributor at Code for GovTech.
I've built multiple projects, including an end-to-end online banking system using Next.js, deployed seamlessly on AWS. My technical expertise spans JavaScript frameworks such as Node.js and Next.js, and I'm proficient with essential DevOps tools like Docker, Kubernetes, and Terraform, among others.
I also possess a good understanding of foundational concepts, including Operating Systems, Database Management Systems, Computer Networking, and Data Structures and Algorithms.
I am eager to bring my skills, creativity, and technical acumen to your organization. Thank you for your time."

      </p>
    </motion.div>
          
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
       PROGRAMMER, CREATOR, OPEN SOURCE CONTRIBUTOR
      </motion.div>
      <div className="imageContainer">
        <img src="/You.png" alt="" />
      </div>
    </div>
    
  );
};

export default Hero;