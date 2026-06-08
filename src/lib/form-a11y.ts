import type { FieldError } from "react-hook-form";

export function fieldErrorId(fieldName: string): string {
  return `${fieldName}-error`;
}

export function fieldAriaProps(
  fieldName: string,
  error?: FieldError
): {
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
} {
  if (!error) return {};
  return {
    "aria-invalid": true,
    "aria-describedby": fieldErrorId(fieldName),
  };
}
