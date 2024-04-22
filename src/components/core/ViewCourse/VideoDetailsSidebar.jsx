import { useEffect, useState, useRef } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useOnClickOutside from "../../../hooks/useOnClickOutside";



import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const ref = useRef(null)
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ; (() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()

  }, [courseSectionData, courseEntireData, location.pathname])

  useOnClickOutside(ref, () => { setIsMenuOpen(false) });

  return (
    <>
      <div className="md:flex hidden h-[calc(100vh-3.5rem)] md:w-[320px] md:max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span>
                  <span
                    className={`${activeStatus === course?._id
                      ? "rotate-0"
                      : "rotate-180 "
                      } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => { }}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {!isMenuOpen ? (
        <div className="md:hidden flex items-center h-[calc(100vh-3.5rem)] w-[36px] max-w-[36px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 text-white">
          <button className=" mt-4" onClick={() => setIsMenuOpen(true)}>
            <HiOutlineMenuAlt2 fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      ) : (
        <>
          <div className="absolute md:hidden flex z-50 h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800" ref={ref}>
            <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">


              {/* <button
                onClick={() => {
                  navigate(`/dashboard/enrolled-courses`)
                }}
                className="flex items-center underline"
              > <IoIosArrowBack />Back to Enrolled Courses</button> */}

              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end mb-4 mr-4"
              >
                <HiOutlineMenuAlt3 fontSize={24} fill="#AFB2BF" />
              </button>
              <div className="flex w-full items-center justify-between ">
                <div
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
                  title="back"
                >
                  <IoIosArrowBack size={30} />
                </div>
                <IconBtn
                  text="Add Review"
                  customClasses="ml-auto"
                  onclick={() => setReviewModal(true)}
                />
              </div>


              <div className="flex flex-col">
                <p>{courseEntireData?.courseName}</p>
                <p className="text-sm font-semibold text-richblack-500">
                  {completedLectures?.length} / {totalNoOfLectures}
                </p>
              </div>
            </div>

            <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
              {courseSectionData.map((course, index) => (
                <div
                  className="mt-2 cursor-pointer text-sm text-richblack-5"
                  onClick={() => { setActiveStatus(course?._id); }}
                  key={index}
                >
                  {/* Section */}
                  <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                    <div className="w-[70%] font-semibold">
                      {course?.sectionName}
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                      <span
                        className={`${activeStatus === course?.sectionName
                          ? "rotate-0"
                          : "rotate-180"
                          } transition-all duration-500`}
                      >
                        <BsChevronDown />
                      </span>
                    </div>
                  </div>

                  {/* Sub Sections */}
                  {activeStatus === course?._id && (
                    <div className="transition-[height] duration-500 ease-in-out">
                      {course.subSection.map((topic, i) => (
                        <div
                          className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                            } `}
                          key={i}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                            );
                            setVideoBarActive(topic._id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={completedLectures.includes(topic?._id)}
                            onChange={() => { }}
                          />
                          {topic.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}