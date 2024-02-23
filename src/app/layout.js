import { grey } from "@mui/material/colors";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background : "#343434", color : "white"}}>{children}</body>
    </html>
  );
}
