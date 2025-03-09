import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Option {
    value: string;
    label: string;
    image?: string;
}

interface SelectProps {
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    placeholder?: string;
    maxSelections?: number;
    isLoading?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export  const Select: React.FC<SelectProps> = ({
                                           options,
                                           value,
                                           onChange,
                                           placeholder = 'Select...',
                                           maxSelections = Infinity,
                                           isLoading = false,
                                           disabled = false,
                                           error,
                                           className = '',
                                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [options, searchTerm]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (option: Option) => {
        const isSelected = value.some((item) => item.value === option.value);

        if (isSelected) {
            onChange(value.filter((item) => item.value !== option.value));
        } else if (value.length < maxSelections) {
            onChange([...value, option]);
        }
    };

    const removeSelection = (option: Option, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((item) => item.value !== option.value));
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className={`relative ${className}`} ref={selectRef}>
            <div
                className={`
          flex flex-wrap items-center border rounded-lg p-2 cursor-pointer
          ${isOpen ? 'border-luna-primary ring-1 ring-luna-primary' : 'border-gray-300'}
          ${error ? 'border-luna-error ring-1 ring-luna-error' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
                onClick={toggleDropdown}
            >
                {value.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {value.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center gap-1 bg-luna-primary/10 text-luna-primary rounded-md px-2 py-1"
                            >
                                {option.image && (
                                    <img src={option.image} alt={option.label} className="w-5 h-5" />
                                )}
                                <span>{option.label}</span>
                                <XMarkIcon
                                    className="w-4 h-4 cursor-pointer"
                                    onClick={(e) => removeSelection(option, e)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className="text-gray-500">{placeholder}</span>
                )}

                <div className="ml-auto flex items-center">
                    {isLoading ? (
                        <div className="animate-spin w-5 h-5 border-2 border-luna-primary border-t-transparent rounded-full" />
                    ) : (
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="flex items-center p-2 border-b">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            className="w-full px-2 py-1 outline-none"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <XMarkIcon
                                className="w-5 h-5 text-gray-400 cursor-pointer"
                                onClick={clearSearch}
                            />
                        )}
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {
                                const isSelected = value.some((item) => item.value === option.value);
                                const isDisabled = !isSelected && value.length >= maxSelections;

                                return (
                                    <div
                                        key={option.value}
                                        className={`
                      flex items-center gap-2 px-3 py-2 cursor-pointer
                      ${isSelected ? 'bg-luna-primary/10' : ''}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                    `}
                                        onClick={() => !isDisabled && handleSelect(option)}
                                    >
                                        {option.image && (
                                            <img src={option.image} alt={option.label} className="w-6 h-6" />
                                        )}
                                        <span>{option.label}</span>
                                        {isSelected && (
                                            <div className="ml-auto w-4 h-4 bg-luna-primary rounded-full"></div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-3 text-center text-gray-500">No options found</div>
                        )}
                    </div>

                    {maxSelections < Infinity && (
                        <div className="p-2 text-sm text-gray-500 border-t">
                            Selected {value.length} of {maxSelections}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


