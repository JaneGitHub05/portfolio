import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { skillset, CATEGORIES } from './data';


const showDetails = (e) => {
    console.log(e.target);
    return (
        <div className="popup position-absolute">
            Hello
        </div>
    )
};

export default function Skills() {
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [skills, setSkills] = useState(skillset);

    console.log(category);
    console.log(skills);

    useEffect(() => {
        console.log("Skills mounted");
    }, []);

    return (
        <div className="container-fluid d-flex flex-column">
            <div className="d-flex flex-column w-100" id="skillset">
                <Autocomplete
                    id="types"
                    options={CATEGORIES}
                    renderInput={params => (
                        <TextField {...params} label="" variant="outlined" />
                    )}
                    getOptionLabel={option => option.name}
                    disableClearable={true}
                    style={{ width: "100%" }}
                    value={category}
                    onChange={(_event, newDisplay) => {
                        setCategory(newDisplay);
                    }}
                />
                <div className="me-auto pt-2">{category.description}</div>
                <div className="d-flex flex-wrap h-100 align-content-center justify-content-center gap-4 m-4">
                    {skills.map((skill) => (
                        <div className={skill.categories.includes(category.name) ? "" : "d-none"} key={skill.name} onMouseOver={showDetails}>
                            <div className="skill">
                                {skill.icon}
                                <div className="popup">
                                    <div><strong>{skill.name}</strong></div>
                                    <div>{skill.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
