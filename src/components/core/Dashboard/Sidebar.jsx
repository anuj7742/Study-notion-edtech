// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../../../data/dashboard-links"
// import { logout } from "../../../services/operations/authAPI"
// import ConfirmationModal from "../../common/ConfirmationModal"
// import SidebarLink from "./SidebarLink"  

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
    
//       <div>
//         <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//           <div className="flex flex-col">
//             {sidebarLinks.map((link) => {
//               if (link.type && user?.accountType !== link.type) return null
//               return (
//                 <SidebarLink key={link.id} link={link} iconName={link.icon} />
//               )
//             })}
//           </div>
//           <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
//           <div className="flex flex-col">
//             <SidebarLink
//               link={{ name: "Settings", path: "/dashboard/Settings" }}
//               iconName="VscSettingsGear"
//             />
//             <button
//               onClick={() =>
//                 setConfirmationModal({
//                   text1: "Are you sure?",
//                   text2: "You will be logged out of your account.",
//                   btn1Text: "Logout",
//                   btn2Text: "Cancel",
//                   btn1Handler: () => dispatch(logout(navigate)),
//                   btn2Handler: () => setConfirmationModal(null),
//                 })
//               }
//               className="px-8 py-2 text-sm font-medium text-richblack-300"
//             >
//               <div className="flex items-center gap-x-2">
//                 <VscSignOut className="text-lg" />
//                 <span>Logout</span>
//               </div>
//             </button>
//           </div>
//         </div>
//         {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      
//       </div>
//   )
// }


import React, { useRef, useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import ConfirmationModal from "../../common/ConfirmationModal";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const Sidebar = () => {
  const ref = useRef(null);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useOnClickOutside(ref, () => {setIsMenuOpen(false)});

  if (profileLoading || authLoading) {
    return <div className="mt-10 spinner"></div>;
  }


  return (
    <>
      <div className="text-white hidden md:flex">
        <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
          <div className="flex flex-col">
            {sidebarLinks.map((link, index) => {
              if (link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={index} link={link} iconName={link.icon} />
              );
            })}
          </div>

          <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600"></div>

          <div className="flex flex-col">
            <SidebarLink
              link={{ name: "Settings", path: "dashboard/settings" }}
              iconName="VscSettingsGear"
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure?",
                  text2: "You will be logged out of your account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="text-sm font-medium text-richblack-300 px-8 py-2"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
      <div className="text-white md:hidden flex">
        {!isMenuOpen ? (
          <div className="flex items-center min-w-[36px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 ">
            <button onClick={() => setIsMenuOpen(true)}>
              <HiOutlineMenuAlt2 fontSize={24} fill="#AFB2BF" />
            </button>
          </div>
        ) : (
          <>
            <div className="absolute z-50 flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 transition-all duration-200" ref={ref}>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end mb-4 mr-4"
              >
                <HiOutlineMenuAlt3 fontSize={24} fill="#AFB2BF" />
              </button>
              <div className="flex flex-col">
                {sidebarLinks.map((link, index) => {
                  if (link.type && user?.accountType !== link.type) return null;
                  return (
                    <SidebarLink key={index} link={link} iconName={link.icon} />
                  );
                })}
              </div>

              <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600"></div>

              <div className="flex flex-col">
                <SidebarLink
                  link={{ name: "Settings", path: "dashboard/settings" }}
                  iconName="VscSettingsGear"
                />

                <button
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are You Sure?",
                      text2: "You will be logged out of your account",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      btn1Handler: () => dispatch(logout(navigate)),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  className="text-sm font-medium text-richblack-300 px-8 py-2"
                >
                  <div className="flex items-center gap-x-2">
                    <VscSignOut className="text-lg" />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
