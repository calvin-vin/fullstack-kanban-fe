import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton variant="outlined" color="success" loading={loading}>
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
};

export default Home;
