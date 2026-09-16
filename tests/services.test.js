import { describe, it, expect } from 'vitest';
import { SERVICES_DATA } from '../src/js/services-data.js';

describe('Sprint 1 — Validação do Catálogo de Serviços Setoriais (InfoHub UEMG)', () => {
  it('US 2.1.1: deve conter exatamente 10 serviços setoriais para o Grid 5x2', () => {
    expect(SERVICES_DATA).toHaveLength(10);
  });

  it('US 2.1.2: cada serviço deve conter dados válidos de título, categoria, descrição e ícone', () => {
    SERVICES_DATA.forEach((service) => {
      expect(service.id).toMatch(/^\d{2}$/);
      expect(service.number).toMatch(/^\d{2}$/);
      expect(service.title).toBeTruthy();
      expect(service.category).toBeTruthy();
      expect(service.description.length).toBeGreaterThan(20);
      expect(service.icon).toContain('<svg');
      expect(service.badgeText).toBeTruthy();
      expect(service.status).toBeDefined();
    });
  });

  it('todos os IDs e números devem ser sequenciais e únicos de 01 a 10', () => {
    const ids = SERVICES_DATA.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(10);

    for (let i = 1; i <= 10; i++) {
      const expectedId = String(i).padStart(2, '0');
      expect(ids).toContain(expectedId);
    }
  });

  it('segurança de links: links externos não podem ser inseguros ou vazios de forma não tratada', () => {
    SERVICES_DATA.forEach((service) => {
      expect(typeof service.targetUrl).toBe('string');
      // Deve ser '#' (fallback em validação) ou uma URL https:// válida
      if (service.targetUrl !== '#') {
        expect(service.targetUrl.startsWith('https://')).toBe(true);
      }
    });
  });
});
