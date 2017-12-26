n3xt.Drawing = class extends n3xt.Group {
    constructor(elements, scene) {
        super(elements);
        this.scene = scene;

        this.stalePool = [];
        this.processing = [];
    }

    updateScene() {
        var staleElements = [];

        var index = this.index;
        var scene = this.scene;

        this.stalePool.forEach(function(id){
            var element = index[id];
            if(element) {
                staleElements.push(element);
            }
        });

        async.map(staleElements, this.fetchElement3D, function(err, result) {
            result.forEach(function(info) {
                info.forEach(function(item){
                    if(item.old3D) scene.remove(item.old3D);
                    item.element.threeObj = item.new3D;
                    scene.add(item.new3D);
                    item.element.status = n3xt.elementStatus.valid;
                });
            });
        });
        this.updateStatus();
    }

    fetchElement3D(element, callback) {
        
        element.fetch3D(function(threeObjs){
            var info = [];
            threeObjs.forEach(function(threeObj) {
                threeObj.n3xtID = element.id;
                info.push({
                    element: element,
                    old3D: element.threeObj,
                    new3D: threeObj
                });
            });
            callback(null, info);
        });
    }

    updateStatus() {
        var pool = this.stalePool;
        var index = this.index;

        pool.forEach(function(id) {
            pool.pop(id);
            var element = index[id];
            if(element) {
                element.status = n3xt.elementStatus.processing;
            }
        });
    }

    cleanupStale3D() {
        var pool = this.stalePool;
        var index = this.index;
        var scene = this.scene;
        
        this.scene.traverse(function(child){
            if(pool.indexOf(child.n3xtID) != -1) {
                var element = index[child.n3xtID];
                if(element) scene.remove(element);
            }
        });
    }

    

    removeFromStalePool(element) {
        this.stalePool.pop(element.id);
    }

    invalidate(element) {
        element.status = n3xt.elementStatus.stale;
        this.stalePool.push(element.id);
    }



    /************ syncing with THREE.js scene ************ */
    onAdded(element) {
        this.invalidate(element);
    }

    onRemoved(element) {
        this.removeFromStalePool(element);
    }
}