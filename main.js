
document.addEventListener('DOMContentLoaded', function(){
	const RAD_TO_DEG = 180 / Math.PI;
	let alpha = 0, tiltx, tilty = 0;
	const drawCanvas = () => {
		const canvas = document.getElementById('canvas');
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		context.arc(110, 110, 100, -90 / RAD_TO_DEG, (alpha - 90) / RAD_TO_DEG, false );

		// 塗りつぶしの色
		context.fillStyle = "rgba(0,0,0,0)";
		// // 塗りつぶしを実行
		context.fill();
		// 線の色
		context.strokeStyle = "purple";
		// 線の太さ
		context.lineWidth = 8;
		// 線を描画を実行
		context.stroke();

		//context.fillText(tiltx ? tiltx.toFixed(6) : "tiltx", 10, 10);
		//context.fillText(alpha ? alpha.toFixed(6) : "alpha", 10, 30);
	};

	const requestDevicePermission = () => {

		const addOrientationEvent = () => {
			window.addEventListener('deviceorientation', e => {
				if(e.alpha)
				{
					alpha = e.alpha;
					document.getElementById("rot").innerHTML = alpha
				}
			})
		};

		const addMotionEvent = () => {
			window.addEventListener('devicemotion', e => {
				const x = e.accelerationIncludingGravity.x - e.acceleration.x;
				const y = e.accelerationIncludingGravity.y - e.acceleration.y;
				const z = e.accelerationIncludingGravity.z - e.acceleration.z;
				tiltx = Math.atan(x/z);
				tilty = Math.atan(y/z);
				document.getElementById("tiltx").innerHTML = (tiltx * RAD_TO_DEG)
				document.getElementById("tilty").innerHTML = (tilty * RAD_TO_DEG)
			})
		};

		if(typeof DeviceMotionEvent.requestPermission === 'function')
		{
			DeviceMotionEvent.requestPermission()
				.then(state => { if (state === 'granted') { addMotionEvent(); }})
				.catch(console.error);
		}
		else
		{
			addMotionEvent();
		}

		if(typeof DeviceOrientationEvent.requestPermission === 'function')
		{
			DeviceOrientationEvent.requestPermission()
				.then(state => { if (state === 'granted') { addOrientationEvent(); } })
				.catch(console.error);
		}
		else
		{
			addOrientationEvent();
		}
	}

	const startButton = document.getElementById("permission-button")
	startButton.addEventListener('click', requestDevicePermission, false)

	const id = setInterval( drawCanvas, 100 );

	window.addEventListener('click', e => {
		alpha += 10;
	});
});
