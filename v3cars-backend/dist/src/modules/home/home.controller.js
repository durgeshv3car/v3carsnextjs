import { HomeService } from './home.service.js';
import { upcomingQueryDto, quickLookQueryDto, bodyTypeQueryDto, priceQueryDto, homeLatestNewsDto, homeLatestReviewsDto, homeLatestVideosDto, homeLatestVariantExplainedDto, } from './home.dto.js';
const svc = new HomeService();
export class HomeController {
    async upcoming(req, res) {
        const q = upcomingQueryDto.parse(req.query);
        const data = await svc.upcoming(q);
        res.json({ success: true, ...data });
    }
    async quickLook(req, res) {
        const q = quickLookQueryDto.parse(req.query);
        const data = await svc.quickLook(q);
        res.json({ success: true, ...data });
    }
    async byBodyType(req, res) {
        const q = bodyTypeQueryDto.parse(req.query);
        const data = await svc.byBodyType(q);
        res.json({ success: true, ...data });
    }
    async byPrice(req, res) {
        const q = priceQueryDto.parse(req.query);
        const data = await svc.byPrice(q);
        res.json({ success: true, ...data });
    }
    async latestNews(req, res) {
        const q = homeLatestNewsDto.parse(req.query);
        const rows = await svc.latestNews(q);
        res.json({ success: true, rows });
    }
    /** Latest expert reviews */
    async latestReviews(req, res) {
        const q = homeLatestReviewsDto.parse(req.query);
        const rows = await svc.latestReviews(q);
        res.json({ success: true, rows });
    }
    /** 🆕 Latest videos (global) */
    async latestVideos(req, res) {
        const q = homeLatestVideosDto.parse(req.query);
        const rows = await svc.latestVideos(q);
        res.json({ success: true, rows });
    }
    /** 🆕 Variants Explained (articles) */
    async latestVariantExplained(req, res) {
        const q = homeLatestVariantExplainedDto.parse(req.query);
        const rows = await svc.latestVariantExplained(q);
        res.json({ success: true, rows });
    }
}
