var Panel = {
    window: new UI.Window({
        location: {
            x:0,
            y:110,
            width:50,
            height:200
        },
        elements: {
        "0": {type: "slot", visual: true, x: -1000, y: 0, size: 1000},
            "1": {type: "slot", visual: true, x: -1000, y: 1000, size: 1000},
            "2": {type: "slot", visual: true, x: -1000, y: 2000, size: 1000},
            "3": {type: "slot", visual: true, x: -1000, y: 3000, size: 1000}
        },
        drawing: [
            {type: "background", color: android.graphics.Color.TRANSPARENT}
        ]
    }),

    container: new UI.Container(),

    open: function(){
        this.container.openAs(this.window);
    },

    close: function(){
        this.container.close();
    },
    
    state: [
        {id: 0, data: 0, state: 0, timer: 0},
        {id: 0, data: 0, state: 0, timer: 0},
        {id: 0, data: 0, state: 0, timer: 0},
        {id: 0, data: 0, state: 0, timer: 0}
    ]
};






