module.exports = {
  apps : [{
    name   : "NODETASK",
    script : "./app.js",
    watch:true,
    max_memory_restart:"200M",
    env:{
      NODE_ENV:"local",
      PORT:7500
    }

  }]
}
