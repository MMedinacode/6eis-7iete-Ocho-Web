/* =====================================================================
   SEIS SIETE OCHO — script.js (Vanilla JS)
   ===================================================================== */

/* ===================== NAVEGACIÓN SPA POR PESTAÑAS ===================== */
const navLinks = document.querySelectorAll('[data-tab]');
const panels = document.querySelectorAll('.tab-panel');

function goToTab(tabId){
  panels.forEach(p => p.classList.toggle('active', p.dataset.tabPanel === tabId));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tabId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('main-nav').classList.remove('open');
}

navLinks.forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    goToTab(el.dataset.tab);
  });
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});

/* ===================== SCROLL REVEAL ===================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
// Vuelve a observar cuando cambian de pestaña (por si el panel estaba oculto al cargar)
panels.forEach(p => {
  const mo = new MutationObserver(() => {
    if (p.classList.contains('active')) {
      p.querySelectorAll('.fade-up').forEach(el => {
        if (!el.classList.contains('show')) observer.observe(el);
      });
    }
  });
  mo.observe(p, { attributes: true, attributeFilter: ['class'] });
});

/* ===================== DATOS REALES DE LA CARTA ===================== */
/* Fuente: flyer oficial impreso "Cafetería de Especialidad" (más reciente que las pizarras
   negras fotografiadas antes). Ese flyer imprime ambas direcciones (Temuco y Santiago) al pie
   de la misma hoja de precios, por lo que los precios de bebidas calientes y frías son los
   MISMOS en ambas sedes. Especiales y Extras no tuvieron confirmación en ese flyer: se
   mantienen los valores de la pizarra anterior. CONFIRMAR CARTA VIGENTE CON EL CLIENTE. */
/* Para agregarle foto a un producto, súmale la propiedad img con la URL (jpg/png), ej:
   { id:'c1', cat:'calientes', name:'Espresso', desc:'...', price:2200, img:'https://.../espresso.jpg' } */
const MENU_CALIENTES = [
  { id:'c1', cat:'calientes', name:'Espresso', desc:'Base de toda la carta caliente.', price:2200 },
  { id:'c2', cat:'calientes', name:'Americano', desc:'Espresso doble alargado con agua caliente.', price:2500 },
  { id:'c3', cat:'calientes', name:'Cortado', desc:'Espresso doble con un toque de leche, 80ml.', price:2600 },
  { id:'c4', cat:'calientes', name:'Flat White', desc:'Espresso doble con leche texturizada fina, 160ml.', price:2700 },
  { id:'c5', cat:'calientes', name:'Capuccino', desc:'Espresso doble, leche vaporizada y espuma, 200ml.', price:2800 },
  { id:'c6', cat:'calientes', name:'Latte', desc:'Espresso doble con leche vaporizada, 250ml.', price:3000, note:'XL 360ml $3.400' },
  { id:'c7', cat:'calientes', name:'Moca / Moca Blanco', desc:'Espresso, chocolate (o chocolate blanco) y leche vaporizada, 360ml.', price:3800 },
  { id:'c8', cat:'calientes', name:'Chocolate', desc:'Chocolate caliente clásico, 360ml.', price:3800 },
  { id:'c9', cat:'calientes', name:'Matcha Latte', desc:'Matcha ceremonial con leche vaporizada, 360ml.', price:3600 },
  { id:'c10', cat:'calientes', name:'Chai Latte', desc:'Especias chai con leche vaporizada, 360ml.', price:3600 },
  { id:'c11', cat:'calientes', name:'Golden Milk', desc:'Cúrcuma y especias con leche vaporizada, 360ml.', price:3600 },
];

const MENU_FRIAS = [
  { id:'f1', cat:'frias', name:'Americano frío', desc:'Espresso doble con agua fría.', price:2900 },
  { id:'f2', cat:'frias', name:'Latte frío', desc:'Espresso doble con leche fría.', price:3700 },
  { id:'f3', cat:'frias', name:'Espresso Tónica', desc:'Espresso doble sobre agua tónica.', price:3600 },
  { id:'f4', cat:'frias', name:'Espresso Ginger', desc:'Espresso doble con ginger ale.', price:3900 },
  { id:'f5', cat:'frias', name:'Moca / Moca Blanco', desc:'Espresso, chocolate (o chocolate blanco) y leche fría.', price:4000 },
  { id:'f6', cat:'frias', name:'Chocolate frío', desc:'Chocolate helado.', price:3800 },
  { id:'f7', cat:'frias', name:'Matcha Latte frío', desc:'Matcha con leche fría.', price:3800 },
  { id:'f8', cat:'frias', name:'Chai Latte frío', desc:'Chai con leche fría.', price:3800 },
  { id:'f9', cat:'frias', name:'Golden Milk frío', desc:'Cúrcuma y especias con leche fría.', price:3800 },
];

const MENU_ESPECIALES = [
  { id:'e6', cat:'especiales', name:'Seis', desc:'Un tazón para abrigarse: hojicha, mandarina y miel, con leche de avena texturizada.', price:5100 },
  { id:'e7', cat:'especiales', name:'Sie7e', desc:'No es vinito, pero lo recuerda: americano con syrup navegado, terminado con naranja deshidratada.', price:5100 },
  { id:'e8', cat:'especiales', name:'Ocho', desc:'Inspirada en la sopaipilla pasada: leche con puré de zapallo, syrup de chancaca y especias, con semillas de zapallo.', price:5100 },
];
const MENU_EXTRAS = [
  { id:'x1', cat:'extras', name:'Shot de espresso extra', desc:'Súmalo a cualquier bebida.', price:600 },
  { id:'x2', cat:'extras', name:'Bola de helado de vainilla', desc:'Para acompañar o sumar a tu bebida.', price:1000 },
];

const MENUS = {
  scl: [...MENU_CALIENTES, ...MENU_FRIAS, ...MENU_ESPECIALES, ...MENU_EXTRAS],
  tco: [...MENU_CALIENTES, ...MENU_FRIAS, ...MENU_ESPECIALES, ...MENU_EXTRAS],
};

const fmt = n => '$' + n.toLocaleString('es-CL');

const ICONS = {
  calientes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="100%" height="100%"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c0 1-1 1-1 2s1 1 1 2M12 3c0 1-1 1-1 2s1 1 1 2"/></svg>',
  frias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="100%" height="100%"><path d="M6 3h12l-1.2 15.5A2 2 0 0 1 14.8 20H9.2a2 2 0 0 1-2-1.5L6 3z"/><path d="M9 8h6M8 12h8"/></svg>',
  especiales: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="100%" height="100%"><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/><circle cx="12" cy="12" r="5"/></svg>',
  extras: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" width="100%" height="100%"><path d="M12 4v16M4 12h16"/></svg>'
};

/* ===================== RENDER MENU ===================== */
let activeCat = 'todas';
const grid = document.getElementById('menu-grid');
function renderMenu(filter){
  activeCat = filter;
  grid.innerHTML = '';
  const source = MENUS[currentLoc];
  const items = filter === 'todas' ? source : source.filter(m => m.cat === filter);
  items.forEach((item) => {
    const card = document.createElement('button');
    card.className = 'menu-card';
    const media = item.img
      ? `<img src="${item.img}" alt="${item.name}" class="menu-card-photo">`
      : `<div class="menu-card-icon">${ICONS[item.cat]}</div>`;
    card.innerHTML = `
      ${media}
      <div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="menu-card-bottom">
        <span class="menu-card-price">${fmt(item.price)}</span>
        <span class="menu-card-cta">Ver +</span>
      </div>`;
    card.addEventListener('click', () => openModal(item));
    grid.appendChild(card);
  });
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.cat);
  });
});

/* ===================== MODAL DE PRODUCTO ===================== */
const modalOverlay = document.getElementById('modal-overlay');
let currentItem = null;
function openModal(item){
  currentItem = item;
  const iconEl = document.getElementById('modal-icon');
  iconEl.innerHTML = item.img
    ? `<img src="${item.img}" alt="${item.name}" class="modal-photo">`
    : ICONS[item.cat];
  iconEl.classList.toggle('modal-icon--photo', !!item.img);
  document.getElementById('modal-name').textContent = item.name;
  document.getElementById('modal-desc').textContent = item.desc;
  document.getElementById('modal-note').textContent = item.note || '';
  document.getElementById('modal-price').textContent = fmt(item.price);
  modalOverlay.classList.remove('hidden');
}
function closeModal(){ modalOverlay.classList.add('hidden'); }
document.getElementById('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.getElementById('modal-add').addEventListener('click', () => {
  if (currentItem){ addToCart(currentItem); closeModal(); openDrawer(); }
});

/* ===================== CARRITO ===================== */
let cart = [];
function addToCart(item){
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}
function renderCart(){
  const wrap = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const totalCount = cart.reduce((s, c) => s + c.qty, 0);
  countEl.textContent = totalCount;
  countEl.classList.toggle('hidden', totalCount === 0);

  if (cart.length === 0){
    wrap.innerHTML = '<p class="cart-empty">Tu bolsa está vacía.</p>';
  } else {
    wrap.innerHTML = cart.map(c => `
      <div class="cart-line">
        <div>
          <p class="cart-line-name">${c.name}</p>
          <p class="cart-line-meta">${fmt(c.price)} · x${c.qty}</p>
        </div>
        <div class="qty-btns">
          <button data-id="${c.id}" class="qty-btn qty-minus">−</button>
          <button data-id="${c.id}" class="qty-btn qty-plus">+</button>
        </div>
      </div>`).join('');
    wrap.querySelectorAll('.qty-plus').forEach(b => b.addEventListener('click', () => {
      cart.find(c => c.id === b.dataset.id).qty += 1; renderCart();
    }));
    wrap.querySelectorAll('.qty-minus').forEach(b => b.addEventListener('click', () => {
      const it = cart.find(c => c.id === b.dataset.id);
      it.qty -= 1;
      if (it.qty <= 0) cart = cart.filter(c => c.id !== b.dataset.id);
      renderCart();
    }));
  }
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  document.getElementById('cart-total').textContent = fmt(total);
}
renderCart();

/* Drawer abrir/cerrar */
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
function openDrawer(){ drawer.classList.remove('hidden-drawer'); overlay.classList.remove('hidden'); }
function closeDrawer(){ drawer.classList.add('hidden-drawer'); overlay.classList.add('hidden'); }
document.getElementById('cart-btn').addEventListener('click', openDrawer);
document.getElementById('drawer-close').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

/* Modo de entrega (Despacho deshabilitado: no disponible según Google Maps) */
document.querySelectorAll('.mode-btn').forEach(b => b.addEventListener('click', () => {
  if (b.disabled) return;
  document.querySelectorAll('.mode-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
}));

/* ===================== PEDIDO POR WHATSAPP ===================== */
/* NÚMERO PLACEHOLDER: no se encontró WhatsApp confirmado en el material entregado (IG, Maps,
   fotos). Reemplazar por el número real del negocio antes de publicar. */
const WHATSAPP_NUMBER = '56900000000';
function buildWaMessage(){
  if (cart.length === 0) return 'Hola! Quisiera hacer un pedido en Seis Siete Ocho.';
  let msg = 'Hola! Quisiera pedir:%0A';
  cart.forEach(c => { msg += `- ${c.name} x${c.qty} (${fmt(c.price * c.qty)})%0A`; });
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  msg += `Total: ${fmt(total)}%0AMétodo: Retiro en local (sede ${LOCATIONS[currentLoc].label})`;
  return msg;
}
document.getElementById('wa-send').addEventListener('click', () => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWaMessage()}`, '_blank');
});
document.getElementById('wa-visit').addEventListener('click', (e) => {
  e.preventDefault();
  const locLabel = LOCATIONS[currentLoc].label;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quisiera%20consultar%20por%20Seis%20Siete%20Ocho%20(sede%20${locLabel}).`, '_blank');
});
function refreshOrderBarLink(){
  document.getElementById('order-wa').href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quisiera%20hacer%20un%20pedido%20en%20Seis%20Siete%20Ocho.`;
}

/* ===================== SEDES / HORARIOS / ABIERTO-CERRADO ===================== */
/* Horarios reales confirmados vía Instagram @seis.siete.ocho (highlights "Horario SCL" y
   "Horario TCO"). La segunda sede está en TEMUCO, no en Concepción: se verificó contra el
   highlight oficial de Instagram, que es la fuente más confiable disponible. */
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

/* Las 2 fotos de "local-photo-1/2" (sección Historia) son las de Santiago (barra + estación) y
   por ahora son fijas para ambas sedes — todavía no tengo los archivos de las 3 fotos de Temuco
   como imágenes descargables (solo las vi pegadas en el chat, no las puedo tomar desde ahí).
   Cuando el cliente las mande como archivo, reemplaza el src de #local-photo-1/2 en index.html
   (o conviértelo en swap por JS con un array localPhotos por sede, como MENUS/LOCATIONS). */

const LOCATIONS = {
  scl: {
    label: 'Santiago',
    title: 'Edificio Acuario,<br>Irarrázaval.',
    heroAddress: 'Av. Irarrázaval 3601 · Edificio Acuario · Ñuñoa',
    heroDesc: 'Cafetería de especialidad en el corazón de Ñuñoa. Café de autor, latte art hecho a mano y bebidas que cambian con la estación.',
    historiaP1: 'Seis, siete, ocho no es una fórmula: es la cuenta que hacemos antes de que salga cada pedido bien hecho. Nacimos en un local pequeño del Edificio Acuario, en pleno Irarrázaval, con la idea de que el café de especialidad no tiene por qué sentirse solemne.',
    historiaP2: 'Cada número tiene su propia bebida — y cada bebida, una razón de estación. El resto de la carta se apoya siempre en lo mismo: espresso doble, buena leche texturizada y ningún atajo.',
    address: 'Av. Irarrázaval 3601, Local 4<br>Edificio Acuario, Ñuñoa, Región Metropolitana',
    footerAddress: 'Av. Irarrázaval 3601, Local 4 · Edificio Acuario · Ñuñoa',
    mapsQuery: 'Seis+Siete+Ocho+Av.+Irarrazaval+3601+Local+4+Nunoa+Santiago',
    placeId: '0x9662cf51b22f9a7f:0xbdac1229df6d73c5',
    mapsReviews: 'https://search.google.com/local/writereview?placeid=0x9662cf51b22f9a7f:0xbdac1229df6d73c5',
    rating: '5.0',
    ratingCount: 125,
    reviews: [
      { text: 'Este último tiempo ha sido y es mi cafetería favorita, voy todos los días me encanta el cafecito, y sobretodo conversar con Nati, Benja y Nico. Se ha hecho un grupito hermoso de conversaciones matutinas. Lo recomiendo 100%.', author: 'Shannon Figueroa Briones', meta: 'Google Maps · Consumo en el lugar' },
      { text: 'Para mí el mejor café, en todas sus preparaciones desde un capuccino a un espresso cranberry. Los chicos que le dan el nombre 678 son muy simpáticos y amables. Se les tiene mucho cariño a este equipo.', author: 'Alison Marttz', meta: 'Google Maps · 6 opiniones' },
      { text: 'Tenía muchas ganas de ir a este cafecito. No defraudó. Me tomé un flat white muy rico, la leche bien texturizada y firme. Me dijeron que trabajan todo sin lactosa, excelente para mí. El lugar es pequeño y muy acogedor.', author: 'Javiera Pérez de Albéniz', meta: 'Google Maps · Local Guide · 106 opiniones' },
    ],
    hours: {
      0: null,
      1: { open: 7.5, close: 19.5 }, 2: { open: 7.5, close: 19.5 }, 3: { open: 7.5, close: 19.5 },
      4: { open: 7.5, close: 19.5 }, 5: { open: 7.5, close: 19.5 },
      6: { open: 10, close: 14 }
    }
  },
  tco: {
    label: 'Temuco',
    title: 'Local 102,<br>Inglaterra.',
    heroAddress: 'Av. Inglaterra 0895, Local 102 · Temuco',
    heroDesc: 'Cafetería de especialidad en Temuco. Café de autor, latte art hecho a mano y bebidas que cambian con la estación.',
    historiaP1: 'Seis, siete, ocho no es una fórmula: es la cuenta que hacemos antes de que salga cada pedido bien hecho. La sede de Temuco replica la misma idea que nació en Ñuñoa: que el café de especialidad no tiene por qué sentirse solemne.',
    historiaP2: 'Cada número tiene su propia bebida — y cada bebida, una razón de estación. El resto de la carta se apoya siempre en lo mismo: espresso doble, buena leche texturizada y ningún atajo.',
    address: 'Av. Inglaterra 0895, Local 102<br>Temuco, Región de La Araucanía',
    footerAddress: 'Av. Inglaterra 0895, Local 102 · Temuco',
    mapsQuery: 'Seis+Siete+Ocho+Av.+Inglaterra+0895+Local+102+Temuco',
    placeId: '0x9614d37f245053e9:0x297fe5ef024c4745',
    mapsReviews: 'https://search.google.com/local/writereview?placeid=0x9614d37f245053e9:0x297fe5ef024c4745',
    rating: '4.9',
    ratingCount: 27,
    reviews: [
      { text: 'Todo un 10/10. Probamos un filtrado (el mejor que he probado en Temuco) con una galleta de chocolate sabor naranja buenísima y un postre francés llamado Canele, la misma chica que atendía dijo que preparaba. Ambiente perfecto para la mañana o la tardecita, es tranquilo y super acogedor. <3', author: 'Pía', meta: 'Google Maps · Local Guide · 34 opiniones' },
      { text: 'La mejor cafetería de especialidad de Temuco, el ambiente acogedor, la atención muy buena, buenos precios, muy recomendable.', author: 'Camila Abril', meta: 'Google Maps · Local Guide · 17 opiniones' },
      { text: 'Rico café, tradicionales como latte, espresso y filtrados, además de preparaciones de temporada como el espresso mandarina o espresso cranberry. Los baristas muy simpáticos, atentos y dispuestos a guiarte para hacer que la visita sea toda una experiencia. Buena variedad de snacks dulces.', author: 'Roberto Inostroza', meta: 'Google Maps · 1 opinión' },
    ],
    hours: {
      0: null,
      1: { open: 8.5, close: 20.5 }, 2: { open: 8.5, close: 20.5 }, 3: { open: 8.5, close: 20.5 },
      4: { open: 8.5, close: 20.5 }, 5: { open: 8.5, close: 20.5 },
      6: { open: 10, close: 15 }
    }
  }
};

let currentLoc = 'scl';

function fmtHour(h){
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${hh}:${mm.toString().padStart(2, '0')}`;
}

function renderHours(){
  const loc = LOCATIONS[currentLoc];
  const list = document.getElementById('hours-list');
  list.innerHTML = DIAS.map((d, i) => {
    const h = loc.hours[i];
    return `<div><span>${d}</span><span>${h ? fmtHour(h.open) + ' – ' + fmtHour(h.close) : 'Cerrado'}</span></div>`;
  }).join('');

  const now = new Date();
  const day = now.getDay();
  const hourDecimal = now.getHours() + now.getMinutes() / 60;
  const badge = document.getElementById('open-badge');
  const today = loc.hours[day];
  if (today && hourDecimal >= today.open && hourDecimal < today.close){
    badge.textContent = `Abierto ahora en ${loc.label} · cierra ${fmtHour(today.close)}`;
    badge.className = 'open-badge open';
  } else {
    badge.textContent = `Cerrado ahora en ${loc.label}`;
    badge.className = 'open-badge closed';
  }
}

function renderReviews(){
  const loc = LOCATIONS[currentLoc];
  const grid = document.getElementById('reviews-grid');
  document.getElementById('reviews-stars').textContent = loc.rating ? '★★★★★' : '';
  document.getElementById('reviews-rating').textContent = loc.rating || '—';
  document.getElementById('reviews-caption').textContent = loc.ratingCount
    ? `${loc.ratingCount} opiniones en Google Maps`
    : `Reseñas de ${loc.label} próximamente`;

  if (loc.reviews.length === 0){
    grid.innerHTML = `<p class="reviews-empty">Todavía no tenemos reseñas cargadas de la sede ${loc.label}. ¡Vuelve pronto!</p>`;
    return;
  }
  grid.innerHTML = loc.reviews.map((r, i) => `
    <article class="review-card fade-up" style="transition-delay:${(i * 0.08).toFixed(2)}s">
      <div class="stars-row small">★★★★★</div>
      <p class="review-text">"${r.text}"</p>
      <p class="review-author">${r.author}</p>
      <p class="review-meta">${r.meta}</p>
    </article>`).join('');
  grid.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

function applyLocation(id){
  currentLoc = id;
  const loc = LOCATIONS[id];
  document.getElementById('hero-address').textContent = loc.heroAddress;
  document.getElementById('hero-desc').textContent = loc.heroDesc;
  document.getElementById('historia-p1').textContent = loc.historiaP1;
  document.getElementById('historia-p2').textContent = loc.historiaP2;
  document.getElementById('visitanos-title').innerHTML = loc.title;
  document.getElementById('visitanos-address').innerHTML = loc.address;
  document.getElementById('footer-address').textContent = loc.footerAddress;
  document.getElementById('visitanos-map').src = `https://www.google.com/maps?q=${loc.mapsQuery}&output=embed`;
  document.getElementById('maps-reviews-link').href = loc.mapsReviews;
  document.getElementById('directions-link').href = `https://www.google.com/maps/dir/?api=1&destination=Seis+Siete+Ocho+${loc.label}&destination_place_id=${loc.placeId}`;
  document.querySelectorAll('.loc-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.loc === id);
  });
  renderHours();
  renderMenu(activeCat);
  renderReviews();
  refreshOrderBarLink();
}

document.querySelectorAll('.loc-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLocation(btn.dataset.loc));
});

applyLocation('scl');
