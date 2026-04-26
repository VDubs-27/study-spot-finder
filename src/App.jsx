import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./assets/pages/Landing";
import Product from "./assets/pages/Product";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/browse" element={<Product />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}