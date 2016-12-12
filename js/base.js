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
    
    this.partMeshes = new Array();
    
    var fullExtent = 300;
    
    var wallGeometry = new THREE.BoxGeometry(fullExtent, fullExtent, 30);
    var floorGeometry = new THREE.BoxGeometry(fullExtent, 30, fullExtent);
    var buildingPartUnbuiltMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    });
    buildingPartUnbuiltMaterial.opacity = 0.3;
    buildingPartUnbuiltMaterial.transparent = true;
    
    this.buildingPartBuiltMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000
    });

    
    var floorMesh = new THREE.Mesh(floorGeometry, buildingPartUnbuiltMaterial);
    this.add(floorMesh);
    
    var ceilingMesh = floorMesh.clone();
    ceilingMesh.position.y += fullExtent * 0.5;
    
    this.partMeshes.push(ceilingMesh);
    
    
    var wallMesh = new THREE.Mesh(wallGeometry, buildingPartUnbuiltMaterial);
    var wallMesh2 = wallMesh.clone();
    var wallMesh3 = wallMesh.clone();
    var wallMesh4 = wallMesh.clone();
    wallMesh.position.x += fullExtent * 0.5;
    wallMesh.rotateY(de2ra(90));
    this.partMeshes.push(wallMesh);

    
    wallMesh2.position.x -= fullExtent * 0.5;
    wallMesh2.rotateY(de2ra(90));
    this.partMeshes.push(wallMesh2);
    
    wallMesh3.position.z -= fullExtent * 0.5;
    this.partMeshes.push(wallMesh3);
    
    wallMesh4.position.z += fullExtent * 0.5;
    this.partMeshes.push(wallMesh4);
    
    

    this.currentMesh = floorMesh;
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
    
    // First, is the player close enough?
    var distance = this.position.distanceTo(player.position);
    if (distance > this.interactionRadius)
    {
        return "Too far away to build.";
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
    

    this.currentMesh.material = this.buildingPartBuiltMaterial;
        // Show this building step
    if (this.partMeshes.length == 0)
    {
        return;
    }
    
    this.currentMesh = this.partMeshes.pop();
    this.add(this.currentMesh);
};

// A part of the base
function BasePart(name, resourceCost)
{
    this.name = name;
    this.resourceCost = resourceCost;
}