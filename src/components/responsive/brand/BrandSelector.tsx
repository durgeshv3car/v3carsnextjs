'use client';

import { useState } from 'react';
import Select from 'react-select';
import Image from 'next/image';

const brandOptions = [
    { value: 'mahindra', label: 'Mahindra', image: '/brands/mahindra.png' },
    { value: 'maruti', label: 'Maruti Suzuki', image: '/brands/maruti.png' },
    { value: 'tata', label: 'Tata Motors', image: '/brands/tata.png' },
    { value: 'honda', label: 'Honda', image: '/brands/honda.png' },
    { value: 'hyundai', label: 'Hyundai', image: '/brands/hyundai.png' },
];


const customStyles = {
    container: (base: any) => ({
        ...base,
        width: '350px',
        margin: 'auto',
       
    }),
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: '#FFCC00',
        borderColor: state.isFocused ? '#FFB800' : '#FFCC00',
        boxShadow: 'none',
        paddingLeft: '4px',
        minHeight: '44px',
        '&:hover': {
            borderColor: '#FFB800',
        },
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#000',
        fontWeight: 500,
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        color: '#000',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menu: (base: any) => ({
        ...base,
        zIndex: 9999,
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#FFCC00'
            : state.isFocused
                ? '#FFF2B3'
                : '#fff',
        color: '#000',
        fontWeight: state.isSelected ? 600 : 400,
        cursor: 'pointer',
    }),
};


export default function BrandSelector() {

    const [selectedBrand, setSelectedBrand] = useState(brandOptions[0]);

    const handleChange = (selected: any) => {
        setSelectedBrand(selected);
    };

    return (
        <div className=" space-y-4 overflow-visible">

            {/* Select dropdown */}
            <div className="relative ">

                <Select
                    options={brandOptions}
                    styles={customStyles}
                    placeholder="Select a brand"
                    onChange={handleChange}
                    isSearchable
                    defaultValue={selectedBrand}
                />

            </div>

            {/* Brand Image */}
            {selectedBrand?.image && (

                <div className="bg-white p-2 rounded-xl shadow">
                    <Image
                        src={selectedBrand.image}
                        alt={selectedBrand.label}
                        width={250}
                        height={150}
                        className="w-full object-contain rounded-md"
                    />
                </div>
                
            )}

        </div>
    );
}
