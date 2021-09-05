import { Box } from "@material-ui/core";

// for making the child to the center we need to
// add style ={{margin : auto }}

//we can give them these children height and width to change the size of
// centerlised component

export const MyCenterDiv = ({ display, width, height, children, style }) => {
  return (
    <Box display={display} width={width} height={height} style={style}>
      {children}
    </Box>
  );
};
