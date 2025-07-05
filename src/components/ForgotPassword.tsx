import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForgotPasswordMutation } from "../services/api";

// Validation schema
const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
});

type FormData = typeof validation.__outputType;

export default function ForgotPassword() {
  const theme = useTheme();
  const [forgotPassword] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Email sent successfully!");
      reset();
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        component={motion.div}
        initial="hidden"
        animate="visible"
        variant="outlined"
        sx={{
          maxWidth: 400,
          flex: 1,
          mx: "auto",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
                Forgot Password
              </Typography>
            </Box>
            <TextField
              fullWidth
              type="text"
              placeholder="Email"
              label="Email"
              {...register("email")}
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              sx={{
                my: 2,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              Send Reset Link
            </Button>
            <Typography textAlign="right">
              <NavLink
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                Sign in
              </NavLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
