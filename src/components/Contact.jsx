import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = `*Ismi:* ${formData.name}\n*Email:* ${formData.email}\n*Telefon:* ${formData.phone}\n*Izoh:* ${formData.comment}`;
        const telegramApi = `https://api.telegram.org/bot7344827046:AAGxXvN4Vkxcl_FMrYDNdgXEg0Yi0nx4hzQ/sendMessage`;

        try {
            await fetch(telegramApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: '5838205785',
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            alert('Maʼlumot muvaffaqiyatli yuborildi!');
            setFormData({ name: '', email: '', phone: '', comment: '' });
        } catch (error) {
            console.error('Xatolik yuz berdi:', error);
            alert('Xatolik yuz berdi. Qaytadan urinib ko‘ring.');
        }
    };

    return (
        <section className='contact'>
            <div className='contact-left'>
                <h2>Aloqa</h2>
                <p>Biz bilan bog‘lanish uchun formani to‘ldiring.</p>
                <p>Telefon: +998 90 123 45 67</p>
                <p>Telegram: @yourTelegramNick</p>
            </div>
            <form className='contact-form' onSubmit={handleSubmit}>
                <label>
                    Ismi:
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Telefon:
                    <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Izoh:
                    <textarea
                        name='comment'
                        value={formData.comment}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>
                <button type='submit'>Yuborish</button>
            </form>
        </section>
    );
};

export default Contact;
