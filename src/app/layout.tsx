import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EV Range Calculator | Convert Distance to Battery Usage',
  description: 'Free EV range calculator. Convert kilometers to battery usage instantly. Accurate for Tesla, BYD and all electric vehicles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#121516] text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
