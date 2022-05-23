
import { _decorator, Component, Node, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Reel')
export class Reel extends Component {

    _symbolHeight = 125;
    _rollTarget = 0;
    _rollCount = 0;
    _rollY = 0;
    _spinning = false;
    _direction = 1;
    _reelStopCB = null;

    @property
    reelSpeed = 100;

    startSpin(callback) {
        this._rollTarget = Math.round(Math.random() * 20 + 50);
        this._spinning = true;
        this._rollCount = 0;
        this._rollY = 0;
        this.reelSpeed = Math.random() * 500 + 700;
        this._direction = (Math.random() > 0.5) ? 1 : -1;
        return new Promise((resovle, reject) => {
            // /*Open for Quest 4.2 only !*/
            // setTimeout(() => {
            //     reject(true);
            // }, 10000);
            this._reelStopCB = () => {
                this.node.setPosition(new Vec3(this.node.position.x, 0, 0));
                callback && callback();
                resovle(true);
            }
        })

        // this._reelStopCB = () => {
        //     this.node.setPosition(new Vec3(this.node.position.x, 0, 0));
        //     callback && callback();
        // }
    }

    update(dt) {
        if (this._spinning) {
            let deltaY = this.reelSpeed * dt * this._direction;
            this._rollY += Math.abs(deltaY);
            this.node.setPosition(new Vec3(this.node.position.x, this.node.position.y - deltaY, 0));
            if (this._rollY >= this._symbolHeight) {
                this.node.setPosition(new Vec3(this.node.position.x, this.node.position.y + this._symbolHeight * this._direction, 0));
                this.swapSymbol();
                this._rollY -= this._symbolHeight;
                this._rollCount += 1;
                if (this._rollCount >= this._rollTarget) {
                    this._spinning = false;
                    this._reelStopCB && this._reelStopCB();
                }
            }
        }
    }

    swapSymbol() {
        let lastSymbolIndex = (this._direction == 1) ? this.node.children.length - 1 : 0;
        let lastSymbol = this.node.children[lastSymbolIndex];

        if (this._direction == 1) {
            lastSymbol.setSiblingIndex(0);
        }
        else {
            lastSymbol.setSiblingIndex(this.node.children.length);
        }
    }
}
