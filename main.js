
class Drawer
{
	constructor() {
		this.canvas = document.getElementById('canvas')
		this.context = canvas.getContext('2d');
	}

	draw(rotation) {
		const RAD_TO_DEG = 180 / Math.PI;
		const alpha_tmp = (rotation < 180) ? rotation: (360 - rotation);
		const arc_start = -90 / RAD_TO_DEG;
		const arc_end = (alpha_tmp - 90) / RAD_TO_DEG;

		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.beginPath();

		this.context.arc(110, 110, 100, arc_start, arc_end, false);

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
	}
}

class OrientationEvent
{
	constructor()
	{
		this.rotation = 0;
		this.rotation_pre = 0;
		this.orientation = 0;
	}

	addEventListener()
	{
		window.addEventListener('deviceorientation', (e) => {
			if(e.alpha)
			{
				if(e.alpha >= 180)
				{
					this.rotation = e.alpha - 360;
				}
				else
				{
					this.rotation = e.alpha;
				}
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
			console.log(e);
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
	}

	const startButton = document.getElementById("permission-button")
	startButton.addEventListener('click', start, false)

	const id = setInterval( () => {drawer.draw(orientationEvent.rotation); }, 100 );

	window.addEventListener('click', e => { orientationEvent.rotation += 10;});
});
