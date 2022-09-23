import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => {
    props.onChange(e);
  };
  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "abosulte",
          top: "100%",
          zIndex: "9999",
        }}
      >
        <Picker
          data={data}
          theme="dark"
          onEmojiSelect={selectEmoji}
          showPreview={false}
        />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
