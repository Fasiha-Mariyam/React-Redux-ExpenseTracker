import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import DeleteBtn from './DeleteBtn'; // Import your three dots button component

const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'black',
  cursor:"pointer",
  backgroundColor: 'background.paper',
  "&:hover": {
    border: '1px solid',
    borderColor: "blue",
    color:"blue" 
  },
};

export default function CategoryList({category,deleteBtn,id,value}) {
  return (
    <List sx={style}>
      <ListItem>
        <ListItemText secondary={value} primary={category.categoryName} />
        <Box sx={{ marginLeft: 'auto' }}>
      { deleteBtn &&   <DeleteBtn id={id}/> }
        </Box>
      </ListItem>
      <Divider />
    </List>
  );
}
