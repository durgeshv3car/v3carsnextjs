import { prisma } from '../../lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type { FaqsListQuery } from './faqs.types.js';

function buildFaqWhere(q: FaqsListQuery): Prisma.tblfaqsWhereInput {
  const where: Prisma.tblfaqsWhereInput = {
    moduleId: q.moduleId,
  };
  if (q.q) {
    where.OR = [
      { que: { contains: q.q } },
      { ans: { contains: q.q } },
    ];
  }
  return where;
}

function buildFaqOrder(sortBy?: FaqsListQuery['sortBy']): Prisma.tblfaqsOrderByWithRelationInput[] {
  switch (sortBy) {
    case 'latest':  return [{ updateDateTime: 'desc' }, { id: 'desc' }];
    case 'id_asc':  return [{ id: 'asc' }];
    case 'id_desc': return [{ id: 'desc' }];
    case 'sequence_asc':
    default:        return [{ sequance: 'asc' }, { id: 'asc' }];
  }
}

const faqSelect = {
  id: true,
  moduleId: true,
  que: true,
  ans: true,
  sequance: true,          // NOTE: follows DB spelling
  addedBy: true,
  updatedBy: true,
  careateDateTime: true,   // NOTE: follows DB spelling
  updateDateTime: true,
} satisfies Prisma.tblfaqsSelect;

export class FaqsRepo {
  async list(q: FaqsListQuery) {
    const take = Math.max(1, Math.min(q.limit ?? 50, 100));
    const skip = Math.max(0, ((q.page ?? 1) - 1) * take);

    const where = buildFaqWhere(q);
    const orderBy = buildFaqOrder(q.sortBy);

    const [rows, total] = await Promise.all([
      prisma.tblfaqs.findMany({ where, orderBy, skip, take, select: faqSelect }),
      prisma.tblfaqs.count({ where }),
    ]);

    return {
      rows,
      total,
      page: q.page ?? 1,
      pageSize: take,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };
  }

  async getById(id: number) {
    return prisma.tblfaqs.findFirst({ where: { id }, select: faqSelect });
  }

  // --------- modules (for listing/selectors) ----------

  async listModules(opts: { q?: string; page?: number; limit?: number }) {
    const take = Math.max(1, Math.min(opts.limit ?? 50, 100));
    const skip = Math.max(0, ((opts.page ?? 1) - 1) * take);

    const where: Prisma.tblmodulesWhereInput = {};
    if (opts.q) where.name = { contains: opts.q };

    const [rows, total] = await Promise.all([
      prisma.tblmodules.findMany({
        where, skip, take,
        orderBy: [{ name: 'asc' }, { id: 'asc' }],
        select: { id: true, name: true, createdAt: true },
      }),
      prisma.tblmodules.count({ where }),
    ]);

    return {
      rows,
      total,
      page: opts.page ?? 1,
      pageSize: take,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };
  }

  async getModuleById(id: number) {
    return prisma.tblmodules.findFirst({
      where: { id },
      select: { id: true, name: true, createdAt: true },
    });
  }
}
