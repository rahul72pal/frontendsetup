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
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import PasswordInput from "./PasswordInput";

// Validation schema
const validation = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars are required")
    .max(16, "Maximum 16 chars allowed"),
});



type FormData = typeof validation.__outputType;

export default function LoginForm() {
  const theme = useTheme();
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data).unwrap();
      toast.success("User  logged in successfully!");
      navigate("/", { replace: true });
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
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                <b>Welcome!</b>
              </Typography>
              <Typography my={1}>Sign in to continue.</Typography>
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
            <PasswordInput
              fullWidth
              type="password"
              placeholder="Password"
              label="Password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register("password")}
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
              Log in
            </Button>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              mb={1}
            >
              {/* Uncomment to add social login buttons */}
              {/* <AppleLogin />
              <GoogleLogin />
              <LinkedInLogin />
              <FBLogin /> */}
            </Box>
            <Typography>
              Don&apos;t have an account?{" "}
              <NavLink
                to="/signup"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                Sign up
              </NavLink>
            </Typography>
            <Typography>
              <NavLink
                to="/forgot-password"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
              >
                Forgot password
              </NavLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
