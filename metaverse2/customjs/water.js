import { Water } from '../jsm/objects/Water.js';
import * as THREE from '../build/three.module.js';


export var waterLevel = -20
export var water
export var waterEnabled=false

function enableWater(scene) {
    if (!waterEnabled) {
        return
    }
    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    water.rotation.x = - Math.PI / 2;
    water.position.y = waterLevel
    scene.add( water );
}

export { enableWater }