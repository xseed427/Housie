import "@/styles/globals.css";
import React from "react";

export const metadata = {
  title: "Housie Empire",
  description: "Play Housie. Win Big. Live & Social",
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
