export type WebsiteContentSort =
  | 'latest'
  | 'id_asc'
  | 'id_desc'
  | 'title_asc'
  | 'title_desc';

export interface WebsiteContentListQuery {
  moduleId: number;       // required
  q?: string;             // search
  page?: number;          // default 1
  limit?: number;         // default 50 (cap 100)
  sortBy?: WebsiteContentSort;
}

/** Generic row (tblwebsitecontent2) */
export interface WebsiteContentGeneric {
  id: number;
  moduleId: number; // != 5 && != 6
  title: string | null;
  description: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/** Insurance row (tblcarinsurancecontent) — FULL column-wise */
export interface WebsiteContentInsurance {
  uId: number;
  moduleId: 5;
  carInsuranceHeading: string | null;
  carInsuranceContent: string | null;
  section1Heading: string | null; section1Desc: string | null;
  section2Heading: string | null; section2Desc: string | null;
  section3Heading: string | null; section3Desc: string | null;
  section4Heading: string | null; section4Desc: string | null;
  section5Heading: string | null; section5Desc: string | null;
  section6Heading: string | null;
  section6SubDesc1: string | null;
  section6SubDesc2: string | null;
  section6SubDesc3: string | null;
  section7Heading: string | null; section7Desc: string | null;
  section8Heading: string | null; section8Desc: string | null;
  section9Heading: string | null; section9Desc: string | null;
  section10heading: string | null; section10Desc: string | null;
}

/** Authors row (tblauthor) — FULL column-wise */
export interface WebsiteContentAuthor {
  moduleId: 6;
  id: number;
  name: string;
  designation: string | null;
  url_slug: string | null;
  imageUrl: string;
  backgroundImageUrl: string;
  authorBio: string;
  facebookURL: string | null;
  twitterURL: string | null;
  instaURL: string | null;
  linkedInURL: string | null;
  addedDateTime: string; // ISO
  status: number | null;
  imageAltText: string | null;
}

export type WebsiteContentRow =
  | WebsiteContentGeneric
  | WebsiteContentInsurance
  | WebsiteContentAuthor;
