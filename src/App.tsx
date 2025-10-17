import AppRoutes from "./router/AppRoutes";
import Header from "./common/Components/Header";
import Footer from "./common/Components/Footer";

export default function App() {
 

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <AppRoutes />
      </main>

      <Footer/>
      
    </div>
  );
}
