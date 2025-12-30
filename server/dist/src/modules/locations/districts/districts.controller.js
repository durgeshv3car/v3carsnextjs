import { DistrictsService } from './districts.service.js';
import { districtsListQueryDto, districtIdParamDto } from './districts.dto.js';
const svc = new DistrictsService();
export class DistrictsController {
    async list(req, res) {
        const q = districtsListQueryDto.parse(req.query);
        const data = await svc.list(q);
        res.json({ success: true, ...data });
    }
    async getById(req, res) {
        const { id } = districtIdParamDto.parse(req.params);
        const row = await svc.getById(id);
        if (!row)
            return res.status(404).json({ success: false, message: 'District not found' });
        res.json({ success: true, data: row });
    }
}
