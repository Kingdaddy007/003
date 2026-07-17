import './globals.css';

export const metadata = {
  title: 'Studio Bespoke Design | Dubai Interior Architecture',
  description:
    'A home becomes personal when its plan begins to recognize the life inside it. Studio Bespoke Design, Dubai.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F9F8F6',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
