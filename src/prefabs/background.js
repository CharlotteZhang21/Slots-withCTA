import * as Util from '../utils/util';
import * as CustomPngSequencesRenderer from '../utils/custom-png-sequences-renderer.js';
import Reel from '../prefabs/reel';

class Background extends Phaser.Group {
    constructor(game) {
        super(game);

        this.createBackground();

        this.createPacman();
    }

    createBackground() {
        this.lineTop = new Phaser.Sprite(this.game, 0, 0, 'line');
        this.lineBottom = new Phaser.Sprite(this.game, 0, 0, 'line');
        // background.alpha = 0;

        this.add(this.lineTop);
        this.add(this.lineBottom);

        // var initialWidth = this.width;
        // var initialHeight = this.height;

        Util.fitInContainer(this.lineTop, 'lineTop');
        Util.fitInContainer(this.lineBottom, 'lineBottom');

        this.lineTop.scale.y *= -1;

    }
    createPacman() {

        this.dots = []; // clone array


        for (let row = 0; row < PiecSettings.dotsArray.length; row++) {
            var columns = [];
            for (let column = 0; column < PiecSettings.dotsArray[row].length; column++) {
                columns.push(PiecSettings.dotsArray[row][column]);
            }
            this.dots.push(columns);
        }

        this.dotsToPosition = [];       

        var pointWidth = Util.getContainerWidth('lineBottom') / (this.dots[0].length * 2);
        var horizontalOffset = pointWidth*1.15;
        var verticalOffset = pointWidth*1.15;

        for (let row = 0; row < this.dots.length; row++) {

            for (let column = 0; column < this.dots[row].length; column++) {
        
                if(this.dots[row][column] == 0){
                    continue;
                }
                var assetName = this.dots[row][column] == 2? 'cherry' : 'dot';
                var point = new Phaser.Sprite(this.game, 0, 0, assetName);

                var pointTop = new Phaser.Sprite(this.game, 0, 0, assetName);

                var scaleMultiplier = this.dots[row][column] == 2? 1.5 : .5;
                point.scale.x = pointWidth/point.width  * scaleMultiplier;
                point.scale.y = point.scale.x;

                pointTop.scale.x = pointWidth/pointTop.width  * scaleMultiplier;
                pointTop.scale.y = pointTop.scale.x;


                var x = column;
                var y = row;
                point.x = (this.lineBottom.x + pointWidth/2) + x * (pointWidth + horizontalOffset);
                point.y = this.lineBottom.y * .95 + y * (pointWidth + verticalOffset);

                pointTop.x = (this.lineTop.x + pointWidth/2) + x * (pointWidth + horizontalOffset);
                // pointTop.y = (this.lineTop.y + this.lineTop.height) * .95 - y * (pointWidth + verticalOffset);
                pointTop.y = (Math.abs(this.lineTop.y + this.lineTop.height/2)* 1.1 ) - y * (pointWidth + verticalOffset);
        
        
                this.add(point);
                this.add(pointTop);

                this.dotsToPosition[x + "," + y] = point;


            }
        }


        this.pacmanGuy = CustomPngSequencesRenderer.playPngOtherSequence(this.game, PiecSettings.otherPngSequence[0], this);
        
        // this.add(animation);
        this.add(this.pacmanGuy);
        this.pacmanGuy.anchor.set(0.5); 

        this.pacmanGuy.scale.x = pointWidth * 1.5 / this.pacmanGuy.width;
        this.pacmanGuy.scale.y = this.pacmanGuy.scale.x;


        this.pacmanGuy.x = this.dotsToPosition["3,4"].position.x;
        this.pacmanGuy.y = this.dotsToPosition["3,4"].position.y;
        this.pacmanGuy.currentX = 3;
        this.pacmanGuy.currentY = 4;



        //the ghosts play on the top
        this.topGhosts = [];

        for(var i = 0; i < PiecSettings.otherPngSequence.length; i++){

                    // var src = ghostsAni[i] + '_ani';
            var ghosts = CustomPngSequencesRenderer.playPngOtherSequence(this.game, PiecSettings.otherPngSequence[i],this);
            this.add(ghosts);

            Util.fitInContainerByHeight(ghosts, 'animation-area');


            ghosts.scale.x *= 0.7;
            ghosts.scale.y = ghosts.scale.x;

            ghosts.scale.x *= PiecSettings.otherPngSequence[i].scale;

            if (Util.isPortrait()) 
                ghosts.x = - Math.abs( ghosts.width);
            else
                ghosts.x = Util.getContainerX('animation-area') - Math.abs( ghosts.width);

            this.topGhosts.push(ghosts);
        }
        ///////////////////////////////


    }



    animatePacman(){
        //find next dot
        var nextPos = this.checkNextPos(this.pacmanGuy.currentX, this.pacmanGuy.currentY);
        if(nextPos != null)
            this.animateTo(nextPos);
    }

    animateGhosts(){

        for(var i = 0; i < this.topGhosts.length; i++){
            var ghosts = this.topGhosts[i];
            this.game.add.tween(ghosts).to({x: this.game.global.windowWidth * 2}, 3000, Phaser.Easing.Linear.None, true, i * 300 + 2000);

        }
    }

    checkNextPos(x, y){
        var array = this.dots;
        var pos = {};
        if((x-1 >= 0) &&array[y][x-1] > 0){
            // going right
            pos.x = x-1;
            pos.y = y;
            pos.rotate = 180;
        }else if ((x+1 < array[y].length) && array[y][x+1] > 0){
            //going left
            pos.x = x+1;
            pos.y = y;
            pos.rotate = 0;
        }else if ((y-1 >= 0) && array[y-1][x] > 0){
            //going up
            pos.x = x;
            pos.y = y-1;
            pos.rotate = -90;
        }else if ((y+1 < array.length) && array[y+1][x] > 0){
            //going down
            pos.x = x;
            pos.y = y+1;
            pos.rotate = 90;
        }else{
            pos = null;
            console.log("no where to go");
        }
        return pos;
    }

    animateTo(pos) {
        var key = pos.x+','+pos.y;
        var targetX = this.dotsToPosition[key].position.x,
        targetY = this.dotsToPosition[key].position.y;
        this.pacmanGuy.angle = pos.rotate;
        var pacTween = this.game.add.tween(this.pacmanGuy).to({x: targetX, y: targetY}, 300, Phaser.Easing.Linear.None, true, 0);
        // this.dotsToPosition[pos.x + "," + pos.y].destroy();
        pacTween.onComplete.add(function(){
            this.dotsToPosition[key].destroy();
            this.pacmanGuy.currentX = pos.x;
            this.pacmanGuy.currentY = pos.y;
            this.dots[pos.y][pos.x] = 0;
            this.animatePacman();
        },this);
    }

}

export default Background;