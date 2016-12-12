// Base AI class
function AI() {
    THREE.Mesh.apply(this, arguments);
    this.rotation.order = 'YXZ';
    this._aggregateRotation = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.ambientFriction = new THREE.Vector3(-10, 0, -10);

    this.radius = 40;

    
    // Number of resources to spawn when the AI is dead
    this.resources = 0;

    // The max health
    this.maxHealth = 100;
    
    // The current health
    this.health = this.maxHealth;
    
    // The position where the AI was spawned
    this.spawnPosition = new THREE.Vector3(0, 0, 0);
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
    resource.position.x = this.position.x;
    resource.position.z = this.position.z;
};

// Makes the AI los the specified amount of health. Returns true if the AI is still alive
AI.prototype.reduceHealth = function(amount) {
    this.health -= amount;
    return this.health > 0;
};

AI.prototype.update = (function() {
    var halfAccel = new THREE.Vector3();
    var scaledVelocity = new THREE.Vector3();
    return function(delta) {
        var r = this._aggregateRotation
            .multiplyScalar(delta)
            .add(this.rotation);
        r.x = Math.max(Math.PI * -0.5, Math.min(Math.PI * 0.5, r.x));
        this.rotation.x = 0;
        if (this.moveDirection.UP) this.velocity.z -= Player.SPEED;
        if (this.moveDirection.LEFT) this.velocity.x -= Player.SPEED;
        if (this.moveDirection.DOWN) this.velocity.z += Player.SPEED;
        if (this.moveDirection.RIGHT) this.velocity.x += Player.SPEED;
        halfAccel.copy(this.acceleration).multiplyScalar(delta * 0.5);
        this.velocity.add(halfAccel);
        var squaredVelocity = this.velocity.x * this.velocity.x +
            this.velocity.z * this.velocity.z;
        if (squaredVelocity > this.speed * this.speed) {
            var scalar = this.speed / Math.sqrt(squaredVelocity);
            this.velocity.x *= scalar;
            this.velocity.z *= scalar;
        }
        scaledVelocity.copy(this.velocity).multiplyScalar(delta);
        this.translateX(scaledVelocity.x);
        this.translateZ(scaledVelocity.z);
        // this.position.y += scaledVelocity.y;
        this.velocity.add(halfAccel);
        this.velocity.add(scaledVelocity.multiply(
            this.ambientFriction
        ));
        this.rotation.set(r.x, r.y, r.z);
        this._aggregateRotation.set(0, 0, 0);
    };
})();