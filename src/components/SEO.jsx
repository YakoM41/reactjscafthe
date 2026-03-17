import { useEffect } from 'react';

const SEO = ({ title, description, noindex = false }) => {
  useEffect(() => {
    // Gérer le titre
    if (title) {
      document.title = title;
    }

    // Gérer la méta-description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  useEffect(() => {
    const robotMetaTag = document.querySelector('meta[name="robots"]');

    if (noindex) {
      if (robotMetaTag) {
        robotMetaTag.setAttribute('content', 'noindex, follow');
      } else {
        const newRobotMetaTag = document.createElement('meta');
        newRobotMetaTag.setAttribute('name', 'robots');
        newRobotMetaTag.setAttribute('content', 'noindex, follow');
        document.head.appendChild(newRobotMetaTag);
      }
    } else {
      // Si noindex est faux on supp la balise si elle existe
      if (robotMetaTag) {
        document.head.removeChild(robotMetaTag);
      }
    }

    // Cleanup function pour supprimer la balise quand le composant est démonté
    return () => {
      if (robotMetaTag && noindex) {
        document.head.removeChild(robotMetaTag);
      }
    };
  }, [noindex]);

  return null; // Ce composant ne rend rien
};

export default SEO;
