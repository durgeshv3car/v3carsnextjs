import { WebsiteContentService } from './websiteContent.service.js';
import { idParamDto, listQueryDto, moduleIdParamDto } from './websiteContent.dto.js';
const svc = new WebsiteContentService();
export class WebsiteContentController {
    async list(req, res) {
        const q = listQueryDto.parse(req.query);
        const data = await svc.list(q);
        res.json({ success: true, ...data });
    }
    async getById(req, res) {
        const parsed = idParamDto.safeParse(req.params);
        if (!parsed.success) {
            return res.status(400).json({ success: false, message: 'Invalid content id', issues: parsed.error.issues });
        }
        const moduleId = req.query.moduleId ? Number(req.query.moduleId) : undefined;
        const row = await svc.getById(parsed.data.id, Number.isFinite(moduleId) ? moduleId : undefined);
        if (!row)
            return res.status(404).json({ success: false, message: 'Content not found' });
        res.json({ success: true, data: row });
    }
    async latestByModule(req, res) {
        const parsed = moduleIdParamDto.safeParse(req.params);
        if (!parsed.success) {
            return res.status(400).json({ success: false, message: 'Invalid module id', issues: parsed.error.issues });
        }
        const data = await svc.latestByModule(parsed.data.moduleId);
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
}
