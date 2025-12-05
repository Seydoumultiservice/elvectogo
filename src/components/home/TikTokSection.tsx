import { useEffect } from 'react';
import AnimatedSection from '../animations/AnimatedSection';

const TikTokSection = () => {
  useEffect(() => {
    // Load TikTok embed script
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
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
          
          <div className="flex justify-center">
            <blockquote 
              className="tiktok-embed" 
              cite="https://www.tiktok.com/@elvec.togo" 
              data-unique-id="elvec.togo" 
              data-embed-type="creator" 
              style={{ maxWidth: '780px', minWidth: '288px' }}
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
