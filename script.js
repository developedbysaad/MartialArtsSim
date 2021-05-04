let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  var img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let setImagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let frame = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  forwardkick: [1, 2, 3, 4, 5, 6, 7],
  backwardkick: [1, 2, 3, 4, 5, 6, 7],
  forwardpunch: [1, 2, 3, 4, 5, 6, 7],
  backwardpunch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
  backward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    block: [],
    forwardkick: [],
    backwardkick: [],
    forwardpunch: [],
    backwardpunch: [],
    forward: [],
    backward: [],
  };
  let imagesToLoad = 0;

  [
    "idle",
    "block",
    "forwardkick",
    "backwardkick",
    "forwardpunch",
    "backwardpunch",
    "forward",
    "backward",
  ].forEach((animation) => {
    let animationFrames = frame[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber) => {
      let path = setImagePath(frameNumber, animation);
      loadImage(path, (image) => {
        images[animation][frameNumber - 1] = image;
        imagesToLoad = imagesToLoad - 1;

        if (imagesToLoad === 0) callback(images);
      });
    });
  });
};

let x = 0;
let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(20, 0, 500, 500);
      ctx.drawImage(image, 20, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimations = [];
  let aux = () => {
    let selectedAnimation;

    if (queuedAnimations.length === 0) selectedAnimation = "idle";
    else selectedAnimation = queuedAnimations.shift();

    animate(ctx, images, selectedAnimation, aux);
  };
  aux();

  document.getElementById("forwardpunch").onclick = () => {
    queuedAnimations.push("forwardpunch");
  };
  document.getElementById("backwardpunch").onclick = () => {
    queuedAnimations.push("backwardpunch");
  };
  document.getElementById("forwardkick").onclick = () => {
    queuedAnimations.push("forwardkick");
  };
  document.getElementById("backwardkick").onclick = () => {
    queuedAnimations.push("backwardkick");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimations.push("block");
  };
  document.getElementById("forward").onclick = () => {
    queuedAnimations.push("forward");
  };
  document.getElementById("backward").onclick = () => {
    queuedAnimations.push("backward");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    switch (event.key) {
      case "b":
      case "B":
        queuedAnimations.push("backward");
        break;
      case "f":
      case "F":
        queuedAnimations.push("forward");
        break;
      case "ArrowUp":
        queuedAnimations.push("forwardkick");
        break;
      case "ArrowDown":
        queuedAnimations.push("backwardkick");
        break;
      case " ":
        queuedAnimations.push("block");
        break;
      case "ArrowRight":
        queuedAnimations.push("forwardpunch");
        break;
      case "ArrowLeft":
        queuedAnimations.push("backwardpunch");
    }
    /*
    if (key === "ArrowLeft") {
      queuedAnimations.push("backwardpunch");
    } else if (key === "ArrowRight") {
      queuedAnimations.push("forwardpunch");
    } else if (key === "ArrowUp") {
      queuedAnimations.push("forwardkick");
    } else if (key === "ArrowDown") {
      queuedAnimations.push("backwardkick");
    }else if (key === "f" || key === "F") {
        queuedAnimations.push("forward");
      } else if (key === "F") {
        queuedAnimations.push("forward");
      } else if (key === "b" || key === "B") {
        queuedAnimations.push("backward");
      }
    } else if (key === "B") {
      queuedAnimations.push("backward");
    }
    } else if (key === " ") {
      queuedAnimations.push("block");
    }*/
  });
});
