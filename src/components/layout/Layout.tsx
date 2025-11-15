
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingActionButtons from '../common/FloatingActionButtons';
import Chatbot from '../common/Chatbot';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingActionButtons />
      <Chatbot />
    </div>
  );
};

export default Layout;
