document.addEventListener('DOMContentLoaded', function(){
	let alpha, tiltx, tilty;
	const drawCanvas = () => {
		
	};

	const requestDevicePermission = () => {
		DeviceMotionEvent.requestPermission().then(permissionState => {
			let called = false
			if (permissionState === 'granted') {
				window.addEventListener('devicemotion', e => {
					if(!called) { alert("motion");}
					called = true;
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
					if(!called) { alert(alpha);}
					document.getElementById("rot").innerHTML = alpha.toFixed(3);
					called = true;
				})
			} else {
				// 許可を得られなかった場合の処理
			}
		}).catch(console.error) // https通信でない場合などで許可を取得できなかった場合
	}

	const startButton = document.getElementById("permission-button")
	startButton.addEventListener('click', requestDevicePermission, false)
});
