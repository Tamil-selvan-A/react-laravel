import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Master() {
    return (
        <>
            <Header />
            <main className="container py-3">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Master