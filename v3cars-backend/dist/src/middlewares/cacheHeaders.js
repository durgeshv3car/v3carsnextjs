export const setCache = (sMaxAgeSec, swrSec = 60) => (_req, res, next) => {
    res.set('Cache-Control', `public, s-maxage=${sMaxAgeSec}, stale-while-revalidate=${swrSec}`);
    next();
};
