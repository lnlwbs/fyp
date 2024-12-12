import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/NavBar';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import ContactUsPage from './pages/ContactUsPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import RegisterPage from './pages/RegisterPage';
import Inventory from './pages/Inventory';
import Users from './pages/Users';
import CheckoutPage from './pages/CheckoutPage';
import ProductList from './components/Admin/ProductList';  // Import your RecordList component
import Product from './components/Admin/AddProduct';        // Import Record component for create/edit
import UserList from './components/Admin/UserList';        // Import Record component for create/edit
import OrderList from './components/Admin/OrderList';           
import AdminLoginPage from './pages/AdminLoginPage';        
import Info from './components/Info';        
import './index.css';


// Layout Component that wraps the page content and includes an Outlet for child routes
const Layout = () => {
  const location = useLocation();

  // Check if the current route is AdminPage or ContactUsPage
  const isAdminPage = location.pathname === '/AdminPage';
  const isContactPage = location.pathname === '/ContactUsPage';
  const isInventory = location.pathname === '/Inventory';
  const isUsers = location.pathname === '/Users';
  const isCreate = location.pathname === '/create';
  const isProduct = location.pathname === '/Products';
  const isOrder = location.pathname === '/OrderPage';
  const isAdminLoginPage = location.pathname === '/AdminLoginPage';


  return (
    <>
      {/* Conditionally render Navbar and ContactUs components */}
      {!isAdminPage && !isInventory && !isCreate &&  !isProduct && !isUsers && !isOrder && <Navbar />}
      {!isAdminPage && !isContactPage && !isInventory && !isCreate && !isUsers && !isOrder && !isAdminLoginPage&&<ContactUs />}

      {/* Main content (children or Outlet) */}
      <Outlet /> {/* This is where child routes will be rendered */}

      {/* Conditionally render Footer */}
      {!isAdminPage && !isInventory && !isCreate &&  !isProduct && !isUsers && !isOrder && <Footer />}
    </>
  );
};

// Main App component where routes are defined
const App = () => {
  return (
    <Routes>
      {/* Wrap all routes with Layout */}
      <Route path="/" element={<Layout />}>
        {/* Route for the home page */}
        <Route index element={<HomePage />} />

        {/* Other pages */}
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/ContactUsPage" element={<ContactUsPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />
        <Route path="/AdminLoginPage" element={<AdminLoginPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />


        
        <Route path="/Users" element={<Users />}>
          <Route index element={<UserList />} /> {/* Default child route is RecordList */}
        </Route>

        {/* Inventory route with Outlet to render child components */}
        <Route path="/Inventory" element={<Inventory />}>
          <Route index element={<ProductList />} /> {/* Default child route is RecordList */}
        </Route>
        <Route path="/OrderPage" element={<OrderPage />}>
          <Route index element={<OrderList />} /> {/* Default child route is RecordList */}
        </Route>


        {/* Add Create and Edit routes */}
        <Route path="/create" element={<Product />} /> {/* Create a new record */}
        <Route path="/edit/:id" element={<Product />} /> {/* Edit an existing record with dynamic id */}
      </Route>
    </Routes>
  );
};

// Wrap App in Router to ensure proper routing functionality
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
