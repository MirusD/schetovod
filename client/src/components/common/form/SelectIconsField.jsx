import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SelectIconsField = ({ name, label, value, options, onChange }) => {
    const [open, setOpen] = useState(false)
    const handleSetIcon = (src) => {
        setOpen(false)
        onChange({ name, value: src })
    }
    return (
        <div className="relative mb-4">
            <label>{label}</label>
            <div
                className="w-16 h-16 mt-1 rounded-md flex items-center justify-center h-12 shadow-sm focus:outline-none ring-1 ring-slate-900/10 focus:ring-2 focus:ring-green-600 hover:ring-slate-300 cursor-pointer"
                onClick={() => setOpen(prevState => !prevState)}
            >
                {<img className="h-full" src={value}></img>}
            </div>
            {open &&
                <div className="absolute z-50 left-0 top-24 w-auto h-auto bg-white p-4 shadow-sm rounded-md ring-1 ring-slate-900/10 max-w-sm">
                    <ul className="grid grid-cols-6 gap-2">
                        {options.map(o => (
                            <li key={o.label}
                                className="w-12 h-12 rounded-md ring-1 ring-slate-900/10 hover:ring-slate-300 cursor-pointer"
                                onClick={() => handleSetIcon(o.value)}
                            >
                                {<img src={o.value}></img>}
                            </li>
                        ))}
                    </ul>
                </div>}
        </div>
    )
}

SelectIconsField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
}

export default SelectIconsField
