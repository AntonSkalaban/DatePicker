export interface DateInputProps {
  value: string;
  title: string;
  errorMessage: string;
  testId: string;
  onSubmit: (value: string) => void;
}
