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
    count: '2.3x',
    platform: 'IKT India',
    recognition: 'Vendor Growth (20 → 45+ in 9 months)',
    year: '2024',
  },
  {
    id: '2',
    count: 'INR 15L+',
    platform: 'IKT India',
    recognition: 'Monthly GMV Milestone',
    year: '2024',
  },
  {
    id: '3',
    count: '30–35%',
    platform: 'IKT India',
    recognition: 'Seller Activation Improvement',
    year: '2024',
  },
  {
    id: '4',
    count: '20%',
    platform: 'IKT India',
    recognition: '60-Day Retention Uplift',
    year: '2024',
  },
  {
    id: '5',
    count: '85%',
    platform: 'Usability Testing',
    recognition: 'Task Completion — Dating Platform Prototype',
    year: '2025',
  },
  {
    id: '6',
    count: '$20M',
    platform: 'MicroMove',
    recognition: 'NPV Projected — Faculty Panel Pitch',
    year: '2024',
  },
  {
    id: '7',
    platform: 'Scrum Alliance',
    recognition: 'Certified Scrum Product Owner (CSPO)',
    year: '2025',
  },
  {
    id: '8',
    platform: 'Arizona State University',
    recognition: 'MS Management of Technology — GPA 3.6',
    year: '2026',
  },
];
