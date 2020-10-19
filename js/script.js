var W=1560, H=650;//размеры холста

 //W=parseInt(document.body.clientWidth);
// H=parseInt(document.body.clientHeight);

var scene = new THREE.Scene();//создание новой сцены
var camera = new THREE.PerspectiveCamera(1, W/H, 1, 10000);
// создание камеры с параметрами(почитай)

var renderer = new THREE.WebGLRenderer();
// рендер сцены и елементов
renderer.setSize(W, H);
document.body.appendChild(renderer.domElement);//создание дом елемента в боди

//texture
var load = new THREE.TextureLoader().load("image/e.jpg");//подгрузка текстуры
load.anisotropy = 20;
var material = new THREE.MeshBasicMaterial({
    map: load,
    overdraw: true
});//создание "материала" для фигуры(заливка)

//light
var spotLight = new THREE.SpotLight( 0xffffff );//добавление прямого белого света
spotLight.position.set( -40, 60, -10 );//позиция источника света на сцене
scene.add(spotLight );//добавление света на сцену

var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );//добавление точечного источника красного света
pointLight.position.set( 10, 10, 10 );//позиция источника
scene.add( pointLight );

//texture for skybox
var imagePrefix = "image/";
var directions  = ["right", "left", "front", "back", "down","top" ];
var imageSuffix = ".png";

var materialArray = [];

//skybox
var skyGeometry = new THREE.CubeGeometry( 20, 20, 20 );//создание геометрии куба со сторонами 25 25 25
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );//закраска куба в текстуру
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );//создание куба
skyBox.rotation.x += Math.PI/2;
scene.add( skyBox );

function getRandomInt(min, max){return Math.floor(Math.random() * (max - min));}//функция рандома
var octahedron;
function CreateOctahedron(){//реализация списков через массивы(в WEBGl нет списков)
        //octahedron
        var octahedronGeometry = new THREE.OctahedronGeometry(2,1);
        var octahedronMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
        octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);

        octahedron.position.y =1;
        octahedron.position.x = Math.PI*(3);
        octahedron.position.z = Math.PI*(0);

        scene.add(octahedron);
    return octahedron;
}

//surfaceGeometry
var surfaceGeometry = new THREE.ParametricGeometry(surfaceFunction, 64, 64);//создание геометрии поверхности за функцией и указывание ее размеров на сцене
// var material1 = new THREE.LineBasicMaterial( {color: 0xFFCF40, wireframe: true} );
var surface = new THREE.Mesh( surfaceGeometry, material );//создание поверхности
scene.add(surface);//добавление ее на сцену
var dodecahedron;
function CreateDodecahedron(){

  //  var rand =getRandomInt(0,3);
    //dodecahedron
    var dodecahedronGeometry = new THREE.DodecahedronGeometry(2,1);
    // var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
    dodecahedron = new THREE.SkinnedMesh(dodecahedronGeometry,material);

    dodecahedron.position.x=-3.5;
    dodecahedron.position.z=1.96+Math.PI*(-1);
    dodecahedron.position.y=1.96;
    dodecahedron.rotation.y += 0.005;
    dodecahedron.rotation.x += 0.0075;
    scene.add(dodecahedron);
        
    
    return dodecahedron;
}

function surfaceFunction( u, v ) {//функция, которая математически описывает нашу поверхность
    var x,y,z;  // A point on the surface, calculated from u,v.
    // u  and v range from 0 to 1.
    x =  (u - 0.5);  // x and z range from -10 to 10
    y =  (v - 0.5);
    z = (Math.sin (x) * Math.sqrt (y));//изменить только это значение, поменявши у на z
    return new THREE.Vector3( x, y, z );
}

camera.position.z = 500;//позиция камеры на сцене
// camera.position.y = 200;

var x=2500, y=0;//позиция мышки

document.addEventListener('mousemove', function(event){
  //  x = parseInt(event.offsetX);
   // y = parseInt(event.offsetY);
   // console.log(spotLight.position)
    //spotLight.position.set(x, y, -10 );//вращение источника света за мышкой
});

document.onkeydown = handleButtonClick

function handleButtonClick(e) {
    let changed = false
   //R = 2500
    switch (e.code) {
      case 'KeyW': 
        if (y >= 2500) {
            y-=100
        } else if (y <= -2500) {
            y+=100
        } else {
            y+=100
        }
        x = Math.sqrt(2500*2500 - y*y)
        changed = true
        break
      case 'KeyS':
        if (y >= 2500) {
            y-=100
        } else if (y <= -2500) {
            y+=100
        } else {
            y-=100
        }
        x = Math.sqrt(2500*2500 - y*y)
        changed = true
        break
      case 'KeyA':
        if (x >= 2500) {
            x-=100
        } else if (x <= -2500) {
            x+=100
        } else {
            x+=100
        }
        y = Math.sqrt(2500*2500 - x*x)
        changed = true
        break
      case 'KeyD':
        if (x >= 2500) {
            x-=100
        } else if (x <= -2500) {
            x+=100
        } else {
            x-=100
        }
        y = Math.sqrt(2500*2500 - (x)*(x))
        changed = true
        break
    }
      
      if (changed) {
          console.log(camera.position)
       /* dodecahedron.rotation.x += x;
        dodecahedron.rotation.y += y;*/
        /*camera.position.x += x;//вращение камеры за мышкой
        camera.position.y += y;//вращение камеры за мышкой*/
        //spotLight.position.set(spotLight.position.x + x, spotLight.position.y + y, );
    }
  }

  var controls = new OrbitControls( camera, renderer.domElement );

  camera.position.set( 0, 20, 100 );
  controls.update();
var render = function () {
    requestAnimationFrame(render);

   /* CreateOctahedron();
    CreateDodecahedron();*/

   /* camera.position.x = x;//вращение камеры за мышкой
    camera.position.y = y;//вращение камеры за мышкой
    camera.lookAt( surface.position );//предмет слежения камеры - поверхность
    */
    //spotLight.rotation.y=+0.001;
    //spotLight.rotation.x=-0.001;
    controls.update();
    renderer.render(scene, camera);//рендер камеры и сцены
};

render();
console.log(camera)