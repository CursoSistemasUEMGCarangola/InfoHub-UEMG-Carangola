import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Sprint 2 — Validação de PWA, Governança e Modais', () => {
  const rootDir = process.cwd();

  it('US 3.1.1: o arquivo manifest.webmanifest deve ser um JSON válido e conter atributos obrigatórios de PWA', () => {
    const manifestPath = path.join(rootDir, 'public', 'manifest.webmanifest');
    expect(fs.existsSync(manifestPath)).toBe(true);

    const raw = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(raw);

    expect(manifest.name).toBe('InfoHub UEMG Carangola');
    expect(manifest.short_name).toBe('InfoHub UEMG');
    expect(manifest.display).toBe('standalone');
    expect(manifest.start_url).toBe('/');
    expect(manifest.theme_color).toBe('#003366');
    expect(manifest.icons).toBeInstanceOf(Array);
    expect(manifest.icons.length).toBeGreaterThanOrEqual(1);

    const hasAnyMaskable = manifest.icons.some(
      (icon) => icon.purpose && icon.purpose.includes('maskable')
    );
    expect(hasAnyMaskable).toBe(true);
  });

  it('US 3.1.1: o Service Worker (sw.js) deve existir na raiz pública com cache do App Shell', () => {
    const swPath = path.join(rootDir, 'public', 'sw.js');
    expect(fs.existsSync(swPath)).toBe(true);

    const swContent = fs.readFileSync(swPath, 'utf-8');
    expect(swContent).toContain('CACHE_NAME');
    expect(swContent).toContain('APP_SHELL_ASSETS');
    expect(swContent).toContain('install');
    expect(swContent).toContain('activate');
    expect(swContent).toContain('fetch');
  });

  it('US 4.1.1 & US 4.1.2: index.html deve conter os 3 modais semânticos <dialog> com identificadores corretos', () => {
    const htmlPath = path.join(rootDir, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Verifica a presença dos 3 modais
    expect(html).toContain('id="modal-sobre"');
    expect(html).toContain('id="modal-termos"');
    expect(html).toContain('id="modal-privacidade"');

    // Verifica menções essenciais à extensão e LGPD
    expect(html).toContain('Programação 2');
    expect(html).toContain('Sistemas de Informação');
    expect(html).toContain('Lei nº 13.709/2018');
    expect(html).toContain('Vercel');
  });

  it('US 5.1.1: vercel.json deve conter headers de segurança apropriados', () => {
    const vercelPath = path.join(rootDir, 'vercel.json');
    expect(fs.existsSync(vercelPath)).toBe(true);

    const raw = fs.readFileSync(vercelPath, 'utf-8');
    const vercelConfig = JSON.parse(raw);

    expect(vercelConfig.headers).toBeInstanceOf(Array);
    const globalHeaderRule = vercelConfig.headers.find((h) => h.source === '/(.*)');
    expect(globalHeaderRule).toBeDefined();

    const keys = globalHeaderRule.headers.map((h) => h.key);
    expect(keys).toContain('X-Content-Type-Options');
    expect(keys).toContain('X-Frame-Options');
    expect(keys).toContain('Referrer-Policy');
  });
});
