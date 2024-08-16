import './styles/main.css'
import Header from './components/Header'
import { LuChevronLeft, LuChevronRight, LuExternalLink } from 'react-icons/lu'
import { SiAdonisjs, SiCss3, SiHtml5, SiJavascript, SiLaravel, SiNextdotjs, SiNuxtdotjs, SiPhp, SiPrisma, SiReact, SiSupabase, SiSymfony, SiTailwindcss, SiTypescript, SiVuedotjs } from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
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
    { icon: <SiCss3 size={100} color="#1b73ba" />, name: "CSS" },
    { icon: <SiTailwindcss size={100} color="#38bdf8" />, name: "TailwindCSS" },
    { icon: <SiJavascript size={100} color="#f0db4f" />, name: "JavaScript" },
    { icon: <SiTypescript size={100} color="#007acc" />, name: "TypeScript" },
    { icon: <SiPhp size={100} color="#777bb4" />, name: "PHP" },
    { icon: <SiNextdotjs size={100} color="#000" />, name: "Next.js" },
    { icon: <SiReact size={100} color="#61dafb" />, name: "React" },
    { icon: <SiNuxtdotjs size={100} color="#00c58e" />, name: "Nuxt.js" },
    { icon: <SiVuedotjs size={100} color="#4fc08d" />, name: "Vue.js" },
    { icon: <SiLaravel size={100} color="#ff2d20" />, name: "Laravel" },
    { icon: <SiSymfony size={100} color="#000000" />, name: "Symfony" },
    { icon: <SiAdonisjs size={100} color="#5843eb" />, name: "Adonis.js" },
    { icon: <TbBrandReactNative size={100} color="#61dafb" />, name: "React Native" },
    { icon: <SiSupabase size={100} color="#287150" />, name: "Supabase" },
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
      <h3 className='contact-title'>Contact me</h3>
      <form action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="8bfc0792-122c-4c54-8826-245631bd7fba" />
        <input type="hidden" name="redirect" value="http://leyvei.fr?type=mail" />

        <div className="form-control">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" id="last_name" placeholder="Doe" name="last_name" required />
        </div>

        <div className="form-control">
          <label htmlFor="first_name">First Name</label>
          <input type="text" id="first_name" placeholder="John" name="first_name" required />
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail address</label>
          <input type="email" id="email" placeholder="john.doe@example.com" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone number</label>
          <input type="tel" id="phone" placeholder="+33 6 00 00 00 00" name="phone" required />
        </div>
        <div className="form-control">
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Hello, I'm interested in your services." name="message" required />
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  )
}

export default App