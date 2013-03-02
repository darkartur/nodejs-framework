var Context = require('../Context.js');

module.exports = Context.extend({

    controllers:{
        server:{
            start:function () {
                var http = require('http');
                http.createServer(function (request, response) {
                    response.end('Hello world!!', 'utf-8');
                }).listen('8123');
            }
        }
    },

    execute:function () {
        process.stdin.pause();
        var parameters = this.request.toString().replace('\r','').replace('\n','').split(' ');

        if (parameters.length < 1)
            return this.action_not_found();

        var controller_action = parameters[0].split(':');
        if (controller_action.length < 2)
            return this.action_not_found();

        this.run_action(controller_action[0],controller_action[1]);
    },


    action_not_found:function () {
        process.stdout.write('Sorry, I don\'t know what u want :(\r\n');
        process.stdin.resume();
        return true;
    },


    run_action:function run_action(controller, action) {
        if (!this.controllers[controller] || !this.controllers[controller][action])
            return this.action_not_found();
        process.stdout.write('I am running action ' + action + ' in controller ' + controller + '\r\n')
        this.controllers[controller][action]();
        process.stdin.resume();
        return true;
    }


});
