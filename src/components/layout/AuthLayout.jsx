import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import authMiddleware from "../../middlewares/auth-middleware";
import Loading from "../common/Loading";
import assets from "../../assets";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authMiddleware.isAuthenticated();
      if (isAuth) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={assets.images.logoDark}
          style={{ width: "100px" }}
          alt="app logo"
        />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
