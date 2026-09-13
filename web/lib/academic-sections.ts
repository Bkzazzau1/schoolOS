export type AcademicSectionStage = "Nursery" | "Primary" | "Secondary" | "Custom";

export type AcademicSection = {
  id: string;
  name: string;
  stage: AcademicSectionStage;
  campus: string;
  leaderTitle: string;
  leaderName: string;
  editableByActiveUser: boolean;
  classes: string[];
};

export const academicSections: AcademicSection[] = [
  {
    id: "nursery",
    name: "Nursery / Early Years",
    stage: "Nursery",
    campus: "Kaduna Campus",
    leaderTitle: "Head Teacher",
    leaderName: "Mrs. Mary Daniel",
    editableByActiveUser: false,
    classes: ["Nursery 1", "Nursery 2", "Reception A"],
  },
  {
    id: "primary",
    name: "Primary School",
    stage: "Primary",
    campus: "Kaduna Campus",
    leaderTitle: "Headmistress",
    leaderName: "Mrs. Hauwa Sule",
    editableByActiveUser: false,
    classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
  },
  {
    id: "secondary",
    name: "Secondary School",
    stage: "Secondary",
    campus: "Kaduna Campus",
    leaderTitle: "Principal",
    leaderName: "Mr. Ibrahim Danladi",
    editableByActiveUser: true,
    classes: ["JSS 1A", "JSS 2A", "JSS 2B", "JSS 3A", "SS 1A", "SS 2A"],
  },
];

export const activeLeadershipScope = academicSections.find((section) => section.id === "secondary")!;
