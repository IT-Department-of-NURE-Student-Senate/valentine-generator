interface StepperData {
  text: string;
  to: string;
  from: string;
  template: string;
}

interface Valentine extends StepperData {
  id: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SocialLink {
  icon: string;
  link: string;
}

export type { SocialLink, StepperData, Valentine };
