import { useState } from 'react';
import { motion } from 'framer-motion';
import ElectricBorderLight from '../ElectricBorderLight';
import ProjectModal from '../ProjectModal';
import './Portfolio.css';

const projects = [
  { 
    title: 'E-Commerce Platform', 
    tag: 'Web App', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Полнофункциональная e-commerce платформа с интеграцией платежных систем, системой управления заказами и аналитикой в реальном времени.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    features: [
      'Интеграция с платёжными системами',
      'Система управления заказами',
      'Real-time аналитика',
      'Адаптивный дизайн'
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  { 
    title: 'Crypto Dashboard', 
    tag: 'Dashboard', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    description: 'Профессиональная панель для мониторинга криптовалют с real-time данными, графиками и уведомлениями о изменении цен.',
    tech: ['React', 'TypeScript', 'WebSocket', 'Chart.js', 'TailwindCSS'],
    features: [
      'Real-time цены криптовалют',
      'Интерактивные графики',
      'Push-уведомления',
      'Темная/светлая тема'
    ],
    liveUrl: 'https://example.com'
  },
  { 
    title: 'AI Chatbot', 
    tag: 'Automation', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    description: 'Умный чат-бот с искусственным интеллектом для автоматизации поддержки клиентов и обработки запросов 24/7.',
    tech: ['Python', 'OpenAI', 'FastAPI', 'React', 'MongoDB'],
    features: [
      'NLP обработка запросов',
      'Интеграция с CRM',
      'Мультиязычность',
      'Аналитика диалогов'
    ],
    githubUrl: 'https://github.com'
  },
  { 
    title: 'SaaS Landing', 
    tag: 'Landing Page', 
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    description: 'Высококонверсионный лендинг для SaaS продукта с анимациями, формами захвата лидов и интеграцией аналитики.',
    tech: ['Next.js', 'Framer Motion', 'TypeScript', 'Vercel'],
    features: [
      'SEO оптимизация',
      'Высокая скорость загрузки',
      'Адаптивный дизайн',
      'A/B тестирование'
    ],
    liveUrl: 'https://example.com'
  },
  { 
    title: 'Mobile Banking App', 
    tag: 'Mobile', 
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    description: 'Безопасное мобильное приложение для управления финансами с поддержкой переводов, платежей и инвестиций.',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase'],
    features: [
      'Биометрическая аутентификация',
      'Push-уведомления',
      'Офлайн-режим',
      'Шифрование данных'
    ],
    liveUrl: 'https://example.com'
  },
  { 
    title: 'Analytics Platform', 
    tag: 'Dashboard', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Мощная платформа для сбора и визуализации данных с настраиваемыми дашбордами и экспортом отчётов.',
    tech: ['Vue.js', 'D3.js', 'Python', 'Apache Kafka', 'ClickHouse'],
    features: [
      'Настраиваемые дашборды',
      'Экспорт в PDF/Excel',
      'Real-time обработка данных',
      'Интеграция с API'
    ],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section className="portfolio" id="portfolio">
        <div className="container">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="portfolio__title text-center">Selected Projects</h2>
            <p className="portfolio__subtitle subtitle text-center">
              Real results for real clients
            </p>
          </motion.div>

          <div className="portfolio__grid grid-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ElectricBorderLight
                  color="#7A33FF"
                  speed={0.8}
                  thickness={2}
                  style={{ borderRadius: 16 }}
                >
                  <div 
                    className="portfolio-card"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="portfolio-card__image">
                      <img src={project.image} alt={project.title} loading="lazy" />
                      <div className="portfolio-card__overlay">
                        <span className="portfolio-card__cta">View Project →</span>
                      </div>
                    </div>
                    <div className="portfolio-card__content">
                      <span className="portfolio-card__tag">{project.tag}</span>
                      <h3 className="portfolio-card__title">{project.title}</h3>
                    </div>
                  </div>
                </ElectricBorderLight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
