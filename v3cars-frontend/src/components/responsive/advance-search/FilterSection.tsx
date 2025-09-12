'use client'


import MobileFilter from "@/components/mobile/advance-search/MobileFilter";
import WebFilter from "@/components/web/advance-search/WebFilter";
import useIsMobile from "@/hooks/useIsMobile";

function FiltersSection() {
    const isMobile = useIsMobile()

    return (
        <>
            {isMobile ? <MobileFilter /> : <WebFilter />}
        </>
    );
}

export default FiltersSection;