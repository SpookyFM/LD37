// http://opengameart.org/content/top-down-sci-fi-shooterdefense-pack
// http://opengameart.org/content/2d-shooter-effects-alpha-version

// A weapon
function Weapon()
{
    this.name = "Weapon name";
    
    // Number of resources required to build the weapon
    this.resourceCost = 100;
    
    // The minimal time between firing in seconds
    this.firingRate = 0.5;
    
    this.timeSinceLastFire = 0;
}

// Returns true if the weapon can be fired
Weapon.prototype.canFire = function()) {
    return this.timeSinceLastFire >= this.firingRate;
};

Weapon.prototype.update = function(deltaTime) {
    this.timeSinceLastFire += deltaTime;
};