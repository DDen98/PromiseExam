
import { _decorator, Component, Node, log, Label } from 'cc';
import { Reel } from './Reel';
const { ccclass, property } = _decorator;


@ccclass('Table')
export class Table extends Component {

    _reels = [];

    @property({ type: Label })
    status = null;

    onLoad() {
        this._reels = this.getComponentsInChildren(Reel);
    }

    // spin() {
    //     this.status.string = 'Table Spinning';
    //     this._reels.forEach(it => it.startSpin());
    // }

    /** 
    @Quest 1: Implement function spin table 5 reel cùng lúc, sử dụng promise, trả về call back khi tất cả reel cùng dừng lại
    có thể update lại function spin, không được update Reel.ts  
    */

    // spin() {
    //     this.status.string = 'Table Spinning';
    //     let listTask = [];
    //     this._reels.forEach((it) => {
    //         let task = new Promise((resovle, reject) => {
    //             it.startSpin(() => {
    //                 resovle(true);
    //             })
    //         })
    //         listTask.push(task);
    //     })
    //     Promise.all(listTask).then(() => {
    //         this.onTableStop();
    //     });
    // }
    // onTableStop() {
    //     this.status.string = 'Table Stopped';
    // }
    /** 
    @Quest 2: Từ quest 1, kiểm tra nếu có một trong những reel chạy quá 10s chưa dừng trigger function onTableTimeout   
    */

    // spin() {
    //     this.status.string = 'Table Spinning';
    //     let listTask = [];
    //     this._reels.forEach((it) => {
    //         let task = new Promise((resovle, reject) => {
    //             it.startSpin(() => {
    //                 resovle(true);
    //             })
    //             setTimeout(() => {
    //                 reject();
    //             }, 10000)
    //         })
    //         listTask.push(task);
    //     })
    //     Promise.all(listTask)
    //         .then(this.onTableStop.bind(this))
    //         .catch(this.onTableTimout.bind(this))
    // }
    // onTableTimout() {
    //     this.status.string = 'Table Timeout';
    // }


    /**
    @Quest 3: Implement function để table spin từng reel theo thứ tự 1->5 lần lượt reel này dừng đến reel tiếp theo,
    sau khi tất cả các reel đã dừng thì trigger function onTableStop 
    */

    // spin() {
    //     this.status.string = 'Table Spinning';
    //     this._reels.reduce((seq, next) => {
    //         return seq.then(() => {
    //             return new Promise((resovle) => {
    //                 next.startSpin(
    //                     () => { resovle(true); }
    //                 );
    //             })
    //         })
    //     }, Promise.resolve())
    //         .then(this.onTableStop.bind(this))
    // }
    // onTableStop() {
    //     log('onTableStop');
    // }

    /*
    Quest 4: Update Reel.ts để mỗi function startSpin là 1 promise, sau đó làm lại các quest 1,2,3
    */
    /**
     * @Quest 4.1
    */
    // spin() {
    //     this.status.string = 'Table Spinning';
    //     let listTask = [];
    //     this._reels.forEach(it => {
    //         let task = it.startSpin()
    //         listTask.push(task);
    //     });
    //     Promise.all(listTask)
    //         .then(() => this.onTableStop)
    // }
    // onTableStop() {
    //     this.status.string = 'Table Stopped';
    // }
    /**
    * @Quest 4.2
    */
    // spin() {
    //     this.status.string = 'Table Spinning';
    //     let listTask = [];
    //     this._reels.forEach(it => {
    //         let task = it.startSpin()
    //         listTask.push(task);
    //     });
    //     Promise.all(listTask)
    //         .then(() => { console.log("TABLE STOP") })
    //         .catch(this.onTableTimout.bind(this));
    // }
    // onTableTimout() {
    //     this.status.string = 'Table Timeout';
    // }
    /**
     * @Quest 4.3
     */
    spin() {
        this.status.string = 'Table Spinning';
        this._reels.reduce((seq, next) => {
            return seq.then(() => next.startSpin())
        }, Promise.resolve())
            .then(this.onTableStop.bind(this))
            .catch(() => { log("Table Timeout"); })
    }
    onTableStop() {
        log('onTableStop');
    }
}
