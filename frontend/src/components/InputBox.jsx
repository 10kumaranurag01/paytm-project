export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 text-black">
        {label}
        <input
          onChange={onChange}
          placeholder={placeholder}
          label={label}
          className="w-full px-2 py-1 border rounded border-slate-200 bg-inherit"
        />
      </div>
    </div>
  );
}
