const timerController  = browser.extension.getBackgroundPage();
const interfaceService = new InterfaceService();

document.getElementById( "settings" ).addEventListener( "click", function() {

	browser.tabs.create( { url: "../options/options.html" } );

} );

function init() {
	
	timerController.init()
	interfaceUpdater();
	clickListener();
	
}

function interfaceUpdater() {
	
	interfaceService.updateButtonState( timerController.getPlaying() );
	
	interfaceService.updateTimerValues( timerController.getCompletedPomodoros(), timerController.getTimerType(), timerController.getTime() );

	setInterval( function() {
		
		interfaceService.updateTimerValues( timerController.getCompletedPomodoros(), timerController.getTimerType(), timerController.getTime() );
		
	}, 100 );
	
}

function clickListener() {
	
	document.addEventListener( "click", ( e ) => {
		
		const id = e.target.getAttribute( "id" );
		
		if( id == "play") {
			
			timerController.play();
			
		} else if( id == "pause" ) {
			
			timerController.pause();
			
		} else if( id == "reset" ) {
			
			timerController.reset();
			
		}
		
		interfaceService.updateButtonState( timerController.getPlaying() );
		
	} );
	
}

window.onload = init;