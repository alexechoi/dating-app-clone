import { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({ label, error, ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        {...props}
        className={`
          w-full px-4 py-2 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${props.className || ''}
        `}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}