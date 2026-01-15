import "./globals.css";

export const metadata = {
  title: "IRA – Student Project Marketplace",
  description: "Build · Learn · Earn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
