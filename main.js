document.addEventListener('DOMContentLoaded', function(){
	let alpha, tiltx, tilty;
	const drawCanvas = () => {
		const canvas = document.getElementById('canvas');
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		context.arc(110, 110, 50, 0 * Math.PI / 180, 360 * Math.PI / 180, false );

		// 塗りつぶしの色
		context.fillStyle = "rgba(255,0,0,0.8)";
		// // 塗りつぶしを実行
		context.fill();
		// 線の色
		context.strokeStyle = "purple";
		// 線の太さ
		context.lineWidth = 8;
		// 線を描画を実行
		context.stroke();

		context.fillText(tiltx ? tiltx.toFixed(6) : "tiltx", 10, 10);
	};

	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			let called = false
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					const RAD_TO_DEG = 180 / Math.PI;
					const acc = e.acceleration;
					const accg = e.accelerationIncludingGravity;
					const x = accg.x - acc.x;
					const y = accg.y - acc.y;
					const z = accg.z - acc.z;
					tiltx = Math.atan(x/z);
					tilty = Math.atan(y/z);
					document.getElementById("tiltx").innerHTML = (tiltx * RAD_TO_DEG).toFixed(6);
					document.getElementById("tilty").innerHTML = (tilty * RAD_TO_DEG).toFixed(6);
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合

		DeviceOrientationEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				let called = false
				window.addEventListener('deviceorientation', e => {
					alpha = e.aplha;
					if(!called) { alert("e.alpha : " + e.alpha + " " + alpha);}
					called = true;
					document.getElementById("rot").innerHTML = e.alpha.toFixed(3);
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合
	}

	const startButton = document.getElementById("permission-button")
	startButton.addEventListener('click', requestDevicePermission, false)

	const id = setInterval( drawCanvas, 1000 );
});
