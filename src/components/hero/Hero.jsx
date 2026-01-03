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
          <motion.div className="profileHeader" variants={textVariants}>
            <motion.div 
              className="profileImageContainer"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <img src="/You.png" alt="Arnav Sagar" className="profileImage" />
            </motion.div>
            <motion.h2 variants={textVariants} style={{ fontSize: "50px"}}>ARNAV SAGAR</motion.h2>
          </motion.div>
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
          style={{ color: "#f0f0f0" }}
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
        href="https://drive.google.com/drive/folders/1dUvFdaSnas69JPCZcWFSWDk0WNCcvSNH?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="cv-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
        >
          <img src="/CV.png" alt="Download CV" />
          <span>Resume</span>
        </motion.a>
  
      </motion.div>
          <motion.div
            className="aboutMe"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2>About Me</h2>
            <p>
              Hello, I'm Arnav Sagar, a driven and passionate tech enthusiast currently in my final year of pursuing a Bachelor of Technology at Kalinga Institute of Industrial Technology. My work experience includes being a DevOps and open-source contributor at Code for GovTech.
            </p>
            <p>
              I've built multiple projects, including an end-to-end online banking system using Next.js, deployed seamlessly on AWS. My technical expertise spans JavaScript frameworks such as Node.js and Next.js, and I'm proficient with essential DevOps tools like Docker, Kubernetes, and Terraform.
            </p>
            <p>
              I also possess a good understanding of foundational concepts, including Operating Systems, Database Management Systems, Computer Networking, and Data Structures and Algorithms. I am eager to bring my skills, creativity, and technical acumen to your organization.
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
      <div className="animationContainer">
        <motion.div 
          className="codeAnimation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="floatingCode"
            animate={{ 
              y: [0, -20, 0],
              rotateY: [0, 10, 0, -10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <svg viewBox="0 0 200 200" className="techSvg">
              <motion.circle
                cx="100" cy="100" r="80"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="100" cy="100" r="60"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="100" cy="100" r="40"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.text
                x="100" y="105"
                textAnchor="middle"
                fill="#fff"
                fontSize="24"
                fontFamily="monospace"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {'</>'}
              </motion.text>
            </svg>
          </motion.div>
          <motion.div 
            className="orbitingDots"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="dot dot1"></span>
            <span className="dot dot2"></span>
            <span className="dot dot3"></span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;