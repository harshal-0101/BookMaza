'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowDownLeft,
  Wallet,
  SearchX,
  BadgeIndianRupee,
  TrendingUp,
  CreditCard,
  Hash,
  MessageSquare,
} from 'lucide-react';
import Sidebar from '../../../../../components/Application/Author/sidebar';
import Header from '../../../../../components/Application/Author/header';

// ── Data — replace with API ───────────────────────────────────────────────────
const transfersData = [
  { id: 1,  paidThrough: 'UPI',         transactionId: 'TXN-20260228-001', amount: 2500, transferredOn: '28 Feb 2026', message: 'Royalty payout – Feb 2026'       },
  { id: 2,  paidThrough: 'NEFT',        transactionId: 'TXN-20260220-002', amount: 1800, transferredOn: '20 Feb 2026', message: 'Monthly royalty settlement'       },
  { id: 3,  paidThrough: 'UPI',         transactionId: 'TXN-20260215-003', amount: 3200, transferredOn: '15 Feb 2026', message: 'Royalty payout – Mid Feb'         },
  { id: 4,  paidThrough: 'IMPS',        transactionId: 'TXN-20260210-004', amount: 900,  transferredOn: '10 Feb 2026', message: 'Partial royalty transfer'         },
  { id: 5,  paidThrough: 'NEFT',        transactionId: 'TXN-20260205-005', amount: 4100, transferredOn: '05 Feb 2026', message: 'Royalty payout – Jan sales'       },
  { id: 6,  paidThrough: 'Bank Transfer',transactionId: 'TXN-20260201-006', amount: 1500, transferredOn: '01 Feb 2026', message: 'End of month payout'             },
  { id: 7,  paidThrough: 'UPI',         transactionId: 'TXN-20260128-007', amount: 2200, transferredOn: '28 Jan 2026', message: 'Royalty payout – Jan 2026'        },
  { id: 8,  paidThrough: 'IMPS',        transactionId: 'TXN-20260120-008', amount: 750,  transferredOn: '20 Jan 2026', message: 'Royalty payout – Q4 balance'      },
  { id: 9,  paidThrough: 'NEFT',        transactionId: 'TXN-20260115-009', amount: 3800, transferredOn: '15 Jan 2026', message: 'Mid-month royalty settlement'      },
  { id: 10, paidThrough: 'Bank Transfer',transactionId: 'TXN-20260110-010', amount: 620, transferredOn: '10 Jan 2026', message: 'Royalty payout – Dec sales'       },
];

const royaltiesInAccount = 748; // balance remaining after transfers

const SCROLL_THRESHOLD = 7;
const ROW_HEIGHT       = 64;

const PAID_THROUGH_COLORS = {
  'UPI':          'bg-violet-50 text-violet-600',
  'NEFT':         'bg-blue-50 text-blue-600',
  'IMPS':         'bg-orange-50 text-orange-600',
  'Bank Transfer':'bg-gray-100 text-gray-600',
};

export default function RoyaltyTransferPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const totalTransferred = transfersData.reduce((sum, t) => sum + t.amount, 0);
  const needsScroll = transfersData.length > SCROLL_THRESHOLD;

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ── Sidebar ── */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        authorName="Author Name"
        authorEmail="author@bookmaza.com"
        totalRoyalties={royaltiesInAccount}
        onLogout={() => router.push('/login')}
      />

      {/* ── Main ── */}
      <main className="flex-1 overflow-auto">

        {/* ── Header ── */}
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Royalty Transfers"
        />

        <div className="p-8">

          {/* ── Page top bar ── */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Royalty Transfers</h2>
              <p className="text-sm text-gray-400 mt-0.5">History of all payouts transferred to your bank</p>
            </div>

            {/* Summary badges */}
            <div className="flex flex-wrap gap-3">

              {/* Balance in account */}
              <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-2xl px-5 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium leading-none mb-0.5">Royalties in account</p>
                  <p className="text-lg font-extrabold text-emerald-600 leading-none">
                    ₹ {royaltiesInAccount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Total transferred */}
              <div className="flex items-center gap-2 bg-white border border-blue-200 rounded-2xl px-5 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium leading-none mb-0.5">Total transferred</p>
                  <p className="text-lg font-extrabold text-blue-600 leading-none">
                    ₹ {totalTransferred.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Table card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              className="overflow-x-auto"
              style={
                needsScroll
                  ? { maxHeight: ROW_HEIGHT * SCROLL_THRESHOLD + 48, overflowY: 'auto' }
                  : {}
              }
            >
              <table className="w-full" style={{ tableLayout: 'fixed', minWidth: '860px' }}>

                <colgroup>
                  <col style={{ width: '4%'  }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '24%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '27%' }} />
                </colgroup>

                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">#</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Paid Through</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Transaction ID</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Amount</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Transferred On</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Message</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {transfersData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <SearchX className="w-12 h-12 text-gray-200" />
                          <p className="text-base font-semibold text-gray-400">No transfers yet</p>
                          <p className="text-sm text-gray-300">Transfer history will appear here once you request a payout.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transfersData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">

                        {/* # */}
                        <td className="py-4 px-4 text-sm text-gray-300 font-medium">{index + 1}</td>

                        {/* Paid Through */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap ${PAID_THROUGH_COLORS[item.paidThrough] ?? 'bg-gray-100 text-gray-600'}`}>
                            <CreditCard className="w-3.5 h-3.5" />
                            {item.paidThrough}
                          </span>
                        </td>

                        {/* Transaction ID */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                              <Hash className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-800 truncate font-mono tracking-tight">
                              {item.transactionId}
                            </span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-4">
                          <div className="inline-flex items-center gap-1">
                            <span className="text-sm font-extrabold text-emerald-600 whitespace-nowrap">
                              Rs. {item.amount.toLocaleString('en-IN')}
                            </span>
                            <BadgeIndianRupee className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          </div>
                        </td>

                        {/* Transferred On */}
                        <td className="py-4 px-4 text-sm text-gray-400 whitespace-nowrap">{item.transferredOn}</td>

                        {/* Message */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <MessageSquare className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                            <span className="truncate">{item.message}</span>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-400">
                {transfersData.length === 0
                  ? 'No transfers found'
                  : `${transfersData.length} transfer${transfersData.length > 1 ? 's' : ''}`}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">Total transferred :</span>
                <span className="text-xl font-extrabold text-gray-900">
                  Rs. {totalTransferred.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}