// Heavy AI - Stationary, shoots the artillery weapon
function HeavyAI() {

    this.radius = 40;

    // Number of resources to spawn when the AI is dead
    this.resources = 100;

    // The max health
    this.maxHealth = 200;
    
    // The current health
    this.health = this.maxHealth;
}

HeavyAI.prototype = AI.create(AI.prototype);
HeavyAI.prototype.constructor = HeavyAI;