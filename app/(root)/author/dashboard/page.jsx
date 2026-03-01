'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../../components/Application/Author/sidebar';
import Header from '../../../../components/Application/Author/header';


// ── Reusable stat card ────────────────────────────────────────────────────────
const StatCard = ({ title, value, bgColor, isRupee = true }) => (
  <div className={`${bgColor} rounded-2xl p-6 shadow-lg`}>
    <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
    <p className="text-white text-3xl font-bold">
      {isRupee ? `Rs. ${value}` : value}
    </p>
  </div>
);

// ── Main Dashboard Page ───────────────────────────────────────────────────────
export default function AuthorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Replace with real API data
  const dashboardData = {
    royaltyIn2026: 0,
    royaltyInFeb2026: 0,
    royaltyThisWeek: 0,
    royaltyTransferred: 0,
    booksSoldIn2026: 0,
    booksSoldInFeb2026: 0,
    totalRoyaltiesInAccount: 0,
  };

  const recentRoyalties = [];
  const recentWithdrawals = [];

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Sidebar ── */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        authorName="Author Name"
        authorEmail="author@bookmaza.com"
        totalRoyalties={dashboardData.totalRoyaltiesInAccount}
        onLogout={() => router.push('/login')}
      />

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto">

        {/* ── Header ── */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* ── Dashboard Content ── */}
        <div className="p-8">

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard title="Royalty in 2026" value={dashboardData.royaltyIn2026} bgColor="bg-gradient-to-br from-purple-600 to-purple-500" />
            <StatCard title="Royalty in Feb, 2026" value={dashboardData.royaltyInFeb2026} bgColor="bg-gradient-to-br from-red-700 to-red-600" />
            <StatCard title="Royalty this week" value={dashboardData.royaltyThisWeek} bgColor="bg-gradient-to-br from-blue-800 to-blue-700" />
            <StatCard title="Royalty Transferred" value={dashboardData.royaltyTransferred} bgColor="bg-gradient-to-br from-green-600 to-green-500" />
            <StatCard title="Book sold in 2026" value={dashboardData.booksSoldIn2026} bgColor="bg-gradient-to-br from-teal-600 to-teal-500" isRupee={false} />
            <StatCard title="Book sold in Feb, 2026" value={dashboardData.booksSoldInFeb2026} bgColor="bg-gradient-to-br from-yellow-700 to-yellow-600" isRupee={false} />
          </div>

          {/* Recent Royalties */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent 10 Royalties</h2>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    {['#', 'Book', 'Detail', 'Price', 'Sold By', 'Sold On', 'Royalty'].map(h => (
                      <th key={h} className="text-left py-4 px-4 font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentRoyalties.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500">
                        No royalties data available
                      </td>
                    </tr>
                  ) : (
                    recentRoyalties.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">{index + 1}</td>
                        <td className="py-4 px-4">{item.book}</td>
                        <td className="py-4 px-4">{item.detail}</td>
                        <td className="py-4 px-4">Rs. {item.price}</td>
                        <td className="py-4 px-4">{item.soldBy}</td>
                        <td className="py-4 px-4">{item.soldOn}</td>
                        <td className="py-4 px-4 font-semibold">Rs. {item.royalty}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <p className="text-lg font-bold text-gray-800">
                  Total: Rs. {dashboardData.royaltyIn2026}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Withdrawals */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent 5 Royalty Withdrawals</h2>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    {['#', 'Amount', 'Date', 'Status', 'Transaction ID'].map(h => (
                      <th key={h} className="text-left py-4 px-4 font-semibold text-gray-700">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentWithdrawals.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-500">
                        No withdrawal data available
                      </td>
                    </tr>
                  ) : (
                    recentWithdrawals.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">{index + 1}</td>
                        <td className="py-4 px-4 font-semibold">Rs. {item.amount}</td>
                        <td className="py-4 px-4">{item.date}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">{item.transactionId}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
