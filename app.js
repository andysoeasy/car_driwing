var canvas = document.getElementById("animationCanvas");
var ctx = canvas.getContext("2d");
var animationFrame;

// Первое облако
var cloud1 = {
    x: -100,
    y: 50,
    width: 160,
    height: 80,
    speed: 2,
};

// Второе облако
var cloud2 = {
    x: -200,
    y: 120,
    width: 120,
    height: 60,
    speed: 1.8,
};

// Солнце
var sun = {
    x: 50,
    y: 50,
    radius: 40,
};

var wheel_1 = {
    x: 700,
    y: 360,
    radius: 20
};

var wheel_2 = {
    x: 550,
    y: 360,
    radius: 20
};


function drawRoad(){
    ctx.fillStyle = '#2a2922';
    ctx.fillRect(0, 380, 800, 20);
    ctx.fill();

    ctx.strokeStyle = '#738595';
    ctx.moveTo(0, 370);
    ctx.lineTo(800, 370);
    ctx.lineWidth = 5;
    ctx.stroke();

    for (let i = 0; i < 800; i += 20){
        ctx.moveTo(i, 370);
        ctx.lineTo(i, 380);
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

function move(dx){

    /** 
      Функция перемещения объекта на холсте
  
        dx, dx - значения приращения для точек
        построения объекта
  
    */
  
    wheel_1.x += dx;
    wheel_2.x += dx;

    drawCar();
}
  

function drawCar(){

    // кузов
    ctx.strokeStyle = '#7f957e';
    ctx.moveTo(wheel_2.x + 50, wheel_2.y - 50);
    ctx.lineTo(wheel_2.x + 68, wheel_2.y - 76);
    ctx.stroke();


    ctx.fillStyle = '#269522';
    ctx.beginPath();
    ctx.moveTo(wheel_2.x - 50, wheel_2.y - 2);
    ctx.quadraticCurveTo(wheel_2.x - 50, wheel_2.y - 50, wheel_2.x + 50, wheel_2.y - 50);
    ctx.moveTo(wheel_2.x + 50, wheel_2.y - 50);
    ctx.quadraticCurveTo(wheel_1.x + 70, wheel_1.y - 50, wheel_1.x + 50, wheel_2.y - 2);
    ctx.closePath();    
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(wheel_2.x - 50, wheel_2.y - 2);
    ctx.lineTo(wheel_2.x + 50, wheel_2.y - 50);
    ctx.lineTo(wheel_1.x + 50, wheel_2.y - 2);
    ctx.closePath();
    ctx.fill();

    // Арки
    ctx.fillStyle = '#955822';
    ctx.beginPath();
    ctx.arc(wheel_2.x, wheel_2.y, 25, 0, Math.PI, true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#955822';
    ctx.beginPath();
    ctx.arc(wheel_1.x, wheel_1.y, 25, 0, Math.PI, true);
    ctx.closePath();
    ctx.fill();

    // Колеса
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(wheel_1.x, wheel_1.y, wheel_1.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(wheel_2.x, wheel_2.y, wheel_2.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // стилизация шин
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(wheel_1.x, wheel_1.y, wheel_1.radius - 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(wheel_2.x, wheel_2.y, wheel_2.radius - 5, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
}

function drawCloud(x, y) {
    ctx.fillStyle = "#fff"; // белый цвет для облака
    ctx.beginPath();
    ctx.arc(x + 30, y + 40, 30, 0, Math.PI * 2);
    ctx.arc(x + 80, y + 25, 45, 0, Math.PI * 2);
    ctx.arc(x + 140, y + 40, 30, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Тени для создания объема
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(x + 30, y + 40, 30, 0, Math.PI);
    ctx.arc(x + 140, y + 40, 30, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
}

flashlight = {
    x: 40,
    y: 380,
}

function drawFlaslight(){
    for (let i = -10; i < 800; i += 80){
        ctx.strokeStyle = '#7f95b1';
        ctx.beginPath();
        ctx.moveTo(i, flashlight.y);
        ctx.lineTo(i, flashlight.y-120);
        ctx.lineWidth = 7;
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#7f95b1';
        ctx.beginPath();
        ctx.moveTo(i+1, flashlight.y-118);
        ctx.lineTo(i-20, flashlight.y-100);
        ctx.lineWidth = 7;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawSun() {
    let gradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.radius);
    gradient.addColorStop(0, "#fffb89"); // желтый свет
    gradient.addColorStop(1, "transparent"); // прозрачный край

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawSky() {
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#87CEFA"); // голубой цвет сверху
    gradient.addColorStop(1, "#b2dfee"); // более светлый голубой цвет снизу

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    drawSky();
    drawFlaslight();
    drawRoad();
    drawCar();
    move(dx=-2);
    drawSun();

    if (wheel_1.x < -10){
        wheel_1.x = canvas.width + 200;
        wheel_2.x = canvas.width + 50;
    }

    cloud1.x += cloud1.speed;
    if (cloud1.x > canvas.width + cloud1.width) {
        cloud1.x = -cloud1.width;
        // cloud1.y = Math.random() * 150 + 100; // Случайное положение по вертикали
        cloud1.y = 50;
    }
    drawCloud(cloud1.x, cloud1.y);

    cloud2.x += cloud2.speed;
    if (cloud2.x > canvas.width + cloud2.width) {
        cloud2.x = -cloud2.width;
        // cloud2.y = Math.random() * 150 + 250; // Случайное положение по вертикали
        cloud2.y = 100;
    }
    drawCloud(cloud2.x, cloud2.y);

    animationFrame = requestAnimationFrame(animate);
}

function toggleAnimation() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    } else {
        animate();
    }
}

animate(); // Запускаем анимацию сразу