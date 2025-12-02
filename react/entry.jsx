import React from 'react';
import { createRoot } from 'react-dom/client';
import Skills from './skills.jsx';
import Gallery from './gallery.jsx';
import { setupThree } from "../js/three.js";


const mountPoint = document.querySelector("#skills");
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<Skills />);
}

setupThree();