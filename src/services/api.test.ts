import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_BACKEND_URL, resolveApiBaseUrl } from '../config/api';
import {
  buildLeadSubmissionPayload,
  formatApiErrorMessage,
  formatBookingReference,
  isConfirmedBackendResponse,
} from './api';

test('resolveApiBaseUrl normalizes trailing slashes and falls back to Render URL', () => {
  assert.equal(resolveApiBaseUrl(undefined), DEFAULT_BACKEND_URL);
  assert.equal(resolveApiBaseUrl('   '), DEFAULT_BACKEND_URL);
  assert.equal(
    resolveApiBaseUrl('https://alliver-backend.onrender.com///'),
    'https://alliver-backend.onrender.com'
  );
});

test('buildLeadSubmissionPayload maps consultation form to /api/leads schema', () => {
  const payload = buildLeadSubmissionPayload({
    formData: {
      fullName: '  Marcella Fontaine  ',
      workEmail: '  marcella@maison.com ',
      brandName: ' Maison de Parfum ',
      websiteOrSocial: '',
      phone: ' +971 50 123 4567 ',
      selectedServices: ['Digital Marketing', 'Branding and Production'],
      monthlyBudget: '₹10,00,000 – ₹25,00,000 / mo',
      timeline: 'Within 30 Days',
      targetObjective: '',
      notes: '[Forecast / Context]: Calculated Growth Plan: Luxury Fashion & Apparel',
    },
    bookingDate: '2026-11-20',
    bookingTime: '14:00 (GST / Dubai)',
    isForecast: true,
  });

  assert.equal(payload.name, 'Marcella Fontaine');
  assert.equal(payload.email, 'marcella@maison.com');
  assert.equal(payload.company, 'Maison de Parfum');
  assert.equal(payload.phone, '+971 50 123 4567');
  assert.equal(payload.website, undefined);
  assert.equal(payload.service, 'Digital Marketing, Branding and Production');
  assert.equal(payload.budget, '₹10,00,000 – ₹25,00,000 / mo');
  assert.equal(payload.source, 'growth-forecast-booking');
  assert.match(payload.message || '', /Preferred Discovery Session: 2026-11-20 at 14:00/);
  assert.match(payload.message || '', /Calculated Growth Plan/);
});

test('buildLeadSubmissionPayload marks standard consultation bookings with strategy-call-booking source', () => {
  const payload = buildLeadSubmissionPayload({
    formData: {
      fullName: 'Aarav Mehta',
      workEmail: 'aarav@studio.in',
      brandName: 'Studio Veda',
      websiteOrSocial: 'https://studioveda.in',
      phone: '',
      selectedServices: ['Digital Marketing'],
      monthlyBudget: '₹3,00,000 – ₹10,00,000 / mo',
      timeline: 'Immediately (< 14 days)',
      targetObjective: 'Pipeline growth',
      notes: 'Looking for paid acquisition support.',
    },
    bookingDate: '2026-11-22',
    bookingTime: '11:00 (GST / Dubai)',
    isForecast: false,
  });

  assert.equal(payload.source, 'strategy-call-booking');
  assert.equal(payload.website, 'https://studioveda.in');
  assert.equal(payload.phone, undefined);
});

test('formatApiErrorMessage extracts Zod validation details and handles server errors cleanly', () => {
  assert.equal(
    formatApiErrorMessage(
      {
        error: 'Validation failed',
        details: { email: ['Invalid email'], name: ['Required'] },
      },
      400,
      'Fallback'
    ),
    'email: Invalid email · name: Required'
  );

  assert.match(
    formatApiErrorMessage({ error: 'Server error' }, 500, 'Fallback'),
    /temporarily unavailable/
  );
});

test('formatBookingReference uses backend id or referenceCode when available', () => {
  assert.equal(
    formatBookingReference({ referenceCode: 'ALLIVER-9999-DXB' }),
    'ALLIVER-9999-DXB'
  );
  assert.equal(
    formatBookingReference({ id: 'a1b2c3d4-e5f6' }),
    'ALLIVER-D4E5F6-DXB'
  );
  assert.equal(
    formatBookingReference({ lead: { id: 42 } }),
    'ALLIVER-42-DXB'
  );
});

test('isConfirmedBackendResponse rejects null, errors, and ok:false payloads', () => {
  assert.equal(isConfirmedBackendResponse(null), false);
  assert.equal(isConfirmedBackendResponse({ ok: false }), false);
  assert.equal(isConfirmedBackendResponse({ error: 'Failed' }), false);
  assert.equal(isConfirmedBackendResponse({ ok: true }), true);
  assert.equal(isConfirmedBackendResponse({ id: '123' }), true);
});
