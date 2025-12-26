import { VideosService } from './videos.service.js';
import { limitDto, latestDto } from './videos.dto.js';
import { videoTypeFromParam } from './videos.constants.js';
import { prisma } from '../../lib/prisma.js';
const svc = new VideosService();
export class VideosController {
    // -------- helpers --------
    async resolveModelId(idOrSlug) {
        if (!idOrSlug)
            return null;
        if (/^\d+$/.test(idOrSlug))
            return Number(idOrSlug);
        const row = await prisma.tblmodels.findFirst({
            where: { modelSlug: idOrSlug },
            select: { modelId: true },
        });
        return row?.modelId ?? null;
    }
    // -------- global/type-scoped (unchanged) --------
    async latestGlobal(req, res) {
        const q = latestDto.parse(req.query);
        const rows = await svc.latestGlobal({ limit: q.limit, excludeToday: q.excludeToday });
        res.json({ success: true, rows });
    }
    async popularGlobal(req, res) {
        const q = limitDto.parse(req.query);
        const rows = await svc.popularGlobal({ limit: q.limit });
        res.json({ success: true, rows });
    }
    async today(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const data = await svc.today(type);
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
    async latest(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const q = latestDto.parse(req.query);
        const rows = await svc.latest(type, { limit: q.limit, excludeToday: q.excludeToday });
        res.json({ success: true, rows });
    }
    async trending(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const q = limitDto.parse(req.query);
        const rows = await svc.trending(type, { limit: q.limit });
        res.json({ success: true, rows });
    }
    async top(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const q = limitDto.parse(req.query);
        const rows = await svc.top(type, { limit: q.limit });
        res.json({ success: true, rows });
    }
    // -------- model-scoped (ID or SLUG) --------
    async modelToday(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const id = await this.resolveModelId(req.params.modelIdOrSlug);
        if (!id)
            return res.status(404).json({ success: false, message: 'Model not found' });
        const data = await svc.todayByModel(type, id);
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
    async modelLatest(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const id = await this.resolveModelId(req.params.modelIdOrSlug);
        if (!id)
            return res.status(404).json({ success: false, message: 'Model not found' });
        const q = latestDto.parse(req.query);
        const rows = await svc.latestByModel(type, id, { limit: q.limit, excludeToday: q.excludeToday });
        res.json({ success: true, rows });
    }
    async modelTrending(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const id = await this.resolveModelId(req.params.modelIdOrSlug);
        if (!id)
            return res.status(404).json({ success: false, message: 'Model not found' });
        const q = limitDto.parse(req.query);
        const rows = await svc.trendingByModel(type, id, { limit: q.limit });
        res.json({ success: true, rows });
    }
    async modelTop(req, res) {
        const type = videoTypeFromParam(req.params.type);
        const id = await this.resolveModelId(req.params.modelIdOrSlug);
        if (!id)
            return res.status(404).json({ success: false, message: 'Model not found' });
        const q = limitDto.parse(req.query);
        const rows = await svc.topByModel(type, id, { limit: q.limit });
        res.json({ success: true, rows });
    }
    async modelPopular(req, res) {
        const id = await this.resolveModelId(req.params.modelIdOrSlug);
        if (!id)
            return res.status(404).json({ success: false, message: 'Model not found' });
        const q = limitDto.parse(req.query);
        const rows = await svc.popularByModel(id, { limit: q.limit });
        res.json({ success: true, rows });
    }
}
