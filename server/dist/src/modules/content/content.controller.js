import { ContentService } from './content.service.js';
import { typeFromParam } from './content.constants.js';
import { limitDto, latestDto } from './content.dto.js';
import { prisma } from '../../lib/prisma.js';
const svc = new ContentService();
export class ContentController {
    // helper: resolve model ":model" as numeric id or slug
    async resolveModelId(modelParam) {
        if (!modelParam)
            return null;
        if (/^\d+$/.test(modelParam))
            return Number(modelParam);
        const row = await prisma.tblmodels.findFirst({
            where: { modelSlug: modelParam },
            select: { modelId: true },
        });
        return row?.modelId ?? null;
    }
    async today(req, res) {
        const type = typeFromParam(req.params.type);
        const q = { fuelType: req.query.fuelType?.trim() || undefined };
        const data = await svc.today(type, q);
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
    async latest(req, res) {
        const type = typeFromParam(req.params.type);
        const q = latestDto.parse(req.query);
        const fuelType = req.query.fuelType?.trim() || undefined;
        const rows = await svc.latest(type, { ...q, fuelType });
        res.json({ success: true, rows });
    }
    async trending(req, res) {
        const type = typeFromParam(req.params.type);
        const q = limitDto.parse(req.query);
        const fuelType = req.query.fuelType?.trim() || undefined;
        const rows = await svc.trending(type, { ...q, fuelType });
        res.json({ success: true, rows });
    }
    async top(req, res) {
        const type = typeFromParam(req.params.type);
        const q = limitDto.parse(req.query);
        const fuelType = req.query.fuelType?.trim() || undefined;
        const rows = await svc.top(type, { ...q, fuelType });
        res.json({ success: true, rows });
    }
    async popular(req, res) {
        const type = typeFromParam(req.params.type);
        const q = limitDto.parse(req.query);
        const fuelType = req.query.fuelType?.trim() || undefined;
        const rows = await svc.popular(type, { ...q, fuelType });
        res.json({ success: true, rows });
    }
    // -------- By model (ID or slug) --------
    async todayByModel(req, res) {
        const type = typeFromParam(req.params.type);
        const modelKey = req.params.model;
        const modelId = await this.resolveModelId(modelKey);
        if (!modelId)
            return res.status(400).json({ success: false, message: 'Invalid model (id/slug)' });
        const data = await svc.todayForModel(type, modelId);
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
    async latestByModel(req, res) {
        const type = typeFromParam(req.params.type);
        const modelKey = req.params.model;
        const modelId = await this.resolveModelId(modelKey);
        if (!modelId)
            return res.status(400).json({ success: false, message: 'Invalid model (id/slug)' });
        const q = latestDto.parse(req.query);
        const rows = await svc.latestForModel(type, modelId, q);
        res.json({ success: true, rows });
    }
    async trendingByModel(req, res) {
        const type = typeFromParam(req.params.type);
        const modelKey = req.params.model;
        const modelId = await this.resolveModelId(modelKey);
        if (!modelId)
            return res.status(400).json({ success: false, message: 'Invalid model (id/slug)' });
        const q = limitDto.parse(req.query);
        const rows = await svc.trendingForModel(type, modelId, q);
        res.json({ success: true, rows });
    }
    async topByModel(req, res) {
        const type = typeFromParam(req.params.type);
        const modelKey = req.params.model;
        const modelId = await this.resolveModelId(modelKey);
        if (!modelId)
            return res.status(400).json({ success: false, message: 'Invalid model (id/slug)' });
        const q = limitDto.parse(req.query);
        const rows = await svc.topForModel(type, modelId, q);
        res.json({ success: true, rows });
    }
    async popularByModel(req, res) {
        const type = typeFromParam(req.params.type);
        const modelKey = req.params.model;
        const modelId = await this.resolveModelId(modelKey);
        if (!modelId)
            return res.status(400).json({ success: false, message: 'Invalid model (id/slug)' });
        const q = limitDto.parse(req.query);
        const rows = await svc.popularForModel(type, modelId, q);
        res.json({ success: true, rows });
    }
}
