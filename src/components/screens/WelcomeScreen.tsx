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
          />
        ))}
      </div>
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
