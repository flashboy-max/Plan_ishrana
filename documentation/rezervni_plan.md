# Rezervni_plan — Konsolidacija Suplementacije (Opcija A)

Kratak sažetak
- Ukloniti sekciju "Suplementacija" iz "Današnji Fokus" i zamijeniti CTA koji otvara Advanced Supplement Manager.
- Centralizirati sve podatke i logiku u Advanced Supplement Manager i (opcionalno) SupplementStore.

Relevantni fajlovi
- [`assets/js/main.js`](assets/js/main.js:1)
- [`assets/js/advancedSupplementManager.js`](assets/js/advancedSupplementManager.js:1)
- [`assets/css/styles.css`](assets/css/styles.css:1)
- [`index.html`](index.html:1)

Patch: main.js - uklanjanje grid-a i dodavanje CTA
- Lokacija: funkcija `generateDayHTML` u [`assets/js/main.js`](assets/js/main.js:1)

```diff
*** Replace in assets/js/main.js (generateDayHTML) ***
-            <div class="supplements-section mb-6">
-                <div class="section-header">
-                    <i class="fas fa-pills section-icon"></i>
-                    <h4 class="section-title">Suplementacija</h4>
-                </div>
-                <div class="supplements-grid">
-                    ${generateSupplementCardsHTML()}
-                </div>
-            </div>
+            <div class="supplements-section mb-6">
+                <div class="section-header">
+                    <i class="fas fa-pills section-icon"></i>
+                    <h4 class="section-title">Suplementacija</h4>
+                </div>
+                <div class="p-4 bg-gray-800/40 rounded-lg text-center">
+                    <p class="text-gray-300 mb-3">
+                        Svi detalji o suplementima i praćenju nalaze se u Advanced Supplement Manageru.
+                    </p>
+                    <a href="#supplement-planner" class="cta-button"
+                       role="button"
+                       aria-label="Otvori Advanced Supplement Manager"
+                       onclick="(function(){const btn=document.querySelector('#supplement-planner').closest('.card').querySelector('.accordion-button'); if(btn && !btn.classList.contains('open')) btn.click(); setTimeout(()=>document.querySelector('#supplement-planner').scrollIntoView({behavior:'smooth', block:'center'}), 200); return false; })();">
+                        <i class="fas fa-tasks mr-2"></i>Upravljanje suplementima
+                    </a>
+                </div>
+            </div>
```

Objašnjenje:
- Uklanja se render dnevnog grid-a (duplikat). CTA otvara accordion i scrolla na manager; 200ms debounce daje vremena za animaciju.

Patch: styles.css - CTA i grid fix
- Append u [`assets/css/styles.css`](assets/css/styles.css:1)

```diff
*** Append to assets/css/styles.css ***
/* CTA Button for Supplement Manager */
.cta-button { display:inline-block; background:#06b6d4; color:#fff; padding:0.75rem 1.25rem; border-radius:0.5rem; font-weight:600; text-decoration:none; transition:all .12s ease; border:1px solid rgba(255,255,255,0.04); }
.cta-button:hover{ background:#0891b2; transform:translateY(-2px); box-shadow:0 6px 18px rgba(8,145,178,0.12); }
.advanced-supplement-container{ overflow:visible!important; min-height:auto!important; }
#danasnji-plan-container .supplements-grid{ grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1rem; align-items:start; }
```

Patch: advancedSupplementManager.js - robust `showTooltip`
- Replace showTooltip implementation in [`assets/js/advancedSupplementManager.js`](assets/js/advancedSupplementManager.js:1)

```diff
*** Replace showTooltip in assets/js/advancedSupplementManager.js ***
showTooltip(trigger, supplementId) {
  const card = trigger.closest('.supplement-card');
  const tooltip = card ? card.querySelector('.supplement-tooltip') : null;
  if (!tooltip) return;
  if (typeof this.populateTooltip === 'function') this.populateTooltip(tooltip, supplementId);
  tooltip.style.display='block'; tooltip.style.visibility='hidden'; tooltip.classList.remove('hidden');
  const rect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const vw = window.innerWidth, vh = window.innerHeight, pad = 12;
  let left = rect.left + (rect.width/2) - (tooltipRect.width/2);
  let top = rect.bottom + 8;
  if (left < pad) left = pad;
  if (left + tooltipRect.width > vw - pad) left = vw - tooltipRect.width - pad;
  if (top + tooltipRect.height > vh - pad) { top = rect.top - tooltipRect.height - 8; tooltip.classList.add('tooltip-above'); if (top < pad) top = Math.max(pad,(vh - tooltipRect.height)/2); } else { tooltip.classList.remove('tooltip-above'); }
  tooltip.style.position='fixed'; tooltip.style.left=`${Math.round(left)}px`; tooltip.style.top=`${Math.round(top)}px`; tooltip.style.zIndex='9999'; tooltip.style.visibility='visible';
}
```

Objašnjenje:
- Koristi `position: fixed`, temporary `display:block` za mjerenje dimenzija, te bounds-clamping da tooltip ostane u viewportu.

Store & data flow (preporuka)
- Dodati `assets/js/supplementStore.js` s API:
  - init(data), getAll(), get(id), markTaken(id), unmarkTaken(id), subscribe(event, handler), emit(event,payload)
- Inicijalizacija: `SupplementStore.init(detailedSupplements); emit('store:ready')`
- Svi renderi (AdvancedManager, eventualno summary) čitaju iz store-a. `populateTooltip` čita iz store-a.

Testing checklist (kratko)
- Fresh load: očekuj konzolne poruke:
  - "Čekam detailedSupplements..." → "✅ Moduli učitani - inicijalizujem Advanced Manager"
  - "🔄 Ažuriram dnevni prikaz sa tooltip podrškom" (ako prikazujemo)
- Hover tooltip: `[GLOBAL TOOLTIP] Positioned at: Xpx, Ypx` (X,Y unutar viewport)
- Nema TypeError: "Cannot read properties of undefined..."
- CTA behavior: klik otvara manager, automatski se scrolla.

Migration & deploy
- Branch: feature/supplement-consolidation
- Commits: "feat(supplements): centralize UI - CTA + store", "fix(tooltip): clamp & safe delegation", "style: CTA"
- PR: uključiti test checklist i screenshots
- Rollback: git revert <merge-commit>

UX copy (BCS)
- CTA button: "Upravljanje suplementima"
- aria-label: "Otvori Advanced Supplement Manager — vidi i upravljaj suplementima"
- Tooltip short: "{name} — Doza: {dose} • Vrijeme: {timeSlots}"

Rezervni plan: naredni koraci
- Ako potvrđuješ Opciju A, aplicirati gore navedene diffs, testirati i deployati na staging.
- Nakon deploya, izvršiti QA checklist.

--- KRAJ DOKUMENTA ---