// Detect if the client is on a mobile or not.
function mobilecheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var onmobile = mobilecheck();

// Lighter background on mobile devices
if (onmobile) {
    var counts = [16,8,4,2,1];
    var sizes = [0.2,0.4,0.6,0.8,1];
} else {
    var counts = [64,32,16,8,4,2,1];
    var sizes = [0.1,0.2,0.4,0.6,0.8,0.9,1];
}

// Create a paper.js item, which will fill the background.
var path = new Path.Circle({
    center: [0, 0],
    radius: 10,
    fillColor: 'white',
    strokeColor: 'black'
});
var symbol = new Symbol(path);

var layers = [];
var position_points_in_layers = [];
var n_layers = counts.length;
var website_ratio = 0.50;

// Create dots a bit everywhere.
for (var i = 0; i < n_layers; i++) {
    var newLayer = new Layer();
    newLayer.applyMatrix = false;
    layers.push(newLayer);

    var position_points = [];

    for (var j = 0; j < counts[i]; j++) {
        var distribution = website_ratio/2 + ((1-website_ratio)/2)*(1-sizes[i]);
        var left_point = (Point.random() * view.size * [distribution, 1]);
        var right_point = (Point.random() * view.size * [distribution, 1]) + view.size * [1-distribution, 0];

        var center = left_point;
        if (Math.random() > 0.5) {
            center = right_point;
        }

        position_points.push(center);

        var placedSymbol = symbol.place(center);
        placedSymbol.scale(sizes[i]);
    }

    position_points_in_layers.push(position_points);
    position_points_in_layers.push(position_points);

    var copyLayer = new Layer();
    copyLayer.applyMatrix = false;
    newLayer.copyTo(copyLayer);
    layers.push(copyLayer);

    copyLayer.position.y -= view.size._height;
}

var lines = [];
var lines_layer = new Layer();


function gimme_global_position(layer, point) {
    return layers[layer].localToGlobal(position_points_in_layers[layer][point]);
}

// The worker takes the positions in input, and computes the minimal spanning
// tree of the points by the prim algorithm, yielding each edge as soon as it's
// found.
var primWorker = new Worker('js/prim.js');

// an edge has been generated, time to show it.
primWorker.onmessage = function(e) {
    var p1 = gimme_global_position(e.data[0], e.data[1]);
    var p2 = gimme_global_position(e.data[2], e.data[3]);
    lines.push([e.data, new Path.Line(p1,p2)]);
    lines[lines.length-1][1].strokeColor = new Color(1, 1, 1, 0.050005);
}

// generates a random starting point for prim algorithm, computes positions
// and call the worker.
var work = function() {
    var l = Math.floor(Math.random()*n_layers);
    var dep = Math.floor(Math.random()*counts[l]);
    var positions = [];
    for (var layer = 0; layer < 2*n_layers; layer++) {
        positions.push([]);
        for (var p1 = 0; p1 < counts[Math.floor(layer/2)]; p1++) {
            positions[layer].push( gimme_global_position(layer, p1));
        }
    }

    primWorker.postMessage({
        positions: positions,
        starting_layer: 2*l,
        starting_point: dep,
        n_layers:n_layers,
        counts:counts,
        sizes:sizes
    });
};

// Yeah.. 2D euclidean distance.
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}

var working = false;

if (onmobile) {
    work();
}

var currentDimensions = view.size;

// This is called at 60FPS if the tab is on focus.
function onFrame(event) {
    // No animation on mobile
    if (onmobile) {
        return;
    }

    // Move vertically every point according to their size
    // They are grouped by layer so this is fast.
    for (var i = 0; i < 2*n_layers; i++) {
        var l = Math.floor(i/2);
        layers[i].position.y += sizes[l];

        if (layers[i].bounds.top > view.size._height) {
            layers[i].position.y -= 2*view.size._height;
        }
    }

    // line animation.
    var to_delete = [];
    for (i in lines) {
        var data = lines[i];
        var p1 = gimme_global_position(data[0][0], data[0][1]);
        var p2 = gimme_global_position(data[0][2], data[0][3]);

        var scale = (sizes[Math.floor(data[0][0]/2)] + sizes[Math.floor(data[0][2]/2)])/2;
        if (data[1].strokeColor.alpha < scale && (Math.round(1000000*data[1].strokeColor.alpha) % 10 === 5)) {
            data[1].strokeColor.alpha += 0.01*scale;
        } else if (data[1].strokeColor.alpha >= scale) {
            data[1].strokeColor.alpha = scale-0.000001;
        } else if (data[1].strokeColor.alpha > 0){
            data[1].strokeColor.alpha -= 0.01*scale;
        }

        if (distance(p1,p2) > view.size._height || data[1].strokeColor.alpha === 0) {
            to_delete.push(i);
        } else {
            data[1].firstSegment.point = p1;
            data[1].lastSegment.point = p2;
        }
    }
    for (i = to_delete.length-1; i >= 0; i--){
        lines[to_delete[i]][1].removeSegments();
        lines.splice(to_delete[i],1);
        working = false;
    }

    if (lines.length === 0 && !working) {
        working = true;
        setTimeout(work, 200);
    }
}


function onResize(event) {
    var newDimensions = view.size;
    var scaleX = newDimensions._width/currentDimensions._width;
    var scaleY = newDimensions._height/currentDimensions._height;

    console.log("Resize ("+scaleX+ ","+scaleY+ ")");

    for (var i in layers) {
        for (var j in layers[i].children) {
            layers[i].children[j].position.x = layers[i].children[j].position.x * scaleX;
            // TODO: Handle Y resize.
        }
    }


    currentDimensions = newDimensions;
}
