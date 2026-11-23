export type CertificationCategory = "Development" | "AI/ML" | "Cloud" | "Tools";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issuerMark: string;
  category: CertificationCategory;
  completedAt: string;
  skills: string[];
  credentialUrl?: string;
  credentialId?: string;
};

/**
 * Add your real certificates here. Keep this array empty until you have
 * the certificate details and (where available) a genuine verification URL.
 * Do not add illustrative/sample credentials as real qualifications.
 */
export const certifications: Certification[] = [
  // Example structure — duplicate and fill with your real details:
  // {
  //   id: "credential-slug",
  //   title: "Certificate title",
  //   issuer: "Issuing organization",
  //   issuerMark: "ORG",
  //   category: "Development",
  //   completedAt: "Month YYYY",
  //   skills: ["React", "JavaScript", "Frontend"],
  //   credentialUrl: "https://...",
  //   credentialId: "...",
  // },
];
