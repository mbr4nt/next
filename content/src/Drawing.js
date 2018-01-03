n3xt.Drawing = class extends n3xt.Group {
    constructor(elements, scene) {
        super(elements);
        this.scene = scene;

        this.stalePool = [];
        this.processing = [];
    }

    updateScene() {
        var self = this;
        var staleElements = [];

        var killList = [];

        var index = this.index;
        var scene = this.scene;

        this.stalePool.forEach(function(id){
            var element = index[id];
            if(element) {
                staleElements.push(element);
                //cleanup old 3d
                element.threeObjs.forEach(function(oldObj){
                    killList.push(oldObj);
                });
            }
        });

        async.map(staleElements, this.fetchElement3D, function(err, result) {
            result.forEach(function(info) {
                info.forEach(function(item){
                    item.element.threeObjs.push(item.new3D);
                    self.copyPosition(item.element, item.new3D);
                    scene.add(item.new3D);
                    item.element.status = n3xt.elementStatus.valid;
                });
            });

            killList.forEach(function(oldObj){
                scene.remove(oldObj);
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

    copyPosition(fromElement, toThreeObj) {
        toThreeObj.position.x += fromElement.position.x;
        toThreeObj.position.y += fromElement.position.y;
        toThreeObj.position.z += fromElement.position.z;
        toThreeObj.rotateY(fromElement.position.yaw);
    }
}