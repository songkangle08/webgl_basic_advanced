import * as Three from 'three';

// console.log(Three,'Three')

// 目标：了解three.js的最基本的内容

// 1.创建场景
const scene = new Three.Scene();

// 2. 创建相机（各种各样的相机）
const camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); // 透视相机

// 设置了相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubGeomerty = new Three.BoxGeometry();
// 材质
const cubeMaterial = new Three.MeshBasicMaterial({color:0xffff00});

// 根级几何体和材质创建物体
const cube = new Three.Mesh(cubGeomerty,cubeMaterial);

// 将几何体添加到场景当中
scene.add(cube);

// 初始化渲染器
const renderer = new Three.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
console.log(renderer,'111')
// 将webgl渲染到canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene,camera);



// 场景  相机  材质  把相机和材质添加到场景中，用渲染器把场景渲染出来

