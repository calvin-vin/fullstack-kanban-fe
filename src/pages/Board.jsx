import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBoards } from "../redux/features/boardSlice";
import { setFavourites } from "../redux/features/favouriteSlice";
import boardAPI from "../api/board";
import EmojiPicker from "../components/common/EmojiPicker";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

let timer = 0;
let timeout = 500;

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardAPI.getOne(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavourite(res.favourite);
        setIcon(res.icon);
      } catch (err) {
        console.log(err);
      }
    };

    getBoard();
  }, [boardId]);

  const boards = useSelector((state) => state.board.value);
  const favouriteList = useSelector((state) => state.favourite.value);

  const onIconChange = async (e) => {
    const newIcon = e.native;
    const temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(e.native);
    dispatch(setBoards(temp));

    if (isFavourite) {
      const newIcon = e.native;
      const tempFavourites = [...favouriteList];
      const favouriteIndex = tempFavourites.findIndex((e) => e.id === boardId);
      tempFavourites[favouriteIndex] = {
        ...tempFavourites[favouriteIndex],
        icon: newIcon,
      };
      dispatch(setFavourites(tempFavourites));
    }

    try {
      await boardAPI.update(boardId, { icon: newIcon });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    const temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };
    dispatch(setBoards(temp));

    if (isFavourite) {
      const newTitle = e.target.value;
      const tempFavourites = [...favouriteList];
      const favouriteIndex = tempFavourites.findIndex((e) => e.id === boardId);
      tempFavourites[favouriteIndex] = {
        ...tempFavourites[favouriteIndex],
        title: newTitle,
      };
      dispatch(setFavourites(tempFavourites));
    }

    timer = setTimeout(async () => {
      try {
        await boardAPI.update(boardId, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    const temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], description: newDescription };
    dispatch(setBoards(temp));

    timer = setTimeout(async () => {
      try {
        await boardAPI.update(boardId, { description: newDescription });
      } catch (err) {
        console.log(err);
      }
    }, timeout);
  };

  const addFavourite = async () => {
    try {
      const board = await boardAPI.update(boardId, { favourite: !isFavourite });
      let newFavouritelist = [...favouriteList];

      if (isFavourite) {
        newFavouritelist = newFavouritelist.filter((e) => e.id !== boardId);
      } else {
        newFavouritelist.unshift(board);
      }

      dispatch(setFavourites(newFavouritelist));
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBoard = async () => {
    try {
      await boardAPI.delete(boardId);
      if (isFavourite) {
        const newFavouriteList = favouriteList.filter((e) => e.id !== boardId);
        dispatch(setFavourites(newFavouriteList));
      }

      const newList = boards.filter((e) => e.id !== boardId);
      if (newList.length === 0) {
        navigate("/boards");
      } else {
        navigate(`/boards/${newList[0].id}`);
      }
      dispatch(setBoards(newList));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton variant="outlined" onClick={addFavourite}>
          {isFavourite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteBoard}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          {/* emoji picker */}
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder="Add a description"
            variant="outlined"
            multiline
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8rem",
              },
            }}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button>Add Section</Button>
            <Typography variant="body2" fontWeight="700">
              {sections.length}
            </Typography>
          </Box>
          <Divider sx={{ margin: "10px 0" }} />
          {/* kanban board */}
        </Box>
      </Box>
    </>
  );
};

export default Board;
