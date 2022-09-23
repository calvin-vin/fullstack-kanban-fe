import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { setBoards } from "../redux/features/boardSlice";
import boardAPI from "../api/board";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    setLoading(true);
    try {
      const res = await boardAPI.create();
      dispatch(setBoards(res));
      navigate(`/boards/${res.id}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        loading={loading}
        onClick={createBoard}
      >
        Click here to create your first board
      </LoadingButton>
    </Box>
  );
};

export default Home;
