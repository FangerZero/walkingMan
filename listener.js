AFRAME.registerComponent('btn-click', {
    init: function () {
      this.el.addEventListener('click', function (evt) {
          console.log(evt);
        if (evt.detail.hasOwnProperty('intersectedEl')) {
            var walkerRotation = document.querySelector('#walker').getAttribute("rotation");
            var btnLabelVal = document.querySelector('#btnLabel').getAttribute("value");

            switch (evt.detail.intersectedEl.id) {
                case "btn": 
                    if (btnLabelVal === "PLAY") {
                        changeBtn("STOP", "red");
                        document.querySelector('#walker').setAttribute('animation-mixer','');
                        document.querySelector('#moveBtn').setAttribute("visible","true");
                        document.querySelector('#moveLabel').setAttribute("visible","true");
                        // Add Animation
                        moveEntity('#walker',walkerRotation);
                    } else if (btnLabelVal === "STOP") {
                        document.querySelector('#moveBtn').setAttribute("visible","false");
                        document.querySelector('#moveLabel').setAttribute("visible","false");
                        document.querySelector('#walker').removeAttribute('animation-mixer');
                        changeBtn("PLAY", "green");
                    } else {
                        changeBtn("PLAY", "green");
                        document.querySelector('#walker').setAttribute("visible","true");
                        document.querySelector('#turnBtn').setAttribute("visible","true");
                        document.querySelector('#turnLabel').setAttribute("visible","true");
                    }
                break;
                case "turnBtn":
                    walkerRotation.y+=90;
                    if (walkerRotation.y >= 360 ) {
                        walkerRotation.y = walkerRotation.y-360;
                    }
                    if (btnLabelVal === "STOP") {
                        moveEntity('#walker',walkerRotation);
                    }
                    document.querySelector('#walker').setAttribute("rotation",walkerRotation);
                break;
                case "moveBtn":
                    moveEntity('#walker',walkerRotation);
                break;
            }
        }
      });
    }
  });

function clickMove(id) {
    var walkerPosition = document.querySelector(id).getAttribute('position');
    var currentPosition = JSON.stringify(walkerPosition);
}

function moveEntity(id, rotation) {
    var walkerPosition = document.querySelector(id).getAttribute('position');
    var currentPosition = walkerPosition.x + " " + walkerPosition.y + " " + walkerPosition.z;

    switch (rotation.y) {
        case 0: 
            walkerPosition.x += 1;
        break;
        case 90: 
            walkerPosition.z -= 1;
        break;
        case 180:
            walkerPosition.x -= 1;
        break;
        case 270:
            walkerPosition.z += 1;
        break;
    }

    var newPosition = walkerPosition.x + " " + walkerPosition.y + " " + walkerPosition.z;

    const animation = document.createElement('a-animation');
    animation.setAttribute('attribute', 'position');
    animation.setAttribute('from', currentPosition);
    animation.setAttribute('to', newPosition);
    animation.setAttribute('dur', 5000);
    document.querySelector(id).appendChild(animation);  
}

function changeBtn(label, color) {
    document.querySelector('#btn').setAttribute("material","color: "+color);
    document.querySelector('#btnLabel').setAttribute("value",label);
}