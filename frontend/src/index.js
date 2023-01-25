import '@riotjs/hot-reload'
import { mount, register, install } from 'riot'
import Hub from './hub'
import GameBoard from './components/game-board/game-board.riot'
import OxField from './components/ox-field/ox-field.riot'
import ExampleButton from './components/example-button/example-button.riot'
import ExampleText from './components/example-text/example-text.riot'
import WinnerText from './components/winner-text/winner-text.riot'


var appState = {
    oxFields: {},
    nextPlayer: 'o',
    winner: ''
};

// SignalR
var hub = new Hub("http://localhost:5000/xohub");

// ----------------------------------
// SignalR calls from backend go here

hub.connection.on("CurrentFieldValue", (fieldId, value) => {
    appState.oxFields[fieldId].update({value})
});

hub.connection.on("NextPlayer", nextPlayer => {
    appState.nextPlayer.update({ value: nextPlayer});
});

hub.connection.on("Winner", winner => {
    appState.winner.update({value: winner});
})

// SignalR calls from backend go here
// ----------------------------------

// RiotJs
install(function(component) {
    component.appState = appState;
    component.hub = hub.connection;
})

// -----------------------------------------------
// RiotJs component registration happens here here

register('ox-field', OxField)
register('game-board', GameBoard)
register('example-button', ExampleButton)
register('example-text', ExampleText)
register('winner-text', WinnerText)

// RiotJs component registration happens here here
// -----------------------------------------------

async function StartApp() {
    await hub.start()
    mount('game-board')
}

StartApp()
