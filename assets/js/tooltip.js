// Tooltip funkcionalnost za suplemente
function initializeTooltips() {
    // Event delegation za hover na supplement linkove
    document.addEventListener('mouseenter', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('supplement-link')) {
            e.preventDefault();
            showTooltip(e.target, e.target.dataset.supplement);
        }
    }, true);

    document.addEventListener('mouseleave', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('supplement-link')) {
            hideTooltip();
        }
    }, true);
}

function showTooltip(element, supplementName) {
    const details = detaljiSuplemenata[supplementName];
    if (!details) return;

    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;

    // Popuni sadržaj tooltip-a
    tooltip.querySelector('.tooltip-title').innerHTML = `<i class="fas fa-pill"></i> ${supplementName}`;
    tooltip.querySelector('.tooltip-brand').textContent = `Brend: ${details.brend}`;
    tooltip.querySelector('.tooltip-notes').textContent = details.napomene;

    // Pozicioniraj tooltip
    positionTooltip(tooltip, element);

    // Prikaži tooltip
    tooltip.classList.remove('hidden');
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.classList.add('hidden');
        }, 200);
    }
}

function positionTooltip(tooltip, element) {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Izračunaj poziciju
    let top = rect.bottom + scrollTop + 10;
    let left = rect.left + scrollLeft + (rect.width / 2) - (tooltipRect.width / 2);
    
    // Prověri da li tooltip izlazi van ekrana
    if (left < 10) {
        left = 10;
    } else if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    
    if (top + tooltipRect.height > window.innerHeight + scrollTop - 10) {
        // Prikaži tooltip iznad elementa
        top = rect.top + scrollTop - tooltipRect.height - 10;
    }
    
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
}
