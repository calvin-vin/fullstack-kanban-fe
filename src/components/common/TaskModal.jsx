import { useState, useEffect, useRef } from "react";
import {
  Backdrop,
  Fade,
  IconButton,
  Modal,
  Box,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "../../css/custom-editor.css";
import taskAPI from "../../api/task";

const modalStyle = {
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
  height: "80%",
};

let timer;
const timeout = 500;
let isModalClosed = false;

const TaskModal = (props) => {
  const boardId = props.boardId;
  const [task, setTask] = useState(props.task);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorWrapperRef = useRef();

  useEffect(() => {
    setTask(props.task);
    setTitle(props.task !== undefined ? props.task.title : "");
    setContent(props.task !== undefined ? props.task.content : "");

    if (props.task !== undefined) {
      isModalClosed = false;
      updateEditorHeight();
    }
  }, [props.task]);

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current;
        box.querySelector(".ck-editor__editable_inline").style.height =
          box.offsetHeight - 50;
      }
    }, timeout);
  };

  const onClose = () => {
    isModalClosed = true;
    props.onUpdate(task);
    props.onClose();
  };

  const deleteTask = async () => {
    try {
      await taskAPI.delete(boardId, task.id);
      props.onDelete(task);
      setTask(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(async () => {
      try {
        await taskAPI.update(boardId, task.id, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, timeout);

    task.title = newTitle;
    setTitle(newTitle);
    props.onUpdate(task);
  };

  const updateContent = async (event, editor) => {
    clearTimeout(timer);
    const data = editor.getData();

    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskAPI.update(boardId, task.id, { content: data });
        } catch (err) {
          console.log(err);
        }
      }, timeout);

      task.content = data;
      setContent(data);
      props.onUpdate(task);
    }
  };

  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <IconButton variant="outlined" color="error" onClick={deleteTask}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              padding: "2rem 5rem 5rem",
            }}
          >
            <TextField
              value={title}
              onChange={updateTitle}
              placeholder="Untitled"
              variant="outlined"
              fullWidth
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset " },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2.5rem",
                  fontWeight: "700",
                },
                marginBottom: "10px",
              }}
            />
            <Typography variant="body2" fontWeight="700">
              {task !== undefined
                ? Moment(task.createdAt).format("YYYY-MM-DD")
                : ""}
            </Typography>
            <Divider sx={{ margin: "1.5rem 0" }} />
            <Box
              sx={{
                position: "relative",
                height: "80%",
                overflowX: "hidde",
                overflowY: "auto",
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={updateContent}
                onFocus={updateEditorHeight}
                onBlur={updateEditorHeight}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TaskModal;
