import { Leaf, Award, Users, Heart } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Natural Products',
      description: 'Sourced from the finest herbs and botanicals',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Assured',
      description: 'Rigorous testing and quality control standards',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Guidance',
      description: 'Professional advice and personalized support',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Holistic Wellness',
      description: 'Supporting your journey to natural health',
    },
  ];

  return (
    <div className="min-h-screen">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Natural Wellness
            <span className="block text-green-400">Through Herbs</span>
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.5' }}
          >
            Discover the power of authentic herbal products and supplements for holistic health and harmony.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              style={{ fontFamily: 'Calibri, sans-serif' }}
            >
              Explore Products
            </button>
            <button
              className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all border-2 border-white"
              style={{ fontFamily: 'Calibri, sans-serif' }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
            >
              Why Choose Martamora
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.5' }}
            >
              We are committed to providing the highest quality herbal products with traditional knowledge and modern reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.5' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-green-900/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Our Mission
          </h2>
          <p
            className="text-xl text-gray-100 mb-8"
            style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.6' }}
          >
            To provide our community with the highest quality, carefully sourced herbal products, leveraging traditional knowledge and reliable service to support holistic well-being.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
          >
            Ready to Start Your Wellness Journey?
          </h2>
          <p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.5' }}
          >
            Explore our range of authentic herbal products and discover the natural path to health and harmony.
          </p>
          <button
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Calibri, sans-serif' }}
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
}
