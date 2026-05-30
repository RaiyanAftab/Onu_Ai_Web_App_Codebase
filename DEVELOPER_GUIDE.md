# onu.ai (Brand Vault) — Developer & Integration Guide

Welcome to the development guide for **onu.ai**. This document provides the technical requirements, architectural patterns, state managers, and deployment guides required to scale, modify, or integrate the onu.ai workspace code.

---

## 1. Tech Stack & Architecture

The application is structured as a modern, single-page progressive web app built on **Next.js 15 (App Router)** and **TypeScript**:

-   **Frontend Core**: React 19 (Server & Client Components)
-   **Animations & Transitions**: `framer-motion` (for fluid glassmorphic modals, real-time node count increments, and tabs)
-   **Style System**: Vanilla CSS integrated with **TailwindCSS** utilities for structural flex grids, premium dark colors (`#020202` to `#0A0A0A`), backdrop-blur filters, and custom scrollbar overrides.
-   **Build Tool**: Next.js compiler using **Turbopack** for rapid development reloads.

---

## 2. Codebase Entry Points & Components

All primary application screens reside inside a singular, high-performance client file: `src/app/workspace/page.tsx`. This allows all state variables to interact directly and guarantees absolute state consistency.

### Primary UI Sub-Components (Mapped in `page.tsx`)

1.  `PreSimulationUI`: Renders the parameters configuration board (Age, Income, Geography, Sweep Radius) and the drag-and-drop file upload zone.
2.  `SimulationUI`: Orchestrates the simulated compute steps, using state triggers to render progressing text feeds (e.g., "INGESTING BRANDBOOK HISTORICAL RAG...", "COMPILING DEMOGRAPHIC REPORT...") and animated counter loops matching the 1,500 persona nodes.
3.  `EnterpriseReport`: Renders the clearance-level report containing:
    *   Dynamic metric scorecards calculating `displayConfidence`, `displayFriction`, and `displayRoas` live.
    *   The checkable `Cognitive Optimization & Action Plan` checkbox grid.
    *   The `EXECUTIVE CONSULTATION` conversational Swarm sidebar.
4.  `ApiConsoleUI`: Generates functional code samples (`curl`, Python, JavaScript) to integrate the Swarm calculations with standard automation scripts.

---

## 3. Dynamic State & React Calculations

To modify how the metrics or dynamic calculations behave, adjust the following React States at the top of the `WorkspaceContent` component:

```tsx
// Optimization States (binds the checkboxes to score recalculations)
const [isDialectOptimized, setIsDialectOptimized] = useState(false);
const [isFrictionOptimized, setIsFrictionOptimized] = useState(false);
const [isRadiusOptimized, setIsRadiusOptimized] = useState(false);
```

### Recalculation Formulas (Inside `EnterpriseReport`)

*   **Geographic Radius Sweep**:
    ```tsx
    const currentRadius = isRadiusOptimized ? 10 : radiusKm;
    ```
*   **Data Confidence**:
    ```tsx
    const displayConfidence = Math.max(52, Math.round(98 - (currentRadius * 0.46)));
    ```
*   **Overall Friction Score**:
    ```tsx
    const displayFriction = Math.max(4, 14 - (isDialectOptimized ? 4 : 0) - (isFrictionOptimized ? 6 : 0));
    ```
*   **Projected ROAS Lift**:
    ```tsx
    const displayRoas = 12 + (isDialectOptimized ? 6 : 0) + (isFrictionOptimized ? 8 : 0);
    ```

To tweak the baseline scores or dynamic behaviors, you can adjust these math coefficients.

---

## 4. Guide for AI-Assisted Customizations

If you are uploading this codebase to other AI models (e.g. Gemini, Claude, GPT-4) to perform automatic tweaks, use the following prompt examples to get perfect, contextual results:

### Prompt 1: To Add a New Target Geography
> *"I want to add a seventh geographical anchor to the onu.ai workspace named 'Sreemangal Resort Hub'. In `src/app/workspace/page.tsx`, please add Sreemangal to the `hubCoordinates` map with lat/long and a signal strength of '88% (STABLE)'. Add Sreemangal's specialized dialogue, caption, and OCR triggers inside the `multimodalData` record, focusing on luxury eco-tourism and digital payment cashbacks. Finally, add Sreemangal's custom responses inside the `handleChatSubmit` staggered swarm feedback list."*

### Prompt 2: To Add a Fourth KPI Metric
> *"I want to add a fourth metric card to the executive dashboard called 'Brand Dilution Index' (colored Amber, with a hover tooltip explaining that it measures deviation from past campaign assets). I want its baseline score to be 24% and drop to 5% if both 'Linguistic Dialect Shift' and 'Target Focus Lock' optimizations are checked. Update `src/app/workspace/page.tsx` accordingly."*

---

## 5. Development & Deployment Procedures

### Running Local Development Server
1.  Ensure you have Node.js (v18+) installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch Turbopack dev server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Creating a Production Build
To validate that the project compiles with zero static rendering, syntax, or type errors:
```bash
npm run build
```
This produces a fully compiled, static-optimized production bundle in the `.next` directory.

### Deploying
This project is pre-configured for instant serverless deployments:
*   **Vercel**: Run `npx vercel` in the root folder to deploy directly.
*   **Netlify**: Import the repository and build using `npm run build` with build directory `.next`.
