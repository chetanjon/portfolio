export interface Award {
  id: string;
  count?: string;
  platform: string;
  recognition: string;
  year?: string;
}

export const awards: Award[] = [
  {
    id: '1',
    count: '7 days',
    platform: 'Aatram',
    recognition: 'First Commit → App Store (3-person founding team)',
    year: '2026',
  },
  {
    id: '2',
    count: '5.0★',
    platform: 'Aatram',
    recognition: 'App Store Rating at Launch',
    year: '2026',
  },
  {
    id: '3',
    count: '25',
    platform: 'Aatram',
    recognition: 'Closed-Beta Users · 16 Archetype Interviews',
    year: '2026',
  },
  {
    id: '4',
    count: '20 → 75+',
    platform: 'IKT India',
    recognition: 'Vendor Growth Across Multiple States',
    year: '2024',
  },
  {
    id: '5',
    count: '2x',
    platform: 'IKT India',
    recognition: 'Monthly GMV (via 50-SKU price-floor A/B scaled to 500+)',
    year: '2024',
  },
  {
    id: '6',
    count: '25 → 40%',
    platform: 'IKT India',
    recognition: 'Gross Margin Lift',
    year: '2024',
  },
  {
    id: '7',
    count: '20%',
    platform: 'IKT India',
    recognition: '60-Day Active-Seller Retention Uplift',
    year: '2024',
  },
  {
    id: '8',
    platform: 'Scrum Alliance',
    recognition: 'Certified Scrum Product Owner (CSPO)',
    year: '2025',
  },
  {
    id: '9',
    platform: 'University of Virginia (Coursera)',
    recognition: 'Digital Product Management Certificate',
    year: '2025',
  },
  {
    id: '10',
    platform: 'Arizona State University',
    recognition: 'M.S. in Management of Technology (3.7 GPA, graduated May 2026)',
    year: '2026',
  },
];
