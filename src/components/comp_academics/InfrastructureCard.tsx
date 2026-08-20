'use client';

import React from "react";
import Image from "next/image";

const paper = "#C9DBED";
const line = "#E7E1D3";
const ink = "#20262F";
const navy = "#16324F";
const gold = "#B4872A";
const goldSoft = "#D8AE5C";
const muted = "#8A8370";

// Existing gallery data
const galleryImages = [
  { title: "LG 2.1 Room", img: "/images/infrastructure/class3.jpg" },
  { title: "Competitive Coding Class", img: "/images/infrastructure/class1.jpg" },
  { title: "Theoretical Class at LG 4.7", img: "/images/infrastructure/class4.jpg" },
  { title: "Theoretical Class at Annex 5th Floor", img: "/images/infrastructure/class5.jpg" },
  { title: "DAA LAB", img: "/images/infrastructure/Lab1.jpg" },
  { title: "AIML LAB", img: "/images/infrastructure/Lab2.jpg" },
  { title: "OOPS LAB", img: "/images/infrastructure/Lab3.jpg" },
  { title: "COA LAB", img: "/images/infrastructure/Lab5.jpg" },
];

const labCategories = [
  {
    title: "Software & Programming",
    accent: "#35618F",
    icon: "code",
    labs: [
      "Object-Oriented Programming Lab",
      "Data Structures Lab",
      "Design and Analysis of Algorithms Lab",
      "Software Engineering Lab",
    ],
  },
  {
    title: "IT & Emerging Technologies",
    accent: "#9C7A2E",
    icon: "cloud",
    labs: [
      "IT Workshop Lab",
      "Cyber Security Lab",
      "Cloud Computing & IoT Lab",
      "Artificial Intelligence & Machine Learning Lab",
    ],
  },
  {
    title: "Database and Systems",
    accent: "#3E7A5E",
    icon: "database",
    labs: ["Database Management Systems Lab", "Operating Systems Lab"],
  },
  {
    title: "Networking & Language",
    accent: "#6B5490",
    icon: "network",
    labs: ["Computer Networking Lab", "Compiler Design Lab"],
  },
  {
    title: "Computer Hardware and Electronics",
    accent: "#A24E48",
    icon: "chip",
    labs: [
      "Digital Electronics Lab",
      "Analog Electronics Lab",
      "Computer Organization & Architecture Lab",
    ],
  },
];

const amenities = [
  "Rooftop mini-golf course",
  "Cricket net practice area",
  "Table tennis boards",
  "Carrom boards",
  "Two basketball courts",
  "Gymnasium",
];

const stats = [
  { value: "2.4 Gbps", label: "Campus Internet" },
  { value: "Wi-Fi", label: "Enabled Campus" },
  { value: "5000+", label: "Computers for Students" },
];

const totalLabs = labCategories.reduce((n, c) => n + c.labs.length, 0);

function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: gold }}
    >
      <span className="h-1.5 w-1.5 rotate-45" style={{ backgroundColor: goldSoft }} />
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <Overline>{eyebrow}</Overline>
      <h2
        className="mt-2 text-2xl font-bold tracking-tight sm:text-[32px] sm:leading-tight"
        style={{ color: navy }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-sm leading-relaxed sm:text-base md:text-lg max-w-5xl" style={{ color: muted }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function CircuitAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 160"
      className={`pointer-events-none absolute ${className}`}
      style={{ opacity: 0.07 }}
      fill="none"
    >
      <path
        d="M0 40 H60 V10 H140 V40 H220 M60 40 V90 H100 V140 M100 90 H180 V120"
        stroke={navy}
        strokeWidth="2"
      />
      {[
        [60, 40],
        [140, 40],
        [100, 90],
        [180, 120],
        [60, 10],
        [100, 140],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill={navy} />
      ))}
    </svg>
  );
}

const iconPaths: Record<string, React.ReactNode> = {
  code: (
    <path
      d="M9 8 4 12l5 4M15 8l5 4-5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cloud: (
    <path
      d="M7 17h10a3.5 3.5 0 0 0 .5-6.96A5.5 5.5 0 0 0 7.1 9.1 4 4 0 0 0 7 17Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </>
  ),
  network: (
    <>
      <circle cx="5" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6.7 7.3 10.5 16.5M17.3 7.3 13.5 16.5M7 6h10" stroke="currentColor" strokeWidth="1.8" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
};

function CategoryIcon({ name, color }: { name: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ color }}>
      {iconPaths[name]}
    </svg>
  );
}

export default function InfrastructureCard() {
  return (
    <section
      className="px-4 py-12 sm:px-6 lg:px-8 sm:py-16 min-h-screen"
      id="infrastructure-section"
      style={{ backgroundColor: paper }}
    >
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        
        {/* CARD 1: Department Infrastructure */}
        <div
          className="relative overflow-hidden rounded-2xl border bg-white p-5 sm:p-10"
          style={{ borderColor: line }}
        >
          <CircuitAccent className="right-0 top-0 h-40 w-56 hidden sm:block" />

          <SectionHeading
            eyebrow="Department Infrastructure"
            title="Facilities built for hands-on engineering"
            sub="The IT Department is equipped with state-of-the-art laboratories, modern classrooms, and research facilities that give students practical, hands-on grounding in information technology and modern software development."
          />

          {/* Spec strip */}
          <div
            className="mb-8 grid grid-cols-1 divide-y overflow-hidden rounded-xl border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            style={{ borderColor: line }}
          >
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-5 sm:px-6 sm:py-6 text-center" style={{ borderColor: line }}>
                <div
                  className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl"
                  style={{ color: navy }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-1.5 text-[11px] font-medium uppercase tracking-wider"
                  style={{ color: muted }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Recreational Amenities */}
          <div className="rounded-xl border p-5 sm:p-6" style={{ borderColor: line, backgroundColor: paper }}>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: navy }}>
              Recreational Amenities
            </div>
            <div className="flex flex-wrap gap-2">
              {amenities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium"
                  style={{ borderColor: line, color: ink }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2: Laboratory Facilities */}
        <div className="rounded-2xl border bg-white p-5 sm:p-10" style={{ borderColor: line }}>
          <SectionHeading
            eyebrow="Laboratory Facilities"
            title="Laboratory Facilities"
            sub={`${totalLabs} labs organized across ${labCategories.length} specializations, from core programming to embedded hardware.`}
          />

          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 lg:gap-6">
            {labCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-xl border bg-white p-5 sm:p-6 shadow-sm"
                style={{ borderColor: line, borderLeft: `4px solid ${category.accent}` }}
              >
                {/* MODERNIZED HEADING: Icon block + better typography */}
                <div className="mb-4 flex items-center gap-3.5">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${category.accent}15` }}
                  >
                    <CategoryIcon name={category.icon} color={category.accent} />
                  </div>
                  <span className="text-base font-bold leading-snug sm:text-lg" style={{ color: navy }}>
                    {category.title}
                  </span>
                </div>
                
                {/* Refined Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.labs.map((lab) => (
                    <span
                      key={lab}
                      className="rounded-md px-3 py-1.5 text-sm font-medium leading-tight"
                      style={{
                        color: category.accent,
                        backgroundColor: `${category.accent}0D`,
                        border: `1px solid ${category.accent}30`,
                      }}
                    >
                      {lab}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 3: Infrastructure Gallery */}
        <div className="rounded-2xl border bg-white p-5 sm:p-10" style={{ borderColor: line }}>
          <SectionHeading
            eyebrow="Infrastructure Gallery"
            title="Inside the department"
            sub="A look at classrooms, labs, and workshops in daily use."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
            {galleryImages.map((item, index) => (
              <div
                key={item.title}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border"
                style={{ borderColor: line }}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  className="absolute inset-x-0 bottom-0 h-24"
                  style={{
                    background: "linear-gradient(to top, rgba(11,29,51,0.92), rgba(11,29,51,0))",
                  }}
                />

                <span
                  className="absolute left-3 top-3 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(11,29,51,0.75)" }}
                >
                  FIG. {String(index + 1).padStart(2, "0")}
                </span>

                <p className="absolute inset-x-3 bottom-3 text-sm font-medium leading-snug text-white">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}