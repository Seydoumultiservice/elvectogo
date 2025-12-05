import { useEffect, useRef } from 'react';
import AnimatedSection from '../animations/AnimatedSection';

const TikTokSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any existing TikTok scripts first
    const existingScripts = document.querySelectorAll('script[src="https://www.tiktok.com/embed.js"]');
    existingScripts.forEach(script => script.remove());

    // Create and load new script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[src="https://www.tiktok.com/embed.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Suivez-nous sur TikTok
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos dernières vidéos et coulisses de chantier
            </p>
          </div>
          
          <div ref={containerRef} className="flex justify-center">
            <blockquote 
              className="tiktok-embed" 
              cite="https://www.tiktok.com/@elvec.togo" 
              data-unique-id="elvec.togo" 
              data-embed-type="creator"
            >
              <section>
                <a 
                  target="_blank" 
                  href="https://www.tiktok.com/@elvec.togo?refer=creator_embed"
                  rel="noopener noreferrer"
                  className="text-elvec-600 hover:text-elvec-700 font-medium"
                >
                  @elvec.togo
                </a>
              </section>
            </blockquote>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TikTokSection;
