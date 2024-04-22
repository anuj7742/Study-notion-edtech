// // // import React, { useState, useEffect } from 'react'
// // // import { Link, matchPath, useLocation } from 'react-router-dom'
// // // import logo from "../../assets/Logo/Logo-Full-Light.png"
// // // import { NavbarLinks } from "../../data/navbar-links"
// // // import { useSelector } from 'react-redux'
// // // import { FaCartShopping } from "react-icons/fa6";
// // // import ProfileDropDown from '../core/Auth/ProfileDropDown'
// // // import { apiConnector } from '../../services/apiconnector'
// // // import { categories } from '../../services/apis'
// // // import { IoIosArrowDropdownCircle } from "react-icons/io";
// // // import { AiOutlineMenu } from 'react-icons/ai'

// // // // const subLinks = [
// // // //     {
// // // //         title: "Python",
// // // //         link: "/catalog/python"
// // // //     },
// // // //     {
// // // //         title: "Web Dev",
// // // //         link: "/catalog/web-development"
// // // //     }
// // // // ]


// // // const Navbar = () => {

// // //     const { token } = useSelector((state) => state.auth);
// // //     const { user } = useSelector((state) => state.profile);
// // //     const { totalItems } = useSelector((state) => state.cart)

// // //     const location = useLocation();

// // //     // const [subLinks, setSubLinks] = useState([])

// // //     const [subLinks, setSubLinks] = useState([])
// // //     const [loading, setLoading] = useState(false)

// // //     useEffect(() => {
// // //         ; (async () => {
// // //             setLoading(true)
// // //             try {
// // //                 const res = await apiConnector("GET", categories.CATEGORIES_API)
// // //                 setSubLinks(res.data.data)
// // //                 console.log(res.data.data)
// // //             } catch (error) {
// // //                 console.log("Could not fetch Categories.", error)
// // //             }
// // //             setLoading(false)
// // //         })()
// // //     }, [])
// // //     // console.log("Sublink",subLinks)

// // //     const matchRoute = (route) => {
// // //         return matchPath({ path: route }, location.pathname)
// // //     }
// // //     return (
// // //         <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
// // //             } transition-all duration-200`}>
// // //             <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
// // //                 {/* LOGO */}
// // //                 <Link to={"/"}>
// // //                     <img src={logo} width={160} height={42} loading='lazy' />
// // //                 </Link>

// // //                 {/* Nav Links */}
// // //                 <nav className='hidden lg:block'>
// // //                     <ul className=' flex gap-x-6 text-richblack-25'>
// // //                         {
// // //                             NavbarLinks.map((link, index) => (
// // //                                 <li key={index}>
// // //                                     {
// // //                                         link.title === "Catalog" ? (
// // //                                             <div className='relative flex gap-2 items-center cursor-pointer group'>
// // //                                                 <p>{link.title}</p>
// // //                                                 <IoIosArrowDropdownCircle />

// // //                                                 <div className='invisible absolute left-[50%] translate-x-[-50%] 
// // //                                             translate-y-[50%] top-[50%]
// // //                                              flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 
// // //                                              opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
// // //                                               lg:w-[300px] z-10'>
// // //                                                     <div className='absolute left-[50%] translate-x-[80%] translate-y-[-45%]
// // //                                                     top-0 h-6 w-6 rotate-45 rounded
// // //                                                  bg-richblack-5 '> </div>
// // //                                                     {loading ? (
// // //                                                         <p className="text-center">Loading...</p>
// // //                                                     ) : (subLinks && subLinks.length) ? (
// // //                                                         <>
// // //                                                             {subLinks
// // //                                                                 ?.filter(
// // //                                                                     (subLink) => subLink?.courses?.length > 0
// // //                                                                 )
// // //                                                                 ?.map((subLink, i) => (
// // //                                                                     <Link
// // //                                                                         to={`/catalog/${subLink.name
// // //                                                                             .split(" ")
// // //                                                                             .join("-")
// // //                                                                             .toLowerCase()}`}
// // //                                                                         className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
// // //                                                                         key={i}
// // //                                                                     >
// // //                                                                         <p>{subLink.name}</p>
// // //                                                                     </Link>
// // //                                                                 ))}
// // //                                                         </>
// // //                                                     ) : (
// // //                                                         <p className="text-center">No Courses Found</p>
// // //                                                     )}
// // //                                                 </div>
// // //                                             </div>
// // //                                         ) : (
// // //                                             <Link to={link?.path}>
// // //                                                 <p className={`${matchRoute(link?.path) ? "text-yellow-25" : " text-richblack-25 hover:text-richblack-100"} `}>
// // //                                                     {link.title}
// // //                                                 </p>

// // //                                             </Link>
// // //                                         )
// // //                                     }
// // //                                 </li>
// // //                             ))
// // //                         }

// // //                     </ul>
// // //                 </nav>

// // //                 {/* login/signup/Dashboard */}
// // //                 <div className='flex gap-x-4 items-center'>
// // //                     {
// // //                         user && user?.accountType !== "Instructor" && (
// // //                             <Link to="/dashboard/cart" className='relative'>
// // //                                 <FaCartShopping className="text-2xl text-richblack-100" />
// // //                                 {
// // //                                     totalItems > 0 && (
// // //                                         <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
// // //                                             {totalItems}
// // //                                         </span>
// // //                                     )
// // //                                 }
// // //                             </Link>
// // //                         )
// // //                     }
// // //                     {
// // //                         token === null && (
// // //                             <Link to="/login">
// // //                                 <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] 
// // //                                   text-richblack-100 rounded-[8px] transition-all duration-200 hover:bg-richblack-600 hover:text-richblack-25 hover:scale-95'>
// // //                                     Log in
// // //                                 </button>
// // //                             </Link>
// // //                         )
// // //                     }
// // //                     {
// // //                         token === null && (
// // //                             <Link to="/signup">
// // //                                 <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] 
// // //                                   text-richblack-100 rounded-[8px] transition-all duration-200 hover:bg-richblack-600 hover:text-richblack-25 hover:scale-95'>
// // //                                     Sign Up
// // //                                 </button>
// // //                             </Link>
// // //                         )
// // //                     }
// // //                     {
// // //                         token !== null && <ProfileDropDown />
// // //                     }


// // //                 </div>


// // //             </div>
// // //         </div>
// // //     )
// // // }

// // // export default Navbar

// // import { useEffect, useState } from "react"
// // import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// // import { BsChevronDown } from "react-icons/bs"
// // import { useSelector } from "react-redux"
// // import { Link, matchPath, useLocation } from "react-router-dom"

// // import logo from "../../assets/Logo/Logo-Full-Light.png"
// // import { NavbarLinks } from "../../data/navbar-links"
// // import { apiConnector } from "../../services/apiconnector"
// // import { categories } from "../../services/apis"
// // import { ACCOUNT_TYPE } from "../../utils/constants"
// // import ProfileDropdown from "../core/Auth/ProfileDropDown"

// // function Navbar() {
// //   const { token } = useSelector((state) => state.auth)
// //   const { user } = useSelector((state) => state.profile)
// //   const { totalItems } = useSelector((state) => state.cart)
// //   const location = useLocation()

// //   const [subLinks, setSubLinks] = useState([])
// //   const [loading, setLoading] = useState(false)

// //   useEffect(() => {
// //     ;(async () => {
// //       setLoading(true)
// //       try {
// //         const res = await apiConnector("GET", categories.CATEGORIES_API)
// //         setSubLinks(res.data.data)
// //       } catch (error) {
// //         console.log("Could not fetch Categories.", error)
// //       }
// //       setLoading(false)
// //     })()
// //   }, [])

// //   // console.log("sub links", subLinks)

// //   const matchRoute = (route) => {
// //     return matchPath({ path: route }, location.pathname)
// //   }

// //   return (
// //     <div
// //       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
// //         location.pathname !== "/" ? "bg-richblack-800" : ""
// //       } transition-all duration-200`}
// //     >
// //       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
// //         {/* Logo */}
// //         <Link to="/">
// //           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
// //         </Link>
// //         {/* Navigation links */}
// //         <nav className="hidden md:block">
// //           <ul className="flex gap-x-6 text-richblack-25">
// //             {NavbarLinks.map((link, index) => (
// //               <li key={index}>
// //                 {link.title === "Catalog" ? (
// //                   <>
// //                     <div
// //                       className={`group relative flex cursor-pointer items-center gap-1 ${
// //                         matchRoute("/catalog/:catalogName")
// //                           ? "text-yellow-25"
// //                           : "text-richblack-25"
// //                       }`}
// //                     >
// //                       <p>{link.title}</p>
// //                       <BsChevronDown />
// //                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
// //                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
// //                         {loading ? (
// //                           <p className="text-center">Loading...</p>
// //                         ) : (subLinks && subLinks.length) ? (
// //                           <>
// //                             {subLinks
// //                                 ?.filter(
// //                                 (subLink) => subLink?.courses?.length > 0
// //                               )
// //                               ?.map((subLink, i) => (
// //                                 <Link
// //                                   to={`/catalog/${subLink.name
// //                                     .split(" ")
// //                                     .join("-")
// //                                     .toLowerCase()}`}
// //                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
// //                                   key={i}
// //                                 >
// //                                   <p>{subLink.name}</p>
// //                                 </Link>
// //                               ))}
// //                           </>
// //                         ) : (
// //                           <p className="text-center">No Courses Found</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <Link to={link?.path}>
// //                     <p
// //                       className={`${
// //                         matchRoute(link?.path)
// //                           ? "text-yellow-25"
// //                           : "text-richblack-25"
// //                       }`}
// //                     >
// //                       {link.title}
// //                     </p>
// //                   </Link>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>
// //         </nav>
// //         {/* Login / Signup / Dashboard */}
// //         <div className="hidden items-center gap-x-4 md:flex">
// //           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
// //             <Link to="/dashboard/cart" className="relative">
// //               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
// //               {totalItems > 0 && (
// //                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
// //                   {totalItems}
// //                 </span>
// //               )}
// //             </Link>
// //           )}
// //           {token === null && (
// //             <Link to="/login">
// //               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
// //                 Log in
// //               </button>
// //             </Link>
// //           )}
// //           {token === null && (
// //             <Link to="/signup">
// //               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
// //                 Sign up
// //               </button>
// //             </Link>
// //           )}
// //           {token !== null && <ProfileDropdown />}
// //         </div>
// //         <button className="mr-4 md:hidden">
// //           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />

// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Navbar




// import React, { useState, useEffect, useRef } from "react";
// import { Link, matchPath, useLocation } from "react-router-dom";
// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { useSelector } from "react-redux";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropdown from "../core/Auth/ProfileDropDown";
// import { apiConnector } from "../../services/apiconnector";
// import { categories } from "../../services/apis";
// import { BsChevronDown } from "react-icons/bs";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { ACCOUNT_TYPE } from "../../utils/constants";
// import useOnClickOutside from "../../hooks/useOnClickOutside";

// const Navbar = () => {
//   const ref = useRef(null);
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);

//   const [ssubLinks, setSsubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [isMobile, setIsMobile] = useState(false);
//   const [showMenuIcon, setShowMenuIcon] = useState(false);

//   const fetchSsubLinks = async () => {
//     setLoading(true);
//     try {
//       const result = await apiConnector("GET", categories.CATEGORIES_API);
//       // console.log("Sublink data",result)
//       setSsubLinks(result?.data?.data);
//     } catch (error) {
//       console.log("Cannot fetch the category list");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchSsubLinks();
//   }, []);

//   const location = useLocation();

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   const handleMobileMenu = () => {
//     setIsMobile(!isMobile);
//   };

//   useOnClickOutside(ref, () => {
//     setIsMobile(false);
//     setShowMenuIcon(false)
//   });

//   return (
//     <>
//       <div
//         className={`w-full flex h-14 z-50 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
//           } transition-all duration-200`}
//       >
//         <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//           <Link to="/">
//             <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
//           </Link>

//           <nav className="hidden md:block">
//             <ul className="flex gap-x-6 text-richblack-25">
//               {NavbarLinks.map((link, index) => (
//                 <li key={index}>
//                   {link.title === "Catalog" ? (
//                     <div
//                       className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                         }`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />

//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : ssubLinks.length ? (
//                           ssubLinks
//                             ?.filter((subLink) => subLink?.courses?.length > 0)
//                             ?.map((sublink, index) => (
//                               <Link
//                                 className="hover:bg-richblack-50 p-2 rounded-md font-medium hover:font-semibold"
//                                 to={`/catalog/${sublink.name
//                                   .split(" ")
//                                   .join("-")
//                                   .toLowerCase()}`}
//                                 key={index}
//                               >
//                                 <p className="capitalize">{sublink.name}</p>
//                               </Link>
//                             ))
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   ) : (
//                     <Link to={link?.path} >
//                       <p
//                         className={`${matchRoute(link?.path)
//                             ? "text-yellow-25"
//                             : "text-richblack-25"
//                           }`}
//                       >
//                         {link.title}
//                       </p>
//                     </Link>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="hidden gap-x-4 items-center md:flex">
//             {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//               <Link to="/dashboard/cart" className="relative">
//                 <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                 {totalItems > 0 && (
//                   <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/login">
//                 <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
//                   Log In
//                 </button>
//               </Link>
//             )}
//             {token === null && (
//               <Link to="/signup">
//                 <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
//                   Sign Up
//                 </button>
//               </Link>
//             )}
//             {token !== null && <ProfileDropdown />}
//           </div>
//           <div ref={ref} className="md:hidden">
//             {!showMenuIcon ? (
//               <button
//                 onClick={() => {
//                   handleMobileMenu();
//                   setShowMenuIcon(true);
//                 }}
//                 className="mr-4 md:hidden"
//               >
//                 <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//               </button>
//             ) : (
//               <button
//                 onClick={(e) => {
//                   setShowMenuIcon(false);
//                   e.stopPropagation()
                  
//                 }}
//                 className="mr-4 md:hidden"
//               >
//                 <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       {isMobile && (
//         <>
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className={`absolute top-14 flex h-fit z-50 w-full items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 transition-all duration-200 rounded-b-xl`}
//             ref={ref}
//           >
//             <div className="w-11/12 max-w-maxContent items-center my-4">
//               <nav className="md:hidden w-full">
//                 <ul className="flex flex-col gap-x-6 text-richblack-25 gap-y-4">
//                   {NavbarLinks.map((link, index) => (
//                     <li key={index} className="w-full">
//                       {link.title === "Catalog" ? (
//                         <div
//                           className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
//                               ? "text-yellow-25"
//                               : "text-richblack-25"
//                             }`}
//                         >
//                           <p>{link.title}</p>
//                           <BsChevronDown />

//                           <div className="invisible absolute left-[25%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                             <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                             {loading ? (
//                               <p className="text-center">Loading...</p>
//                             ) : ssubLinks.length ? (
//                               ssubLinks
//                                 ?.filter(
//                                   (subLink) => subLink?.courses?.length > 0
//                                 )
//                                 ?.map((sublink, index) => (
//                                   <Link
//                                     className="hover:bg-richblack-50 p-2 rounded-md font-medium hover:font-semibold"
//                                     to={`/catalog/${sublink.name
//                                       .split(" ")
//                                       .join("-")
//                                       .toLowerCase()}`}
//                                     key={index}
//                                     onClick={() => setIsMobile(false)}
//                                   >
//                                     <p className="capitalize">{sublink.name}</p>
//                                   </Link>
//                                 ))
//                             ) : (
//                               <p className="text-center">No Courses Found</p>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         <Link
//                           to={link?.path}
//                           onClick={() => setIsMobile(false)}
//                         >
//                           <p
//                             className={`${matchRoute(link?.path)
//                                 ? "text-yellow-25"
//                                 : "text-richblack-25"
//                               }`}
//                           >
//                             {link.title}
//                           </p>
//                         </Link>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </nav>

//               <div className="md:hidden gap-x-4 items-center flex mt-4">
//                 {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//                   <Link
//                     to="/dashboard/cart"
//                     className="relative"
//                     onClick={() => setIsMobile(false)}
//                   >
//                     <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//                     {totalItems > 0 && (
//                       <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                         {totalItems}
//                       </span>
//                     )}
//                   </Link>
//                 )}
//                 {token === null && (
//                   <Link to="/login" onClick={() => setIsMobile(false)}>
//                     <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
//                       Log In
//                     </button>
//                   </Link>
//                 )}
//                 {token === null && (
//                   <Link to="/signup" onClick={() => setIsMobile(false)}>
//                     <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
//                       Sign Up
//                     </button>
//                   </Link>
//                 )}
//                 {token !== null && <ProfileDropdown isMobile={isMobile} />}
//               </div>
//             </div>
//           </div>
//           <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
//         </>
//       )}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../utils/constants";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Navbar = () => {
  const ref = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [ssubLinks, setSsubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [showMenuIcon, setShowMenuIcon] = useState(false);

  const fetchSsubLinks = async () => {
    setLoading(true);
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSsubLinks(result?.data?.data);
    } catch (error) {
      console.log("Cannot fetch the category list");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSsubLinks();
  }, []);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  useOnClickOutside(ref, () => {
    setIsMobile(false);
    setShowMenuIcon(false)
  });

  return (
    <>
      <div
        className={`flex h-14 z-50 items-center justify-center border-b-[1px] border-b-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />

                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : ssubLinks.length ? (
                          ssubLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((sublink, index) => (
                              <Link
                                className="hover:bg-richblack-50 p-2 rounded-md font-medium hover:font-semibold"
                                to={`/catalog/${sublink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={index}
                              >
                                <p className="capitalize">{sublink.name}</p>
                              </Link>
                            ))
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden gap-x-4 items-center md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
                  Log In
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
                  Sign Up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropdown />}
          </div>
          <div ref={ref} className="md:hidden">
            {!showMenuIcon ? (
              <button
                onClick={() => {
                  handleMobileMenu();
                  setShowMenuIcon(true);
                }}
                className="mr-4 md:hidden"
              >
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMenuIcon(false);
                }}
                className="mr-4 md:hidden"
              >
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
              </button>
            )}
          </div>
        </div>
      </div>
      {isMobile && (
        <>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-14 flex h-fit z-50 w-full items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 transition-all duration-200 rounded-b-xl`}
            ref={ref}
          >
            <div className="w-11/12 max-w-maxContent items-center my-4">
              <nav className="md:hidden w-full">
                <ul className="flex flex-col gap-x-6 text-richblack-25 gap-y-4">
                  {NavbarLinks.map((link, index) => (
                    <li key={index} className="w-full">
                      {link.title === "Catalog" ? (
                        <div
                          className={`group relative flex cursor-pointer items-center gap-1 ${
                            matchRoute("/catalog/:catalogName")
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          <p>{link.title}</p>
                          <BsChevronDown />

                          <div className="invisible absolute left-[25%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                            {loading ? (
                              <p className="text-center">Loading...</p>
                            ) : ssubLinks.length ? (
                              ssubLinks
                                ?.filter(
                                  (subLink) => subLink?.courses?.length > 0
                                )
                                ?.map((sublink, index) => (
                                  <Link
                                    className="hover:bg-richblack-50 p-2 rounded-md font-medium hover:font-semibold"
                                    to={`/catalog/${sublink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    key={index}
                                    onClick={() => setIsMobile(false)}
                                  >
                                    <p className="capitalize">{sublink.name}</p>
                                  </Link>
                                ))
                            ) : (
                              <p className="text-center">No Courses Found</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={link?.path}
                          onClick={() => setIsMobile(false)}
                        >
                          <p
                            className={`${
                              matchRoute(link?.path)
                                ? "text-yellow-25"
                                : "text-richblack-25"
                            }`}
                          >
                            {link.title}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="md:hidden gap-x-4 items-center flex mt-4">
                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link
                    to="/dashboard/cart"
                    className="relative"
                    onClick={() => setIsMobile(false)}
                  >
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {totalItems > 0 && (
                      <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                {token === null && (
                  <Link to="/login" onClick={() => setIsMobile(false)}>
                    <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
                      Log In
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup" onClick={() => setIsMobile(false)}>
                    <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md">
                      Sign Up
                    </button>
                  </Link>
                )}
                {token !== null && <ProfileDropdown isMobile={isMobile} />}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default Navbar;
