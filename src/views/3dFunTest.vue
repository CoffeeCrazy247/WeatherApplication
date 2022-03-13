<template>
  <div class="scene">
    <div id="three-scene-canvas"></div>
    <div>
      <h1>Welcome, to threejs. :)</h1>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  name: "Scene",
  data() {
    return {
      sceneCanvas: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      cube: null,
    };
  },
  mounted() {
    /* **************
       BASIC SETUP
    ************** */
    this.sceneCanvas = document.getElementById("three-scene-canvas");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sceneCanvas.getBoundingClientRect().width /
        this.sceneCanvas.getBoundingClientRect().height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener("change", this.animateThreeJs);
    this.renderer.setSize(
      this.sceneCanvas.offsetWidth,
      this.sceneCanvas.offsetHeight
    );
    this.renderer.setClearColor("#000000");
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMapSoft = true;
    this.renderer.shadowMap.autoUpdate = false;
    this.renderer.shadowMap.needsUpdate = true;
    this.sceneCanvas.append(this.renderer.domElement);

    // lighting
    // let ambientLight = new THREE.AmbientLight (0xdaccff, 0.5)
    // this.scene.add(ambientLight)
    let light = new THREE.PointLight(0xffffff, 10, 0, 2);
    light.position.set(0, 0, 10);
    light.castShadow = true;
    light.shadow.radius = 1;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    this.scene.add(light);
    // Adding a cube
    let geometry = new THREE.SphereBufferGeometry(10, 64, 64);
    // let texture = new THREE.TextureLoader().load( 'https://threejs.org/examples/textures/brick_roughness.jpg' )
    // let texture = new THREE.TextureLoader().load( require("@/textures/rocks.jpg") )
    let texture = new THREE.TextureLoader().load(
      require("@/textures/carbon.jpg")
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    // texture.encoding = THREE.sRGBEncoding

    let material = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
    material.roughness = 0.2;
    material.reflectivity = 0.9;
    material.metalness = 0.4;
    material.map = texture;
    material.normalMap = texture;
    material.roughnessMap = texture;
    material.clearcoat = 0.1;
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);

    this.animateThreeJs();

    window.addEventListener("resize", () => {
      this.resizeCanvas();
    });

    let clock = new THREE.Clock();

    let tick = () => {
      let elapsedTime = clock.getElapsedTime();

      // Update objects
      this.cube.position.z = -0.5 * elapsedTime;
      this.cube.rotation.y = -0.2 * elapsedTime;

      // Update Orbital Controls
      // controls.update()

      // Render
      this.renderer.render(this.scene, this.camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  },
  methods: {
    animateThreeJs() {
      this.renderer.render(this.scene, this.camera);
      this.renderer.shadowMap.needsUpdate = true;
    },

    resizeCanvas() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.animateThreeJs();
    },
  },
};
</script>
<style scoped>
#three-scene-canvas {
  width: 100%;
  height: 95vh;
  overflow: hidden;
  position: absolute;
}
h1 {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.scene{
  height: 95vh;
}
</style>

