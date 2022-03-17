import { loadBirds } from './components/birds/birds.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createSky } from './components/sky.js';
import { createCube } from './components/cube.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from '../../vendor/three/build/three.module.js';
import * as THREEx from './components/birds/threex.domevents.js';
import { addObjectClickListener } from '../World/components/birds/mouseEvent.js'


let camera;
let controls;
let renderer;
let scene;
let loop;
let d1;

class World {
  constructor(container) {
	
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();
    //      mainlight.castShadow = true;

    // const sky = createSky();
    const cube = createCube();
    loop.updatables.push(controls);

    scene.add(ambientLight, mainLight,cube);
    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { main, metal, pilotframe, doorframe, probe, fuge, gum, lamp,
        prop1, prop2, propeller1, propeller2, group, coin, engine, deck, cabin, land, saf, prop, plus,
        safplus, propplus, engineplus, landplus, cabinplus, deckplus, sprite, mixer,
        poslightLeft, poslightRight, flashlightTop, flashlightBot, strobeLightRight, strobeLightLeft,tailLight,
    } = await loadBirds();

    controls.target.copy(main.position);
    
    loop.updatables.push(prop1, prop2, propeller1, propeller2, flashlightTop,
          flashlightBot, strobeLightRight, strobeLightLeft, mixer);
      

    group.add(prop1, prop2, propeller1, propeller2, poslightLeft, poslightRight, flashlightTop,
          flashlightBot, strobeLightRight, strobeLightLeft,tailLight, coin, engine, deck, cabin, land, saf, 
          prop, /* plus, safplus, propplus, engineplus,landplus, cabinplus, deckplus, */ sprite);

    function onPositionChange(o) {
        
        poslightLeft.lookAt(camera.position);
        poslightRight.lookAt(camera.position);
        flashlightTop.lookAt(camera.position);
        flashlightBot.lookAt(camera.position);
        strobeLightRight.lookAt(camera.position);
        strobeLightLeft.lookAt(camera.position);
        tailLight.lookAt(camera.position);


    }
    controls.addEventListener('change', onPositionChange);
      

    setInterval(function () {
      poslightLeft.lookAt(camera.position);
      poslightRight.lookAt(camera.position);
      flashlightTop.lookAt(camera.position);
      flashlightBot.lookAt(camera.position);
      strobeLightRight.lookAt(camera.position);
      strobeLightLeft.lookAt(camera.position);
      tailLight.lookAt(camera.position);
    }, 10);


    loop.updatables.push(group);

    scene.add( group);

	  var raycaster = new THREE.Raycaster();
    
    var mouse = new THREE.Vector2();

    var selected = coin;
    var objects = [coin, engine, deck, cabin, land, saf, prop];
    var intersects = [];
    renderer.domElement.addEventListener("click", onClick);

    function onClick(event) {
      mouse.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects(objects);
      // console.log('test cpnsole');
      if (intersects.length > 0) {
        selected = intersects[0].object;
        // console.log('test')
        if (selected.name=='coin') {
          document.getElementById("frame").style.display = 'none';
          document.getElementById("cabin").style.display = 'none';
          document.getElementById("land").style.display = 'none';
          document.getElementById("prop").style.display = 'none';
          document.getElementById("deck").style.display = 'none';
          document.getElementById("saf").style.display = 'block';
          document.getElementById("engine").style.display = 'none';
          document.getElementById("annotation").style.display = 'block';
          // console.log('coin');
        }
        else if (selected.name=='engine') {
          // console.log('engine');
          document.getElementById("engine").style.display = 'block';
          document.getElementById("cabin").style.display = 'none';
          document.getElementById("land").style.display = 'none';
          document.getElementById("prop").style.display = 'none';
          document.getElementById("deck").style.display = 'none';
          document.getElementById("saf").style.display = 'none';
          document.getElementById("frame").style.display = 'none';
          document.getElementById("annotation").style.display = 'block';
        }
        else if (selected.name=='deck') {
          // console.log('deck');
          document.getElementById("deck").style.display = 'block';
          document.getElementById("cabin").style.display = 'none';
          document.getElementById("land").style.display = 'none';
          document.getElementById("prop").style.display = 'none';
          document.getElementById("engine").style.display = 'none';
          document.getElementById("saf").style.display = 'none';
          document.getElementById("frame").style.display = 'none';
          document.getElementById("annotation").style.display = 'block';
        }
        else if (selected.name=='cabin') {
          // console.log('cabin');
          document.getElementById("cabin").style.display = 'block';
          document.getElementById("deck").style.display = 'none';
          document.getElementById("land").style.display = 'none';
          document.getElementById("prop").style.display = 'none';
          document.getElementById("engine").style.display = 'none';
          document.getElementById("saf").style.display = 'none';
          document.getElementById("frame").style.display = 'none';
          document.getElementById("annotation").style.display = 'block';
        }
        else if (selected.name=='land') {
          // console.log('land');
          document.getElementById("land").style.display = 'block';
          document.getElementById("deck").style.display = 'none';
          document.getElementById("cabin").style.display = 'none';
          document.getElementById("prop").style.display = 'none';
          document.getElementById("engine").style.display = 'none';
          document.getElementById("saf").style.display = 'none';
          document.getElementById("frame").style.display = 'none';
          document.getElementById("annotation").style.display = 'block';
        }
        else if (selected.name=='saf') {
          // console.log('saf');
          document.getElementById("saf").style.display = 'none';
          document.getElementById("deck").style.display = 'none';
          document.getElementById("cabin").style.display = 'none';
          document.getElementById("land").style.display = 'none';
          document.getElementById("engine").style.display = 'none';
          document.getElementById("prop").style.display = 'none';
          document.getElementById("frame").style.display = 'block';
          document.getElementById("annotation").style.display = 'block';
        }
        else if (selected.name=='prop') {
          document.getElementById("prop").style.display = 'block';
          document.getElementById("deck").style.display = 'none';
          document.getElementById("cabin").style.display = 'none';
          document.getElementById("land").style.display = 'none';
          document.getElementById("engine").style.display = 'none';
          document.getElementById("saf").style.display = 'none';
          document.getElementById("frame").style.display = 'none';
          document.getElementById("annotation").style.display = 'block';
          // console.log('prop');
        }
        // selected.material.color.setHex( 0xffffff );
        // console.log(selected.name);
        // console.log('test cpnsole')
        // guiControls.color = selected.material.color.getStyle();
      }
    }
    // d1 = plusData;
    
  }

  render() {
    renderer.render(scene, camera);
  }


  start() {
    // mixer.update();
    // console.log(mixer);
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
