import * as THREE from './three';
import BaseMap from './components/maps/base';

const game = new function () {
  const GAME = this;
  let SCENE;
  let CAMERA;
  let RENDERER;
  let LOADING_MANAGER;
  let IMAGE_LOADER;
  let OBJ_LOADER;
  let CONTROLS;
  let RAYCASTER;

  let TEXTURE;
  let OBJECT;

  let scene, renderer, camera;
  const CONFIG = {
    'mouseLock': false,
  }
  const KEYS = {};
  const MOUSE = {
    'position': {
      'x': 0,
      'y': 0,
    },
    'speed': {
      'x': 0,
      'y': 0,
    },
    'locked': false,
    'keys': {
      'left': false,
      'right': false,
      'middle': false,
      'wheel': 0
    },
  };
  const MOUSE_BUTTON = [
    'left',
    'right',
    'middle',
  ];
  const EVENTS = {
    'keydown': null,
    'keypress': null,
    'keydown': null,
    'mousedown': null,
  };

  const v = GAME.v = (x, y, z) => {
    return new THREE.Vector3(x, y, z);
  }

  const callEvents = (evt, args) => {
    if (EVENTS[evt]) {
      EVENTS[evt](args);
    }
  }

  const addCube = GAME.addCube = (config) => {
    const GEOMETRY = new THREE.BoxGeometry();
    const MATERIAL = new THREE.MeshBasicMaterial({ color: config.color });
    const CUBE = new THREE.Mesh(GEOMETRY, MATERIAL);
    CUBE.position.copy(config.position);
    scene.add(CUBE);
  }

  const animate = GAME.animate = () => {
    callEvents('keydown', KEYS);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  GAME.on = (eventName, processor) => {
    EVENTS[eventName] = processor;
  }

  GAME.getCamera = () => {
    return camera;
  }

  //speed 
  const CAMERA_SPEED = 0.01;
  let runModifire = 5;
  let defaultModifire = 1;
  let isRun = false;

  const getRun = GAME.getRun = () => {
    return isRun;
  }
  const setRun = GAME.setRun = (newValue) => {
    isRun = newValue;
  }

  const calcSpeed = GAME.calcSpeed = () => {
    return CAMERA_SPEED * (getRun() ? runModifire : defaultModifire);
  }
  function initScene() {
    scene = new THREE.Scene();

    initLights();
  }

  function initLights() {
    const SUN = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(SUN);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
  }

  function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 0;
  }

  function initRenderer() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0xb3d4fc, 0)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth - window.innerWidth / 10, window.innerHeight - window.innerHeight / 10);;
  }

  function initLoaders() {
    LOADING_MANAGER = new THREE.LoadingManager();
    IMAGE_LOADER = new THREE.ImageLoader(LOADING_MANAGER);
    //OBJ_LOADER = new THREE.OBJLoader(LOADING_MANAGER);
  }

  GAME.init = (settings) => {
    initScene();
    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
    animate();

    BaseMap(scene);

    if (settings.keyCapture) {
      //events register
      window.addEventListener('keydown', e => {
        e.preventDefault();
        if (!KEYS[e.code]) {
          KEYS[e.code] = true;
          callEvents('keypress', KEYS);
        }
      });
      window.addEventListener('keyup', e => {
        e.preventDefault();
        KEYS[e.code] = false;
        callEvents('keyup', KEYS);
      })
    };
    if (settings.mouseCapture) {
      if (settings.mouseLock) {
        CONFIG.mouseLock = true;
        document.addEventListener('pointerlockchange', e => {
          MOUSE.locked = !!document.pointerLockElement;
        });
      }
      window.addEventListener('contextmenu', e => {
        e.preventDefault();
      });
      window.addEventListener('mousedown', e => {
        e.preventDefault();
        MOUSE.keys[MOUSE_BUTTON[e.button]] = true;
        callEvents('mousedown', MOUSE);

        if (CONFIG.mouseLock && !MOUSE.locked) {
          document.body.requestPointerLock();
        }
      })
      window.addEventListener('mouseup', e => {
        e.preventDefault();
        MOUSE.keys[MOUSE_BUTTON[e.button]] = false;
        callEvents('mouseup', MOUSE);
      })
      window.addEventListener('mousemove', e => {
        e.preventDefault();
        MOUSE.position.x = e.screenX;
        MOUSE.position.y = e.screenY;
        MOUSE.speed.x = e.movementX;
        MOUSE.speed.y = e.movementY;
        callEvents('mousemove', MOUSE);
      })
    }
  }

}

export default game;