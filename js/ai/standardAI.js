// Standard AI - Roams around randomly and alone, is relatively simple to defeat, drops few resources
function StandardAI() {

    this.radius = 40;

    // Number of resources to spawn when the AI is dead
    this.resources = 20;

    // The max health
    this.maxHealth = 100;
    
    // The current health
    this.health = this.maxHealth;
}

StandardAI.prototype = AI.create(AI.prototype);
StandardAI.prototype.constructor = StandardAI;