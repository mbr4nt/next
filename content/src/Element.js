n3xt.Element = class {
    constructor(model=null, position=new n3xt.Position()) {
        this.model = model;
        this.position = position;
        this.id = n3xt.functions.guid();
        this.group = null;
        this.status = n3xt.elementStatus.stale; 
    }

    fetch3D(done) {
        done(null);
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