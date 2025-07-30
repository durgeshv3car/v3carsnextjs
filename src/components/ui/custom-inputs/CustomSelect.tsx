'use client'

import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.css'

interface CustomSelectProps {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setSearchTerm('');
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={"w-full relative"} ref={dropdownRef}>
      <div className={"p-2 border-b dark:border-[#2E2E2E] flex justify-between items-center cursor-pointer"} onClick={() => setIsOpen((prev) => !prev)}>
        {selectedItem || placeholder}
        <span className={styles['arrow']}>
          {isOpen ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          }
        </span>
      </div>

      {isOpen && (
        <div className={`absolute top-full border border-gray-300 rounded-b-lg dark:border-[#2E2E2E] border-t-0 w-full z-30 max-h-[200px] overflow-y-auto ${styles["dropdown"]}`}>
          <input
            type="text"
            className={"bg-gray-50 dark:bg-[#171717] w-full p-3 border-b border-gray-300 dark:border-[#2E2E2E] outline-none"}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className={"bg-gray-50 dark:bg-[#171717] p-0 m-0"}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <li key={index} className={"p-3 cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#27272a]"} onClick={() => handleSelect(item)}>
                  {item}
                </li>
              ))
            ) : (
              <li className={styles['no-option']}>No match found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;