import {
    Group,
    Mesh,
    SphereGeometry,
    TextureLoader,
    MeshPhongMaterial,
    AmbientLight,
    PointLight,
    BufferGeometry,
    PointsMaterial,
    Points,
    Float32BufferAttribute,
    SphereBufferGeometry,
    MeshBasicMaterial,
} from "three";
import gsap from "gsap";
import { InteractionManager } from "three.interactive";
import ThreeGlobe from 'three-globe'
import Globe from 'globe.gl'

import earth_daymap from "../../assets/img/earth_daymap.jpg";
import mars_map from "../../assets/img/mars.jpg";
import earth_bump from "../../assets/img/earthbump.jpg";
import mars_bump from "../../assets/img/marsBump.jpg";
import earth_clouds from "../../assets/img/earthCloud.png";
import star from "../../assets/img/stars.png";

export const createSphere = (core) => {
    const { camera, renderer, scene } = core;

    const earthMaterial = new MeshPhongMaterial({
        map: new TextureLoader().load(earth_daymap),
        bumpMap: new TextureLoader().load(earth_bump),
        bumpScale: 2
    });

    const marsMaterial = new MeshPhongMaterial({
        map: new TextureLoader().load(mars_map),
        bumpMap: new TextureLoader().load(mars_bump),
        bumpScale: 2
    });

    const sprite = new TextureLoader().load(star);
    let markers;

    const starGeometry = new BufferGeometry();
    const starMaterial = new PointsMaterial({
        color: 0xffffff,
        size: 0.7,
        transparent: true,
        map: sprite
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute("position", new Float32BufferAttribute(starVertices, 3));
    const stars = new Points(starGeometry, starMaterial);
    scene.add(stars);

    const cloudGeometry = new SphereGeometry(5.15, 100, 100);

    const cloudMaterial = new MeshPhongMaterial({
        map: new TextureLoader().load(earth_clouds),
        transparent: true
    });

    const point = new Points(starGeometry, starMaterial);
    scene.add(point);

    const cloudMesh = new Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    const ambientlight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientlight);

    const pointLight = new PointLight(0xffffff, 20);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    const geometry = new SphereGeometry(5, 100, 100);
    const mars_geometry = new SphereGeometry(4, 100, 100);
    const earth = new Mesh(geometry, earthMaterial);
    const mars = new Mesh(mars_geometry, marsMaterial);
    mars.position.set(13, 0, -4);

    scene.add(earth);
    scene.add(mars);

    camera.position.z = 15;

    const group = new Group();

    group.add(earth);
    group.add(cloudMesh);
    scene.add(group);

    const mouse = { x: null, y: null };

    const interactionManager = new InteractionManager(
        renderer,
        camera,
        renderer.domElement
    );

    interactionManager.add(earth);

    document.addEventListener("mousemove", e => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    group.addEventListener("mousedown", e => {
        isDown = true;
        startX = e.pageX - group.offsetLeft;
        scrollLeft = group.scrollLeft;
    });

    group.addEventListener("mouseleave", () => {
        isDown = false;
    });

    group.addEventListener("mouseup", () => {
        isDown = false;
    });

    group.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - group.offsetLeft;
        const walk = x - startX;
    });

    earth.addEventListener("mousedown", () => {
        gsap.to(camera.position, {
            x: -4,
            z: 17,
            duration: 2.5
        });

        const exit = document.getElementById("exit");
        exit.removeAttribute("hidden");
        document.getElementById("container").removeAttribute("hidden");
        document.getElementById("searching").removeAttribute("hidden");

        // document.getElementById("rem")?.addEventListener('keyup', (e) => {
        //     if (e.key === "Enter") {
        //         const search_city = "https://geocoding-api.open-meteo.com/v1/search";
        //         const cityName = document.getElementById("rem").value;
        //         fetch(`${search_city}?name=${cityName}`)
        //         .then(response => {
        //             return response.json();
        //         })
        //         .then(data => {
        //             let lat = data.results[0].latitude;
        //             let lon = data.results[0].longitude;
                    
        //             var latRad = lat * (Math.PI / 180);
        //             var lonRad = -lon * (Math.PI / 180);
        //             const N = 1;
        //             var gData = [...Array(N).keys()].map(() => ({
        //                 lat: Math.cos(latRad) * Math.cos(lonRad) * 5,
        //                 lng: Math.sin(latRad) * 5,
        //                 size: 0.5,
        //                 color: 'red'
        //             }));
                    
        //             // point.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
                
        //             var world = Globe()
        //             console.log(gData)
        //             world.pointsData(gData)
        //             world.pointAltitude('size')
        //             world.pointColor('red')
        //         })
        //     }
        // });

        exit.addEventListener("click", () => {
            exit.setAttribute("hidden", "");
            document.getElementById("rem").setAttribute("hidden", "");
            document.getElementById("container").setAttribute("hidden", "");
            document.getElementById("searching").setAttribute("hidden", "");

            if (document.getElementById("weather") != null) {
                document.getElementById("weather").style.display = "none";
            }

            gsap.to(camera.position, {
                x: 0,
                z: 15,
                duration: 2.5
            });
        });

        document.getElementById("rem").removeAttribute("hidden");
    });

    const animate = () => {
        earth.rotation.y += 0.001;
        mars.rotation.y += 0.001;
        cloudMesh.rotation.y += 0.001;
        gsap.to(group.rotation, { y: mouse.x * 0.5 });

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    animate();
};
