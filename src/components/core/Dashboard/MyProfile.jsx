// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import IconBtn from '../../common/IconBtn'
// import { RiEditBoxLine } from "react-icons/ri"

// const MyProfile = () => {
//     const { user } = useSelector((state) => state.profile)
//     const navigate = useNavigate();
//     return (
//         <div>
//             <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//                 My Profile
//             </h1>
//             {/* section 1 */}
//             <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//                 <div className="flex items-center gap-x-4">
//                     <img src={user?.image}
//                         alt={`profile-${user?.firstName}`}
//                         className="aspect-square w-[78px] rounded-full object-cover "
//                     />
//                     <div className="space-y-1">
//                         <p className="text-lg font-semibold text-richblack-5">{user?.firstName + " " + user?.lastName}</p>
//                         <p className="text-sm text-richblack-300"> {user?.email} </p>
//                     </div>
//                 </div>
//                 <IconBtn
//                     text='Edit'
//                     onclick={() => {
//                         navigate("/dashboard/Settings")
//                     }}
//                 >
//                     <RiEditBoxLine />
//                 </IconBtn>
//             </div>

//             {/* section 2 */}
//             <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//                 <div className="flex w-full items-center justify-between">
//                     <p className="text-lg font-semibold text-richblack-5">About</p>
//                     <IconBtn text={"Edit"}
//                          onclick={() => {
//                             navigate("/dashboard/Settings")
//                         }}
//                     >
//                         <RiEditBoxLine />
//                     </IconBtn>
//                 </div>
//                 <p
//                     className={`${user?.additionalDetails?.about
//                             ? "text-richblack-5"
//                             : "text-richblack-400"
//                         } text-sm font-medium`}
//                 >
//                     {
//                         user?.additionalDetails?.about ?? "Write Something about Yourself"
//                     }
//                 </p>
//             </div>

//             {/* section 3 */}
//             <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//                 <div className="flex w-full items-center justify-between">
//                     <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
//                     <IconBtn text={"Edit"}
//                          onclick={() => {
//                             navigate("/dashboard/Settings")
//                         }}
//                     >
//                         <RiEditBoxLine />
//                     </IconBtn>
//                 </div>
//                 <div className="flex max-w-[500px] justify-between">
//                     <div className="flex flex-col gap-y-5">
//                         <div>
//                             <p className="mb-2 text-sm text-richblack-600">First Name</p>
//                             <p className="text-sm font-medium text-richblack-5">
//                                 {user?.firstName}
//                             </p>
//                         </div>
//                         <div>
//                             <p className="mb-2 text-sm text-richblack-600">Email</p>
//                             <p className="text-sm font-medium text-richblack-5">
//                                 {user?.email}
//                             </p>
//                         </div>
//                         <div>
//                             <p className="mb-2 text-sm text-richblack-600">Gender</p>
//                             <p className="text-sm font-medium text-richblack-5">
//                                 {user?.additionalDetails?.gender ?? "Add Gender"}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex flex-col gap-y-5">
//                         <div>
//                             <p className="mb-2 text-sm text-richblack-600">Last Name</p>
//                             <p className="text-sm font-medium text-richblack-5">
//                                 {user?.lastName}
//                             </p>
//                         </div>
//                         <div>
//                             <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
//                             <p className="text-sm font-medium text-richblack-5">
//                                 {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
//                             </p>
//                         </div>
//                         <div>
//                             <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
//                             <p className="text-sm font-medium text-richblack-5">
//                                 {user?.additionalDetails?.dateOfBirth ??
//                                     "Add Date Of Birth"}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div>
//     )
// }

// export default MyProfile


import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import IconBtn from "../../common/IconBtn";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="text-white">
      <h1 className="font-medium text-3xl mb-6">My Profile</h1>

      <div className="p-8 max-md:p-0">
        {/* section 1 */}
        <div className="md:flex-row flex-col border border-richblack-700 p-8 rounded-lg mb-8 flex justify-between items-center bg-richblack-800 max-md:gap-4 max-md:text-center">
          <div className="flex md:flex-row flex-col gap-6 items-center">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-lg text-richblack-5">
                {" "}
                {user?.firstName + " " + user?.lastName}{" "}
              </p>
              <p className="font-normal text-sm text-richblack-300">
                {" "}
                {user?.email}
              </p>
            </div>
          </div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <FiEdit />
          </IconBtn>
        </div>

        {/* section 2 */}
        <div className="border border-richblack-700 p-8 rounded-lg mb-8 bg-richblack-800">
          <div className="flex justify-between items-center pb-6">
            <p className="font-semibold text-lg text-richblack-5">About</p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <FiEdit />
            </IconBtn>
          </div>
          <p className="font-medium text-sm text-richblack-5">
            {" "}
            {user?.additionalDetails?.about ?? "Write Something about Yourself"}
          </p>
        </div>

        {/* section 3 */}
        <div className="border border-richblack-700 p-8 rounded-lg bg-richblack-800">
          <div className="flex justify-between items-center pb-6">
            <p className="font-semibold text-lg text-richblack-5">
              Personal Details
            </p>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <FiEdit />
            </IconBtn>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="font-normal text-sm text-richblack-600">
                First Name
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">Email</p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">Gender</p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">
                Last Name
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">
                Phone Number
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="font-normal text-sm text-richblack-600">
                Date of Birth
              </p>
              <p className="font-medium text-sm text-richblack-5">
                {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
