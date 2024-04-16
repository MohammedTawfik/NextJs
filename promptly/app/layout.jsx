import "@styles/globals.css";
import CustomNavBar from "@components/Nav";

export const metadata = {
  title: "Promptly",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <CustomNavBar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
