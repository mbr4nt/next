var gunlocke = n3xt.namespace(gunlocke);

gunlocke.TypicalZero = class extends n3xt.Element {
    constructor(model) {
        super(model);
        this.name = "Gunlocke Typical Zero";
    }

    get geometries() {
        console.log("passoqui");
        return [
            new gunlocke.TypicalZeroGeometry()
        ];
    }
}

gunlocke.TypicalZeroGeometry = class extends n3xt.ExternalGeometry {
    constructor() {
        super();
        this.url = "3d/test-02-3ds.dae";
        this.uvScale = 3.5;

        var layerMap = {
            grometBorder: " Extrusion [4678]",
            grometLid: " Extrusion [4821]",
            tvFrame: " Extrusion [5154]",
            tvScreen: " Extrusion [5555]",
            tableTop: " Joined Solid Geometry [3927]",
            tableTray: " Extrusion [4360]"
        };


        this.materialMap = { };
        this.materialMap[layerMap.tableTop] = new n3xt.Material();
        this.materialMap[layerMap.tvFrame] = new n3xt.Material();
        this.materialMap[layerMap.tvScreen] = new n3xt.Material();
        this.materialMap[layerMap.grometBorder] = new n3xt.Material();
        this.materialMap[layerMap.grometLid] = new n3xt.Material();
    }
}

tests.push(function(engine) {
    console.log("passokitoo");
    engine.add(new gunlocke.TypicalZero({}));
});