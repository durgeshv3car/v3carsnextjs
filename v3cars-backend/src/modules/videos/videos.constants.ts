

export const VIDEO_TYPES = {
  REVIEW: 1,
  COMPARE: 2,
  VARIANTS_EXPLAINED: 3,
  MORE: 4,
  AUTO_EXPO: 5,
} as const;


export type VideoTypeNum = (typeof VIDEO_TYPES)[keyof typeof VIDEO_TYPES];



export const VIDEO_SLUG_BY_TYPE: Record<number, string> = {
  1: '/videos/reviews/',
  2: '/videos/compare/',
  3: '/videos/variant-explained/',
  4: '/videos/more/',
  5: '/videos/auto-expo/',
};



export function videoTypeFromParam(param: string): VideoTypeNum {
  const k = param.trim().toLowerCase();
  switch (k) {
    case 'reviews':
    case 'review':
      return VIDEO_TYPES.REVIEW;
    case 'compare':
    case 'comparison':
      return VIDEO_TYPES.COMPARE;
    case 'variant-explained':
    case 'variants-explained':
      return VIDEO_TYPES.VARIANTS_EXPLAINED;
    case 'more':
      return VIDEO_TYPES.MORE;
    case 'auto-expo':
      return VIDEO_TYPES.AUTO_EXPO;
    default:
      return VIDEO_TYPES.REVIEW;
  }
}


 