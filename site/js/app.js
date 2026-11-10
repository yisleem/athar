/* ATHAR – page logic (plain JavaScript, no frameworks) */

const TEXT = {
  ar: {
    topbar: "عطور فاخرة · اطلب عبر واتساب",
    navCollection: "المجموعة",
    navAbout: "عن أثر",
    heroTitle: "عطرٌ يترك أثراً",
    heroText: "مجموعة مختارة من العطور الفاخرة، صُنعت لتبقى في الذاكرة.",
    collectionTitle: "مجموعة العطور",
    sortDefault: "الترتيب الافتراضي",
    sortLow: "السعر: من الأقل",
    sortHigh: "السعر: من الأعلى",
    sortName: "الاسم",
    aboutTitle: "عن أثر",
    aboutText: "أثر علامة عطور تُعبّأ بعناية من أجود أنواع العطور المستوحاة.",
    rights: "جميع الحقوق محفوظة",
    products: "منتجات",
    type: "أو دو بارفان",
    ml: "مل",
    order: "اطلب الآن",
    orderMsg: "مرحباً، أرغب بطلب عطر",
    instagram: "إنستغرام",
    whatsapp: "واتساب",
    langBtn: "EN"
  },
  en: {
    topbar: "Fine fragrances · Order on WhatsApp",
    navCollection: "Collection",
    navAbout: "About",
    heroTitle: "A scent that leaves a trace",
    heroText: "A curated collection of fine fragrances, made to be remembered.",
    collectionTitle: "The Collection",
    sortDefault: "Default order",
    sortLow: "Price: low to high",
    sortHigh: "Price: high to low",
    sortName: "Name",
    aboutTitle: "About Athar",
    aboutText: "Athar is a fragrance house, carefully filled with the finest inspired perfumes.",
    rights: "All rights reserved",
    products: "products",
    type: "Eau de Parfum",
    ml: "ml",
    order: "Order now",
    orderMsg: "Hello, I would like to order",
    instagram: "Instagram",
    whatsapp: "WhatsApp",
    langBtn: "عربي"
  }
};

let lang = savedLang() || "ar";
let sortBy = "default";

function savedLang() { try { return localStorage.getItem("athar-lang"); } catch (e) { return null; } }
function saveLang(v) { try { localStorage.setItem("athar-lang", v); } catch (e) {} }

function formatPrice(value) {
  return lang === "ar" ? `${value} ${STORE.currencyAr}` : `${STORE.currencyEn} ${value}`;
}

function formatSize(size) {
  return size.replace("ml", TEXT[lang].ml);
}

function sortedProducts() {
  const list = [...PRODUCTS];
  if (sortBy === "low") list.sort((a, b) => a.price - b.price);
  if (sortBy === "high") list.sort((a, b) => b.price - a.price);
  if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function orderLink(p) {
  const msg = `${TEXT[lang].orderMsg} ${p.name} (${p.size})`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function renderGrid() {
  const t = TEXT[lang];
  document.getElementById("grid").innerHTML = sortedProducts().map(p => `
    <article class="card">
      <div class="card__media">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card__body">
        <p class="card__type">${t.type} · <bdi>${formatSize(p.size)}</bdi></p>
        <h3 class="card__name">${p.name}</h3>
        <p class="card__price">
          ${p.oldPrice ? `<s>${formatPrice(p.oldPrice)}</s>` : ""}
          <span>${formatPrice(p.price)}</span>
        </p>
        ${STORE.whatsapp ? `<a class="btn" href="${orderLink(p)}" target="_blank" rel="noopener">${t.order}</a>` : ""}
      </div>
    </article>
  `).join("");
  document.getElementById("count").textContent = `${PRODUCTS.length} ${t.products}`;
}

function renderFooterLinks() {
  const t = TEXT[lang];
  const links = [];
  if (STORE.instagram) links.push(`<a href="https://instagram.com/${STORE.instagram}" target="_blank" rel="noopener">${t.instagram}</a>`);
  if (STORE.whatsapp) links.push(`<a href="https://wa.me/${STORE.whatsapp}" target="_blank" rel="noopener">${t.whatsapp}</a>`);
  document.getElementById("footerLinks").innerHTML = links.join("");
}

function applyLanguage() {
  const t = TEXT[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });
  document.getElementById("langBtn").textContent = t.langBtn;
  renderGrid();
  renderFooterLinks();
}

document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "ar" ? "en" : "ar";
  saveLang(lang);
  applyLanguage();
});

document.getElementById("sort").addEventListener("change", e => {
  sortBy = e.target.value;
  renderGrid();
});

document.getElementById("year").textContent = new Date().getFullYear();

applyLanguage();
