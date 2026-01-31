# CJ Portfolio — Complete Design & Development Requirements Document

**Document Version:** 1.0  
**Author:** CJ (Product Manager)  
**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion  
**Target Completion:** Production-ready portfolio

---

## Table of Contents

1. [Strategic Vision & Theme](#1-strategic-vision--theme)
2. [Design System](#2-design-system)
3. [Site Architecture](#3-site-architecture)
4. [Page-by-Page Specifications](#4-page-by-page-specifications)
5. [Component Library](#5-component-library)
6. [Interactions & Animations](#6-interactions--animations)
7. [Content Structure](#7-content-structure)
8. [Technical Implementation](#8-technical-implementation)
9. [Performance Requirements](#9-performance-requirements)
10. [Responsive Design](#10-responsive-design)
11. [SEO & Meta](#11-seo--meta)
12. [Deployment Checklist](#12-deployment-checklist)

---

## 1. Strategic Vision & Theme

### 1.1 Core Philosophy

**Theme Name:** "Strategic Clarity"

This portfolio embodies the mindset of a Product Manager who values data-driven decisions, clean execution, and measurable impact. Every element serves a purpose — no decorative fluff.

**Design Pillars:**
- **Intentional Minimalism:** White space is a feature, not emptiness
- **Metrics-First Storytelling:** Numbers speak before words
- **Professional Warmth:** Confident but approachable
- **Subtle Sophistication:** Details that reward attention

### 1.2 Brand Personality

| Attribute | Expression |
|-----------|------------|
| Strategic | Clear hierarchy, purposeful layouts |
| Data-Driven | Prominent metrics, visual data representation |
| Authentic | Real stories, genuine voice |
| Detail-Oriented | Micro-interactions, polished corners |
| Growth-Minded | Learning section, evolution narrative |

### 1.3 Visual Metaphor

Think of the portfolio as a **well-designed product dashboard** — clean, scannable, with the most important metrics immediately visible, but depth available for those who want to explore.

---

## 2. Design System

### 2.1 Color Palette

```css
/* Primary Palette */
--color-bg-primary: #FAFAFA;        /* Off-white background */
--color-bg-secondary: #FFFFFF;       /* Card backgrounds */
--color-bg-dark: #0A0A0A;           /* Dark mode / footer */

/* Text Colors */
--color-text-primary: #1A1A1A;       /* Headings, primary text */
--color-text-secondary: #4A4A4A;     /* Body text */
--color-text-tertiary: #7A7A7A;      /* Captions, metadata */
--color-text-muted: #9A9A9A;         /* Disabled, hints */

/* Accent Colors */
--color-accent-primary: #E07A5F;     /* Burnt Sienna — CTAs, highlights */
--color-accent-secondary: #3D405B;   /* Deep Navy — Secondary emphasis */
--color-accent-tertiary: #81B29A;    /* Sage Green — Success states */

/* Functional Colors */
--color-border: #E5E5E5;             /* Dividers, card borders */
--color-border-hover: #CCCCCC;       /* Border on hover */
--color-surface-hover: #F5F5F5;      /* Hover backgrounds */

/* Gradient (Use sparingly) */
--gradient-accent: linear-gradient(135deg, #E07A5F 0%, #F2CC8F 100%);
```

**Color Usage Rules:**
- Accent Primary (#E07A5F) appears maximum 3 times per viewport
- Never use accent colors for large background areas
- Dark mode inverts only — don't create new color relationships

### 2.2 Typography

```css
/* Font Stack */
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Type Scale (Mobile First) */
--text-xs: 0.75rem;      /* 12px — Captions */
--text-sm: 0.875rem;     /* 14px — Small body, metadata */
--text-base: 1rem;       /* 16px — Body text */
--text-lg: 1.125rem;     /* 18px — Large body */
--text-xl: 1.25rem;      /* 20px — Section subtitles */
--text-2xl: 1.5rem;      /* 24px — Card titles */
--text-3xl: 1.875rem;    /* 30px — Section headings */
--text-4xl: 2.25rem;     /* 36px — Page titles */
--text-5xl: 3rem;        /* 48px — Hero heading */
--text-6xl: 3.75rem;     /* 60px — Hero heading (desktop) */

/* Line Heights */
--leading-tight: 1.1;    /* Headings */
--leading-snug: 1.3;     /* Subheadings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.7;  /* Long-form reading */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Letter Spacing */
--tracking-tight: -0.02em;   /* Large headings */
--tracking-normal: 0;         /* Body text */
--tracking-wide: 0.05em;      /* Small caps, labels */
```

**Typography Rules:**
- Maximum 2 font weights per component
- Headings always use `--tracking-tight`
- Body text never smaller than 16px on mobile
- Line length: 60-75 characters optimal

### 2.3 Spacing System

```css
/* Base unit: 4px */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */

/* Section Spacing */
--section-padding-mobile: var(--space-16);
--section-padding-desktop: var(--space-24);

/* Container Max Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1200px;
--container-2xl: 1400px;
```

### 2.4 Border Radius

```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### 2.5 Shadows

```css
/* Elevation System */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02);
--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.06), 0 4px 10px rgba(0, 0, 0, 0.03);
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04);

/* Interactive Shadows */
--shadow-card: var(--shadow-sm);
--shadow-card-hover: var(--shadow-lg);
--shadow-button: 0 2px 4px rgba(224, 122, 95, 0.2);
```

---

## 3. Site Architecture

### 3.1 Sitemap

```
/                          → Home (Hero + Overview)
/about                     → About Me (Story, Values, Timeline)
/work                      → Work Experience Index
/work/[slug]               → Individual Case Study
/projects                  → Side Projects & Experiments
/resume                    → Interactive Resume + PDF Download
/contact                   → Contact Form + Links
```

### 3.2 Navigation Structure

**Primary Navigation (Always Visible):**
```
Logo | Work | About | Resume | Contact
```

**Mobile Navigation:**
- Hamburger menu (right-aligned)
- Full-screen overlay with staggered animation
- Current page indicator

### 3.3 File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── about/
│   │   └── page.tsx
│   ├── work/
│   │   ├── page.tsx            # Work index
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic case study
│   ├── projects/
│   │   └── page.tsx
│   ├── resume/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── ui/                     # Primitive components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Tooltip.tsx
│   │   └── index.ts
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Container.tsx
│   │   └── Section.tsx
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx
│   │   ├── MetricsShowcase.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── SkillsGrid.tsx
│   │   ├── Timeline.tsx
│   │   └── ContactCTA.tsx
│   └── shared/                 # Shared components
│       ├── MetricCard.tsx
│       ├── ProjectCard.tsx
│       ├── CaseStudyCard.tsx
│       ├── TestimonialCard.tsx
│       ├── TechStack.tsx
│       └── SocialLinks.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── constants.ts            # Site constants
│   └── animations.ts           # Framer Motion variants
├── data/
│   ├── work.ts                 # Work experience data
│   ├── projects.ts             # Projects data
│   ├── skills.ts               # Skills data
│   └── personal.ts             # Personal info
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   └── useMediaQuery.ts
├── styles/
│   └── globals.css             # Global styles + Tailwind
└── types/
    └── index.ts                # TypeScript types
```

---

## 4. Page-by-Page Specifications

### 4.1 Home Page (`/`)

**Purpose:** First impression — establish credibility, show impact, invite exploration

**Sections in Order:**

#### 4.1.1 Hero Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Small caps label: PRODUCT MANAGER]                        │
│                                                             │
│  Hi, I'm CJ.                                                │
│  I build products that                                      │
│  [animated text: scale / convert / retain]                  │
│                                                             │
│  Currently pursuing MS in Management of Technology          │
│  at Arizona State University, seeking PM roles              │
│  where I can drive measurable impact.                       │
│                                                             │
│  [Primary CTA: View My Work]  [Secondary: Download Resume]  │
│                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │  30%+   │  │  50+    │  │  20+    │                     │
│  │Activation│ │ Vendors │  │Releases │                     │
│  │Improvement│ │ Scaled  │  │ Shipped │                     │
│  └─────────┘  └─────────┘  └─────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Hero occupies 90vh on desktop, 100vh on mobile
- Animated text cycles every 3 seconds with fade transition
- Metric cards have subtle entrance animation (stagger 0.1s)
- Background: Subtle gradient or geometric pattern (very muted)

#### 4.1.2 Featured Work Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Featured Work                                              │
│  ─────────────                                              │
│                                                             │
│  ┌──────────────────────────┐ ┌──────────────────────────┐ │
│  │ [Thumbnail Image]         │ │ [Thumbnail Image]         │ │
│  │                           │ │                           │ │
│  │ IKT INDIA                 │ │ Behavioral Compatibility  │ │
│  │ B2B Handloom Marketplace  │ │ Dating Platform           │ │
│  │                           │ │                           │ │
│  │ • 30-35% activation ↑     │ │ • Academic Project        │ │
│  │ • 20% retention ↑         │ │ • Full product spec       │ │
│  │ • 50+ vendors scaled      │ │ • User research driven    │ │
│  │                           │ │                           │ │
│  │ [Read Case Study →]       │ │ [View Project →]          │ │
│  └──────────────────────────┘ └──────────────────────────┘ │
│                                                             │
│                    [View All Work →]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- 2-column grid on desktop, single column on mobile
- Cards have subtle border, shadow on hover
- Image placeholder if no thumbnail (gradient with initials)
- Metrics displayed as inline badges

#### 4.1.3 What I Bring Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  What I Bring to the Table                                  │
│  ──────────────────────────                                 │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ [Icon]      │  │ [Icon]      │  │ [Icon]      │         │
│  │             │  │             │  │             │         │
│  │ Strategic   │  │ Data-Driven │  │ Cross-      │         │
│  │ Thinking    │  │ Decisions   │  │ Functional  │         │
│  │             │  │             │  │ Leadership  │         │
│  │ I connect   │  │ Metrics     │  │ 3-person    │         │
│  │ product     │  │ guide every │  │ engineering │         │
│  │ decisions   │  │ decision.   │  │ team to 20+ │         │
│  │ to business │  │ Activation, │  │ releases.   │         │
│  │ outcomes.   │  │ retention,  │  │             │         │
│  │             │  │ revenue.    │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- 3-column grid on desktop, stack on mobile
- Icons: Lucide React icons, accent color
- Cards have no border, subtle background on hover
- Keep copy concise: 2-3 lines max per card

#### 4.1.4 Quick About Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────────┐                                   │
│  │                     │   A product person who cares      │
│  │    [Your Photo]     │   about the details.              │
│  │                     │                                   │
│  │                     │   I've scaled a B2B marketplace   │
│  └─────────────────────┘   from 20 to 50+ vendors, shipped │
│                            20+ releases, and improved      │
│                            activation by 30%. Now I'm      │
│                            bringing that same rigor to     │
│                            my MS at Arizona State.         │
│                                                            │
│                            [More About Me →]               │
│                                                            │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Photo: 200x200px, rounded-lg, subtle shadow
- 2-column layout, image left, text right (reverse on mobile)
- Keep copy to 4-5 lines max

#### 4.1.5 Contact CTA Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  Let's Build Something                      │
│                      Together                               │
│                                                             │
│       I'm actively seeking PM roles (H1B sponsorship        │
│       required). Let's talk about how I can contribute      │
│       to your product team.                                 │
│                                                             │
│              [Get In Touch]   [LinkedIn →]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Centered text, constrained width (max 600px)
- Background: Subtle accent gradient or solid dark
- If dark background, invert text colors

---

### 4.2 About Page (`/about`)

**Purpose:** Build connection, tell the story, establish credibility

**Sections:**

#### 4.2.1 About Hero

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  About Me                                                   │
│                                                             │
│  From electrical engineering to product management —        │
│  I've always been drawn to solving complex problems         │
│  at the intersection of technology and business.            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 4.2.2 Story Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌───────────────────┐                                     │
│  │                   │   My Journey                        │
│  │   [Photo or       │   ───────────                       │
│  │    Illustration]  │                                     │
│  │                   │   [3-4 paragraphs of your story]    │
│  │                   │                                     │
│  │                   │   Key themes:                       │
│  └───────────────────┘   • Electrical engineering roots    │
│                          • Discovery of product thinking   │
│                          • IKT INDIA experience            │
│                          • ASU and future goals            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 4.2.3 Values Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  What I Believe In                                          │
│  ─────────────────                                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "Ship early, learn fast"                            │   │
│  │ Perfect is the enemy of good. I'd rather get a     │   │
│  │ 70% solution in users' hands than a 100% solution  │   │
│  │ that never ships.                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ "Data tells stories"                                │   │
│  │ Numbers without context are just numbers. I focus  │   │
│  │ on the narrative metrics tell us about our users.  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Add 2-3 more values]                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 4.2.4 Timeline Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  My Path                                                    │
│  ───────                                                    │
│                                                             │
│  2024 ─────●───── MS Management of Technology, ASU          │
│            │      Phoenix, Arizona                          │
│            │                                                │
│  2022 ─────●───── Junior Product Manager, IKT INDIA         │
│            │      Scaled B2B marketplace 20→50+ vendors     │
│            │                                                │
│  2021 ─────●───── CSPO Certification                        │
│            │      Scrum Alliance                            │
│            │                                                │
│  2020 ─────●───── Product Operations Intern                 │
│            │      Gangothri Nutrients & Fertilizers         │
│            │                                                │
│  2019 ─────●───── B.Tech Electrical Engineering             │
│                   JNTU Hyderabad                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Vertical timeline on mobile, can be horizontal on desktop
- Timeline line: 2px, border color
- Nodes: 12px circles, accent color for current
- Hover to expand details

#### 4.2.5 Beyond Work Section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Beyond Work                                                │
│  ───────────                                                │
│                                                             │
│  When I'm not thinking about product metrics...             │
│                                                             │
│  [Optional: Add 2-3 personal interests or hobbies           │
│   that make you human and relatable]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.3 Work Page (`/work`)

**Purpose:** Showcase professional experience with measurable impact

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Work Experience                                            │
│                                                             │
│  Products I've built and teams I've worked with.            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │  [Large Featured Image/Mockup]                       │  │
│  │                                                      │  │
│  │  IKT INDIA — B2B Handloom Marketplace                │  │
│  │  Junior Product Manager | 2022-2024                  │  │
│  │                                                      │  │
│  │  Scaled vendor network from 20 to 50+ while          │  │
│  │  improving activation by 30-35% and retention by 20% │  │
│  │                                                      │  │
│  │  [View Case Study →]                                 │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐    │
│  │ [Image]                │  │ [Image]                │    │
│  │                        │  │                        │    │
│  │ Gangothri Nutrients    │  │ SVK Industries         │    │
│  │ Product Ops Intern     │  │ Product Dev Intern     │    │
│  │ 2020                   │  │ 2019                   │    │
│  │                        │  │                        │    │
│  │ [View Details →]       │  │ [View Details →]       │    │
│  └────────────────────────┘  └────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.4 Case Study Page (`/work/[slug]`)

**Purpose:** Deep dive into a specific project with full PM rigor

**Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ← Back to Work                                             │
│                                                             │
│  IKT INDIA                                                  │
│  B2B Handloom Marketplace                                   │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │  Role   │ │Duration │ │  Team   │ │ Impact  │          │
│  │   PM    │ │1.5 Years│ │ 3 Eng   │ │30%+ Act │          │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘          │
│                                                             │
│  [Hero Image/Product Mockup]                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Overview                                                   │
│  ────────                                                   │
│                                                             │
│  [2-3 paragraph summary of the product and your role]       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  The Challenge                                              │
│  ─────────────                                              │
│                                                             │
│  [What problem were you solving? What was the context?]     │
│                                                             │
│  Key challenges:                                            │
│  • Challenge 1                                              │
│  • Challenge 2                                              │
│  • Challenge 3                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  My Approach                                                │
│  ───────────                                                │
│                                                             │
│  [How did you approach the problem? What frameworks?]       │
│                                                             │
│  Phase 1: Discovery                                         │
│  [Description of research, user interviews, data analysis]  │
│                                                             │
│  Phase 2: Definition                                        │
│  [How you defined the solution, prioritization]             │
│                                                             │
│  Phase 3: Delivery                                          │
│  [Execution, iteration, shipping]                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Key Decisions                                              │
│  ─────────────                                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Decision: [What decision did you make?]             │   │
│  │ Context: [Why was this decision needed?]            │   │
│  │ Outcome: [What happened as a result?]               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Repeat for 2-3 key decisions]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Results & Impact                                           │
│  ────────────────                                           │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    30%+     │  │    20%      │  │    50+      │         │
│  │  Activation │  │  Retention  │  │   Vendors   │         │
│  │ Improvement │  │   Uplift    │  │   Scaled    │         │
│  │             │  │             │  │             │         │
│  │ [Context]   │  │ [Context]   │  │ [Context]   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Learnings                                                  │
│  ─────────                                                  │
│                                                             │
│  What would I do differently?                               │
│  [Honest reflection — shows growth mindset]                 │
│                                                             │
│  What did this teach me?                                    │
│  [Key takeaways for future work]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ← Previous: [Project]        Next: [Project] →             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.5 Resume Page (`/resume`)

**Purpose:** Scannable resume with download option

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Resume                              [Download PDF ↓]       │
│                                                             │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│  [Interactive resume that mirrors PDF structure]            │
│                                                             │
│  • Experience section                                       │
│  • Education section                                        │
│  • Skills section                                           │
│  • Certifications section                                   │
│                                                             │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│  Want to discuss my experience?                             │
│  [Schedule a Chat →]                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specifications:**
- PDF download button always visible (sticky on scroll)
- Interactive version matches PDF layout closely
- Links in experience section go to case studies
- Skills displayed as tags with proficiency indicators

---

### 4.6 Contact Page (`/contact`)

**Purpose:** Easy ways to reach out

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Let's Connect                                              │
│                                                             │
│  I'm always open to discussing product management,          │
│  potential opportunities, or just chatting about tech.      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │  Name                                               │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │                                               │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                     │   │
│  │  Email                                              │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │                                               │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                     │   │
│  │  Message                                            │   │
│  │  ┌───────────────────────────────────────────────┐ │   │
│  │  │                                               │ │   │
│  │  │                                               │ │   │
│  │  │                                               │ │   │
│  │  └───────────────────────────────────────────────┘ │   │
│  │                                                     │   │
│  │  [Send Message]                                     │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Or reach me directly:                                      │
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │ [Email]   │  │ [LinkedIn]│  │ [GitHub]  │              │
│  └───────────┘  └───────────┘  └───────────┘              │
│                                                             │
│  Currently in: Phoenix, Arizona                             │
│  Open to: Remote, Hybrid, Relocation                        │
│  Visa: Requires H1B Sponsorship                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Component Library

### 5.1 Button Component

```typescript
// components/ui/Button.tsx

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Variants:
// primary: bg-accent-primary, text-white, shadow-button
// secondary: bg-secondary, text-primary, border
// ghost: bg-transparent, text-primary, hover:bg-surface-hover
// outline: border-accent-primary, text-accent-primary

// Sizes:
// sm: px-3, py-1.5, text-sm
// md: px-4, py-2, text-base
// lg: px-6, py-3, text-lg
```

### 5.2 Card Component

```typescript
// components/ui/Card.tsx

interface CardProps {
  variant: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
}

// Variants:
// default: bg-white, rounded-lg
// elevated: bg-white, shadow-md, rounded-lg
// bordered: bg-white, border, rounded-lg
// interactive: elevated + hover:shadow-lg + cursor-pointer
```

### 5.3 MetricCard Component

```typescript
// components/shared/MetricCard.tsx

interface MetricCardProps {
  value: string;      // "30%+"
  label: string;      // "Activation Improvement"
  context?: string;   // "vs. baseline"
  trend?: 'up' | 'down' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

// Layout:
// - Value: large, bold, accent color if positive
// - Label: medium, secondary text
// - Context: small, tertiary text
// - Optional trend indicator icon
```

### 5.4 Badge Component

```typescript
// components/ui/Badge.tsx

interface BadgeProps {
  variant: 'default' | 'primary' | 'success' | 'warning';
  size: 'sm' | 'md';
  children: React.ReactNode;
}

// Use for: Skills, tags, status indicators
```

### 5.5 Section Component

```typescript
// components/layout/Section.tsx

interface SectionProps {
  id?: string;
  className?: string;
  background?: 'default' | 'subtle' | 'dark';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Standardizes section padding, max-width, backgrounds
```

### 5.6 Container Component

```typescript
// components/layout/Container.tsx

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  children: React.ReactNode;
}

// size maps to max-width values
```

---

## 6. Interactions & Animations

### 6.1 Animation Principles

- **Subtle over flashy:** Animations should feel natural, not distracting
- **Purpose-driven:** Every animation should serve a purpose (feedback, guidance, delight)
- **Consistent timing:** Use a consistent easing curve and duration scale
- **Respect motion preferences:** Check `prefers-reduced-motion`

### 6.2 Timing Scale

```typescript
// lib/animations.ts

export const timing = {
  fast: 0.15,      // Hovers, micro-interactions
  normal: 0.3,     // Standard transitions
  slow: 0.5,       // Page transitions, entrances
  slower: 0.8,     // Hero animations
};

export const easing = {
  default: [0.25, 0.1, 0.25, 1],           // ease-out
  bounce: [0.68, -0.55, 0.265, 1.55],      // Slight bounce
  smooth: [0.4, 0, 0.2, 1],                // Material design
};
```

### 6.3 Animation Variants (Framer Motion)

```typescript
// lib/animations.ts

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};
```

### 6.4 Specific Interactions

| Element | Interaction | Animation |
|---------|-------------|-----------|
| Buttons | Hover | Scale 1.02, shadow increase |
| Buttons | Click | Scale 0.98, instant |
| Cards | Hover | Y -4px, shadow-lg |
| Links | Hover | Color change, underline slide-in |
| Nav items | Active | Bottom border slide-in |
| Metrics | Entry | Count up animation |
| Images | Load | Fade in from blur |
| Page | Enter | Fade in, slight Y offset |
| Mobile menu | Open | Slide from right |
| Hero text | Animate | Typewriter or word swap |

### 6.5 Scroll Animations

```typescript
// Use Framer Motion's useInView or intersection observer

// Trigger animations when 20% of element is visible
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: true,
});
```

**Elements to animate on scroll:**
- Section headings (fadeInUp)
- Cards (fadeInUp, staggered)
- Timeline items (fadeInLeft/Right, alternating)
- Metric numbers (count up)
- Images (fadeIn with slight scale)

---

## 7. Content Structure

### 7.1 Data Files

#### work.ts

```typescript
// data/work.ts

export interface WorkExperience {
  id: string;
  slug: string;
  company: string;
  role: string;
  type: 'full-time' | 'internship' | 'contract';
  startDate: string;
  endDate: string | 'Present';
  location: string;
  description: string;
  highlights: string[];
  metrics: {
    value: string;
    label: string;
    context?: string;
  }[];
  skills: string[];
  thumbnail?: string;
  featured: boolean;
  caseStudy?: {
    overview: string;
    challenge: string;
    approach: {
      phase: string;
      description: string;
    }[];
    decisions: {
      decision: string;
      context: string;
      outcome: string;
    }[];
    results: string;
    learnings: string;
    images?: string[];
  };
}

export const workExperiences: WorkExperience[] = [
  {
    id: '1',
    slug: 'ikt-india',
    company: 'IKT INDIA',
    role: 'Junior Product Manager',
    type: 'full-time',
    startDate: '2022-06',
    endDate: '2024-05',
    location: 'India',
    description: 'Led product development for a B2B handloom marketplace...',
    highlights: [
      'Scaled vendor network from 20 to 50+ vendors',
      'Improved activation rates by 30-35%',
      'Achieved 20% retention improvement',
      'Shipped 20+ releases with 3-person engineering team',
    ],
    metrics: [
      { value: '30-35%', label: 'Activation Improvement', context: 'vs. baseline' },
      { value: '20%', label: 'Retention Uplift' },
      { value: '50+', label: 'Vendors Scaled', context: 'from 20' },
      { value: '20+', label: 'Releases Shipped' },
    ],
    skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Agile', 'B2B'],
    featured: true,
    caseStudy: {
      // Full case study content
    },
  },
  // More experiences...
];
```

#### skills.ts

```typescript
// data/skills.ts

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    proficiency: 'expert' | 'advanced' | 'intermediate';
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Product Management',
    skills: [
      { name: 'Product Strategy', proficiency: 'advanced' },
      { name: 'User Research', proficiency: 'advanced' },
      { name: 'Roadmap Planning', proficiency: 'advanced' },
      { name: 'A/B Testing', proficiency: 'intermediate' },
      { name: 'PRDs & Specs', proficiency: 'expert' },
    ],
  },
  {
    name: 'Technical',
    skills: [
      { name: 'SQL', proficiency: 'intermediate' },
      { name: 'Data Analysis', proficiency: 'advanced' },
      { name: 'Jira', proficiency: 'expert' },
      { name: 'Figma', proficiency: 'intermediate' },
    ],
  },
  {
    name: 'Methodologies',
    skills: [
      { name: 'Agile/Scrum', proficiency: 'expert' },
      { name: 'Design Thinking', proficiency: 'advanced' },
      { name: 'Lean Startup', proficiency: 'advanced' },
    ],
  },
];
```

#### personal.ts

```typescript
// data/personal.ts

export const personalInfo = {
  name: 'CJ',
  title: 'Product Manager',
  tagline: 'Building products that scale, convert, and retain.',
  location: 'Phoenix, Arizona',
  education: {
    current: {
      degree: 'MS Management of Technology',
      school: 'Arizona State University',
      graduation: 'May 2026',
    },
    past: {
      degree: 'B.Tech Electrical Engineering',
      school: 'JNTU Hyderabad',
    },
  },
  certifications: ['Certified Scrum Product Owner (CSPO)'],
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourprofile',
  visaStatus: 'Requires H1B Sponsorship',
  openTo: ['Full-time', 'Remote', 'Hybrid', 'Relocation'],
};
```

---

## 8. Technical Implementation

### 8.1 Next.js Configuration

```typescript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

### 8.2 Tailwind Configuration

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#FAFAFA',
          secondary: '#FFFFFF',
          dark: '#0A0A0A',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4A4A4A',
          tertiary: '#7A7A7A',
          muted: '#9A9A9A',
        },
        accent: {
          primary: '#E07A5F',
          secondary: '#3D405B',
          tertiary: '#81B29A',
        },
        border: {
          DEFAULT: '#E5E5E5',
          hover: '#CCCCCC',
        },
        surface: {
          hover: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.02)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.06), 0 4px 10px rgba(0, 0, 0, 0.03)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)',
        'button': '0 2px 4px rgba(224, 122, 95, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 8.3 Global Styles

```css
/* styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-accent-primary: 224 122 95;
    --color-accent-secondary: 61 64 91;
  }

  html {
    scroll-behavior: smooth;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  body {
    @apply bg-background-primary text-text-primary;
    font-feature-settings: 'cv11', 'ss01';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    @apply bg-accent-primary/20;
  }
}

@layer components {
  .container-narrow {
    @apply max-w-3xl mx-auto px-4 sm:px-6;
  }

  .container-wide {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 md:py-24;
  }

  .link-underline {
    @apply relative;
  }

  .link-underline::after {
    @apply absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-300;
    content: '';
  }

  .link-underline:hover::after {
    @apply w-full;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### 8.4 Package Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.292.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

### 8.5 Utility Functions

```typescript
// lib/utils.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function calculateDuration(start: string, end: string | 'Present'): string {
  const startDate = new Date(start);
  const endDate = end === 'Present' ? new Date() : new Date(end);
  
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}
```

---

## 9. Performance Requirements

### 9.1 Core Web Vitals Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | < 4.0s |
| FID (First Input Delay) | < 100ms | < 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 |
| TTFB (Time to First Byte) | < 200ms | < 600ms |

### 9.2 Performance Checklist

- [ ] Images: Use `next/image` with proper sizing and lazy loading
- [ ] Fonts: Preload Inter font, use `font-display: swap`
- [ ] Code splitting: Dynamic imports for non-critical components
- [ ] Bundle size: Keep initial JS < 150KB gzipped
- [ ] CSS: Purge unused Tailwind classes
- [ ] Animations: Use `transform` and `opacity` only (GPU accelerated)
- [ ] Third-party scripts: Defer non-critical scripts

### 9.3 Image Optimization

```typescript
// Always use next/image
import Image from 'next/image';

// For hero images
<Image
  src="/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority
  quality={85}
/>

// For below-fold images
<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  loading="lazy"
  quality={75}
/>
```

---

## 10. Responsive Design

### 10.1 Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px   /* Landscape phones */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### 10.2 Mobile-First Rules

- Default styles target mobile
- Add complexity with `sm:`, `md:`, `lg:` prefixes
- Test all pages at 320px, 375px, 768px, 1024px, 1440px
- Touch targets minimum 44x44px
- No horizontal scroll at any viewport

### 10.3 Key Responsive Patterns

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Navigation | Hamburger menu | Hamburger menu | Horizontal links |
| Hero | Stack vertically | Stack vertically | Side-by-side |
| Work grid | 1 column | 2 columns | 2-3 columns |
| Timeline | Vertical only | Vertical | Horizontal option |
| Contact form | Full width | 80% width | 60% width |

---

## 11. SEO & Meta

### 11.1 Meta Tags Template

```typescript
// app/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    default: 'CJ | Product Manager',
    template: '%s | CJ',
  },
  description: 'Product Manager with expertise in B2B marketplaces, data-driven product development, and scaling products from 0 to 1.',
  keywords: ['Product Manager', 'PM', 'B2B', 'Marketplace', 'Arizona State University'],
  authors: [{ name: 'CJ' }],
  creator: 'CJ',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    title: 'CJ | Product Manager',
    description: 'Product Manager with expertise in B2B marketplaces, data-driven product development, and scaling products from 0 to 1.',
    siteName: 'CJ Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CJ - Product Manager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CJ | Product Manager',
    description: 'Product Manager with expertise in B2B marketplaces.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 11.2 Page-Specific Meta

```typescript
// Each page should export its own metadata

// app/about/page.tsx
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about my journey from electrical engineering to product management.',
};

// app/work/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const work = getWorkBySlug(params.slug);
  return {
    title: `${work.company} Case Study`,
    description: work.description,
  };
}
```

### 11.3 Structured Data

```typescript
// Add JSON-LD for rich snippets

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'CJ',
  jobTitle: 'Product Manager',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Arizona State University',
    },
  ],
  knowsAbout: ['Product Management', 'B2B Marketplaces', 'User Research'],
  url: 'https://yoursite.com',
};
```

---

## 12. Deployment Checklist

### 12.1 Pre-Launch

- [ ] All pages render correctly at all breakpoints
- [ ] All links work (no 404s)
- [ ] Forms submit correctly with validation
- [ ] Images have alt text
- [ ] Favicon and og-image configured
- [ ] Analytics installed (if desired)
- [ ] Console has no errors
- [ ] Performance audit passed (Lighthouse > 90)
- [ ] Accessibility audit passed (no critical issues)
- [ ] Meta tags render correctly (use social card validators)
- [ ] Contact form tested end-to-end
- [ ] PDF resume download works
- [ ] Dark mode (if implemented) works correctly

### 12.2 Hosting Recommendation

**Vercel** (recommended for Next.js):
- Zero-config deployment
- Automatic HTTPS
- Edge functions for contact form
- Analytics built-in
- Preview deployments for each PR

### 12.3 Domain Setup

- Configure custom domain
- Set up www redirect
- Enable HTTPS
- Configure email forwarding if needed

---

## Appendix A: Sample Component Code

### A.1 Hero Section

```tsx
// components/sections/Hero.tsx

'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/shared/MetricCard';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const metrics = [
  { value: '30%+', label: 'Activation Improvement' },
  { value: '50+', label: 'Vendors Scaled' },
  { value: '20+', label: 'Releases Shipped' },
];

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center section-padding">
      <div className="container-wide">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm font-medium tracking-wide text-accent-primary uppercase mb-4"
          >
            Product Manager
          </motion.p>
          
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold text-text-primary mb-6"
          >
            Hi, I'm CJ.
            <br />
            I build products that{' '}
            <span className="text-accent-primary">scale.</span>
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-lg text-text-secondary mb-8 max-w-xl"
          >
            Currently pursuing MS in Management of Technology at Arizona State
            University, seeking PM roles where I can drive measurable impact.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
            <Button variant="primary" size="lg" href="/work">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" href="/resume.pdf">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-3 gap-4 md:gap-8"
          >
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

### A.2 Navigation Header

```tsx
// components/layout/Header.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background-primary/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-text-primary hover:text-accent-primary transition-colors"
          >
            CJ
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors link-underline',
                  pathname === item.href
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 top-16 bg-background-primary z-40 md:hidden"
        >
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-2xl font-medium',
                  pathname === item.href
                    ? 'text-accent-primary'
                    : 'text-text-primary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
```

---

## Appendix B: Content Writing Guidelines

### B.1 Voice & Tone

- **Professional but approachable:** Don't be stiff, but maintain credibility
- **Confident but humble:** Own your wins, acknowledge learning opportunities
- **Specific over vague:** Use numbers, names, and concrete examples
- **Active voice:** "I led" not "The team was led by me"

### B.2 Writing Metrics

| Metric Type | Good Example | Bad Example |
|-------------|--------------|-------------|
| Absolute | "Scaled to 50+ vendors" | "Grew vendors significantly" |
| Relative | "30% improvement" | "Improved activation" |
| Time-bound | "Within 6 months" | "Quickly" |
| Contextual | "From 20 to 50+" | "Increased vendors" |

### B.3 Case Study Structure

1. **Hook:** One sentence that makes someone want to read more
2. **Context:** What was the situation? (2-3 sentences)
3. **Challenge:** What made this hard? (Bullet points OK)
4. **Approach:** What did YOU do? (Use "I" not "we" for your contributions)
5. **Results:** Numbers first, then narrative
6. **Learnings:** What would you do differently? (Shows growth mindset)

---

**End of Document**

*This document should serve as the single source of truth for building CJ's portfolio. Follow it precisely for consistent, high-quality results.*
