var rs = process.stdin;
var ws = process.stdout;
rs.setRawMode(false);
//ws.setRawMode(true);
ws.write('Tell me, what u want to do (controller:action):\r\n');
rs.resume();
rs.on('data',function(data) {
    rs.pause();
    var parameters = data.toString().replace('\r','').replace('\n','').split(' ');

    if (parameters.length < 1)
        return action_not_found();

    var controller_action = parameters[0].split(':');
    if (controller_action.length < 2)
        return action_not_found();

    run_action(controller_action[0],controller_action[1]);


});


var controllers = {
    server: {
        start: function() {
            var http = require('http');
            http.createServer(function(request,response) {
                response.end('Hello world!!','utf-8');
            }).listen('8123');
        }
    }
}

function action_not_found() {
    ws.write('Sorry, I don\'t know what u want :(\r\n');
    rs.resume();
    return true;
}


function run_action(controller,action) {
    if ( !controllers[controller] || !controllers[controller][action])
        return action_not_found();
    ws.write('I am running action '+action+' in controller '+controller+'\r\n')
    controllers[controller][action]();
    rs.resume();
    return true;
}