import { Target, Eye, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70"></div>
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            About Us
          </h1>
          <p
            className="text-xl text-gray-100"
            style={{ fontFamily: 'Calibri, sans-serif' }}
          >
            Your Trusted Partner in Natural Wellness
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
              >
                Who We Are
              </h2>
              <p
                className="text-lg text-gray-700 mb-4"
                style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
              >
                Martamora General Dealers is a trusted provider of premium herbal products and supplements, dedicated to promoting health and harmony through the power of authentic herbs.
              </p>
              <p
                className="text-lg text-gray-700 mb-4"
                style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
              >
                We specialize in carefully sourced, high-quality herbal products that combine traditional knowledge with modern reliability. Our commitment is to provide our community with natural solutions for holistic well-being.
              </p>
              <p
                className="text-lg text-gray-700"
                style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
              >
                With a deep respect for nature and a dedication to quality, we ensure every product meets the highest standards of purity and effectiveness.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Herbal products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                >
                  Our Vision
                </h3>
              </div>
              <p
                className="text-gray-700"
                style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
              >
                To become a trusted leader in natural wellness, promoting health and harmony through the power of authentic herbs.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                >
                  Our Mission
                </h3>
              </div>
              <p
                className="text-gray-700"
                style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
              >
                To provide our community with the highest quality, carefully sourced herbal products, leveraging traditional knowledge and reliable service to support holistic well-being.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-12 text-white text-center">
            <Leaf className="w-16 h-16 mx-auto mb-6" />
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              Our Commitment to Quality
            </h2>
            <p
              className="text-lg max-w-3xl mx-auto"
              style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
            >
              Every product we offer undergoes rigorous quality checks and sourcing standards. We believe in transparency, authenticity, and the transformative power of nature. Our team is dedicated to bringing you only the finest herbal solutions, backed by traditional wisdom and modern science.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
