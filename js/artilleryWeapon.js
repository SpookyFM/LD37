/* Weapon that shoots a bullet that explodes on impact or on hitting the target
 * position and then deals heavy damage in a small area */
function ArtilleryWeapon()
{
    Weapon.call(this);
    
    this.name = "Artillery";
    
    this.resourceCost = 150;
    
    // The minimal time between firing in seconds
    this.firingRate = 1;
    
    this.timeSinceLastFire = 0;
}

// Returns true if the weapon can be fired
ArtilleryWeapon.prototype.fire = function(startPosition, targetPosition)) {
    // TODO: Show the weapon effect
};