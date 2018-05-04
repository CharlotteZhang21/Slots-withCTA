import * as Utils from '../utils/util.js';

class CtaButton extends Phaser.Group {
	constructor(game) {
		super(game);

		this.button = new Phaser.Sprite(game, 0, 0, 'cta', 0);

		this.initialCtaWidth = this.button.width;
		this.add(this.button);

		Utils.fitInContainer(this.button, 'cta-container', 0.5, 0.5);
		this.button.inputEnabled = true;
		this.button.input.useHandCursor = true;
		this.button.events.onInputDown.add(function() {
			doSomething('download');
		});
	}
	animate() {
		var finalContainer = document.getElementById("cta-container-final");
		var finalContainerWidth = finalContainer.offsetWidth * window.devicePixelRatio;
		var finalContainerX = finalContainer.getBoundingClientRect().left * window.devicePixelRatio + finalContainerWidth / 2;
		var finalContainerY = finalContainer.getBoundingClientRect().top * window.devicePixelRatio;

		var newScale = finalContainerWidth/this.initialCtaWidth;

		// this.button.scale.x = newScale * .9;
		// this.button.scale.y = this.button.scale.x ;

		var positionTween = this.game.add.tween(this.button).to({x: finalContainerX, y: finalContainerY}, 1000, Phaser.Easing.Back.InOut, true, 0);
		var scaleTween = this.game.add.tween(this.button.scale).to({x: newScale, y: newScale}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
	}
}

export default CtaButton;