import { useState } from 'react'

export default function FloatingLabelInput({
  label,
  id,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required,
  inputMode,
  rows,
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value?.length > 0
  const isFloating = focused || hasValue

  if (rows) {
    return (
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isFloating ? placeholder || label : ''}
          required={required}
          className={`w-full min-h-[44px] px-4 pt-5 pb-2 bg-white border rounded-[11px] text-[15px] text-[#1d1d1f] outline-none resize-none transition-colors ${
            error ? 'border-red-400' : 'border-[#e0e0e0] focus:border-[#0066cc]'
          }`}
          style={{ lineHeight: '1.3' }}
        />
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all pointer-events-none ${
            isFloating
              ? 'text-[10px] top-[6px] text-[#7a7a7a]'
              : 'text-[15px] top-[14px] text-[#7a7a7a]'
          }`}
        >
          {label}{required ? ' *' : ''}
        </label>
        {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
      </div>
    )
  }

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={isFloating ? placeholder || label : ''}
        autoComplete={autoComplete}
        required={required}
        inputMode={inputMode}
        className={`w-full min-h-[44px] px-4 pt-5 pb-2 bg-white border rounded-[11px] text-[15px] text-[#1d1d1f] outline-none transition-colors ${
          error ? 'border-red-400' : 'border-[#e0e0e0] focus:border-[#0066cc]'
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all pointer-events-none ${
          isFloating
            ? 'text-[10px] top-[6px] text-[#7a7a7a]'
            : 'text-[15px] top-[14px] text-[#7a7a7a]'
        }`}
      >
        {label}{required ? ' *' : ''}
      </label>
      {error && <p className="text-red-500 text-[11px] mt-1 ml-1">{error}</p>}
    </div>
  )
}