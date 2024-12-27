import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const Home = lazy(() => import("./pages/Home.jsx"));

export default function App() {
  return (
    <div className="wrapper">
      <AuthProvider>
        <Header />
        <hr />
        <main>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <hr />
        <Footer />
      </AuthProvider>
    </div>
  );
}
