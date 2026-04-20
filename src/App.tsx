/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate } from 'motion/react';
import { Menu, X, ChevronRight, Building2, HardHat, Ruler, Phone, Mail, MapPin, ArrowUpRight, ArrowLeft, ChevronLeft } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

const SectionWrapper = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Proyectos', href: '/proyectos' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || !isHomePage ? 'py-4 glass shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className={`text-2xl font-bold tracking-tighter transition-colors ${scrolled || !isHomePage ? 'text-primary' : 'text-white'}`}>
            sefirot.desarrollos
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.href}
                className={`text-[10px] font-black hover:text-primary transition-colors uppercase tracking-[0.3em] ${scrolled || !isHomePage ? 'text-stone-900' : 'text-white'}`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <MagneticButton>
            <motion.a
              href="https://api.whatsapp.com/send?phone=5493416910558&text=Hola!%20Me%20comunico%20desde%20la%20web!"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 block"
            >
              Contáctanos
            </motion.a>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden transition-colors ${scrolled || !isHomePage ? 'text-stone-900' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white md:hidden flex flex-col items-center justify-center gap-12"
          >
            <button 
              className="absolute top-8 right-6 text-stone-900" 
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold hover:text-primary transition-colors uppercase tracking-[0.2em]"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://api.whatsapp.com/send?phone=5493416910558&text=Hola!%20Me%20comunico%20desde%20la%20web!"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/30"
            >
              Contáctanos
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const RevealText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative overflow-hidden pb-[0.1em] -mb-[0.1em] ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const SplitText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  
  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.3em] pb-[0.1em] -mb-[0.1em]">
          {word.split("").map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden pb-[0.6em] -mb-[0.6em] px-[0.15em] -mx-[0.15em]">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + (wordIndex * 0.1) + (charIndex * 0.03)
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-stone-950">
      <motion.div 
        style={{ y, opacity }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://i.postimg.cc/gjhXsn1Y/2_9J1547.jpg" 
          alt="Sefirot Background"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl">
          <div className="space-y-8">
            <div className="overflow-visible">
              <h1 className="text-7xl md:text-[10rem] font-bold text-white leading-[0.9] tracking-tighter flex flex-col items-start">
                <motion.img
                  src="https://i.postimg.cc/T3MhddFc/Sefirot_Nuevo.png"
                  alt="Sefirot Logo"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-40 md:h-80 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <SplitText 
                  text="desarrollos inmobiliarios" 
                  className="text-stone-300 italic font-medium text-3xl md:text-6xl block lowercase tracking-normal -mt-6 md:-mt-10" 
                  delay={0.4}
                />
              </h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="text-xl md:text-2xl text-stone-300 leading-relaxed max-w-xl font-light"
            >
              Construcción y desarrollo de edificios unifamiliares en la ciudad de Rosario con más de 20 años de trayectoria.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <MagneticButton>
                <Link to="/proyectos">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 group shadow-2xl shadow-primary/30"
                  >
                    Explorar Obras
                    <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                  </motion.button>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 text-white/40 flex items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">DESDE 2015</span>
        <div className="w-20 h-px bg-white/20" />
      </motion.div>
    </section>
  );
};

interface ProjectCardProps {
  key?: React.Key;
  title: string;
  category: string;
  image: string;
  delay: number;
}

const RevealImage = ({ src, alt, className = "", delay = 0 }: { src: string, alt: string, className?: string, delay?: number }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-primary origin-top z-10"
      />
    </div>
  );
};

const ProjectCard = ({ title, category, image, delay }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[16/10] overflow-hidden rounded-[2rem] cursor-pointer bg-stone-200"
    >
      <RevealImage 
        src={image} 
        alt={title} 
        delay={delay}
        className="w-full h-full transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
      />
      
      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px] z-20" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30">
        <div className="flex justify-between items-start">
          <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[10px]">
            {category}
          </span>
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <ArrowUpRight size={20} />
          </div>
        </div>
        
        <div>
          <h3 className="text-4xl font-bold text-white tracking-tighter mb-2">
            {title}
          </h3>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    { title: "las mejores vistas", category: "Rooftop", image: "https://i.postimg.cc/zBsM6c2v/DSC_2602.jpg", delay: 0.1 },
    { title: "Ubicaciones", category: "Residencial", image: "https://i.postimg.cc/1tkT2j79/2_P2604.jpg", delay: 0.2 },
    { title: "Interiores Premium", category: "Diseño", image: "https://i.postimg.cc/KzCSFzj3/Interior_piso_2.jpg", delay: 0.3 },
    { title: "Experiencia", category: "Corporativo", image: "https://i.postimg.cc/50CKBm92/3_P2604.jpg", delay: 0.4 },
  ];

  return (
    <SectionWrapper id="proyectos" className="py-40 px-6 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-stone-400 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block"
            >
              Selección de Obras
            </motion.span>
            <RevealText className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight text-white">
              Proyectos en las <br /> <span className="italic font-light text-stone-300">Mejores Zonas.</span>
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-stone-400 text-lg max-w-2xl font-light"
            >
              Nuestros proyectos están ubicados en las mejores zonas de nuestra ciudad, rodeados de verdes y parques, pensando espacios confortables y a tu medida.
            </motion.p>
          </div>
          <Link to="/proyectos">
            <motion.button
              whileHover={{ x: 15 }}
              className="flex items-center gap-3 text-stone-500 font-bold uppercase tracking-[0.3em] text-[10px] group transition-all"
            >
              Ver Portafolio Completo
              <ChevronRight size={16} className="text-primary" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <ProjectCard 
              key={i} 
              title={project.title}
              category={project.category}
              image={project.image}
              delay={project.delay}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const Services = () => {
  const services = [
    { 
      icon: <Building2 size={40} strokeWidth={1} />, 
      title: "Construcción Civil", 
      desc: "Ejecución de obras de alta complejidad con precisión milimétrica." 
    },
    { 
      icon: <Ruler size={40} strokeWidth={1} />, 
      title: "Diseño & Arquitectura", 
      desc: "Espacios que fusionan estética brutalista con confort moderno." 
    },
    { 
      icon: <HardHat size={40} strokeWidth={1} />, 
      title: "Gestión Integral", 
      desc: "Control total del ciclo de vida del proyecto, desde el suelo al cielo." 
    }
  ];

  return (
    <SectionWrapper id="servicios" className="py-40 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-[3rem] overflow-hidden shadow-2xl">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1 }}
              className="p-16 bg-white hover:bg-stone-50 transition-colors duration-700 group relative"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-primary mb-12 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-3xl font-bold mb-6 tracking-tighter">{service.title}</h3>
              <p className="text-stone-500 leading-relaxed font-light">
                {service.desc}
              </p>
              <div className="mt-10 flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Saber más <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const Contact = () => {
  return (
    <SectionWrapper id="contacto" className="py-40 px-6 bg-stone-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-16">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 block"
              >
                Contacto
              </motion.span>
              <RevealText className="text-7xl md:text-8xl font-bold tracking-tighter leading-tight mb-12">
                Hablemos de <br /> su <span className="italic font-light">Legado.</span>
              </RevealText>
            </div>

            <div className="space-y-12">
              {[
                { icon: <Phone size={24} />, label: "Llámanos", val: "+54 9 341 691-0558", href: "tel:+5493416910558" },
                { icon: <Mail size={24} />, label: "Escríbenos", val: "contacto@sefirot.com.ar", href: "mailto:contacto@sefirot.com.ar" },
                { icon: <MapPin size={24} />, label: "Visítanos", val: "Rosario, Santa Fe, Argentina", href: "https://maps.google.com/?q=Rosario, Santa Fe, Argentina" }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-8 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-stone-500 text-[10px] uppercase tracking-[0.4em] font-black mb-2">{item.label}</p>
                    <p className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">{item.val}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] backdrop-blur-3xl p-16 rounded-[3rem] border border-white/10 shadow-2xl"
          >
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-black">Nombre</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="text" 
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-primary outline-none transition-colors text-xl font-light" 
                    placeholder="Juan Pérez" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-black">Email</label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }}
                    type="email" 
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-primary outline-none transition-colors text-xl font-light" 
                    placeholder="juan@ejemplo.com" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-black">Mensaje</label>
                <motion.textarea 
                  whileFocus={{ scale: 1.02 }}
                  rows={4} 
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-primary outline-none transition-colors text-xl font-light resize-none" 
                  placeholder="Cuéntanos sobre tu visión..."
                ></motion.textarea>
              </div>
              <MagneticButton className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl shadow-primary/40"
                >
                  Enviar Mensaje
                </motion.button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-stone-950 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-primary">sefirot.desarrollos</span>
        </div>
        <p className="text-stone-500 text-sm">
          © {new Date().getFullYear()} sefirot.desarrollos. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          {[
            { name: 'Instagram', url: 'https://www.instagram.com/sefirot.desarrollos' },
            { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?phone=5493416910558&text=Hola!%20Me%20comunico%20desde%20la%20web!' },
            { name: 'Facebook', url: 'https://www.facebook.com/sefirot.desarrollos' }
          ].map((social, i) => (
            <motion.a 
              key={social.name} 
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-stone-500 hover:text-primary transition-colors text-sm uppercase tracking-widest font-bold"
            >
              {social.name}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const ParallaxImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const About = () => {
  return (
    <SectionWrapper id="nosotros" className="py-40 px-6 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative">
              <ParallaxImage 
                src="https://i.postimg.cc/ZqZqtwgL/DSC_8534.jpg" 
                alt="Sefirot Entrance" 
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute -bottom-12 -right-12 glass p-10 rounded-[2rem] hidden md:block shadow-2xl border-white/40"
            >
              <p className="text-6xl font-bold text-primary mb-1 tracking-tighter">
                <Counter value="20+" />
              </p>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-500">Años de Trayectoria</p>
            </motion.div>
          </motion.div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Nuestra Esencia</span>
              <RevealText className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                Construimos <br /> con <span className="italic font-light">Propósito.</span>
              </RevealText>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-stone-500 leading-relaxed font-light"
            >
              Somos una empresa de la ciudad de Rosario dedicada a la construcción y desarrollo de edificios unifamiliares. Con una trayectoria de más de 20 años en el rubro, contamos con solidez técnica, diseño y estrategias comerciales acorde a las tendencias del mercado.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-stone-400 leading-relaxed font-light italic"
            >
              "Convencidos de que el equilibrio entre calidad, diseño y valor es posible, atendemos la demanda de nuestros clientes con gran compromiso y profesionalismo."
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-3xl bg-stone-50 border border-stone-100"
              >
                <h4 className="text-lg font-bold mb-3 uppercase tracking-widest">Misión</h4>
                <p className="text-stone-500 text-sm leading-relaxed">Fusionar la innovación tecnológica con la calidez humana en cada estructura.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-8 rounded-3xl bg-stone-50 border border-stone-100"
              >
                <h4 className="text-lg font-bold mb-3 uppercase tracking-widest">Visión</h4>
                <p className="text-stone-500 text-sm leading-relaxed">Ser el referente global de arquitectura sustentable y de lujo accesible.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const Counter = ({ value }: { value: string }) => {
  const [display, setDisplay] = useState("0");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
      const suffix = value.replace(/[0-9.]/g, '');
      
      const controls = animate(0, numericPart, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplay(Math.floor(latest).toLocaleString() + suffix);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
};

const Stats = () => {
  const stats = [
    { label: "Proyectos Completados", value: "8" },
    { label: "Metros Construidos", value: "15k+" },
    { label: "Años de Experiencia", value: "20+" },
    { label: "Clientes Satisfechos", value: "100+" },
  ];

  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter">
                <Counter value={stat.value} />
              </p>
              <p className="text-xs md:text-sm uppercase tracking-widest font-medium opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-[100] pointer-events-none hidden md:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[100] pointer-events-none hidden md:block"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.2 }}
      />
    </>
  );
};

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
    </div>
  );
};

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const maxIndex = CIRCULAR_PROJECT_IMAGES.length - itemsPerPage;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <SectionWrapper className="py-24 bg-stone-50 overflow-hidden px-6">
      <div className="max-w-7xl mx-auto relative group/carousel">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-4 block"
          >
            Nuestros Hitos
          </motion.span>
          <h2 className="text-5xl font-bold tracking-tighter">Explora <span className="italic font-light">la Trayectoria</span></h2>
        </div>

        <div className="flex items-center justify-between gap-4 relative">
          {/* Navigation Arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 transition-transform duration-500">
            <button 
              onClick={prev}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all duration-500 bg-white shadow-xl hover:scale-110 active:scale-95 shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 transition-transform duration-500">
            <button 
              onClick={next}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all duration-500 bg-white shadow-xl hover:scale-110 active:scale-95 shrink-0"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-hidden relative px-4 py-16">
            {/* Gradient Masks to hide the edges smoothly */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-50 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-50 to-transparent z-20 pointer-events-none" />

            <motion.div 
              animate={{ x: `-${currentIndex * (100 / itemsPerPage)}%` }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="flex"
            >
              {CIRCULAR_PROJECT_IMAGES.map((item) => (
                <div key={item.id} className="min-w-full md:min-w-[33.333%] flex justify-center px-4">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    onClick={() => navigate('/proyectos', { state: { openProjectId: item.id } })}
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] cursor-pointer relative group bg-stone-200"
                  >
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-6xl md:text-8xl font-black text-white/40 group-hover:text-white/10 transition-all duration-500 font-sans">
                        {item.id}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-stone-900/40">
                      <span className="text-white font-black uppercase tracking-[0.2em] text-[9px] transform translate-y-4 group-hover:translate-y-0 transition-transform">Ver {item.id}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const Home = () => {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <ProjectCarousel />
      <Projects />
      <Stats />
      <Services />
      <Contact />
    </main>
  );
};

/**
 * CONFIGURACIÓN DE IMÁGENES CIRCULARES (Home)
 * Aquí puedes cambiar las imágenes de los 9 círculos que aparecen en el carrusel de inicio.
 */
const CIRCULAR_PROJECT_IMAGES = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  url: `https://picsum.photos/seed/sef-circle-${i + 1}/400/400`,
  title: `Círculo Proyecto ${i + 1}`
}));

/**
 * CONFIGURACIÓN DE PROYECTOS
 * Aquí puedes cambiar las imágenes y textos de los 9 proyectos.
 * Para cada proyecto puedes definir una imagen principal y una galería de 4 fotos.
 */
const PROJECTS_LIST = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Sefirot ${i + 1}`,
  category: "Desarrollo Inmobiliario",
  mainImage: `https://picsum.photos/seed/sefirot-main-${i + 1}/1200/800`,
  description: "Este proyecto representa nuestra visión de la arquitectura contemporánea: una síntesis perfecta entre espacialidad, luz natural y terminaciones de alta gama. Ubicado en puntos estratégicos de Rosario.",
  gallery: [
    `https://picsum.photos/seed/sef-gal-${i + 1}-1/800/600`,
    `https://picsum.photos/seed/sef-gal-${i + 1}-2/800/600`,
    `https://picsum.photos/seed/sef-gal-${i + 1}-3/800/600`,
    `https://picsum.photos/seed/sef-gal-${i + 1}-4/800/600`,
  ]
}));

const ProjectsPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const location = useLocation();

  const selectedProject = PROJECTS_LIST.find(p => p.id === selectedId);
  const allProjectImages = selectedProject ? [selectedProject.mainImage, ...selectedProject.gallery] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check if we reached this page from the carousel with a specific project to open
    if (location.state?.openProjectId) {
      setSelectedId(location.state.openProjectId);
      setActiveImageIndex(0);
    }
  }, [location.state]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedId) {
      interval = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % allProjectImages.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [selectedId, allProjectImages.length, activeImageIndex]);

  return (
    <main className="min-h-screen bg-stone-950 pt-40 pb-40 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block"
          >
            Portafolio Completo
          </motion.span>
          <RevealText className="text-6xl md:text-9xl font-bold tracking-tighter leading-tight text-white inline-block">
            Nuestros <span className="italic font-light text-stone-300">Desarrollos.</span>
          </RevealText>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {PROJECTS_LIST.map((project, idx) => (
            <motion.div
              layoutId={`card-${project.id}`}
              onClick={() => {
                setSelectedId(project.id);
                setActiveImageIndex(0);
              }}
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden rounded-[3rem] bg-stone-900 cursor-pointer shadow-2xl border border-white/5"
            >
              <motion.img 
                layoutId={`image-${project.id}`}
                src={project.mainImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-12 left-12 overflow-hidden">
                <motion.h3 
                  layoutId={`title-${project.id}`}
                  className="text-4xl font-bold text-white tracking-tighter"
                >
                  {project.title}
                </motion.h3>
                <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-primary font-black uppercase tracking-widest text-[10px]">Ver Detalles</span>
                  <div className="w-6 h-px bg-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-stone-950/98 backdrop-blur-2xl z-0"
            />
            
            <motion.div 
              layoutId={`card-${selectedId}`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-stone-50 rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 z-10"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 z-[60] p-5 bg-white shadow-xl hover:bg-stone-50 rounded-full transition-all group scale-90 md:scale-100"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>

              <div className="w-full md:w-1/2 h-[400px] md:h-auto relative overflow-hidden bg-stone-200">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    src={allProjectImages[activeImageIndex]}
                    alt="Current Display"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Progress bar for slideshow */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
                  <motion.div 
                    key={activeImageIndex}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-primary"
                  />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              <div className="w-full md:w-1/2 p-10 md:p-20 overflow-y-auto bg-white custom-scrollbar">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Proyecto en Detalle</span>
                  <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-stone-900">
                    {selectedProject?.title}
                  </h2>
                  <p className="text-xl text-stone-500 font-light leading-relaxed mb-16">
                    {selectedProject?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {allProjectImages.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => setActiveImageIndex(i)}
                        className={`aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg group border-4 cursor-pointer transition-all duration-500 relative ${activeImageIndex === i ? 'border-primary' : 'border-stone-100'}`}
                      >
                        <img 
                          src={img} 
                          alt={`Gallery ${i}`} 
                          className={`w-full h-full object-cover transition-transform duration-1000 ${activeImageIndex === i ? 'scale-110' : 'group-hover:scale-105'}`} 
                          referrerPolicy="no-referrer"
                        />
                        {activeImageIndex !== i && (
                          <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-20 pt-10 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Rosario, Argentina</span>
                    </div>
                    <motion.button
                      whileHover={{ x: -10 }}
                      onClick={() => setSelectedId(null)}
                      className="flex items-center gap-3 text-stone-900 font-black uppercase tracking-[0.3em] text-[10px] hover:text-primary transition-all"
                    >
                      <ArrowLeft size={16} /> Volver
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen selection:bg-primary selection:text-white bg-stone-50">
        <CustomCursor />
        <BackgroundElements />
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
          style={{ scaleX }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
