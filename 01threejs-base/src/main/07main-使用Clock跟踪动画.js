import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 目标：通过Clock跟踪时间处理动画

// 1.创建场景
const scene = new Three.Scene();

// 2. 创建相机（各种各样的相机）
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); // 透视相机

// 设置了相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 1. 创建几何体
const cubeGeomerty = new THREE.BoxGeometry();
// 2. 添加材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 3. 根据几何体和材质创建物体  - Mesh表示基于以三角形为polygon mesh（多边形网格）的物体的类
const cube = new THREE.Mesh(cubeGeomerty, cubeMaterial);

// 物体的移动
console.log(cube);
cube.position.x = 2;
cube.position.y = 2;
// cube.position.z = -2;

// 物体的旋转
// cube.rotation.set(Math.PI / 4, Math.PI / 4, 0);

// 物体的缩放
cube.scale.x = 2;
cube.scale.set(2, 3, 1.5);

// 4. 添加到场景中
scene.add(cube);

// 场景，摄像机，物体都有了，开始渲染吧

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer实例上有domElement的canvas对象
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染起来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement); //  相机围绕着目标进行轨道进行运动 360旋转

// 添加三维辅助线
// 用于简单模拟3个坐标轴的对象. 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new Three.Clock();

function render() {
  // // time原来越大
  // let t = time / 1000 % 5;
  // cube.position.x = t * 1;
  // console.log(t * 1);
  // 获取时钟运行的总时长
  let time = clock.getElapsedTime();
  let deltaTime = clock.getDelta();
  console.log("时钟运行的总时长", time);
  // console.log("两次获取时间的间隔时间",deltaTime);

  renderer.render(scene, camera);
  // 浏览器渲染贞，每一帧执行一次,
  // 每一帧动画都是
  requestAnimationFrame(render);
}
render();
