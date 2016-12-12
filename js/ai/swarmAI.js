// Swarm AI - Spawned in a big pack, will swarm the player and do melee
function SwarmAI() {

    this.radius = 40;

    // Number of resources to spawn when the AI is dead
    this.resources = 5;

    // The max health
    this.maxHealth = 50;
    
    // The current health
    this.health = this.maxHealth;
}

SwarmAI.prototype = AI.create(AI.prototype);
SwarmAI.prototype.constructor = SwarmAI;