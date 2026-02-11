import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Times New Roman, serif', color: '#39B54A' }}>
              Martamora
            </h3>
            <p className="text-gray-400 mb-4" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Your trusted provider of quality herbal products and supplements, promoting health and harmony through the power of authentic herbs.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Gallery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4" style={{ fontFamily: 'Times New Roman, serif' }}>
              Contact Us
            </h4>
            <div className="space-y-3" style={{ fontFamily: 'Calibri, sans-serif' }}>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">0772792147</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">monicamutale23@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Zambia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm" style={{ fontFamily: 'Calibri, sans-serif' }}>
          <p>&copy; {new Date().getFullYear()} Martamora General Dealers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
