n3xt.Group = class {
    constructor(elements=[]) { 
        this.index = {};
        elements.forEach(function(element) {
            this.add(element);
        });
    }

    add(element) {
        this.index[element.id] = element;
        element.group = this;
        this.onAdded(element);
    }

    onAdded(element) { }

    remove(element) {
        this.removeById(element.id);
    }
    
    removeById(id) {
        var element = this.index[id];
        if(element) {
            delete this[id];
            element.group = null;
            this.onRemoved(element);
        }
    }

    onRemoved(element) { }
}