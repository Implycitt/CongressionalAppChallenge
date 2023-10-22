import { WebGLRenderer, PerspectiveCamera } from "three";

/**
 * Update the viewport dimensions.
 * @param {WebGLRenderer} renderer The renderer of the viewport.
 * @param {PerspectiveCamera | undefined} camera The camera in the scene of the renderer.
 */
export const updateViewport = (renderer, camera) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (camera != null) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
};
