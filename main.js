document.addEventListener('DOMContentLoaded', function(){
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
					const g = (x**2 + y**2 + z**2) ** 0.5;
					const rotzx = Math.atan(x/z) * RAD_TO_DEG;
					const rotzy = Math.atan(y/z) * RAD_TO_DEG;
					document.getElementById("acc-x").innerHTML = (accg.x - acc.x).toFixed(6);
					document.getElementById("acc-y").innerHTML = (accg.y - acc.y).toFixed(6);
					document.getElementById("acc-z").innerHTML = (accg.z - acc.z).toFixed(6);
					document.getElementById("grav" ).innerHTML = g.toFixed(6);
					document.getElementById("rotxz").innerHTML = rotzx.toFixed(6);
					document.getElementById("rotyz").innerHTML = rotzy.toFixed(6);
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合

		DeviceOrientationEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('deviceorientation', e => {
					document.getElementById("ori-a").innerHTML = e.alpha.toFixed(3);
					document.getElementById("ori-b").innerHTML = e.beta.toFixed(3);
					document.getElementById("ori-g").innerHTML = e.gamma.toFixed(3);
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合
	}

	const requestDeviceOrientationPermission = () => {
	}

	const startButton = document.getElementById("permission-button")
	startButton.addEventListener('click', requestDevicePermission, false)
});
