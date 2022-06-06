import * as THREE from 'three';
import { FBXLoader } from '../jsm/loaders/FBXLoader.js';


export class Controls {

    constructor(camera,scene,domElement) {
      console.log("Construct")

      if (camera == null)
      {
        console.error("Camera must be defined")
      }
      if (scene == null)
      {
        console.error("Camera must be defined")
      }
      if ( domElement === undefined ) {

        console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
        domElement = document.body;
      }

      this.camera = camera;
      this.scene = scene;
      this.pointer = new THREE.Vector2();
      this.selectedObject = null
      this.selectedObjectMaterial = null
      this.domElement = domElement;


      // this is a hack
      const scope = this

      this.onMouseDown = function onMouseDown( event ) {    
          //event.preventDefault();

          if (event.button !== 0) {
            console.log("HERE")
            if (scope.selectedObjectMaterialColor != null) {
               scope.selectedObject.material.color =  Object.assign({},scope.selectedObjectMaterialColor)
            }
            scope.selectedObject = null
            scope.selectedObjectMaterialColor = null
            return
          }

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera( scope.pointer, scope.camera );

          const intersects = raycaster.intersectObjects( scope.scene.children );
          if ( intersects.length > 0) {
            if (scope.selectedObject == null) {
              console.log("INTERSECT")
              console.log(intersects[0])
              let object=intersects[ 0 ].object
              while (object.parent != null && object.parent.isScene != true) {
                object = object.parent
              }
              console.log(object)

              scope.selectedObject = object
              if (scope.selectedObject != null && scope.selectedObject.material != null) {
                scope.selectedObjectMaterialColor = new THREE.Color(scope.selectedObject.material.color.getHex())
                scope.selectedObject.material.color.setHex( 0xffff00 );
              }
            } else if (scope.selectedObject != null && scope.selectedObject != intersects[ 0 ].object) {
              console.log(scope.selectedObject)
              scope.selectedObject.position.x = intersects[0].point.x
              scope.selectedObject.position.y = intersects[0].point.y
              scope.selectedObject.position.z = intersects[0].point.z
              if (scope.selectedObject.material != null) {
                scope.selectedObject.material.color = new THREE.Color(scope.selectedObjectMaterialColor)
              }
              scope.selectedObject = null
              scope.selectedObjectMaterialColor = null
            }
          }
          
          
      };
      
      this.dispose = function () {
        window.removeEventListener( 'keydown', _onKeyDown );
        window.removeEventListener( 'keyup', _onKeyUp );
      };

      this.onPointerMove = function onPointerMove( event ) {    
        scope.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        scope.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      }

      document.addEventListener( 'mousedown', this.onMouseDown );
      document.addEventListener( 'pointermove', this.onPointerMove );

      this.onKeyDown = function ( event ) {

        switch ( event.code ) {
        }
  
      };
  
      this.onKeyUp = function ( event ) {
  
        switch ( event.code ) {
          case 'KeyC': 
          console.log("Create")

          var x = document.getElementById("createObjectMenu")
          
          console.log(scope.domElement)
          if (x.style.display === "none") {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera( scope.pointer, scope.camera );
            const intersects = raycaster.intersectObjects( scope.scene.children );

            if ( intersects.length > 0) {
              document.getElementById("x").value = intersects[0].point.x
              document.getElementById("y").value = intersects[0].point.y
              document.getElementById("z").value = intersects[0].point.z
            }
            x.style.display = "block";
            scope.domElement.ownerDocument.exitPointerLock();
          } else {
            x.style.display = "none";
            scope.domElement.requestPointerLock();
          }

          break;

        }
  
      };

      this.createObject = function createObject() {
        var x = document.getElementById("x").value
        var y = document.getElementById("y").value
        var z = document.getElementById("z").value
        var model = document.getElementById("model").value


        const fbxloader = new FBXLoader();
				fbxloader.load( model, function ( object ) {					
					object.position.set(x,
                              y,
                              z);
					scope.scene.add( object );
				} );
      }

      this.update = function update() {

      }
      const _onKeyDown = this.onKeyDown.bind( this );
      const _onKeyUp = this.onKeyUp.bind( this );
  		window.addEventListener( 'keydown', _onKeyDown );
		  window.addEventListener( 'keyup', _onKeyUp );

      document.getElementById("createObject").addEventListener("click", this.createObject);



    }



  }
