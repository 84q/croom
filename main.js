document.addEventListener('DOMContentLoaded', function(){
	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					var acc = e.acceleration;
					var accG = e.accelerationIncludingGravity;
					var rot = e.rotationRate;
					document.getElementById("acc-x").innerHTML = acc.x.toFixed(3);
					document.getElementById("acc-y").innerHTML = acc.y.toFixed(3);
					document.getElementById("acc-z").innerHTML = acc.z.toFixed(3);
					document.getElementById("accG-x").innerHTML = accG.x.toFixed(3);
					document.getElementById("accG-y").innerHTML = accG.y.toFixed(3);
					document.getElementById("accG-z").innerHTML = accG.z.toFixed(3);
					document.getElementById("rot-a").innerHTML = rot.alpha.toFixed(3);
					document.getElementById("rot-b").innerHTML = rot.beta.toFixed(3);
					document.getElementById("rot-g").innerHTML = rot.gamma.toFixed(3);
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

	const startButton = document.getElementById("start-button")
	startButton.addEventListener('click', requestDevicePermission, false)
});