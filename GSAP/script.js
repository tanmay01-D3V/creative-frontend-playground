gsap.to("#Page2 h1", {
    transform: "translateX(-200%)",
    scrollTrigger: {
        trigger: "#Page2",
        scroller: "body",
        markers: true,
        start: "top 0%",
        end: "top -200%",
        scrub: 1,
        pin: true,
    }
});

var initialPath = "M 10 100 Q 500 100 990 100";
var stringContainer = document.querySelector("#string");
var stringPath = document.querySelector("#string path");
var hitbox = document.querySelector("#hitbox");
var svg = document.querySelector("#string svg");

var isPlucking = false;
var pluckThreshold = 180;
hitbox.addEventListener("mouseenter", function () {
    isPlucking = true;
});

stringContainer.addEventListener("mousemove", function (dets) {
    if (isPlucking) {
        var pt = svg.createSVGPoint();
        pt.x = dets.clientX;
        pt.y = dets.clientY;
        var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        var dy = Math.abs(svgP.y - 100);

        if (dy > pluckThreshold) {
            releaseString();
        } else {
            var newPath = `M 10 100 Q ${svgP.x} ${svgP.y} 990 100`;
            gsap.to([stringPath, hitbox], {
                attr: { d: newPath },
                duration: 0.2,
                ease: "power3.out"
            });
        }
    }
});

stringContainer.addEventListener("mouseleave", function () {
    if (isPlucking) {
        releaseString();
    }
});

function releaseString() {
    isPlucking = false;
    gsap.to([stringPath, hitbox], {
        attr: { d: initialPath },
        duration: 2,
        ease: "elastic.out(1.2, 0.2)"
    });
}


var main = document.querySelector("#main");
var cursor = document.querySelector("#cursor");
var imageDiv = document.querySelector("#image");

window.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
        x: dets.clientX,
        y: dets.clientY,
        duration: 0.2,
        ease: "power3.out"
    });
});

imageDiv.addEventListener("mouseenter", function () {
    cursor.innerHTML = "View more"
    gsap.to(cursor, {
        scale: 4,
        backgroundColor: "#ffffff80",
    });
});

imageDiv.addEventListener("mouseleave", function () {
    cursor.innerHTML = ""
    gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#ffffffff",
    });
});

var menu = document.querySelector("#nav i");
var cross = document.querySelector("#menu i");

var tl = gsap.timeline()

tl.to("#menu", {
    right: 0,
    duration: 0.5
})

tl.from("#menu h4", {
    x: 150,
    duration: 0.5,
    stagger: 0.3,
    opacity: 0,
})

tl.from("#menu i", {
    opacity: 0
})

tl.pause()

menu.addEventListener("click", function () {
    tl.play()
})

cross.addEventListener("click", function () {
    tl.reverse()
})