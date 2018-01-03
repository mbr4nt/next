n3xt.Element = class {
    constructor(model=null, position=new n3xt.Position()) {
        this.model = model;
        this.position = position;
        this.id = n3xt.functions.guid();
        this.group = null;
        this.status = n3xt.elementStatus.stale; 
        this.name = "Generic Element";
        //keeps reference for THREE.js objects which are currently in the scene and have come from this
        this.threeObjs = [];
    }


    fetch3D(done) {
        var self = this;
        var geometries = self.geometries;

        async.map(geometries, function(geometry, callback){
            geometry.instantiate(self.model, function(threeObj) {
                callback(null, threeObj);
            });
        }, function(err, result) {
            done(result);
        });
    }

    get geometries() {
        return [];
    }

    remove() {
        if(this.group) this.group.remove(this);
    }

    invalidate() {
        if(this.group) this.group.invalidate(this);
    }
}

n3xt.elementStatus = {
    stale: -1,
    processing: 0,
    valid: 1
}