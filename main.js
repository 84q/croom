document.addEventListener('DOMContentLoaded', function(){
	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					const acc = e.acceleration;
					const accg = e.accelerationIncludingGravity;
					document.getElementById("acc-x").innerHTML = (accg.x - acc.x).toFixed(6);
					document.getElementById("acc-y").innerHTML = (accg.y - acc.y).toFixed(6);
					document.getElementById("acc-z").innerHTML = (accg.z - acc.z).toFixed(6);
					const gm = (((accg.x - acc.x) ** 2) + ((accg.y - acc.y) ** 2) + ((accg.z - acc.z) ** 2)) ** 0.5;
					document.getElementById("grav" ).innerHTML = gm.toFixed(6);
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
