import { Box } from "@mui/material";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
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
      <LoginForm />
    </Box>
  );
};

export default Login;
