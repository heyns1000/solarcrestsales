<img src="./assets/crest-logo.jpg" alt="Crest™" width="198">

# Solarcrest Sales

A mobile-friendly product website for **solarcrestsales.com**, with separate retail and wholesale pages.

**Pryse per eenheid. Kies jou hoeveelheid.**  
**Prices per unit. Choose your quantity.**

## Product range

- Crest Solar 150L offer — exact model and product image to be confirmed.
- SolaPool pool-heating panel — quoted per panel.
- Hi Tech 150L — quoted per unit.
- Hi Tech 100L — quoted per unit.

Customers choose the number of individual units they need. Suggested quantities such as 2, 3 or 6 are order quantities, not product bundles or automatic discounts.

## Retail and wholesale

| Page | Purpose | Price basis |
| --- | --- | --- |
| `index.html` | Public product introduction and enquiries | Suggested consumer retail price, including VAT where displayed |
| `wholesale.html` | Trade product enquiries and opening quantities | Wholesale price per unit, excluding VAT |

The instructed Crest wholesale price is **R5,216.52 per unit excluding VAT**. The suggested consumer retail price is **R7,999 per unit including VAT**. Other product prices are confirmed by quotation; an unknown price must not be shown as zero.

The displayed Crest range image is recorded as 125L in the original source. Confirm the exact 150L model, photograph and supplied components before publishing or accepting an order. The Hi Tech capacities share a catalogue range photograph; this is not proof of two different variant photographs.

## Products page

`products.html` lists the Crest Solar 2026 range: 18 products with catalogue artwork, search, categories, the specification viewer, theme controls and the 11 draft languages. It also covers business and project enquiries, availability, delivery and installation, warranty, a quotation request builder and all 20 catalogue pages (`assets/catalogue/` plus the snapshots embedded in the page).

- **No prices are published on this page.** Every product reads "Price on written quotation". Supplier quotation prices stay private.
- **Unconfirmed terms stay unconfirmed.** Stock, delivery, installation, warranty and quotation validity are stated as confirmed in writing per order.
- **Page 19 of the catalogue** is an Amanzi borehole advertisement. It is shown separately and is not part of the Crest range.
- **The quotation builder sends nothing.** It prepares an e-mail or WhatsApp draft that the customer reviews and sends.
- **Build:** `node scripts/prepare-static.mjs` now also copies `products.html` and `assets/catalogue/` to `dist/`.

## Logo source

The uploaded original logo is `assets/crest-logo.jpg`. This README references that exact repository path. Do not redraw, recolour, crop the trademark, add a backing box or apply a filter.

The build copies the same logo bytes to `dist/assets/crest-logo.jpg` and changes only existing `.logo` image references in the two generated website pages to `assets/crest-logo.jpg`. The website logo follows the shared uploaded asset; the original HTML sources are not rewritten. Product images and script/DATA content are preserved.

## Source layout and build

```text
solarcrestsales/
├── README.md
├── assets/
│   └── crest-logo.jpg
├── index.html
├── public/
│   └── wholesale
├── scripts/
│   └── prepare-static.mjs
└── vercel.json
```

Run the static preparation with Node:

```sh
node scripts/prepare-static.mjs
```

The script also accepts `public/wholesale.html` or a root `wholesale.html` if the source is later renamed. It prepares a separate output folder without deleting or modifying the original pages:

```text
dist/
├── index.html
├── wholesale.html
└── assets/
    └── crest-logo.jpg
```

Use the Vercel **Other** framework preset, build command `node scripts/prepare-static.mjs`, and Output Directory `dist`, as recorded in `vercel.json`. Node performs this preparation; no npm dependencies or database are required to display these static pages. Do not use a conflicting dashboard Output Directory override.

Both published pages are at the same level, so the existing `wholesale.html` navigation link works. `dist` is generated and git-ignored. The README uses the repository's `assets/` path; website pages use the copy within the published output.

## Enquiries

**Heyns Schoeman**  
Solarcrest Lead — Promotional Deals & National Sales Rollout  
Mobile: **+27 72 414 0117**  
Email: **promosales@solarcrestsales.com**

The contact buttons open an email or WhatsApp draft for the customer to review and send. They do not automatically submit an enquiry, take payment, reserve stock or confirm an order. Domain connection and mailbox provisioning are separate hosting tasks.

## Brand and publication rules

Every human-facing Crest document carries the original clean Crest™ identity in its header/template. Preserve proportions, source colours and the complete trademark. No sticker box, badge, filter or repeated logo stamping on product images.

Keep model/size qualifications visible. Confirm current availability, delivery, installation, warranty and quotation validity. Do not add unsupported savings, certifications or guarantees.

Keep supplier costs, private customer records, credentials and internal pricing workbooks out of the public website/repository. This is the uploaded static frontend; preparing its files does not create a backend, deploy the site, connect DNS or provision email.
