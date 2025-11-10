import { motion } from 'framer-motion';
import './Pricing.css';

const plans = [
  {
    name: 'Free Consult',
    price: 'Free',
    features: ['30-min video call', 'Project assessment', 'Technology recommendations', 'No commitment'],
    recommended: false,
  },
  {
    name: 'Landing + Bots',
    price: '$2,500',
    features: ['Custom landing page', 'Lead capture bot', 'CRM integration', 'Mobile responsive', '3 months support'],
    recommended: true,
  },
  {
    name: 'Full Site + CRM',
    price: '$7,500',
    features: ['Multi-page website', 'Custom CRM system', 'Advanced automation', 'Analytics dashboard', '12 months support', 'Priority updates'],
    recommended: false,
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="pricing__title text-center">Plans & Pricing</h2>
          <p className="pricing__subtitle subtitle text-center">
            Transparent pricing, no hidden fees
          </p>
        </motion.div>

        <div className="pricing__grid">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`pricing-card glass ${plan.recommended ? 'pricing-card--recommended' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {plan.recommended && <div className="pricing-card__badge">Most Popular</div>}
              
              <h3 className="pricing-card__name">{plan.name}</h3>
              <div className="pricing-card__price">{plan.price}</div>
              
              <ul className="pricing-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.6 5L7.5 14.1L3.4 10" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`btn ${plan.recommended ? 'btn--primary' : 'btn--secondary'}`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
