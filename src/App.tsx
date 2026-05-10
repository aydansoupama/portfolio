import './styles/main.css'
import Header from './components/Header'
import { LuChevronLeft, LuChevronRight, LuExternalLink } from 'react-icons/lu'
import { SiHtml5, SiLaravel, SiNextdotjs, SiPrisma, SiSymfony, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import Modal from './components/Modal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const applyScrollAppear = (element: HTMLElement) => {
  gsap.fromTo(element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.25,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('type') === 'mail') {
      setIsModalOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <main id="home">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const jobTitleRef = useRef<HTMLSpanElement>(null);
  const [jobTitles] = useState(['Full Stack', 'Front End', 'Back End', 'HTML', 'CSS', 'TailwindCSS', 'JavaScript', 'TypeScript', 'PHP', 'Laravel', 'Symfony', 'React', 'Next.js', 'Nuxt.js', 'Vue.js', 'Adonis.js', 'React Native']);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      applyScrollAppear(sectionRef.current);
    }

    const interval = setInterval(() => {
      gsap.to(jobTitleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
          gsap.to(jobTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5
          });
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [jobTitles]);

  return (
    <section id="about" ref={sectionRef}>
      <h1>
        <span>Hello, I'm</span>
        <span>Aydan Soupama</span>
        <span ref={jobTitleRef}>{jobTitles[currentJobIndex]} Developer</span>
      </h1>
    </section>
  )
}

const Skills = () => {
  const skills = [
    { icon: <SiHtml5 size={100} color='#ce4822' />, name: "HTML" },
    { icon: <SiTailwindcss size={100} color="#38bdf8" />, name: "TailwindCSS" },
    { icon: <SiTypescript size={100} color="#007acc" />, name: "TypeScript" },
    { icon: <SiNextdotjs size={100} color="#000" />, name: "Next.js" },
    { icon: <SiLaravel size={100} color="#ff2d20" />, name: "Laravel" },
    { icon: <SiSymfony size={100} color="#000000" />, name: "Symfony" },
    { icon: <SiPrisma size={100} color="#2d3748" />, name: "Prisma" },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      applyScrollAppear(sectionRef.current);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    setStartIndex(prevIndex => {
      if (direction === 'left') {
        return prevIndex === 0 ? skills.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % skills.length;
      }
    });
  };

  const visibleSkills = [...skills.slice(startIndex), ...skills.slice(0, startIndex)].slice(0, 16);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="skills-header">
        <h3>See my skills</h3>
        <div className="skills-actions">
          <button className="previous" onClick={() => scroll('left')}><LuChevronLeft size={24} /></button>
          <button className="next" onClick={() => scroll('right')}><LuChevronRight size={24} /></button>
        </div>
      </div>
      <div className="skills-content">
        {visibleSkills.map((skill, index) => (
          <Skill key={`${skill.name}-${index}`} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    </section>
  )
}


const Skill = ({ icon, name }: { icon: React.ReactNode, name: string }) => {
  return (
    <div className="skill">
      <div className="skill-icon">
        {icon}
      </div>
      <h4>{name}</h4>
    </div>
  )
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      applyScrollAppear(sectionRef.current);
    }
  }, []);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="projects-header">
        <h3>View my latest projects</h3>
      </div>
      <div className="projects-content">
        <Project image='/images/stagey.png' title='Stagey' link='https://stagey.fr' />
        <Project image='/images/bakila.png' title='Bakila' link='https://bakilart.vercel.app/' />
      </div>
    </section>
  )
}
const Project = ({ image, title, link }: { image: string, title: string, link: string }) => {
  return (
    <div className="project">
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
      <div className="project-content">
        <a href={link} target='_blank'>
          <h3>{title}</h3>
          <LuExternalLink className='project-link' />
        </a>
      </div>
    </div>
  )
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      applyScrollAppear(sectionRef.current);
    }
  }, []);

  return (
    <section id="contact" ref={sectionRef}>
      <h3 className="contact-title">Work with me</h3>

      <div className="contact-content">
        <p>
          For project inquiries, collaborations, or custom development
          requests, please visit{" "}
          <a
            href="https://leyvei.dev#contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            leyvei.dev
          </a>
        </p>

        <a
          href="https://leyvei.dev#contact"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          Make a request
        </a>
      </div>
    </section>
  );
};
export default App