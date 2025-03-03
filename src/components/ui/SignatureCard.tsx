import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Signature } from "../../types";

type SignatureCardProps = {
  signature: Signature;
  isSelected: boolean;
  onSelect: (id: string) => void;
  // onEdit: (signature: Signature) => void;
  // onDelete: (id: string) => void;
  // showDeleteButton: boolean;
};

export default function SignatureCard({
  signature,
  isSelected,
  onSelect,
}: // onEdit,
// onDelete,
// showDeleteButton,
SignatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex w-full">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(signature.id)}
        className={`flex h-12 w-full items-center rounded-l-md px-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 ${
          isSelected
            ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-purple-300 hover:shadow"
        }`}
      >
        <span className="flex items-center justify-between w-full">
          {signature.name}
          {isSelected && <Check className="h-4 w-4 text-white" />}
          {isHovered && !isSelected && (
            <ChevronRight className="h-4 w-4 text-gray-400" />
          )}
        </span>
      </button>
      {/* <div className="flex border-y border-r border-gray-200 rounded-r-md overflow-hidden">
        <button
          onClick={() => onEdit(signature)}
          className="px-2 hover:bg-gray-100 transition-colors duration-200"
          title="Edit Signature"
        >
          <Edit className="h-3 w-3 text-gray-500" />
        </button>
        {showDeleteButton && (
          <button
            onClick={() => onDelete(signature.id)}
            className="px-2 hover:bg-gray-100 transition-colors duration-200"
            title="Delete Signature"
          >
            <Trash className="h-3 w-3 text-gray-500" />
          </button>
        )}
      </div> */}
    </div>
  );
}
