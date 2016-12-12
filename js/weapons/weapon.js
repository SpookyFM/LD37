// Base class for weapons
function Weapon() {

    
    
    
    // The minimal duration in seconds between shots of this weapon
    this.firingRate = 0.5;
    
    // The time since the last shot was fired
    this.timeSinceLastShot;
    
    // The cost of building this weapon
    this.resourceCost = 100;
    
    // Is this weapon built?
    this.isBuilt = false;
    
}

Weapon.prototype.constructor = Weapon;

Weapon.prototype.update = function(deltaTime)
{
    this.timeSinceLastShot += deltaTime;
}

Weapon.prototype.canShoot = function()
{
    return this.isBuilt & this.timeSinceLastShot >= this.firingRate;
}

Weapon.prototype.shoot = function(fromPosition, toPosition)
{
    this.timeSinceLastShot = 0;
}


