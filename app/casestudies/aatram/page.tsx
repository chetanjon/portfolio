import type { Metadata } from 'next';
import Link from 'next/link';
import AatramCaseStudy from '@/components/sections/aatram-case-study';

export const metadata: Metadata = {
  title: "Aatram · 0-to-1 Product Case Study",
  description:
    "Three roommates built an app that treats procrastination as an emotion problem, not a discipline problem. A 0-to-1 case study from brainstorm to App Store.",
};

export default function AatramPage() {
  return (
    <>
      <AatramCaseStudy />
      {/* De-orphan /craft: a contextual way into the design-system deep dive. */}
      <section className="container-wide max-w-4xl pb-24">
        <div className="tick-rule pt-8">
          <Link
            href="/craft"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent-primary hover:opacity-80 transition-opacity"
          >
            See how it&rsquo;s built: the design system, the SwiftUI-Canvas logo, the motion, the voice
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
