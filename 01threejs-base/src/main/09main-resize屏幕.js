import * as Three from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from "gsap";

// 目标：监听画面变化，更新渲染画面

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

// 设置动画 -- gsap库
// ease  速度
const animate1 = gsap.to(cube.position,{
    x:5,
    // 动画时长
    duration:5,
    // 设置重复的次数，无限次循环-1
    repeat:2,
    // 往返运动
    yoyo: true,
    // 延迟多久运动
    delay: 2,
});
gsap.to(cube.rotation,{x:2*Math.PI,duration:5,ease:"power1.out",onComplete:()=>{
    console.log("动画完成")
},onStart:()=>{
    console.log("动画开始")
}})

window.addEventListener("dblclick",()=>{
    console.log("db")
    if(animate1.isActive()){
        // 暂停
        animate1.pause();
    }else{
        // 恢复
        animate1.resume();
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