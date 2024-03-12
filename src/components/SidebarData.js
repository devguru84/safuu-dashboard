import React from "react";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <FiIcons.FiLayers />,
    cName: "nav-text",
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <FaIcons.FaUserCircle />,
    cName: "nav-text",
  },
  {
    title: "Calculator",
    path: "/calculator",
    icon: <AiIcons.AiOutlineCalculator />,
    cName: "nav-text",
  },
  {
    title: "Swap",
    path: "https://pancakeswap.finance/swap?outputCurrency=0xb00b5a85181305c6f5e072e56c2bf8240e0747bd",
    icon: <AiIcons.AiOutlineThunderbolt />,
    cName: "nav-text",
  },
  {
    title: "Treasury",
    path: "/treasury",
    icon: <AiIcons.AiOutlineContainer />,
    cName: "nav-text",
  },
  {
    title: "Docs",
    path: "https://suuper-protocol.gitbook.io/suuperprotocol/",
    icon: <HiIcons.HiOutlineDocumentText />,
    cName: "nav-text",
  },
];
