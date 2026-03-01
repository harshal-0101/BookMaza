'use client';

import {
  LayoutDashboard,
  IndianRupee,
  Building2,
  ArrowLeftRight,
  Lock,
  LogOut,
  User,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

// ✅ Paths match your actual folder: app/(root)/author/dashboard/...
// Next.js ignores the (root) group in the URL, so the real URLs are:
const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard',         path: '/author/dashboard'                  },
  { id: 'royalties', icon: IndianRupee,     label: 'Royalties',         path: '/author/dashboard/royalties'        },
  { id: 'bank',      icon: Building2,       label: 'Bank Detail',       path: '/author/dashboard/bank'             },
  { id: 'transfers', icon: ArrowLeftRight,  label: 'Royalty Transfers', path: '/author/dashboard/transfers'        },
  { id: 'password',  icon: Lock,            label: 'Change Password',   path: '/author/dashboard/change-password'  },
];

export default function Sidebar({
  isSidebarOpen,
  authorName     = 'Author Name',
  authorEmail    = 'author@bookmaza.com',
  totalRoyalties = 0,
  onLogout,
}) {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-80' : 'w-0'
      } bg-white shadow-xl transition-all duration-300 overflow-hidden flex-shrink-0`}
    >
      <div className="p-6 min-w-[320px]">

        {/* ── Profile Section ── */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-green-100 rounded-full flex items-center justify-center mb-4 overflow-hidden">
            <User className="w-20 h-20 text-gray-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-1">{authorName}</h2>
          <p className="text-sm text-gray-600 mb-4">{authorEmail}</p>

          <p className="text-green-600 font-bold text-lg mb-4">
            Royalties in account: ₹ {totalRoyalties}
          </p>

          <button
            onClick={() => router.push('/author/dashboard/profile')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            VIEW PROFILE
          </button>
        </div>

        {/* ── Navigation Menu ── */}
        <nav className="space-y-2">
          {menuItems.map(({ id, icon: Icon, label, path }) => {
            // Exact match only — prevents /author/dashboard matching /author/dashboard/royalties etc.
            const isActive = pathname === path;

            return (
              <button
                key={id}
                onClick={() => router.push(path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}