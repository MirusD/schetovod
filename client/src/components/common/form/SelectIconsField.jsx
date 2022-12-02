import React, { useState } from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";

const SelectIconsField = ({ name, label, value, options, onChange}) => {
    const [open, setOpen] = useState(false)
    const handleSetIcon = (src) => {
        setOpen(false)
        onChange({name, value: src})
    }
    return (
        <div className="relative">
            <label>{label}</label>
            <div
                className="w-16 h-16 py-2 px-3 rounded-md flex items-center h-12 shadow-sm focus:outline-none ring-1 ring-slate-900/10 focus:ring-2 focus:ring-green-600 hover:ring-slate-300 cursor-pointer"
                onClick={() => setOpen(prevState => !prevState)}
            >
                {<img src={value}></img>}
            </div>
            {open &&
                <div className="absolute left-0 top-24 w-auto h-auto bg-white p-4 shadow-sm rounded-md ring-1 ring-slate-900/10">
                    <ul className="flex space-x-4">
                        {options.map(o => (
                            <li key={o.label}
                                className="w-9 h-9 rounded-md ring-1 ring-slate-900/10 hover:ring-slate-300 cursor-pointer"
                                onClick={() => handleSetIcon(o.value)}
                            >
                                {<img src={o.value}></img>}
                            </li>
                        ))}
                        <li
                            className="w-9 h-9 rounded-full ring-1 ring-slate-900 hover:ring-slate-700 cursor-pointer"
                            onClick={() => console.log('add icon')}
                        >
                            <PlusIcon/>
                        </li>
                    </ul>
                </div>}
        </div>
    )
}

export default SelectIconsField
