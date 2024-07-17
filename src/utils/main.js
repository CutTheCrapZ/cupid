// import { anime } from "./anime.js";
// import router from '@/router'
// console.log(router)
export function switchPage() {
  // 跳转返回后下滑失效原因
  // if (switchPage.switched) {
  //   return;
  // }
  const DOM = {
    intro: $(".content-intro"),
    path: $(".shape-wrap path"),
    // shape: $("svg.shape"),
  };
  // DOM.shape.style.transformOrigin = "50% 0%";
  anime({
    targets: DOM.intro,
    duration: 1100,
    easing: "easeInOutSine",
    translateY: "-200vh",
  });

  anime({
    // targets: DOM.shape,
    scaleY: [
      {
        value: [0.8, 1.8],
        duration: 550,
        easing: "easeInQuad",
      },
      {
        value: 1,
        duration: 550,
        easing: "easeOutQuad",
      },
    ],
  });
  // anime({
  //   targets: DOM.path,
  //   duration: 1100,
  //   easing: "easeOutQuad",
  //   d: DOM.path.getAttribute("pathdata:id"),
  //   complete: function (anim) {
  //     console.log(canvas);
  //     if (canvas) {
  //       cancelAnimationFrame(animationID);
  //       canvas.parentElement.removeChild(canvas);
  //       canvas = null;
  //     }
  //   },
  // });

  switchPage.switched = true;
}
export const main = () => {
  /* script */
  window.$ = (selector) => document.querySelector(selector);
  const getOriginalContent = (selector) =>
    $(selector).getAttribute("original-content");
  window.subtitle = getOriginalContent(".content-subtitle");
  window.signature = getOriginalContent("#signature");
  window.config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 30, g: 31, b: 33 },
    TRANSPARENT: false,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.4,
    BLOOM_THRESHOLD: 0.8,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
  };
  /* main */
  window.hiddenProperty =
    "hidden" in document
      ? "hidden"
      : "webkitHidden" in document
      ? "webkitHidden"
      : "mozHidden" in document
      ? "mozHidden"
      : null;

  window.DIRECTIONS = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    UNDIRECTED: "UNDIRECTED",
  };
  window.isPhone =
    /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(
      navigator.userAgent
    );

  function getMoveDirection(startx, starty, endx, endy) {
    if (!isPhone) {
      return;
    }

    const angx = endx - startx;
    const angy = endy - starty;

    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return DIRECTIONS.UNDIRECTED;
    }

    const getAngle = (angx, angy) => (Math.atan2(angy, angx) * 180) / Math.PI;

    const angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      return DIRECTIONS.UP;
    } else if (angle > 45 && angle < 135) {
      return DIRECTIONS.DOWN;
    } else if (
      (angle >= 135 && angle <= 180) ||
      (angle >= -180 && angle < -135)
    ) {
      return DIRECTIONS.LEFT;
    } else if (angle >= -45 && angle <= 45) {
      return DIRECTIONS.RIGHT;
    }

    return DIRECTIONS.UNDIRECTED;
  }

  function loadIntro() {
    if (document[hiddenProperty] || loadIntro.loaded) {
      return;
    }

    setTimeout(() => {
      $(".wrap").classList.add("in");
      setTimeout(() => {
        $(".content-subtitle").innerHTML = `<span>${[...subtitle].join(
          "</span><span>"
        )}</span>`;
      }, 270);
    }, 0);
    loadIntro.loaded = true;
  }

  function loadMain() {
    if (loadMain.loaded) {
      return;
    }
    setTimeout(() => {
      $(".card-inner").classList.add("in");
    }, 400);
    loadMain.loaded = true;
  }

  function loadAll() {
    // 跳转返回后下滑失效原因
    // if (loadAll.loaded) {
    //   return;
    // }
    switchPage();
    loadMain();
    loadAll.loaded = true;
  }

  window.visibilityChangeEvent = hiddenProperty.replace(
    /hidden/i,
    "visibilitychange"
  );
  window.addEventListener(visibilityChangeEvent, loadIntro);
  // loadIntro 从gulp迁移过来后dom元素加载完成监听始终不生效
  window.addEventListener("DOMContentLoaded", () => {
    loadIntro();
  });
  const enterEl = $(".enter");
  const arrow = document.querySelectorAll(".arrow");
  for (let i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("touchenter", loadAll);
    arrow[i].addEventListener("click", loadAll);
  }
  enterEl.addEventListener("click", loadAll);
  enterEl.addEventListener("touchenter", loadAll);

  document.body.addEventListener("mousewheel", loadAll, { passive: true });
  $(".arrow").addEventListener("mouseenter", loadAll);

  if (isPhone) {
    /* 移动端监听上滑跳转页面 */
    // document.addEventListener(
    //   "touchstart",
    //   function (e) {
    //     window.startx = e.touches[0].pageX;
    //     window.starty = e.touches[0].pageY;
    //   },
    //   { passive: true }
    // );
    // document.addEventListener(
    //   "touchend",
    //   function (e) {
    //     let endx, endy;
    //     endx = e.changedTouches[0].pageX;
    //     endy = e.changedTouches[0].pageY;
    //     const direction = getMoveDirection(startx, starty, endx, endy);
    //     if (direction !== DIRECTIONS.UP) {
    //       return;
    //     }
    //     loadAll();
    //   },
    //   { passive: true }
    // );
  }
  /* background */
};
