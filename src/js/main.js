/**
 * InfoHub UEMG Carangola — Lógica Principal da Aplicação
 * Sprint 1: Fundação Institucional & Catálogo Grid 5x2
 * Sprint 2: Suporte a PWA (Service Worker & Instalação) e Modais Semânticos (<dialog>)
 */

import { SERVICES_DATA } from './services-data.js';

let deferredInstallPrompt = null;

/**
 * Exibe notificação temporária amigável (Toast) para serviços em fase de homologação
 * @param {string} title - Título do setor selecionado
 */
function showNotice(title) {
  const existingToast = document.querySelector('.toast-notice');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <div>
      <strong>${title}</strong>: Guia em fase final de validação/homologação pelos alunos extensionistas.
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Renderiza o Catálogo de 10 Serviços Setoriais no Grid 5x2
 */
function renderServicesGrid() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = '';

  SERVICES_DATA.forEach((service) => {
    const card = document.createElement('article');
    card.className = 'service-card';
    card.setAttribute('aria-labelledby', `title-${service.id}`);

    const isExternal = service.targetUrl && service.targetUrl !== '#';

    card.innerHTML = `
      <div class="card-meta-top">
        <span class="card-number-badge">Setor ${service.number}</span>
        <span class="card-category-badge">${service.category}</span>
      </div>

      <div class="card-header-inner">
        <div class="card-icon-box" aria-hidden="true">
          ${service.icon}
        </div>
        <h3 id="title-${service.id}" class="card-title">${service.title}</h3>
      </div>

      <div class="card-body">
        <p class="card-description">${service.description}</p>
      </div>

      <div class="card-footer">
        <div class="card-status-indicator" title="Status de validação setorial">
          <span class="status-dot" aria-hidden="true"></span>
          <span>${service.badgeText}</span>
        </div>

        ${
          isExternal
            ? `<a
                href="${service.targetUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="card-action-btn"
                aria-label="Acessar guia de ${service.title} em nova janela"
              >
                <span>Acessar Guia</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>`
            : `<button
                type="button"
                class="card-action-btn card-action-btn-pending"
                data-sector-title="${service.title}"
                aria-label="Informações sobre o setor ${service.title}"
              >
                <span>Consultar</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>`
        }
      </div>
    `;

    container.appendChild(card);
  });

  // Vincula evento aos botões de consulta em validação
  container.querySelectorAll('.card-action-btn-pending').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const title = e.currentTarget.getAttribute('data-sector-title');
      showNotice(title);
    });
  });
}

/**
 * Inicialização dos Modais Semânticos (<dialog>)
 */
function initModals() {
  const triggers = document.querySelectorAll('.footer-modal-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-modal-target');
      const dialog = document.getElementById(targetId);
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  // Fecha modais ao clicar em botões de fechamento
  document.querySelectorAll('.app-dialog').forEach((dialog) => {
    dialog.querySelectorAll('[data-close-modal]').forEach((closeBtn) => {
      closeBtn.addEventListener('click', () => {
        dialog.close();
      });
    });

    // Fecha se o usuário clicar no backdrop fora do conteúdo
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

/**
 * Inicialização do Suporte a PWA (Service Worker & Botão de Instalação)
 */
function initPwa() {
  const installBtn = document.getElementById('btn-install-pwa');

  // Captura o evento nativo de instalação do navegador
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (installBtn) {
      installBtn.style.display = 'inline-flex';
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) {
        showNotice('Instalação PWA: utilize o menu do seu navegador (Adicionar à Tela Inicial)');
        return;
      }
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      console.log(`[PWA] Escolha do usuário: ${outcome}`);
      deferredInstallPrompt = null;
      installBtn.style.display = 'none';
    });
  }

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] InfoHub instalado com sucesso.');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  });

  // Registro do Service Worker
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[ServiceWorker] Registrado com escopo:', reg.scope);
        })
        .catch((err) => {
          console.warn('[ServiceWorker] Erro no registro:', err);
        });
    });
  }
}

// Inicialização segura ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
  renderServicesGrid();
  initModals();
  initPwa();
});
