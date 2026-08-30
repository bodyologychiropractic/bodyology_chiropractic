import type { Service, ServiceDetailSection } from "@/types";

const PHOTO_WIDTHS = [400, 640, 940];

function servicePhoto(name: string, widths: number[] = PHOTO_WIDTHS): Service["image"] {
  return { base: `/images/services/${name}`, ext: "webp", widths };
}

function detailSections(
  whatItIs: string,
  howItWorks: string,
  howItHelps: string,
): ServiceDetailSection[] {
  return [
    { label: "What it is", body: whatItIs },
    { label: "How it works in the body", body: howItWorks },
    { label: "How it may help", body: howItHelps },
  ];
}

export const SERVICES: Service[] = [
  {
    slug: "chiropractic-adjustments",
    title: "Chiropractic Adjustment",
    description:
      "Controlled, targeted movement applied to a joint to restore mobility and ease stiffness.",
    icon: "spine",
    // Landscape source, so the 4:5 crop stops at 752px rather than 940px.
    image: servicePhoto("chiropractic-adjustment", [400, 640, 752]),
    detail: {
      sections: detailSections(
        "A chiropractic adjustment is a controlled, targeted movement applied to a joint of the spine or another area of the body.",
        "The adjustment briefly moves the joint through a specific range, helping restore movement in areas that are stiff or restricted. It also provides sensory input to the nervous system through the receptors located in and around the joint.",
        "It may help improve joint mobility, reduce stiffness and make everyday movement feel easier and more comfortable.",
      ),
    },
  },
  {
    slug: "soft-tissue-therapy",
    title: "Soft Tissue Therapy",
    description:
      "Hands-on techniques for muscles and connective tissue to release tension and restore movement.",
    icon: "hands",
    image: servicePhoto("soft-tissue-work"),
    detail: {
      sections: detailSections(
        "Soft tissue therapy uses hands-on techniques to work on muscles and surrounding connective tissues.",
        "Pressure, stretching and manual techniques are applied to areas of muscle tension or reduced tissue mobility. This can influence muscle tone, local circulation and the way the nervous system responds to tension and discomfort.",
        "It may help reduce muscle tightness and tenderness, improve flexibility and allow the body to move more comfortably.",
      ),
    },
  },
  {
    slug: "dry-needling",
    title: "Dry Needling",
    description:
      "Very fine, sterile needles placed into selected muscles to ease tightness and tenderness.",
    icon: "needle",
    image: servicePhoto("dry-needling"),
    detail: {
      sections: detailSections(
        "Dry needling involves inserting very fine, sterile needles into selected muscles or soft tissues.",
        "The needle provides a local mechanical stimulus to the muscle and surrounding tissue. In some areas it may produce a brief twitch response and can influence muscle activity and the way pain signals are processed by the nervous system.",
        "It may help reduce muscular tightness and tenderness and improve movement where muscle tension is contributing to discomfort or restriction.",
      ),
    },
  },
  {
    slug: "electro-dry-needling",
    title: "Electro Dry Needling",
    description:
      "Dry needling paired with a gentle electrical current for repeated, rhythmic stimulation.",
    icon: "needle",
    image: servicePhoto("electro-dry-needling"),
    detail: {
      sections: detailSections(
        "Electro dry needling combines dry needling with a gentle electrical current applied through the needles.",
        "The electrical current provides repeated stimulation to the local muscles and nerves. This creates a controlled rhythmic response and may influence muscle activity and pain signalling within the nervous system.",
        "It may help decrease muscle tension, reduce pain sensitivity and improve comfort and movement in selected musculoskeletal conditions.",
      ),
    },
  },
  {
    slug: "fascial-manipulation",
    title: "Fascial Manipulation",
    description:
      "Focused friction on fascia to restore the glide between layers of connective tissue.",
    icon: "fascia",
    image: servicePhoto("fascial-manipulation"),
    detail: {
      sections: detailSections(
        "Fascial manipulation is a hands-on treatment that focuses on fascia — the connective tissue that surrounds and links muscles and other structures throughout the body.",
        "Specific areas of altered fascial mobility are assessed and treated with focused friction. The friction generates local heat and mechanical stimulation, which may help improve the sliding and gliding between layers of connective tissue.",
        "Improved fascial mobility may reduce feelings of stiffness or restriction and allow muscles and joints to move more freely and efficiently.",
      ),
    },
  },
  {
    slug: "rehabilitation",
    title: "Rehabilitation & Exercise Therapy",
    description:
      "Individualised exercise programs that build strength, control and confidence in movement.",
    icon: "rehab",
    image: servicePhoto("rehabilitation"),
    detail: {
      sections: detailSections(
        "Rehabilitation uses individualised exercises designed around the patient's assessment, physical capacity and goals.",
        "Repeated movement and progressive loading encourage the muscles, joints and nervous system to adapt. Over time, this can improve strength, coordination, endurance, mobility and control.",
        "Rehabilitation can make everyday activities easier, improve confidence in movement and help patients build the physical capacity needed for work, sport and daily activities.",
      ),
    },
  },
];

export function findService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
