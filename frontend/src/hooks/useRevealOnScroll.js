import { useEffect } from 'react';

export default function useRevealOnScroll(root = null) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { root, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );

    const candidates = document.querySelectorAll('.anim-fade, .anim-up, .anim-scale');
    candidates.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [root]);
}