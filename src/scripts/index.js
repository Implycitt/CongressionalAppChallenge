import "materialize-css";

import core from "./core";

import { createCanvas } from "./modules/Canvas.js";
import { createSphere } from "./geometry/Sphere.js";

import "../assets/css/main.css";

import "./utils/weather.js";

createCanvas(core);
createSphere(core);
