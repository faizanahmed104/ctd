import { Poppins, Manrope } from "next/font/google";
import "./globals.css";
import AppProvider from "./Context";
import { Providers } from "./Providers";
import ToastContext from "./Context/ToastContext"
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'], // or 'latin-ext' if needed
  weight: ['400', '600', '700'], // Add other weights as required
  variable: '--font-poppins', // Optional CSS variable
});

const manrope = Manrope({
  subsets: ['latin'], // or 'latin-ext' if needed
  weight: ['400', '500', '700'], // Add other weights as required
  variable: '--font-manrope', // Optional CSS variable
});
export const metadata = {
  title: "Carbon Track | Dashboard",
  description: "This is Dashboard page for Carbon Track",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${manrope.variable} antialiased`}
      >
        <AppProvider>
          <Providers>
            <ToastContext />
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </Providers>
        </AppProvider>
      </body>
    </html>
  );
}
