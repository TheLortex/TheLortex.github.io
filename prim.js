onmessage = function(e) {
    console.log('Working!');
    live_prim(e.data.graph, e.data.starting_layer, e.data.starting_point, e.data.n_layers, e.data.counts);
}

function live_prim(graph, starting_layer, starting_point, n_layers, counts) {
    var usedNodes = [];
    var result = [];
    for (var layer = 0; layer < 2*n_layers; layer++) {
        usedNodes.push([]);
        for (var p = 0; p < counts[Math.floor(layer/2)]; p++) {
            usedNodes[layer].push(false);
        }
    }

    function findMin(g) {
        var min = [999999999,null];
        for(var i=0;i<result.length;i++) {
            for(var l=0;l<2*n_layers;l++) {
                for(var p=0;p<counts[Math.floor(l/2)];p++) {
                    var dist = g[result[i][0]][l][result[i][1]][p];

                    if (dist < min[0] && dist != 0 && usedNodes[l][p] == false) {
                        min = [dist, [l,p,i]];
                    }
                }
            }
        }
        return min[1];
    }

    result.push([starting_layer, starting_point]);
    usedNodes[starting_layer][starting_point] = true;


    var interval_handler = setInterval(function() {
        min = findMin(graph);
        if (min == null) {
            console.log("my job is done");
            clearInterval(interval_handler);
        } else {
            result.push(min);
            usedNodes[min[0]][min[1]] = true;
            var l = result[min[2]][0];
            var p = result[min[2]][1];
            postMessage([min[0],min[1],l,p]);
        }
    }, 0);
}
