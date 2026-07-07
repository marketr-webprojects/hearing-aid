// Client-safe team-member type + in-code defaults.
export type TeamMember = {
  name: string;
  title: string;
  img: string;
  creds: string[];
  funFact: string;
};

export const DEFAULT_TEAM: TeamMember[] = [
  {
    img: "/assets/team/JeloGibas.webp",
    name: "Jelo Gibas",
    title: "Lead Audiologist",
    creds: [
      "Registered Nurse",
      "Certified Newborn Hearing Screening Personnel",
      "Graduate of Master in Clinical Audiology from University of Santo Tomas, Manila",
      "Holder of Diploma in Pediatric Audiology from School of Advanced Education, Research and Accreditation, Spain",
      "Graduate of Bachelor of Science in Nursing from Far Eastern University, Manila",
    ],
    funFact: "Unflappable",
  },
  {
    img: "/assets/team/RicaRoxas.webp",
    name: "Rica Roxas",
    title: "Audiometrist (Tanay)",
    creds: [
      "Certified Newborn Hearing Screening Personnel",
      "With special training in Practical Home Behavior Management for Children with Special Needs and Identifying Red Flags of Developmental Delay",
      "Certificate in Medical Office Administration",
      "Certificate in Occupational First Aid Training and BLS CPR w/ AED",
    ],
    funFact: "Animal Lover",
  },
  {
    img: "/assets/team/HannahPason.webp",
    name: "Hannah Pason",
    title: "Audiometrist (Cebu)",
    creds: [
      "With special training in Practical Home Behavior Management for Children with Special Needs and Identifying Red Flags of Developmental Delay",
      "Certificate in Medical Office Administration",
      "Certificate in Occupational First Aid Training and BLS CPR w/ AED",
    ],
    funFact: "Jokester",
  },
  {
    img: "/assets/team/JahEstoque.webp",
    name: "Jah Estoque",
    title: "Audiometrist (La Union)",
    creds: [
      "Registered Midwife",
      "With special training in Practical Home Behavior Management for Children with Special Needs",
      "Certificate in Medical Office Administration",
    ],
    funFact: "Comical",
  },
];
