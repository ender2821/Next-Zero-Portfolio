export const metadata = {
  title: "Andrew Bruening CMS",
  description: "content management system for this portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
