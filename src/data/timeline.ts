// Logic-analyzer timeline on the home page. Times are decimal years (2021.5 ≈ July 2021).
const ym = (y: number, m: number) => y + (m - 1) / 12;

export type Segment = { a: number; b: number; t: string; when: string; open?: boolean; tiny?: boolean; end?: boolean };
export type TimelineRow = { label: string; color: string; segs: Segment[] };

const today = new Date();
export const NOW = today.getFullYear() + today.getMonth() / 12 + 0.07;

export const TIMELINE: { from: number; to: number; rows: TimelineRow[] } = {
  from: 2017,
  to: Math.max(2027.2, Math.ceil(NOW) + 0.2),
  rows: [
    {
      label: "Education",
      color: "var(--ch4)",
      segs: [
        { a: 2017, b: 2021.99, t: "B.Eng. Computer Eng. · Azad University", when: "2017 – 2021" },
        { a: 2023, b: NOW, t: "M.Sc. Telecom Eng. · Politecnico di Milano", when: "2023 – now", open: true },
      ],
    },
    {
      label: "Industry",
      color: "var(--ch1)",
      segs: [
        { a: ym(2021, 7), b: ym(2021, 9), t: "DataCoLab · Data Scientist Intern", when: "Jul – Aug 2021", tiny: true },
        { a: ym(2022, 6), b: ym(2023, 8), t: "Seagull Cybernetics · Software Developer", when: "Jun 2022 – Jul 2023" },
      ],
    },
    {
      label: "Research",
      color: "var(--ch3)",
      segs: [
        { a: ym(2020, 9), b: ym(2021, 8), t: "Research Assistant · SVM + Bat", when: "Sep 2020 – Jul 2021" },
        { a: ym(2026, 9), b: ym(2026, 10), t: "NanoCom '26 · Best Paper", when: "Sep 2026", tiny: true, end: true },
      ],
    },
    {
      label: "Projects",
      color: "var(--ch2)",
      segs: [
        { a: 2024, b: 2024.95, t: "LDPC · non-Gaussian noise", when: "2024" },
        { a: 2025, b: 2025.95, t: "ODU assignment", when: "2025" },
      ],
    },
  ],
};
