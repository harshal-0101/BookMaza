'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ArrowUpRight,
  Wallet,
  SearchX,
} from 'lucide-react';
import Sidebar from '../../../../../components/Application/Author/sidebar';
import Header from '../../../../../components/Application/Author/header';

// ── Data — replace with API ───────────────────────────────────────────────────
const royaltiesData = [
  { id: 1,  book: 'The Art of Stillness',   detail: 'Print',     price: 499, soldBy: 'Amazon IN', soldOn: '28 Feb 2026', royalty: 75  },
  { id: 2,  book: 'Modern Minimalism',      detail: 'eBook',     price: 299, soldBy: 'Bookmaza',  soldOn: '27 Feb 2026', royalty: 60  },
  { id: 3,  book: 'Deep Work Diaries',      detail: 'Print',     price: 599, soldBy: 'Flipkart',  soldOn: '25 Feb 2026', royalty: 90  },
  { id: 4,  book: 'Deep Work Diaries',      detail: 'Print',     price: 599, soldBy: 'Flipkart',  soldOn: '25 Feb 2026', royalty: 90  },
  { id: 5,  book: 'The Art of Stillness',   detail: 'eBook',     price: 199, soldBy: 'Bookmaza',  soldOn: '20 Feb 2026', royalty: 50  },
  { id: 6,  book: 'The Art of Stillness',   detail: 'Print',     price: 499, soldBy: 'Amazon IN', soldOn: '18 Feb 2026', royalty: 75  },
  { id: 7,  book: 'The Art of Stillness',   detail: 'Print',     price: 499, soldBy: 'Amazon IN', soldOn: '18 Feb 2026', royalty: 75  },
  { id: 8,  book: 'Quiet Hours',            detail: 'Audiobook', price: 349, soldBy: 'Bookmaza',  soldOn: '15 Feb 2026', royalty: 105 },
  { id: 9,  book: 'The Unfinished Letters', detail: 'Print',     price: 399, soldBy: 'Amazon IN', soldOn: '12 Feb 2026', royalty: 60  },
  { id: 10, book: 'Modern Minimalism',      detail: 'Print',     price: 299, soldBy: 'Snapdeal',  soldOn: '10 Feb 2026', royalty: 68  },
];

const royaltiesInAccount = royaltiesData.reduce((sum, r) => sum + r.royalty, 0);
const SCROLL_THRESHOLD   = 7;
const ROW_HEIGHT         = 64;

export default function RoyaltiesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const total       = royaltiesData.reduce((sum, r) => sum + r.royalty, 0);
  const needsScroll = royaltiesData.length > SCROLL_THRESHOLD;

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
          title="Royalties"
        />

        <div className="p-8">

          {/* ── Page top bar ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Royalties</h2>
              <p className="text-sm text-gray-400 mt-0.5">All earnings from your published books</p>
            </div>

            {/* Royalties in account badge */}
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
              <table className="w-full" style={{ tableLayout: 'fixed', minWidth: '760px' }}>

                <colgroup>
                  <col style={{ width: '4%' }} />
                  <col style={{ width: '26%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '12%' }} />
                  <col style={{ width: '18%' }} />
                  <col style={{ width: '16%' }} />
                  <col style={{ width: '12%' }} />
                </colgroup>

                <thead className="sticky top-0 z-10">
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">#</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Book</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Detail</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Price</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Sold By</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-left">Sold On</th>
                    <th className="py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Royalty</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {royaltiesData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <SearchX className="w-12 h-12 text-gray-200" />
                          <p className="text-base font-semibold text-gray-400">No royalties yet</p>
                          <p className="text-sm text-gray-300">Earnings will appear here once your books are sold.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    royaltiesData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">

                        {/* # */}
                        <td className="py-4 px-4 text-sm text-gray-300 font-medium">{index + 1}</td>

                        {/* Book */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-semibold text-gray-800 truncate">{item.book}</span>
                          </div>
                        </td>

                        {/* Detail */}
                        <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">{item.detail}</td>

                        {/* Price */}
                        <td className="py-4 px-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                          Rs. {item.price.toLocaleString('en-IN')}
                        </td>

                        {/* Sold By */}
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg font-medium whitespace-nowrap">
                            {item.soldBy}
                          </span>
                        </td>

                        {/* Sold On */}
                        <td className="py-4 px-4 text-sm text-gray-400 whitespace-nowrap">{item.soldOn}</td>

                        {/* Royalty */}
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1 justify-end">
                            <span className="text-sm font-extrabold text-emerald-600 whitespace-nowrap">
                              Rs. {item.royalty.toLocaleString('en-IN')}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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
                {royaltiesData.length === 0
                  ? 'No transactions found'
                  : `${royaltiesData.length} transaction${royaltiesData.length > 1 ? 's' : ''}`}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">Total :</span>
                <span className="text-xl font-extrabold text-gray-900">
                  Rs. {total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}