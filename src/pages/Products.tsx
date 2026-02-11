import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Leaf, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  features: string[];
  is_featured: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const sampleProducts = [
    {
      id: '1',
      name: 'Herbal Tea Blend',
      category: 'Teas',
      description: 'A soothing blend of premium herbs for relaxation and wellness.',
      image_url: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['100% Natural', 'No Additives', 'Traditional Recipe'],
      is_featured: true,
    },
    {
      id: '2',
      name: 'Herbal Supplements',
      category: 'Supplements',
      description: 'Premium quality herbal supplements for daily wellness support.',
      image_url: 'https://images.pexels.com/photos/4021763/pexels-photo-4021763.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Lab Tested', 'Pure Ingredients', 'Effective Formula'],
      is_featured: true,
    },
    {
      id: '3',
      name: 'Essential Oils',
      category: 'Oils',
      description: 'Pure essential oils extracted from the finest botanical sources.',
      image_url: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Cold Pressed', 'Organic', 'Therapeutic Grade'],
      is_featured: true,
    },
    {
      id: '4',
      name: 'Herbal Powders',
      category: 'Powders',
      description: 'Finely ground herbal powders for versatile wellness applications.',
      image_url: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['Fresh Ground', 'No Fillers', 'High Potency'],
      is_featured: false,
    },
  ];

  const displayProducts = products.length > 0 ? filteredProducts : sampleProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Our Products
          </h1>
          <p
            className="text-xl text-gray-100"
            style={{ fontFamily: 'Calibri, sans-serif' }}
          >
            Premium Herbal Products for Natural Wellness
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }`}
                style={{ fontFamily: 'Calibri, sans-serif' }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Loading products...
              </p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
                No products found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <span
                        className="text-sm text-green-600 font-medium"
                        style={{ fontFamily: 'Calibri, sans-serif' }}
                      >
                        {product.category}
                      </span>
                    </div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.5' }}
                    >
                      {product.description}
                    </p>
                    {product.features && product.features.length > 0 && (
                      <div className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span
                              className="text-sm text-gray-600"
                              style={{ fontFamily: 'Calibri, sans-serif' }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: 'Times New Roman, serif', color: '#754C29' }}
          >
            Interested in Our Products?
          </h2>
          <p
            className="text-lg text-gray-600 mb-8"
            style={{ fontFamily: 'Calibri, sans-serif', lineHeight: '1.5' }}
          >
            Contact us to learn more about our premium herbal products and how they can support your wellness journey.
          </p>
          <button
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: 'Calibri, sans-serif' }}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
