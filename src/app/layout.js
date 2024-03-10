import { grey } from "@mui/material/colors";
import { Analytics } from "@vercel/analytics/react"



export default function RootLayout({ children }) {

  return (

      <html style={{ height: "100%" }} lang="en">
        <body style={{ minHeight: "100vh", position: "relative", background: "#343434", color: "white" }}>
          {children}
          <Analytics />
        </body>
      </html>

  );
}
