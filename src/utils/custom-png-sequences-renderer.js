import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preloadPngSequences(game) {
	for (var i = 0; i < PiecSettings.spins.length; i++) {
		//Preload pngsequences, if any
		if (PiecSettings.spins[i].pngSequence != null) {
			var pngSequence = PiecSettings.spins[i].pngSequence;
			console.log(pngSequence);
			var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
			game.load.spritesheet(
				pngSequenceName, 
				PiecSettings.assetsDir + pngSequence.src,
				pngSequence.spriteWidth,
				pngSequence.spriteHeight,
				pngSequence.spriteNumber);
		}
	}

	//TODO - Preload other custom png sequences
	if (PiecSettings.otherPngSequence != undefined) {
		for (var i = 0; i < PiecSettings.otherPngSequence.length; i++) {
			var pngSequence = PiecSettings.otherPngSequence[i];
			var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
			game.load.spritesheet(
				pngSequenceName, 
				PiecSettings.assetsDir + pngSequence.src,
				pngSequence.spriteWidth,
				pngSequence.spriteHeight,
				pngSequence.spriteNumber);
		}
	}
}

export function playPngSequence(game, pngSequence, layer, anchorX = .5, anchorY = .5) {
	var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));
	var container = document.getElementById(pngSequence.htmlContainer);
	var containerWidth = container.offsetWidth * window.devicePixelRatio;
	var containerHeight = container.offsetHeight * window.devicePixelRatio;
	var containerX = container.getBoundingClientRect().left * window.devicePixelRatio + containerWidth * anchorX;
	var containerY = container.getBoundingClientRect().top * window.devicePixelRatio + containerHeight * anchorY;

	console.log(pngSequenceName);
	var sprite = game.add.sprite(containerX, containerY, pngSequenceName);
	layer.add(sprite);
	sprite.animations.add("animation");
	sprite.anchor.set(anchorX, anchorY);
	sprite.alpha = 0;
	AnimationsUtil.playAnimation(game, sprite, pngSequence.delay, pngSequence.fps);
	sprite.scale.y = containerHeight / sprite.height;
	sprite.scale.x = sprite.scale.y;
	sprite.persistent = false;

	if (pngSequence.loops != null) {
		sprite.numberOfLoops = pngSequence.loops;
		sprite.animations.currentAnim.onLoop.add(AnimationsUtil.onLoop, this);
	}

	if (pngSequence.effect != null) {
		if (pngSequence.effect.indexOf("fade-in") != -1) {
			sprite.alpha = 0;
			var tween = game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, pngSequence.delay);
		}
	}

	return sprite;
}

export function playPngOtherSequence(game, pngSequence, layer) {
	var pngSequenceName = pngSequence.src.substr(0, pngSequence.src.indexOf('.'));

	if (pngSequence.htmlContainer != null) {
		var container = document.getElementById(pngSequence.htmlContainer);
		var containerWidth = container.offsetWidth * window.devicePixelRatio;
		var containerHeight = container.offsetHeight * window.devicePixelRatio;
		var containerX = container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = container.getBoundingClientRect().top * window.devicePixelRatio;
	}

	var sprite = game.add.sprite(containerX, containerY, pngSequenceName);
	layer.add(sprite);
	sprite.animations.add("animation");
	sprite.anchor.set(0,0);
	sprite.alpha = 0;
	//Reverse if necessary
	if (pngSequence.loopReverse == null)
		pngSequence.loopReverse = false;
	if (pngSequence.isReversed != null && pngSequence.isReversed) {
		sprite.animations.currentAnim.isReversed = true;
	}
	//Play animation
	AnimationsUtil.playAnimation(game, sprite, pngSequence.delay, pngSequence.fps, pngSequence.loops==1?false:true, pngSequence.loopReverse);
	if (pngSequence.angle != null && pngSequence.angle != 0) {
		var extraAngle = 0;
		if (this.game.global.windowWidth > this.game.global.windowHeight) {
			//Landscape
			if (pngSequence.responsiveAngle != null && pngSequence.responsiveAngle) {
				extraAngle = 90;
			}
		}
		sprite.anchor.set(0.5);
		sprite.angle = pngSequence.angle + extraAngle;
	}
	if (pngSequence.htmlContainer != null) {
		sprite.scale.x = containerWidth / sprite.width;
		sprite.scale.y = sprite.scale.x;
		sprite.persistent = false;
	}

	if (pngSequence.persistent != null) {
		sprite.persistent = pngSequence.persistent;
	}

	if (pngSequence.loops != null) {
		sprite.numberOfLoops = pngSequence.loops;
		sprite.animations.currentAnim.onLoop.add(AnimationsUtil.onLoop, this);
	}

	if (pngSequence.effect != null) {
		if (pngSequence.effect.indexOf("fade-in") != -1) {
			sprite.alpha = 0;
			var tween = game.add.tween(sprite).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, pngSequence.delay);
		}
	}

	return sprite;
}