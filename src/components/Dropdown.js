import { useState } from "react";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
        name: 'Seat Booking',
        route: '/seat-booking'
    },
    {
        name: 'Dashboard',
        route: '/dashboard'
    }
  ]
//   const navItems = ["Hello", "World"];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full rounded-lg border-none bg-white text-black px-8 py-2 focus:outline-none"
      >
        Dropdown
        <svg
          className="-mr-1 ml-2 mt-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-.707.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`absolute left-0 w-48 mt-2 origin-top-right bg-white border-none rounded-lg shadow-lg z-10 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <ul
          className={`transition-all duration-300 ${
            isOpen
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-4 opacity-0"
          }`}
        >
          {navItems.map((item, index) => (
            <li
              key={index}
              className="text-black hover:bg-primary hover:text-white px-2 py-2 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
