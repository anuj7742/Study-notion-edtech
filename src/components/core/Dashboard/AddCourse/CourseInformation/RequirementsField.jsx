import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const RequirementsField = ({
    name, label, register, errors, setValue, getValues
}) => {

    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequriementsList] = useState([])
    const dispatch = useDispatch()

    useEffect( () => {
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(() => {
        setValue(name, requirementsList)
    },[requirementsList])

    const handleAddRequirement = () => {
        if(requirement){
            setRequriementsList([...requirementsList, requirement])
            // console.log("List",requirementsList)
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementsList];
        updatedRequirementList.splice(index,1);
        setRequriementsList(updatedRequirementList)
    }

  return (
    <div>

        <label htmlFor={name} className='lable-style'>{label}<sup className='text-pink-200'>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full form-style'
            />
            <button
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50'
            >
                Add
            </button>
        </div>

        {
            requirementsList.length > 0 && (
                <ul>
                    {
                        requirementsList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button
                                    type='button'
                                    onClick={() => handleRemoveRequirement(index)}
                                    className='ml-2 text-xs text-pure-greys-300'
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        
        {
            errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is Required
                </span>
            )
        }


        
    </div>
  )
}

export default RequirementsField