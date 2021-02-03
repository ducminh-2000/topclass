!function (t, e) {
    "function" == typeof define && define.amd ? define([], e()) : "object" == typeof exports ? module.exports = e() : t.iziToast = e()
}("undefined" != typeof global ? global : window || this.window || this.global, (function (t) {
    "use strict";
    var e = {}, o = "iziToast", n = (document.querySelector("body"), !!/Mobi/.test(navigator.userAgent)),
        i = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        s = "undefined" != typeof InstallTrigger, a = "ontouchstart" in document.documentElement,
        r = ["bottomRight", "bottomLeft", "bottomCenter", "topRight", "topLeft", "topCenter", "center"], l = 568,
        d = {};
    e.children = {};
    var c = {
        id: null,
        class: "",
        title: "",
        titleColor: "",
        titleSize: "",
        titleLineHeight: "",
        message: "",
        messageColor: "",
        messageSize: "",
        messageLineHeight: "",
        backgroundColor: "",
        theme: "light",
        color: "",
        icon: "",
        iconText: "",
        iconColor: "",
        iconUrl: null,
        image: "",
        imageWidth: 50,
        maxWidth: null,
        zindex: null,
        layout: 1,
        balloon: !1,
        close: !0,
        closeOnEscape: !1,
        closeOnClick: !1,
        displayMode: 0,
        position: "bottomRight",
        target: "",
        targetFirst: !0,
        timeout: 5e3,
        rtl: !1,
        animateInside: !0,
        drag: !0,
        pauseOnHover: !0,
        resetOnHover: !1,
        progressBar: !0,
        progressBarColor: "",
        progressBarEasing: "linear",
        overlay: !1,
        overlayClose: !1,
        overlayColor: "rgba(0, 0, 0, 0.6)",
        transitionIn: "fadeInUp",
        transitionOut: "fadeOut",
        transitionInMobile: "fadeInUp",
        transitionOutMobile: "fadeOutDown",
        buttons: {},
        inputs: {},
        onOpening: function () {
        },
        onOpened: function () {
        },
        onClosing: function () {
        },
        onClosed: function () {
        }
    };
    if ("remove" in Element.prototype || (Element.prototype.remove = function () {
        this.parentNode && this.parentNode.removeChild(this)
    }), "function" != typeof window.CustomEvent) {
        var u = function (t, e) {
            e = e || {bubbles: !1, cancelable: !1, detail: void 0};
            var o = document.createEvent("CustomEvent");
            return o.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), o
        };
        u.prototype = window.Event.prototype, window.CustomEvent = u
    }
    var p = function (t, e, o) {
        if ("[object Object]" === Object.prototype.toString.call(t)) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.call(o, t[n], n, t); else if (t) for (var i = 0, s = t.length; s > i; i++) e.call(o, t[i], i, t)
    }, m = function (t, e) {
        var o = {};
        return p(t, (function (e, n) {
            o[n] = t[n]
        })), p(e, (function (t, n) {
            o[n] = e[n]
        })), o
    }, g = function (t) {
        var e = document.createDocumentFragment(), o = document.createElement("div");
        for (o.innerHTML = t; o.firstChild;) e.appendChild(o.firstChild);
        return e
    }, f = {
        move: function (t, e, n, a) {
            var r, l = 180;
            0 !== a && (t.classList.add(o + "-dragged"), t.style.transform = "translateX(" + a + "px)", a > 0 ? .3 > (r = (l - a) / l) && e.hide(m(n, {
                transitionOut: "fadeOutRight",
                transitionOutMobile: "fadeOutRight"
            }), t, "drag") : .3 > (r = (l + a) / l) && e.hide(m(n, {
                transitionOut: "fadeOutLeft",
                transitionOutMobile: "fadeOutLeft"
            }), t, "drag"), t.style.opacity = r, .3 > r && ((i || s) && (t.style.left = a + "px"), t.parentNode.style.opacity = .3, this.stopMoving(t, null)))
        }, startMoving: function (t, e, o, n) {
            n = n || window.event;
            var i = a ? n.touches[0].clientX : n.clientX, s = t.style.transform.replace("px)", ""),
                r = i - (s = s.replace("translateX(", ""));
            o.transitionIn && t.classList.remove(o.transitionIn), o.transitionInMobile && t.classList.remove(o.transitionInMobile), t.style.transition = "", a ? document.ontouchmove = function (n) {
                n.preventDefault();
                var i = (n = n || window.event).touches[0].clientX - r;
                f.move(t, e, o, i)
            } : document.onmousemove = function (n) {
                n.preventDefault();
                var i = (n = n || window.event).clientX - r;
                f.move(t, e, o, i)
            }
        }, stopMoving: function (t, e) {
            a ? document.ontouchmove = function () {
            } : document.onmousemove = function () {
            }, t.style.opacity = "", t.style.transform = "", t.classList.contains(o + "-dragged") && (t.classList.remove(o + "-dragged"), t.style.transition = "transform 0.4s ease, opacity 0.4s ease", setTimeout((function () {
                t.style.transition = ""
            }), 400))
        }
    };
    return e.setSetting = function (t, o, n) {
        e.children[t][o] = n
    }, e.getSetting = function (t, o) {
        return e.children[t][o]
    }, e.destroy = function () {
        p(document.querySelectorAll("." + o + "-overlay"), (function (t, e) {
            t.remove()
        })), p(document.querySelectorAll("." + o + "-wrapper"), (function (t, e) {
            t.remove()
        })), p(document.querySelectorAll("." + o), (function (t, e) {
            t.remove()
        })), this.children = {}, document.removeEventListener(o + "-opened", {}, !1), document.removeEventListener(o + "-opening", {}, !1), document.removeEventListener(o + "-closing", {}, !1), document.removeEventListener(o + "-closed", {}, !1), document.removeEventListener("keyup", {}, !1), d = {}
    }, e.settings = function (t) {
        e.destroy(), d = t, c = m(c, t || {})
    }, p({
        info: {color: "blue", icon: "ico-info"},
        success: {color: "green", icon: "ico-success"},
        warning: {color: "orange", icon: "ico-warning"},
        error: {color: "red", icon: "ico-error"},
        question: {color: "yellow", icon: "ico-question"}
    }, (function (t, o) {
        e[o] = function (e) {
            var o = m(d, e || {});
            o = m(t, o || {}), this.show(o)
        }
    })), e.progress = function (t, e, n) {
        var i = this, s = e.getAttribute("data-iziToast-ref"), a = m(this.children[s], t || {}),
            r = e.querySelector("." + o + "-progressbar div");
        return {
            start: function () {
                void 0 === a.time.REMAINING && (e.classList.remove(o + "-reseted"), null !== r && (r.style.transition = "width " + a.timeout + "ms " + a.progressBarEasing, r.style.width = "0%"), a.time.START = (new Date).getTime(), a.time.END = a.time.START + a.timeout, a.time.TIMER = setTimeout((function () {
                    clearTimeout(a.time.TIMER), e.classList.contains(o + "-closing") || (i.hide(a, e, "timeout"), "function" == typeof n && n.apply(i))
                }), a.timeout), i.setSetting(s, "time", a.time))
            }, pause: function () {
                if (void 0 !== a.time.START && !e.classList.contains(o + "-paused") && !e.classList.contains(o + "-reseted")) {
                    if (e.classList.add(o + "-paused"), a.time.REMAINING = a.time.END - (new Date).getTime(), clearTimeout(a.time.TIMER), i.setSetting(s, "time", a.time), null !== r) {
                        var t = window.getComputedStyle(r).getPropertyValue("width");
                        r.style.transition = "none", r.style.width = t
                    }
                    "function" == typeof n && setTimeout((function () {
                        n.apply(i)
                    }), 10)
                }
            }, resume: function () {
                void 0 !== a.time.REMAINING ? (e.classList.remove(o + "-paused"), null !== r && (r.style.transition = "width " + a.time.REMAINING + "ms " + a.progressBarEasing, r.style.width = "0%"), a.time.END = (new Date).getTime() + a.time.REMAINING, a.time.TIMER = setTimeout((function () {
                    clearTimeout(a.time.TIMER), e.classList.contains(o + "-closing") || (i.hide(a, e, "timeout"), "function" == typeof n && n.apply(i))
                }), a.time.REMAINING), i.setSetting(s, "time", a.time)) : this.start()
            }, reset: function () {
                clearTimeout(a.time.TIMER), delete a.time.REMAINING, i.setSetting(s, "time", a.time), e.classList.add(o + "-reseted"), e.classList.remove(o + "-paused"), null !== r && (r.style.transition = "none", r.style.width = "100%"), "function" == typeof n && setTimeout((function () {
                    n.apply(i)
                }), 10)
            }
        }
    }, e.hide = function (t, e, i) {
        "object" != typeof e && (e = document.querySelector(e));
        var s = this, a = m(this.children[e.getAttribute("data-iziToast-ref")], t || {});
        a.closedBy = i || null, delete a.time.REMAINING, e.classList.add(o + "-closing"), function () {
            var t = document.querySelector("." + o + "-overlay");
            if (null !== t) {
                var e = t.getAttribute("data-iziToast-ref"), n = (e = e.split(",")).indexOf(String(a.ref));
                -1 !== n && e.splice(n, 1), t.setAttribute("data-iziToast-ref", e.join()), 0 === e.length && (t.classList.remove("fadeIn"), t.classList.add("fadeOut"), setTimeout((function () {
                    t.remove()
                }), 700))
            }
        }(), a.transitionIn && e.classList.remove(a.transitionIn), a.transitionInMobile && e.classList.remove(a.transitionInMobile), n || window.innerWidth <= l ? a.transitionOutMobile && e.classList.add(a.transitionOutMobile) : a.transitionOut && e.classList.add(a.transitionOut), e.parentNode.style.height = e.parentNode.offsetHeight + "px", e.style.pointerEvents = "none", (!n || window.innerWidth > l) && (e.parentNode.style.transitionDelay = "0.2s");
        try {
            var r = new CustomEvent(o + "-closing", {detail: a, bubbles: !0, cancelable: !0});
            document.dispatchEvent(r)
        } catch (d) {
            console.warn(d)
        }
        setTimeout((function () {
            e.parentNode.style.height = "0px", e.parentNode.style.overflow = "", setTimeout((function () {
                delete s.children[a.ref], e.parentNode.remove();
                try {
                    var t = new CustomEvent(o + "-closed", {detail: a, bubbles: !0, cancelable: !0});
                    document.dispatchEvent(t)
                } catch (n) {
                    console.warn(n)
                }
                void 0 !== a.onClosed && a.onClosed.apply(null, [a, e, i])
            }), 1e3)
        }), 200), void 0 !== a.onClosing && a.onClosing.apply(null, [a, e, i])
    }, e.show = function (t) {
        var i = this, s = m(d, t || {});
        if ((s = m(c, s)).time = {}, null === s.id && (s.id = function (t) {
            return btoa(encodeURIComponent(t)).replace(/=/g, "")
        }(s.title + s.message + s.color)), 1 === s.displayMode || "once" == s.displayMode) try {
            if (document.querySelectorAll("." + o + "#" + s.id).length > 0) return !1
        } catch (y) {
            console.warn("[" + o + "] Could not find an element with this selector: #" + s.id + ". Try to set an valid id.")
        }
        if (2 === s.displayMode || "replace" == s.displayMode) try {
            p(document.querySelectorAll("." + o + "#" + s.id), (function (t, e) {
                i.hide(s, t, "replaced")
            }))
        } catch (y) {
            console.warn("[" + o + "] Could not find an element with this selector: #" + s.id + ". Try to set an valid id.")
        }
        s.ref = (new Date).getTime() + Math.floor(1e7 * Math.random() + 1), e.children[s.ref] = s;
        var u, v = {
            body: document.querySelector("body"),
            overlay: document.createElement("div"),
            toast: document.createElement("div"),
            toastBody: document.createElement("div"),
            toastTexts: document.createElement("div"),
            toastCapsule: document.createElement("div"),
            cover: document.createElement("div"),
            buttons: document.createElement("div"),
            inputs: document.createElement("div"),
            icon: s.iconUrl ? document.createElement("img") : document.createElement("i"),
            wrapper: null
        };
        v.toast.setAttribute("data-iziToast-ref", s.ref), v.toast.appendChild(v.toastBody), v.toastCapsule.appendChild(v.toast), function () {
            if (v.toast.classList.add(o), v.toast.classList.add(o + "-opening"), v.toastCapsule.classList.add(o + "-capsule"), v.toastBody.classList.add(o + "-body"), v.toastTexts.classList.add(o + "-texts"), n || window.innerWidth <= l ? s.transitionInMobile && v.toast.classList.add(s.transitionInMobile) : s.transitionIn && v.toast.classList.add(s.transitionIn), s.class) {
                var t = s.class.split(" ");
                p(t, (function (t, e) {
                    v.toast.classList.add(t)
                }))
            }
            s.id && (v.toast.id = s.id), s.rtl && (v.toast.classList.add(o + "-rtl"), v.toast.setAttribute("dir", "rtl")), s.layout > 1 && v.toast.classList.add(o + "-layout" + s.layout), s.balloon && v.toast.classList.add(o + "-balloon"), s.maxWidth && (v.toast.style.maxWidth = isNaN(s.maxWidth) ? s.maxWidth : s.maxWidth + "px"), "" === s.theme && "light" === s.theme || v.toast.classList.add(o + "-theme-" + s.theme), s.color && (function (t) {
                return "#" == t.substring(0, 1) || "rgb" == t.substring(0, 3) || "hsl" == t.substring(0, 3)
            }(s.color) ? v.toast.style.background = s.color : v.toast.classList.add(o + "-color-" + s.color)), s.backgroundColor && (v.toast.style.background = s.backgroundColor, s.balloon && (v.toast.style.borderColor = s.backgroundColor))
        }(), s.image && (v.cover.classList.add(o + "-cover"), v.cover.style.width = s.imageWidth + "px", v.cover.style.backgroundImage = function (t) {
            try {
                return btoa(atob(t)) == t
            } catch (e) {
                return !1
            }
        }(s.image.replace(/ /g, "")) ? "url(data:image/png;base64," + s.image.replace(/ /g, "") + ")" : "url(" + s.image + ")", s.rtl ? v.toastBody.style.marginRight = s.imageWidth + 10 + "px" : v.toastBody.style.marginLeft = s.imageWidth + 10 + "px", v.toast.appendChild(v.cover)), s.close ? (v.buttonClose = document.createElement("button"), v.buttonClose.type = "button", v.buttonClose.classList.add(o + "-close"), v.buttonClose.addEventListener("click", (function (t) {
            i.hide(s, v.toast, "button")
        })), v.toast.appendChild(v.buttonClose)) : s.rtl ? v.toast.style.paddingLeft = "18px" : v.toast.style.paddingRight = "18px", s.progressBar && (v.progressBar = document.createElement("div"), v.progressBarDiv = document.createElement("div"), v.progressBar.classList.add(o + "-progressbar"), v.progressBarDiv.style.background = s.progressBarColor, v.progressBar.appendChild(v.progressBarDiv), v.toast.appendChild(v.progressBar)), s.timeout && (s.pauseOnHover && !s.resetOnHover && (v.toast.addEventListener("mouseenter", (function (t) {
            i.progress(s, v.toast).pause()
        })), v.toast.addEventListener("mouseleave", (function (t) {
            i.progress(s, v.toast).resume()
        }))), s.resetOnHover && (v.toast.addEventListener("mouseenter", (function (t) {
            i.progress(s, v.toast).reset()
        })), v.toast.addEventListener("mouseleave", (function (t) {
            i.progress(s, v.toast).start()
        })))), s.iconUrl ? (v.icon.setAttribute("class", o + "-icon"), v.icon.setAttribute("src", s.iconUrl)) : s.icon && (v.icon.setAttribute("class", o + "-icon " + s.icon), s.iconText && v.icon.appendChild(document.createTextNode(s.iconText)), s.iconColor && (v.icon.style.color = s.iconColor)), (s.icon || s.iconUrl) && (s.rtl ? v.toastBody.style.paddingRight = "33px" : v.toastBody.style.paddingLeft = "33px", v.toastBody.appendChild(v.icon)), s.title.length > 0 && (v.strong = document.createElement("strong"), v.strong.classList.add(o + "-title"), v.strong.appendChild(g(s.title)), v.toastTexts.appendChild(v.strong), s.titleColor && (v.strong.style.color = s.titleColor), s.titleSize && (v.strong.style.fontSize = isNaN(s.titleSize) ? s.titleSize : s.titleSize + "px"), s.titleLineHeight && (v.strong.style.lineHeight = isNaN(s.titleSize) ? s.titleLineHeight : s.titleLineHeight + "px")), s.message.length > 0 && (v.p = document.createElement("p"), v.p.classList.add(o + "-message"), v.p.appendChild(g(s.message)), v.toastTexts.appendChild(v.p), s.messageColor && (v.p.style.color = s.messageColor), s.messageSize && (v.p.style.fontSize = isNaN(s.titleSize) ? s.messageSize : s.messageSize + "px"), s.messageLineHeight && (v.p.style.lineHeight = isNaN(s.titleSize) ? s.messageLineHeight : s.messageLineHeight + "px")), s.title.length > 0 && s.message.length > 0 && (s.rtl ? v.strong.style.marginLeft = "10px" : 2 === s.layout || s.rtl || (v.strong.style.marginRight = "10px")), v.toastBody.appendChild(v.toastTexts), s.inputs.length > 0 && (v.inputs.classList.add(o + "-inputs"), p(s.inputs, (function (t, e) {
            v.inputs.appendChild(g(t[0])), (u = v.inputs.childNodes)[e].classList.add(o + "-inputs-child"), t[3] && setTimeout((function () {
                u[e].focus()
            }), 300), u[e].addEventListener(t[1], (function (e) {
                return (0, t[2])(i, v.toast, this, e)
            }))
        })), v.toastBody.appendChild(v.inputs)), s.buttons.length > 0 && (v.buttons.classList.add(o + "-buttons"), p(s.buttons, (function (t, e) {
            v.buttons.appendChild(g(t[0]));
            var n = v.buttons.childNodes;
            n[e].classList.add(o + "-buttons-child"), t[2] && setTimeout((function () {
                n[e].focus()
            }), 300), n[e].addEventListener("click", (function (e) {
                return e.preventDefault(), (0, t[1])(i, v.toast, this, e, u)
            }))
        }))), v.toastBody.appendChild(v.buttons), s.message.length > 0 && (s.inputs.length > 0 || s.buttons.length > 0) && (v.p.style.marginBottom = "0"), (s.inputs.length > 0 || s.buttons.length > 0) && (s.rtl ? v.toastTexts.style.marginLeft = "10px" : v.toastTexts.style.marginRight = "10px", s.inputs.length > 0 && s.buttons.length > 0 && (s.rtl ? v.inputs.style.marginLeft = "8px" : v.inputs.style.marginRight = "8px")), v.toastCapsule.style.visibility = "hidden", setTimeout((function () {
            var t = v.toast.offsetHeight, e = v.toast.currentStyle || window.getComputedStyle(v.toast), o = e.marginTop;
            o = o.split("px"), o = parseInt(o[0]);
            var n = e.marginBottom;
            n = n.split("px"), n = parseInt(n[0]), v.toastCapsule.style.visibility = "", v.toastCapsule.style.height = t + n + o + "px", setTimeout((function () {
                v.toastCapsule.style.height = "auto", s.target && (v.toastCapsule.style.overflow = "visible")
            }), 500), s.timeout && i.progress(s, v.toast).start()
        }), 100), function () {
            var t = s.position;
            if (s.target) v.wrapper = document.querySelector(s.target), v.wrapper.classList.add(o + "-target"), s.targetFirst ? v.wrapper.insertBefore(v.toastCapsule, v.wrapper.firstChild) : v.wrapper.appendChild(v.toastCapsule); else {
                if (-1 == r.indexOf(s.position)) return void console.warn("[" + o + "] Incorrect position.\nIt can be › " + r);
                t = n || window.innerWidth <= l ? "bottomLeft" == s.position || "bottomRight" == s.position || "bottomCenter" == s.position ? o + "-wrapper-bottomCenter" : "topLeft" == s.position || "topRight" == s.position || "topCenter" == s.position ? o + "-wrapper-topCenter" : o + "-wrapper-center" : o + "-wrapper-" + t, v.wrapper = document.querySelector("." + o + "-wrapper." + t), v.wrapper || (v.wrapper = document.createElement("div"), v.wrapper.classList.add(o + "-wrapper"), v.wrapper.classList.add(t), document.body.appendChild(v.wrapper)), "topLeft" == s.position || "topCenter" == s.position || "topRight" == s.position ? v.wrapper.insertBefore(v.toastCapsule, v.wrapper.firstChild) : v.wrapper.appendChild(v.toastCapsule)
            }
            isNaN(s.zindex) ? console.warn("[" + o + "] Invalid zIndex.") : v.wrapper.style.zIndex = s.zindex
        }(), s.overlay && (null !== document.querySelector("." + o + "-overlay.fadeIn") ? (v.overlay = document.querySelector("." + o + "-overlay"), v.overlay.setAttribute("data-iziToast-ref", v.overlay.getAttribute("data-iziToast-ref") + "," + s.ref), isNaN(s.zindex) || null === s.zindex || (v.overlay.style.zIndex = s.zindex - 1)) : (v.overlay.classList.add(o + "-overlay"), v.overlay.classList.add("fadeIn"), v.overlay.style.background = s.overlayColor, v.overlay.setAttribute("data-iziToast-ref", s.ref), isNaN(s.zindex) || null === s.zindex || (v.overlay.style.zIndex = s.zindex - 1), document.querySelector("body").appendChild(v.overlay)), s.overlayClose ? (v.overlay.removeEventListener("click", {}), v.overlay.addEventListener("click", (function (t) {
            i.hide(s, v.toast, "overlay")
        }))) : v.overlay.removeEventListener("click", {})), function () {
            if (s.animateInside) {
                v.toast.classList.add(o + "-animateInside");
                var t = [200, 100, 300];
                "bounceInLeft" != s.transitionIn && "bounceInRight" != s.transitionIn || (t = [400, 200, 400]), s.title.length > 0 && setTimeout((function () {
                    v.strong.classList.add("slideIn")
                }), t[0]), s.message.length > 0 && setTimeout((function () {
                    v.p.classList.add("slideIn")
                }), t[1]), (s.icon || s.iconUrl) && setTimeout((function () {
                    v.icon.classList.add("revealIn")
                }), t[2]);
                var e = 150;
                s.buttons.length > 0 && v.buttons && setTimeout((function () {
                    p(v.buttons.childNodes, (function (t, o) {
                        setTimeout((function () {
                            t.classList.add("revealIn")
                        }), e), e += 150
                    }))
                }), s.inputs.length > 0 ? 150 : 0), s.inputs.length > 0 && v.inputs && (e = 150, p(v.inputs.childNodes, (function (t, o) {
                    setTimeout((function () {
                        t.classList.add("revealIn")
                    }), e), e += 150
                })))
            }
        }(), s.onOpening.apply(null, [s, v.toast]);
        try {
            var h = new CustomEvent(o + "-opening", {detail: s, bubbles: !0, cancelable: !0});
            document.dispatchEvent(h)
        } catch (b) {
            console.warn(b)
        }
        setTimeout((function () {
            v.toast.classList.remove(o + "-opening"), v.toast.classList.add(o + "-opened");
            try {
                var t = new CustomEvent(o + "-opened", {detail: s, bubbles: !0, cancelable: !0});
                document.dispatchEvent(t)
            } catch (e) {
                console.warn(e)
            }
            s.onOpened.apply(null, [s, v.toast])
        }), 1e3), s.drag && (a ? (v.toast.addEventListener("touchstart", (function (t) {
            f.startMoving(this, i, s, t)
        }), !1), v.toast.addEventListener("touchend", (function (t) {
            f.stopMoving(this, t)
        }), !1)) : (v.toast.addEventListener("mousedown", (function (t) {
            t.preventDefault(), f.startMoving(this, i, s, t)
        }), !1), v.toast.addEventListener("mouseup", (function (t) {
            t.preventDefault(), f.stopMoving(this, t)
        }), !1))), s.closeOnEscape && document.addEventListener("keyup", (function (t) {
            27 == (t = t || window.event).keyCode && i.hide(s, v.toast, "esc")
        })), s.closeOnClick && v.toast.addEventListener("click", (function (t) {
            i.hide(s, v.toast, "toast")
        })), i.toast = v.toast
    }, e
}));