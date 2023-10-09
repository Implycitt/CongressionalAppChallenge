import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./images/earth_daymap.jpg')
})
const geometry = new THREE.SphereGeometry(5, 100, 100);
const sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );

camera.position.z = 15;

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

const mouse = {
    x: undefined,
    y: undefined
}

const animate = function () {
    requestAnimationFrame( animate );

    sphere.rotation.y += 0.001;
    group.rotation.y =  mouse.x * 0.5;

    renderer.render( scene, camera );
};

animate();

addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})