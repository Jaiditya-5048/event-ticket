import { cn } from '@/libs/cn';
import { Field, useField } from 'formik';

interface FormikTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const FormikTextInput = ({
  label,
  className,
  ...props
}: FormikTextInputProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        {...field}
        {...props}
        className={cn(
          'flex h-10 w-full rounded-md border bg-background px-3 py-2 focus:border-0 text-base cursor-pointer ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          meta.touched && meta.error
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'border-input',
          className
        )}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1 pl-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikTextInput;
