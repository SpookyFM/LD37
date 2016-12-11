// Base AI is a mesh

// Three types
// Type 1: Just randomly walks and shoots the player when he sees it
// Type 2: Swarm, will get close and do melee damage
// Type 3: Heavy, should be fought with the artillery weapon

// 
function AI() {
     THREE.Mesh.apply(this, arguments);
     this.rotation.order = 'YXZ';
    
     // Gameplay related variables
    this.radius = 20;
    
    // Number of resources dropped by this AI on death 
    this.resources = 10;
    
    // Maximal health
    this.maxHealth = 100;
    
    // Current health
    this.health = this.maxHealth;
}

AI.prototype = Object.create(THREE.Mesh.prototype);
AI.prototype.constructor = AI;

AI.prototype.getCollisionSphere = function() {
    var sphere = new THREE.Sphere(this.position, this.radius);
    return sphere;
 };