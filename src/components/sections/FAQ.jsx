import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    id: 1,
    question: 'How long does it take to build a landing page?',
    answer:
      'Typically 7-14 days from kickoff to launch, depending on complexity. We work in sprints with regular check-ins to ensure everything meets your expectations.'
  },
  {
    id: 2,
    question: 'Do you provide ongoing support after launch?',
    answer:
      'Yes! All projects include 3-12 months of support depending on your plan. We handle updates, bug fixes, and performance optimization. Extended support plans are also available.'
  },
  {
    id: 3,
    question: 'Can you integrate with our existing CRM or tools?',
    answer:
      'Absolutely. We have experience integrating with HubSpot, Salesforce, Bitrix24, and custom APIs. If it has an API, we can connect it.'
  },
  {
    id: 4,
    question: 'What technologies do you use?',
    answer:
      'We use modern, proven stacks: React/Next.js for web, Node.js/Python for backend, Telegram/WhatsApp APIs for bots, and PostgreSQL/MongoDB for databases. Tech choices depend on your specific needs.'
  },
  {
    id: 5,
    question: 'Do I own the code and design?',
    answer:
      'Yes, 100%. You receive full source code, design files, and documentation. We also provide training so your team can maintain and update the system.'
  },
  {
    id: 6,
    question: 'What if I need changes after launch?',
    answer:
      'Minor tweaks are included in your support plan. For major features or redesigns, we provide transparent hourly rates or can create a new project proposal.'
  },
  {
    id: 7,
    question: 'Can you help with SEO and marketing?',
    answer:
      'Yes. Our landing pages are built with SEO best practices, fast loading times, and analytics tracking. We can also connect you with our marketing partners for paid ads and content strategy.'
  },
  {
    id: 8,
    question: 'Do you work with clients outside Moldova?',
    answer:
      "Definitely! We work with clients across Europe and beyond. We're fluent in English, Romanian, and Russian. Time zones are never an issue with async communication."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = id => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className='faq' id='faq'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='faq__title text-center'>Frequently Asked Questions</h2>
          <p className='faq__subtitle subtitle text-center'>
            Everything you need to know
          </p>
        </motion.div>

        <div className='faq__list'>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className={`faq-item ${
                openId === faq.id ? 'faq-item--open' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                className='faq-item__question'
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openId === faq.id}
              >
                <span>{faq.question}</span>
                <svg
                  className='faq-item__icon'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M19 9l-7 7-7-7'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    className='faq-item__answer'
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
