# IEM IT — Department Website (`iem_it_next`)

This is the official landing/informational website for the **IEM Department of Information Technology**. It's a static, statically-exported **Next.js 15 (App Router)** site written in **TypeScript**, styled with **Bootstrap + custom CSS + Tailwind (v4)**, and deployed to **Firebase Hosting** via a GitHub Actions workflow.

This document explains every folder and file so any team member can find their way around the codebase quickly.

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, static export via `output: "export"`) |
| Language | TypeScript (a couple of legacy `.jsx` files still exist) |
| UI Libraries | `react-bootstrap`, Bootstrap 5 CSS, `react-icons`, `@fortawesome/fontawesome-free` |
| Animation | `framer-motion` |
| Data / Utility | `moment` (dates), `react-masonry-css` (notice board grid) |
| PDFs | `pdfjs-dist`, `react-pdf` (viewing syllabus/study-material PDFs) |
| Styling | Bootstrap + component-level `.css` files + Tailwind v4 (via `@tailwindcss/postcss`) |
| Hosting/CI | Firebase Hosting, deployed automatically by a GitHub Actions workflow on push to `main` |
| Component installer | `jsrepo` (used to pull in the `Carousel` / `Stack` components from [reactbits.dev](https://reactbits.dev)) |

Since `next.config.ts` sets `output: "export"`, the whole site is built as static HTML/CSS/JS (`npm run build` → outputs to `./dist`, not the default `.next`) and served by Firebase Hosting — there is **no Node.js server, no API routes, and no database**. All content is hard-coded in `src/lib/dummydata.tsx`.

---

## 2. Getting Started

```bash
npm install
npm run dev      # start local dev server → http://localhost:3000
npm run build    # static export → ./dist
npm run start    # serve the last `next build` output (not used in prod; prod uses static export)
npm run lint     # run ESLint
```

Node version is pinned in `.nvmrc` → **Node 22**.

---

## 3. Top-Level Files & Config

| File | Purpose |
|---|---|
| `package.json` / `package-lock.json` | Project metadata, npm scripts (`dev`, `build`, `start`, `lint`) and dependencies |
| `next.config.ts` | Next.js config — static export mode (`output: "export"`), `distDir: "dist"`, trailing slashes, unoptimized images, and allowed remote image hosts (`images.pexels.com`, `res.cloudinary.com`) |
| `tsconfig.json` | TypeScript compiler settings + the `@/*` path alias that maps to `src/*` |
| `tailwind.config.ts` | Tailwind CSS v4 configuration |
| `postcss.config.mjs` | PostCSS pipeline (feeds Tailwind) |
| `eslint.config.mjs` | ESLint rules (flat config, based on `eslint-config-next`) |
| `firebase.json` | Firebase Hosting config — serves the `dist` folder, rewrites all routes to `index.html` (SPA-style fallback) |
| `.firebaserc` | Firebase project alias (`iem-it`) |
| `jsrepo.json` | Config for the `jsrepo` CLI, used to install pre-built animated components (`Carousel`, `Stack`) from reactbits.dev into `src/components` |
| `.nvmrc` | Pins Node.js version (22) for local dev & CI |
| `.editorconfig` | Shared editor formatting rules (2-space indent, LF line endings, etc.) |
| `.gitignore` | Standard Next.js/Node ignore rules |
| `.github/workflows/build_and_deploy.yml` | CI/CD: on every push to `main`, installs deps, runs `npm run build`, and deploys the static output to Firebase Hosting (live channel) |
| `.github/dependabot.yml` | Automated dependency update PRs |
| `README.md` | (This file — previously the default `create-next-app` boilerplate) |

---

## 4. Folder Structure Overview

```
iem_it_next/
├── public/              → Static assets served as-is (images, PDFs, icons)
├── src/
│   ├── app/              → Next.js App Router — one folder per route/page
│   ├── components/       → All React UI building blocks, grouped by section
│   └── lib/               → Static/dummy content data (dummydata.tsx)
├── next.config.ts, tailwind.config.ts, tsconfig.json, ...
└── .github/workflows/     → CI/CD pipeline
```

---

## 5. `public/` — Static Assets

Everything here is served directly at the site root (e.g. `public/logo.png` → `/logo.png`).

- **Root of `public/`** — small UI icons used across the dashboard-style components (`avatar.png`, `calendar.png`, `class.png`, `delete.png`, `search.png`, `iem_logo_.png`, etc.) plus default Next.js assets (`next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg`).
- **`public/images/`** — All photographic/content imagery used throughout the site, further organized into sub-folders:
  - `achievements/`, `alumni_talk/`, `blog/`, `companies/` (recruiter logos for placements), `courses/` (and `courses/online/`), `dept/`, `homeAbout/`, `iem_iete/`, `iem-icdc/`, `infrastructure/` (lab & classroom photos), `innovation/`, `notice/`, `teachers/` (faculty photos), `team/`
  - Root of `images/` also has one-off banners/backgrounds (`about.webp`, `bg_1.jpg`…`bg_4.JPG`, `mission.jpg`, `vision.jpg`, `naac_certificate.jpg`, `hod_img.jpg`, etc.)
- **`public/pdfs/`** — Downloadable/viewable PDF documents:
  - Syllabus PDFs (`4th_Semester_DetailedSyllabus.pdf`, `Detailed_Syllabus_for_6th_Semester_removed.pdf`)
  - `Assignments/` — Lab assignment PDFs grouped by subject (`AIML_LAB/`, `AP(OOPS) LAB/`, `DAA LAB/`)
  - `study_mats/` — Study material PDFs grouped by subject (`aiml/`, `ap(oops)/`, `coa/`, `discrete_mathematics/`, `ess/`)
  - Misc: department magazine (`Harmony-2nd_Edition.pdf`), E-Cell brochure, tech-fest report, placement report (`IT_2021-2025.pdf`)

> Note: file paths inside these PDF/image folders are referenced directly from `src/lib/dummydata.tsx` and from components like `StudyMaterialsCard.jsx` and `MagazineCard.tsx`.

---

## 6. `src/app/` — Pages (Next.js App Router)

Each sub-folder is a **route**, and its `page.tsx` is what renders at that URL. The site currently has no dynamic/nested routes — every route is a single static page composed from `src/components`.

| File / Folder | Route | What it renders |
|---|---|---|
| `layout.tsx` | (root layout, wraps all pages) | Loads fonts (Geist), global CSS, Bootstrap CSS, FontAwesome CSS, and wraps every page in `LayoutWrapper` |
| `page.tsx` | `/` | **Home page** — `Hero`, `NoticeBoard`, `Hodmsg` (HOD message), `Habout` (department overview), `NaacCert`, `Footer` |
| `about/page.tsx` | `/about` | **About Us** — `Aboutprog` (programs offered), `Aboutvision` (vision/mission), `Hprogs` (PEO/PO/PSO tables) |
| `academics/page.tsx` | `/academics` | **Academics** — `AcademicsCard` (curriculum, routine, infrastructure tabs) |
| `faculty/page.tsx` | `/faculty` | **Faculty Corner** — `ItFaculty` (faculty list, mentors, class teachers) |
| `innovation_initiatives/page.tsx` | `/innovation_initiatives` | **"DevWorld"** — `InnovationIniCard` (publications, book chapters, magazine, alumni talks) |
| `land_students/page.tsx` | `/land_students` | **Student's Corner** — `Blogcard` (placements, student chapters, study materials, achievements, department events, HackOasis) |
| `loading.tsx` | (global) | Full-screen animated loading spinner shown during route transitions |
| `not-found.tsx` | (global 404) | Basic "404: Page Not Found" fallback |
| `globals.css` | — | Global styles, CSS resets, and the page-specific background classes (`bg-home`, `bg-about`, etc.) referenced by `LayoutWrapper` |
| `favicon.ico` | — | Site favicon |

Every inner page follows the same pattern: `<Back title="..."/>` (page header/breadcrumb) → main section component(s) → `<GoToTop/>` → `<Footer/>`.

---

## 7. `src/components/` — UI Components

Organized by section. `'use client'` at the top of a file means it's a client component (uses hooks/state/browser APIs); files without it are server components.

### 7.1 `Common/` — Shared/global UI used on every page
| File | Purpose |
|---|---|
| `Header/Header.tsx` (+ `Head.tsx`, `Header.css`) | Top navigation bar with the responsive/mobile menu (`Head.tsx` is a sub-piece of the header) |
| `Footer/Footer.tsx` (+ `Footer.css`) | Site footer, present on all pages; also adjusts styling based on current route (`usePathname`) |
| `hero/Hero.tsx` (+ `Hero.css`) | Home page hero banner, image carousel (uses the `Carousel` component) |
| `heading/Heading.tsx` | Reusable "subtitle + title" section heading used across almost every content section |
| `back/Back.tsx` (+ `back.css`) | Page-header/breadcrumb bar (title + back navigation) shown at the top of every inner page |
| `GotoTop/GoToTop.tsx` (+ `gototop.css`) | Floating "scroll to top" button that appears after scrolling |

### 7.2 `Components/` — Generic, reusable UI primitives (installed via `jsrepo`/reactbits.dev)
| File | Purpose |
|---|---|
| `Carousel/Carousel.tsx` | Generic draggable/animated image carousel (built with `framer-motion`), used in `Hero` |
| `Stack/Stack.tsx` | Generic draggable/animated "card stack" component (built with `framer-motion`) |

### 7.3 `comp_home/` — Home page (`/`) sections
| File | Purpose |
|---|---|
| `Habout.tsx` (+ `homePart.css`) | "About the Department" section with department cards (`deptCard` data) |
| `Hodmsg.tsx` | Head of Department's welcome message block |
| `NaacCert.tsx` (+ `Naac.css`) | Displays the NAAC accreditation certificate |
| `NoticeBoard.tsx` (+ `Notice.css`) | Scrollable/masonry notice board pulling from `notices` data, formats dates with `moment` |

### 7.4 `comp_about/` — About Us page (`/about`) sections
| File | Purpose |
|---|---|
| `Aboutprog.tsx` (+ `aboutprogs.css`) | Lists programs offered by the department (`aboutprog` data) |
| `Aboutvision.tsx` (+ `vision.css`) | Displays the department's vision & mission statement |
| `Hprogs.tsx` | Renders PEO (Program Educational Objectives), PO (Program Outcomes), and PSO (Program Specific Outcomes) tables |

### 7.5 `comp_academics/` — Academics page (`/academics`) sections
| File | Purpose |
|---|---|
| `AcademicsCard.tsx` | Tab container that switches between Curriculum, Routine, and Infrastructure views |
| `CurriculumCard.tsx` (+ `Courses.css`) | Semester-wise curriculum/course structure tables (4th/6th/8th sem) |
| `RoutineCard.tsx` | Class routine/timetable tables, supports merged cells (rowspan/colspan) |
| `InfrastructureCard.tsx` | Photo gallery of labs & classrooms |

### 7.6 `comp_faculty/` — Faculty Corner page (`/faculty`) sections
| File | Purpose |
|---|---|
| `ItFaculty.tsx` (+ `faculty_gen.css`) | Container that switches between faculty list, mentors, and class teachers views |
| `ListFaculty.tsx` | Grid/list of all IT faculty members with photos & designations (`itfaculty` data) |
| `ListMentors.tsx` | Mentor–mentee mapping list (`mentorsList` data) |
| `ClassTeachers.tsx` | List of class teachers per section/semester (`classTeachers` data) |

### 7.7 `comp_innov/` — Innovation & Initiatives page (`/innovation_initiatives`) sections
| File | Purpose |
|---|---|
| `InnovationIniCard.tsx` | Tab container switching between Publications, Book Chapters, Magazine, and Alumni Talks |
| `PublicationCard.tsx` | Faculty/student research publication tables, filterable by conference/journal (`publications` data) |
| `BookCard.tsx` | Faculty/student book-chapter tables (`book_chapter` data) |
| `MagazineCard.tsx` | Links to the department magazine PDF (`Harmony-2nd_Edition.pdf`) |
| `AlumniReportCard.tsx` | Carousel/grid of alumni talk highlights (slides from `public/images/alumni_talk/`) |

### 7.8 `comp_students/` — Student's Corner page (`/land_students`) sections
| File | Purpose |
|---|---|
| `Blogcard.tsx` (+ `blog.css`) | Main container for the Student's Corner — toggles between Placements, Student Chapters, Study Materials, and Achievements, and also renders `DepartmentEvents` and `HackOasis` |
| `PlacementCard.tsx` | Placement statistics / recruiter showcase (`placement` data) |
| `StudChapterCard.jsx` | Student chapters/clubs information |
| `StudyMaterialsCard.jsx` | Semester & subject-wise study material PDF browser (folder/file tree UI linking into `public/pdfs/study_mats/`) |
| `StudentAchieveCard.tsx` | Animated showcase of student achievements (`achievements` data) |
| `DepartmentEvents.tsx` | Department event highlights |
| `HackOasis.tsx` | Section for the "HackOasis" hackathon/event |
| `cards_students.css` | Shared styling for Student's Corner cards |

### 7.9 `LayoutWrapper.tsx`
Wraps every page (used in the root `layout.tsx`). Decides whether to show the `Header` (hidden on `/sign-in`, `/admin`, `/teacher`, `/student` — these routes don't currently exist in `src/app` but are reserved paths) and applies a page-specific background class based on the current route.

---

## 8. `src/lib/dummydata.tsx` — Central Content/Data Source

This is the **single source of truth for almost all text/content** on the site (there is no CMS or backend). It exports plain TypeScript arrays/objects, each consumed by one or more components above:

| Export | Used by | Content |
|---|---|---|
| `homeAbout`, `awrapper` | Home page | About-department highlight cards |
| `coursesCard` | Academics | Course listing cards |
| `deptCard` | `Habout` | Department overview cards |
| `placement` | `PlacementCard` | Placement stats/recruiters |
| `team` | — | Team member info |
| `blog` | `Blogcard` | Student's Corner top-level nav data |
| `testimonal` | — | Testimonials |
| `aboutprog` | `Aboutprog` | Programs offered |
| `peo`, `po`, `pso` | `Hprogs` | Program educational objectives/outcomes |
| `innovation`, `magazine` | `InnovationIniCard` | Innovation initiatives + magazine links |
| `itprogfaculty`, `mentorsList`, `itfaculty`, `classTeachers` | `comp_faculty/*` | Faculty, mentor, and class-teacher directories |
| `notices` | `NoticeBoard` | Notice board entries (title, date, etc.) |
| `publications`, `book_chapter` | `comp_innov/*` | Faculty/student publications & book chapters |
| `achievements` | `StudentAchieveCard` | Student achievement entries |

**To update site content** (add a notice, a new faculty member, a new publication, etc.), this is almost always the only file that needs editing — along with adding any matching image/PDF to `public/`.

---

## 9. Deployment Flow

1. Push/merge to `main`.
2. `.github/workflows/build_and_deploy.yml` triggers → installs deps (`npm ci`), runs `npm run build`.
3. `next build` (with `output: "export"`) produces a static site in `./dist`.
4. `FirebaseExtended/action-hosting-deploy` deploys `dist` to the Firebase Hosting project defined in `.firebaserc` (`iem-it`), using secrets `FIREBASE_SERVICE_ACCOUNT` and `FIREBASE_PROJECT_ID`.
5. `firebase.json` rewrites all paths to `index.html` for client-side routing support.

---

## 10. Quick Map: "I want to change X, where do I go?"

| I want to... | Edit this |
|---|---|
| Add/edit a notice | `src/lib/dummydata.tsx` → `notices` |
| Add a faculty member | `src/lib/dummydata.tsx` → `itfaculty` (+ photo in `public/images/teachers/`) |
| Add a study material PDF | Drop PDF in `public/pdfs/study_mats/<subject>/` and add an entry in `comp_students/StudyMaterialsCard.jsx` |
| Add a publication | `src/lib/dummydata.tsx` → `publications` |
| Change the header/nav links | `src/components/Common/Header/Header.tsx` |
| Change the footer | `src/components/Common/Footer/Footer.tsx` |
| Change home page hero images | `src/components/Common/hero/Hero.tsx` + `public/images/` |
| Add a brand-new page/route | Create a new folder with `page.tsx` under `src/app/` |
| Change global colors/fonts | `src/app/globals.css`, `tailwind.config.ts` |
| Change deployment behavior | `.github/workflows/build_and_deploy.yml`, `firebase.json` |