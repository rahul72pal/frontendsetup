import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  useResetPasswordMutation,
  useVerfiyInvitationMutation,
} from "../services/api";
import PasswordInput from "./PasswordInput";
import { motion } from "framer-motion";
import { Box, Button } from "@mui/material";

const validation = yup.object({
  token: yup.string().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimumn 5 chars are required")
    .max(16, "Miximumn 16 chars allowed"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Comfirm password is required"),
});


type FormData = typeof validation.__outputType;

type Props = {
  token: string;
  type: "reset-password" | "invite";
};

export default function ResetPassword(props: Props) {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [verifyPassword] = useVerfiyInvitationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      confirmPassword: "",
      password: "",
      token: props.token,
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const action = props.type === "invite" ? verifyPassword : resetPassword;
      await action(data).unwrap();
      navigate("/login", { replace: true });
      toast.success("Password reset successfully, Please login!");
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  const MotionBox = motion(Box);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <MotionBox
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        initial="hidden"
        animate="visible"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <PasswordInput
          fullWidth
          type="password"
          placeholder="New password"
          label="New password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password")}
          sx={{ mb: 2 }}
        />
        <PasswordInput
          fullWidth
          type="password"
          placeholder="Confirm password"
          label="Confirm password"
          error={Boolean(errors.confirmPassword?.message)}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValid}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            py: 1.5,
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: 4,
            },
          }}
        >
          Change password
        </Button>
      </MotionBox>
    </Box>
  );
}
