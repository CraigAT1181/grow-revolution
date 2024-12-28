import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [pageTitle, setPageTitle] = useState("");

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1);

    const firstSegment = path.split("/")[0];

    const title = path
      ? path.charAt(0).toUpperCase() + firstSegment.slice(1)
      : "Welcome!";
    setPageTitle(title);
  }, [location]);

  return (
    <header className="header">
      <div className="header-page-title">{pageTitle}</div>
      <div className="drawer-container">
        <button onClick={null} className="mr-1">
          <svg
            className="w-6 h-6"
            fill="#14532d"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20c0-2.21 1.79-4 4-4h4c2.21 0 4 1.79 4 4v2H6v-2z"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
