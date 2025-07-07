import React, { useEffect, useRef, useState } from 'react';

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
    <div className="custom-select" ref={dropdownRef}>
      <div className="select-box" onClick={() => setIsOpen((prev) => !prev)}>
        {selectedItem || placeholder}
        <span className="arrow">
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
        <div className="dropdown">
          <input
            type="text"
            className="search-box"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <li key={index} className="option-item" onClick={() => handleSelect(item)}>
                  {item}
                </li>
              ))
            ) : (
              <li className="no-option">No match found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;