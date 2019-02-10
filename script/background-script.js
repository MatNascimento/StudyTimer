const settingStorage = new UserSettingsStorage();
const settings 		 = settingStorage.userSettings || ( settingStorage.userSettings = new UserSettings( 4, "00:15", "00:15", "00:30" ) );

let   timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
const badge = new Badge( timer.badgeColor );

function getCompletedPomodoros() {
	
	return timer.completedPomodoros;
	
}

function getPlaying() {
	
	return timer.playing;
	
}

function getTime() {
	
	return TimerFormat.formatMilToText( timer.time );
	
}

function getTimerType() {
	
	return timer.type;
	
}

function play() {
	
	return timer.play();
	
}

function pause() {
	
	return timer.pause();
	
}

function reset() {
	
	timer = new StudyTimer( TimerFormat.formatTextToMil( settings.studytime ), 0 );
	badge.updateText( null );
	badge.updateColor( timer.badgeColor );
	
}

function init() {
	
	setInterval( function() {
		
		if( timer.playing ) {
			
			dueTimeVerifier( timer.update() );
			
		}
		
	}, 200 );
	
}

function dueTimeVerifier( value ) {
	
	if( value <= 0 ) {
		
		timer = timer.change( settings );
		
		badge.updateColor( timer.badgeColor );
		
		timer.showNotification();
		
		timer.play();
		
	}
	
	if( value > 0 ) {
		
		badge.updateText( TimerFormat.formatMilToMinuteText( value ).toString() );
		
	}
	
}
