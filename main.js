document.addEventListener('DOMContentLoaded', function(){
	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					const acc = e.accelerationIncludingGravity;
					document.getElementById("acc-x").innerHTML = acc.x.toFixed(3);
					document.getElementById("acc-y").innerHTML = acc.y.toFixed(3);
					document.getElementById("acc-z").innerHTML = acc.z.toFixed(3);
					const g = ((acc.x ** 2) + (acc.y ** 2) + (acc.z ** 2)) ** 0.5;
					alert(g);
					document.getElementById("grav" ).innerHTML = g.toFixed(3);
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
