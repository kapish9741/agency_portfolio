import { Urbanist, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const getUrbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const getDancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    default: "Websual - Web Design & Digital Product Agency for Startups",
    template: "%s | Websual"
  },

  description:
    "Websual is a digital product design and web development agency helping startups and businesses build scalable, high-converting websites and digital experiences. Branding, UX/UI, and development aligned into one seamless process.",

  keywords: [
    "Web design agency for startups",
    "Digital product design agency",
    "UX UI design agency",
    "Website development for startups",
    "High converting website design",
    "Branding and web development agency",
    "Scalable website development"
  ],

  authors: [{ name: "Websual Agency" }],
  creator: "Websual",
  publisher: "Websual",

  metadataBase: new URL("https://www.websual.agency"),


  verification: {
    google: "Gf2juBB75E9TC8mSrGPmp6xraNjQ-18cYpaTwtY6hiU",
  },

  openGraph: {
    title: "Websual - Web Design & Digital Product Agency",
    description:
      "We design and build scalable digital products by aligning branding, UX/UI, and development into one seamless system.",
    url: "https://www.websual.agency",
    siteName: "Websual",
    images: [
      {
        url: "/Hero/Menu/Menu.png",
        width: 1200,
        height: 630,
        alt: "Websual - Digital Product & Web Design Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Websual - Digital Product & Web Design Agency",
    description:
      "Scalable websites and digital experiences for startups and growing businesses.",
    images: ["/Hero/Menu/Menu.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${getUrbanist.variable} ${getDancingScript.variable} antialiased`}>
        {children}
        <Analytics />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8WGLWV5NZD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8WGLWV5NZD');
          `}
        </Script>
      </body>
    </html>
  );
}
