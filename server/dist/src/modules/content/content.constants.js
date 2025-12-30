export const CONTENT_TYPES = {
    NEWS: 1,
    EXPERT_REVIEW: 2,
    VARIANTS_EXPLAINED: 3,
    COMPARISON_REVIEW: 4,
    USER_REVIEW: 5,
    FEATURES_EXPLAINED: 6,
    CAR_GUIDE: 7,
    AUTO_EXPO: 8,
    PRESS_RELEASE: 9,
};
export const CONTENT_SLUG_BY_TYPE = {
    1: '/news/',
    2: '/reviews/',
    3: '/variant-explained/',
    4: '/comparison/',
    5: '/user-reviews/',
    6: '/features-explained/',
    7: '/car-guide/',
    8: '/auto-expo/',
    9: '/press-release/',
};
export function typeFromParam(param) {
    const k = param.trim().toLowerCase();
    switch (k) {
        case 'news': return CONTENT_TYPES.NEWS;
        case 'reviews':
        case 'expert-review':
        case 'expert-reviews': return CONTENT_TYPES.EXPERT_REVIEW;
        case 'variant-explained': return CONTENT_TYPES.VARIANTS_EXPLAINED;
        case 'comparison': return CONTENT_TYPES.COMPARISON_REVIEW;
        case 'user-reviews': return CONTENT_TYPES.USER_REVIEW;
        case 'features-explained': return CONTENT_TYPES.FEATURES_EXPLAINED;
        case 'car-guide': return CONTENT_TYPES.CAR_GUIDE;
        case 'auto-expo': return CONTENT_TYPES.AUTO_EXPO;
        case 'press-release': return CONTENT_TYPES.PRESS_RELEASE;
        default: return CONTENT_TYPES.NEWS;
    }
}
