import React, { useState, useEffect } from 'react';
import { Mail, MapPin, ExternalLink, Download } from 'lucide-react';
import emailjs from 'emailjs-com';
import './Portfolio.css';
import profileImage from './images/profile.jpg';
import barbieEshopImage from './images/barbie-eshop.jpg';
import patitasImage from './images/patitas.jpg';
import botwpImage from './images/botwp.jpg';

const Portfolio = () => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const titles = ['Software Developer', 'Full Stack Developer'];
    const [titleIndex, setTitleIndex] = useState(0);
    const [visibleSections, setVisibleSections] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
        setVisibleSections(prev => ({ ...prev, [section.id]: isInView }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timeout = setTimeout(() => {
        const target = currentTitle;
        if (isDeleting) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setDisplayText(prev => target.slice(0, prev.length + 1));
        }
      }, isDeleting ? 100 : 150);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  const getVisibilityClass = (sectionId) => {
    return visibleSections[sectionId] ? 'visible' : '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'nicki.pastrana@gmail.com',
        reply_to: formData.email
      },
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((response) => {
        console.log('Email sent successfully:', response);
        setFormData({ name: '', email: '', message: '' });
        alert('Email sent successfully!');
      }, (error) => {
        console.error('Email send failed:', error);
        alert('Failed to send email. Please try again.');
      });
  };
    const handleCVDownload = (language) => {
      const link = document.createElement('a');
      link.href = `/cv/CV_${language}.pdf`;
      link.download = `CV_${language}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
  return (
    <div className="portfolio">
      {/* Navigation */}
      <nav className="sidebar">
        <div className="sidebar-content">
          <div className="profile-section">
            <div className="profile-image">
            <img src={require('./images/profile.jpg')} alt="Profile" />
            </div>
            <h2>Menu</h2>
          </div>
          <ul className="nav-links">
            {['Home', 'About', 'Skills', 'Portfolio', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <section id="home" className="hero-section">
          <div className="hero-content">
            <h1>Stefany Montenegro Pastrana</h1>
            <div className="typing-text">
              <span>I'm a {displayText}</span>
              <span className="cursor">|</span>
            </div>
            <div className="cv-download-section">
              <h2>Download my CV</h2>
              <div className="cv-buttons">
                <button onClick={() => handleCVDownload('English')} className="cv-button">
                  <Download size={20} />
                  English
                </button>
                <button onClick={() => handleCVDownload('Spanish')} className="cv-button">
                  <Download size={20} />
                  Spanish
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`section ${getVisibilityClass('about')}`}>
          <h2>About Me</h2>
          <div className="about-content">
            <p>
            Professional with solid experience in web development and a meticulous focus on quality and precision.
       Competent in frontend technologies, specializing in React, Next.js, and Angular for efficient and scalable
 applications. Known for solving problems creatively and delivering innovative solutions. Skilled in team
 collaboration and staying up-to-date with the latest tech advancements to continuously optimize
 development processes and improve project efficiency.
            </p>
          </div>
        </section>

        {/* Skills Section */}
      <section id="skills" className={`section ${getVisibilityClass('skills')}`}>
          <h2>My Skills</h2>
          <div className="skills-grid">
            {[
              {
                title: 'Technologies and languages',
                skills: ['JavaScript', 'Java', 'CSS', 'HTML', 'C#', 'C++', 'Python', 'TypeScript', 'Babel']
              },
              {
                title: 'Frameworks and librarys',
                skills: ['React', 'Node.js', 'Express.js', 'Bootstrap', 'Redux', 'jQuery', 'Angular', 'Webpack']
              },
              {
                title: 'Design tools - UX/UI Tools',
                skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma']
              },
              {
                title: 'Back-end Technologies',
                skills: ['RESTful API', '.NET', 'GIT']
              },
              {
                title: 'Data Management',
                skills: ['JSON', 'XML']
              },
              {
                title: 'Data Bases',
                skills: ['SQL', 'MySQL', 'MongoDB', 'NoSQL', 'PostgreSQL']
              }
            ].map((category, index) => (
              <div key={category.title} className="skill-card">
                <h3>{category.title}</h3>
                <ul>
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className={`section ${getVisibilityClass('portfolio')}`}>
                <h2>My Projects</h2>
                <div className="portfolio-grid">
                    {/* Project 1 */}
                    <div className="portfolio-item">
                    <img src={require('./images/barbie-eshop.jpg')} alt="barbie" />
                        <div className="portfolio-item-content">
                            <h3>E-commerce Platform</h3>
                            <p>A full-stack e-commerce solution with user authentication, product management (CRUD), and secure payment integration with MercadoPagoApi and Cloudinary Api for images.</p>
                            <div className="tech-tags">
                                <span className="tech-tag">React</span>
                                <span className="tech-tag">Node.js</span>
                                <span className="tech-tag">Json</span>
                                <span className="tech-tag">RESTful API</span>
                                <span className="tech-tag">Javascript</span>
                            </div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="portfolio-item">
                    <img src={require('./images/patitas.jpg')} alt="patitas" />
                        <div className="portfolio-item-content">
                            <h3>Adoption Platform</h3>
                            <p>A collaborative web for pet adoption with Adopter rules page, Cloudinary api and admin for delete, modify or add pets .</p>
                            <div className="tech-tags">
                                <span className="tech-tag">Javascript</span>
                                <span className="tech-tag">React</span>
                                <span className="tech-tag">MySQL</span>
                                <span className="tech-tag">RESTful Api</span>
                            </div>
                        </div>
                    </div>

                    {/* Project 3 */}
                    <div className="portfolio-item">
                    <img src={require('./images/botwp.jpg')} alt="wp" />
                        <div className="portfolio-item-content">
                            <h3>Whatsapp Bot</h3>
                            <p>An interactive bot for appointment booking with a excel exportation.</p>
                            <div className="tech-tags">
                                <span className="tech-tag">Nodejs</span>
                                <span className="tech-tag">Express.js</span>
                                <span className="tech-tag">RESTful API</span>
                                <span className="tech-tag">Excel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
              {/* Education Section */}
    <section id="education" className={`section ${visibleSections['education'] ? 'visible' : ''}`}>
      <h2>Education</h2>
      <div className="education-content">
        <div className="education-item">
          <h3>National Technological University</h3>
          <p>Computer Programming / (May 2022 - September 2024)</p>
        </div>
        <div className="education-item">
          <h3>National Technological University</h3>
          <p>Systems Engineering / (March 2021 - December 2023)</p>
        </div>
      </div>
    </section>

        {/* Contact Section */}
        <section id="contact" className={`section ${visibleSections['contact'] ? 'visible' : ''}`}>
          <h2>Contact Me</h2>
          <div className="contact-grid">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  <Mail size={20} />
                  Send Message
                </button>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <Mail />
                <a href="mailto:stefany.mon73@gmail.com">stefany.mon73@gmail.com</a>
              </div>
              <div className="contact-item">
                <MapPin />
                <span>Argentina, Tucumán</span>
              </div>
              <div className="contact-item">
                <ExternalLink />
                <a href="https://github.com/Ninii94?tab=repositories" target="_blank" rel="noopener noreferrer">
                  github.com/Ninii94
                </a>
              </div>
              <div className="contact-item">
                <ExternalLink />
                <a href="https://api.whatsapp.com/send?phone=543816591850&text=Vi%20tu%20cv!" target="_blank" rel="noopener noreferrer">
                  +54 0381-659-1850
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;