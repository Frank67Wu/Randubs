import { grey } from "@mui/material/colors";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background : "#F0F8FF"}}>{children}</body>
    </html>
  );
}
