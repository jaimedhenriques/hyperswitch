import { lazy, Suspense } from 'react';
import Landing from './components/Landing';

const Workspace = lazy(() => import('./components/Workspace'));

export default function App() {
  if (window.location.pathname === '/app' || window.location.pathname.startsWith('/app/')) {
    return <Suspense fallback={<main className="page-loading" aria-busy="true">Opening your Avenra workspace…</main>}><Workspace /></Suspense>;
  }
  return <Landing />;
}
