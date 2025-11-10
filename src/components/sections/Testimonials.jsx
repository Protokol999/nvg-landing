import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Ion Popescu',
    role: 'CEO, TechCorp MD',
    avatar: 'IP',
    rating: 5,
    text: 'NVG built our CRM from scratch. Sales team efficiency increased by 60%. The automation saves us 20 hours per week.',
  },
  {
    id: 2,
    name: 'Maria Andronic',
    role: 'Marketing Director, DataLabs',
    avatar: 'MA',
    rating: 5,
    text: 'Our landing page conversion rate jumped from 2% to 8% after the redesign. ROI was positive within the first month.',
  },
  {
    id: 3,
    name: 'Andrei Cojocaru',
    role: 'Founder, BizHub',
    avatar: 'AC',
    rating: 5,
    text: 'The Telegram bot handles 80% of customer inquiries automatically. Customer satisfaction actually increased!',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="testimonials__title text-center">What Clients Say</h2>
          <p className="testimonials__subtitle subtitle text-center">
            Real results, real feedback
          </p>
        </motion.div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="testimonial-card__rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="testimonial-card__text">"{testimonial.text}"</p>

              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{testimonial.avatar}</div>
                <div className="testimonial-card__author-info">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
