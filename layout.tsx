import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vainitas Cool · Business OS',
  description: 'Dashboard privado de inversión, catálogo y rentabilidad de Vainitas Cool',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="es"><body>{children}</body></html>;
}