import { CakeIcon, CelebrationIcon, GroupsIcon, PersonAddOutlinedIcon, PersonOffOutlinedIcon, PersonOutlineIcon } from "../assets/icons/icon";

export const getIcon = (title) => {
  console.log('title', title)
  switch (title) {
    case 'Total Employees':
      return <GroupsIcon fontSize="large" />;
    case 'Active Employees':
      return <PersonOutlineIcon fontSize="large" />;
    case 'Inactive Employees':
      return <PersonOffOutlinedIcon fontSize="large" />;
    case 'New Employees':
      return <PersonAddOutlinedIcon fontSize="large" />;
    case 'Birthday':
      return <CakeIcon fontSize="large" />;
    case 'Holiday':
      return <CelebrationIcon fontSize="large" />;
  }
}

