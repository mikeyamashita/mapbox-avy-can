import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from './providers/ReduxProvider';
import { UIProvider } from './providers/UIProvider';
import './globals.scss'

const APP_NAME = "AvyMap Test";
const APP_DEFAULT_TITLE = "Mapbox Nextjs";
const APP_TITLE_TEMPLATE = "%s - PWA Test App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  }
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
      </head>
      <body>
        <ReduxProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
