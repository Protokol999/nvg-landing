import { useState } from 'react';
import { motion } from 'framer-motion';
import { isValidMoldovaPhone, formatMoldovaPhone } from '../../utils/phoneValidation';
import { notifyTelegram } from '../../services/notify';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '+373 ', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!isValidMoldovaPhone(formData.phone)) newErrors.phone = 'Invalid phone number (+373 XX XXX XXX)';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setStatus('loading');
    
    try {
      const result = await notifyTelegram(formData);
      
      if (result.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '+373 ', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatMoldovaPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="contact__title text-center">Let's Work Together</h2>
          <p className="contact__subtitle subtitle text-center">
            Tell us about your project
          </p>
        </motion.div>

        <motion.form
          className="contact__form glass"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'error' : ''}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (Moldova) *</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={errors.phone ? 'error' : ''}
              placeholder="+373 XX XXX XXX"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={errors.message ? 'error' : ''}
              placeholder="Tell us about your project..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <div className="spinner" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>

          {status === 'success' && (
            <div className="success-message" role="alert">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="error-message" role="alert">
              ✗ Something went wrong. Please try again later.
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
