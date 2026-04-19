export default function Spinner({ label = "Loading...", inline = false }) {
  return (
    <div
      className={`flex items-center gap-3 ${
        inline ? "" : "justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-5"
      }`}
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-200/30 border-t-emerald-300" />
      <span className="text-sm text-emerald-50/80">{label}</span>
    </div>
  );
}
