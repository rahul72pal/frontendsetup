import { Box } from "@mui/material";
import SignupForm from "../components/SignupForm";
import { motion } from "framer-motion";


const Register = () => {
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
      <SignupForm />
    </Box>
  );
};

export default Register;
