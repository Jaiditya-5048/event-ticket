import { cn } from '@/libs/cn';
import { useField } from 'formik';
import React from 'react';

type FormikSelectProps = {
  label: string;
  name: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  children,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <select
        {...field}
        {...props}
        className={cn(
          'flex h-10 w-full rounded-md border bg-background px-3 py-2 focus:border-0 text-base cursor-pointer ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          meta.touched && meta.error
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'border-input',
          className
        )}
      >
        {children}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1 pl-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikSelect;
