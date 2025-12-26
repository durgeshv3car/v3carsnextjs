'use client'

interface BrandInfoItem {
  label: string;
  value: string | string[];
}

interface BrandInfoTableProps {
  brandName: string;
  data: CarBrandDetail | null;
}

interface CarBrandDetail {
  brandId: number;
  brandName: string;
  logoPath: string;
  unquieViews: number | null;
  popularity: string;
  brandSlug: string;
  brandDescription: string;
  bannerImage: string;
  bannerImageAltTag: string;
  isFasttag: number;
  brandType: number;
  displayName: string;
  roadsideAssistance: number;
  emailAddress: string;
  stateId: number;
  cityId: number;
  parentOrganization: string;
  products: string;
  founderName: string;
  customerService: string;
  serviceNetwork: boolean;
  websiteUrl: string;
  brandKeyPeople: string; // JSON string
  introContent: string; // HTML content
  brandOrganizationName: string;
  websiteName: string;
  brandTitle: string;
  iconPath: string;
  brandStatus: number;
  similarBrand: string; // comma-separated IDs
}

export default function BrandInfoTable({ brandName, data }: BrandInfoTableProps) {
  if (!data) return <div className="text-gray-400">No data available</div>;

  // ✅ Parse brandKeyPeople JSON safely
  let keyPeople: string[] = [];
  try {
    const parsed = JSON.parse(data.brandKeyPeople || '[]');
    if (Array.isArray(parsed)) {
      keyPeople = parsed.map(
        (person: { name: string; designation: string }) =>
          `${person.name} (${person.designation})`
      );
    }
  } catch {
    keyPeople = [];
  }

  // ✅ Prepare all info items
  const infoItems: BrandInfoItem[] = [
    { label: 'Email', value: data.emailAddress || 'N/A' },
    { label: 'Founder', value: data.founderName || 'N/A' },
    { label: 'Customer Service', value: data.customerService || 'N/A' },
    { label: 'Parent Organization', value: data.parentOrganization || 'N/A' },
    { label: 'Products', value: data.products || 'N/A' },
    { label: 'Key People', value: keyPeople.length > 0 ? keyPeople : ['N/A'] },
  ];

  return (
    <div className="text-white rounded-xl overflow-hidden mt-6">
      {/* Header */}
      <div className="bg-[#111] px-2 py-3 text-[16px] font-semibold border-b border-[#2A2A2A]">
        {brandName}
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#2A2A2A] text-sm">
        {infoItems.map((item, index) => (
          <div key={index} className="flex px-2 py-3">
            <div className="w-1/3 font-semibold text-gray-200">{item.label}</div>
            <div className="w-2/3 text-gray-300 whitespace-pre-line">
              {Array.isArray(item.value)
                ? item.value.map((line, idx) => (
                    <div key={idx}>
                      {idx + 1}. {line}
                    </div>
                  ))
                : item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
