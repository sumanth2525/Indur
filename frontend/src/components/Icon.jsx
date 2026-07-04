export default function Icon({ name, size = 24, className = '', filled = false, style, ...props }) {
  return (
    <span
      className={`material-symbols-outlined inline-flex shrink-0 items-center justify-center overflow-hidden select-none leading-none notranslate ${className}`}
      style={{
        fontSize: size,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        ...style,
      }}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {name}
    </span>
  )
}
