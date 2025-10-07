export class Inputs {
constructor() {
this.keys = new Set();
window.addEventListener('keydown', (e) => this.keys.add(e.key.toLowerCase()));
window.addEventListener('keyup', (e) => this.keys.delete(e.key.toLowerCase()));
}
getHorizontal() {
// A/D o flechas izq/der
return (this.keys.has('a') || this.keys.has('arrowleft') ? -1 : 0)
+ (this.keys.has('d') || this.keys.has('arrowright') ? 1 : 0);
}
getVertical() {
// W/S o flechas arriba/abajo
return (this.keys.has('w') || this.keys.has('arrowup') ? 1 : 0)
+ (this.keys.has('s') || this.keys.has('arrowdown') ? -1 : 0);
}
}