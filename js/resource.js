

// A resource. If the player intersects with it, it is automatically connected
function Resource() {
     THREE.Mesh.apply(this, arguments);
     this.rotation.order = 'YXZ';
    
     // Gameplay related variables
     
    this.radius = 20;
    
   // Number of resources given by the resource 
    this.resources = 10;
}

Resource.prototype = Object.create(THREE.Mesh.prototype);
Resource.prototype.constructor = Resource;

Resource.prototype.getCollisionSphere = function() {
    var sphere = new THREE.Sphere(this.position, this.radius);
    return sphere;
 };


