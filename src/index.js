// Check before the polyfill runs.
window.hasNativeWebVRImplementation = !!window.navigator.getVRDisplays || !!window.navigator.getVRDevices;

// WebVR polyfill
var WebVRPolyfill = require('webvr-polyfill');
window.webvrpolyfill = new WebVRPolyfill(window.WebVRConfig);

var utils = require('./utils/');

// Workaround for iOS Safari canvas sizing issues in stereo (webvr-polyfill/issues/102).
// Only for iOS on versions older than 10.
if (utils.device.isIOSOlderThan10(window.navigator.userAgent)) {
  window.WebVRConfig.BUFFER_SCALE = 1 / window.devicePixelRatio;
}

// Required before `AEntity` so that all components are registered.
var AScene = require('./core/scene/a-scene').AScene;
var components = require('./core/component').components;
var registerComponent = require('./core/component').registerComponent;
var registerGeometry = require('./core/geometry').registerGeometry;
var registerPrimitive = require('./extras/primitives/primitives').registerPrimitive;
var registerShader = require('./core/shader').registerShader;
var registerSystem = require('./core/system').registerSystem;
var shaders = require('./core/shader').shaders;
var systems = require('./core/system').systems;
// Exports THREE to window so three.js can be used without alteration.
var THREE = window.THREE = require('./lib/three');

var pkg = require('../package');

require('./components/index'); // Register standard components.
require('./geometries/index'); // Register standard geometries.
require('./shaders/index'); // Register standard shaders.
require('./systems/index'); // Register standard systems.
var ANode = require('./core/a-node');
var AEntity = require('./core/a-entity'); // Depends on ANode and core components.

console.log('A-Frame Version: 0.8.2 (Date 2018-04-22, Commit #429591a7)');
console.log('three Version:', pkg.dependencies['three']);
console.log('WebVR Polyfill Version:', pkg.dependencies['webvr-polyfill']);

module.exports = window.AFRAME = {
  AComponent: require('./core/component').Component,
  AEntity: AEntity,
  ANode: ANode,
  AScene: AScene,
  components: components,
  geometries: require('./core/geometry').geometries,
  registerComponent: registerComponent,
  registerElement: require('./core/a-register-element').registerElement,
  registerGeometry: registerGeometry,
  registerPrimitive: registerPrimitive,
  registerShader: registerShader,
  registerSystem: registerSystem,
  scenes: require('./core/scene/scenes'),
  schema: require('./core/schema'),
  shaders: shaders,
  systems: systems,
  THREE: THREE,
  utils: utils,
  version: pkg.version
};
