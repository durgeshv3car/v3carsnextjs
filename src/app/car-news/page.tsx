
import CarNewsCard from '@/components/responsive/car-news/CarNewsCard'
import CarNewsSection from '@/components/responsive/car-news/CarNewsSection'
import UpcomingSideBar from '@/components/responsive/upcoming-cars/UpcomingSidebar'

export default function page() {


  const dummyData = [
    {
      image: "/car-news/car.png",
      title: "Upcoming Cars In August 2024 – Tata Curvv, Mahindra Tata Curvv, ...",
      desc: "In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
      author: "Mahesh Yadav",
      date: "July 31 2024",
    },
    {
      image: "/car-news/car.png",
      title: "Upcoming Cars In August 2024 – Tata Curvv, Mahindra Tata Curvv, ...",
      desc: "In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
      author: "Mahesh Yadav",
      date: "July 31 2024",
    },
    {
      image: "/car-news/car.png",
      title: "Upcoming Cars In August 2024 – Tata Curvv, Mahindra Tata Curvv, ...",
      desc: "In this June 2024 car sales analysis article, we’ll look at the YoY and MoM change in sales figures...",
      author: "Mahesh Yadav",
      date: "July 31 2024",
    },
    // more...
  ];


  return (
    <div>
      <CarNewsCard />

      <div className="lg:p-8 p-4">
        <div className=" flex gap-5 flex-col md:flex-row rounded-lg overflow-hidden shadow-sm w-full lg:max-w-[1600px] mx-auto">

          <div className="flex flex-col lg:flex-row justify-between gap-5 w-full">
            <div className="w-auto lg:max-w-[74%]">

              <CarNewsSection
                title="Latest Car News"
                viewAllLink="/upcoming-cars"         
                viewAllText="View All Upcoming Cars"
                data={dummyData}
              />

              {/* Top Car News */}
              <CarNewsSection
                title="Top Car News"
                viewAllLink="/top-car-news"
                viewAllText="View All Top Cars"
                data={dummyData}
              />

               <CarNewsSection
                title="Trending Car News"
                viewAllLink="/trending-car-news"
                viewAllText="View All Trending Cars"
                data={dummyData}
              />

            </div>
            <div className="w-auto lg:max-w-[24%]">
              <UpcomingSideBar />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}



