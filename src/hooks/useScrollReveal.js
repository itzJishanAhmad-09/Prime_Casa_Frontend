import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_CLASS = 'is-revealed';
const TARGET_SELECTOR = '[data-reveal]:not(.is-revealed)';

export default function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      document
        .querySelectorAll('[data-reveal]')
        .forEach((el) => el.classList.add(REVEAL_CLASS));
      return undefined;
    }

    const observed = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(REVEAL_CLASS);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    const scan = () => {
      document.querySelectorAll(TARGET_SELECTOR).forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    scan();

    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);
}
