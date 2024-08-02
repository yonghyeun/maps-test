import './globals.css';

import ReactQueryProvider from '@/components/ReactQueryProvider';
import StyledComponentRegistry from '@/lib/registry';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </StyledComponentRegistry>
      </body>
    </html>
  );
}
