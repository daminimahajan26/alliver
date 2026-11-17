import { API_ENDPOINTS } from '../config/api';
import { ConsultationFormData } from '../types';

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  service?: string;
  budget?: string;
  message?: string;
  source: 'strategy-call-booking' | 'growth-forecast-booking';
}

export interface LeadSubmissionResponse {
  id?: string | number;
  referenceCode?: string;
  lead?: {
    id?: string | number;
    name?: string;
    email?: string;
  };
  ok?: boolean;
  message?: string;
}

export interface NewsletterSubmissionResponse {
  id?: string | number;
  ok?: boolean;
  message?: string;
  email?: string;
}

interface BuildLeadPayloadParams {
  formData: ConsultationFormData;
  bookingDate: string;
  bookingTime: string;
  isForecast: boolean;
}

const REQUEST_TIMEOUT_MS = 30000;

export const buildLeadSubmissionPayload = ({
  formData,
  bookingDate,
  bookingTime,
  isForecast,
}: BuildLeadPayloadParams): LeadSubmissionPayload => {
  const messageLines: string[] = [
    `Preferred Discovery Session: ${bookingDate} at ${bookingTime}`,
    `Target Timeline: ${formData.timeline}`,
  ];

  if (formData.targetObjective.trim()) {
    messageLines.push(`Target Objective: ${formData.targetObjective.trim()}`);
  }

  if (formData.notes.trim()) {
    messageLines.push(`Objectives & Notes:\n${formData.notes.trim()}`);
  }

  const payload: LeadSubmissionPayload = {
    name: formData.fullName.trim(),
    email: formData.workEmail.trim(),
    source: isForecast ? 'growth-forecast-booking' : 'strategy-call-booking',
    message: messageLines.join('\n'),
  };

  const company = formData.brandName.trim();
  if (company) payload.company = company;

  const phone = formData.phone.trim();
  if (phone) payload.phone = phone;

  const website = formData.websiteOrSocial.trim();
  if (website) payload.website = website;

  const service = formData.selectedServices.join(', ').trim();
  if (service) payload.service = service;

  const budget = formData.monthlyBudget.trim();
  if (budget) payload.budget = budget;

  return payload;
};

export const formatApiErrorMessage = (
  data: unknown,
  status: number,
  fallback: string
): string => {
  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    const details = record.details;

    if (details && typeof details === 'object' && !Array.isArray(details)) {
      const detailEntries = Object.entries(details as Record<string, unknown>)
        .map(([field, errs]) => {
          if (Array.isArray(errs) && errs.length > 0) {
            return `${field}: ${String(errs[0])}`;
          }
          if (typeof errs === 'string' && errs.trim()) {
            return `${field}: ${errs}`;
          }
          return null;
        })
        .filter((item): item is string => Boolean(item));

      if (detailEntries.length > 0) {
        return detailEntries.join(' · ');
      }
    }

    if (typeof record.message === 'string' && record.message.trim()) {
      return record.message.trim();
    }

    if (typeof record.error === 'string' && record.error.trim()) {
      return status >= 500
        ? 'Our server is waking up or temporarily unavailable. Please try again in a moment.'
        : record.error.trim();
    }
  }

  if (status >= 500) {
    return 'Our server is waking up or temporarily unavailable. Please try again in a moment.';
  }

  return fallback;
};

export const formatBookingReference = (
  response: LeadSubmissionResponse | null | undefined
): string => {
  if (response?.referenceCode && response.referenceCode.trim()) {
    return response.referenceCode.trim();
  }
  const rawId = response?.id ?? response?.lead?.id;
  if (rawId !== undefined && rawId !== null && String(rawId).trim()) {
    const cleanId = String(rawId)
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(-6)
      .toUpperCase();
    if (cleanId) {
      return `ALLIVER-${cleanId}-DXB`;
    }
  }
  return `ALLIVER-${Math.floor(1000 + Math.random() * 9000)}-DXB`;
};

export const isConfirmedBackendResponse = (data: unknown): boolean => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return false;
  }
  const record = data as Record<string, unknown>;
  if (record.ok === false || typeof record.error === 'string') {
    return false;
  }
  return true;
};

async function postJson<TResponse>(
  url: string,
  payload: unknown,
  fallbackError: string
): Promise<TResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const data: unknown = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : null;

    if (!response.ok || !isConfirmedBackendResponse(data)) {
      throw new Error(formatApiErrorMessage(data, response.status, fallbackError));
    }

    return data as TResponse;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(
        'The request timed out while connecting to the server. Please try again.'
      );
    }
    if (error instanceof TypeError) {
      throw new Error(
        'Unable to reach the server right now. Please check your connection and try again.'
      );
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(fallbackError);
  } finally {
    clearTimeout(timer);
  }
}

export const checkBackendHealth = async (): Promise<{ ok: boolean }> => {
  const response = await fetch(API_ENDPOINTS.health, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Backend health check failed.');
  }
  const data = (await response.json()) as { ok?: boolean };
  return { ok: Boolean(data?.ok) };
};

export const submitLead = async (
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResponse> => {
  return postJson<LeadSubmissionResponse>(
    API_ENDPOINTS.leads,
    payload,
    'Unable to submit your strategy booking. Please try again.'
  );
};

export const subscribeNewsletter = async (
  email: string
): Promise<NewsletterSubmissionResponse> => {
  return postJson<NewsletterSubmissionResponse>(
    API_ENDPOINTS.newsletter,
    { email: email.trim() },
    'Unable to complete your subscription right now. Please try again.'
  );
};
