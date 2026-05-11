import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import EditableText from "../components/EditableText";
import EditModal from "../components/EditModal";
import EditableBackgroundImage from "../components/EditableBackgroundImage";
import { useSiteContentField } from "../hooks/useSiteContentField";

interface ContactProps {
  adminMode?: boolean;
}

function buildMessageBody(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return [
    "Hello Martamora,",
    "",
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Phone: ${formData.phone || "—"}`,
    "",
    "Message:",
    formData.message,
  ].join("\n");
}

function whatsappDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export default function Contact({ adminMode = false }: ContactProps) {
  const sitePhone = useSiteContentField("contact", "phone_value", "0772792147");
  const siteEmail = useSiteContentField(
    "contact",
    "email_value",
    "monicamutale23@gmail.com",
  );
  const heroBackgroundImage = useSiteContentField(
    "contact",
    "contact_hero_bg",
    "https://images.pexels.com/photos/4021763/pexels-photo-4021763.jpeg?auto=compress&cs=tinysrgb&w=1920",
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [channelModalOpen, setChannelModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChannelModalOpen(true);
  }

  function openWhatsApp() {
    const digits = whatsappDigits(sitePhone);
    const body = encodeURIComponent(buildMessageBody(formData));
    if (!digits) {
      window.alert(
        "WhatsApp number is not set. Please add a phone number in Contact details (admin).",
      );
      return;
    }
    window.open(`https://wa.me/${digits}?text=${body}`, "_blank", "noopener,noreferrer");
    setChannelModalOpen(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  }

  function openEmailApp() {
    const to = siteEmail.trim();
    if (!to) {
      window.alert(
        "Email address is not set. Please add an email in Contact details (admin).",
      );
      return;
    }
    const subject = encodeURIComponent("Martamora website — contact message");
    const body = encodeURIComponent(buildMessageBody(formData));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setChannelModalOpen(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
        }}
      >
        <EditableBackgroundImage
          page="contact"
          section="contact_hero_bg"
          adminMode={adminMode}
          currentValue={heroBackgroundImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Contact Us
          </h1>
          <p
            className="text-xl text-gray-100"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            We&apos;d Love to Hear From You
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-3xl font-bold mb-6"
                style={{
                  fontFamily: "Times New Roman, serif",
                  color: "#754C29",
                }}
              >
                Get in Touch
              </h2>
              <p
                className="text-lg text-gray-600 mb-8"
                style={{
                  fontFamily: "Calibri, sans-serif",
                  lineHeight: "1.6",
                }}
              >
                Have questions about our products or services? We&apos;re here to help.
                Reach out to us and we&apos;ll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <EditableText
                      page="contact"
                      section="phone_label"
                      adminMode={adminMode}
                      defaultValue="Phone"
                      tag="h3"
                      className="text-lg font-bold mb-1"
                      style={{
                        fontFamily: "Times New Roman, serif",
                        color: "#754C29",
                      }}
                    />
                    <EditableText
                      page="contact"
                      section="phone_value"
                      adminMode={adminMode}
                      defaultValue="0772792147"
                      tag="p"
                      className="text-gray-600"
                      style={{ fontFamily: "Calibri, sans-serif" }}
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
                      adminMode={adminMode}
                      defaultValue="Email"
                      tag="h3"
                      className="text-lg font-bold mb-1"
                      style={{
                        fontFamily: "Times New Roman, serif",
                        color: "#754C29",
                      }}
                    />
                    <EditableText
                      page="contact"
                      section="email_value"
                      adminMode={adminMode}
                      defaultValue="monicamutale23@gmail.com"
                      tag="p"
                      className="text-gray-600"
                      style={{ fontFamily: "Calibri, sans-serif" }}
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
                      adminMode={adminMode}
                      defaultValue="Location"
                      tag="h3"
                      className="text-lg font-bold mb-1"
                      style={{
                        fontFamily: "Times New Roman, serif",
                        color: "#754C29",
                      }}
                    />
                    <EditableText
                      page="contact"
                      section="location_value"
                      adminMode={adminMode}
                      defaultValue="Zambia"
                      tag="p"
                      className="text-gray-600"
                      style={{ fontFamily: "Calibri, sans-serif" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <EditableText
                  page="contact"
                  section="hours_title"
                  adminMode={adminMode}
                  defaultValue="Business Hours"
                  tag="h3"
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "Times New Roman, serif",
                    color: "#754C29",
                  }}
                />
                <EditableText
                  page="contact"
                  section="hours_text"
                  adminMode={adminMode}
                  defaultValue={
                    "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed"
                  }
                  tag="div"
                  className="space-y-2 text-gray-600 whitespace-pre-line"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3
                className="text-2xl font-bold mb-6"
                style={{
                  fontFamily: "Times New Roman, serif",
                  color: "#754C29",
                }}
              >
                Send Us a Message
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Calibri, sans-serif" }}
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
                    style={{ fontFamily: "Calibri, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Calibri, sans-serif" }}
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
                    style={{ fontFamily: "Calibri, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Calibri, sans-serif" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    style={{ fontFamily: "Calibri, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Calibri, sans-serif" }}
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
                    style={{ fontFamily: "Calibri, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <EditModal
        open={channelModalOpen}
        title="How would you like to send your message?"
        onClose={() => setChannelModalOpen(false)}
        actions={
          <button
            type="button"
            onClick={() => setChannelModalOpen(false)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        }
      >
        <p
          className="mb-6 text-gray-600"
          style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.5" }}
        >
          Your message will open in WhatsApp or your email app with the details filled in.
          We&apos;ll use the phone number and email shown in your contact details.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openWhatsApp}
            className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-green-700"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            WhatsApp
          </button>
          <button
            type="button"
            onClick={openEmailApp}
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Email
          </button>
        </div>
      </EditModal>
    </div>
  );
}
