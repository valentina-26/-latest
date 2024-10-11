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
          <a href="#" class="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
            {{ t('myPortfolio') }}
          </a>
          <div class="hidden md:flex space-x-4 items-center">
            <a v-for="item in navItems" :key="item" :href="`#${item.toLowerCase()}`" 
               class="nav-item text-white hover:text-purple-400 transition-colors duration-300">
              {{ t(item) }}
            </a>
            <button @click="toggleDarkMode" class="theme-toggle p-2 rounded-full bg-purple-600 text-white">
              <SunIcon v-if="isDarkMode" class="w-5 h-5" />
              <MoonIcon v-else class="w-5 h-5" />
            </button>
            <button @click="toggleLanguage" class="language-toggle p-2 rounded-full bg-purple-600 text-white">
              {{ currentLanguage === 'es' ? 'EN' : 'ES' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-4 text-center animate-text-gradient">
          {{ t('hello') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{ t('yourName') }}</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-center">{{ t('jobTitle') }}</p>
        <div class="text-center">
          <a href="#proyectos" class="inline-block px-8 py-3 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 rounded-full animate-pulse">
            {{ t('viewProjects') }}
          </a>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
    </section>

    <!-- Misión y Visión Section -->
    <section id="mision-vision" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="mission bg-purple-900 bg-opacity-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 backdrop-blur-md">
            <h2 class="text-3xl font-bold mb-4 text-purple-400">{{ t('mission') }}</h2>
            <p class="text-gray-300">{{ t('missionText') }}</p>
          </div>
          <div class="vision bg-pink-900 bg-opacity-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300 backdrop-blur-md">
            <h2 class="text-3xl font-bold mb-4 text-pink-400">{{ t('vision') }}</h2>
            <p class="text-gray-300">{{ t('visionText') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Proyectos Section -->
    <section id="proyectos" class="py-20 relative">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('myProjects') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(project, index) in projects" :key="index" 
               class="project-card bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-purple-400">{{ project.title }}</h3>
              <p class="text-gray-400 mb-4">{{ project.description }}</p>
              <a :href="project.link" target="_blank" 
                 class="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-300">
                {{ t('viewProject') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Habilidades Section -->
    <section id="habilidades" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('mySkills') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(skill, index) in skills" :key="index" 
               class="skill-item text-center p-6 bg-gray-900 rounded-lg transform hover:scale-110 transition-all duration-300">
            <div class="skill-icon mb-4 text-5xl text-purple-500">
              <component :is="skill.icon" />
            </div>
            <h3 class="text-xl font-bold text-white">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

        <!-- Habilidades Section -->
        <section id="habilidades" class="py-20 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('HabilidadesBlandas') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(skill, index) in skills" :key="index" 
               class="skill-item text-center p-6 bg-gray-900 rounded-lg transform hover:scale-110 transition-all duration-300">
            <div class="skill-icon mb-4 text-5xl text-purple-500">
              <component :is="skill.icon" />
            </div>
            <h3 class="text-xl font-bold text-white">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto Section -->
    <section id="contacto" class="py-20 relative">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {{ t('contactMe') }}
        </h2>
        <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-400 mb-2">{{ t('name') }}</label>
            <input type="text" id="name" v-model="form.name" required
                   class="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
          </div>
          <div class="mb-6">
            <label for="email" class="block text-sm font-medium text-gray-400 mb-2">{{ t('email') }}</label>
            <input type="email" id="email" v-model="form.email" required
                   class="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
          </div>
          <div class="mb-6">
            <label for="message" class="block text-sm font-medium text-gray-400 mb-2">{{ t('message') }}</label>
            <textarea id="message" v-model="form.message" rows="4" required
                      class="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"></textarea>
          </div>
          <button type="submit" 
                  class="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition-colors duration-300">
            {{ t('sendMessage') }}
          </button>
        </form>
      </div>
    </section>

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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { SunIcon, MoonIcon, PaintBrushIcon, DevicePhoneMobileIcon, ServerIcon } from '@heroicons/vue/24/solid';
import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-vue-next';

const isDarkMode = ref(true);
const cursor = ref(null);
const cursorDot = ref(null);
const currentLanguage = ref('es');

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es';
};

const t = computed(() => {
  const translations = {
    es: {
      myPortfolio: 'Codificando sueños linea a liena',
      hello: 'Hola, soy',
      yourName: 'Ana Valentina Castro',
      jobTitle: 'Desarrolladora backend junior',
      viewProjects: 'Ver Proyectos',
      mission: 'Mi misión',
      missionText: 'Mi misión es crear soluciones digitales innovadoras que mejoren la vida de las personas y transformen la manera en que interactuamos con la tecnología.',
      vision: 'Mi visión',
      visionText: 'Mi visión es ser un líder en el desarrollo de experiencias digitales intuitivas y accesibles, contribuyendo al avance tecnológico de manera ética y sostenible.',
      myProjects: 'Mis Proyectos',
      viewProject: 'Ver Proyecto',
      mySkills: 'Mis habilidades duras',
      HabilidadesBlandas:'Mis Habilidades blandas',
      contactMe: 'Contactame',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      sendMessage: 'Enviar Mensaje',
      copyright: '© 2023 Tu Nombre. Todos los derechos reservados.',
      inicio: 'Inicio',
      proyectos: 'Proyectos',
      habilidades: 'Habilidades',
      contacto: 'Contacto'
    },
    en: {
      myPortfolio: 'Coding dreams line by line',
      hello: 'Hello, I\'m',
      yourName: 'Ana Valentina Castro',
      jobTitle: 'Junior backend developer',
      viewProjects: 'View Projects',
      mission: 'My mission',
      missionText: 'My mission is to create innovative digital solutions that improve people\'s lives and transform the way we interact with technology.',
      vision: 'My vision',
      visionText: 'My vision is to be a leader in developing intuitive and accessible digital experiences, contributing to technological advancement in an ethical and sustainable manner.',
      myProjects: 'My Projects',
      viewProject: 'View Project',
      mySkills: 'My hard skills',
      HabilidadesBlandas:'My soft skills',
      contactMe: 'Contact Me',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      sendMessage: 'Send Message',
      copyright: '© 2023 Your Name. All rights reserved.',
      inicio: 'Home',
      proyectos: 'Projects',
      habilidades: 'Skills',
      contacto: 'Contact'
    }
  };
  return (key) => translations[currentLanguage.value][key];
});

const navItems = ['inicio', 'proyectos', 'habilidades', 'contacto'];

const projects = [
  { title: 'Proyecto 1', description: 'Descripción del proyecto 1', image: '/placeholder.svg?height=300&width=400', link: '#' },
  { title: 'Proyecto 2', description: 'Descripción del proyecto 2', image: '/placeholder.svg?height=300&width=400', link: '#' },
  { title: 'Proyecto 3', description: 'Descripción del proyecto 3', image: '/placeholder.svg?height=300&width=400', link: '#' },
];

const skills = [
  { name: 'Diseño UI/UX', icon: PaintBrushIcon },
  { name: 'Desarrollo Móvil', icon: DevicePhoneMobileIcon },
  { name: 'Backend', icon: ServerIcon },
];

const socialLinks = [
  { name: 'GitHub', icon: GithubIcon, url: 'https://github.com' },
  { name: 'Twitter', icon: TwitterIcon, url: 'https://twitter.com' },
  { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com' },
];

const form = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = () => {
  console.log('Formulario enviado', form.value);
  form.value = { name: '', email: '', message: '' };
};

const updateCursor = (e) => {
  if (cursor.value && cursorDot.value) {
    cursor.value.style.left =   e.clientX + 'px';
    cursor.value.style.top = e.clientY + 'px';
    cursorDot.value.style.left = e.clientX + 'px';
    cursorDot.value.style.top = e.clientY + 'px';
  }
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
});

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursor);
});
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';

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
  transition: all 0.1s ease-out;
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
  transition: all 0.15s ease-out;
  transform: translate(-50%, -50%);
}

.animate-text-gradient {
  background-image: linear-gradient(45deg, #8B5CF6, #EC4899);
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
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
  transition: all 0.3s ease;
}

.project-card:hover, .skill-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.2);
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
</style>