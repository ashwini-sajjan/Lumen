import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layoutd = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Sidebar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layoutd;
