/* ===========================
Universal Navigation Script (Final Cleaned)
=========================== */
document.addEventListener('DOMContentLoaded', function () {
// --- Feather Icons Init ---
if (window.feather) feather.replace();

// ===========================
// ACTIVE LINK HIGHLIGHT
// ===========================
const navLinks = document.querySelectorAll('.nav .links a, .mobile-menu a');
const current = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
const hrefFile = (link.getAttribute('href') || '').split('/').pop();
if (hrefFile === current || (hrefFile === 'index.html' && current === '')) {
link.classList.add('active');
link.setAttribute('aria-current', 'page');
}
});

// ===========================
// VANTA BACKGROUND EFFECT
// ===========================
try {
if (window.VANTA && VANTA.NET && document.getElementById('banner')) {
VANTA.NET({
el: '#banner',
mouseControls: true,
touchControls: true,
gyroControls: false,
minHeight: 200.00,
minWidth: 200.00,
scale: 1.00,
scaleMobile: 1.00,
color: 0x3b82f6,
backgroundColor: 0x111827,
points: 12.00,
maxDistance: 22.00,
spacing: 18.00
});
}
} catch (e) {
console.warn('Vanta initialization failed:', e);
}

// ===========================
// SMOOTH SCROLL FOR ANCHORS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
const target = document.querySelector(this.getAttribute('href'));
if (target) {
e.preventDefault();
target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
});
});

// ===========================
// ENTRANCE / SCROLL ANIMATIONS
// ===========================
window.addEventListener('load', () => {
document.body.classList.add('loaded');
setTimeout(() => {
document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach((el, index) => {
setTimeout(() => {
el.style.opacity = '1';
el.style.transform = 'translateY(0)';
}, index * 200);
});
}, 100);
});

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) entry.target.classList.add('animate-in');
});
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section, .goal-card, .spark-card, .box')
.forEach(el => observer.observe(el));
});

// ===========================
// Inline Style Injection (Menu + Active Links)
// ===========================
const navStyle = document.createElement('style');
navStyle.textContent = `
.mobile-menu {
position: fixed;
top: 70px;
left: 12px;
right: 12px;
background: rgba(6, 8, 10, 0.95);
backdrop-filter: blur(8px);
border-radius: 12px;
padding: 16px;
box-shadow: 0 8px 40px rgba(2, 6, 12, 0.8);
z-index: 99999;
display: flex;
flex-direction: column;
opacity: 0;
transform: translateY(-100%);
visibility: hidden;
transition: all 0.35s ease;
pointer-events: none;
transform-origin: top center;
}

.mobile-menu.show {
opacity: 1;
transform: translateY(0);
visibility: visible;
pointer-events: auto;
}

.mobile-menu a {
color: #fff;
text-decoration: none;
padding: 10px 0;
transition: color 0.3s ease, background 0.3s ease;
border-radius: 6px;
padding-left: 8px;
}

.mobile-menu a:hover {
color: var(--neon, #00e5b4);
background: rgba(255, 255, 255, 0.05);
}

@media (max-width: 920px) {
.nav .links { display: none; }
.hamburger { display: inline-flex; cursor: pointer; }
}

@media (min-width: 921px) {
.hamburger { display: none; }
.mobile-menu { display: none !important; }
}

.nav .links a.active,
.mobile-menu a.active {
color: var(--neon, #00e5b4);
font-weight: 600;
position: relative;
}

.nav .links a.active::after,
.mobile-menu a.active::after {
content: '';
position: absolute;
bottom: -6px;
left: 0;
width: 100%;
height: 2px;
background: var(--neon, #00e5b4);
border-radius: 2px;
}
`;
document.head.appendChild(navStyle);
