import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fontOptions = [
  { label: "Host Grotesk", value: "host" },
  { label: "Poppins", value: "poppins" },
  { label: "Serif", value: "serif" },
  { label: "Sans", value: "sans-serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Comic Sans", value: '"Comic Sans MS", cursive' },
];

export default function FontToolbar({ selectedFont, onChange }: {
  selectedFont: string,
  onChange: (font: string) => void
}) {
  return (
    <Select defaultValue={selectedFont} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-white text-sm">
        <SelectValue placeholder="Font" />
      </SelectTrigger>
      <SelectContent className="bg-white max-h-[200px] overflow-auto">
        {fontOptions.map((font) => (
          <SelectItem
            key={font.value}
            value={font.value}
            className="text-sm p-2"
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
