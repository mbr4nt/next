var n3xt = function(scene) {
    return new N3xt(scene);
};

class N3xt {
    constructor(scene) {
        this.drawing = new n3xt.Drawing([], scene);
        this.scene = scene;
    }

    animate() {
        this.drawing.updateScene();
    }

    add(element) {
        this.drawing.add(element);
    }

}

var tests = [];