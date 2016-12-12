// Base class for weapons
function Weapon() {
        
    // The minimal duration in seconds between shots of this weapon
    this.firingRate = 0.5;
    
    // The time since the last shot was fired
    this.timeSinceLastShot = 0.0;
    
    // The cost of building this weapon
    this.resourceCost = 100;
    
    // Is this weapon built?
    this.isBuilt = false;
}

Weapon.prototype.constructor = Weapon;
Weapon.prototype.update = function(deltaTime)
{
    this.timeSinceLastShot += deltaTime;
    // console.log(this.timeSinceLastShot);
}

Weapon.prototype.canShoot = function()
{
    // console.log("Weapon built: " + this.isBuilt);
   // console.log("Firing rate: " + this.timeSinceLastShot);
    return this.isBuilt & this.timeSinceLastShot >= this.firingRate;
}

Weapon.prototype.shoot = function(fromPosition, toPosition)
{
   // console.log("Base class was shot");
    this.timeSinceLastShot = 0;
}


