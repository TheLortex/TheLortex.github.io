onmessage = function(e) {
    live_prim(e.data.positions, e.data.starting_layer, e.data.starting_point, e.data.n_layers, e.data.counts, e.data.sizes);
}

function computeGraph(positions, n_layers, counts, sizes) {
    var graph = [];
    for (var layer1 = 0; layer1 < 2*n_layers; layer1++) {
        graph.push([]);
        for (var layer2 = 0; layer2 < 2*n_layers; layer2++) {
            graph[layer1].push([]);
            for (var p1 = 0; p1 < counts[Math.floor(layer1/2)]; p1++) {
                graph[layer1][layer2].push([]);
                for (var p2 = 0; p2 < counts[Math.floor(layer2/2)]; p2++) {
                    var position_1 = positions[layer1][p1];
                    var position_2 = positions[layer2][p2];
                    var distance = Math.pow(position_1.x - position_2.x,2) + Math.pow(position_1.y - position_2.y, 2) + Math.pow((sizes[Math.floor(layer1/2)]-sizes[Math.floor(layer2/2)])*1000,2);
                    graph[layer1][layer2][p1].push(distance);
                }
            }
        }
    }
    return graph;

}

function live_prim(positions, starting_layer, starting_point, n_layers, counts, sizes) {
    var graph = computeGraph(positions, n_layers, counts, sizes);
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
        if (min === null) {
            clearInterval(interval_handler);
        } else {
            result.push(min);
            usedNodes[min[0]][min[1]] = true;
            var l = result[min[2]][0];
            var p = result[min[2]][1];
            postMessage([min[0],min[1],l,p]);
        }
    }, 1);
}
