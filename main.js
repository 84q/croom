document.addEventListener('DOMContentLoaded', function(){
	const alpha, tiltx, tilty;
	const drawCanvas
	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					const RAD_TO_DEG = 180 / Math.PI;
					const acc = e.acceleration;
					const accg = e.accelerationIncludingGravity;
					const x = accg.x - acc.x;
					const y = accg.y - acc.y;
					const z = accg.z - acc.z;
					tiltx = Math.atan(x/z) * RAD_TO_DEG;
					tilty = Math.atan(y/z) * RAD_TO_DEG;
					document.getElementById("acc-x").innerHTML = x.toFixed(6);
					document.getElementById("acc-y").innerHTML = y.toFixed(6);
					document.getElementById("acc-z").innerHTML = z.toFixed(6);
					document.getElementById("tiltx").innerHTML = tiltx.toFixed(6);
					document.getElementById("tilty").innerHTML = tilty.toFixed(6);
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合

		DeviceOrientationEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('deviceorientation', e => {
					alpha = e.aplha;
					document.getElementById("ori-a").innerHTML = alpha.toFixed(3);
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合
	}

	const startButton = document.getElementById("permission-button")
	startButton.addEventListener('click', requestDevicePermission, false)
});
