import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from './ChipInput';
import Upload from '../Upload';
import RequirementsField from './RequirementsField';
import IconBtn from "../../../../common/IconBtn"
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { MdNavigateNext } from 'react-icons/md';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            // console.log("Category ", categories)
            if (categories.length > 0) {
                // console.log("categories", categories)
                setCourseCategories(categories)
            }
            // console.log("courseCategories ",courseCategories)
            setLoading(false)
        }

        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            // setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }

        getCategories();
    }, [])


    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category._id ||
            currentValues.courseImage !== course.thumbnail
            // currentValues.courseRequirements.toString() !== course.instructions.toString()
        )
            return true;
        else
            return false;
    }

    // handle next button click
    const onSubmit = async (data) => {

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            }
            else {
                toast.error("No changes made so far")
            }
            return;
        }

        // create a new course
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        formData.append("status", COURSE_STATUS.DRAFT)

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
        console.log("Printing formdata ", formData)
        console.log("Printing result ", result)

    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
        >
            <div className="flex flex-col space-y-2">
                <label htmlFor='courseTitle' className='lable-style'>Course Title <sup className='text-pink-200'>*</sup></label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}
                    className='w-full form-style'
                />
                {
                    errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required**</span>
                    )
                }
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor='courseShortDesc' className='lable-style'>Course Short Description <sup className='text-pink-200'>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register("courseShortDesc", { required: true })}
                    className='form-style resize-x-none min-h-[130px] w-full'
                />
                {
                    errors.courseShortDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required**</span>
                    )
                }
            </div>

            <div className="flex flex-col space-y-2">
                <label className="lable-style" htmlFor="coursePrice">
                    Course Price <sup className="text-pink-200">*</sup>
                </label>
                <div className="relative">
                    <input
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber: true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            },
                        })}
                        className="form-style w-full !pl-12"
                    />
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
                </div>
                {errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Price is required
                    </span>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor='courseCategory' className='lable-style'>Category <sup className='text-pink-200'>*</sup></label>
                <select
                    id='courseCategory'
                    defaultValue=""
                    {...register("courseCategory", { required: true })}
                    className='form-style w-full'
                >
                    <option value="" disabled>Choose a Category</option>

                    {
                        !loading && courseCategories?.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }

                </select>
                {
                    errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
                    )
                }
            </div>

            {/* create component for tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and Press Enter or comma"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Course Thumbnail Image */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />

            {/* Benifits of the course */}
            <div className="flex flex-col space-y-2">
                <label htmlFor='courseBenefits' className='lable-style'>Banifits of the course<sup className='text-pink-200'>*</sup></label>
                <textarea
                    id='courseBenefits'
                    placeholder='Enter Benifits of the Course'
                    {...register("courseBenefits", { required: true })}
                    className='form-style resize-x-none min-h-[130px] w-full'
                />
                {errors.courseBenefits && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Benifits of the Course are Required***</span>
                )}
            </div>

            <RequirementsField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}

            />

            <div className="flex justify-end gap-x-2">
                {editCourse && (
                    <button
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                    >
                        Continue Wihout Saving
                    </button>
                )}
                <IconBtn
                    disabled={loading}
                    text={!editCourse ? "Next" : "Save Changes"}
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </form>
    )
}

export default CourseInformationForm