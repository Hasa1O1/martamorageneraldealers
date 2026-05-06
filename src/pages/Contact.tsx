import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import EditableText from '../components/EditableText';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4021763/pexels-photo-4021763.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <EditableText
            page="contact"
            section="hero_title"
            defaultValue="Contact Us"
            tag="h1"
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Times New Roman, serif' }}
          />
          <EditableText
            page="contact"
            section="hero_subtitle"
            defaultValue="We'd Love to Hear From You"
            tag="p"
            className="text-xl text-gray-100"
            style={{ fontFamily: 'Calibri, sans-serif' }}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
              >
                Get in Touch
              </h2>
              <EditableText
                page="contact"
                section="intro_text"
                defaultValue="Have questions about our products or services? We're here to help. Reach out to us and we'll respond as soon as possible."
                tag="p"
                className="text-lg text-gray-600 mb-8"
                style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
              />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <EditableText
                      page="contact"
                      section="phone_label"
                      defaultValue="Phone"
                      tag="h3"
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                    />
                    <EditableText
                      page="contact"
                      section="phone_value"
                      defaultValue="0772792147"
                      tag="p"
                      className="text-gray-600"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <EditableText
                      page="contact"
                      section="email_label"
                      defaultValue="Email"
                      tag="h3"
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                    />
                    <EditableText
                      page="contact"
                      section="email_value"
                      defaultValue="monicamutale23@gmail.com"
                      tag="p"
                      className="text-gray-600"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <EditableText
                      page="contact"
                      section="location_label"
                      defaultValue="Location"
                      tag="h3"
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                    />
                    <EditableText
                      page="contact"
                      section="location_value"
                      defaultValue="Zambia"
                      tag="p"
                      className="text-gray-600"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <EditableText
                  page="contact"
                  section="hours_title"
                  defaultValue="Business Hours"
                  tag="h3"
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                />
                <EditableText
                  page="contact"
                  section="hours_text"
                  defaultValue="Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed"
                  tag="div"
                  className="space-y-2 text-gray-600 whitespace-pre-line"
                  style={{ fontFamily: 'Calibri, sans-serif' }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <EditableText
                page="contact"
                section="form_title"
                defaultValue="Send Us a Message"
                tag="h3"
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
              />

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h4
                    className="text-xl font-bold text-green-700 mb-2"
                    style={{ fontFamily: 'Times New Roman, serif' }}
                  >
                    Message Sent!
                  </h4>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: 'Calibri, sans-serif' }}
                  >
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                      style={{ fontFamily: 'Calibri, sans-serif' }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Calibri, sans-serif' }}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
