var defaults = {}
	, one_second = 1000
	, one_minute = one_second * 60
	, one_hour =one_minute * 60
	, one_day = one_hour * 24
	, startDate = new Date().getTime()
	, face
	, elapsed
	, now;

$(document).ready(function(){
	face = document.getElementById('lazy');
});

function tick() {
    actualizaTiempo();

	face.innerText = getTiempoEmpleado();

	requestAnimationFrame(tick);
}

function setDate(date){
	startDate = date;
}

function getDate(){
	return startDate;
}

function getTiempoEmpleado(){

	var parts = [];

	parts[0] = '' + Math.floor( elapsed / one_hour );
	parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
	parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

	parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
	parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
	parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

    var tiempo = parts.join(':');

    return tiempo;
}

function actualizaTiempo(){
	now = (new Date()).getTime();
	elapsed = now - startDate;
}
