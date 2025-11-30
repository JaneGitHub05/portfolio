import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { skillset, CATEGORIES } from './data';

const StyledAutocomplete = styled(Autocomplete)({
    "&.Mui-focused .MuiInputLabel-outlined": {
        color: "rgb(56, 57, 76)"
    },
    "& .MuiInputLabel-root": {
        color: "#f0f1fb"
    },
    "& .MuiButtonBase-root ": {
        color: "#f0f1fb"
    },
    "& .MuiAutocomplete-inputRoot": {
        color: "#f0f1fb",
        backgroundColor: "#38394c",
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            // Default left padding is 6px
            paddingLeft: 6
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f0f1fb"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fef3c7"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fef3c7"
        }
    }
});

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
        <div className="container-fluid d-flex flex-column align-items-center">
            <StyledAutocomplete
                id="types"
                options={CATEGORIES}
                renderInput={params => (
                    <TextField {...params} label="Categories" variant="outlined" />
                )}
                getOptionLabel={option => option.name}
                disableClearable={true}
                style={{ width: "100%" }}
                value={category}
                onChange={(_event, newDisplay) => {
                    setCategory(newDisplay);
                }}
            />

            <div className="d-flex flex-column w-100" id="skillset">
                <div>{category.description}</div>
                <div className="d-flex flex-wrap gap-4 m-4">
                    {skills.map((skill) => (
                        <div className={skill.categories.includes(category.name) ? "" : "d-none"} key={skill.name} onMouseOver={showDetails}>
                            <div className="skill">
                                {skill.icon}
                                <div className="popup">
                                    <div className="">{skill.name}</div>
                                    <p>{skill.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
