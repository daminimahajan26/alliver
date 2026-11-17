export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: string;
  channels: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'Luxury & Fragrance' | 'High Fashion' | 'Hospitality' | 'Gourmet & Dining' | 'Luxury Maritime' | string;
  year: string;
  heroImage: string;
  headlineMetric: string;
  headlineMetricLabel: string;
  secondaryMetric: string;
  secondaryMetricLabel?: string;
  challenge: string;
  strategy: string;
  deliverables: string[];
  duration: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  brand: string;
  location: string;
  metric: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationFormData {
  fullName: string;
  workEmail: string;
  brandName: string;
  websiteOrSocial: string;
  phone: string;
  selectedServices: string[];
  monthlyBudget: string;
  timeline: string;
  targetObjective: string;
  notes: string;
}

export interface IndustryItem {
  id: string;
  number: string;
  title: string;
  sectorCategory: string;
  tagline: string;
  overview: string;
  categoryReality: string;
  alliverEdge: string;
  keyMetrics: string;
  metricContext: string;
  benchmarkCase: {
    brand: string;
    result: string;
    detail: string;
  };
  recommendedServices: string[];
  operationalDeliverables: string[];
  typicalTimeline: string;
  targetAudiences: string[];
}
