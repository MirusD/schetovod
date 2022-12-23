import React from 'react'
import SelectField from '../SelectField'

const StyledSelectField = (props) => {
    return (
        <SelectField
            {...props}
            containerClassName="mt-4"
            selectClassName="w-full py-2 px-2  rounded-md flex items-center h-12 shadow-sm focus:outline-none ring-1 ring-slate-900/10 focus:ring-2 focus:ring-green-600 hover:ring-slate-300"
        />
    )
}

export default StyledSelectField
