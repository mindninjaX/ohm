import { ChevronDown } from 'lucide-react';
import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const CONTROL =
  'w-full rounded-[12px] border border-line bg-card text-base outline-none transition-shadow ' +
  'focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30';

/** Figma: Field (28:38250). A 14/20 Medium label, 8, the control (48 tall, or 96 for the textarea), 8, the help. */
export function Field({
  label,
  help,
  error,
  children,
  htmlFor,
}: {
  label: string;
  help?: ReactNode;
  error?: ReactNode;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : (
        help && <p className="text-sm text-ink-muted">{help}</p>
      )}
    </div>
  );
}

/** Figma: Field, Type Input. The number sits in 18/28 Semi Bold with its unit (kVA) at the right in Text-base `ink-muted`. */
export function NumberField({
  label,
  help,
  error,
  value,
  onChange,
  unit,
  placeholder,
}: {
  label: string;
  help?: ReactNode;
  error?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <Field label={label} help={help} error={error} htmlFor={id}>
      <div
        className={cn(
          'flex h-12 items-center gap-2 rounded-[12px] border bg-card px-[15px] transition-shadow',
          'focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/30',
          error ? 'border-danger' : 'border-line',
        )}
      >
        <input
          id={id}
          value={value}
          inputMode="numeric"
          autoComplete="off"
          maxLength={6}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          className="h-7 min-w-0 flex-1 bg-transparent text-lg leading-7 font-semibold text-ink-strong outline-none placeholder:font-normal placeholder:text-ink-muted"
        />
        {unit && <span className="shrink-0 text-base text-ink-muted">{unit}</span>}
      </div>
    </Field>
  );
}

/** Figma: Field, Type Select, over the NativeSelect: 48 tall, radius 12, a 1 px line, a small shadow, the chevron drawn over it. */
export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(CONTROL, 'h-12 appearance-none py-0 pr-10 pl-[15px] text-ink shadow-xs')}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown size={16} aria-hidden className="pointer-events-none absolute top-4 right-4 text-ink" />
      </div>
    </Field>
  );
}

/** Figma: Field, Type Textarea: 96 tall, padding 12 16, the placeholder in `ink-muted`. */
export function TextareaField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<ComponentProps<'textarea'>, 'value' | 'onChange'>) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id}>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          CONTROL,
          'block h-24 resize-none px-[15px] py-[11px] leading-6 text-ink placeholder:text-ink-muted',
        )}
      />
    </Field>
  );
}
