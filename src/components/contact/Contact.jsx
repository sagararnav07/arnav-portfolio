import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import SectionHeader from '../ui/SectionHeader';
import './contact.scss';

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'arnav.07.sagar@gmail.com',
    href: 'mailto:arnav.07.sagar@gmail.com'
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Bhubaneswar, India',
    href: null
  },
  {
    icon: <FaPhone />,
    label: 'Phone',
    value: '+91 6200739433',
    href: 'tel:+916200739433'
  }
];

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      await emailjs.sendForm(
        'service_wfv1h8o',
        'template_h6rnimq',
        formRef.current,
        'C-lyNEbeIZzw54PxP'
      );
      setStatus({ loading: false, success: true, error: false });
      formRef.current.reset();
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <div className="contact-section">
      <div className="container">
        <SectionHeader 
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <div className="contact__layout">
          {/* Contact Info */}
          <motion.div 
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="contact__info-title">Let's talk about everything!</h3>
            <p className="contact__info-text">
              I'm always open to discussing new projects, creative ideas, 
              or opportunities to be part of your vision.
            </p>

            <div className="contact__cards">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="contact-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="contact-card__icon">{item.icon}</div>
                  <div className="contact-card__content">
                    <span className="contact-card__label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact-card__value">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-card__value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required 
                  placeholder="Project Discussion"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  required
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <motion.button 
                type="submit" 
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status.loading}
              >
                {status.loading ? (
                  'Sending...'
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>

              {status.success && (
                <motion.p 
                  className="status-message status-message--success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}

              {status.error && (
                <motion.p 
                  className="status-message status-message--error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
