import * as Three from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from "gsap";
// 应用图形用户界面
import * as dat from 'dat.gui';

// 目标：基础材质与纹理

// 1.创建场景
const scene = new Three.Scene();
// 2. 创建相机（各种各样的相机）
const camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // 透视相机
// 设置了相机位置
camera.position.set(0,0,10);
scene.add(camera);


// 导入纹理
const textureLoader = new Three.TextureLoader();
const doorColorTexture = textureLoader.load();

// 添加物体
// 创建几何体
const cubeGeomerty = new Three.BoxBufferGeometry(1,1,1);
// 材质
const basicMaterial = new Three.MeshBasicMaterial({
    color: "#ffff00",
    map: doorColorTexture,  // 纹理
})
const cube = new Three.Mesh(cubeGeomerty,basicMaterial);
scene.add(cube);






// 初始化渲染器
const renderer = new Three.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
// 将webgl渲染到canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement);  // 相机围绕着目标进行轨道进行运动 360旋转
// 设置控制器的阻尼，让控制器更具有真实效果
controls.enableDamping = true;

// 添加坐标轴辅助器   红色代码x轴,绿色代码y轴,蓝色代码Z轴
const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper);

function render(){
    controls.update();
    renderer.render(scene,camera);
    // 浏览器渲染贞，每一帧执行一次,
    // 每一帧动画都是
    requestAnimationFrame(render)
}
render();