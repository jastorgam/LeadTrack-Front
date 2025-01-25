export interface UpdateProspect {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
  position: string;
  phones: Phone[];
  emails: Email[];
  socialNetworks: SocialNetwork[];
  company: Company;
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

export interface Phone {
  phoneNumber: string;
  type: string;
  valid: boolean;
}

export interface SocialNetwork {
  type: string;
  url: string;
}
