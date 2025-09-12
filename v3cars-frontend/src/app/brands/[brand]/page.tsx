import BrandOverview from "@/components/responsive/brand/BrandAboutBlock";
import BrandInfoTable from "@/components/responsive/brand/BrandInfoTable";
import BrandPriceTable from "@/components/responsive/brand/BrandPriceTable";
import BrandSelector from '@/components/responsive/brand/BrandSelector';
import DiscontinuedCarList from "@/components/responsive/brand/DiscontinuedCarList";
import SimilarBrands from "@/components/responsive/brand/SimilarBrands";
import CurrentOffersCard from "@/components/common/CommonCards/CurrentOffersCard";


const mahindraCars = [

    {
        name: "Mahindra Thar Roxx",
        priceRange: "₹12.99 – ₹20.49 lakh",
        onRoadPriceText: "Check Thar Roxx Price in Saharanpur",
        sales: "NA",
    },

    {
        name: "Mahindra XUV 3XO",
        priceRange: "₹7.49 – ₹15.49 lakh",
        onRoadPriceText: "Check XUV 3XO Price in Saharanpur",
        sales: "9,000",
    },

    {
        name: "Mahindra Bolero Neo Plus",
        priceRange: "₹11.39 – ₹12.49 lakh",
        onRoadPriceText: "Check Bolero Neo Plus Price in Saharanpur",
        sales: "NA",
    },

    {
        name: "Mahindra XUV700 6 Seater",
        priceRange: "₹19.69 – ₹24.19 lakh",
        onRoadPriceText: "Check XUV700 6 Seater Price in Saharanpur",
        sales: "NA",
    },

    {
        name: "Mahindra Scorpio Classic",
        priceRange: "₹19.69 – ₹24.19 lakh",
        onRoadPriceText: "Check Scorpio Classic Price in Saharanpur",
        sales: "NA",
    },

];


const mahindraDescription = [
    "Mahindra & Mahindra Limited is a multinational automotive manufacturing corporation headquartered in Mumbai, India. It is one of the largest vehicle manufacturers in India and has a significant presence in the global automotive market.",
    "Established in 1945, Mahindra initially started as a steel trading company. However, it soon diversified into various sectors, including automotive, aerospace, agribusiness, and information technology. The automotive division of Mahindra is known for manufacturing a wide range of vehicles, including utility vehicles, commercial vehicles, electric vehicles, and two-wheelers.",
    "Some of the popular Mahindra vehicles include the Mahindra Thar, Scorpio, Bolero, XUV500, and the Mahindra XUV300. The company has also ventured into the electric vehicle segment with models like the Mahindra eKUV100 and the Mahindra eVerito."
];


const brandInfo = [
    { label: "Email", value: "customercare@mahindra.com" },
    { label: "Customer Service", value: "1800 209 6006" },
    { label: "Head Office", value: "Mumbai, Maharashtra" },
    { label: "Parent", value: "Mahindra & Mahindra Limited" },
    { label: "Founder", value: "JC Mahindra, KC Mahindra" },
    { label: "Products", value: "Automobile" },
    {
        label: "Key People",
        value: [
            "Anand Mahindra (Chairperson)",
            "Anish Shah (Managing Director)",
        ],
    },
];


const similarBrands = [
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
    { name: "Chevrolet", logo: "/brands/chevrolet.png" },
];

const discontinuedMahindraCars = [
    "Mahindra Alturas G4",
    "Mahindra KUV100",
    "Mahindra TUV 300",
    "Mahindra TUV 300 Plus",
    "Mahindra XUV500",
    "Mahindra eVerito",
    "Mahindra Xylo",
];

const carsData = [

    {
        image: "/ford.jpg",
        name: "S-Presso",
        engine: "83PS",
        nitro: "113Nm",
        mileage: "21.11kmpl",
        price: "₹90.99 - 200.93 lakh*",
    },

]

export default function BrandPage() {


    return (

        <div className="lg:p-8 p-4">
            <div className="flex gap-5 flex-col lg:flex-row  overflow-hidden shadow-sm w-full lg:app-container mx-auto">


                <div className="flex flex-col lg:flex-row gap-5 w-full">

                    {/* Sidebar */}
                    <div className="w-auto lg:w-[25%] bg-black border dark:border-[#2E2E2E] p-5 rounded-xl">

                        <BrandSelector />

                        <BrandInfoTable brandName="Mahindra" data={brandInfo} />


                        <SimilarBrands brands={similarBrands} />

                        <DiscontinuedCarList title="Discontinued Mahindra Cars" cars={discontinuedMahindraCars} />

                    </div>


                    <div className="w-auto lg:max-w-[75%] space-y-10">

                        <BrandOverview description={mahindraDescription} />

                        <BrandPriceTable title="Mahindra Cars price list" cars={mahindraCars} />

                        <div>

                            <p className="text-3xl font-bold mb-5">Mahindra Cars In India</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-white dark:bg-transparent border border-[#DEE2E6] dark:border-[#2E2E2E] rounded-xl">
                                <CurrentOffersCard carsData={carsData} />
                            </div>
                        </div>

                    </div>

                </div>  
            </div>
        </div>

    );
}
