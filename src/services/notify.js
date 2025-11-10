/**
 * Notification Service
 * Handles form submissions and contact requests
 *
 * Current: Stub implementation with simulated delay
 * Future: Replace with actual API endpoint or Telegram Bot integration
 */

/**
 * Sends notification with form data
 * @param {Object} payload - Form data
 * @param {string} payload.name - User name
 * @param {string} payload.phone - User phone (+373)
 * @param {string} payload.message - User message
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export async function notify(payload) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 900));

  // Log for development
  console.log('📬 Form submission:', payload);

  // Simulate success
  return {
    ok: true,
    message: 'Спасибо! Мы свяжемся с вами в ближайшее время.'
  };

  // For production, replace with:
  /*
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Notification error:', error);
    return { ok: false, message: 'Ошибка отправки. Попробуйте позже.' };
  }
  */
}

/**
 * Sends notification via Telegram Bot
 * @param {Object} payload - Form data
 * @returns {Promise<{ok: boolean}>}
 */
export async function notifyTelegram(payload) {
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return notify(payload);
  }

  const message = `
🔔 Новая заявка с NVG Landing

👤 Имя: ${payload.name}
📞 Телефон: ${payload.phone}
💬 Сообщение: ${payload.message}

⏰ ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot8238965262:AAF9DnkEAaRqsATzSAnRyqPHtt2ww_ojcfU/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: 807422319,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    const data = await response.json();

    if (data.ok) {
      return { ok: true, message: 'Сообщение успешно отправлено!' };
    } else {
      throw new Error(data.description || 'Telegram API error');
    }
  } catch (error) {
    console.error('Telegram notification error:', error);
    return { ok: false, message: 'Ошибка отправки. Попробуйте позже.' };
  }
}
