import React from 'react';
import { createRoot } from 'react-dom/client';
import Counter from './skills.jsx';

const mountPoint = document.querySelector("#skills");
if (mountPoint) {
    const root = createRoot(mountPoint);
    root.render(<Counter />);
}