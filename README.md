# Stock Pulse — Shopify App (learning project)

Product page par ek **pulsing stock badge** dikhane wali Shopify app:

| Haalat | Misaal |
| --- | --- |
| 🟢 In stock | "In stock, ready to ship" (hara dot, pulse ke saath) |
| 🟠 Low stock | "Hurry! Only 3 left in stock" (narangi dot) |
| 🔴 Sold out | "Out of stock" (laal dot, pulse band). Chahein to chhupa bhi sakte hain |

Customer variant badle (size, color) to badge foran update ho jata hai.
Merchant **Theme Editor** se text, rang, dot ka size aur pulse speed badal sakta hai,
koi code edit nahi karna parta.

## Ye "extension-only app" kyun hai?

Shopify app ke 2 hisse ho sakte hain:

1. **Admin app**: backend server + admin ke andar UI
2. **Extensions**: Shopify ke andar chalne wale hisse (theme blocks, checkout, functions)

Hamari zaroorat sirf storefront par badge dikhana hai, aur product ka stock data
Liquid mein pehle se mil jata hai. Is liye server ki zaroorat nahi: sirf ek
**theme app extension** kaafi hai. Baad mein admin app bhi jod sakte hain (neeche "Aage kya?" dekhein).

## Folder structure

```
shopifyapp/
├── shopify.app.toml                 # App ki configuration (naam, client_id, scopes)
├── package.json                     # Shopify CLI aur scripts
└── extensions/
    └── stock-pulse/
        ├── shopify.extension.toml   # Extension ki type = "theme"
        ├── blocks/
        │   └── stock-pulse.liquid   # App block: HTML + Liquid logic + settings (schema)
        ├── assets/
        │   ├── stock-pulse.css      # Pulse animation aur rang
        │   └── stock-pulse.js       # Variant change par badge update
        └── locales/
            └── en.default.json
```

## Chalane ka tareeqa

### Zaroori cheezein
- [Shopify Partner account](https://partners.shopify.com) (free)
- Ek **development store** (Partner Dashboard → Stores → Add store → Development store)
- Node.js 18 ya naya

### Steps

```bash
npm install
```

```bash
npm run config:link
```
Ye Partner Dashboard mein nayi app banayega (ya pehle se bani hui se jodega) aur
`shopify.app.toml` mein `client_id` bhar dega.

```bash
npm run dev
```
Development store chunein. CLI extension ko store par preview ke liye chala dega.

### Store par block lagana
1. Store admin → **Online Store → Themes → Customize**
2. Upar se **Product** template kholein
3. Product information section mein **Add block → Apps → Stock Pulse**
4. Block ko price ya "Add to cart" button ke paas drag karein aur **Save** karein

### Deploy (permanent version)
```bash
npm run deploy
```

## Code kaise kaam karta hai (seekhne ke liye)

**1. `blocks/stock-pulse.liquid`**
- `product.selected_or_first_available_variant` se mojooda variant milta hai
- `variant.inventory_management == 'shopify'` ka matlab hai ke stock track ho raha hai.
  Sirf tab hi "Only X left" dikhana sahi hai.
- `{% schema %}` ke andar `settings` hi Theme Editor mein form ban kar dikhte hain.
  `block.settings.xyz` se un ki value milti hai.
- `"enabled_on": { "templates": ["product"] }` ki wajah se ye block sirf product page par lag sakta hai.
- Saare variants ka data ek `<script type="application/json">` mein rakha hai taake JavaScript use parh sake.

**2. `assets/stock-pulse.css`**
- Rang CSS variables (`--sp-in`, `--sp-low`, `--sp-out`) se aate hain, jo Liquid settings se set hote hain.
- `::before` wala dot `scale(2.5)` tak phail kar ghaib hota hai. Yehi "pulse" effect hai.
- `prefers-reduced-motion` ka khayal rakha gaya hai.

**3. `assets/stock-pulse.js`**
- Har theme variant alag tareeqe se badalti hai, is liye code teen cheezein dekhta hai:
  URL ka `?variant=` param, form ka `name="id"` input, aur section ka dobara render hona (MutationObserver).

## Aage kya? (agle learning steps)

- [ ] **App embed block**: block ko har product par khud lagana, manually add kiye baghair
- [ ] **Admin app** (React Router + Polaris): admin mein settings page banana
- [ ] **Metafields**: har product ke liye alag message, jaise "Ships in 2 days"
- [ ] **Locales**: Urdu ya doosri zubanon mein translations
- [ ] **Webhooks**: stock khatam hone par merchant ko notification bhejna
