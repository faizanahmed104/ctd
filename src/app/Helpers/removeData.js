import Cookies from 'js-cookie';

export const clearCookies = () => {
  const allCookies = Cookies.get(); // Get all cookies
  Object.keys(allCookies).forEach(cookieName => {
    Cookies.remove(cookieName, { path: '/' }); // Remove cookie with a path
    Cookies.remove(cookieName); // Remove cookie without specifying a path
  });
};

export const clearLocalStorage = () => {
  localStorage.clear(); // Clear all local storage data
};
