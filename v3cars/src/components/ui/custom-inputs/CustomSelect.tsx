'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomSelect.module.css'

interface GroupedOptions<T> {
  label: string
  options: T[]
}

interface CustomSelectProps<T> {
  options?: T[]
  groupedOptions?: GroupedOptions<T>[]
  placeholder?: string
  onSelect?: (value: T) => void
  value?: unknown
  labelKey: keyof T
  valueKey: keyof T
}

const CustomSelect = <T,>({
  options = [],
  groupedOptions,
  placeholder = 'Select an option',
  onSelect,
  value,
  labelKey,
  valueKey,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [openUpward, setOpenUpward] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  // default value handle
  useEffect(() => {
    const allOptions = groupedOptions
      ? groupedOptions.flatMap((g) => g.options)
      : options

    if (value !== undefined) {
      const preSelected = allOptions.find(
        (item) => String(item[valueKey]) === String(value)
      )
      setSelectedItem(preSelected || null)
    }
  }, [value, options, groupedOptions, valueKey])

  const handleSelect = (item: T) => {
    setSelectedItem(item)
    setSearchTerm('')
    setIsOpen(false)
    onSelect?.(item)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 🔥 Check space & decide dropdown direction
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const spaceBelow = viewportHeight - rect.bottom
      const dropdownHeight = 220 // approx height

      if (spaceBelow < dropdownHeight) {
        setOpenUpward(true)
      } else {
        setOpenUpward(false)
      }
    }
  }, [isOpen])

  // filter function
  const filterList = (list: T[]) =>
    list.filter((item) =>
      String(item[labelKey])
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {/* Selected item */}
      <div
        className="p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="dark:text-white text-black">
          {selectedItem ? String(selectedItem[labelKey]) : placeholder}
        </p>
        <span className={styles.arrow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${isOpen ? 'rotate-180' : 'rotate-0'
              } size-4 transition-transform duration-300`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 border border-gray-300 rounded-b-lg
          dark:border-[#2E2E2E] w-full z-30 overflow-hidden
          bg-white dark:bg-[#171717]
          ${openUpward
              ? 'bottom-full mb-1 rounded-t-lg'
              : 'top-full mt-1 rounded-b-lg'
            }`}
        >
          {/* Search input */}
          <input
            type="text"
            className="bg-gray-50 dark:bg-[#171717] w-full p-3 border-b border-gray-300 dark:border-[#2E2E2E] outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Options */}
          <ul className={`p-0 m-0 max-h-[200px] overflow-y-auto ${styles.dropdown}`}>
            {groupedOptions ? (
              groupedOptions.map((group, gIndex) => {
                const filtered = filterList(group.options)
                if (filtered.length === 0) return null

                return (
                  <li key={gIndex}>
                    <p className="p-3 text-xs font-semibold text-gray-500 uppercase">
                      {group.label}
                    </p>
                    {filtered.map((item, index) => (
                      <div
                        key={String(item[valueKey]) || index}
                        className="p-3 cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#27272a]"
                        onClick={() => handleSelect(item)}
                      >
                        {String(item[labelKey])}
                      </div>
                    ))}
                  </li>
                )
              })
            ) : filterList(options).length > 0 ? (
              filterList(options).map((item, index) => (
                <li
                  key={String(item[valueKey]) || index}
                  className="p-3 cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#27272a]"
                  onClick={() => handleSelect(item)}
                >
                  {String(item[labelKey])}
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-400">No match found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
