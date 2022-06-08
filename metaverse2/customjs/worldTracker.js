function update (scene,thisObject,deltaTime) {
    scene.traverse( function( node ) {
        if (node.isCamera) {
            var camera=node
            if (camera.position.x - thisObject.position.x > thisObject.inputs.worldSize*thisObject.scale.x) {
                thisObject.position.x += thisObject.inputs.worldSize*thisObject.scale.x
            }
            if (camera.position.x - thisObject.position.x < -thisObject.inputs.worldSize*thisObject.scale.x) {
                thisObject.position.x -= thisObject.inputs.worldSize*thisObject.scale.x
            }

            if (camera.position.z - thisObject.position.z > thisObject.inputs.worldSize*thisObject.scale.y) {
                thisObject.position.z += thisObject.inputs.worldSize*thisObject.scale.y
            }
            if (camera.position.z - thisObject.position.z < -thisObject.inputs.worldSize*thisObject.scale.y) {
                thisObject.position.z -= thisObject.inputs.worldSize*thisObject.scale.y
            }
        }
    })
}

export {update}