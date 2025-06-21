'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Senin', sales: 400000 },
  { name: 'Selasa', sales: 300000 },
  { name: 'Rabu', sales: 200000 },
  { name: 'Kamis', sales: 278000 },
  { name: 'Jumat', sales: 189000 },
  { name: 'Sabtu', sales: 239000 },
  { name: 'Minggu', sales: 349000 },
];

export default function BarChartComponent() {
  return (
    <div>
        <div className="w-full h-80 rounded-lg p-5 shadow-md">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `Rp. ${value.toLocaleString('id-ID')}`} />
            <Bar dataKey="sales" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
}
