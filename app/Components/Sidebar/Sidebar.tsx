"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import menu from "@/app/Utils/menuList";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Menu from "@mui/icons-material/Menu";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function Slider(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (link: string) => {
    router.push(link);
  };

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="bg-white text-black h-full">
      <CssBaseline />
      <div className="p-2">
        <Toolbar></Toolbar>
        <Divider />

        <List>
          {menu.map((menu) => (
            <ListItem
              key={menu.id}
              disablePadding
              className={
                pathname === menu.link ? " text-blue-500 " : "text-black"
              }
              onClick={() => {
                handleClick(menu.link);
              }}
            >
              {" "}
              <Link href={menu.link} passHref>
                <ListItemButton>
                  <ListItemIcon>
                    <menu.icon
                      className={
                        pathname === menu.link
                          ? " text-blue-500 "
                          : "text-black"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Box>
  );
}
