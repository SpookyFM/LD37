// The player's base
function Base() {
    THREE.Object3D.apply(this, arguments);

    // How close the player has to be in order to be able to build
    this.interactionRadius = 500;
    
    var floorPart = new BasePart("Floor", 40);
    var ceilingPart = new BasePart("Ceiling", 60);
    
    // Keeps track of the parts we still need to build
    this.partsToBuild = new Array();
    this.builtParts = new Array();
    
    this.partsToBuild.push(ceilingPart);
    for (var i = 0; i < 4; i++)
    {
        var wallPart = new BasePart("Wall"+i, 80);
        this.partsToBuild.push(wallPart);
    }
    this.partsToBuild.push(floorPart);
}

Base.prototype = Object.create(THREE.Object3D.prototype);
Base.prototype.constructor = Resource;

// Returns the name and cost of the next part
Base.prototype.getBuildText = function() {
     // Are there any parts left?
    if (this.partsToBuild.length == 0)
    {
        return "---";
    }
    
    var nextPart = this.partsToBuild[this.partsToBuild.length - 1];
    
    return nextPart.name + " (" + nextPart.resourceCost + ")"; 
};

// Returns true if the base is fully built
Base.prototype.isFullyBuilt = function() {
    return this.partsToBuild.length == 0;
};

// Can the player build the next part?
Base.prototype.canBuildNextPart = function(player) {
    // First, is the player close enough?
    var distance = this.position.distanceTo(player.position);
    if (distance > this.interactionRadius)
    {
        return false;
    }
    
    // Are there any parts left?
    if (this.partsToBuild.length == 0)
    {
        return false;
    }
    
    var nextPart = this.partsToBuild[this.partsToBuild.length - 1];
    
    // Does the player have the resources for this?
    if (player.resources < nextPart.resourceCost)
    {
        return false;
    }
    
    return true;
};

// Build the next part
Base.prototype.buildNextPart = function(player) {
    // Are there any parts left?
    if (this.partsToBuild.length == 0)
    {
        return;
    }
    
    console.log("Building next part.");
    
    var nextPart = this.partsToBuild.pop();
    
    // Deduct the resources from the player
    player.resources -= nextPart.resourceCost;
    
    this.builtParts.push(nextPart);
    
    // TODO: Add graphical representation for this  
};

// A part of the base
function BasePart(name, resourceCost)
{
    this.name = name;
    this.resourceCost = resourceCost;
}