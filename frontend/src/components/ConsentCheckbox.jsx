export default function ConsentCheckbox({
  checked,
  onChange,
  children,
  className = '',
  style,
  id,
}) {
  return (
    <label
      htmlFor={id}
      style={style}
      className={`flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-surface/50 px-4 py-3.5 text-left transition-colors hover:border-border-strong ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong accent-text"
        aria-required="true"
      />
      <span className="text-xs leading-relaxed text-muted">{children}</span>
    </label>
  )
}
