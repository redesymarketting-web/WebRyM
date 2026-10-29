const claseControl =
  "w-full rounded-xl border border-white/10 bg-ink px-3 py-2.5 text-sm text-snow outline-none transition focus:border-ember";

export function Etiqueta({ children, ayuda }) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
      <span className="block text-xs font-black uppercase tracking-widest text-snow/60">
        {children}
      </span>
      {ayuda ? <span className="text-[11px] text-snow/35">{ayuda}</span> : null}
    </div>
  );
}

export function CampoTexto({
  name,
  label,
  defaultValue = "",
  type = "text",
  required = false,
  placeholder = "",
  help = "",
  ayuda = "",
  maxLength,
  inputMode,
}) {
  return (
    <div className="space-y-1">
      <Etiqueta ayuda={ayuda}>{label}</Etiqueta>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className={claseControl}
      />
      {help ? <p className="text-xs text-snow/45">{help}</p> : null}
    </div>
  );
}

export function CampoTextarea({
  name,
  label,
  defaultValue = "",
  required = false,
  rows = 5,
  placeholder = "",
  help = "",
  ayuda = "",
  maxLength,
}) {
  return (
    <div className="space-y-1">
      <Etiqueta ayuda={ayuda}>{label}</Etiqueta>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        className={claseControl}
      />
      {help ? <p className="text-xs text-snow/45">{help}</p> : null}
    </div>
  );
}

export function CampoSelect({
  name,
  label,
  defaultValue = "",
  options = [],
  required = false,
  help = "",
}) {
  return (
    <div className="space-y-1">
      <Etiqueta>{label}</Etiqueta>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className={claseControl}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {help ? <p className="text-xs text-snow/45">{help}</p> : null}
    </div>
  );
}
