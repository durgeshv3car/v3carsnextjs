"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {



  return (
    <html lang="en">

      <body className={`${inter.className} bg-white`}>
        <Provider store={store}>
          {/* PersistGate ensures the state is rehydrated before rendering */}
          <PersistGate loading={null} persistor={persistor}>


            <main>
              {children}
            </main>

          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
