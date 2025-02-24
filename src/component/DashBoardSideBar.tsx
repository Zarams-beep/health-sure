"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GiHealthCapsule } from "react-icons/gi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { MdOutlinePayment, MdOutlineHealthAndSafety } from "react-icons/md";
import { GrView, GrFormEdit } from "react-icons/gr";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaUserDoctor, FaHospitalUser } from "react-icons/fa6";
import { CiHospital1 } from "react-icons/ci";
import { IoIosChatbubbles, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "@/styles/SideBar.module.css";

const DashboardSideBarPage = () => {
  const pathname = usePathname();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const router = useRouter();
  const [isHealthOpen, setIsHealthOpen] = useState<boolean>(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState<boolean>(false);

  const menuItems = [
    { name: "Landing Page", path: "/landing-page", icon: <RiDashboardHorizontalFill /> },
    { name: "Payment", path: "/landing-page/payment", icon: <MdOutlinePayment /> },
    { name: "Transaction", path: "/landing-page/transaction-history", icon: <GrTransaction /> },
    {
      name: "Manage Health",
      icon: <MdOutlineHealthAndSafety />,
      subItems: [
        { name: "View Health", path: "/landing-page/manage-health/view-health", icon: <GrView /> },
        { name: "Edit Health", path: "/landing-page/manage-health/edit-health", icon: <GrFormEdit /> },
      ],
      isOpen: isHealthOpen,
      toggle: () => setIsHealthOpen(!isHealthOpen),
    },
    {
      name: "Book Appointment",
      icon: <BsBookmarkHeartFill />,
      subItems: [
        { name: "Meet Doctor", path: "/landing-page/book-appointment/meet-doctor", icon: <FaUserDoctor /> },
        { name: "Visit Hospital", path: "/landing-page/book-appointment/visit-hospital", icon: <CiHospital1 /> },
        { name: "Appointment History", path: "/landing-page/book-appointment/appointment-history", icon: <FaHospitalUser /> },
      ],
      isOpen: isAppointmentOpen,
      toggle: () => setIsAppointmentOpen(!isAppointmentOpen),
    },
    { name: "Messages", path: "/landing-page/messages", icon: <IoIosChatbubbles /> },
  ];

  return (
    <aside
      className={`${styles.sidebar} sidebar ${sidebarExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      <div className={`${styles.sidebar2}`}>
        {!sidebarExpanded ? (
          <h2><GiHealthCapsule /></h2>
        ) : (
          <h2>
            <GiHealthCapsule />
            <div>
              <span>Health</span>
              <span>Sure</span>
            </div>
          </h2>
        )}

        <nav>
          <ul className="side-menu-list">
            {menuItems.map((item, index) =>
              item.subItems ? (
                <li key={index}>
                  <div className="side-menu-tab" onClick={item.toggle}>
                    <div className="side-menu-title">
                      {item.icon}
                      {sidebarExpanded && <p>{item.name}</p>}
                    </div>
                    {sidebarExpanded && (
                      <span className="dropdown-arrow">
                        {item.isOpen ? <IoIosArrowUp className="dropdown-icon"/> : <IoIosArrowDown className="dropdown-icon"/>}
                      </span>
                    )}
                  </div>
                  {item.isOpen && (
                    <ul className="dropdown-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={subItem.path}>
                            <div className={`side-menu-tab ${pathname === subItem.path ? "active-tab" : ""}`}>
                              <div className="side-menu-title">
                                {subItem.icon}
                                {sidebarExpanded && <p>{subItem.name}</p>}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <Link href={item.path}>
                    <div className={`side-menu-tab ${pathname === item.path ? "active-tab" : ""}`}>
                      <div className="side-menu-title">
                        {item.icon}
                        {sidebarExpanded && <p>{item.name}</p>}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSideBarPage;
