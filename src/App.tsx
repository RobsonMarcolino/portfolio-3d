import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';
import {
  Code2,
  ExternalLink,
  GitFork,
  Github,
  Linkedin,
  Mail,
  Menu,
  Star,
  X,
  MessageCircle,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import {
  createElement,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

/* ── CONFIG ─────────────────────────────────────────── */
const githubUser = 'RobsonMarcolino';

/* ── PROJECTS DATA (from reference site) ─────────────── */
type ProjectData = {
  id: number;
  name: string;
  displayName: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  homepage: string | null;
  topics: string[];
  image: string;
  video?: string;
};

const projectsData: ProjectData[] = [
  {
    id: 1,
    name: 'Nexus-store',
    displayName: 'Nexus Store',
    html_url: 'https://github.com/RobsonMarcolino/Nexus-store',
    description:
      'E-commerce de tecnologia com design futurista. Interface interativa com catálogo de produtos, carrinho de compras e sistema de pagamento.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    homepage: null,
    topics: ['react', 'typescript', 'tailwind', 'e-commerce'],
    image:
      'https://raw.githubusercontent.com/RobsonMarcolino/Portfolio_Dev/main/NexusStore.png',
  },
  {
    id: 2,
    name: 'ConectaDoa',
    displayName: 'ConectaDoa',
    html_url: 'https://github.com/RobsonMarcolino/ConectaDoa',
    description:
      'Plataforma que conecta doadores a instituições que precisam de apoio. Sistema completo com cadastro, busca e gestão de doações.',
    language: 'Next.js',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    homepage: null,
    topics: ['next.js', 'firebase', 'social-impact', 'fullstack'],
    image:
      'https://raw.githubusercontent.com/RobsonMarcolino/Portfolio_Dev/main/ConectaDoa.png',
  },
  {
    id: 3,
    name: 'MecChill',
    displayName: 'MecChill',
    html_url: 'https://github.com/RobsonMarcolino/MecChill',
    description:
      'Aplicação para oficinas mecânicas com agendamento inteligente, controle de serviços e relatórios de manutenção veicular.',
    language: 'Node.js',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    homepage: null,
    topics: ['node.js', 'mongodb', 'express', 'api'],
    image:
      'https://raw.githubusercontent.com/RobsonMarcolino/Portfolio_Dev/main/MecChill.png',
  },
  {
    id: 4,
    name: 'MarvelStore',
    displayName: 'Marvel Store',
    html_url: 'https://github.com/RobsonMarcolino/MarvelStore',
    description:
      'Loja temática Marvel com integração à API oficial. Catálogo de personagens, quadrinhos e funcionalidades de compra imersivas.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    homepage: null,
    topics: ['react', 'api', 'marvel', 'frontend'],
    image:
      'https://raw.githubusercontent.com/RobsonMarcolino/Portfolio_Dev/main/MarvelStore.png',
  },
  {
    id: 5,
    name: 'RaioXApp',
    displayName: 'RaioX App',
    html_url: 'https://github.com/RobsonMarcolino/RaioXApp',
    description:
      'Chatbot com inteligência artificial para auxílio em diagnósticos. Interface conversacional moderna com análise de sintomas.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    homepage: null,
    topics: ['ai', 'chatbot', 'python', 'machine-learning'],
    image:
      'https://raw.githubusercontent.com/RobsonMarcolino/Portfolio_Dev/main/RaioXapp.jpeg',
    video: 'https://robsonmarcolino.github.io/PortfolioProffiss/assets/Video-Dozy24uK.mp4',
  },
  {
    id: 6,
    name: 'The-barber-Company',
    displayName: 'The Barber Company',
    html_url: 'https://github.com/RobsonMarcolino/The-barber-Company',
    description:
      'Site institucional para barbearia com sistema de agendamento online, galeria de cortes e integração com WhatsApp.',
    language: 'HTML/CSS',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    fork: false,
    homepage: null,
    topics: ['html', 'css', 'javascript', 'landing-page'],
    image:
      'https://raw.githubusercontent.com/RobsonMarcolino/Portfolio_Dev/main/TheBarber.png',
  },
];

const services = [
  {
    number: '01',
    name: 'Frontend',
    description:
      'Interfaces modernas, responsivas e performáticas com React, TypeScript, Tailwind CSS e foco real na experiência do usuário.',
  },
  {
    number: '02',
    name: 'Backend',
    description:
      'APIs, regras de negócio, autenticação, integrações e estruturas confiáveis para produtos digitais escalarem com clareza.',
  },
  {
    number: '03',
    name: 'Full Stack',
    description:
      'Desenvolvimento de ponta a ponta, conectando interface, servidor, banco de dados e deploy em uma entrega consistente.',
  },
  {
    number: '04',
    name: 'Automação',
    description:
      'Soluções para reduzir trabalho repetitivo, integrar sistemas e criar fluxos mais rápidos para equipes e negócios.',
  },
  {
    number: '05',
    name: 'Arquitetura',
    description:
      'Organização de código, componentização, padrões de projeto e bases técnicas pensadas para manutenção no longo prazo.',
  },
];

/* ── FADE-IN COMPONENT ──────────────────────────────── */
type FadeInProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

function FadeIn<T extends ElementType = 'div'>({
  as,
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  ...props
}: FadeInProps<T>) {
  const tag = as ?? 'div';
  const MotionTag = motion.create(tag);

  return createElement(
    MotionTag,
    {
      className,
      initial: { opacity: 0, x, y },
      whileInView: { opacity: 1, x: 0, y: 0 },
      viewport: { once: true, margin: '-50px', amount: 0.2 },
      transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
      ...props,
    },
    children,
  );
}

/* ── MAGNET EFFECT ──────────────────────────────────── */
type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const withinX =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding;
      const withinY =
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!withinX || !withinY) {
        setTransition(inactiveTransition);
        setTransform('translate3d(0, 0, 0)');
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const translateX = (event.clientX - centerX) / strength;
      const translateY = (event.clientY - centerY) / strength;

      setTransition(activeTransition);
      setTransform(`translate3d(${translateX}px, ${translateY}px, 0)`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTransition, inactiveTransition, padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform, transition, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

/* ── CONTACT BUTTON ─────────────────────────────────── */
function ContactButton() {
  return (
    <a
      href="#contact"
      className="contact-btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      <Mail aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5" />
      Fale Comigo
    </a>
  );
}

function LiveProjectButton() {
  return (
    <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-8 sm:py-3 sm:text-sm">
      Ver Projeto
      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
    </span>
  );
}

/* ── PORTRAIT IMAGE ─────────────────────────────────── */
function PortraitImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center rounded-3xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 text-center text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/60">
        Avatar 3D
      </div>
    );
  }

  return (
    <img
      src="/Imagem3D.png"
      alt="Avatar 3D do Robson"
      className="w-full select-none object-contain drop-shadow-[0_0_60px_rgba(182,0,168,0.3)]"
      onError={() => setHasError(true)}
    />
  );
}

/* ── FLOATING NAV ───────────────────────────────────── */
function FloatingNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsVisible(latest > 150);
    });
  }, [scrollY]);

  const navLinks = [
    ['Sobre', '#about'],
    ['Serviços', '#price'],
    ['Projetos', '#projects'],
    ['Contato', '#contact'],
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: -50, opacity: 0, x: '-50%' }}
          transition={{ duration: 0.3 }}
          className="fixed left-1/2 top-4 z-50 w-[90%] max-w-max sm:w-auto"
        >
          <nav className="flex items-center justify-between gap-8 rounded-full border border-[#D7E2EA]/15 bg-[#0C0C0C]/70 px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] shadow-[0_0_40px_rgba(182,0,168,0.15)] backdrop-blur-xl sm:justify-center sm:px-8 sm:py-3.5">
            {/* Desktop links */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map(([item, href]) => (
                <a
                  key={item}
                  href={href}
                  className="transition-colors hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile links logo/menu */}
            <div className="flex w-full min-w-[200px] items-center justify-between md:hidden">
              <span className="text-xs tracking-[0.25em] text-[#D7E2EA]/80">
                RM.DEV
              </span>
              <button
                onClick={onOpenMenu}
                className="text-[#D7E2EA] transition-opacity hover:opacity-70"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── MOBILE NAV ─────────────────────────────────────── */
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const links = [
    ['Sobre', '#about'],
    ['Serviços', '#price'],
    ['Projetos', '#projects'],
    ['Contato', '#contact'],
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C]/95 backdrop-blur-lg md:hidden"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-[#D7E2EA] transition-opacity hover:opacity-70"
            aria-label="Fechar menu"
          >
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {links.map(([item, href]) => (
              <a
                key={item}
                href={href}
                onClick={onClose}
                className="text-2xl font-medium uppercase tracking-[0.3em] text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              >
                {item}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── HERO BACKGROUND EFFECT ───────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid */}
      <div 
        className="absolute inset-0 opacity-100" 
        style={{
          backgroundImage: 'linear-gradient(rgba(215, 226, 234, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 226, 234, 0.08) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 80%)'
        }}
      />
      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(182,0,168,0.3),transparent_60%)] blur-[100px] rounded-full mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[0%] -right-[10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(0,119,255,0.25),transparent_60%)] blur-[100px] rounded-full mix-blend-screen"
      />
    </div>
  );
}

/* ── HERO SECTION ───────────────────────────────────── */
function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative flex h-[100svh] flex-col overflow-x-clip bg-[#0C0C0C]">
      <HeroBackground />
      <FloatingNav onOpenMenu={() => setMenuOpen(true)} />

      {/* Nav */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-20 flex items-center justify-between px-5 pt-5 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] sm:px-6 sm:pt-6 md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        {/* Desktop links */}
        <div className="hidden gap-8 md:flex lg:gap-12">
          {[
            ['Sobre', '#about'],
            ['Serviços', '#price'],
            ['Projetos', '#projects'],
            ['Contato', '#contact'],
          ].map(([item, href]) => (
            <a
              key={item}
              href={href}
              className="transition-opacity duration-200 hover:opacity-70"
            >
              {item}
            </a>
          ))}
        </div>
        {/* Mobile burger */}
        <button
          className="text-[#D7E2EA] md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-7 w-7" />
        </button>
        <span className="text-xs tracking-[0.25em] text-[#D7E2EA]/50 md:text-sm">
          RM.DEV
        </span>
      </FadeIn>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero title */}
      <div className="relative z-0 mt-4 w-full overflow-hidden px-2 sm:mt-2 md:-mt-5">
        <motion.h1
          initial={{ y: 40, opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading w-full whitespace-nowrap text-center text-[7vw] font-black uppercase leading-none tracking-tight sm:text-[7.5vw] md:text-[8vw] lg:text-[8.5vw]"
        >
          Olá, eu sou o Robson!
        </motion.h1>
      </div>

      {/* 3D Portrait */}
      <div className="absolute bottom-0 left-1/2 z-10 w-[240px] -translate-x-1/2 sm:w-[320px] md:w-[400px] lg:w-[480px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3}>
            <PortraitImage />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom content */}
      <div className="relative z-20 mt-auto flex flex-col gap-4 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[200px] text-[clamp(0.7rem,1.4vw,1.3rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            Desenvolvedor de software criando aplicações modernas, interfaces
            fluidas e soluções digitais eficientes
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="flex flex-col items-end gap-4">
            <ContactButton />
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <FadeIn
        delay={1}
        y={10}
        className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-[#D7E2EA]/40" />
      </FadeIn>
    </section>
  );
}

/* ── REPO TILE (Marquee) ────────────────────────────── */
function RepoTile({ repo }: { repo: ProjectData }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-[220px] w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#D7E2EA]/20 bg-[#111111] transition-all duration-300 hover:border-[#D7E2EA]/50 hover:shadow-[0_0_30px_rgba(182,0,168,0.15)] sm:h-[250px] sm:w-[340px] md:h-[270px] md:w-[420px]"
      aria-label={`Visualizar projeto ${repo.displayName}`}
    >
      {/* Background Image Only */}
      <img
        src={repo.image}
        alt={repo.displayName}
        className="absolute inset-0 h-full w-full object-cover object-top opacity-100 transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </a>
  );
}

/* ── MARQUEE SECTION ────────────────────────────────── */
function MarqueeRow({
  repos,
  direction,
}: {
  repos: ProjectData[];
  direction: 'right' | 'left';
}) {
  const repeated = [...repos, ...repos, ...repos];
  return (
    <div className="flex gap-3" data-marquee-row={direction}>
      {repeated.map((repo, index) => (
        <RepoTile key={`${repo.id}-${index}`} repo={repo} />
      ))}
    </div>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-400, 200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [100, -500]);

  const midpoint = Math.ceil(projectsData.length / 2);
  const firstRow = projectsData.slice(0, midpoint);
  const secondRow = projectsData.slice(midpoint);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-16 sm:pt-24 md:pt-32"
    >
      <div className="flex flex-col gap-3">
        <motion.div style={{ x: x1, willChange: 'transform' }}>
          <MarqueeRow repos={firstRow} direction="right" />
        </motion.div>
        <motion.div style={{ x: x2, willChange: 'transform' }}>
          <MarqueeRow repos={secondRow} direction="left" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── ANIMATED TEXT (About) ──────────────────────────── */
function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.15);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span className="inline" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className="max-w-[90vw] text-center text-[clamp(0.95rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA] sm:max-w-[560px]"
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <AnimatedWord
            word={word}
            index={index}
            total={words.length}
            scrollYProgress={scrollYProgress}
          />
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}

/* ── ABOUT DECORATIONS ──────────────────────────────── */
const aboutDecor = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    className:
      'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[80px] sm:w-[130px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    className:
      'bottom-[8%] left-[2%] sm:left-[4%] md:left-[10%] w-[70px] sm:w-[110px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    className:
      'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[80px] sm:w-[130px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    className:
      'bottom-[8%] right-[2%] sm:right-[4%] md:right-[10%] w-[90px] sm:w-[140px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

/* ── ABOUT SECTION ──────────────────────────────────── */
function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-16 sm:px-8 sm:py-20 md:px-10"
    >
      {/* Ambient gradient backgrounds */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-[#B600A8]/8 to-transparent blur-3xl sm:h-[400px] sm:w-[400px]" />
        <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-gradient-to-tl from-[#BE4C00]/8 to-transparent blur-3xl sm:h-[400px] sm:w-[400px]" />
      </div>

      {/* Figma decorative images */}
      {aboutDecor.map((item) => (
        <FadeIn
          key={item.src}
          delay={item.delay}
          duration={0.9}
          x={item.x}
          y={0}
          className={`pointer-events-none absolute z-0 ${item.className}`}
        >
          <img
            src={item.src}
            alt=""
            loading="lazy"
            className="w-full object-contain opacity-90"
          />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(2.5rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            Sobre mim
          </h2>
        </FadeIn>
        <div className="flex flex-col items-center gap-10 sm:gap-16 md:gap-20">
          <AnimatedText text="Sou Robson, desenvolvedor de software focado em criar produtos digitais modernos, rápidos e bem estruturados. Trabalho unindo código limpo, experiência do usuário e boas práticas para transformar ideias em aplicações reais. Vamos construir algo incrível juntos!" />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES SECTION ───────────────────────────────── */
function ServicesSection() {
  return (
    <section
      id="price"
      className="rounded-t-[30px] bg-white px-5 py-16 sm:rounded-t-[40px] sm:px-8 sm:py-20 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2 className="mb-10 text-center text-[clamp(2.5rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-16 md:mb-28">
        Serviços
      </h2>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.08}
            className="flex flex-col gap-3 border-t border-[rgba(12,12,12,0.15)] py-6 last:border-b sm:grid sm:grid-cols-[minmax(80px,0.3fr)_1fr] sm:items-center sm:gap-5 sm:py-8 md:py-12"
          >
            <span className="text-[clamp(2rem,8vw,140px)] font-black leading-none text-[#0C0C0C]">
              {service.number}
            </span>
            <div>
              <h3 className="mb-2 text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase text-[#0C0C0C] sm:mb-3">
                {service.name}
              </h3>
              <p className="max-w-2xl text-[clamp(0.8rem,1.5vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C] opacity-60">
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── PROJECT CARD (Stacked) ─────────────────────────── */
function ProjectCard({
  repo,
  index,
  total,
}: {
  repo: ProjectData;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] w-full flex items-start justify-center top-24 md:top-32"
      style={{ top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.article
        style={{ scale }}
        className="w-full h-[85vh] max-h-[900px] flex flex-col origin-top overflow-hidden rounded-[40px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-4 shadow-2xl sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 md:mb-8">
          <span className="text-[clamp(2rem,8vw,100px)] font-black leading-none text-[#D7E2EA]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0 flex-1 sm:min-w-[180px]">
            <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm md:text-base">
              {repo.language}
            </p>
            <h3 className="text-[clamp(1.2rem,3.5vw,3.5rem)] font-black uppercase leading-none text-[#D7E2EA]">
              {repo.displayName}
            </h3>
          </div>
          <a href={repo.homepage || repo.html_url} target="_blank" rel="noreferrer">
            <LiveProjectButton />
          </a>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[40fr_60fr] h-full min-h-0">
          {/* Left column: About the project */}
          <div className="grid gap-3 text-[#D7E2EA] h-full min-h-0">
            <div className="flex flex-col justify-between rounded-[20px] border border-[#D7E2EA]/15 bg-[#D7E2EA]/5 p-4 sm:rounded-[30px] sm:p-6 md:rounded-[40px] h-full">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50 sm:text-sm mb-3 sm:mb-4">
                  Sobre o projeto
                </p>
                <p className="text-[clamp(0.85rem,1.4vw,1.25rem)] font-light leading-relaxed text-[#D7E2EA]/90">
                  {repo.description}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                {repo.topics.slice(0, 4).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-[#D7E2EA]/25 bg-[#0C0C0C]/80 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/80 backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Project screenshot or video */}
          <div className="relative flex h-[200px] flex-col justify-end overflow-hidden rounded-[20px] border border-[#D7E2EA]/15 sm:h-[250px] sm:rounded-[30px] md:h-full md:rounded-[50px]">
            {/* Screenshot or Video background */}
            {repo.video ? (
              <video
                src={repo.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : (
              <img
                src={repo.image}
                alt={repo.displayName}
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ── PROJECTS SECTION ───────────────────────────────── */
function ProjectsSection() {
  const featuredRepos = [
    projectsData[0], // Nexus Store
    projectsData[4], // RaioXApp
    projectsData[2], // MecChill
    projectsData[3], // Marvel Store
  ];

  return (
    <section
      id="projects"
      className="relative z-10 -mt-8 rounded-t-[30px] bg-[#0C0C0C] px-4 py-16 sm:-mt-10 sm:rounded-t-[40px] sm:px-6 sm:py-20 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2 className="hero-heading mb-10 text-center text-[clamp(2.5rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-16 md:mb-28">
        Projetos
      </h2>
      <div className="mx-auto max-w-7xl">
        {featuredRepos.map((repo, index) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
            index={index}
            total={featuredRepos.length}
          />
        ))}
      </div>
    </section>
  );
}

/* ── CONTACT SECTION ────────────────────────────────── */
function ContactSection() {
  const contactLinks = [
    {
      icon: <Github className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: 'GitHub',
      value: '@RobsonMarcolino',
      href: 'https://github.com/RobsonMarcolino',
    },
    {
      icon: <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: 'LinkedIn',
      value: 'Robson Marcolino',
      href: 'https://www.linkedin.com/in/robson-marcolino/?skipRedirect=true',
    },
    {
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: 'Email',
      value: 'robsonmarcolinodev@gmail.com',
      href: 'mailto:robsonmarcolinodev@gmail.com',
    },
    {
      icon: <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: 'WhatsApp',
      value: '(31) 98758-1510',
      href: 'https://wa.me/5531987581510?text=Ol%C3%A1!%20Vim%20pelo%20seu%20portf%C3%B3lio.',
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0C0C0C] px-5 py-16 sm:px-8 sm:py-24 md:px-10 md:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(182,0,168,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(190,76,0,0.08),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading mb-4 text-center text-[clamp(2.5rem,12vw,120px)] font-black uppercase leading-none tracking-tight sm:mb-6">
            Contato
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm font-light leading-relaxed text-[#D7E2EA]/60 sm:mb-16 sm:text-base md:text-lg">
            Vamos construir algo incrível juntos? Entre em contato por
            qualquer um dos canais abaixo.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {contactLinks.map((link, index) => (
            <FadeIn key={link.label} delay={0.15 + index * 0.08} y={20}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#D7E2EA]/15 bg-[#111111] p-5 text-[#D7E2EA] transition-all duration-300 hover:border-[#D7E2EA]/40 hover:bg-[#151515] hover:shadow-[0_0_30px_rgba(182,0,168,0.1)] sm:gap-5 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 text-[#D7E2EA]/70 transition-colors group-hover:border-[#D7E2EA]/40 group-hover:text-[#D7E2EA] sm:h-12 sm:w-12">
                  {link.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]/50 sm:text-xs">
                    {link.label}
                  </p>
                  <p className="truncate text-sm font-medium text-[#D7E2EA] sm:text-base">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#D7E2EA]/30 transition-all group-hover:text-[#D7E2EA]/70 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <p className="text-xs font-light tracking-widest text-[#D7E2EA]/40 sm:text-sm">
          © {new Date().getFullYear()} Robson Marcolino
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/RobsonMarcolino"
            target="_blank"
            rel="noreferrer"
            className="text-[#D7E2EA]/40 transition-colors hover:text-[#D7E2EA]"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/robsonmarcolino/"
            target="_blank"
            rel="noreferrer"
            className="text-[#D7E2EA]/40 transition-colors hover:text-[#D7E2EA]"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <a
            href="mailto:robsonmarcolinodev@gmail.com"
            className="text-[#D7E2EA]/40 transition-colors hover:text-[#D7E2EA]"
            aria-label="Email"
          >
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>
        <p className="text-[10px] font-light tracking-widest text-[#D7E2EA]/25 sm:text-xs">
          Feito com ♥ e muito café
        </p>
      </div>
    </footer>
  );
}

/* ── APP ────────────────────────────────────────────── */
export default function App() {
  return (
    <main className="min-h-screen w-full max-w-[100vw] bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
