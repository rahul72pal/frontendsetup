import { Box, CircularProgress, Typography } from "@mui/material";
import { useMeQuery } from "../services/api";
import { useAppSelector } from "../store/store";
import ChangePassword from "../components/ChangePassword";
import UserProfile from "../components/UserProfile";
import { ErrorBoundary } from "react-error-boundary";
import FallbackUI from "../components/FallbackUI";

const Profile = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useMeQuery(undefined, { skip: !isAuthenticated });

  if (isLoading) {
    return (
      <Box
        width="100vw"
        padding={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        width="100vw"
        padding={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography textAlign="center">Profile not found!</Typography>
      </Box>
    );
  }

  return (
    <ErrorBoundary fallback={<FallbackUI/>}>
    <Box>
      <UserProfile data={data.data} />
      <ChangePassword user={data.data} />
    </Box>
    </ErrorBoundary>
  );
};

export default Profile;
