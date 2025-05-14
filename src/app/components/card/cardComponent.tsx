// 🔹 Reusable Card Component
function Card({ title, color, children, className = "" }: { title: string; color ?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-gray-300 rounded-xl p-4 ${className}`}>
      <h2 className={`${color} mb-3 font-semibold`}>{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

// 🔹 Reusable Info Item Component
function Item({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div>
      <p className="text-gray-700 text-sm">{label}:</p>
      <p className={`font-semibold text-sm ${className}`}>{value}</p>
    </div>
  );
}

export {Card, Item};