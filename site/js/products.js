/*
  ============================================================
  ATHAR – store settings & products
  The ONLY file you need to edit for products, prices,
  photos, WhatsApp or Instagram.
  ============================================================
*/

const STORE = {
  currencyAr: "ر.س",
  currencyEn: "SAR",
  whatsapp: "",      // e.g. "9665XXXXXXXX" (country code, no + or spaces). Empty = no order button
  instagram: ""      // e.g. "athar.parfum". Empty = hidden
};

const PRODUCTS = [
  { name: "V.Umo",  image: "photos/athar-vumo.jpg",   price: 150, oldPrice: null, size: "50 ml" },
  { name: "Coko",   image: "photos/athar-coko.jpg",   price: 150, oldPrice: null, size: "50 ml" },
  { name: "Allura", image: "photos/athar-allura.jpg", price: 150, oldPrice: null, size: "50 ml" },
  { name: "Escand", image: "photos/athar-escand.jpg", price: 150, oldPrice: null, size: "50 ml" }
];

/*
  oldPrice: put a number (e.g. 180) to show a crossed-out price for a sale.
  To add a product: copy one line, change the name, photo and price.
*/
