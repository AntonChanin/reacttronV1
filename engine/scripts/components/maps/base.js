import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const BaseMap = (scene) => {
  let loader = new GLTFLoader();
  let obj = null;
  loader.load('../../models/maps/baseMap.gltf', function (gltf) {
    const root = gltf.scene;
    scene.add(root);
  })
}

export default BaseMap;