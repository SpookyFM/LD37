/* Weapon that sends out damage in a sphere around the player,
 * and hurts depending on distance from the player */
function SphereWeapon()
{
    Weapon.call(this);
    
    this.name = "Shock wave";
    
    this.resourceCost = 100;
    
    // The minimal time between firing in seconds
    this.firingRate = 1;
    
    this.timeSinceLastFire = 0;
}

// Returns true if the weapon can be fired
SphereWeapon.prototype.fire = function(startPosition, targetPosition)) {
    // TODO: Show the weapon effect
};