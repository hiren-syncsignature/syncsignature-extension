import SignatureCard from "../ui/SignatureCard";
import { Signature } from "../../types";
// import { PlusCircle } from "lucide-react";

type WelcomeScreenProps = {
  signatures: Signature[];
  selectedSignatureId: string | null;
  onSelectSignature: (id: string) => void;
  // onEditSignature: (signature: Signature) => void;
  // onDeleteSignature: (id: string) => void;
  // onAddSignature: () => void;
};

export default function WelcomeScreen({
  signatures,
  selectedSignatureId,
  onSelectSignature,
}: // onEditSignature,
// onDeleteSignature,
// onAddSignature,
WelcomeScreenProps) {
  const selectedSignature = signatures.find(
    (s) => s.id === selectedSignatureId
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Signatures</h2>
      <div className="space-y-2">
        {signatures.map((signature) => (
          <SignatureCard
            key={signature.id}
            signature={signature}
            isSelected={selectedSignatureId === signature.id}
            onSelect={onSelectSignature}
            // onEdit={onEditSignature}
            // onDelete={onDeleteSignature}
            // showDeleteButton={signatures.length > 1} // Only show delete if there's more than one signature
          />
        ))}
      </div>
      {/* <button
        onClick={onAddSignature}
        className="flex items-center justify-center w-full py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all duration-200"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add New Signature
      </button>
 */}
      {/* Signature Preview */}
      {selectedSignature && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <div
            className="p-4 border rounded-md bg-gray-50 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedSignature.content }}
          />
        </div>
      )}
    </div>
  );
}
