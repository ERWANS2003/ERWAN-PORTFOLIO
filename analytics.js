/* ===================================
   SUIVI GOOGLE ANALYTICS 4
   Renseignez votre identifiant de mesure (format G-XXXXXXXXXX), visible dans
   Google Analytics : Administration → Flux de données → votre flux web.
   Tant qu'il est vide, aucun script de suivi n'est chargé.
   =================================== */

(function () {
    'use strict';

    const GA_MEASUREMENT_ID = '';

    if (!/^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // gtag attend l'objet arguments lui-même, pas un tableau.
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);

    const track = (name, params) => window.gtag('event', name, params);

    // Clics utiles : CV, projets, réseaux, contact, certifications.
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!link) return;
        const href = link.getAttribute('href');

        if (href.includes('CV Erwan OUBDA')) {
            track('telechargement_cv');
        } else if (href.includes('whoami-montage')) {
            track('clic_portfolio_montage');
        } else if (link.closest('.t-project')) {
            track('clic_projet', { projet: link.closest('.t-project').querySelector('h3')?.textContent.trim(), lien: href });
        } else if (href.startsWith('mailto:') || href.startsWith('tel:')) {
            track('clic_contact', { moyen: href.split(':')[0] });
        } else if (href.includes('coursera.org/verify')) {
            track('verification_certificat', { lien: href });
        } else if (/github\.com|linkedin\.com/.test(href)) {
            track('clic_reseau', { reseau: href.includes('github') ? 'GitHub' : 'LinkedIn' });
        }
    });

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', () => track('envoi_formulaire_contact'));
    }
})();
