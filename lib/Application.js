var Class = require('./Class.js');
var Context = require('./Context/CLI.js');

module.exports = new Class({

    hello:function () {
        process.stdin.pause();
        process.stdout.write('Tell me, what u want to do (controller:action):\r\n');
        process.stdin.resume();
    },


    run:function () {
        this.hello();
        var app = this;
        process.stdin.on('data', function (data) {
            var context = new Context();
            context.setRequest(data);
            context.execute();
            app.hello();
        });
    }

});
