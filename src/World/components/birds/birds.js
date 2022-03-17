import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel.js';
import { TextureLoader, EquirectangularReflectionMapping} from "https://cdn.skypack.dev/three@0.132.2";
import { MeshStandardMaterial, MeshPhongMaterial,MeshPhysicalMaterial, Group,Vector3 } from "https://cdn.skypack.dev/three@0.132.2";
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { AnimationClip, AnimationMixer, Clock } from '../../../../vendor/three/build/three.module.js';

import { vertextShader } from './../../shaders/vertex.JS';
import { fragmentShader } from './../../shaders/fragment.JS';
function rgb(r, g, b) {
    return new THREE.Vector3(r, g, b);
}

async function loadBirds() {
    
const loader = new GLTFLoader();

let objects = [];


    const [glasData, mainData, metalData, pilotframeData, doorframeData, probeData,
        fugeData, gumData, lampData, prop1Data, prop2Data, propeller1Data,
        propeller2Data, posLightLeftData, posLightRightData, flashLightTopData,
        flashLightBotData, strobeLightLeftData, strobeLightRightData,tailLightData,
        interiorData, coinData, engineData, deckData, cabinData, landData, safData, propData, 
        plusData, safplusData, propplusData, engineplusData, landplusData, cabinplusData, deckplusData] = await Promise.all([
        loader.loadAsync('./assets/models/glas.glb'),
        loader.loadAsync('./assets/models/main.glb'),
        loader.loadAsync('./assets/models/metal.glb'),
        loader.loadAsync('./assets/models/pilotframe.glb'),
        loader.loadAsync('./assets/models/doorframe.glb'),
        loader.loadAsync('./assets/models/probe.glb'),
        loader.loadAsync('./assets/models/fuge.glb'),
        loader.loadAsync('./assets/models/gum.glb'),
        loader.loadAsync('./assets/models/lamp.glb'),
        loader.loadAsync('./assets/models/prop.glb'),
        loader.loadAsync('./assets/models/prop.glb'),
        loader.loadAsync('./assets/models/propeller.glb'),
        loader.loadAsync('./assets/models/propeller.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/flashlight.glb'),
        loader.loadAsync('./assets/models/interior.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/coin2.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
        loader.loadAsync('./assets/models/plus.glb'),
    ]);

    console.log('logData', glasData);
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./assets/textures/SKY.jpg');
    const alphatexture = textureLoader.load('./assets/textures/TRANSPROP.jpg');
    const lightalphatexture = textureLoader.load('./assets/textures/TRANS.jpg');
    const lightredtexture = textureLoader.load('./assets/textures/LIGHTRED.jpg');
    const lightgreentexture = textureLoader.load('./assets/textures/LIGHTGREEN.jpg');
    const lightwhitetexture = textureLoader.load('./assets/textures/LIGHTWHITE.jpg');
    texture.mapping = EquirectangularReflectionMapping;

    const glasmaterial = new MeshPhysicalMaterial({
        color: 0x050505,
        metalness:1,
        roughness: 0,
        ior:1,
        //alphaMap: texture,
        envMap: texture,
        envMapIntensity:15,
        transmission:0, // use material.transmission for glass materials
        specularIntensity: 0.5,
        specularColor: 'white',
        opacity: 0.7,
        side: 0,
        transparent: true


       // color: 0x050505,
       // //specular: 'white',
       // //map: alphatexture,
       ////alphaMap: alphatexture,
       // opacity: 0.8,
       // transparent: false,
       // envmap: texture,
       // envMapIntensity: 1,
       // metalness: 1,

    });

    const glas = setupModel(glasData);
    glas.material = glasmaterial;
    //glas.material.transparent= true;
    //glas.material.alphaMap = alphatexture;
    //glas.material.opacity = 0.2;
    //glas.material.envmap = texture;
    //glas.material.emissiveIntensity = 0;
    glas.position.set(0, 0, 0);

    const main = setupModel(mainData);
    main.material.envmap = texture;
    main.position.set(0, 0, 0);

    const interior = setupModel(interiorData);
    interior.position.set(0, 0, 0);

    const metal = setupModel(metalData);
    metal.material.envmap = texture;
    metal.position.set(0, 0, 0);

    const pilotframe = setupModel(pilotframeData);
    pilotframe.material.envmap = texture;
    pilotframe.position.set(0, 0, 0);


    const doorframe = setupModel(doorframeData);
    doorframe.material.envmap = texture;
    doorframe.position.set(0, 0, 0);

    const probe = setupModel(probeData);
    probe.material.envmap = texture;
    probe.position.set(0, 0, 0);

    const fuge = setupModel(fugeData);
    //fuge.material.envmap = texture;
    fuge.position.set(0, 0, 0);

    const gum = setupModel(gumData);
    //fuge.material.envmap = texture;
    gum.position.set(0, 0, 0);

    const lamp = setupModel(lampData);
    //fuge.material.envmap = texture;
    lamp.position.set(0, 0, 0);

    const posLightmaterial = new MeshPhongMaterial({
        //color: 'red',
        //emissive: 'LightSalmon',
        emissiveIntensity : 5,
        map: lightredtexture,
        emissiveMap: lightalphatexture,
        alphaMap: lightalphatexture,
        opacity: 0.75,
        transparent: true,
        shininess: 0,
        blending : 2,

    });


    const poslightLeft = setupModel(posLightLeftData);
    poslightLeft.material = posLightmaterial;
    //fuge.material.envmap = texture;
    poslightLeft.position.set(0.6, 0.42, 10.7);

    const posRightLightmaterial = new MeshPhongMaterial({
        //color: 'red',
        //emissive: 'LightSalmon',
        emissiveIntensity: 5,
        map: lightgreentexture,
        emissiveMap: lightalphatexture,
        alphaMap: lightalphatexture,
        opacity: 0.75,
        transparent: true,
        shininess: 0,
        blending: 2,

    });


    const poslightRight = setupModel(posLightRightData);
    poslightRight.material = posRightLightmaterial;
    poslightRight.position.set(0.6, 0.42, -10.7);
    poslightRight.scale.set(0.75, 0.75, 0.75);

    function onPointerMove( event ) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
    
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }

    // plus body
    const plusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const plus = setupModel(plusData);
    plus.name = 'plus';
    plus.material = plusLightmaterial;
    plus.position.set(-1.05, .1, 8.75);
    plus.rotation.set(0, 90, 80);
    plus.scale.set(0.19, -0.04, 0.02);
    
    const clock = new Clock();
    const mixer = new THREE.AnimationMixer(plusData);
    const clips = plusData.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'plusturn');
    // console.log(clip)
    const action = mixer.clipAction(clip);
    action.play();
    console.log(mixer.update(clock.getDelta()))
    mixer.tick = () => {
        if (mixer) {
            mixer.update(clock.getDelta());
        }
    };

    // body
    const coinLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: false,
    });

    // const coin = setupModel(coinData);
    const coin = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({color: 0xef5323 } ));
    coin.name = 'coin';
    coin.material = coinLightmaterial;
    coin.position.set(0.6, 0.37, -11.8);
    coin.rotation.z = 80;
    coin.rotation.y = 45;
    coin.scale.set(0.06, 0.06, 0.06);
    // console.log(addObjectClickListener);

    const engineplusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const engineplus = setupModel(engineplusData);
    engineplus.name = 'engineplus';
    engineplus.material = engineplusLightmaterial;
    engineplus.position.set(-1.35, -0.5, 5.25);
    engineplus.rotation.set(0, 90, 80);
    engineplus.scale.set(0.19, -0.04, 0.02);

    // engine
    const engineLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: true,
    });

    const geometry = new THREE.SphereGeometry(5, 32, 16);
    const material = new THREE.MeshBasicMaterial({color: 0xef5323 });
    const engine = new THREE.Mesh( geometry, material );
    engine.name = 'engine';
    engine.material = engineLightmaterial;
    // engine.position.set(-1.8, .1, 4.35);
    engine.position.set(-1.951, 0, 4.958);
    // engine.position.set(-1.3, -0.4, 5.2);
    engine.rotation.x = 80;
    engine.rotation.z = -45;
    engine.scale.set(0.06, 0.06, 0.06);

    // deck

    const deckplusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const deckplus = setupModel(deckplusData);
    deckplus.name = 'deckplus';
    deckplus.material = deckplusLightmaterial;
    deckplus.position.set(-8.85, -0.7, 1.35);
    deckplus.rotation.set(0, 90, 80);
    deckplus.scale.set(0.12, -0.04, 0.005);

    const deckLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: false,
    });

    // const deck = setupModel(deckData);
    const deck = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({color: 0xef5323 } ));
    deck.name = 'deck';
    deck.material = deckLightmaterial;
    deck.position.set(-9.8, 0, -0.07);
    deck.rotation.x = Math.PI / 3;
    deck.rotation.y = Math.PI / 8;
    deck.rotation.z = Math.PI / 6;
    deck.scale.set(0.06, 0.06, 0.06);

    // cabin

    const cabinplusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const cabinplus = setupModel(cabinplusData);
    cabinplus.name = 'cabinplus';
    cabinplus.material = cabinplusLightmaterial;
    cabinplus.position.set(-7.15, -0.9, 2.35);
    cabinplus.rotation.set(0, 90, 80);
    cabinplus.scale.set(0.19, -0.04, 0.02);

    const cabinLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: false,
    });

    // const cabin = setupModel(cabinData);
    const cabin = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({color: 0xef5323 } ));
    cabin.name = 'cabin';
    cabin.material = cabinLightmaterial;
    cabin.position.set(7, -0.9, 2.2);
    cabin.rotation.x = Math.PI / 2;
    cabin.scale.set(0.06, 0.06, 0.06);


    // landing gear

    const landplusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const landplus = setupModel(landplusData);
    landplus.name = 'landplus';
    landplus.material = landplusLightmaterial;
    landplus.position.set(-2.90, -2.65, 1.3);
    landplus.rotation.set(0, 90, 80);
    landplus.scale.set(0.24, -0.04, 0.06);

    const landLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: false,
    });

    // const land = setupModel(landData);
    const land = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({color: 0xef5323 } ));
    land.name = 'land';
    land.material = landLightmaterial;
    land.position.set(0.5, -2.15, 2.1);
    land.rotation.y = 45;
    land.rotation.z = 80;
    land.scale.set(0.06, 0.06, 0.06);

    // console.log(land.parent);
    // domEvents.addEventListener(land, 'click', function(event) {
    //     console.log('you clicked on mesh', land)
    // }, false)   

    // plus body
    const safplusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const safplus = setupModel(safplusData);
    safplus.name = 'safplus';
    safplus.material = safplusLightmaterial;
    safplus.position.set(-1.05, 0.1, 6.25);
    safplus.rotation.set(0, 90, 80);
    safplus.scale.set(0.19, -0.04, 0.02);

    // SAF
    const safLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: false,
    });

    // const saf = setupModel(safData);
    const saf = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({color: 0xef5323 } ));
    saf.name = 'saf';
    saf.material = safLightmaterial;
    saf.position.set(7.1, -0.9, -2.2);
    // saf.position.set(5, 1.25, 0);
    saf.rotation.z = 80;
    saf.rotation.y = 45;
    saf.scale.set(0.06, 0.06, 0.06);


    const propplusLightmaterial = new MeshStandardMaterial({
        color: 0xffffff,
        opacity: 1.5,
        transparent: false,
    });

    const propplus = setupModel(propplusData);
    propplus.name = 'propplus';
    propplus.material = propplusLightmaterial;
    propplus.position.set(-4.03, 0, 5);
    propplus.rotation.set(0, 90, 80);
    propplus.scale.set(0.19, -0.04, 0.02);

    // propeller
    const propLightmaterial = new MeshStandardMaterial({
        color: 0xef5323,
        opacity: 1.5,
        transparent: false,
    });

    // const prop = setupModel(propData);
    const prop = new THREE.Mesh( new THREE.SphereGeometry(5, 32, 16), new THREE.MeshBasicMaterial({color: 0xef5323 } ));
    prop.name = 'prop';
    prop.material = propLightmaterial;
    prop.position.set(-1.951, 0, -4.958);
    // prop.position.set(-0.8, .05, 4.30);
    prop.rotation.z = 80;
    prop.rotation.y = 45;
    prop.scale.set(0.06, 0.06, 0.06);


    var flashcounter = 0;
    var flash = 0;
    const flashlightTop = setupModel(flashLightTopData);
    flashlightTop.material = posLightmaterial;
    flashlightTop.position.set(13.28, 4.5, 0);
    flashlightTop.tick = () => {
        flashcounter += 0.01;
        if (flashcounter >= 1) {
            flashcounter = 0;
            flash = 0;
        }
        else if (flashcounter <= 0.5) {flash = 0;

        }
    else
        {
            flash = 2.5 - (2.5 *  Math.sin(flashcounter));
        }

        flashlightTop.scale.x = flash;
        flashlightTop.scale.y = flash;
        flashlightTop.scale.z = flash;
    };

    var flashbotcounter = 0;
    const flashlightBot = setupModel(flashLightBotData);
    flashlightBot.material = posLightmaterial;
    flashlightBot.position.set(1.02, -2.63, 0);
    flashlightBot.tick = () => {
        flashbotcounter += 0.01;
        if (flashbotcounter >= 1) {
            flashbotcounter = 0;
            flash = 0;
        }
        else if (flashbotcounter <= 0.5) {
            flash = 0;

        }
        else {
            flash = 2.5 - (2.5 * Math.sin(flashbotcounter));
        }

        flashlightBot.scale.x = flash;
        flashlightBot.scale.y = flash;
        flashlightBot.scale.z = flash;
    };

    const strobeLightmaterial = new MeshPhongMaterial({
        //color: 'white',
        //emissive: 'white',
        emissiveIntensity: 5,
        map: lightwhitetexture,
        emissiveMap: lightwhitetexture,
        alphaMap: lightalphatexture,
        opacity: 0.75,
        transparent: true,
        shininess: 0,
        blending: 2,

    });
    var strobecounter = 0;
    const strobeLightLeft = setupModel(strobeLightLeftData);
    strobeLightLeft.material = strobeLightmaterial;
    strobeLightLeft.position.set(1.2, 0.42, 11.04);
    strobeLightLeft.tick = () => {
        strobecounter += 0.01;
        if (strobecounter >= 1) {
            strobecounter = 0;
            flash = 0;
        }
        else if (strobecounter <= 0.8) {
            flash = 0;

        }
        else {
            flash =0.5* (2.5 - (2.5 * Math.sin(strobecounter)));
        }

        strobeLightLeft.scale.x = flash;
        strobeLightLeft.scale.y = flash;
        strobeLightLeft.scale.z = flash;
    };

    
    var strobeRightcounter = 0;
    const strobeLightRight = setupModel(strobeLightRightData);
    strobeLightRight.material = strobeLightmaterial;
    strobeLightRight.position.set(1.2, 0.42, -11.04);
    strobeLightRight.tick = () => {
        strobeRightcounter += 0.01;
        if (strobeRightcounter >= 1) {
            strobeRightcounter = 0;
            flash = 0;
        }
        else if (strobeRightcounter <= 0.8) {
            flash = 0;

        }
        else {
            flash = 0.5 * (2.5 - (2.5 * Math.sin(strobeRightcounter)));
        }

        strobeLightRight.scale.x = flash;
        strobeLightRight.scale.y = flash;
        strobeLightRight.scale.z = flash;
    };

    const tailLight = setupModel(tailLightData);
    tailLight.material = strobeLightmaterial;
    tailLight.position.set(14.14, -0.37, 0);
    tailLight.scale.set(0.5, 0.5, 0.5);

    const mymaterial = new MeshPhongMaterial({
        color: 'black',
        map: alphatexture,
        alphaMap: alphatexture,
        opacity: 0.5,
        transparent: true,
    });

    var propRot = 0;
    const prop1 = setupModel(prop1Data);
    prop1.material = mymaterial;
    prop1.position.set(-3.451, 0, 3.758);
    prop1.rotation.set(0.2, 0, 1.5708);
    prop1.tick = () => {
        propRot += -0.2;
        prop1.rotation.z += 0.00;
        prop1.rotation.x += propRot;
        prop1.rotation.y += 0.00;
    };

    const prop2 = setupModel(prop2Data);
    prop2.material = mymaterial;
    prop2.position.set(-3.451, 0, -3.758);
    prop2.rotation.set(0.2, 0, 1.5708);
    prop2.tick = () => {
        prop2.rotation.z += 0.00;
        prop2.rotation.x += propRot;
        prop2.rotation.y += 0.00;
    };

    const propeller1 = setupModel(propeller1Data);
    propeller1.position.set(-3.451, 0, 3.758);
    propeller1.rotation.set(0.2, 0, 1.5708);
    propeller1.tick = () => {
        propeller1.rotation.z += 0.00;
        propeller1.rotation.x += propRot;
        propeller1.rotation.y += 0.00;
    };

    const propeller2 = setupModel(propeller2Data);
    propeller2.position.set(-3.451, 0, -3.758
    );
    propeller2.rotation.set(0.2, 0, 1.5708);
    propeller2.tick = () => {
        // increase the cube's rotation each frame
        propeller2.rotation.z += 0.00;
        propeller2.rotation.x += propRot;
        propeller2.rotation.y += 0.00;
    };
    var acRot = 0.0;
    var acVector = new Vector3(0, 0, 0);
    var acTrans = 0.0;
    const group = new Group();
    group.add(main, glas, gum, metal, pilotframe, fuge, probe, lamp, doorframe,interior);
    group.tick = () => {
        acTrans += 0.001;
        acVector.x = 0.5 * Math.sin(acTrans) * Math.sin(acTrans*4);
        acVector.y = 0.75 * Math.sin(acTrans + 1)* Math.sin(acTrans*5 + 0.5);
        acVector.z = 0.5 * Math.sin(acTrans + 2);
        group.position.copy(acVector);
        acRot += 0.0025;
        group.rotation.x = 0.05 * Math.sin(acRot) * Math.sin(acRot*Math.PI);
    };

    const numberTexture = new THREE.CanvasTexture(
        document.querySelector('#number')
    );

    var canvas = document.querySelector('#number');
    console.log(document.querySelector('.annotation'));
    var context = canvas.getContext('2d');
    
    // const spriteMaterial = new THREE.SpriteMaterial({
    //     // map: document.querySelector('.annotation'),
    //     color: 'black',
    //     Text: 'test',
    //     opacity: 0.5,
    //     alphaTest: 0.5,
    //     transparent: true,
    //     depthTest: false,
    //     depthWrite: false
    // });
    // const sprite = new THREE.Sprite(spriteMaterial);
    // sprite.material = spriteMaterial;
    // sprite.position.set(3, 3.5, 0);
    // sprite.scale.set(6.4, 5.03, 0.4);
    // sprite.blending= THREE.NoBlending;



  return {
    main,
      glas,
      metal,
      pilotframe,
      doorframe,
      probe,
      fuge,
      gum,
      lamp,
      prop1,
      prop2,
      propeller1,
      propeller2,
      poslightLeft,
      poslightRight,
      coin,
      engine,
      deck,
      cabin,
      land,
      saf,
      prop,
      plus,
      safplus,
      propplus,
      engineplus,
      landplus,
      cabinplus,
      deckplus,
      flashlightTop,
      flashlightBot,
      strobeLightLeft,
      strobeLightRight,
      tailLight,
      interior,
      group,
      mixer,
  };
}

export { loadBirds };
