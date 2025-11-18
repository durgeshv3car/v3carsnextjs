import { FaqsService } from './faqs.service.js';
import { faqsListQueryDto, faqIdParamDto, modulesListQueryDto } from './faqs.dto.js';
const svc = new FaqsService();
export class FaqsController {
    /** GET /v1/faqs?moduleId=1&limit=50&page=1&q=emi */
    async list(req, res) {
        const q = faqsListQueryDto.parse(req.query);
        const data = await svc.list(q);
        res.json({ success: true, ...data });
    }
    /** GET /v1/faqs/:id */
    async getById(req, res) {
        const parsed = faqIdParamDto.safeParse(req.params);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid FAQ id',
                issues: parsed.error.issues,
            });
        }
        const row = await svc.getById(parsed.data.id);
        if (!row)
            return res.status(404).json({ success: false, message: 'FAQ not found' });
        res.json({ success: true, data: row });
    }
    /** GET /v1/faqs/modules?limit=50&page=1&q=loan */
    async listModules(req, res) {
        const q = modulesListQueryDto.parse(req.query);
        const data = await svc.listModules(q);
        res.json({ success: true, ...data });
    }
    /** GET /v1/faqs/modules/:id */
    async getModuleById(req, res) {
        const id = Number(req.params.id);
        if (!Number.isFinite(id) || id <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid module id' });
        }
        const row = await svc.getModuleById(id);
        if (!row)
            return res.status(404).json({ success: false, message: 'Module not found' });
        res.json({ success: true, data: row });
    }
}
