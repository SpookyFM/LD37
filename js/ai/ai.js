// Base AI class
function AI(inRadius, inColor) {
    // THREE.Mesh.apply(this, arguments);
    
    this.radius = inRadius;
    this.color = inColor;
    var geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    var material = new THREE.MeshBasicMaterial({
        color: this.color
    });
    
    THREE.Mesh.call(this, geometry, material);
    
    this.rotation.order = 'YXZ';
    this._aggregateRotation = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.ambientFriction = new THREE.Vector3(-10, 0, -10);

    // Number of resources to spawn when the AI is dead
    this.resources = 0;

    // The max health
    this.maxHealth = 100;
    
    // The current health
    this.health = this.maxHealth;
    
    // The position where the AI was spawned
    this.spawnPosition = new THREE.Vector3(0, 0, 0);
    
    // Radius in which the enemy will attack the player
    this.attackRadius = 1000;
    
    this.weapon = new LaserWeapon();
    this.weapon.attachToPlayer(this);
}

AI.prototype = Object.create(THREE.Mesh.prototype);
AI.prototype.constructor = AI;

AI.prototype.getCollisionSphere = function() {
    var sphere = new THREE.Sphere(this.position, this.radius);
    return sphere;
};

// Drops the resources and kills the AI
AI.prototype.onDeath = function() {
    var resource = new Resource(resourceGeometry, resourceMaterial);
    resource.radius = resourceRadius;
    scene.add(resource);
    resources.push(resource);
    resource.position.x = this.position.x;
    resource.position.z = this.position.z;    
   
    var index = enemies.indexOf(this);
    if (index > -1) {
        enemies.splice(index, 1);
    }
    scene.remove(this);
};

// Makes the AI los the specified amount of health. Returns true if the AI is still alive
AI.prototype.reduceHealth = function(amount) {
    this.health -= amount;
    var isAlive = this.health > 0;
    if (!isAlive)
    {
        this.onDeath();
    }
    return isAlive;
};

AI.prototype.update = function(delta)
{
    this.weapon.update(delta);
    
    // Check how far the player is
    var distanceToPlayer = this.position.distanceTo(player.position);
    
    if (distanceToPlayer > this.attackRadius)
    {
        return;
    }
    
    if (this.weapon.canShoot())
    {
        this.weapon.shoot(this.position, player.position);
    }
}