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

function animate() {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.001;
    group.rotation.y = mouse.x * 0.5;

    gsap.to(group.rotation, { y: mouse.x * 0.5 });

    renderer.render(scene, camera);
}

animate();

document.addEventListener("mousemove", e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
});
