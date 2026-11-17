import { useEffect, useRef, useState } from 'react';
import { shouldRevealElement } from '../utils/appLogic';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(buffer = 60) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const checkPosition = () => {
      const rect = el.getBoundingClientRect();
      if (shouldRevealElement(rect.top, window.innerHeight, buffer)) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight + buffer) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '80px 0px 80px 0px' }
    );

    observer.observe(el);

    const rafId = window.requestAnimationFrame(checkPosition);
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, [buffer, isVisible]);

  return [ref, isVisible] as const;
}

export function useMultiScrollReveal<T extends HTMLElement = HTMLDivElement>(
  attributeName = 'data-card-index',
  buffer = 60
) {
  const containerRef = useRef<T>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(`[${attributeName}]`)
    );
    if (elements.length === 0) return;

    const revealIndex = (idx: number) => {
      setVisibleIndices((prev) => {
        if (prev.has(idx)) return prev;
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
    };

    const checkAllPositions = () => {
      elements.forEach((el) => {
        const idxStr = el.getAttribute(attributeName);
        if (idxStr === null) return;
        const idx = parseInt(idxStr, 10);
        const rect = el.getBoundingClientRect();
        if (shouldRevealElement(rect.top, window.innerHeight, buffer)) {
          revealIndex(idx);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top <= window.innerHeight + buffer
          ) {
            const idxStr = entry.target.getAttribute(attributeName);
            if (idxStr !== null) {
              revealIndex(parseInt(idxStr, 10));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0, rootMargin: '80px 0px 80px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    const rafId = window.requestAnimationFrame(checkAllPositions);
    window.addEventListener('scroll', checkAllPositions, { passive: true });
    window.addEventListener('resize', checkAllPositions, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', checkAllPositions);
      window.removeEventListener('resize', checkAllPositions);
    };
  }, [attributeName, buffer]);

  return [containerRef, visibleIndices] as const;
}
