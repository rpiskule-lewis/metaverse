import Movements from "./movements.js"
import blockchain from "./Web3.js";

// Declaration of a new scene with Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5)

// Camera and rednerer configuration
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Setting Scene Light
const ambient_light = new THREE.AmbientLight(0xbda355)
const direction_light = new THREE.DirectionalLight(0xffffff, 1)
ambient_light.add(direction_light)
scene.add(ambient_light)

// Set up flat space
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({color: 0xffffff})
const space = new THREE.Mesh( geometry_space, material_space)
scene.add(space)

// Cube
const geometry_plane = new THREE.BoxGeometry();
const material_plane = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry_plane, material_plane );
scene.add( cube );
camera.position.z = 5;

// Cone
const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xed810a} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10,5,0)
scene.add( cone );

// cylinder
const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 5, 32 );
const material_cylinder = new THREE.MeshPhongMaterial( {color: 0x0000ff} );
const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
cylinder.position.set(20,5,0)
scene.add( cylinder );

camera.position.set(10, 5, 40)

function animate() {
    
    cube.rotation.x += 0.05
    cube.rotation.y += 0.05
    cone.rotation.x += 0.01
    cone.rotation.y += 0.01
    cylinder.rotation.x += 0.05

	requestAnimationFrame( animate );

    if (Movements.isPressed(37)) {
        camera.position.x -= 0.5
    }
    if (Movements.isPressed(38)) {
        camera.position.y += 0.5
    }
    if (Movements.isPressed(39)) {
        camera.position.x += 0.5
    }
    if (Movements.isPressed(40)) {
        camera.position.y -= 0.5
    }

    camera.lookAt(space.position)

	renderer.render( scene, camera );
}
animate();

renderer.render(scene, camera)

blockchain.then((result) => {
    result.building.forEach((building, index) => {
        if (index <= result.supply) {
            const boxGeometry = new THREE.BoxGeometry(building.w, building.d, building.h)
            const boxMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000})
            const nft = new THREE.Mesh(boxGeometry, boxMaterial)
            nft.position.set(building.x, building.y, building.z)
            scene.add(nft)

        }
    })
})