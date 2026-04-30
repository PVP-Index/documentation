import { Routes, Route } from 'react-router-dom';
import { DocsLayout } from './components/layout/DocsLayout';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":section/:slug" element={<DocPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
