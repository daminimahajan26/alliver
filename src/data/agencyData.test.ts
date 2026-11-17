import test from 'node:test';
import assert from 'node:assert/strict';
import { AGENCY_INDUSTRIES } from './agencyData.js';

test('AGENCY_INDUSTRIES contains 8 core specialized verticals', () => {
  assert.equal(AGENCY_INDUSTRIES.length, 8);
});

test('Every industry has unique id and unique number', () => {
  const ids = new Set(AGENCY_INDUSTRIES.map((ind) => ind.id));
  const numbers = new Set(AGENCY_INDUSTRIES.map((ind) => ind.number));
  assert.equal(ids.size, 8);
  assert.equal(numbers.size, 8);
});

test('Every industry has non-empty fields and benchmark case', () => {
  for (const ind of AGENCY_INDUSTRIES) {
    assert.ok(ind.title.length > 0, `Title missing for ${ind.id}`);
    assert.ok(ind.sectorCategory.length > 0, `SectorCategory missing for ${ind.id}`);
    assert.ok(ind.tagline.length > 0, `Tagline missing for ${ind.id}`);
    assert.ok(ind.overview.length > 0, `Overview missing for ${ind.id}`);
    assert.ok(ind.categoryReality.length > 0, `CategoryReality missing for ${ind.id}`);
    assert.ok(ind.alliverEdge.length > 0, `AlliverEdge missing for ${ind.id}`);
    assert.ok(ind.keyMetrics.length > 0, `KeyMetrics missing for ${ind.id}`);
    assert.ok(ind.metricContext.length > 0, `MetricContext missing for ${ind.id}`);

    // Benchmark case validation
    assert.ok(ind.benchmarkCase, `BenchmarkCase missing for ${ind.id}`);
    assert.ok(ind.benchmarkCase.brand.length > 0, `Benchmark brand missing for ${ind.id}`);
    assert.ok(ind.benchmarkCase.result.length > 0, `Benchmark result missing for ${ind.id}`);
    assert.ok(ind.benchmarkCase.detail.length > 0, `Benchmark detail missing for ${ind.id}`);

    // Deliverables and audiences
    assert.ok(ind.operationalDeliverables.length >= 3, `Deliverables too short for ${ind.id}`);
    assert.ok(ind.targetAudiences.length >= 3, `Audiences too short for ${ind.id}`);
    assert.ok(ind.recommendedServices.length >= 3, `Services too short for ${ind.id}`);
  }
});
