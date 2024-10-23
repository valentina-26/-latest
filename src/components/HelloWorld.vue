<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="bg-black text-white min-h-screen">
    <!-- Background particles -->
    <div id="particles-js" class="fixed inset-0 z-0"></div>

    <!-- Custom cursor -->
    <div ref="cursor" class="custom-cursor"></div>
    <div ref="cursorDot" class="cursor-dot"></div>

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-opacity-50 bg-black backdrop-blur-md">
      <div class="container mx-auto px-6 py-3">
        <div class="flex justify-between items-center">
          <div class="hidden md:flex space-x-4 items-center">
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

    <!-- Hero Section with Parallax and Avatar -->
    <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center">
          <transition
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
          >
            <div class="relative mb-6 w-60 h-60">
              <!-- Neon border effect -->
              <div class="absolute inset-0 rounded-full bg-purple-800 blur-sm"></div>
              <div class="absolute inset-0 rounded-full bg-purple-500 blur-xs"></div>
              <!-- Image container -->
              <div class="relative rounded-full overflow-hidden z-10 w-full h-full">
                <img :src="avatarImage" alt="Avatar" class="w-full h-full object-cover" />
              </div>
            </div>
          </transition>
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
            <a href="#terminal" class="inline-block px-8 py-3 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 rounded-full animate-pulse">
              {{ t('viewProjects') }}
            </a>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
      <div class="parallax-bg"></div>
    </section>

    <!-- About Me Section -->
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

    <!-- Mission and Vision Section -->
    <section id="mision-vision" class="py-20 relative overflow-hidden text-center">
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

    <!-- Projects Section -->
    <section id="proyectos" ref="proyectosSection" class="py-40 relative overflow-hidden">
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
                 :style="{ zIndex: 3 - index, opacity: 1 - (index * 0.2), transform: `scale(${1 - index * 0.05}) translateX(${index * -4}%)` }">
              <a :href="project.link" target="_blank" class="block h-full">
                <img :src="project.image" :alt="project.title" class="w-full h-48 ">
                <div class="p-6 flex flex-col h-full">
                  <h3 class="text-xl font-bold mb-2 text-purple-400">{{ project.title }}</h3>
                  <p class="text-gray-400 mb-4 overflow-y-auto max-h-60">
                    {{ project.description }}
                  </p>
                </div>
              </a>
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

    <!-- Skills Section -->
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
              <div class="mb-6 rounded-full overflow-hidden neon-border">
                <img :src="skill.icon" :alt="skill.name" class="w-12 h-12 object-cover" />
              </div>
            </div>
            <h3 class="text-sm font-bold text-white">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Soft Skills Section -->
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

    <!-- Certificados Section -->
    <section id="reconocimientos" class="py-10 relative overflow-hidden bg-gray-900">
      <div class="container mx-auto px-4">
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

    <!-- Terminal Section -->
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
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div  class="w-3 h-3 rounded-full bg-yellow-500"></div>
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

    <div class="flex justify-center bottom-5">
      <img :src="logoImage" alt="Logo" class="max-w-full h-auto">
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
          <p class="text-gray-400 mb-4 md:mb-0">{{ t('copyright') }}</p>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';
import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-vue-next';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'animate.css';

// Import images
import avatarImage from '../assets/node.jpg';
import logoImage from '../assets/logoSinfondo.png';
import EccomerceImage from '../assets/eccomerce.png';
import ToDoListImage from '../assets/ToDoList.png';
import MenuImage from '../assets/menu.png';
import Cine from '../assets/cine.png';
import SpaceXImage from '../assets/SpaceX.png';


import express from '../assets/express.png';
import html from '../assets/html.png';
import java from '../assets/js.png';
import vue from '../assets/vue.png';
import css from '../assets/css.png';
import github from '../assets/git.webp';
import node from '../assets/1_bc9pmTiyKR0WNPka2w3e0Q.png';
import mongo from '../assets/mongo.png';
import python from '../assets/Python.svg.png';
import sql from '../assets/sql.png';



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
      yourName: 'Ana Valentina Castro Sandoval',
      jobTitle: 'Desarrolladora FullStack junior',
      viewProjects: 'Contactame',
      mission: 'Mi misión',
      missionText: 'Desarrollar soluciones creativas y eficientes, enfocadas en la tecnología, que mejoren la vida de las personas. Me destaco por mi energía, curiosidad y pasión por resolver problemas que marquen la diferencia.',
      vision: 'Mi visión',
      visionText: 'Convertirme en una desarrolladora líder, creando proyectos tecnológicos innovadores con impacto social. Quiero trabajar en empresas que compartan mi pasión por mejorar vidas, desarrollando habilidades avanzadas en programación, diseño de sistemas y trabajo en equipo, con una mentalidad de aprendizaje continuo',
      myProjects: 'Mis Proyectos',
      viewProject: 'Ver Proyecto',
      mySkills: 'Mis habilidades tecnicas',
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
      myStoryText: 'Motivada para contribuir a proyectos significativos que impacten positivamente a la sociedad, mientras impulso mi desarrollo personal y profesional. Mi enfoque está en la creación de soluciones innovadoras y en la colaboración efectiva dentro de equipos, siempre con el objetivo de generar un cambio tangible y mejorar la vida de las personas.',
      enterCommand: 'Ingresa un comando...',
      aboutMeTerminal: 'Soy una desarrolladora apasionada por crear soluciones innovadoras que mejoren la vida de las personas. Me encanta aprender nuevas tecnologías y enfrentar desafíos.',
      skillsTerminal: 'Mis habilidades incluyen: JavaScript, Vue.js, Node.js, Python, SQL, y más. Siempre estoy aprendiendo y mejorando mis habilidades.',
      aboutCommand: 'Desarrolladora junior con experiencia en diversos proyectos, fomentando la creatividad, el trabajo en equipo y la pasión por resolver problemas. Motivada para contribuir en proyectos impactantes que beneficien a la sociedad y promuevan el crecimiento personal y profesional.',
      skillsCommand: 'Mis habilidades incluyen: liderazgo, creatividad, proactividad, JavaScript, Vue, MongoDB, MySQL, entre otras.',
      acknowledgments: 'Certificados',
    },
    en: {
      myPortfolio: 'Coding dreams line by line',
      hello: 'Hello, I\'m',
      yourName: 'Ana Valentina Castro Sandoval',
      jobTitle: 'Junior Fullstack developer',
      viewProjects: 'View Projects',
      mission: 'My mission',
      missionText: 'Develop creative and efficient solutions, focused on technology, that improve peoples lives. I stand out for my energy, curiosity and passion for solving problems that make a difference.',
      vision: 'My vision',
      visionText: 'To become a leading developer, creating innovative technology projects with social impact. I want to work in companies that share my passion for improving lives, developing advanced skills in programming, system design and teamwork, with a continuous learning mentality.',
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
      myStoryText: 'Motivated to contribute to meaningful projects that positively impact society, while boosting my personal and professional development. My focus is on creating innovative solutions and effective collaboration within teams, always with the goal of generating tangible change and improving peoples lives.',
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

const projects = ref([
  { id: 1, title: 'Eccomerce-Campus', description: 'Este proyecto permite visualizar productos, buscar por categorías, ver descripciones y elegir tallas. Además, gestiona un carrito de compras que calcula el total y facilita el checkout.', image: EccomerceImage, link: 'https://github.com/valentina-26/ecommerCampusM1' },
  { id: 2, title: 'ToDoList', description: 'Este proyecto de to-do list permite agregar, eliminar y marcar tareas como completadas, mostrando la fecha y hora en tiempo real.', image: ToDoListImage, link: 'https://github.com/valentina-26/Todo-List' },
  { id: 3, title: 'Menu', description: 'En mis inicios con HTML y CSS, creé una landing page para un menú de restaurante. La página muestra todos los productos y sus descripciones, lo que me ayudó a aprender a diseñar información de manera atractiva.', image: MenuImage, link: 'https://github.com/valentina-26/proyectoWeb.' },
  { id: 4, title: 'CineCampus', description: 'Este proyecto, desarrollado con Node.js, es una aplicación de cine que incluye APIs y front-end. Permite a los usuarios ver películas, leer descripciones y consultar la disponibilidad de asientos, lo que me dio una gran experiencia en desarrollo full-stack.', image: Cine, link: 'https://github.com/valentina-26/cineCampus' },
  { id: 5, title: 'Space X', description: 'En este proyecto, utilizamos JavaScript para consumir la API de SpaceX, poniendo en práctica nuestra creatividad y  explorar datos espaciales e integrar APIs de manera efectiva.', image: SpaceXImage, link: 'https://github.com/valentina-26/SpaceX' },
]);

const currentIndex = ref(0);
const autoSlideInterval = ref(null);

const visibleProjects = computed(() => {
  const projectCount = projects.value.length;
  return [
    projects.value[currentIndex.value],
    projects.value[(currentIndex.value + 1) % projectCount],
    projects.value[(currentIndex.value + 2) % projectCount]
  ];
});

const nextProject = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length;
};

const prevProject = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
};

const startAutoSlide = () => {
  stopAutoSlide();
  autoSlideInterval.value = setInterval(() => {
    nextProject();
  }, 5000); // Change project every 5 seconds
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
  { name: 'JavaScript', icon: java },
  { name: 'Vue.js', icon: vue },
  { name: 'Express', icon: express },
  { name: 'Node.js', icon: node },
  { name: 'Python', icon: python },
  { name: 'HTML', icon: html },
  { name: 'CSS', icon: css },
  { name: 'Git', icon: github },
  { name: 'MongoDB', icon: mongo },
  { name: 'SQL', icon: sql },
];

const softSkills = [
  { name: 'Comunicación', icon: 'pi pi-comments' },
  { name: 'Trabajo en equipo', icon: 'pi pi-users' },
  { name: 'Resolución de problemas', icon: 'pi pi-cog' },
  { name: 'liderazgo', icon: 'pi-user' },
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

// Terminal 
const terminalLines = ref(['Bienvenido a mi terminal interactiva. Escribe "help" para ver los comandos que te permitiran contactarme']);
const terminalInput = ref('');

const executeCommand = () => {
  const command = terminalInput.value.trim().toLowerCase();
  terminalLines.value.push(`$ ${command}`);
  
  switch (command) {
    case 'help':
      terminalLines.value.push('Comandos disponibles:');
      terminalLines.value.push('- cv: Mi hoja de vida');
      terminalLines.value.push('- email: email');
      terminalLines.value.push('- linkedin: Linkedin');
      terminalLines.value.push('- clear: Limpiar la terminal');
      break;

    case 'cv':
      terminalLines.value.push('Mostrando link de mi hoja de vida...');
      setTimeout(() => {
        terminalLines.value.push('<a href="https://www.canva.com/design/DAGBrY_47fM/5dhdsxs_siGcFZxXrJLlBg/edit?utm_content=DAGBrY_47fM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" class="text-blue-500 hover:underline">Ver mi hoja de vida</a>');
      }, 1000);
      break;

    case 'email':
      window.open('mailto:acastrosandova3@gmail.com', '_blank');
      terminalLines.value.push('Abriendo su cliente de correo electrónico...');
      break;

    case 'linkedin':
    terminalLines.value.push('Mostrando link de mi Linkedin...');
      setTimeout(() => {
        terminalLines.value.push('<a href="https://www.linkedin.com/in/valentina-castro-b0630b319/" target="_blank" class="text-blue-500 hover:underline">Ver mi linkedin</a>');
      }, 1000);
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

// Acknowledgments section
const acknowledgments = [
  { name: 'Introduccion a Git', imagen:java },
  { name: 'Edicion de codigo mediante creacion de ramas y combinacion en Git',imagen:java },
  { name: 'Procedimientos para crear y modificar un proyecto de Git',imagen:java},
  { name: 'Colaboracion con Git',imagen:java },
  { name: 'centificado ef' ,imagen:java},
];

const currentAcknowledgment = ref(0);

const changeAcknowledgment = () => {
  currentAcknowledgment.value = (currentAcknowledgment.value + 1) % acknowledgments.length;
};

onMounted(() => {
  document.addEventListener('mousemove', updateCursor);

  // Initialize particles
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

  // Start automatic acknowledgment change
  setInterval(changeAcknowledgment, 4500);
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
  transition: all 0.25s cubic-bezier(0.60, -0.60, 0.270, 1.55);
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
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.blur-xs {
  filter: blur(15px);
}

.blur-sm {
  filter: blur(15px);
}
</style>