<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="bg-black text-white min-h-screen">
    <!-- Partículas de fondo -->
    <div id="particles-js" class="fixed inset-0 z-0"></div>

    <!-- Cursor personalizado -->
    <div ref="cursor" class="custom-cursor"></div>
    <div ref="cursorDot" class="cursor-dot"></div>

    <!-- Navegación -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-opacity-50 bg-black backdrop-blur-md">
      <div class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <div class="hidden md:flex space-x-4 items-center ">
            <a v-for="item in navItems" :key="item" :href="`#${item.toLowerCase()}`" 
               class="nav-item text-white hover:text-purple-400 transition-colors duration-300">
              {{ t(item) }}
            </a>
            <button @click="toggleLanguage" class="language-toggle p-2 rounded-full bg-purple-600 text-white">
              {{ currentLanguage === 'es' ? 'EN' : 'ES' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section con Parallax -->
    <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <h1 v-animateonscroll="{
          enterClass: 'animate__animated animate__zoomIn',
          leaveClass: 'animate__animated animate__zoomOut'
        }" class="text-5xl md:text-7xl font-bold mb-4 text-center animate-text-gradient">
          {{ t('hello') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{ t('yourName') }}</span>
        </h1>
        <p v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeInUp',
          leaveClass: 'animate__animated animate__fadeOutDown'
        }" class="text-xl md:text-2xl mb-8 text-center">
          {{ t('jobTitle') }}
        </p>
        <div v-animateonscroll="{
          enterClass: 'animate__animated animate__zoomIn',
          leaveClass: 'animate__animated animate__zoomOut'
        }" class="text-center">
          <a href="#proyectos" class="inline-block px-8 py-3 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 rounded-full animate-pulse">
            {{ t('viewProjects') }}
          </a>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div class="parallax-bg"></div>
    </section>

    <!-- Sección: Conóceme Mejor -->
    <section id="conoceme" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeIn',
          leaveClass: 'animate__animated animate__fadeOut'
        }" class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('knowMeBetter') }}
        </h2>
        <div class="grid md:grid-cols-1 gap-12 text-center">
          <div v-animateonscroll="{
            enterClass: 'animate__animated animate__zoomIn',
            leaveClass: 'animate__animated animate__zoomOut'
          }" class="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h3 class="text-2xl font-bold mb-4 text-purple-400">{{ t('myStory') }}</h3>
            <p class="text-gray-300">{{ t('myStoryText') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Misión y Visión Section -->
    <section id="mision-vision" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12">
          <div ref="missionRef" :class="{ 'animate__animated animate__fadeIn': isMissionVisible }" 
               class="mission bg-purple-900 bg-opacity-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 backdrop-blur-md">
            <h2 class="text-3xl font-bold mb-4 text-purple-400">{{ t('mission') }}</h2>
            <p class="text-gray-300">{{ t('missionText') }}</p>
          </div>
          <div ref="visionRef" :class="{ 'animate__animated animate__fadeIn': isVisionVisible }" 
               class="vision bg-pink-900 bg-opacity-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 backdrop-blur-md">
            <h2 class="text-3xl font-bold mb-4 text-pink-400">{{ t('vision') }}</h2>
            <p class="text-gray-300">{{ t('visionText') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Proyectos Section con Carrusel Creativo y Automático -->
    <section id="proyectos" ref="proyectosSection" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeIn',
          leaveClass: 'animate__animated animate__fadeOut'
        }" class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('myProjects') }}
        </h2>
        <div class="relative">
          <transition-group 
            name="carousel" 
            tag="div" 
            class="flex justify-center items-center"
          >
            <div v-for="(project, index) in visibleProjects" :key="project.id" 
                 class="project-card absolute w-full md:w-2/3 lg:w-1/2 bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-450"
                 :style="{ zIndex: 3 - index, opacity: 1 - (index * 0.2), height: '450px' }"
                 :class="{ 
                   'scale-100': index === 0, 
                   'scale-95 -translate-x-4': index === 1, 
                   'scale-90 -translate-x-8': index === 2 
                 }"
                 @mouseenter="hoveredProjectId = project.id"
                 @mouseleave="hoveredProjectId = null">
              <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
              <div class="p-6 flex flex-col h-full">
                <h3 class="text-xl font-bold mb-2 text-purple-400">{{ project.title }}</h3>
                <p class="text-gray-400 mb-4 transition-opacity duration-300 ease-in-out overflow-y-auto max-h-42"
                   :class="{ 'opacity-100': hoveredProjectId === project.id, 'opacity-0': hoveredProjectId !== project.id }">
                  {{ project.description }}
                </p>
                <a :href="project.link" target="_blank" 
                   class="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300 mt-auto">
                  {{ t('viewProject') }}
                </a>
              </div>
            </div>
          </transition-group>
          <button @click="prevProject" class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
          <button @click="nextProject" class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>

    <!-- Habilidades Section -->
    <section id="habilidades" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeIn',
          leaveClass: 'animate__animated animate__fadeOut'
        }" class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('mySkills') }}
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div v-for="(skill, index) in skills" :key="index" 
               v-animateonscroll="{
                 enterClass: 'animate__animated animate__zoomIn',
                 leaveClass: 'animate__animated animate__zoomOut'
               }"
               class="skill-item text-center p-4 bg-gray-900 rounded-lg transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center">
            <div class="skill-icon mb-2 text-3xl text-purple-500">
              <component :is="skill.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-sm font-bold text-white">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Habilidades Blandas Section -->
    <section id="habilidades-blandas" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeIn',
          leaveClass: 'animate__animated animate__fadeOut'
        }" class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('HabilidadesBlandas') }}
        </h2>
        <div class="flex justify-center space-x-8">
          <div v-for="(skill, index) in softSkills" :key="index" 
               v-animateonscroll="{
                 enterClass: 'animate__animated animate__zoomIn',
                 leaveClass: 'animate__animated animate__zoomOut'
               }"
               class="skill-item text-center p-6 bg-gray-900 rounded-full w-40 h-40 transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center">
            <div class="skill-icon mb-3 text-4xl text-purple-500">
              <i :class="skill.icon"></i>
            </div>
            <h3 class="text-sm font-bold text-white">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Nueva sección de Reconocimientos -->
    <section id="reconocimientos" class="py-20 relative overflow-hidden bg-gray-900">
      <div class="container mx-auto px-6">
        <h2 v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeIn',
          leaveClass: 'animate__animated animate__fadeOut'
        }" class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('acknowledgments') }}
        </h2>
        <div class="relative h-80">
          <transition-group name="fade" tag="div">
            <div v-for="(ack, index) in acknowledgments" :key="ack.name"
                 v-show="index === currentAcknowledgment"
                 class="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 rounded-lg p-6 text-center">
              <h3 class="text-2xl font-semibold mb-2 text-white">{{ ack.name }}</h3>
              <p class="text-purple-400 mb-4">{{ ack.role }}</p>
              <p class="text-gray-300">{{ ack.message }}</p>
            </div>
          </transition-group>
        </div>
        <div class="flex justify-center mt-8">
          <button v-for="(_, index) in acknowledgments" :key="index"
                  @click="currentAcknowledgment = index"
                  :class="[
                    'w-3 h-3 rounded-full mx-1',
                    index === currentAcknowledgment ? 'bg-purple-500' : 'bg-gray-500'
                  ]">
          </button>
        </div>
      </div>
    </section>

    <!-- Terminal Section Mejorada -->
    <section id="terminal" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 v-animateonscroll="{
          enterClass: 'animate__animated animate__fadeIn',
          leaveClass: 'animate__animated animate__fadeOut'
        }" class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('terminal') }}
        </h2>
        <div class="terminal-container bg-gray-900 rounded-lg p-4 shadow-lg">
          <div class="terminal-header flex justify-between items-center mb-2">
            <div class="flex space-x-2">
              <div  class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="text-gray-400 text-sm">bash</div>
          </div>
          <div class="terminal-body font-mono text-sm h-64 overflow-y-auto">
            <div v-for="(line, index) in terminalLines" :key="index" class="mb-1">
              <span class="text-green-400">$</span> 
              <span v-html="line"></span>
            </div>
            <div class="flex items-center">
              <span class="text-green-400">$</span> 
              <input v-model="terminalInput" @keyup.enter="executeCommand" 
                     class="ml-2 bg-transparent outline-none flex-grow text-green-400" 
                     type="text" :placeholder="t('enterCommand')">
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="flex justify-center bottom- -5px">
      <img src="../assets/logoSinfondo.png" alt="Logo" class="max-w-full h-auto">
    </div>
    <div class="flex justify-center">
        <a href="#" class="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300 text-center">
            {{ t('myPortfolio') }}
        </a>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 py-8">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p  class="text-gray-400 mb-4 md:mb-0">{{ t('copyright') }}</p>
          <div class="flex space-x-4">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" 
               :aria-label="social.name"
               class="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              <component :is="social.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { SunIcon, MoonIcon, PaintBrushIcon, DevicePhoneMobileIcon, ServerIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-vue-next';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'animate.css';

const isDarkMode = ref(true);
const cursor = ref(null);
const cursorDot = ref(null);
const currentLanguage = ref('es');
const missionRef = ref(null);
const visionRef = ref(null);
const isMissionVisible = ref(false);
const isVisionVisible = ref(false);
const proyectosSection = ref(null);
const isProjectsSectionVisible = ref(false);
const hoveredProjectId = ref(null);

useIntersectionObserver(missionRef, ([{ isIntersecting }]) => {
  isMissionVisible.value = isIntersecting;
});

useIntersectionObserver(visionRef, ([{ isIntersecting }]) => {
  isVisionVisible.value = isIntersecting;
});

useIntersectionObserver(proyectosSection, ([{ isIntersecting }]) => {
  isProjectsSectionVisible.value = isIntersecting;
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es';
};

const t = computed(() => {
  const translations = {
    es: {
      myPortfolio: 'Codificando sueños linea a linea',
      hello: 'Hola, soy',
      yourName: 'Ana Valentina Castro',
      jobTitle: 'Desarrolladora FullStack junior',
      viewProjects: 'Ver Proyectos',
      mission: 'Mi misión',
      missionText: 'Mi misión es crear soluciones digitales innovadoras que mejoren la vida de las personas y transformen la manera en que interactuamos con la tecnología.',
      vision: 'Mi visión',
      visionText: 'Mi visión es ser un líder en el desarrollo de experiencias digitales intuitivas y accesibles, contribuyendo al avance tecnológico de manera ética y sostenible.',
      myProjects: 'Mis Proyectos',
      viewProject: 'Ver Proyecto',
      mySkills: 'Mis habilidades duras',
      HabilidadesBlandas: 'Mis Habilidades blandas',
      contactMe: 'Contactame',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      sendMessage: 'Enviar Mensaje',
      copyright: '© 2023 Ana Valentina Castro. Todos los derechos reservados.',
      inicio: 'Inicio',
      proyectos: 'Proyectos',
      habilidades: 'Habilidades',
      contacto: 'Contacto',
      terminal: 'Terminal Interactiva',
      knowMeBetter: 'Sobre mi',
      myStoryText: 'Desarrolladora junior con experiencia en diversos proyectos, fomentando la creatividad, el trabajo en equipo y la pasión por resolver problemas. Motivada para contribuir en proyectos impactantes que beneficien a la sociedad y promuevan el crecimiento personal y profesional.',
      enterCommand: 'Ingresa un comando...',
      aboutMeTerminal: 'Soy una desarrolladora apasionada por crear soluciones innovadoras que mejoren la vida de las personas. Me encanta aprender nuevas tecnologías y enfrentar desafíos.',
      skillsTerminal: 'Mis habilidades incluyen: JavaScript, Vue.js, Node.js, Python, SQL, y más. Siempre estoy aprendiendo y mejorando mis habilidades.',
      aboutCommand: 'Desarrolladora junior con experiencia en diversos proyectos, fomentando la creatividad, el trabajo en equipo y la pasión por resolver problemas. Motivada para contribuir en proyectos impactantes que beneficien a la sociedad y promuevan el crecimiento personal y profesional.',
      skillsCommand: 'Mis habilidades incluyen: liderazgo, creatividad, proactividad, JavaScript, Vue, MongoDB, MySQL, entre otras.',
      acknowledgments: 'Reconocimientos',
    },
    en: {
      myPortfolio: 'Coding dreams line by line',
      hello: 'Hello, I\'m',
      yourName: 'Ana Valentina Castro',
      jobTitle: 'Junior Fullstack developer',
      viewProjects: 'View Projects',
      mission: 'My mission',
      missionText: 'My mission is to create innovative digital solutions that improve people\'s lives and transform the way we interact with technology.',
      vision: 'My vision',
      visionText: 'My vision is to be a leader in developing intuitive and accessible digital experiences, contributing to technological advancement in an ethical and sustainable manner.',
      myProjects: 'My Projects',
      viewProject: 'View Project',
      mySkills: 'My hard skills',
      HabilidadesBlandas: 'My soft skills',
      contactMe: 'Contact Me',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      sendMessage: 'Send Message',
      copyright: '© 2023 Ana Valentina Castro. All rights reserved.',
      inicio: 'Home',
      proyectos: 'Projects',
      habilidades: 'Skills',
      contacto: 'Contact',
      terminal: 'Interactive Terminal',
      knowMeBetter: 'Get to Know Me Better',
      myStory: 'About me',
      myStoryText: 'Young junior developer with diverse project experience, fostering creativity, teamwork, and problem-solving passion. Motivated to contribute to impactful projects that benefit society and advance personal and professional growth.',
      enterCommand: 'Enter a command...',
      aboutMeTerminal: 'I\'m a developer passionate about creating innovative solutions that improve people\'s lives. I love learning new technologies and facing challenges.',
      skillsTerminal: 'My skills include: JavaScript, Vue.js, Node.js, Python, SQL, and more. I\'m always learning and improving my skills.',
      aboutCommand: 'Young junior developer with diverse project experience, fostering creativity, teamwork, and problem-solving passion. Motivated to contribute to impactful projects that benefit society and advance personal and professional growth.',
      skillsCommand: 'My skills include: leadership, creativity, proactivity, JavaScript, Vue, MongoDB, MySQL, among others.',
      acknowledgments: 'Acknowledgments',
    }
  };
  return (key) => translations[currentLanguage.value][key];
});

const navItems = ['inicio', 'proyectos', 'habilidades', 'contacto'];

const projects = [
  { id: 1, title: 'Eccomerce-Campus', description: 'Este proyecto permite visualizar productos, buscar por categorías, ver descripciones y elegir tallas. Además, gestiona un carrito de compras que calcula el total y facilita el checkout.', image: '/placeholder.svg?height=300&width=400', link: '#' },
  { id: 2, title: 'ToDoList', description: 'Este proyecto de to-do list permite agregar, eliminar y marcar tareas como completadas, mostrando la fecha y hora en tiempo real.', image: '/placeholder.svg?height=300&width=400', link: '#' },
  { id: 3, title: 'Menu', description: 'En mis inicios con HTML y CSS, creé una landing page para un menú de restaurante. La página muestra todos los productos y sus descripciones, lo que me ayudó a aprender a diseñar información de manera atractiva.', image: '/placeholder.svg?height=300&width=400', link: '#' },
  { id: 4, title: 'CineCampus', description: 'Este proyecto, desarrollado con Node.js, es una aplicación de cine que incluye APIs y front-end. Permite a los usuarios ver películas, leer descripciones y consultar la disponibilidad de asientos, lo que me dio una gran experiencia en desarrollo full-stack.', image: '/placeholder.svg?height=300&width=400', link: '#' },
  { id: 5, title: 'Space X', description: 'En este proyecto, utilizamos JavaScript para consumir la API de SpaceX, poniendo en práctica nuestra creatividad y  explorar datos espaciales e integrar APIs de manera efectiva.', image: '/placeholder.svg?height=300&width=400', link: '#' },
];

const currentIndex = ref(0);
const autoSlideInterval = ref(null);

const visibleProjects = computed(() => {
  const projectCount = projects.length;
  return [
    projects[currentIndex.value],
    projects[(currentIndex.value + 1) % projectCount],
    projects[(currentIndex.value + 2) % projectCount]
  ];
});

const nextProject = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length;
};

const prevProject = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length;
};

const startAutoSlide = () => {
  stopAutoSlide();
  autoSlideInterval.value = setInterval(() => {
    nextProject();
  }, 5000); // Cambia de proyecto cada 5 segundos
};

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
  }
};

watch(isProjectsSectionVisible, (newValue) => {
  if (newValue) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
});

const skills = [
  { name: 'JavaScript', icon: 'i-logos-javascript' },
  { name: 'Vue.js', icon: 'i-logos-vue' },
  { name: 'React', icon: 'i-logos-react' },
  { name: 'Node.js', icon: 'i-logos-nodejs' },
  { name: 'Python', icon: 'i-logos-python' },
  { name: 'HTML5', icon: 'i-logos-html-5' },
  { name: 'CSS3', icon: 'i-logos-css-3' },
  { name: 'Git', icon: 'i-logos-git-icon' },
  { name: 'MongoDB', icon: 'i-logos-mongodb' },
  { name: 'SQL', icon: 'i-logos-mysql' },
];

const softSkills = [
  { name: 'Comunicación', icon: 'pi pi-comments' },
  { name: 'Trabajo en equipo', icon: 'pi pi-users' },
  { name: 'Resolución de problemas', icon: 'pi pi-cog' },
];

const socialLinks = [
  { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/valentina-26?tab=repositories' },
  { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://www.linkedin.com/in/valentina-castro-b0630b319/' },
];

const updateCursor = (e) => {
  if (cursor.value && cursorDot.value) {
    cursor.value.style.left = e.clientX + 'px';
    cursor.value.style.top = e.clientY + 'px';
    cursorDot.value.style.left = e.clientX + 'px';
    cursorDot.value.style.top = e.clientY + 'px';
  }
};

// Terminal logic
const terminalLines = ref(['Bienvenido a mi terminal interactiva. Escribe "help" para ver los comandos disponibles.']);
const terminalInput = ref('');

const executeCommand = () => {
  const command = terminalInput.value.trim().toLowerCase();
  terminalLines.value.push(`$ ${command}`);
  
  switch (command) {
    case 'help':
      terminalLines.value.push('Comandos disponibles:');
      terminalLines.value.push('- cv: Mi hoja de vida');
      terminalLines.value.push('- contact: Contacto');
      terminalLines.value.push('- clear: Limpiar la terminal');
      break;

    case 'cv':
      terminalLines.value.push('Mostrando link de mi hoja de vida...');
      setTimeout(() => {
        terminalLines.value.push('<a href="https://www.canva.com/design/DAGBrY_47fM/5dhdsxs_siGcFZxXrJLlBg/edit?utm_content=DAGBrY_47fM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" class="text-blue-500 hover:underline">Ver mi hoja de vida</a>');
      }, 1000);
      break;

    case 'contact':
      window.open('mailto:acastrosandova3@gmail.com', '_blank');
      terminalLines.value.push('Abriendo su cliente de correo electrónico...');
      break;

    case 'clear':
      terminalLines.value = [];
      break;

    default:
      terminalLines.value.push(`Comando no reconocido: ${command}. Escribe 'help' para ver los comandos disponibles.`);
  }

  terminalInput.value = '';
  nextTick(() => {
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
};

// Nueva sección de Reconocimientos
const acknowledgments = [
  { name: 'John Doe', role: 'Mentor', message: 'Por guiarme a través de las complejidades del desarrollo web.' },
  { name: 'Jane Smith', role: 'Colega', message: 'Por ser una increíble compañera de programación en pareja.' },
  { name: 'Universidad Tecnológica', role: 'Institución', message: 'Por proporcionar una base sólida en ciencias de la computación.' },
  { name: 'Comunidad Open Source', role: 'Comunidad', message: 'Por los innumerables recursos y apoyo.' },
  { name: 'Mi Familia', role: 'Sistema de Apoyo', message: 'Por su inquebrantable fe en mis habilidades.' },
];

const currentAcknowledgment = ref(0);

const changeAcknowledgment = () => {
  currentAcknowledgment.value = (currentAcknowledgment.value + 1) % acknowledgments.length;
};

onMounted(() => {
  document.addEventListener('mousemove', updateCursor);

  // Inicializar partículas
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });

  // Iniciar el cambio automático de reconocimientos
  setInterval(changeAcknowledgment, 5000);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursor);
  stopAutoSlide();
});
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';
@import 'animate.css';
@import 'primevue/resources/themes/lara-light-indigo/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css'; 

body {
  font-family: 'Arial', sans-serif;
  background-color: black;
  color: white;
}

.custom-cursor {
  width: 40px;
  height: 40px;
  border: 2px solid #8B5CF6;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translate(-50%, -50%);
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: #8B5CF6;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transition: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translate(-50%, -50%);
}

.animate-text-gradient {
  background-image: linear-gradient(45deg, #8B5CF6, #EC4899, #3B82F6, #10B981);
  background-size: 300% 300%;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 8s linear infinite;
}

@keyframes shine {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.nav-item {
  position: relative;
  overflow: hidden;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #8B5CF6;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.nav-item:hover::after {
  transform: translateX(0);
}

.project-card, .skill-item {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.project-card:hover, .skill-item:hover {
  transform: translateY(-15px) scale(1.05) rotate(2deg);
  box-shadow: 0 15px 30px rgba(139, 92, 246, 0.3);
}

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.animate__animated {
  --animate-duration: 1s;
}

.terminal-container {
  max-height: 300px;
  overflow-y: auto;
}

.terminal-body {
  height: 200px;
  overflow-y: auto;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.terminal-body::-webkit-scrollbar-thumb {
  background-color: #4a4a4a;
  border-radius: 4px;
}

.terminal-body::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/placeholder.svg?height=1080&width=1920');
  background-size: cover;
  background-position: center;
  transform: translateZ(-1px) scale(2);
  z-index: -1;
}

.terminal-body a {
  color: #3b82f6;
  text-decoration: underline;
}

.terminal-body a:hover {
  text-decoration: none;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.5s ease;
}

.carousel-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.carousel-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.9);
}

.project-card {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.project-card p {
  transition: opacity 0.3s ease-in-out;
  overflow-y: auto;
  max-height: 120px; /* Ajusta este valor según sea necesario */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>