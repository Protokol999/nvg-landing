import { motion } from 'framer-motion';
import './SocialProof.css';

const clients = [
  { name: 'TechFlow', logo: 'T' },
  { name: 'DataLabs', logo: 'D' },
  { name: 'CloudSys', logo: 'C' },
  { name: 'MarketPro', logo: 'M' },
  { name: 'BizHub', logo: 'B' },
  { name: 'FinTech', logo: 'F' },
];

export default function SocialProof() {
  return (
    <section className="social-proof">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="social-proof__content"
        >
          <p className="social-proof__label">Trusted by innovative companies</p>
          
          <div className="social-proof__logos">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                className="social-proof__logo"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <div className="social-proof__logo-placeholder">
                  {client.logo}
                </div>
                <span>{client.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
