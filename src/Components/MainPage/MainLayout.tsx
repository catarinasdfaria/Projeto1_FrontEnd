import { Outlet } from 'react-router-dom';
import LeftMenu from './LeftMenu';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

function MainLayout() {
  return (
    <div className="app-body">
      <aside className="app-sidebar">
        <LeftMenu />
      </aside>
      <main className="app-main">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default MainLayout;
