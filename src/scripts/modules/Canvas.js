import {
    PerspectiveCamera,
    Scene,
    SRGBColorSpace,
    WebGLRenderer
} from "three";

import { updateViewport } from "../utils/updateViewport";

export const createCanvas = (core) => {
    // Create the renderer.
    const canvas = document.querySelector("#earth-canvas");
    core.renderer = new WebGLRenderer({
        canvas,

        powerPreference: "high-performance",
        antialias: true
    });

    // Renderer pixel ratio.
    core.renderer.setPixelRatio(window.devicePixelRatio);

    core.renderer.outputColorSpace = SRGBColorSpace;
    core.renderer.shadowMap.enabled = true;

    core.gl = canvas.getContext("webgl2");

    core.scene = new Scene();
    core.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    updateViewport(core.renderer, core.camera);
    window.addEventListener("resize", () => updateViewport(core.renderer, core.camera));
};
