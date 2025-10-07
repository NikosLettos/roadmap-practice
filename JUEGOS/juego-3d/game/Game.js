import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Inputs } from './inputs.js';


export class Game {
constructor(canvas) {
this.canvas = canvas;
this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
this.scene = new THREE.Scene();
this.scene.background = new THREE.Color('#10141b');


// Cámara
this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
this.camera.position.set(6, 6, 10);
this.controls = new OrbitControls(this.camera, this.renderer.domElement);
this.controls.enableDamping = true;


// Luz
const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 1.0);
this.scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(5, 10, 7);
this.scene.add(dir);


// Plano (suelo)
const plane = new THREE.Mesh(
new THREE.PlaneGeometry(30, 30),
new THREE.MeshStandardMaterial({ color: 0x1c2430, roughness: 0.9, metalness: 0.0 })
);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
this.scene.add(plane);


// Jugador (cubo)
this.player = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
new THREE.MeshStandardMaterial({ color: 0x00c2ff })
);
this.player.position.y = 0.5;
this.player.castShadow = true;
this.scene.add(this.player);


// Monedas (esferas pequeñas)
this.coins = [];
this.spawnCoins(100);


// Estado
this.inputs = new Inputs();
this.score = 0;
this.speed = 5; // unidades por segundo


// Resize
const onResize = () => {
const w = window.innerWidth, h = window.innerHeight;
this.renderer.setSize(w, h, false);
this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
};
window.addEventListener('resize', onResize);
onResize();
}


spawnCoins(n) {
const geo = new THREE.SphereGeometry(0.25, 16, 16);
for (let i = 0; i < n; i++) {
const mat = new THREE.MeshStandardMaterial({ color: 0xffd166, emissive: 0x332200, emissiveIntensity: 0.2 });
const s = new THREE.Mesh(geo, mat);
s.position.set((Math.random() - 0.5) * 20, 0.25, (Math.random() - 0.5) * 20);
s.userData.coin = true;
this.scene.add(s);
this.coins.push(s);
}
}
reset() {
this.player.position.set(0, 0.5, 0);
this.score = 0;
document.getElementById('score').textContent = this.score;
// remover y respawnear monedas
this.coins.forEach(c => this.scene.remove(c));
this.coins = [];
this.spawnCoins(10);
}


update(dt) {
// Movimiento del jugador en XZ
const h = this.inputs.getHorizontal();
const v = this.inputs.getVertical();
const dir = new THREE.Vector3(h, 0, -v); // -v para que W avance hacia adelante
if (dir.lengthSq() > 0) {
dir.normalize().multiplyScalar(this.speed * dt);
this.player.position.add(dir);
}


// Rotación simpática
this.player.rotation.y += dt * 1.5;


// Recolección de monedas (colisión simple por distancia)
for (let i = this.coins.length - 1; i >= 0; i--) {
const c = this.coins[i];
const d = c.position.distanceTo(this.player.position);
if (d < 0.8) {
this.scene.remove(c);
this.coins.splice(i, 1);
this.score++;
document.getElementById('score').textContent = this.score;
}
}


this.controls.update();
}


render() {
this.renderer.render(this.scene, this.camera);
}
}
