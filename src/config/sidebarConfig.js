// src/config/sidebarConfig.js

// Pages where sidebar should NOT be shown
export const SIDEBAR_EXCLUDED_PAGES = [
  '/checkout',
  '/order',
  '/payment',
  '/login',
  '/register',
  '/profile/settings',
  '/admin',
  // Add more pages as needed
];

// Alternative: Pages where sidebar SHOULD be shown (if you prefer whitelist approach)
export const SIDEBAR_INCLUDED_PAGES = [
  '/',
  '/products',
  '/cart',
  '/products/list/search/',
  '/product/:category/:subcategory/:slug/:barcode',
  // Add more pages as needed
];

// Function to check if sidebar should be shown
export const shouldShowSidebar = (pathname) => {
  // Using blacklist approach (exclude specific pages)
  return !SIDEBAR_EXCLUDED_PAGES.includes(pathname);
  
  // Alternative: Using whitelist approach (include only specific pages)
  // return SIDEBAR_INCLUDED_PAGES.includes(pathname);
  
  // Alternative: Pattern matching for dynamic routes
  // return !pathname.startsWith('/admin') && !pathname.startsWith('/checkout');
};