import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  visible?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  onChange,
  visible = true, // Set the default value of visible here
}: FormInputProps) {
  return (
    <div className="mb-2" style={{ display: visible ? "block" : "none" }}>
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}
export default FormInput;
