import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 创建场景
const scene = new THREE.Scene();

// 创建摄像机 -- 透视投影
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
// 场景添加照相机
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

function render() {
  cube.position.x += 0.01;
  cube.rotation.x += 0.01;
  if (cube.position.x >= 5) {
    cube.position.x = 0;
    cube.rotation.x = 0;
  }
  // 使用渲染器，通过相机将场景渲染起来
  renderer.render(scene, camera);
  // 每一帧将页面渲染一次
  requestAnimationFrame(render);
}
render();
