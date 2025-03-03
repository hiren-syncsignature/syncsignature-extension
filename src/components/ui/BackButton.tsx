import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onClick: () => void;
  label: string;
};

export default function BackButton({ onClick, label }: BackButtonProps) {
  return (
    <div className="flex items-center mb-4">
      <button onClick={onClick} className="mr-2" title="Back">
        <ArrowLeft className="h-4 w-4 text-gray-500" />
      </button>
      <h3 className="text-lg font-medium text-gray-800">{label}</h3>
    </div>
  );
}
