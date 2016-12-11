// The default weapon, a not-so-powerful laser
function StandardWeapon()
{
    Weapon.call(this);
    
    this.name = "Basic laser";
    
    // Free, since we don't need to build it
    this.resourceCost = 0;
    
    // The minimal time between firing in seconds
    this.firingRate = 0.5;
    
    this.timeSinceLastFire = 0;
}

// Returns true if the weapon can be fired
StandardWeapon.prototype.fire = function(startPosition, targetPosition)) {
    // TODO: Show the weapon effect
};