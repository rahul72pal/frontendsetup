import { Box } from "@mui/material";
import ForgotPassword from "../components/ForgotPassword";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";


function Index() {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
    <Box
      component={motion.div}
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
      }}
    >
      <ForgotPassword />
    </Box>
    </ErrorBoundary>
  );
}

export default Index;
