import earth_daymap from "../assets/img/earth_daymap.jpg";

import {
    Group,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer
} from "three";
import gsap from "gsap";
import { InteractionManager } from 'three.interactive';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const material = new MeshBasicMaterial({
    map: new TextureLoader().load(earth_daymap)
});

const geometry = new SphereGeometry(5, 100, 100);
const sphere = new Mesh(geometry, material);

scene.add(sphere);

camera.position.z = 15;

const group = new Group();
group.add(sphere);
scene.add(group);

const mouse = { x: null, y: null };

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
);

interactionManager.add(sphere);

function animate() {
    sphere.rotation.y += 0.001;
    gsap.to(group.rotation, { y: mouse.x * 0.5 });
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.addEventListener("mousemove", e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
});

sphere.addEventListener('mousedown', (event) => {
    gsap.to(camera.position, {
        x: -8,
        z: 17,
        duration: 2.5
    })
})

animate()
