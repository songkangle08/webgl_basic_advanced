import * as Three from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from "gsap";
// 应用图形用户界面
import * as dat from 'dat.gui';

// 目标：打造酷炫的三角形

// 1.创建场景
const scene = new Three.Scene();
// 2. 创建相机（各种各样的相机）
const camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // 透视相机
// 设置了相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 添加物体
// 创建几何体

for(let i = 0;i<50;i++){
    // 每一个三角形,需要3个顶点,每个顶点需要3个值
    const geometry = new Three.BufferGeometry();
    const positionArray =  new Float32Array(9);
    for(let j = 0;j<9;j++){
        positionArray[j] = Math.random() * 10 -5;
    }
    let color = new Three.Color(Math.random(),Math.random(),Math.random())
    const material = new Three.MeshBasicMaterial({color:color,opacity:Math.random(),transparent:true})
    geometry.setAttribute('position',new Three.BufferAttribute(positionArray,3));
    const mesh = new Three.Mesh(geometry,material);
    // 4. 添加到场景中
    scene.add(mesh);
}



// const vertices = new Float32Array([
//     -1.0,-1.0,1.0,
//     1.0,-1.0,1.0,
//     1.0,1.0,1.0,
//     1.0,1.0,1.0,
//     -1.0,1.0,1.0,
//     -1.0,-1.0,1.0
// ])
// const material = new Three.MeshBasicMaterial({color:0xffff00})
// geometry.setAttribute('position',new Three.BufferAttribute(vertices,3));
// const mesh = new Three.Mesh(geometry,material);
// console.log(mesh);
// // 4. 添加到场景中
// scene.add(mesh);

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

