(function (g, h) {
    function i(a) {
        var c = f.expando, d = a === g ? 0 : a[c];
        d === h && (a[c] = d = ++f.uuid);
        return d
    }

    var f = g.art = function (a, c) {
        return new f.fn.constructor(a, c)
    }, p = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, o = /[\n\t]/g;
    if (g.$ === h)g.$ = f;
    f.fn = f.prototype = {
        constructor: function (a, c) {
            var d, c = c || document;
            if (!a)return this;
            if (a.nodeType)return this[0] = a, this;
            if ("string" === typeof a && (d = p.exec(a)) && d[2])return (d = c.getElementById(d[2])) && d.parentNode && (this[0] = d), this;
            this[0] = a;
            return this
        }, hasClass: function (a) {
            return -1 <
            (" " + this[0].className + " ").replace(o, " ").indexOf(" " + a + " ") ? !0 : !1
        }, addClass: function (a) {
            this.hasClass(a) || (this[0].className += " " + a);
            return this
        }, removeClass: function (a) {
            var c = this[0];
            if (a) {
                if (this.hasClass(a))c.className = c.className.replace(a, " ")
            } else c.className = "";
            return this
        }, css: function (a, c) {
            var d, e = this[0];
            if ("string" === typeof a) {
                if (c === h)return f.css(e, a);
                e.style[a] = c
            } else for (d in a)e.style[d] = a[d];
            return this
        }, show: function () {
            return this.css("display", "block")
        }, hide: function () {
            return this.css("display",
                "none")
        }, offset: function () {
            var a = this[0], c = a.getBoundingClientRect(), d = a.ownerDocument, a = d.body, d = d.documentElement;
            return {
                left: c.left + (self.pageXOffset || d.scrollLeft) - (d.clientLeft || a.clientLeft || 0),
                top: c.top + (self.pageYOffset || d.scrollTop) - (d.clientTop || a.clientTop || 0)
            }
        }, html: function (a) {
            var c = this[0];
            if (a === h)return c.innerHTML;
            f.cleanData(c.getElementsByTagName("*"));
            c.innerHTML = a;
            return this
        }, remove: function () {
            var a = this[0];
            f.cleanData(a.getElementsByTagName("*"));
            f.cleanData([a]);
            a.parentNode.removeChild(a);
            return this
        }, bind: function (a, c) {
            f.event.add(this[0], a, c);
            return this
        }, unbind: function (a, c) {
            f.event.remove(this[0], a, c);
            return this
        }
    };
    f.fn.constructor.prototype = f.fn;
    f.isWindow = function (a) {
        return a && "object" === typeof a && "setInterval"in a
    };
    f.fn.find = function (a) {
        var c = this[0], d = a.split(".")[1];
        if (d)if (document.getElementsByClassName)d = c.getElementsByClassName(d); else {
            for (var e = a = 0, b = [], c = (c || document).getElementsByTagName("*"), m = c.length, d = RegExp("(^|\\s)" + d + "(\\s|$)"); a < m; a++)d.test(c[a].className) &&
            (b[e] = c[a], e++);
            d = b
        } else d = c.getElementsByTagName(a);
        return f(d[0])
    };
    f.each = function (a, c) {
        var d, e = 0, b = a.length;
        if (b === h)for (d in a) {
            if (!1 === c.call(a[d], d, a[d]))break
        } else for (d = a[0]; e < b && !1 !== c.call(d, e, d); d = a[++e]);
        return a
    };
    f.data = function (a, c, d) {
        var e = f.cache, a = i(a);
        if (c === h)return e[a];
        e[a] || (e[a] = {});
        d !== h && (e[a][c] = d);
        return e[a][c]
    };
    f.removeData = function (a, c) {
        var d = !0, e = f.expando, b = f.cache, m = i(a), n = m && b[m];
        if (n)if (c) {
            delete n[c];
            for (var k in n)d = !1;
            d && delete f.cache[m]
        } else delete b[m], a.removeAttribute ?
            a.removeAttribute(e) : a[e] = null
    };
    f.uuid = 0;
    f.cache = {};
    f.expando = "@cache" + +new Date;
    f.event = {
        add: function (a, c, d) {
            var j;
            var e, b = f.event;
            e = f.data(a, "@events") || f.data(a, "@events", {});
            j = e[c] = e[c] || {}, e = j;
            (e.listeners = e.listeners || []).push(d);
            if (!e.handler)e.elem = a, e.handler = b.handler(e), a.addEventListener ? a.addEventListener(c, e.handler, !1) : a.attachEvent("on" + c, e.handler)
        }, remove: function (a, c, d) {
            var e, b, m;
            b = f.event;
            var n = !0, k = f.data(a, "@events");
            if (k)if (c) {
                if (b = k[c]) {
                    m = b.listeners;
                    if (d)for (e = 0; e < m.length; e++)m[e] ===
                    d && m.splice(e--, 1); else b.listeners = [];
                    if (0 === b.listeners.length) {
                        a.removeEventListener ? a.removeEventListener(c, b.handler, !1) : a.detachEvent("on" + c, b.handler);
                        delete k[c];
                        b = f.data(a, "@events");
                        for (var r in b)n = !1;
                        n && f.removeData(a, "@events")
                    }
                }
            } else for (e in k)b.remove(a, e)
        }, handler: function (a) {
            return function (c) {
                for (var c = f.event.fix(c || g.event), d = 0, e = a.listeners, b; b = e[d++];)!1 === b.call(a.elem, c) && (c.preventDefault(), c.stopPropagation())
            }
        }, fix: function (a) {
            if (a.target)return a;
            var c = {
                target: a.srcElement ||
                document, preventDefault: function () {
                    a.returnValue = !1
                }, stopPropagation: function () {
                    a.cancelBubble = !0
                }
            }, d;
            for (d in a)c[d] = a[d];
            return c
        }
    };
    f.cleanData = function (a) {
        for (var c = 0, d, e = a.length, b = f.event.remove, m = f.removeData; c < e; c++)d = a[c], b(d), m(d)
    };
    f.css = "defaultView"in document && "getComputedStyle"in document.defaultView ? function (a, c) {
        return document.defaultView.getComputedStyle(a, !1)[c]
    } : function (a, c) {
        return a.currentStyle[c] || ""
    };
    f.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        f.fn[d] = function () {
            var c =
                this[0], b;
            return (b = f.isWindow(c) ? c : 9 === c.nodeType ? c.defaultView || c.parentWindow : !1) ? "pageXOffset"in b ? b[a ? "pageYOffset" : "pageXOffset"] : b.document.documentElement[d] || b.document.body[d] : c[d]
        }
    });
    f.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        f.fn[d] = function (a) {
            var b = this[0];
            return !b ? null == a ? null : this : f.isWindow(b) ? b.document.documentElement["client" + c] || b.document.body["client" + c] : 9 === b.nodeType ? Math.max(b.documentElement["client" + c], b.body["scroll" + c], b.documentElement["scroll" + c],
                b.body["offset" + c], b.documentElement["offset" + c]) : null
        }
    });
    return f
})(window);
(function (g, h, i) {
    if ("BackCompat" === document.compatMode)throw Error("artDialog: Document types require more than xhtml1.0");
    var f, p = 0, o = "artDialog" + +new Date, a = h.VBArray && !h.XMLHttpRequest, c = "createTouch"in document && !("onmousemove"in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent), d = !a && !c, e = function (b, a, n) {
        b = b || {};
        if ("string" === typeof b || 1 === b.nodeType)b = {content: b, fixed: !c};
        var k;
        k = e.defaults;
        var r = b.follow = 1 === this.nodeType && this || b.follow, t;
        for (t in k)b[t] === i && (b[t] = k[t]);
        b.id = r &&
        r[o + "follow"] || b.id || o + p;
        if (k = e.list[b.id])return r && k.follow(r), k.zIndex().focus(), k;
        if (!d)b.fixed = !1;
        if (!b.button || !b.button.push)b.button = [];
        if (a !== i)b.ok = a;
        b.ok && b.button.push({id: "ok", value: b.okValue, callback: b.ok, focus: !0});
        if (n !== i)b.cancel = n;
        b.cancel && b.button.push({id: "cancel", value: b.cancelValue, callback: b.cancel});
        e.defaults.zIndex = b.zIndex;
        p++;
        return e.list[b.id] = f ? f.constructor(b) : new e.fn.constructor(b)
    };
    e.version = "5.0";
    e.fn = e.prototype = {
        constructor: function (b) {
            var a;
            this.closed = !1;
            this.config = b;
            this.dom = a = this.dom || this._getDom();
            b.skin && a.wrap.addClass(b.skin);
            a.wrap.css("position", b.fixed ? "fixed" : "absolute");
            a.close[!1 === b.cancel ? "hide" : "show"]();
            a.content.css("padding", b.padding);
            this.button.apply(this, b.button);
            this.title(b.title).content(b.content).size(b.width, b.height).time(b.time);
            b.follow ? this.follow(b.follow) : this.position();
            this.zIndex();
            b.lock && this.lock();
            this._addEvent();
            this[b.visible ? "visible" : "hidden"]().focus();
            f = null;
            b.initialize && b.initialize.call(this);
            return this
        }, content: function (b) {
            var a, c, e, d, f = this, v = this.dom.content, l = v[0];
            this._elemBack && (this._elemBack(), delete this._elemBack);
            if ("string" === typeof b)v.html(b); else if (b && 1 === b.nodeType)d = b.style.display, a = b.previousSibling, c = b.nextSibling, e = b.parentNode, this._elemBack = function () {
                a && a.parentNode ? a.parentNode.insertBefore(b, a.nextSibling) : c && c.parentNode ? c.parentNode.insertBefore(b, c) : e && e.appendChild(b);
                b.style.display = d;
                f._elemBack = null
            }, v.html(""), l.appendChild(b), g(b).show();
            return this.position()
        },
        title: function (b) {
            var a = this.dom, c = a.outer, a = a.title;
            !1 === b ? (a.hide().html(""), c.addClass("d-state-noTitle")) : (a.show().html(b), c.removeClass("d-state-noTitle"));
            return this
        }, position: function () {
            var b = this.dom, a = b.wrap[0], c = b.window, e = b.document, d = this.config.fixed, b = d ? 0 : e.scrollLeft(), e = d ? 0 : e.scrollTop(), d = c.width(), f = c.height(), g = a.offsetHeight, c = (d - a.offsetWidth) / 2 + b, d = d = (g < 4 * f / 7 ? 0.382 * f - g / 2 : (f - g) / 2) + e, a = a.style;
            a.left = Math.max(c, b) + "px";
            a.top = Math.max(d, e) + "px";
            return this
        }, size: function (b, a) {
            var c =
                this.dom.main[0].style;
            "number" === typeof b && (b += "px");
            "number" === typeof a && (a += "px");
            c.width = b;
            c.height = a;
            return this
        }, follow: function (b) {
            var a = g(b), c = this.config;
            if (!b || !b.offsetWidth && !b.offsetHeight)return this.position(this._left, this._top);
            var d = c.fixed, e = o + "follow", f = this.dom, h = f.window, l = f.document, f = h.width(), h = h.height(), s = l.scrollLeft(), l = l.scrollTop(), j = a.offset(), a = b.offsetWidth, i = d ? j.left - s : j.left, j = d ? j.top - l : j.top, q = this.dom.wrap[0], p = q.style, u = q.offsetWidth, q = q.offsetHeight, w = i - (u -
                a) / 2, x = j + b.offsetHeight, s = d ? 0 : s, d = d ? 0 : l;
            p.left = (w < s ? i : w + u > f && i - u > s ? i - u + a : w) + "px";
            p.top = (x + q > h + d && j - q > d ? j - q : x) + "px";
            this._follow && this._follow.removeAttribute(e);
            this._follow = b;
            b[e] = c.id;
            return this
        }, button: function () {
            for (var b = this.dom.buttons, a = b[0], c = this._listeners = this._listeners || {}, d = [].slice.call(arguments), e = 0, f, h, l, i, j; e < d.length; e++) {
                f = d[e];
                h = f.value;
                l = f.id || h;
                i = !c[l];
                j = !i ? c[l].elem : document.createElement("input");
                j.type = "button";
                j.className = "d-button";
                c[l] || (c[l] = {});
                if (h)j.value = h;
                if (f.width)j.style.width =
                    f.width;
                if (f.callback)c[l].callback = f.callback;
                if (f.focus)this._focus && this._focus.removeClass("d-state-highlight"), this._focus = g(j).addClass("d-state-highlight"), this.focus();
                j[o + "callback"] = l;
                j.disabled = !!f.disabled;
                if (i)c[l].elem = j, a.appendChild(j)
            }
            b[0].style.display = d.length ? "" : "none";
            return this
        }, visible: function () {
            this.dom.wrap.css("visibility", "visible");
            this.dom.outer.addClass("d-state-visible");
            this._isLock && this._lockMask.show();
            return this
        }, hidden: function () {
            this.dom.wrap.css("visibility",
                "hidden");
            this.dom.outer.removeClass("d-state-visible");
            this._isLock && this._lockMask.hide();
            return this
        }, close: function () {
            if (this.closed)return this;
            var b = this.dom, a = b.wrap, c = e.list, k = this.config.beforeunload, g = this.config.follow;
            if (k && !1 === k.call(this))return this;
            if (e.focus === this)e.focus = null;
            g && g.removeAttribute(o + "follow");
            this._elemBack && this._elemBack();
            this.time();
            this.unlock();
            this._removeEvent();
            delete c[this.config.id];
            if (f)a.remove(); else {
                f = this;
                b.title.html("");
                b.content.html("");
                b.buttons.html("");
                a[0].className = a[0].style.cssText = "";
                b.outer[0].className = "d-outer";
                a.css({left: 0, top: 0, position: d ? "fixed" : "absolute"});
                for (var h in this)this.hasOwnProperty(h) && "dom" !== h && delete this[h];
                this.hidden()
            }
            this.closed = !0;
            return this
        }, time: function (b) {
            var a = this, c = this._timer;
            c && clearTimeout(c);
            if (b)this._timer = setTimeout(function () {
                a._click("cancel")
            }, b);
            return this
        }, focus: function () {
            if (this.config.focus)try {
                var b = this._focus && this._focus[0] || this.dom.close[0];
                b && b.focus()
            } catch (a) {
            }
            return this
        }, zIndex: function () {
            var b =
                this.dom, a = e.focus, c = e.defaults.zIndex++;
            b.wrap.css("zIndex", c);
            this._lockMask && this._lockMask.css("zIndex", c - 1);
            a && a.dom.outer.removeClass("d-state-focus");
            e.focus = this;
            b.outer.addClass("d-state-focus");
            return this
        }, lock: function () {
            if (this._isLock)return this;
            var b = this, a = this.dom, c = document.createElement("div"), f = g(c), i = e.defaults.zIndex - 1;
            this.zIndex();
            a.outer.addClass("d-state-lock");
            f.css({
                zIndex: i,
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }).addClass("d-mask");
            d || f.css({position: "absolute", width: g(h).width() + "px", height: g(document).height() + "px"});
            f.bind("click", function () {
                b._reset()
            });
            document.body.appendChild(c);
            this._lockMask = f;
            this._isLock = !0;
            return this
        }, unlock: function () {
            if (!this._isLock)return this;
            this._lockMask.unbind();
            this._lockMask.hide();
            this._lockMask.remove();
            this.dom.outer.removeClass("d-state-lock");
            this._isLock = !1;
            return this
        }, _getDom: function () {
            var b = document.body;
            if (!b)throw Error('artDialog: "documents.body" not ready');
            var a = document.createElement("div");
            a.style.cssText = "position:absolute;left:0;top:0";
            a.innerHTML = e._templates;
            b.insertBefore(a, b.firstChild);
            for (var c = 0, d = {}, f = a.getElementsByTagName("*"), i = f.length; c < i; c++)(b = f[c].className.split("d-")[1]) && (d[b] = g(f[c]));
            d.window = g(h);
            d.document = g(document);
            d.wrap = g(a);
            return d
        }, _click: function (b) {
            b = this._listeners[b] && this._listeners[b].callback;
            return "function" !== typeof b || !1 !== b.call(this) ? this.close() : this
        }, _reset: function () {
            var b = this.config.follow;
            b ? this.follow(b) :
                this.position()
        }, _addEvent: function () {
            var b = this, a = this.dom;
            a.wrap.bind("click", function (c) {
                c = c.target;
                if (c.disabled)return !1;
                if (c === a.close[0])return b._click("cancel"), !1;
                (c = c[o + "callback"]) && b._click(c)
            }).bind("mousedown", function () {
                b.zIndex()
            })
        }, _removeEvent: function () {
            this.dom.wrap.unbind()
        }
    };
    e.fn.constructor.prototype = e.fn;
    g.fn.dialog = g.fn.artDialog = function () {
        var b = arguments;
        this[this.live ? "live" : "bind"]("click", function () {
            e.apply(this, b);
            return !1
        });
        return this
    };
    e.focus = null;
    e.get = function (b) {
        return b ===
        i ? e.list : e.list[b]
    };
    e.list = {};
    g(document).bind("keydown", function (b) {
        var a = b.target, c = a.nodeName, d = /^input|textarea$/i, f = e.focus, b = b.keyCode;
        f && f.config.esc && !(d.test(c) && "button" !== a.type) && 27 === b && f._click("cancel")
    });
    g(h).bind("resize", function () {
        var b = e.list, a;
        for (a in b)b[a]._reset()
    });
    e._templates = '<div class="d-outer"><table class="d-border"><tbody><tr><td class="d-nw"></td><td class="d-n"></td><td class="d-ne"></td></tr><tr><td class="d-w"></td><td class="d-c"><div class="d-inner"><table class="d-dialog"><tbody><tr><td class="d-header"><div class="d-titleBar"><div class="d-title"></div><a class="d-close" href="javascript:/*artDialog*/;"></a></div></td></tr><tr><td class="d-main"><div class="d-content"></div></td></tr><tr><td class="d-footer"><div class="d-buttons"></div></td></tr></tbody></table></div></td><td class="d-e"></td></tr><tr><td class="d-sw"></td><td class="d-s"></td><td class="d-se"></td></tr></tbody></table></div>';
    e.defaults = {
        content: '<div class="d-loading"><span>数据加载中...</span></div>',
        title: "消息提示：",
        button: null,
        ok: null,
        cancel: null,
        initialize: null,
        beforeunload: null,
        okValue: "确定",
        cancelValue: "取消",
        width: "auto",
        height: "auto",
        padding: "20px 25px",
        skin: null,
        time: null,
        esc: !0,
        focus: false,
        visible: !0,
        follow: null,
        lock: true,
        fixed: true,
        zIndex: 1987
    };
    this.artDialog = g.dialog = g.artDialog = e
})(this.art || this.jQuery, this);
(function (c) {
    c.alert = c.dialog.alert = function (b, a) {
        return c.dialog({id: "Alert", fixed: !0, lock: !0, content: b, ok: !0, beforeunload: a})
    };
    c.confirm = c.dialog.confirm = function (b, a, m) {
        return c.dialog({id: "Confirm", fixed: !0, lock: !0, content: b, ok: a, cancel: m})
    };
    c.prompt = c.dialog.prompt = function (b, a, m) {
        var d;
        return c.dialog({
            id: "Prompt",
            fixed: !0,
            lock: !0,
            content: ['<div style="margin-bottom:5px;font-size:12px">', b, '</div><div><input type="text" class="d-input-text" value="', m || "", '"  /></div>'].join(""),
            initialize: function () {
                d = this.dom.content.find(".d-input-text")[0];
                d.select();
                d.focus()
            },
            ok: function () {
                return a && a.call(this, d.value)
            },
            cancel: function () {
            }
        })
    };
    c.dialog.prototype.shake = function () {
        var b = function (a, b, c) {
            var h = +new Date, e = setInterval(function () {
                var f = (+new Date - h) / c;
                1 <= f ? (clearInterval(e), b(f)) : a(f)
            }, 13)
        }, a = function (c, d, g, h) {
            var e = h;
            void 0 === e && (e = 6, g /= e);
            var f = parseInt(c.style.marginLeft) || 0;
            b(function (a) {
                    c.style.marginLeft = f + (d - f) * a + "px"
                }, function () {
                    0 !== e && a(c, 1 === e ? 0 : 1.5 * (d / e - d), g, --e)
                },
                g)
        };
        return function () {
            a(this.dom.wrap[0], 10, 300);
            return this
        }
    }();
    var o = function () {
        var b = this, a = function (a) {
            var c = b[a];
            b[a] = function () {
                return c.apply(b, arguments)
            }
        };
        a("start");
        a("over");
        a("end")
    };
    o.prototype = {
        start: function (b) {
            c(document).bind("mousemove", this.over).bind("mouseup", this.end);
            this._sClientX = b.clientX;
            this._sClientY = b.clientY;
            this.onstart(b.clientX, b.clientY);
            return !1
        }, over: function (b) {
            this._mClientX = b.clientX;
            this._mClientY = b.clientY;
            this.onover(b.clientX - this._sClientX, b.clientY - this._sClientY);
            return !1
        }, end: function (b) {
            c(document).unbind("mousemove", this.over).unbind("mouseup", this.end);
            this.onend(b.clientX, b.clientY);
            return !1
        }
    };
    var j = c(window), k = c(document), i = document.documentElement, p = !!("minWidth"in i.style) && "onlosecapture"in i, q = "setCapture"in i, r = function () {
        return !1
    }, n = function (b) {
        var a = new o, c = artDialog.focus, d = c.dom, g = d.wrap, h = d.title, e = g[0], f = h[0], i = d.main[0], l = e.style, s = i.style, t = b.target === d.se[0] ? !0 : !1, u = (d = "fixed" === e.style.position) ? 0 : k.scrollLeft(), v = d ? 0 : k.scrollTop(), n =
            j.width() - e.offsetWidth + u, A = j.height() - e.offsetHeight + v, w, x, y, z;
        a.onstart = function () {
            t ? (w = i.offsetWidth, x = i.offsetHeight) : (y = e.offsetLeft, z = e.offsetTop);
            k.bind("dblclick", a.end).bind("dragstart", r);
            p ? h.bind("losecapture", a.end) : j.bind("blur", a.end);
            q && f.setCapture();
            g.addClass("d-state-drag");
            c.focus()
        };
        a.onover = function (a, b) {
            if (t) {
                var c = a + w, d = b + x;
                l.width = "auto";
                s.width = Math.max(0, c) + "px";
                l.width = e.offsetWidth + "px";
                s.height = Math.max(0, d) + "px"
            } else c = Math.max(u, Math.min(n, a + y)), d = Math.max(v, Math.min(A,
                b + z)), l.left = c + "px", l.top = d + "px"
        };
        a.onend = function () {
            k.unbind("dblclick", a.end).unbind("dragstart", r);
            p ? h.unbind("losecapture", a.end) : j.unbind("blur", a.end);
            q && f.releaseCapture();
            g.removeClass("d-state-drag")
        };
        a.start(b)
    };
    c(document).bind("mousedown", function (b) {
        var a = artDialog.focus;
        if (a) {
            var c = b.target, d = a.config, a = a.dom;
            if (!1 !== d.drag && c === a.title[0] || !1 !== d.resize && c === a.se[0])return n(b), !1
        }
    })
})(this.art || this.jQuery);
_path = window['_artDialog_path'] || (function (script, i, me) {
    _thisScript = me || script[script.length - 1];
    me = _thisScript.src.replace(/\\/g, '/');
    return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
}(document.getElementsByTagName('script')));
_skin = _thisScript.src.split('skin=')[1];
if (_skin) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = _path + '/' + _skin + '.css';
    _thisScript.parentNode.insertBefore(link, _thisScript);
}
;
$.fn.extend({
    mousewheel: function (a) {
        return this.each(function () {
            var b = this;
            b.D = 0;
            if ($.browser.msie || $.browser.safari) {
                b.onmousewheel = function () {
                    b.D = event.wheelDelta;
                    event.returnValue = false;
                    a && a.call(b)
                }
            } else {
                b.addEventListener("DOMMouseScroll", function (c) {
                    b.D = c.detail > 0 ? -1 : 1;
                    c.preventDefault();
                    a && a.call(b)
                }, false)
            }
        })
    }
});
$.fn.extend({
    jscroll: function (a) {
        return this.each(function () {
            a = a || {};
            a.Bar = a.Bar || {};
            a.Btn = a.Btn || {};
            a.Bar.Bg = a.Bar.Bg || {};
            a.Bar.Bd = a.Bar.Bd || {};
            a.Btn.uBg = a.Btn.uBg || {};
            a.Btn.dBg = a.Btn.dBg || {};
            var d = {
                W: "5px",
                BgUrl: "",
                Bg: "#fff",
                Bar: {
                    Pos: "up",
                    Bd: {Out: "#b5b5b5", Hover: "#ccc"},
                    Bg: {Out: "#fff", Hover: "#fff", Focus: "orange"}
                },
                Btn: {
                    btn: true,
                    uBg: {Out: "#ccc", Hover: "#fff", Focus: "orange"},
                    dBg: {Out: "#ccc", Hover: "#fff", Focus: "orange"}
                },
                Fn: function () {
                }
            };
            a.W = a.W || d.W;
            a.BgUrl = a.BgUrl || d.BgUrl;
            a.Bg = a.Bg || d.Bg;
            a.Bar.Pos = a.Bar.Pos || d.Bar.Pos;
            a.Bar.Bd.Out = a.Bar.Bd.Out || d.Bar.Bd.Out;
            a.Bar.Bd.Hover = a.Bar.Bd.Hover || d.Bar.Bd.Hover;
            a.Bar.Bg.Out = a.Bar.Bg.Out || d.Bar.Bg.Out;
            a.Bar.Bg.Hover = a.Bar.Bg.Hover || d.Bar.Bg.Hover;
            a.Bar.Bg.Focus = a.Bar.Bg.Focus || d.Bar.Bg.Focus;
            a.Btn.btn = a.Btn.btn != undefined ? a.Btn.btn : d.Btn.btn;
            a.Btn.uBg.Out = a.Btn.uBg.Out || d.Btn.uBg.Out;
            a.Btn.uBg.Hover = a.Btn.uBg.Hover || d.Btn.uBg.Hover;
            a.Btn.uBg.Focus = a.Btn.uBg.Focus || d.Btn.uBg.Focus;
            a.Btn.dBg.Out = a.Btn.dBg.Out || d.Btn.dBg.Out;
            a.Btn.dBg.Hover = a.Btn.dBg.Hover || d.Btn.dBg.Hover;
            a.Btn.dBg.Focus = a.Btn.dBg.Focus || d.Btn.dBg.Focus;
            a.Fn = a.Fn || d.Fn;
            var e = this;
            var m, u = 0, w = 0;
            $(e).css({overflow: "hidden", position: "relative", padding: "0px"});
            var l = $(e).width(), s = $(e).height() - 1;
            var o = a.W ? parseInt(a.W) : 21;
            var t = l - o;
            var r = a.Btn.btn == true ? o : 0;
            if ($(e).children(".jscroll-c").height() == null) {
                $(e).wrapInner("<div class='jscroll-c' style='top:0px;z-index:9999;zoom:1;position:relative'></div>");
                $(e).children(".jscroll-c").prepend("<div style='height:0px;overflow:hidden'></div>");
                $(e).append("<div class='jscroll-e' unselectable='on' style=' height:100%;top:0px;right:0;-moz-user-select:none;position:absolute;overflow:hidden;z-index:10000;'><div class='jscroll-u' style='position:absolute;top:0px;width:100%;left:0;background:blue;overflow:hidden'></div><div class='jscroll-h'  unselectable='on' style='background:green;position:absolute;left:0;-moz-user-select:none;border:1px solid'></div><div class='jscroll-d' style='position:absolute;bottom:0px;width:100%;left:0;background:blue;overflow:hidden'></div></div>")
            }
            var j = $(e).children(".jscroll-c");
            var h = $(e).children(".jscroll-e");
            var g = h.children(".jscroll-h");
            var b = h.children(".jscroll-u");
            var i = h.children(".jscroll-d");
            if ($.browser.msie) {
                document.execCommand("BackgroundImageCache", false, true)
            }
            j.css({"padding-right": o});
            h.css({width: o, background: a.Bg, "background-image": a.BgUrl});
            g.css({
                top: r,
                background: a.Bar.Bg.Out,
                "background-image": a.BgUrl,
                "border-color": a.Bar.Bd.Out,
                width: o - 2
            });
            b.css({height: r, background: a.Btn.uBg.Out, "background-image": a.BgUrl});
            i.css({height: r, background: a.Btn.dBg.Out, "background-image": a.BgUrl});
            g.hover(function () {
                if (w == 0) {
                    $(this).css({
                        background: a.Bar.Bg.Hover,
                        "background-image": a.BgUrl,
                        "border-color": a.Bar.Bd.Hover
                    })
                }
            }, function () {
                if (w == 0) {
                    $(this).css({background: a.Bar.Bg.Out, "background-image": a.BgUrl, "border-color": a.Bar.Bd.Out})
                }
            });
            b.hover(function () {
                if (w == 0) {
                    $(this).css({background: a.Btn.uBg.Hover, "background-image": a.BgUrl})
                }
            }, function () {
                if (w == 0) {
                    $(this).css({background: a.Btn.uBg.Out, "background-image": a.BgUrl})
                }
            });
            i.hover(function () {
                if (w == 0) {
                    $(this).css({background: a.Btn.dBg.Hover, "background-image": a.BgUrl})
                }
            }, function () {
                if (w == 0) {
                    $(this).css({background: a.Btn.dBg.Out, "background-image": a.BgUrl})
                }
            });
            var c = j.height();
            var v = (s - 2 * r) * s / c;
            if (v < 10) {
                v = 10
            }
            var f = v / 6;
            var k = 0, q = false;
            g.height(v);
            if (c <= s) {
                j.css({padding: 0});
                h.css({display: "none"})
            } else {
                q = true
            }
            if (a.Bar.Pos != "up") {
                k = s - v - r;
                p()
            }
            g.bind("mousedown", function (z) {
                a.Fn && a.Fn.call(e);
                w = 1;
                g.css({background: a.Bar.Bg.Focus, "background-image": a.BgUrl});
                var y = z.pageY, x = parseInt($(this).css("top"));
                $(document).mousemove(function (A) {
                    k = x + A.pageY - y;
                    p()
                });
                $(document).mouseup(function () {
                    w = 0;
                    g.css({background: a.Bar.Bg.Out, "background-image": a.BgUrl, "border-color": a.Bar.Bd.Out});
                    $(document).unbind()
                });
                return false
            });
            b.bind("mousedown", function (x) {
                a.Fn && a.Fn.call(e);
                w = 1;
                b.css({background: a.Btn.uBg.Focus, "background-image": a.BgUrl});
                e.timeSetT("u");
                $(document).mouseup(function () {
                    w = 0;
                    b.css({background: a.Btn.uBg.Out, "background-image": a.BgUrl});
                    $(document).unbind();
                    clearTimeout(m);
                    u = 0
                });
                return false
            });
            i.bind("mousedown", function (x) {
                a.Fn && a.Fn.call(e);
                w = 1;
                i.css({background: a.Btn.dBg.Focus, "background-image": a.BgUrl});
                e.timeSetT("d");
                $(document).mouseup(function () {
                    w = 0;
                    i.css({background: a.Btn.dBg.Out, "background-image": a.BgUrl});
                    $(document).unbind();
                    clearTimeout(m);
                    u = 0
                });
                return false
            });
            e.timeSetT = function (z) {
                var x = this;
                if (z == "u") {
                    k -= f
                } else {
                    k += f
                }
                p();
                u += 2;
                var y = 500 - u * 50;
                if (y <= 0) {
                    y = 0
                }
                m = setTimeout(function () {
                    x.timeSetT(z)
                }, y)
            };
            h.bind("mousedown", function (x) {
                a.Fn && a.Fn.call(e);
                k = k + x.pageY - g.offset().top - v / 2;
                n();
                return false
            });
            function n() {
                if (k < r) {
                    k = r
                }
                if (k > s - v - r) {
                    k = s - v - r
                }
                g.stop().animate({top: k}, 100);
                var x = -((k - r) * c / (s - 2 * r));
                j.stop().animate({top: x}, 1000)
            }

            function p() {
                if (k < r) {
                    k = r
                }
                if (k > s - v - r) {
                    k = s - v - r
                }
                g.css({top: k});
                var x = -((k - r) * c / (s - 2 * r));
                j.css({top: x})
            }

            $(e).mousewheel(function () {
                if (q != true) {
                    return
                }
                a.Fn && a.Fn.call(e);
                if (this.D > 0) {
                    k -= f
                } else {
                    k += f
                }
                p()
            })
        })
    }
});

