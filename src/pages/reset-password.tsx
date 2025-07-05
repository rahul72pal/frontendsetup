import { Box } from "@mui/material";
import ResetPassword from "../components/ResetPassword";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";


function Index() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("code");
  const type = params.get("type") as "reset-password" | "invite";

  return (
 <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
    <Box component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            p: 2,
          }}>
      <ResetPassword token={token!} type={type!} />
    </Box>
    </ErrorBoundary>
  );
}

export default Index;
