import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function rotate(obj) {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;

    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// get mountpoint
const container = document.querySelector('#three-d');

// create scene object(s)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x38394c, emissive: 0x38394c, shininess: 150 });
const cube = new THREE.Mesh(geometry, material);

// create scene, camera, and renderer
const scene = new THREE.Scene();
scene.add(cube);
// PerspectiveCamera(field of view [degrees], aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

renderer.setAnimationLoop(rotate);
//TODO: determine significance of this
const canvas = renderer.domElement;
camera.aspect = canvas.clientWidth / canvas.clientHeight;
camera.updateProjectionMatrix();

//TODO: allow controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0, 0); // Point the camera at the scene origin
controls.update(); // Important for initial setup

//TODO: make responsive to resizing changes


// add lighting
const color = 0xFFFFFF;
const intensity = 8;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(0, 10, 0);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
gui.add(light, 'intensity', 0, 5, 0.01);
gui.add(light.target.position, 'x', -10, 10);
gui.add(light.target.position, 'z', -10, 10);
gui.add(light.target.position, 'y', 0, 10);