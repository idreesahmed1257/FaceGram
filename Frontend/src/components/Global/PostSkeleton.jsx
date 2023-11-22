import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

export default function PostSkeleton({ loading }) {
  return (
    <>
      {loading &&
        <Box sx={{ display: "flex", flexDirection: 'column', width: 500 }}>
          <Box sx={{ margin: 1, display: 'flex', gap: '5px' }} >
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          </Box>
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: "57%" }} />
          </Skeleton>
        </Box>}
    </>
  );
}
