
class Drawer
{
	constructor()
	{
		this.svg = document.getElementById('svg')
	}

	draw(rotation)
	{
		const rounded = Math.round(rotation);
		const left = 180 - Math.abs(rounded);
		const disp_right_arrow = (left != 0) && (rounded >= 0);
		const disp_left_arrow  = (left != 0) && (rounded <= 0);
		document.getElementById("deg-left").innerHTML = left + "°";
		document.getElementById("arrow-r").style.display = (disp_right_arrow ? "inline" : "none");
		document.getElementById("arrow-l").style.display = (disp_left_arrow  ? "inline" : "none");
		document.getElementById("rounded").innerHTML = rounded;
		document.getElementById("left").innerHTML = left;
	}
}

class OrientationEvent
{
	constructor()
	{
		this.rotation = 0;
		this.alpha_pre = 0;
		this.ng_num = 0;
		this.correction = 0;
	}

	addEventListener()
	{
		window.addEventListener('deviceorientation', (e) => {
			let alpha = e.alpha;
			if(!alpha) { alpha = 0; }

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

			if(alpha >= 180)
			{
				this.rotation = 360 - alpha;
			}
			else
			{
				this.rotation = - alpha;
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
		this.current_tiltx = 0;
		this.current_tilty = 0;
		this.start_tiltx = 0;
		this.start_tilty = 0;
		this.stop_tiltx = 0;
		this.stop_tilty = 0;
	}

	setStart()
	{
		this.start_tiltx = this.current_tiltx;
		this.start_tilty = this.current_tilty;
	}

	setStop()
	{
		this.stop_tiltx = this.current_tiltx;
		this.stop_tilty = this.current_tilty;
	}

	getTilt()
	{
		const tiltx = this.stop_tiltx - this.start_tiltx;
		const tilty = this.stop_tilty - this.start_tilty;
		return {tiltx, tilty};
	}

	addEventListener()
	{
		window.addEventListener('devicemotion', (e) => {
			//console.log(e);
			const RAD_TO_DEG = 180 / Math.PI;
			const x = e.accelerationIncludingGravity.x - e.acceleration.x;
			const y = e.accelerationIncludingGravity.y - e.acceleration.y;
			const z = e.accelerationIncludingGravity.z - e.acceleration.z;
			this.current_tiltx = Math.atan(x/z);
			this.current_tilty = Math.atan(y/z);
			document.getElementById("tiltx").innerHTML = (this.current_tiltx * RAD_TO_DEG)
			document.getElementById("tilty").innerHTML = (this.current_tilty * RAD_TO_DEG)
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

	const start_measuring = (e) => {
		orientationEvent.addEvent();
		motionEvent.addEvent();
		// ボタンは一度押されたら無効にする
		e.target.disabled = true;
		document.getElementById("start-button").disabled = true;

		setTimeout(() => {
			motionEvent.setStart();
			document.getElementById("stop-button").disabled = false;
		}, 1000);
	};

	const stop_measuring = (e) => {
		motionEvent.setStop();
		const {tiltx, tilty} = motionEvent.getTilt();
		alert(" " + rot + "\n" + tiltx + "\n" + tilty);
	};

	document.getElementById("start-button").addEventListener('click', start_measuring, false)
	document.getElementById("stop-button").addEventListener('click', stop_measuring, false)

	const id = setInterval( () => {drawer.draw(orientationEvent.rotation); }, 100 );

	window.addEventListener('click', e => {
		orientationEvent.rotation += 10;
		if(orientationEvent.rotation > 180) orientationEvent.rotation = -180;
		document.getElementById("rot").innerHTML = orientationEvent.rotation;
	});
});

