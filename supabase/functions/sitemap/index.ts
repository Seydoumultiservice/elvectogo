import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    // Routes statiques
    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/produits', priority: '0.8', changefreq: 'weekly' },
      { path: '/galerie', priority: '0.8', changefreq: 'weekly' },
      { path: '/a-propos', priority: '0.8', changefreq: 'monthly' },
      { path: '/contact', priority: '0.9', changefreq: 'monthly' },
      { path: '/vehicules', priority: '0.8', changefreq: 'weekly' },
    ];

    // Récupérer les services dynamiques
    const { data: services } = await supabase
      .from('services')
      .select('slug, updated_at')
      .eq('visible', true);

    // Construire le XML
    const baseUrl = 'https://elvectogo.com';
    const today = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Ajouter routes statiques
    for (const route of staticRoutes) {
      sitemap += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }

    // Ajouter services dynamiques
    if (services) {
      for (const service of services) {
        const lastmod = service.updated_at ? service.updated_at.split('T')[0] : today;
        sitemap += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }

    sitemap += '\n</urlset>';

    console.log('Sitemap generated successfully');

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?><error>${error.message}</error>`,
      {
        status: 500,
        headers: { 'Content-Type': 'application/xml' },
      }
    );
  }
});
