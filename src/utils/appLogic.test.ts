import test from 'node:test';
import assert from 'node:assert/strict';
import {
  shouldRevealElement,
  isValidEmail,
  getUniqueCategories,
  mapConsultationPresets,
  parseHashRoute,
  getInitialRouteOnLoad,
} from './appLogic';

test('shouldRevealElement reveals elements inside, near, or scrolled past viewport', () => {
  assert.equal(shouldRevealElement(400, 844), true);
  assert.equal(shouldRevealElement(900, 844, 60), true);
  assert.equal(shouldRevealElement(-350, 844), true);
  assert.equal(shouldRevealElement(1100, 844, 60), false);
});

test('isValidEmail rejects malformed addresses and accepts valid business emails', () => {
  assert.equal(isValidEmail('executive@company.com'), true);
  assert.equal(isValidEmail('  founder@alliver.co.uk '), true);
  assert.equal(isValidEmail('user@'), false);
  assert.equal(isValidEmail('invalid.com'), false);
  assert.equal(isValidEmail('user@domain'), false);
});

test('getUniqueCategories builds deduplicated filter list starting with All', () => {
  const categories = getUniqueCategories([
    { category: 'Luxury & Fragrance' },
    { category: 'High Fashion' },
    { category: 'Luxury & Fragrance' },
    { category: '' },
    { category: 'Gourmet & Dining' },
  ]);
  assert.deepEqual(categories, [
    'All',
    'Luxury & Fragrance',
    'High Fashion',
    'Gourmet & Dining',
  ]);
});

test('mapConsultationPresets maps UI buttons and preserves summary without stale state', () => {
  const exact = mapConsultationPresets('Digital Marketing', undefined);
  assert.deepEqual(exact, { selectedServices: ['Digital Marketing'], notes: '' });

  const servicePreset = mapConsultationPresets(
    'Branding & Brand Identity',
    'Inquiring for: Branding & Brand Identity'
  );
  assert.deepEqual(servicePreset, {
    selectedServices: ['Branding and Production'],
    notes: '[Forecast / Context]: Inquiring for: Branding & Brand Identity',
  });

  const sectorPreset = mapConsultationPresets(
    'A. FOOD AND HOSPITALITY',
    undefined
  );
  assert.deepEqual(sectorPreset, {
    selectedServices: ['Other Services'],
    notes: '[Inquiry Focus]: A. FOOD AND HOSPITALITY',
  });

  const sprintPreset = mapConsultationPresets('30-Day Growth Sprint', undefined);
  assert.deepEqual(sprintPreset, {
    selectedServices: ['Digital Marketing'],
    notes: '[Inquiry Focus]: 30-Day Growth Sprint',
  });
});

test('getInitialRouteOnLoad always starts on home page on load or reload', () => {
  assert.equal(getInitialRouteOnLoad(), 'home');
});

test('parseHashRoute maps valid hashes and falls back removed or unknown routes to home', () => {
  assert.equal(parseHashRoute('#services'), 'services');
  assert.equal(parseHashRoute('#service'), 'services');
  assert.equal(parseHashRoute('#industries'), 'industries');
  assert.equal(parseHashRoute('#industry'), 'industries');
  assert.equal(parseHashRoute('#process'), 'process');
  assert.equal(parseHashRoute('#calculator'), 'calculator');
  assert.equal(parseHashRoute(''), 'home');
  assert.equal(parseHashRoute('#'), 'home');
  assert.equal(parseHashRoute('#faq'), 'home');
  assert.equal(parseHashRoute('#testimonials'), 'home');
  assert.equal(parseHashRoute('#work'), 'home');
});
