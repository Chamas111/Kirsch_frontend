import home from "../src/components/navbar/fotos/home.svg";
import profile from "../src/components/navbar/fotos/392531_account_friend_human_man_member_icon.svg";
export const menu = [
  {
    id: 1,
    title: "menu",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: home,
      },
      { id: 2, title: "Profile", url: "/users/1", icon: profile },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      { id: 1, title: "Users", url: "/users", icon: "users" },
      { id: 2, title: "Products", url: "/products", icon: "box" },
      { id: 3, title: "Orders", url: "/orders", icon: "cart" },
      { id: 4, title: "Posts", url: "/posts", icon: "file-text" },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      { id: 1, title: "Element", url: "/element", icon: "layers" },
      { id: 2, title: "Notes", url: "/notes", icon: "edit" },
      { id: 3, title: "Forms", url: "/forms", icon: "form" },
      { id: 4, title: "Calendar", url: "/calendar", icon: "calendar" },
    ],
  },
  {
    id: 4,
    title: "maintenance",
    listItems: [
      { id: 1, title: "Settings", url: "/settings", icon: "settings" },
      { id: 2, title: "Backups", url: "/backups", icon: "database" },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      { id: 1, title: "Charts", url: "/charts", icon: "bar-chart" },
      { id: 2, title: "Logs", url: "/logs", icon: "file" },
    ],
  },
];
