import './globals.css';

export const metadata = {
  title: 'Studio Bespoke Design — Dubai Interior Architecture',
  description: 'A home becomes personal when its plan begins to recognise the life inside it. Studio Bespoke Design — spatial renovation intelligence, Dubai.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
