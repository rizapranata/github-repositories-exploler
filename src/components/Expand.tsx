import { useState } from "react";

interface ExpandProps {
  title: string;
  children: React.ReactNode;
}

const Expand = ({ title, children }: ExpandProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded mb-2">
      <button
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="px-4 py-2 bg-white">{children}</div>}
    </div>
  );
};

export default Expand;
