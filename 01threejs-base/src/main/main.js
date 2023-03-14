import * as Three from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from "gsap";
// 应用图形用户界面
import * as dat from 'dat.gui';

// 目标：main-dat.gui应用图形界面更改变量

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

// 修改物体的位置
// cube.position.set(5,0,0)
// cube.position.x = 3;
// cube.scale.set(3,2,1);
// cube.scale.x = 5;

// 物体的旋转
console.log(Math.PI / 4,'Math.PI / 4');
cube.rotation.set(Math.PI / 4,0,0);

// 将几何体添加到场景当中
scene.add(cube);
console.log(cube,'cube')

const gui = new dat.GUI();
gui.add(cube.position,"x").min(0).max(5).step(0.01).name("移动x轴坐标").onChange((value)=>{
    console.log("值被修改了:"+value)
}).onFinishChange((value)=>{
    console.log("完全停下来",value) 
});
// 修改物体的颜色
const params  = {
    color: "#ffff00",
    fn:()=>{
        // 让立方体运动起来
        gsap.to(cube.position,{x:5,duration:2,yoyo:true,repeat:-1})
    }
}
gui.addColor(params,'color').onChange((value)=>{
    console.log("颜色改变了",value) 
    cube.material.color.set(value)
})
// 设置选项框
gui.add(cube,'visible').name("是否显示");
// 点击触发某个事件
gui.add(params,'fn').name("立方体运动");
// 添加文件夹
let folder = gui.addFolder("设置立方体");
folder.add(cube.material,"wireframe");
folder.add(cube.scale,"y").min(0.1).max(5).name("缩放y轴");

// 初始化渲染器
const renderer = new Three.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
console.log(renderer,'111')
// 将webgl渲染到canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene,camera);

// 创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement);  // 相机围绕着目标进行轨道进行运动 360旋转
// 设置控制器的阻尼，让控制器更具有真实效果
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new Three.Clock();

window.addEventListener("dblclick",()=>{
    // 双击控制屏幕进入全屏，退出全屏
    if(document.fullscreenElement){
        // 文档对象退出全屏
        document.exitFullscreen();
    }else{
        // 让画布对象全屏
        renderer.domElement.requestFullscreen();
    }
})


function render(){
    controls.update();
    renderer.render(scene,camera);
    // 浏览器渲染贞，每一帧执行一次,
    // 每一帧动画都是
    requestAnimationFrame(render)
}
render();

window.addEventListener("resize",()=>{
    console.log("屏幕移动了")
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight);

    console.log(window.devicePixelRatio)
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
    // 查看浏览器的像素比  window.devicePixelRatio
});