// src/components/Layout.js
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-grow">
      <Sidebar />
    <div className="flex-grow p-0">
      {children}
    </div>
  </div>
  );
};

export default Layout;
