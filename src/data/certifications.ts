export type CertificationCategory = "Development" | "AI/ML" | "Cloud" | "Tools";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuerMark: string;
  category: CertificationCategory;
  completedAt: string;
  skills: string[];
  /** Local image path, e.g. /images/certificates/react-certificate.webp */
  previewImage?: string;
  /** Public verification URL supplied by the issuing platform. */
  credentialUrl?: string;
  credentialId?: string;
};

/**
 * Add only certificates you have genuinely completed.
 * Put certificate images in public/images/certificates/ and reference them
 * with a path beginning `/images/certificates/`.
 */
export const certifications: Certification[] = [
  // Example structure — uncomment and replace with a real credential:
  // {
  //   id: "credential-slug",
  //   title: "Your certificate title",
  //   issuer: "Issuing organization",
  //   issuerMark: "ORG",
  //   category: "Development",
  //   completedAt: "Month YYYY",
  //   skills: ["React", "JavaScript", "Frontend"],
  //   previewImage: "/images/certificates/your-certificate.webp",
  //   credentialUrl: "https://official-verification-link.example",
  //   credentialId: "YOUR-CREDENTIAL-ID",
  // },
];
