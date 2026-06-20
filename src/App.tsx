import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Pending from "@/pages/Pending";
import Review from "@/pages/Review";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </Layout>
    </Router>
  );
}
