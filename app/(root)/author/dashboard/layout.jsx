// app/(root)/author/dashboard/layout.jsx
// Wrap all dashboard pages so every page shares the same royalties value

import { AppProvider } from '../../../../components/Application/Author/RoyaltiesContext'; // adjust path
import { PageLoaderProvider } from '../../../../components/Application/Author/PageLoader'; // adjust path

export default function DashboardLayout({ children }) {
  return (
    <AppProvider>
      <PageLoaderProvider>
        {children}
      </PageLoaderProvider>
    </AppProvider>
  );
}