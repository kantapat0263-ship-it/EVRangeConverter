// Central site configuration used across SEO metadata, sitemap, robots and manifest.
// NOTE: Update SITE_URL once a custom domain is connected (currently the Vercel URL).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://evrangeconverter.vercel.app';

export const SITE_NAME = 'EV Range Converter';

export const SITE_DESCRIPTION =
  'Free EV range calculator. Convert kilometers to battery usage instantly and estimate your EV savings. Accurate for Tesla, BYD and all electric vehicles (CLTC, WLTP, EPA, NEDC).';

export const SITE_KEYWORDS = [
  'EV range calculator',
  'EV range converter',
  'electric vehicle range',
  'คำนวณระยะทางรถไฟฟ้า',
  'ตัวแปลงระยะทางรถยนต์ไฟฟ้า',
  'EV saving calculator',
  'คำนวณเงินประหยัด EV',
  'Tesla range',
  'BYD range',
  'CLTC WLTP EPA NEDC',
  'รถยนต์ไฟฟ้า',
];
