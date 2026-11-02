<img src="./crest-logo.jpg" alt="Crest™" width="198">

# Solarcrest Sales

A mobile-friendly product website for **solarcrestsales.com**, with separate retail and wholesale pages.

**Pryse per eenheid. Kies jou hoeveelheid.**  
**Prices per unit. Choose your quantity.**

## Product range

- Crest Solar150L offer — exact model and product image to be confirmed.
- SolaPool pool-heating panel — quoted per panel.
- Hi Tech150L — quoted per unit.
- Hi Tech100L — quoted per unit.

Customers choose the number of individual units they need. Suggested quantities such as2,3 or6 are order quantities, not product bundles or automatic discounts.

## Retail and wholesale

| Page | Purpose | Price basis |
| --- | --- | --- |
| `index.html` | Public product introduction and enquiries | Suggested consumer retail price, including VAT where displayed |
| `wholesale.html` | Trade product enquiries and opening quantities | Wholesale price per unit, excluding VAT |

The instructed Crest wholesale price is **R5,216.52 per unit excluding VAT**. The suggested consumer retail price is **R7,999 per unit including VAT**. Other product prices are confirmed by quotation; an unknown price must not be shown as zero.

The displayed Crest range image is recorded as125L in the original source. Confirm the exact150L model, photograph and supplied components before publishing or accepting an order. The Hi Tech capacities share a catalogue range photograph; this is not proof of two different variant photographs.

## Upload layout

Use this layout when the hosting Output Directory is `public`:

```text
solarcrestsales/
├── README.md
├── crest-logo.jpg
└── public/
    ├── index.html
    └── wholesale.html
```

- Keep the `.html` extension on both pages.
- Put both pages in the same published directory so their relative links work.
- Add `Wholesale / Groothandel` to the landing-page menu, linked to `wholesale.html`.
- The supplied landing and wholesale HTML files embed their website images and styles. They do not need a separate website image folder.
- `crest-logo.jpg` beside this README is the original supplied logo used to display the mark in this repository document.

This is a static HTML site. It does not require Node, npm or a database to display these pages. For this layout, use a static-site configuration with no build command and `public` as the Output Directory. The current uploaded files must be placed/renamed to match the layout; this README does not perform those moves.

## Enquiries

**Heyns Schoeman**  
Solarcrest Lead — Promotional Deals & National Sales Rollout  
Mobile: **+27 72 414 0117**  
Email: **promosales@solarcrestsales.com**

The contact buttons open an email or WhatsApp draft for the customer to review and send. They do not automatically submit an enquiry, take payment, reserve stock or confirm an order. Domain connection and mailbox provisioning are separate hosting tasks.

## Brand rules

Use the original clean Crest™ artwork, including the trademark, in the page's document header. Preserve proportions and source colours. Do not redraw the logo, add a backing box or badge, apply a filter, or stamp it onto every product image.

Use the supplied product imagery accurately. Keep visible model/size qualifications and confirm current availability, delivery, installation, warranty and quotation validity. Do not add unsupported savings, certifications or guarantees.

Keep supplier costs, private customer records, credentials and internal pricing workbooks out of the public website/repository.
