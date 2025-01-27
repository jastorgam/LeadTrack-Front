export interface Prospect {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
  position: string;
  phones: Phones[];
  emails: Email[];
  socialNetworks: SocialNetwork[];
  interactions: Interaction[];
  lastInteraction: Interaction | null;
  company: Company;
  status: boolean;
  dateModify: Date;
  userModify: string;
}

export interface Company {
  name: string;
  address: string;
  domain: string;
  size: string;
  type: string;
  description: string;
}

export interface Email {
  address: string;
  type: string;
  valid: boolean;
}

export interface Phones {
  phoneNumber: string;
  type: string;
  valid: boolean;
}

export interface SocialNetwork {
  type: string;
  url: string;
}

export interface Interaction {
  prospectId: string;
  userName: string;
  type: string;
  notes: string;
  answer: boolean;
  date: Date;
}
