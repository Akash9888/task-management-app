import { SvgIconComponent } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarsIcon from "@mui/icons-material/Stars";
import TaskIcon from "@mui/icons-material/Task";
import BarChartIcon from "@mui/icons-material/BarChart";

interface MenuItem {
  id: number;
  title: string;
  icon: typeof DashboardIcon;
  link: string;
}

const menu: MenuItem[] = [
  {
    id: 1,
    title: "All Tasks",
    icon: DashboardIcon,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: StarsIcon,
    link: "/important",
  },
  {
    id: 3,
    title: "Completed!",
    icon: TaskIcon,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: BarChartIcon,
    link: "/incomplete",
  },
];

export default menu;
