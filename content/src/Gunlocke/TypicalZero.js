var gunlocke = n3xt.namespace(gunlocke);

gunlocke.TypicalZero = class extends n3xt.Element {
    constructor(model = {
        woodFinish: "dark",
        tableFinish: "light"
    }) {
        super(model);
        this.name = "Gunlocke Typical Zero";
        this.position.x = -1;
        
    }

    get geometries() {
        var woodColor = this.model.woodFinish == "dark" ? 0x1D1111 : 0xD4BC98;
        // var tableColor = this.model.tableFinish == "dark" ? 0x080808 : 0xaaaaaa;
        var tableColor = this.model.tableFinish == "dark" ? 0x1D1111 : 0xD4BC98;
        return [
            new gunlocke.TypicalZeroGeometry({
                "Grommet": new n3xt.PlainMaterial(0x444444),
                "Wood": new n3xt.PlainMaterial(woodColor),
                "Trough": new n3xt.PlainMaterial(woodColor),
                "Surface": new n3xt.PlainMaterial(tableColor),
                "TVFrame": new n3xt.PlainMaterial(0x020202),
                "TVScreen": new n3xt.PlainMaterial(0x020202)
            }),
            new gunlocke.TVGeometry()
        ];
    }
}

gunlocke.TypicalZeroGeometry = class extends n3xt.StudioGeometry {
    get studioData() {
        return {
            "url":"3d/test-02-3ds.dae","uvScale":3.2,
            "layerMap":{
                "Grommet":[" Extrusion [4678]"," Extrusion [4821]"],
                "Wood":[" Extrusion [2837]"," Extrusion [2980]"," Joined Solid Geometry [3926]"," Extrusion [3949]"," Extrusion [4287]"],
                "Surface":[" Joined Solid Geometry [3927]"],"Trough":[" Extrusion [4360]"],
                "TVFrame":[" Extrusion [5154]"],
                "TVScreen":[" Blend [5296]"," Extrusion [5555]"]}};
    }
}

//TODO: it seems those video textures can't be recreated, that's why i put it in this global var. Gotta think of a solution for that, maybe some video texture cache or something.
var gunlockeVideoTexture = new THREE.VideoTexture( document.getElementById("video") );
gunlockeVideoTexture.minFilter = THREE.LinearFilter;
gunlockeVideoTexture.magFilter = THREE.LinearFilter;
gunlockeVideoTexture.format = THREE.RGBFormat;

gunlocke.TVGeometry = class extends n3xt.Geometry {
    instantiate(model, done) {
        var planeGeometry = new THREE.PlaneGeometry( .98, .54 );
        planeGeometry.rotateY( Math.PI / 2 );

        var parameters = { color: 0xaaaaaa, map: gunlockeVideoTexture };
        var material = new THREE.MeshLambertMaterial( parameters );

        var screen = new THREE.Mesh( planeGeometry, material );
        screen.position.set(.19,1.555,0);        

        done(screen);
    }
}

tests.push(function(engine) {
    engine.add(new gunlocke.TypicalZero({}));
});