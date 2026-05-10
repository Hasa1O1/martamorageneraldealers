import { useEffect, useState } from "react";
import { Leaf, Award, Users, Heart } from "lucide-react";
import { supabase } from "../lib/supabase";
import EditableText from "../components/EditableText";

interface FeatureCard {
  section: string;
  title: string;
  description: string;
}

const defaultFeatureCards: FeatureCard[] = [
  {
    section: "home_feature_1",
    title: "Natural Products",
    description: "Sourced from the finest herbs and botanicals",
  },
  {
    section: "home_feature_2",
    title: "Quality Assured",
    description: "Rigorous testing and quality control standards",
  },
  {
    section: "home_feature_3",
    title: "Expert Guidance",
    description: "Professional advice and personalized support",
  },
  {
    section: "home_feature_4",
    title: "Holistic Wellness",
    description: "Supporting your journey to natural health",
  },
];

interface HomeProps {
  adminMode?: boolean;
}

export default function Home({ adminMode = false }: HomeProps) {
  const [featureCards, setFeatureCards] =
    useState<FeatureCard[]>(defaultFeatureCards);
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  useEffect(() => {
    fetchFeatureCards();
  }, []);

  async function fetchFeatureCards() {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("section, content")
        .eq("page", "home")
        .like("section", "home_feature_%")
        .order("section", { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const cards = data.map((item) => {
          try {
            const parsed = JSON.parse(item.content || "{}");
            return {
              section: item.section,
              title: parsed.title || "Feature Card",
              description: parsed.description || "",
            };
          } catch {
            return {
              section: item.section,
              title: "Feature Card",
              description: "",
            };
          }
        });
        setFeatureCards(cards);
      } else {
        setFeatureCards(defaultFeatureCards);
      }
    } catch (error) {
      console.error("Error fetching home features:", error);
      setFeatureCards(defaultFeatureCards);
    } finally {
      setLoadingFeatures(false);
    }
  }

  const getIconForFeature = (section: string) => {
    if (section.endsWith("1")) return <Leaf className="w-8 h-8" />;
    if (section.endsWith("2")) return <Award className="w-8 h-8" />;
    if (section.endsWith("3")) return <Users className="w-8 h-8" />;
    return <Heart className="w-8 h-8" />;
  };
  return (
    <div className="min-h-screen">
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            <EditableText
              page="home"
              section="hero_title_1"
              adminMode={adminMode}
              defaultValue="Natural Wellness"
              tag="span"
              className="block"
              style={{ fontFamily: "Times New Roman, serif" }}
            />
            <span className="block text-green-400">
              <EditableText
                page="home"
                section="hero_title_2"
                adminMode={adminMode}
                defaultValue="Through Herbs"
                tag="span"
                className="block"
                style={{ fontFamily: "Times New Roman, serif" }}
              />
            </span>
          </h1>
          <EditableText
            page="home"
            section="hero_subtitle"
            adminMode={adminMode}
            defaultValue="Discover the power of authentic herbal products and supplements for holistic health and harmony."
            tag="p"
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.5" }}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Explore Products
            </button>
            <button
              className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg transition-all border-2 border-white"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <EditableText
              page="home"
              section="why_choose_title"
              adminMode={adminMode}
              defaultValue="Why Choose Martamora"
              tag="h2"
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "Times New Roman, serif", color: "#754C29" }}
            />
            <EditableText
              page="home"
              section="why_choose_subtitle"
              adminMode={adminMode}
              defaultValue="We are committed to providing the highest quality herbal products with traditional knowledge and modern reliability."
              tag="p"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.5" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(loadingFeatures ? defaultFeatureCards : featureCards).map(
              (feature) => (
                <div
                  key={feature.section}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition-all hover:shadow-lg transform hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                    {getIconForFeature(feature.section)}
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "Times New Roman, serif",
                      color: "#754C29",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{
                      fontFamily: "Calibri, sans-serif",
                      lineHeight: "1.5",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-green-900/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <EditableText
            page="home"
            section="mission_title"
            adminMode={adminMode}
            defaultValue="Our Mission"
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Times New Roman, serif" }}
          />
          <EditableText
            page="home"
            section="mission_text"
            adminMode={adminMode}
            defaultValue="To provide our community with the highest quality, carefully sourced herbal products, leveraging traditional knowledge and reliable service to support holistic well-being."
            tag="p"
            className="text-xl text-gray-100 mb-8"
            style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.6" }}
          />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableText
            page="home"
            section="cta_title"
            adminMode={adminMode}
            defaultValue="Ready to Start Your Wellness Journey?"
            tag="h2"
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "Times New Roman, serif", color: "#754C29" }}
          />
          <EditableText
            page="home"
            section="cta_text"
            adminMode={adminMode}
            defaultValue="Explore our range of authentic herbal products and discover the natural path to health and harmony."
            tag="p"
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.5" }}
          />
          <button
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
