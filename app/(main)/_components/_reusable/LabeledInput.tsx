// components/ui/LabeledInput.tsx
import { Input } from "@/components/ui/input";

interface LabeledInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function LabeledInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: LabeledInputProps) {
  return (
    <div className={`pb-3 flex-row `}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
