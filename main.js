document.addEventListener('DOMContentLoaded', function(){
	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					const acc = e.acceleration;
					const accg = e.accelerationIncludingGravity;
					document.getElementById("accg-x").innerHTML = accg.x.toFixed(3);
					document.getElementById("accg-y").innerHTML = accg.y.toFixed(3);
					document.getElementById("accg-z").innerHTML = accg.z.toFixed(3);
					const g = ((accg.x ** 2) + (accg.y ** 2) + (accg.z ** 2)) ** 0.5;
					const gp = (((accg.x + accg.x) ** 2) + ((accg.y + acc.y) ** 2) + ((accg.z + acc.z) ** 2)) ** 0.5;
					const gm = (((accg.x - accg.x) ** 2) + ((accg.y - acc.y) ** 2) + ((accg.z - acc.z) ** 2)) ** 0.5;
					document.getElementById("grav" ).innerHTML = g.toFixed(3);
					document.getElementById("gravp" ).innerHTML = gp.toFixed(3);
					document.getElementById("gravm" ).innerHTML = gm.toFixed(3);
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
