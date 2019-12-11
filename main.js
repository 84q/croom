
class Drawer
{
	constructor()
	{
		this.canvas = document.getElementById('canvas')
		this.context = canvas.getContext('2d');
	}

	draw(rotation, ng)
	{
		const RAD_TO_DEG = 180 / Math.PI;
		let arc_start, arc_end;
		if(rotation < 0)
		{
			arc_start = rotation - 90;
			arc_end = -90;
		}
		else
		{
			arc_start = -90;
			arc_end = rotation - 90;
		}

		document.getElementById("start").innerHTML = arc_start;
		document.getElementById("end").innerHTML = arc_end;

		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.beginPath();

		this.context.arc(110, 110, 100, arc_start/RAD_TO_DEG, arc_end/RAD_TO_DEG, false);

		// 塗りつぶしの色
		this.context.fillStyle = "rgba(0,0,0,0)";
		// 塗りつぶしを実行
		this.context.fill();
		// 線の色
		this.context.strokeStyle = "purple";
		// 線の太さ
		this.context.lineWidth = 8;
		// 線を描画を実行
		this.context.stroke();


		this.context.fillStyle = "blue";
		this.context.font = "30px 'ＭＳ ゴシック'";
		this.context.textAlign = "left";
		this.context.textBaseline = "top";
		this.context.fillText(ng, 10, 10);
	}
}

class OrientationEvent
{
	constructor()
	{
		this.n = 0;
		this.rotation = 0;
		this.alpha_pre = 0;
		this.ng_num = 0;
		this.correction = 0;
	}

	addEventListener()
	{
		window.addEventListener('deviceorientation', (e) => {
			this.n += 1;
			document.getElementById("num").innerHTML = this.n;
			if(!e.alpha) { e.alpha = 0; }

			//e.alpha += this.correction;
			//const diff = Math.abs(e.alpha) - Math.abs(this.alpha_pre);
			//if(Math.abs(diff) > 10)
			//{
			//	this.ng_num += 1;
			//	this.correction += diff;
			//	e.alpha += diff;
			//	document.getElementById("corr").innerHTML = this.correction;
			//	document.getElementById("before").innerHTML = this.alpha_pre;
			//	document.getElementById("after").innerHTML = e.alpha;
			//}
			//this.alpha_pre = e.alhpa;

			if(e.alpha >= 180)
			{
				this.rotation = 360 - e.alpha;
			}
			else
			{
				this.rotation = - e.alpha;
			}

			document.getElementById("rot").innerHTML = this.rotation;
		});
	}

	isPermissionRequired()
	{
		return ((typeof DeviceOrientationEvent.requestPermission) === 'function')
	}

	addEvent()
	{
		if(this.isPermissionRequired())
		{
			DeviceOrientationEvent.requestPermission()
				.then((state) => {
					if (state === 'granted') { this.addEventListener(); }
				})
				.catch(console.error);
		}
		else
		{
			this.addEventListener();
		}
	}
}

class MotionEvent
{
	constructor()
	{
		this.tiltx = 0;
		this.tilty = 0;
	}

	addEventListener()
	{
		window.addEventListener('devicemotion', (e) => {
			//console.log(e);
			const RAD_TO_DEG = 180 / Math.PI;
			const x = e.accelerationIncludingGravity.x - e.acceleration.x;
			const y = e.accelerationIncludingGravity.y - e.acceleration.y;
			const z = e.accelerationIncludingGravity.z - e.acceleration.z;
			this.tiltx = Math.atan(x/z);
			this.tilty = Math.atan(y/z);
			document.getElementById("tiltx").innerHTML = (this.tiltx * RAD_TO_DEG)
			document.getElementById("tilty").innerHTML = (this.tilty * RAD_TO_DEG)
		});
	}

	isPermissionRequired()
	{
		return ((typeof DeviceMotionEvent.requestPermission) === 'function')
	}

	addEvent()
	{
		if(this.isPermissionRequired())
		{
			DeviceMotionEvent.requestPermission()
				.then((state) => {
					if (state === 'granted') { this.addEventListener(); }
				})
				.catch(console.error);
		}
		else
		{
			this.addEventListener();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const RAD_TO_DEG = 180 / Math.PI;
	const drawer = new Drawer();
	const orientationEvent = new OrientationEvent();
	const motionEvent = new MotionEvent();

	const start = (e) => {
		orientationEvent.addEvent();
		motionEvent.addEvent();
		// ボタンは一度押されたら無効にする
		e.target.disabled = true;
		document.getElementById("start-button").disabled = true;
		document.getElementById("end-button").disabled = false;
	}

	const startButton = document.getElementById("start-button")
	startButton.addEventListener('click', start, false)

	const id = setInterval( () => {drawer.draw(orientationEvent.rotation, orientationEvent.ng_num); }, 100 );

	window.addEventListener('click', e => {
		orientationEvent.rotation += 10;
		document.getElementById("rot").innerHTML = orientationEvent.rotation;
	});
});

