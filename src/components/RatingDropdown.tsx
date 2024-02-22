import { useState, useEffect, useRef } from 'react';

// @ts-ignore
const RatingDropdown = ({ selectedNumber, handleNumberSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    // @ts-ignore
    const handleDocumentClick = (e) => {
        // @ts-ignore
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mb-2"
                    onClick={toggleDropdown}
                >
                    {selectedNumber || "Select Rating"}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                // @ts-ignore
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                        {[1, 2, 3, 4, 5].map((number) => (
                            <button
                                key={number}
                                type="button"
                                className={`text-gray-700 block px-4 py-2 text-sm ${selectedNumber === number ? "bg-gray-100 text-gray-900" : ""
                                    }`}
                                onClick={() => {
                                    handleNumberSelect(number);
                                    toggleDropdown();
                                }}
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RatingDropdown;
