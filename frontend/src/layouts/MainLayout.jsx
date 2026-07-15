import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-obsidian-900 flex flex-col">
      {/* 
        Aqui poderíamos ter um Header global caso fosse necessário.
        No caso da Landing Page B2B Portalis, vamos manter o topo limpo. 
      */}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
