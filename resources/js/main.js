import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

const DEBUG = location.search.indexOf('debug') > -1;

const App = function () {
  let areaWidth, areaHeight;
  let renderer, scene, camera, light, controls;
  let isRequestRender = false;

  const $container = document.querySelector('.container');
  let $canvas;
  
  const init = function () {
    // window
    areaWidth = window.innerWidth;
    areaHeight = window.innerHeight;
    
    // scene
    scene = new THREE.Scene();

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
    renderer.setClearColor('#000', 1.0);
    renderer.setSize(areaWidth, areaHeight);
    $canvas = renderer.domElement;
    $container.appendChild($canvas);
    
    // camera
    camera = new THREE.PerspectiveCamera(70, areaWidth/areaHeight, 1, 999);
    camera.position.set(0, 0, 10);
    scene.add(camera);
    
    // light
    light = new THREE.AmbientLight('#fff', 1);
    scene.add(light);
    
    // controls
    controls = new OrbitControls(camera, $canvas);
    controls.addEventListener('change', renderRequest);
    
    // setting
    
    // render
    setModels();
    renderRequest();
    render();

    // Loading
    THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      if (itemsLoaded === itemsTotal) {
        render();
      }
    }
  }


  // Setting
  const setModels = function () {
    const material = new THREE.MeshStandardMaterial({ color: 'red' });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }


  // Render
  const renderRequest = function () {
    isRequestRender = true;
  }

  const render = function () {
    if (isRequestRender) {
      renderer.setSize(areaWidth, areaHeight);
      renderer.render(scene, camera);
    }
    window.requestAnimationFrame(render);
  }


  window.addEventListener('load', init)
}
App();