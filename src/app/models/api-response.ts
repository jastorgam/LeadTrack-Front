export interface LoginResponse {
  token: string;
  role: string;
  userName: null;
}

export interface Prospect {
  fullName: string;
  id: string;
  name: string;
  lastName: string;
  position: string;
  phones: Phone[];
  emails: Email[];
  socialNetworks: SocialNetwork[];
  company: Company;
  lastInteraction: LastInteraction;
  status: boolean;
}

export interface Company {
  id: string;
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

export interface LastInteraction {
  id: string;
  prospectId: string;
  userName: null;
  type: string;
  notes: string;
  answer: boolean;
  date: Date;
}

export interface Phone {
  phoneNumber: string;
  type: string;
  valid: boolean;
}

export interface SocialNetwork {
  type: string;
  url: string;
}
