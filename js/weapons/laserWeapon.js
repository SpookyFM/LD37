// Laser weapon, default for the player
function LaserWeapon() {
    
    Weapon.call(this);
    
    // The minimal duration in seconds between shots of this weapon
    this.firingRate = 0.5;
    
    // The cost of building this weapon
    this.resourceCost = 0;
    
    // Is this weapon built?
    this.isBuilt = true;
    
    // How much damage the weapon does on hitting
    this.damage = 10;
    
    // How long the laser should be visible for
    this.laserVisibleFor = 0.2;
    
    this.targetPlayer = false;
}

LaserWeapon.prototype = Object.create(Weapon.prototype);
LaserWeapon.prototype.constructor = LaserWeapon;


LaserWeapon.prototype.shoot = function(fromPosition, toPosition)
{
    Weapon.prototype.shoot.call(this, fromPosition, toPosition);
    //console.log("Laser weapon was shot!");
    
    // Find the angle between the forward vector and the target vector
    var targetVector = new THREE.Vector3();
    targetVector.subVectors(toPosition, fromPosition);
    // console.log(targetVector);
    var forwardVector = new THREE.Vector3(0, 0, 1);
    var angle = forwardVector.angleTo(targetVector);
    if (targetVector.x < 0)
    {
        angle = -angle;
    }
    this.laserMesh.rotation.y = angle + de2ra(180);
    
    // The laser is automatically shown for a moment
    
    // Check if we hit something
    targetVector.normalize();
    var raycaster = new THREE.Raycaster(fromPosition, targetVector);
    
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( enemies );
    if (intersects.length > 0) {
        for (var i = 0; i < intersects.length; i++)
        {
            if (intersects[i].object.reduceHealth)
            {
                intersects[i].object.reduceHealth(this.damage);
            }
        }
       // console.log("weapon hit something!");
    }
    if (this.targetPlayer)
    {
        intersects = raycaster.intersectObject( player );
        if (intersects.length > 0) {
        for (var i = 0; i < intersects.length; i++)
        {
            if (intersects[i].object.reduceHealth)
            {
                intersects[i].object.reduceHealth(this.damage);
            }
        }
       // console.log("weapon hit something!");
    }
    }
}

LaserWeapon.prototype.attachToPlayer = function(thePlayer)
{
    // We make a thin plane attached to the player
    var length = 2000;
    var laserGeometry = new THREE.PlaneGeometry(10, length);
    laserGeometry.translate(0, length * 0.5, 0);
    // laserGeometry.rotateZ(de2ra(90));
    laserGeometry.rotateX(de2ra(-90));
    var laserMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });
    laserMaterial.transparent = true;
 
    
    
    this.laserMesh = new THREE.Mesh(laserGeometry, laserMaterial);
    this.laserMesh.position.y += 50;
    this.laserMesh.material.opacity = 0;
    thePlayer.add(this.laserMesh);
}

LaserWeapon.prototype.update = function(deltaTime)
{
    Weapon.prototype.update.call(this, deltaTime);
    if (this.timeSinceLastShot < this.laserVisibleFor)
    {
        this.laserMesh.material.opacity = 100;
    } else
    {
        this.laserMesh.material.opacity = 0;
    }
}

