import React from 'react';
import { createRoot } from 'react-dom/client';
import Skills from './skills.jsx';

const mountPoint = document.querySelector("#skills");
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<Skills />);
}