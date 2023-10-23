import {
    Group,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    TextureLoader
} from "three";
import gsap from "gsap";
import { InteractionManager } from "three.interactive";

import earth_daymap from "../../assets/img/earth_daymap.jpg";

export const createSphere = (core) => {
    const { camera, renderer, scene } = core;

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

    const animate = () => {
        sphere.rotation.y += 0.001;
        gsap.to(group.rotation, { y: mouse.x * 0.5 });

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    document.addEventListener("mousemove", e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
    });

    sphere.addEventListener("mousedown", (event) => {
        gsap.to(camera.position, {
            x: -8,
            z: 17,
            duration: 2.5
        });
        var text = document.createElement('div');
        document.text.id = 'text-front';
        text.appendChild(document.createTextNode('html string'))
    });

    animate();
};
