// src/modules/tools/onroad/onroad.service.ts
// Simple rule-based on-road calculator (can be swapped with DB-driven rules later)
export type OnRoadBreakdown = {
  exShowroom: number;
  roadTax: number;
  registrationCharges: number;
  fastag: number;
  hypothecationEndorsement: number;
  roadSafetyCess: number;
  otherCharges: number;
  insurance: number;
  total: number;
};

export class OnRoadService {
  /** Quote using basic defaults; can be extended to city/state rules later */
  quote(opts: { exShowroom: number; cityId?: number; isLoan?: boolean }): OnRoadBreakdown {
    const ex = Math.max(0, Math.round(opts.exShowroom));

    // Defaults tuned to your screenshot:
    const pct = {
      roadTax: 0.08,        // 8%
      safetyCess: 0.0018,   // 0.18%
      insurance: 0.05,      // 5%
    };

    const fixed = {
      registration: 600,
      fastag: 600,
      hypothecation: opts.isLoan ? 1500 : 0,
      other: 400,
    };

    const roadTax = Math.round(ex * pct.roadTax);
    const roadSafetyCess = Math.round(ex * pct.safetyCess);
    const insurance = Math.round(ex * pct.insurance);

    const total =
      ex +
      roadTax +
      fixed.registration +
      fixed.fastag +
      fixed.hypothecation +
      roadSafetyCess +
      fixed.other +
      insurance;

    return {
      exShowroom: ex,
      roadTax,
      registrationCharges: fixed.registration,
      fastag: fixed.fastag,
      hypothecationEndorsement: fixed.hypothecation,
      roadSafetyCess,
      otherCharges: fixed.other,
      insurance,
      total,
    };
  }
}
