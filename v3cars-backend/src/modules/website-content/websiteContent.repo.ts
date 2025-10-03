import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type {
  WebsiteContentListQuery,
  WebsiteContentGeneric,
  WebsiteContentInsurance,
  WebsiteContentAuthor,
} from './websiteContent.types.js';

/* ---------- Generic (tblwebsitecontent2) ---------- */

function buildWC2Where(q: WebsiteContentListQuery): Prisma.tblwebsitecontent2WhereInput {
  const where: Prisma.tblwebsitecontent2WhereInput = { moduleId: q.moduleId };
  if (q.q) {
    where.OR = [{ title: { contains: q.q } }, { description: { contains: q.q } }];
  }
  return where;
}

function buildWC2Order(sortBy?: WebsiteContentListQuery['sortBy']): Prisma.tblwebsitecontent2OrderByWithRelationInput[] {
  switch (sortBy) {
    case 'title_asc':  return [{ title: 'asc' }, { id: 'asc' }];
    case 'title_desc': return [{ title: 'desc' }, { id: 'desc' }];
    case 'id_asc':     return [{ id: 'asc' }];
    case 'id_desc':    return [{ id: 'desc' }];
    case 'latest':
    default:           return [{ createdAt: 'desc' }, { id: 'desc' }];
  }
}


const wc2Select = {
  id: true,
  moduleId: true,
  title: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.tblwebsitecontent2Select;

/* ---------- Insurance (tblcarinsurancecontent) ---------- */

function buildInsuranceWhere(q: WebsiteContentListQuery): Prisma.tblcarinsurancecontentWhereInput {
  const where: Prisma.tblcarinsurancecontentWhereInput = {};
  if (q.q) {
    where.OR = [
      { carInsuranceHeading: { contains: q.q } },
      { carInsuranceContent: { contains: q.q } },
      { section1Heading: { contains: q.q } }, { section1Desc: { contains: q.q } },
      { section2Heading: { contains: q.q } }, { section2Desc: { contains: q.q } },
      { section3Heading: { contains: q.q } }, { section3Desc: { contains: q.q } },
      { section4Heading: { contains: q.q } }, { section4Desc: { contains: q.q } },
      { section5Heading: { contains: q.q } }, { section5Desc: { contains: q.q } },
      { section6Heading: { contains: q.q } },
      { section6SubDesc1: { contains: q.q } }, { section6SubDesc2: { contains: q.q } }, { section6SubDesc3: { contains: q.q } },
      { section7Heading: { contains: q.q } }, { section7Desc: { contains: q.q } },
      { section8Heading: { contains: q.q } }, { section8Desc: { contains: q.q } },
      { section9Heading: { contains: q.q } }, { section9Desc: { contains: q.q } },
      { section10heading: { contains: q.q } }, { section10Desc: { contains: q.q } },
    ];
  }

  return where;
}

const insuranceSelect = {
  uId: true,
  carInsuranceHeading: true,
  carInsuranceContent: true,
  section1Heading: true, section1Desc: true,
  section2Heading: true, section2Desc: true,
  section3Heading: true, section3Desc: true,
  section4Heading: true, section4Desc: true,
  section5Heading: true, section5Desc: true,
  section6Heading: true, section6SubDesc1: true, section6SubDesc2: true, section6SubDesc3: true,
  section7Heading: true, section7Desc: true,
  section8Heading: true, section8Desc: true,
  section9Heading: true, section9Desc: true,
  section10heading: true, section10Desc: true,
} as const;


/* ---------- Authors (tblauthor) for moduleId=6 ---------- */


function buildAuthorsWhere(q: WebsiteContentListQuery): Prisma.tblauthorWhereInput {
  const where: Prisma.tblauthorWhereInput = { status: 1 }; // active authors
  if (q.q) {
    where.OR = [
      { name: { contains: q.q } },
      { designation: { contains: q.q } },
      { url_slug: { contains: q.q } },
      { authorBio: { contains: q.q } },
    ];
  }
  return where;
}


const authorsSelect = {
  id: true,
  name: true,
  designation: true,
  url_slug: true,
  imageUrl: true,
  backgroundImageUrl: true,
  authorBio: true,
  facebookURL: true,
  twitterURL: true,
  instaURL: true,
  linkedInURL: true,
  addedDateTime: true,
  status: true,
  imageAltText: true,
} satisfies Prisma.tblauthorSelect;


export class WebsiteContentRepo {

  /** List */
  async list(q: WebsiteContentListQuery) {
    const take = Math.max(1, Math.min(q.limit ?? 50, 100));
    const skip = Math.max(0, ((q.page ?? 1) - 1) * take);

    // SPECIAL: Insurance (moduleId=5)
    if (q.moduleId === 5) {
      const where = buildInsuranceWhere(q);
      const [rows, total] = await Promise.all([
        prisma.tblcarinsurancecontent.findMany({
          where, skip, take,
          orderBy: [{ uId: 'desc' }],
          select: insuranceSelect,
        }),
        prisma.tblcarinsurancecontent.count({ where }),
      ]);

      const mapped: WebsiteContentInsurance[] = rows.map(r => ({
        moduleId: 5,
        ...r,
      }));

      return {
        rows: mapped,
        total,
        page: q.page ?? 1,
        pageSize: take,
        totalPages: Math.max(1, Math.ceil(total / take)),
      };
    }

    // SPECIAL: Authors (moduleId=6)
    if (q.moduleId === 6) {
      const where = buildAuthorsWhere(q);
      const [rows, total] = await Promise.all([
        prisma.tblauthor.findMany({
          where, skip, take,
          orderBy: [{ addedDateTime: 'desc' }, { id: 'desc' }],
          select: authorsSelect,
        }),
        prisma.tblauthor.count({ where }),
      ]);

      const mapped: WebsiteContentAuthor[] = rows.map(r => ({
        moduleId: 6,
        ...r,
        addedDateTime: r.addedDateTime.toISOString(),
      }));

      return {
        rows: mapped,
        total,
        page: q.page ?? 1,
        pageSize: take,
        totalPages: Math.max(1, Math.ceil(total / take)),
      };
    }

    // DEFAULT: websitecontent2 (generic)
    const where = buildWC2Where(q);
    const orderBy = buildWC2Order(q.sortBy);
    const [rows, total] = await Promise.all([
      prisma.tblwebsitecontent2.findMany({ where, orderBy, skip, take, select: wc2Select }),
      prisma.tblwebsitecontent2.count({ where }),
    ]);

    const mapped: WebsiteContentGeneric[] = rows.map(r => ({
      id: r.id,
      moduleId: r.moduleId,
      title: r.title,
      description: r.description,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));

    return {
      rows: mapped,
      total,
      page: q.page ?? 1,
      pageSize: take,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };
  }

  /** Detail by id */
  async getById(id: number, moduleId?: number) {
    if (moduleId === 5) {
      const row = await prisma.tblcarinsurancecontent.findFirst({
        where: { uId: id },
        select: insuranceSelect,
      });
      if (!row) return null;
      const out: WebsiteContentInsurance = { moduleId: 5, ...row };
      return out;
    }

    if (moduleId === 6) {
      const r = await prisma.tblauthor.findFirst({
        where: { id },
        select: authorsSelect,
      });
      if (!r) return null;
      const out: WebsiteContentAuthor = {
        moduleId: 6,
        ...r,
        addedDateTime: r.addedDateTime.toISOString(),
      };
      return out;
    }

    const r = await prisma.tblwebsitecontent2.findFirst({
      where: { id },
      select: wc2Select,
    });
    if (!r) return null;
    const out: WebsiteContentGeneric = {
      id: r.id,
      moduleId: r.moduleId,
      title: r.title,
      description: r.description,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    };
    return out;
  }

  /** Latest by module */
  async getLatestByModule(moduleId: number) {
    if (moduleId === 5) {
      const r = await prisma.tblcarinsurancecontent.findFirst({
        where: {},
        orderBy: [{ uId: 'desc' }],
        select: insuranceSelect,
      });
      return r ? ({ moduleId: 5, ...r } as WebsiteContentInsurance) : null;
    }

    if (moduleId === 6) {
      const r = await prisma.tblauthor.findFirst({
        where: { status: 1 },
        orderBy: [{ addedDateTime: 'desc' }, { id: 'desc' }],
        select: authorsSelect,
      });
      return r
        ? ({
            moduleId: 6,
            ...r,
            addedDateTime: r.addedDateTime.toISOString(),
          } as WebsiteContentAuthor)
        : null;
    }

    const r = await prisma.tblwebsitecontent2.findFirst({
      where: { moduleId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      select: wc2Select,
    });
    return r
      ? ({
          id: r.id,
          moduleId: r.moduleId,
          title: r.title,
          description: r.description,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        } as WebsiteContentGeneric)
      : null;
  }


}
