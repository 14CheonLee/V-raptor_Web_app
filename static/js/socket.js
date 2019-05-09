/**
 * Socket
 *
 * @TODO
 * Should Modify dummy data
 */

$(document).ready(function() {
    let socket_fan = io.connect(location.protocol + "//" + document.domain + ":" + location.port + "/fan");
    let socket_sensor = io.connect(location.protocol + "//" + document.domain + ":" + location.port + "/sensor");
    let socket_console = io.connect(location.protocol + "//" + document.domain + ":" + location.port + "/console");

    /**
     * Checking Connection
     */
    // Fan socket
    socket_fan.on("connect", function() {
        socket_fan.emit("message", {data: "[Socket_Fan] Connected ..."});
    });

    socket_fan.on("response", function(msg) {
        console.log(msg);
    });

    // Sensor socket
    socket_sensor.on("connect", function() {
        socket_sensor.emit("message", {data: "[Socket_Sensor] Connected ..."});
    });

    socket_sensor.on("response", function(msg) {
        console.log(msg);
    });

    // Console socket
    socket_console.on("connect", function() {
        socket_console.emit("message", {data: "[Socket_Console] Connected ..."});
    });

    socket_console.on("response", function(msg) {
        console.log(msg);
    });

    /**
     * Test
     */
    // (Test) If click the button
    $("#fan_btn").click(function() {
        socket_fan.emit("message", {data: "Clicked fan button"});
    });

    $("#sensor_btn").click(function() {
        socket_sensor.emit("message", {data: "Clicked sensor button"});
    });

    /**
     * Sensor & Fan data
     */
    // Fan
    $("#set_fan_speed_btn").click(function() {
        /**
         * @TODO
         * Should modify data
         */
        socket_fan.emit("set_fan_speed", {fan_number: 3, speed: 200});
    });

    $("#set_fan_mode_btn").click(function() {
        /**
         * @TODO
         * Should modify data
         */
        socket_fan.emit("set_fan_mode", {fan_auto_switch: true});
    });

    // Sensor
    $("#get_all_data_btn").click(function() {
        /**
         * @TODO
         * Should modify data
         */
        socket_sensor.emit("get_all_data");
    });

    /**
     * Console
     * @TODO
     * Should modify node_number
     */
    $(".console_choice").click(function() {
        socket_console.emit("check", {node_number: 0});
    });

    $("#console_close").click(function() {
        socket_console.emit("close", {node_number: 0});
    });

    $(".console_send_button").click(function() {
        socket_console.emit("send", {node_number: 0, cmd: $(".console_command").val()});
    });

    socket_console.on("receive", function(message) {
        console.log(message);
    });

    socket_console.on("check_console", function(message) {
        let node_number = message["node_number"];
        let is_use = message["is_use"];

        // If somebody uses console
        if (is_use == true) {
            alert("Somebody uses the console - Node Number : " + node_number);
        }
    });
});
