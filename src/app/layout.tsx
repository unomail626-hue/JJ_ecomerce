// import type { Metadata } from "next";
// import { CartProvider } from "@/context/CartContext";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import GoogleAnalytics from "@/components/GoogleAnalytics";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "J&J Tecidos e Aviamentos",
//   description:
//     "Sua loja de tecidos, aviamentos e soluções para confecção em Campinas.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="pt-BR">
//       <head>
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>
//         <GoogleAnalytics />
//         <CartProvider>
//           <Header />
//           <main>{children}</main>
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }
