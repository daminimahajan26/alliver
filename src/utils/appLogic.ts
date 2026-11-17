export type PageRoute =
  | 'home'
  | 'services'
  | 'process'
  | 'industries'
  | 'calculator';

export const parseHashRoute = (hash: string): PageRoute => {
  const clean = hash.toLowerCase().replace(/^#/, '').trim();
  if (
    clean === 'services' ||
    clean === 'service'
  ) {
    return 'services';
  }
  if (clean === 'process') {
    return 'process';
  }
  if (clean === 'industries' || clean === 'industry') {
    return 'industries';
  }
  if (clean === 'calculator') {
    return 'calculator';
  }
  return 'home';
};

export const getInitialRouteOnLoad = (): PageRoute => 'home';

export const CONSULTATION_SERVICE_OPTIONS = [
  'Digital Marketing',
  'Creative Production',
  'Branding and Production',
  'Other Services',
] as const;

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const shouldRevealElement = (
  rectTop: number,
  viewportHeight: number,
  buffer = 60
): boolean => {
  if (viewportHeight <= 0) return true;
  return rectTop <= viewportHeight + buffer;
};

export const getUniqueCategories = <T extends { category?: string }>(
  items: T[]
): string[] => {
  const seen = new Set<string>();
  const categories: string[] = ['All'];
  for (const item of items) {
    const cat = item.category?.trim();
    if (cat && !seen.has(cat)) {
      seen.add(cat);
      categories.push(cat);
    }
  }
  return categories;
};

export const mapConsultationPresets = (
  presetService?: string,
  presetSummary?: string
): { selectedServices: string[]; notes: string } => {
  const normalizedService = presetService?.trim() || '';
  const normalizedSummary = presetSummary?.trim() || '';

  const selected = new Set<string>();
  const noteParts: string[] = [];

  if (normalizedService) {
    const exactMatch = CONSULTATION_SERVICE_OPTIONS.find(
      (opt) => opt.toLowerCase() === normalizedService.toLowerCase()
    );

    if (exactMatch) {
      selected.add(exactMatch);
    } else {
      const lower = normalizedService.toLowerCase();
      if (
        lower.includes('digital') ||
        lower.includes('performance') ||
        lower.includes('social') ||
        lower.includes('seo') ||
        lower.includes('growth') ||
        lower.includes('sprint') ||
        lower.includes('retainer') ||
        lower.includes('strategy') ||
        lower.includes('promotion')
      ) {
        selected.add('Digital Marketing');
      }
      if (
        lower.includes('content') ||
        lower.includes('video') ||
        lower.includes('creative') ||
        lower.includes('graphic')
      ) {
        selected.add('Creative Production');
      }
      if (lower.includes('brand')) {
        selected.add('Branding and Production');
      }
      if (selected.size === 0) {
        selected.add('Other Services');
      }
      noteParts.push(`[Inquiry Focus]: ${normalizedService}`);
    }
  }

  if (normalizedSummary) {
    const alreadyContainsFocus =
      normalizedService &&
      normalizedSummary.toLowerCase().includes(normalizedService.toLowerCase());
    if (alreadyContainsFocus && noteParts.length === 1) {
      noteParts.length = 0;
    }
    noteParts.push(`[Forecast / Context]: ${normalizedSummary}`);
  }

  return {
    selectedServices: Array.from(selected),
    notes: noteParts.join('\n\n'),
  };
};
