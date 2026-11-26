import { Suspense, type ComponentType } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

export type PageMap = Record<string, ComponentType>;

export default function App({ pages }: { pages: PageMap }) {
  const { NotFound, ...rest } = pages;
  return (
    <Layout>
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <Routes>
          {Object.entries(rest).map(([path, C]) => (
            <Route key={path} path={path} element={<C />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
