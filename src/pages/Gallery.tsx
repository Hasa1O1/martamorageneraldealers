import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Image as ImageIcon } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  async function fetchGalleryItems() {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  }

  const sampleItems = [
    {
      id: '1',
      title: 'Herbal Collection',
      description: 'Our premium selection of dried herbs',
      category: 'Products',
      image_url: 'https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      title: 'Essential Oils',
      description: 'Pure and therapeutic essential oils',
      category: 'Products',
      image_url: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      title: 'Product Packaging',
      description: 'Eco-friendly and sustainable packaging',
      category: 'Packaging',
      image_url: 'https://images.pexels.com/photos/4021763/pexels-photo-4021763.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      title: 'Herbal Teas',
      description: 'Artisanal tea blends',
      category: 'Products',
      image_url: 'https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '5',
      title: 'Natural Ingredients',
      description: 'Sourced from trusted suppliers',
      category: 'Sourcing',
      image_url: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '6',
      title: 'Quality Control',
      description: 'Rigorous testing procedures',
      category: 'Process',
      image_url: 'https://images.pexels.com/photos/6348106/pexels-photo-6348106.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const displayItems = items.length > 0 ? items : sampleItems;
  const categories = ['All', ...Array.from(new Set(displayItems.map(i => i.category)))];
  const filteredItems = selectedCategory === 'All'
    ? displayItems
    : displayItems.filter(i => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-green-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Our Gallery
          </h1>
          <p
            className="text-xl text-gray-100"
            style={{ fontFamily: 'Calibri, sans-serif' }}
          >
            Explore Our Products and Process
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
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
                style={{ fontFamily: 'Calibri, sans-serif' }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Loading gallery...
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
                No gallery items found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="mb-2">
                        <span
                          className="inline-block px-3 py-1 bg-green-500 rounded-full text-xs font-medium"
                          style={{ fontFamily: 'Calibri, sans-serif' }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: 'Times New Roman, serif' }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm text-gray-200"
                        style={{ fontFamily: 'Calibri, sans-serif' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
