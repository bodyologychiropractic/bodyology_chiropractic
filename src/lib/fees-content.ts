import type { Fee } from "@/types";

export const FEES_INTRO =
  "At Bodyology Chiropractic, appointment length and treatment are selected according to your individual presentation and clinical needs. Treatment techniques are used where clinically appropriate.";

export const FEES: Fee[] = [
  {
    id: "initial",
    name: "Initial Chiropractic Consultation",
    price: "$135",
    paragraphs: [
      "A comprehensive consultation including history, assessment, examination and discussion of your clinical findings. Treatment may be provided where appropriate.",
    ],
  },
  {
    id: "standard",
    name: "Standard Chiropractic Consultation",
    price: "$85",
    duration: "15–20 minutes",
    paragraphs: [
      "A focused follow-up consultation for patients who do not require an extended treatment session.",
      "Care will primarily involve chiropractic treatment and may include joint adjustment and/or joint mobilisation, depending on your individual needs and clinical findings.",
    ],
  },
  {
    id: "extended",
    name: "Extended Chiropractic Consultation",
    price: "$135",
    duration: "30 minutes",
    paragraphs: ["For presentations requiring additional hands-on treatment time."],
    itemsLabel: "Care may incorporate:",
    items: [
      "Chiropractic adjustments",
      "Joint mobilisation",
      "Soft tissue therapy",
      "Dry needling",
      "Movement assessment",
      "Tailored rehabilitation advice and prescribed home exercises",
    ],
    note: "Treatment is selected according to your presentation and clinical needs.",
  },
  {
    id: "comprehensive",
    name: "Comprehensive Chiropractic Consultation",
    price: "$165",
    duration: "40 minutes",
    paragraphs: [
      "Designed for more involved presentations or patients requiring additional assessment and treatment time.",
    ],
    itemsLabel: "Your consultation may incorporate:",
    items: [
      "Chiropractic adjustments",
      "Joint mobilisation",
      "Soft tissue therapy",
      "Dry needling",
      "Electro-dry needling",
      "Fascial techniques where appropriate",
      "Movement and functional assessment",
      "Tailored, prescribed home exercises",
    ],
    note: "Your treatment plan is individualised rather than based on a predetermined combination of techniques.",
  },
  {
    id: "fascial-manipulation",
    name: "Fascial Manipulation® Consultation",
    price: "$155",
    duration: "40 minutes",
    paragraphs: [
      "A longer consultation focused on assessing and treating clinically relevant fascial restrictions that may be associated with altered movement or musculoskeletal symptoms.",
      "This may be particularly relevant where there is a history of previous injury, repetitive strain or periods of immobilisation.",
    ],
  },
  {
    id: "reassessment",
    name: "Progress Reassessment",
    price: "Included at no additional charge when clinically indicated",
    duration: "15 minutes",
    paragraphs: [
      "Periodic reassessment may be incorporated into your care to review progress, movement, function and treatment goals.",
      "Treatment is not included during a standalone reassessment appointment.",
    ],
  },
];
