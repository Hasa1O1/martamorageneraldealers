import { Phone, Mail, MapPin } from "lucide-react";
import type { PublicRoute } from "../appRoutes";
import { useSiteContentField } from "../hooks/useSiteContentField";

interface FooterProps {
  onNavigate: (page: PublicRoute) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const phone = useSiteContentField("contact", "phone_value", "0772792147");
  const email = useSiteContentField(
    "contact",
    "email_value",
    "monicamutale23@gmail.com",
  );
  const location = useSiteContentField("contact", "location_value", "Zambia");

  const linkClass =
    "text-gray-400 hover:text-green-400 transition-colors cursor-pointer text-left bg-transparent border-0 p-0";

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: "Times New Roman, serif",
                color: "#39B54A",
              }}
            >
              Martamora
            </h3>
            <p
              className="text-gray-400 mb-4"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Your trusted provider of quality herbal products and supplements,
              promoting health and harmony through the power of authentic herbs.
            </p>
          </div>

          <div>
            <h4
              className="text-lg font-bold mb-4"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ fontFamily: "Calibri, sans-serif" }}>
              <li>
                <button type="button" className={linkClass} onClick={() => onNavigate("home")}>
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={linkClass}
                  onClick={() => onNavigate("about")}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={linkClass}
                  onClick={() => onNavigate("products")}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={linkClass}
                  onClick={() => onNavigate("gallery")}
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={linkClass}
                  onClick={() => onNavigate("contact")}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-lg font-bold mb-4"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Contact Us
            </h4>
            <div className="space-y-3" style={{ fontFamily: "Calibri, sans-serif" }}>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <button
                  type="button"
                  className={`${linkClass} underline-offset-2 hover:underline`}
                  onClick={() => onNavigate("contact")}
                >
                  {phone}
                </button>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-400 hover:text-green-400 transition-colors break-all">
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{location}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm"
          style={{ fontFamily: "Calibri, sans-serif" }}
        >
          <p>
            &copy; {new Date().getFullYear()} Martamora General Dealers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
