import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { 
    HiArrowSmRight, 
    HiChartPie, 
    HiInbox, 
    HiShoppingBag, 
    HiTable, 
    HiUser, 
    HiViewBoards 
} from "react-icons/hi";
import logout from "../utils/auth/Logout";

const upperSideBarItem = [
    {
        name: "Dashboard",
        icon: HiChartPie,
        url: "#"
    },
    {
        name: "Users",
        icon: HiUser,
        url: "#"
    },
    {
        name: "Roles",
        icon: HiViewBoards,
        url: "#"
    },
];

const SidebarComponent = () => {
    const handleLogout = () => {
        logout();
    }
    return (
        <Sidebar aria-label="Sidebar with content separator example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
                {
                    upperSideBarItem.map((item, index) => (
                        <Sidebar.Item key={index} href={item.url} icon={item.icon}>
                            {item.name}
                        </Sidebar.Item>
                    ))
                }
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
                <Sidebar.Item
                        href="#"
                        key="logout"
                        icon={HiArrowSmRight}
                        onClick={handleLogout} // Handle logout action
                    >
                        Logout
                </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
    );
}

export default SidebarComponent;