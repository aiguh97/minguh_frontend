import {
  BellRingIcon,
  Home,
  Settings,
  User,
  Lock,
  BookOpenText,
} from "lucide-react";

export const menuSidebar = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
 
  {
    title: "Sessions",
    url: "/sessions",
    icon: Lock,
  },
  {
    title: "Account",
    url: "#",
    icon: User,
  },
  {
    title: "Article",
    url: "/articles",
    icon: BookOpenText,
  },
   {
    title: "Push Notifications",
    url: "/notificationPages",

    icon: BellRingIcon,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
