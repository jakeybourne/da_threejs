import { PerspectiveCamera } from "https://cdn.skypack.dev/three@0.132.2";

function createCamera() {
  const camera = new PerspectiveCamera(
      45, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1100, // far clipping plane
  );
  // move the camera back so we can view the scene
    camera.position.set(-20, 0, 20);
    camera.enablePan = false;

  return camera;
}

export { createCamera };