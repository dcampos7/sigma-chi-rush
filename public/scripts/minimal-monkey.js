

var requirejs, require, define;
! function() {
    function J(a) {
        return "[object Function]" === M.call(a)
    }

    function E(a) {
        return "[object Array]" === M.call(a)
    }

    function Z(a, b, c) {
        for (var e in b)!(e in K || e in a && !c || !(a[e] = b[e]));
        return d
    }

    function N(a, b, c) {
        return a = Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a), c && (a.originalError = c), a
    }

    function $(a, b, c) {
        var d, e, f;
        for (d = 0; f = b[d]; d++) f = "string" == typeof f ? {
            name: f
        } : f, e = f.location, c && (!e || 0 !== e.indexOf("/") && -1 === e.indexOf(":")) && (e = c + "/" + (e || f.name)), a[f.name] = {
            name: f.name,
            location: e || f.name,
            main: (f.main || "main").replace(da, "").replace(aa, "")
        }
    }

    function V(a, b) {
        a.holdReady ? a.holdReady(b) : b ? a.readyWait += 1 : a.ready(!0)
    }

    function ea(a) {
        function b(a, b) {
            var c, d;
            if (a && "." === a.charAt(0) && b) {
                t.pkgs[b] ? b = [b] : (b = b.split("/"), b = b.slice(0, b.length - 1)), c = a = b.concat(a.split("/"));
                var e;
                for (d = 0; e = c[d]; d++)
                    if ("." === e) c.splice(d, 1), d -= 1;
                    else if (".." === e) {
                    if (1 === d && (".." === c[2] || ".." === c[0])) break;
                    d > 0 && (c.splice(d - 1, 2), d -= 2)
                }
                d = t.pkgs[c = a[0]], a = a.join("/"), d && a === c + "/" + d.main && (a = c)
            }
            return a
        }

        function c(a, c) {
            var d, e, f = a ? a.indexOf("!") : -1,
                g = null,
                h = c ? c.name : null,
                i = a;
            return -1 !== f && (g = a.substring(0, f), a = a.substring(f + 1, a.length)), g && (g = b(g, h)), a && (g ? d = (f = x[g]) && f.normalize ? f.normalize(a, function(a) {
                return b(a, h)
            }) : b(a, h) : (d = b(a, h), e = w[d], e || (e = r.nameToUrl(d, null, c), w[d] = e))), {
                prefix: g,
                name: d,
                parentMap: c,
                url: e,
                originalName: i,
                fullName: g ? g + "!" + (d || "") : d
            }
        }

        function e() {
            var a, b, c = !0,
                d = t.priorityWait;
            if (d) {
                for (b = 0; a = d[b]; b++)
                    if (!y[a]) {
                        c = !1;
                        break
                    }
                c && delete t.priorityWait
            }
            return c
        }

        function f(a, b, c) {
            return function() {
                var d, e = ga.call(arguments, 0);
                return c && J(d = e[e.length - 1]) && (d.__requireJsBuild = !0), e.push(b), a.apply(null, e)
            }
        }

        function g(a, b) {
            var c = f(r.require, a, b);
            return Z(c, {
                nameToUrl: f(r.nameToUrl, a),
                toUrl: f(r.toUrl, a),
                defined: f(r.requireDefined, a),
                specified: f(r.requireSpecified, a),
                isBrowser: d.isBrowser
            }), c
        }

        function h(a) {
            var b, e, f;
            f = a.callback;
            var g = a.map,
                h = g.fullName,
                i = a.deps,
                j = a.listeners;
            if (f && J(f)) {
                if (t.catchError.define) try {
                    e = d.execCb(h, a.callback, i, x[h])
                } catch (k) {
                    b = k
                } else e = d.execCb(h, a.callback, i, x[h]);
                h && (a.cjsModule && void 0 !== a.cjsModule.exports ? e = x[h] = a.cjsModule.exports : void 0 === e && a.usingExports ? e = x[h] : (x[h] = e, F[h] && (I[h] = !0)))
            } else h && (e = x[h] = f, F[h] && (I[h] = !0)); if (z[a.id] && (delete z[a.id], a.isDone = !0, r.waitCount -= 1, 0 === r.waitCount && (A = [])), delete D[h], d.onResourceLoad && !a.placeholder && d.onResourceLoad(r, g, a.depArray), b) return e = (h ? c(h).url : "") || b.fileName || b.sourceURL, f = b.moduleTree, b = N("defineerror", 'Error evaluating module "' + h + '" at location "' + e + '":\n' + b + "\nfileName:" + e + "\nlineNumber: " + (b.lineNumber || b.line), b), b.moduleName = h, b.moduleTree = f, d.onError(b);
            for (b = 0; f = j[b]; b++) f(e)
        }

        function i(a, b) {
            return function(c) {
                a.depDone[b] || (a.depDone[b] = !0, a.deps[b] = c, a.depCount -= 1, a.depCount || h(a))
            }
        }

        function j(a, b) {
            var c, e = b.map,
                f = e.fullName,
                i = e.name,
                j = E[a] || (E[a] = x[a]);
            b.loading || (b.loading = !0, c = function(a) {
                b.callback = function() {
                    return a
                }, h(b), y[b.id] = !0
            }, c.fromText = function(a, b) {
                var c = O;
                y[a] = !1, r.scriptCount += 1, r.fake[a] = !0, c && (O = !1), d.exec(b), c && (O = !0), r.completeLoad(a)
            }, f in x ? c(x[f]) : j.load(i, g(e.parentMap, !0), c, t))
        }

        function k(a) {
            z[a.id] || (z[a.id] = a, A.push(a), r.waitCount += 1)
        }

        function l(a) {
            this.listeners.push(a)
        }

        function m(a, b) {
            var d, e, f = a.fullName,
                g = a.prefix,
                i = g ? E[g] || (E[g] = x[g]) : null;
            return f && (d = D[f]), !d && (e = !0, d = {
                id: (g && !i ? C+++"__p@:" : "") + (f || "__r@" + C++),
                map: a,
                depCount: 0,
                depDone: [],
                depCallbacks: [],
                deps: [],
                listeners: [],
                add: l
            }, v[d.id] = !0, f && (!g || E[g])) && (D[f] = d), g && !i ? (f = m(c(g), !0), f.add(function() {
                var b = c(a.originalName, a.parentMap),
                    b = m(b, !0);
                d.placeholder = !0, b.add(function(a) {
                    d.callback = function() {
                        return a
                    }, h(d)
                })
            })) : e && b && (y[d.id] = !1, r.paused.push(d), k(d)), d
        }

        function n(a, b, d, e) {
            var f, a = c(a, e),
                j = a.name,
                l = a.fullName,
                n = m(a),
                o = n.id,
                p = n.deps;
            if (l) {
                if (l in x || y[o] === !0 || "jquery" === l && t.jQuery && t.jQuery !== d().fn.jquery) return;
                v[o] = !0, y[o] = !0, "jquery" === l && d && S(d())
            }
            for (n.depArray = b, n.callback = d, d = 0; d < b.length; d++)(o = b[d]) && (o = c(o, j ? a : e), f = o.fullName, b[d] = f, "require" === f ? p[d] = g(a) : "exports" === f ? (p[d] = x[l] = {}, n.usingExports = !0) : "module" === f ? n.cjsModule = p[d] = {
                id: j,
                uri: j ? r.nameToUrl(j, null, e) : void 0,
                exports: x[l]
            } : !(f in x) || f in z || l in F && !(l in F && I[f]) ? (l in F && (F[f] = !0, delete x[f], B[o.url] = !1), n.depCount += 1, n.depCallbacks[d] = i(n, d), m(o, !0).add(n.depCallbacks[d])) : p[d] = x[f]);
            n.depCount ? k(n) : h(n)
        }

        function o(a) {
            n.apply(null, a)
        }

        function p(a, b) {
            if (!a.isDone) {
                var d, e, f, g, h = a.map.fullName,
                    i = a.depArray;
                if (h) {
                    if (b[h]) return x[h];
                    b[h] = !0
                }
                if (i)
                    for (d = 0; d < i.length; d++)(e = i[d]) && ((f = c(e).prefix) && (g = z[f]) && p(g, b), (f = z[e]) && !f.isDone && y[e] && (e = p(f, b), a.depCallbacks[d](e)));
                return h ? x[h] : void 0
            }
        }

        function q() {
            var a, b = 1e3 * t.waitSeconds,
                c = b && r.startTime + b < (new Date).getTime(),
                b = "",
                f = !1,
                g = !1;
            if (!(r.pausedCount > 0)) {
                if (t.priorityWait) {
                    if (!e()) return;
                    s()
                }
                for (a in y)
                    if (!(a in K || (f = !0, y[a]))) {
                        if (!c) {
                            g = !0;
                            break
                        }
                        b += a + " "
                    }
                if (f || r.waitCount) {
                    if (c && b) return a = N("timeout", "Load timeout for modules: " + b), a.requireType = "timeout", a.requireModules = b, d.onError(a);
                    if (g || r.scriptCount)(G || ba) && !W && (W = setTimeout(function() {
                        W = 0, q()
                    }, 50));
                    else {
                        if (r.waitCount) {
                            for (H = 0; b = A[H]; H++) p(b, {});
                            r.paused.length && s(), 5 > X && (X += 1, q())
                        }
                        X = 0, d.checkReadyState()
                    }
                }
            }
        }
        var r, s, t = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                catchError: {}
            },
            u = [],
            v = {
                require: !0,
                exports: !0,
                module: !0
            },
            w = {},
            x = {},
            y = {},
            z = {},
            A = [],
            B = {},
            C = 0,
            D = {},
            E = {},
            F = {},
            I = {},
            L = 0;
        return S = function(a) {
            !r.jQuery && (a = a || ("undefined" != typeof jQuery ? jQuery : null)) && (!t.jQuery || a.fn.jquery === t.jQuery) && ("holdReady" in a || "readyWait" in a) && (r.jQuery = a, o(["jquery", [],
                function() {
                    return jQuery
                }
            ]), r.scriptCount) && (V(a, !0), r.jQueryIncremented = !0)
        }, s = function() {
            var a, b, c, f, g, h;
            for (L += 1, r.scriptCount <= 0 && (r.scriptCount = 0); u.length;) {
                if (a = u.shift(), null === a[0]) return d.onError(N("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                o(a)
            }
            if (!t.priorityWait || e())
                for (; r.paused.length;) {
                    for (g = r.paused, r.pausedCount += g.length, r.paused = [], f = 0; a = g[f]; f++) b = a.map, c = b.url, h = b.fullName, b.prefix ? j(b.prefix, a) : !B[c] && !y[h] && (d.load(r, h, c), B[c] = !0);
                    r.startTime = (new Date).getTime(), r.pausedCount -= g.length
                }
            1 === L && q(), L -= 1
        }, r = {
            contextName: a,
            config: t,
            defQueue: u,
            waiting: z,
            waitCount: 0,
            specified: v,
            loaded: y,
            urlMap: w,
            urlFetched: B,
            scriptCount: 0,
            defined: x,
            paused: [],
            pausedCount: 0,
            plugins: E,
            needFullExec: F,
            fake: {},
            fullExec: I,
            managerCallbacks: D,
            makeModuleMap: c,
            normalize: b,
            configure: function(a) {
                var b, c, d;
                if (a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/"), b = t.paths, d = t.pkgs, Z(t, a, !0), a.paths) {
                    for (c in a.paths) c in K || (b[c] = a.paths[c]);
                    t.paths = b
                }
                if ((b = a.packagePaths) || a.packages) {
                    if (b)
                        for (c in b) c in K || $(d, b[c], c);
                    a.packages && $(d, a.packages), t.pkgs = d
                }
                a.priority && (c = r.requireWait, r.requireWait = !1, r.takeGlobalQueue(), s(), r.require(a.priority), s(), r.requireWait = c, t.priorityWait = a.priority), (a.deps || a.callback) && r.require(a.deps || [], a.callback)
            },
            requireDefined: function(a, b) {
                return c(a, b).fullName in x
            },
            requireSpecified: function(a, b) {
                return c(a, b).fullName in v
            },
            require: function(b, e, f) {
                if ("string" == typeof b) return J(e) ? d.onError(N("requireargs", "Invalid require call")) : d.get ? d.get(r, b, e) : (e = c(b, e), b = e.fullName, b in x ? x[b] : d.onError(N("notloaded", "Module name '" + e.fullName + "' has not been loaded yet for context: " + a)));
                if ((b && b.length || e) && n(null, b, e, f), !r.requireWait)
                    for (; !r.scriptCount && r.paused.length;) r.takeGlobalQueue(), s();
                return r.require
            },
            takeGlobalQueue: function() {
                U.length && (ha.apply(r.defQueue, [r.defQueue.length - 1, 0].concat(U)), U = [])
            },
            completeLoad: function(a) {
                var b;
                for (r.takeGlobalQueue(); u.length;) {
                    if (b = u.shift(), null === b[0]) {
                        b[0] = a;
                        break
                    }
                    if (b[0] === a) break;
                    o(b), b = null
                }
                b ? o(b) : o([a, [], "jquery" === a && "undefined" != typeof jQuery ? function() {
                    return jQuery
                } : null]), S(), d.isAsync && (r.scriptCount -= 1), s(), d.isAsync || (r.scriptCount -= 1)
            },
            toUrl: function(a, b) {
                var c = a.lastIndexOf("."),
                    d = null;
                return -1 !== c && (d = a.substring(c, a.length), a = a.substring(0, c)), r.nameToUrl(a, d, b)
            },
            nameToUrl: function(a, c, e) {
                var f, g, h, i, j = r.config,
                    a = b(a, e && e.fullName);
                if (d.jsExtRegExp.test(a)) c = a + (c ? c : "");
                else {
                    for (f = j.paths, g = j.pkgs, e = a.split("/"), i = e.length; i > 0; i--) {
                        if (h = e.slice(0, i).join("/"), f[h]) {
                            e.splice(0, i, f[h]);
                            break
                        }
                        if (h = g[h]) {
                            a = a === h.name ? h.location + "/" + h.main : h.location, e.splice(0, i, a);
                            break
                        }
                    }
                    c = e.join("/") + (c || ".js"), c = ("/" === c.charAt(0) || c.match(/^\w+:/) ? "" : j.baseUrl) + c
                }
                return j.urlArgs ? c + ((-1 === c.indexOf("?") ? "?" : "&") + j.urlArgs) : c
            }
        }, r.jQueryCheck = S, r.resume = s, r
    }

    function ia() {
        var a, b, c;
        if (m && "interactive" === m.readyState) return m;
        for (a = document.getElementsByTagName("script"), b = a.length - 1; b > -1 && (c = a[b]); b--)
            if ("interactive" === c.readyState) return m = c;
        return null
    }
    var ja = /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/gm,
        ka = /require\(\s*["']([^'"\s]+)["']\s*\)/g,
        da = /^\.\//,
        aa = /\.js$/,
        M = Object.prototype.toString,
        r = Array.prototype,
        ga = r.slice,
        ha = r.splice,
        G = "undefined" != typeof window && !!navigator && !!document,
        ba = !G && "undefined" != typeof importScripts,
        la = G && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        ca = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        K = {},
        u = {},
        U = [],
        m = null,
        X = 0,
        O = !1,
        d, r = {},
        I, w, x, y, v, z, A, H, B, S, W;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (J(requirejs)) return;
            r = requirejs, requirejs = void 0
        }
        if ("undefined" != typeof require && !J(require) && (r = require, require = void 0), d = requirejs = function(a, b, c) {
            var d, e = "_";
            return !E(a) && "string" != typeof a && (d = a, E(b) ? (a = b, b = c) : a = []), d && d.context && (e = d.context), c = u[e] || (u[e] = ea(e)), d && c.configure(d), c.require(a, b)
        }, d.config = function(a) {
            return d(a)
        }, require || (require = d), d.toUrl = function(a) {
            return u._.toUrl(a)
        }, d.version = "0.27.0", d.jsExtRegExp = /^\/|:|\?|\.js$/, w = d.s = {
            contexts: u,
            skipAsync: {}
        }, (d.isAsync = d.isBrowser = G) && (x = w.head = document.getElementsByTagName("head")[0], (y = document.getElementsByTagName("base")[0]) && (x = w.head = y.parentNode)), d.onError = function(a) {
            throw a
        }, d.load = function(a, b, c) {
            d.resourcesReady(!1), a.scriptCount += 1, d.attach(c, a, b), a.jQuery && !a.jQueryIncremented && (V(a.jQuery, !0), a.jQueryIncremented = !0)
        }, define = function(a, b, c) {
            var d, e;
            "string" != typeof a && (c = b, b = a, a = null), E(b) || (c = b, b = []), !a && !b.length && J(c) && c.length && (c.toString().replace(ja, "").replace(ka, function(a, c) {
                b.push(c)
            }), b = (1 === c.length ? ["require"] : ["require", "exports", "module"]).concat(b)), O && (d = I || ia()) && (a || (a = d.getAttribute("data-requiremodule")), e = u[d.getAttribute("data-requirecontext")]), (e ? e.defQueue : U).push([a, b, c])
        }, define.amd = {
            multiversion: !0,
            plugins: !0,
            jQuery: !0
        }, d.exec = function(a) {
            return eval(a)
        }, d.execCb = function(a, b, c, d) {
            return b.apply(d, c)
        }, d.addScriptToDom = function(a) {
            I = a, y ? x.insertBefore(a, y) : x.appendChild(a), I = null
        }, d.onScriptLoad = function(a) {
            var b, c = a.currentTarget || a.srcElement;
            ("load" === a.type || c && la.test(c.readyState)) && (m = null, a = c.getAttribute("data-requirecontext"), b = c.getAttribute("data-requiremodule"), u[a].completeLoad(b), c.detachEvent && !ca ? c.detachEvent("onreadystatechange", d.onScriptLoad) : c.removeEventListener("load", d.onScriptLoad, !1))
        }, d.attach = function(a, b, c, e, f, g) {
            var h;
            return G ? (e = e || d.onScriptLoad, h = b && b.config && b.config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), h.type = f || "text/javascript", h.charset = "utf-8", h.async = !w.skipAsync[a], b && h.setAttribute("data-requirecontext", b.contextName), h.setAttribute("data-requiremodule", c), h.attachEvent && !ca ? (O = !0, g ? h.onreadystatechange = function() {
                "loaded" === h.readyState && (h.onreadystatechange = null, h.attachEvent("onreadystatechange", e), g(h))
            } : h.attachEvent("onreadystatechange", e)) : h.addEventListener("load", e, !1), h.src = a, g || d.addScriptToDom(h), h) : (ba && (importScripts(a), b.completeLoad(c)), null)
        }, G)
            for (v = document.getElementsByTagName("script"), H = v.length - 1; H > -1 && (z = v[H]); H--)
                if (x || (x = z.parentNode), A = z.getAttribute("data-main")) {
                    r.baseUrl || (v = A.split("/"), z = v.pop(), v = v.length ? v.join("/") + "/" : "./", r.baseUrl = v, A = z.replace(aa, "")), r.deps = r.deps ? r.deps.concat(A) : [A];
                    break
                }
        d.checkReadyState = function() {
            var a, b = w.contexts;
            for (a in b)
                if (!(a in K) && b[a].waitCount) return;
            d.resourcesReady(!0)
        }, d.resourcesReady = function(a) {
            var b, c;
            if (d.resourcesDone = a, d.resourcesDone)
                for (c in a = w.contexts)!(c in K) && (b = a[c], b.jQueryIncremented) && (V(b.jQuery, !1), b.jQueryIncremented = !1)
        }, d.pageLoaded = function() {
            "complete" !== document.readyState && (document.readyState = "complete")
        }, G && document.addEventListener && !document.readyState && (document.readyState = "loading", window.addEventListener("load", d.pageLoaded, !1)), d(r), d.isAsync && "undefined" != typeof setTimeout && (B = w.contexts[r.context || "_"], B.requireWait = !0, setTimeout(function() {
            B.requireWait = !1, B.takeGlobalQueue(), B.jQueryCheck(), B.scriptCount || B.resume(), d.checkReadyState()
        }, 0))
    }
}(), define("requireLib", function() {}), ! function(a, b) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
            if (!a.document) throw new Error("jQuery requires a window with a document");
            return b(a)
        } : b(a)
    }("undefined" != typeof window ? window : this, function(a, b) {
        function c(a) {
            var b = a.length,
                c = ab.type(a);
            return "function" === c || ab.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
        }

        function d(a, b, c) {
            if (ab.isFunction(b)) return ab.grep(a, function(a, d) {
                return !!b.call(a, d, a) !== c
            });
            if (b.nodeType) return ab.grep(a, function(a) {
                return a === b !== c
            });
            if ("string" == typeof b) {
                if (hb.test(b)) return ab.filter(b, a, c);
                b = ab.filter(b, a)
            }
            return ab.grep(a, function(a) {
                return U.call(b, a) >= 0 !== c
            })
        }

        function e(a, b) {
            for (;
                (a = a[b]) && 1 !== a.nodeType;);
            return a
        }

        function f(a) {
            var b = ob[a] = {};
            return ab.each(a.match(nb) || [], function(a, c) {
                b[c] = !0
            }), b
        }

        function g() {
            $.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), ab.ready()
        }

        function h() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = ab.expando + Math.random()
        }

        function i(a, b, c) {
            var d;
            if (void 0 === c && 1 === a.nodeType)
                if (d = "data-" + b.replace(ub, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                    try {
                        c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : tb.test(c) ? ab.parseJSON(c) : c
                    } catch (e) {}
                    sb.set(a, b, c)
                } else c = void 0;
            return c
        }

        function j() {
            return !0
        }

        function k() {
            return !1
        }

        function l() {
            try {
                return $.activeElement
            } catch (a) {}
        }

        function m(a, b) {
            return ab.nodeName(a, "table") && ab.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
        }

        function n(a) {
            return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
        }

        function o(a) {
            var b = Kb.exec(a.type);
            return b ? a.type = b[1] : a.removeAttribute("type"), a
        }

        function p(a, b) {
            for (var c = 0, d = a.length; d > c; c++) rb.set(a[c], "globalEval", !b || rb.get(b[c], "globalEval"))
        }

        function q(a, b) {
            var c, d, e, f, g, h, i, j;
            if (1 === b.nodeType) {
                if (rb.hasData(a) && (f = rb.access(a), g = rb.set(b, f), j = f.events)) {
                    delete g.handle, g.events = {};
                    for (e in j)
                        for (c = 0, d = j[e].length; d > c; c++) ab.event.add(b, e, j[e][c])
                }
                sb.hasData(a) && (h = sb.access(a), i = ab.extend({}, h), sb.set(b, i))
            }
        }

        function r(a, b) {
            var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
            return void 0 === b || b && ab.nodeName(a, b) ? ab.merge([a], c) : c
        }

        function s(a, b) {
            var c = b.nodeName.toLowerCase();
            "input" === c && yb.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }

        function t(b, c) {
            var d = ab(c.createElement(b)).appendTo(c.body),
                e = a.getDefaultComputedStyle ? a.getDefaultComputedStyle(d[0]).display : ab.css(d[0], "display");
            return d.detach(), e
        }

        function u(a) {
            var b = $,
                c = Ob[a];
            return c || (c = t(a, b), "none" !== c && c || (Nb = (Nb || ab("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Nb[0].contentDocument, b.write(), b.close(), c = t(a, b), Nb.detach()), Ob[a] = c), c
        }

        function v(a, b, c) {
            var d, e, f, g, h = a.style;
            return c = c || Rb(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || ab.contains(a.ownerDocument, a) || (g = ab.style(a, b)), Qb.test(g) && Pb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
        }

        function w(a, b) {
            return {
                get: function() {
                    return a() ? void delete this.get : (this.get = b).apply(this, arguments)
                }
            }
        }

        function x(a, b) {
            if (b in a) return b;
            for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xb.length; e--;)
                if (b = Xb[e] + c, b in a) return b;
            return d
        }

        function y(a, b, c) {
            var d = Tb.exec(b);
            return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
        }

        function z(a, b, c, d, e) {
            for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ab.css(a, c + wb[f], !0, e)), d ? ("content" === c && (g -= ab.css(a, "padding" + wb[f], !0, e)), "margin" !== c && (g -= ab.css(a, "border" + wb[f] + "Width", !0, e))) : (g += ab.css(a, "padding" + wb[f], !0, e), "padding" !== c && (g += ab.css(a, "border" + wb[f] + "Width", !0, e)));
            return g
        }

        function A(a, b, c) {
            var d = !0,
                e = "width" === b ? a.offsetWidth : a.offsetHeight,
                f = Rb(a),
                g = "border-box" === ab.css(a, "boxSizing", !1, f);
            if (0 >= e || null == e) {
                if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Qb.test(e)) return e;
                d = g && (Z.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
            }
            return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
        }

        function B(a, b) {
            for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = rb.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xb(d) && (f[g] = rb.access(d, "olddisplay", u(d.nodeName)))) : f[g] || (e = xb(d), (c && "none" !== c || !e) && rb.set(d, "olddisplay", e ? c : ab.css(d, "display"))));
            for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
            return a
        }

        function C(a, b, c, d, e) {
            return new C.prototype.init(a, b, c, d, e)
        }

        function D() {
            return setTimeout(function() {
                Yb = void 0
            }), Yb = ab.now()
        }

        function E(a, b) {
            var c, d = 0,
                e = {
                    height: a
                };
            for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = wb[d], e["margin" + c] = e["padding" + c] = a;
            return b && (e.opacity = e.width = a), e
        }

        function F(a, b, c) {
            for (var d, e = (cc[b] || []).concat(cc["*"]), f = 0, g = e.length; g > f; f++)
                if (d = e[f].call(c, b, a)) return d
        }

        function G(a, b, c) {
            var d, e, f, g, h, i, j, k = this,
                l = {},
                m = a.style,
                n = a.nodeType && xb(a),
                o = rb.get(a, "fxshow");
            c.queue || (h = ab._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
                h.unqueued || i()
            }), h.unqueued++, k.always(function() {
                k.always(function() {
                    h.unqueued--, ab.queue(a, "fx").length || h.empty.fire()
                })
            })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], j = ab.css(a, "display"), "none" === j && (j = u(a.nodeName)), "inline" === j && "none" === ab.css(a, "float") && (m.display = "inline-block")), c.overflow && (m.overflow = "hidden", k.always(function() {
                m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
            }));
            for (d in b)
                if (e = b[d], $b.exec(e)) {
                    if (delete b[d], f = f || "toggle" === e, e === (n ? "hide" : "show")) {
                        if ("show" !== e || !o || void 0 === o[d]) continue;
                        n = !0
                    }
                    l[d] = o && o[d] || ab.style(a, d)
                }
            if (!ab.isEmptyObject(l)) {
                o ? "hidden" in o && (n = o.hidden) : o = rb.access(a, "fxshow", {}), f && (o.hidden = !n), n ? ab(a).show() : k.done(function() {
                    ab(a).hide()
                }), k.done(function() {
                    var b;
                    rb.remove(a, "fxshow");
                    for (b in l) ab.style(a, b, l[b])
                });
                for (d in l) g = F(n ? o[d] : 0, d, k), d in o || (o[d] = g.start, n && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
            }
        }

        function H(a, b) {
            var c, d, e, f, g;
            for (c in a)
                if (d = ab.camelCase(c), e = b[d], f = a[c], ab.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ab.cssHooks[d], g && "expand" in g) {
                    f = g.expand(f), delete a[d];
                    for (c in f) c in a || (a[c] = f[c], b[c] = e)
                } else b[d] = e
        }

        function I(a, b, c) {
            var d, e, f = 0,
                g = bc.length,
                h = ab.Deferred().always(function() {
                    delete i.elem
                }),
                i = function() {
                    if (e) return !1;
                    for (var b = Yb || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                    return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                },
                j = h.promise({
                    elem: a,
                    props: ab.extend({}, b),
                    opts: ab.extend(!0, {
                        specialEasing: {}
                    }, c),
                    originalProperties: b,
                    originalOptions: c,
                    startTime: Yb || D(),
                    duration: c.duration,
                    tweens: [],
                    createTween: function(b, c) {
                        var d = ab.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                        return j.tweens.push(d), d
                    },
                    stop: function(b) {
                        var c = 0,
                            d = b ? j.tweens.length : 0;
                        if (e) return this;
                        for (e = !0; d > c; c++) j.tweens[c].run(1);
                        return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                    }
                }),
                k = j.props;
            for (H(k, j.opts.specialEasing); g > f; f++)
                if (d = bc[f].call(j, a, k, j.opts)) return d;
            return ab.map(k, F, j), ab.isFunction(j.opts.start) && j.opts.start.call(a, j), ab.fx.timer(ab.extend(i, {
                elem: a,
                anim: j,
                queue: j.opts.queue
            })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        }

        function J(a) {
            return function(b, c) {
                "string" != typeof b && (c = b, b = "*");
                var d, e = 0,
                    f = b.toLowerCase().match(nb) || [];
                if (ab.isFunction(c))
                    for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
            }
        }

        function K(a, b, c, d) {
            function e(h) {
                var i;
                return f[h] = !0, ab.each(a[h] || [], function(a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
                }), i
            }
            var f = {},
                g = a === vc;
            return e(b.dataTypes[0]) || !f["*"] && e("*")
        }

        function L(a, b) {
            var c, d, e = ab.ajaxSettings.flatOptions || {};
            for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
            return d && ab.extend(!0, a, d), a
        }

        function M(a, b, c) {
            for (var d, e, f, g, h = a.contents, i = a.dataTypes;
                "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
            if (d)
                for (e in h)
                    if (h[e] && h[e].test(d)) {
                        i.unshift(e);
                        break
                    }
            if (i[0] in c) f = i[0];
            else {
                for (e in c) {
                    if (!i[0] || a.converters[e + " " + i[0]]) {
                        f = e;
                        break
                    }
                    g || (g = e)
                }
                f = f || g
            }
            return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
        }

        function N(a, b, c, d) {
            var e, f, g, h, i, j = {},
                k = a.dataTypes.slice();
            if (k[1])
                for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
            for (f = k.shift(); f;)
                if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                    if ("*" === f) f = i;
                    else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g)
                    for (e in j)
                        if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                            break
                        }
                if (g !== !0)
                    if (g && a["throws"]) b = g(b);
                    else try {
                        b = g(b)
                    } catch (l) {
                        return {
                            state: "parsererror",
                            error: g ? l : "No conversion from " + i + " to " + f
                        }
                    }
            }
            return {
                state: "success",
                data: b
            }
        }

        function O(a, b, c, d) {
            var e;
            if (ab.isArray(b)) ab.each(b, function(b, e) {
                c || zc.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            });
            else if (c || "object" !== ab.type(b)) d(a, b);
            else
                for (e in b) O(a + "[" + e + "]", b[e], c, d)
        }

        function P(a) {
            return ab.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
        }
        var Q = [],
            R = Q.slice,
            S = Q.concat,
            T = Q.push,
            U = Q.indexOf,
            V = {},
            W = V.toString,
            X = V.hasOwnProperty,
            Y = "".trim,
            Z = {},
            $ = a.document,
            _ = "2.1.0",
            ab = function(a, b) {
                return new ab.fn.init(a, b)
            },
            bb = /^-ms-/,
            cb = /-([\da-z])/gi,
            db = function(a, b) {
                return b.toUpperCase()
            };
        ab.fn = ab.prototype = {
            jquery: _,
            constructor: ab,
            selector: "",
            length: 0,
            toArray: function() {
                return R.call(this)
            },
            get: function(a) {
                return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
            },
            pushStack: function(a) {
                var b = ab.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            },
            each: function(a, b) {
                return ab.each(this, a, b)
            },
            map: function(a) {
                return this.pushStack(ab.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            slice: function() {
                return this.pushStack(R.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(a) {
                var b = this.length,
                    c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: T,
            sort: Q.sort,
            splice: Q.splice
        }, ab.extend = ab.fn.extend = function() {
            var a, b, c, d, e, f, g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ab.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
                if (null != (a = arguments[h]))
                    for (b in a) c = g[b], d = a[b], g !== d && (j && d && (ab.isPlainObject(d) || (e = ab.isArray(d))) ? (e ? (e = !1, f = c && ab.isArray(c) ? c : []) : f = c && ab.isPlainObject(c) ? c : {}, g[b] = ab.extend(j, f, d)) : void 0 !== d && (g[b] = d));
            return g
        }, ab.extend({
            expando: "jQuery" + (_ + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(a) {
                throw new Error(a)
            },
            noop: function() {},
            isFunction: function(a) {
                return "function" === ab.type(a)
            },
            isArray: Array.isArray,
            isWindow: function(a) {
                return null != a && a === a.window
            },
            isNumeric: function(a) {
                return a - parseFloat(a) >= 0
            },
            isPlainObject: function(a) {
                if ("object" !== ab.type(a) || a.nodeType || ab.isWindow(a)) return !1;
                try {
                    if (a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (b) {
                    return !1
                }
                return !0
            },
            isEmptyObject: function(a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            type: function(a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
            },
            globalEval: function(a) {
                var b, c = eval;
                a = ab.trim(a), a && (1 === a.indexOf("use strict") ? (b = $.createElement("script"), b.text = a, $.head.appendChild(b).parentNode.removeChild(b)) : c(a))
            },
            camelCase: function(a) {
                return a.replace(bb, "ms-").replace(cb, db)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            },
            each: function(a, b, d) {
                var e, f = 0,
                    g = a.length,
                    h = c(a);
                if (d) {
                    if (h)
                        for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                    else
                        for (f in a)
                            if (e = b.apply(a[f], d), e === !1) break
                } else if (h)
                    for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.call(a[f], f, a[f]), e === !1) break; return a
            },
            trim: function(a) {
                return null == a ? "" : Y.call(a)
            },
            makeArray: function(a, b) {
                var d = b || [];
                return null != a && (c(Object(a)) ? ab.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
            },
            inArray: function(a, b, c) {
                return null == b ? -1 : U.call(b, a, c)
            },
            merge: function(a, b) {
                for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
                return a.length = e, a
            },
            grep: function(a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
                return e
            },
            map: function(a, b, d) {
                var e, f = 0,
                    g = a.length,
                    h = c(a),
                    i = [];
                if (h)
                    for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
                else
                    for (f in a) e = b(a[f], f, d), null != e && i.push(e);
                return S.apply([], i)
            },
            guid: 1,
            proxy: function(a, b) {
                var c, d, e;
                return "string" == typeof b && (c = a[b], b = a, a = c), ab.isFunction(a) ? (d = R.call(arguments, 2), e = function() {
                    return a.apply(b || this, d.concat(R.call(arguments)))
                }, e.guid = a.guid = a.guid || ab.guid++, e) : void 0
            },
            now: Date.now,
            support: Z
        }), ab.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
            V["[object " + b + "]"] = b.toLowerCase()
        });
        var eb = function(a) {
            function b(a, b, c, d) {
                var e, f, g, h, i, j, l, o, p, q;
                if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
                if (1 !== (h = b.nodeType) && 9 !== h) return [];
                if (I && !d) {
                    if (e = sb.exec(a))
                        if (g = e[1]) {
                            if (9 === h) {
                                if (f = b.getElementById(g), !f || !f.parentNode) return c;
                                if (f.id === g) return c.push(f), c
                            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                        } else {
                            if (e[2]) return _.apply(c, b.getElementsByTagName(a)), c;
                            if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return _.apply(c, b.getElementsByClassName(g)), c
                        }
                    if (x.qsa && (!J || !J.test(a))) {
                        if (o = l = N, p = b, q = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                            for (j = m(a), (l = b.getAttribute("id")) ? o = l.replace(ub, "\\$&") : b.setAttribute("id", o), o = "[id='" + o + "'] ", i = j.length; i--;) j[i] = o + n(j[i]);
                            p = tb.test(a) && k(b.parentNode) || b, q = j.join(",")
                        }
                        if (q) try {
                            return _.apply(c, p.querySelectorAll(q)), c
                        } catch (r) {} finally {
                            l || b.removeAttribute("id")
                        }
                    }
                }
                return v(a.replace(ib, "$1"), b, c, d)
            }

            function c() {
                function a(c, d) {
                    return b.push(c + " ") > y.cacheLength && delete a[b.shift()], a[c + " "] = d
                }
                var b = [];
                return a
            }

            function d(a) {
                return a[N] = !0, a
            }

            function e(a) {
                var b = G.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function f(a, b) {
                for (var c = a.split("|"), d = a.length; d--;) y.attrHandle[c[d]] = b
            }

            function g(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || W) - (~a.sourceIndex || W);
                if (d) return d;
                if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1;
                return a ? 1 : -1
            }

            function h(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function i(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function j(a) {
                return d(function(b) {
                    return b = +b, d(function(c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function k(a) {
                return a && typeof a.getElementsByTagName !== V && a
            }

            function l() {}

            function m(a, c) {
                var d, e, f, g, h, i, j, k = S[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = y.preFilter; h;) {
                    (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(ib, " ")
                    }), h = h.slice(d.length));
                    for (g in y.filter)!(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d) break
                }
                return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
            }

            function n(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                return d
            }

            function o(a, b, c) {
                var d = b.dir,
                    e = c && "parentNode" === d,
                    f = Q++;
                return b.first ? function(b, c, f) {
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) return a(b, c, f)
                } : function(b, c, g) {
                    var h, i, j = [P, f];
                    if (g) {
                        for (; b = b[d];)
                            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || e) {
                                if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                                if (i[d] = j, j[2] = a(b, c, g)) return !0
                            }
                }
            }

            function p(a) {
                return a.length > 1 ? function(b, c, d) {
                    for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function q(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                return g
            }

            function r(a, b, c, e, f, g) {
                return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        o = g.length,
                        p = d || u(b || "*", h.nodeType ? [h] : h, []),
                        r = !a || !d && b ? p : q(p, m, a, h, i),
                        s = c ? f || (d ? a : o || e) ? [] : g : r;
                    if (c && c(r, s, h, i), e)
                        for (j = q(s, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = s.length; k--;)(l = s[k]) && j.push(r[k] = l);
                                f(null, s = [], j, i)
                            }
                            for (k = s.length; k--;)(l = s[k]) && (j = f ? bb.call(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                        }
                    } else s = q(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : _.apply(g, s)
                })
            }

            function s(a) {
                for (var b, c, d, e = a.length, f = y.relative[a[0].type], g = f || y.relative[" "], h = f ? 1 : 0, i = o(function(a) {
                    return a === b
                }, g, !0), j = o(function(a) {
                    return bb.call(b, a) > -1
                }, g, !0), k = [
                    function(a, c, d) {
                        return !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                    }
                ]; e > h; h++)
                    if (c = y.relative[a[h].type]) k = [o(p(k), c)];
                    else {
                        if (c = y.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                            for (d = ++h; e > d && !y.relative[a[d].type]; d++);
                            return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                                value: " " === a[h - 2].type ? "*" : ""
                            })).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
                        }
                        k.push(c)
                    }
                return p(k)
            }

            function t(a, c) {
                var e = c.length > 0,
                    f = a.length > 0,
                    g = function(d, g, h, i, j) {
                        var k, l, m, n = 0,
                            o = "0",
                            p = d && [],
                            r = [],
                            s = C,
                            t = d || f && y.find.TAG("*", j),
                            u = P += null == s ? 1 : Math.random() || .1,
                            v = t.length;
                        for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                            if (f && k) {
                                for (l = 0; m = a[l++];)
                                    if (m(k, g, h)) {
                                        i.push(k);
                                        break
                                    }
                                j && (P = u)
                            }
                            e && ((k = !m && k) && n--, d && p.push(k))
                        }
                        if (n += o, e && o !== n) {
                            for (l = 0; m = c[l++];) m(p, r, g, h);
                            if (d) {
                                if (n > 0)
                                    for (; o--;) p[o] || r[o] || (r[o] = Z.call(i));
                                r = q(r)
                            }
                            _.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                        }
                        return j && (P = u, C = s), p
                    };
                return e ? d(g) : g
            }

            function u(a, c, d) {
                for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
                return d
            }

            function v(a, b, c, d) {
                var e, f, g, h, i, j = m(a);
                if (!d && 1 === j.length) {
                    if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && y.relative[f[1].type]) {
                        if (b = (y.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
                        a = a.slice(f.shift().value.length)
                    }
                    for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !y.relative[h = g.type]);)
                        if ((i = y.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
                            if (f.splice(e, 1), a = d.length && n(f), !a) return _.apply(c, d), c;
                            break
                        }
                }
                return B(a, j)(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c
            }
            var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
                O = a.document,
                P = 0,
                Q = 0,
                R = c(),
                S = c(),
                T = c(),
                U = function(a, b) {
                    return a === b && (E = !0), 0
                },
                V = "undefined",
                W = 1 << 31,
                X = {}.hasOwnProperty,
                Y = [],
                Z = Y.pop,
                $ = Y.push,
                _ = Y.push,
                ab = Y.slice,
                bb = Y.indexOf || function(a) {
                    for (var b = 0, c = this.length; c > b; b++)
                        if (this[b] === a) return b;
                    return -1
                },
                cb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                db = "[\\x20\\t\\r\\n\\f]",
                eb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                fb = eb.replace("w", "w#"),
                gb = "\\[" + db + "*(" + eb + ")" + db + "*(?:([*^$|!~]?=)" + db + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + fb + ")|)|)" + db + "*\\]",
                hb = ":(" + eb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + gb.replace(3, 8) + ")*)|.*)\\)|)",
                ib = new RegExp("^" + db + "+|((?:^|[^\\\\])(?:\\\\.)*)" + db + "+$", "g"),
                jb = new RegExp("^" + db + "*," + db + "*"),
                kb = new RegExp("^" + db + "*([>+~]|" + db + ")" + db + "*"),
                lb = new RegExp("=" + db + "*([^\\]'\"]*?)" + db + "*\\]", "g"),
                mb = new RegExp(hb),
                nb = new RegExp("^" + fb + "$"),
                ob = {
                    ID: new RegExp("^#(" + eb + ")"),
                    CLASS: new RegExp("^\\.(" + eb + ")"),
                    TAG: new RegExp("^(" + eb.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + gb),
                    PSEUDO: new RegExp("^" + hb),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + db + "*(even|odd|(([+-]|)(\\d*)n|)" + db + "*(?:([+-]|)" + db + "*(\\d+)|))" + db + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + cb + ")$", "i"),
                    needsContext: new RegExp("^" + db + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + db + "*((?:-\\d)?\\d*)" + db + "*\\)|)(?=[^-]|$)", "i")
                },
                pb = /^(?:input|select|textarea|button)$/i,
                qb = /^h\d$/i,
                rb = /^[^{]+\{\s*\[native \w/,
                sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                tb = /[+~]/,
                ub = /'|\\/g,
                vb = new RegExp("\\\\([\\da-f]{1,6}" + db + "?|(" + db + ")|.)", "ig"),
                wb = function(a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
                };
            try {
                _.apply(Y = ab.call(O.childNodes), O.childNodes), Y[O.childNodes.length].nodeType
            } catch (xb) {
                _ = {
                    apply: Y.length ? function(a, b) {
                        $.apply(a, ab.call(b))
                    } : function(a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            x = b.support = {}, A = b.isXML = function(a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, F = b.setDocument = function(a) {
                var b, c = a ? a.ownerDocument || a : O,
                    d = c.defaultView;
                return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !A(c), d && d !== d.top && (d.addEventListener ? d.addEventListener("unload", function() {
                    F()
                }, !1) : d.attachEvent && d.attachEvent("onunload", function() {
                    F()
                })), x.attributes = e(function(a) {
                    return a.className = "i", !a.getAttribute("className")
                }), x.getElementsByTagName = e(function(a) {
                    return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
                }), x.getElementsByClassName = rb.test(c.getElementsByClassName) && e(function(a) {
                    return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                }), x.getById = e(function(a) {
                    return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
                }), x.getById ? (y.find.ID = function(a, b) {
                    if (typeof b.getElementById !== V && I) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, y.filter.ID = function(a) {
                    var b = a.replace(vb, wb);
                    return function(a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete y.find.ID, y.filter.ID = function(a) {
                    var b = a.replace(vb, wb);
                    return function(a) {
                        var c = typeof a.getAttributeNode !== V && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), y.find.TAG = x.getElementsByTagName ? function(a, b) {
                    return typeof b.getElementsByTagName !== V ? b.getElementsByTagName(a) : void 0
                } : function(a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, y.find.CLASS = x.getElementsByClassName && function(a, b) {
                    return typeof b.getElementsByClassName !== V && I ? b.getElementsByClassName(a) : void 0
                }, K = [], J = [], (x.qsa = rb.test(c.querySelectorAll)) && (e(function(a) {
                    a.innerHTML = "<select t=''><option selected=''></option></select>", a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + db + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + db + "*(?:value|" + cb + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
                }), e(function(a) {
                    var b = c.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + db + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                })), (x.matchesSelector = rb.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                    x.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", hb)
                }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function(a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !!d && 1 === d.nodeType && !!(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d))
                } : function(a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, U = b ? function(a, b) {
                    if (a === b) return E = !0, 0;
                    var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !x.sortDetached && b.compareDocumentPosition(a) === d ? a === c || a.ownerDocument === O && M(O, a) ? -1 : b === c || b.ownerDocument === O && M(O, b) ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0 : 4 & d ? -1 : 1)
                } : function(a, b) {
                    if (a === b) return E = !0, 0;
                    var d, e = 0,
                        f = a.parentNode,
                        h = b.parentNode,
                        i = [a],
                        j = [b];
                    if (!f || !h) return a === c ? -1 : b === c ? 1 : f ? -1 : h ? 1 : D ? bb.call(D, a) - bb.call(D, b) : 0;
                    if (f === h) return g(a, b);
                    for (d = a; d = d.parentNode;) i.unshift(d);
                    for (d = b; d = d.parentNode;) j.unshift(d);
                    for (; i[e] === j[e];) e++;
                    return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                }, c) : G
            }, b.matches = function(a, c) {
                return b(a, null, null, c)
            }, b.matchesSelector = function(a, c) {
                if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!x.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                    var d = L.call(a, c);
                    if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (e) {}
                return b(c, G, null, [a]).length > 0
            }, b.contains = function(a, b) {
                return (a.ownerDocument || a) !== G && F(a), M(a, b)
            }, b.attr = function(a, b) {
                (a.ownerDocument || a) !== G && F(a);
                var c = y.attrHandle[b.toLowerCase()],
                    d = c && X.call(y.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                return void 0 !== d ? d : x.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }, b.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            }, b.uniqueSort = function(a) {
                var b, c = [],
                    d = 0,
                    e = 0;
                if (E = !x.detectDuplicates, D = !x.sortStable && a.slice(0), a.sort(U), E) {
                    for (; b = a[e++];) b === a[e] && (d = c.push(e));
                    for (; d--;) a.splice(c[d], 1)
                }
                return D = null, a
            }, z = b.getText = function(a) {
                var b, c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += z(a)
                    } else if (3 === e || 4 === e) return a.nodeValue
                } else
                    for (; b = a[d++];) c += z(b);
                return c
            }, y = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: ob,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(a) {
                        return a[1] = a[1].replace(vb, wb), a[3] = (a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },
                    CHILD: function(a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                    },
                    PSEUDO: function(a) {
                        var b, c = !a[5] && a[2];
                        return ob.CHILD.test(a[0]) ? null : (a[3] && void 0 !== a[4] ? a[2] = a[4] : c && mb.test(c) && (b = m(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(a) {
                        var b = a.replace(vb, wb).toLowerCase();
                        return "*" === a ? function() {
                            return !0
                        } : function(a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    },
                    CLASS: function(a) {
                        var b = R[a + " "];
                        return b || (b = new RegExp("(^|" + db + ")" + a + "(" + db + "|$)")) && R(a, function(a) {
                            return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== V && a.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(a, c, d) {
                        return function(e) {
                            var f = b.attr(e, a);
                            return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                        }
                    },
                    CHILD: function(a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function(a) {
                            return !!a.parentNode
                        } : function(b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (l = b; l = l[p];)
                                            if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                        if (1 === l.nodeType && ++m && l === b) {
                                            k[a] = [P, n, m];
                                            break
                                        }
                                } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                else
                                    for (;
                                        (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                return m -= e, m === d || m % d === 0 && m / d >= 0
                            }
                        }
                    },
                    PSEUDO: function(a, c) {
                        var e, f = y.pseudos[a] || y.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], y.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                            for (var d, e = f(a, c), g = e.length; g--;) d = bb.call(a, e[g]), a[d] = !(b[d] = e[g])
                        }) : function(a) {
                            return f(a, 0, e)
                        }) : f
                    }
                },
                pseudos: {
                    not: d(function(a) {
                        var b = [],
                            c = [],
                            e = B(a.replace(ib, "$1"));
                        return e[N] ? d(function(a, b, c, d) {
                            for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function(a, d, f) {
                            return b[0] = a, e(b, null, f, c), !c.pop()
                        }
                    }),
                    has: d(function(a) {
                        return function(c) {
                            return b(a, c).length > 0
                        }
                    }),
                    contains: d(function(a) {
                        return function(b) {
                            return (b.textContent || b.innerText || z(b)).indexOf(a) > -1
                        }
                    }),
                    lang: d(function(a) {
                        return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(),
                            function(b) {
                                var c;
                                do
                                    if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                                while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                    }),
                    target: function(b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    },
                    root: function(a) {
                        return a === H
                    },
                    focus: function(a) {
                        return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    },
                    enabled: function(a) {
                        return a.disabled === !1
                    },
                    disabled: function(a) {
                        return a.disabled === !0
                    },
                    checked: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    },
                    selected: function(a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    empty: function(a) {
                        for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(a) {
                        return !y.pseudos.empty(a)
                    },
                    header: function(a) {
                        return qb.test(a.nodeName)
                    },
                    input: function(a) {
                        return pb.test(a.nodeName)
                    },
                    button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    },
                    text: function(a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                    },
                    first: j(function() {
                        return [0]
                    }),
                    last: j(function(a, b) {
                        return [b - 1]
                    }),
                    eq: j(function(a, b, c) {
                        return [0 > c ? c + b : c]
                    }),
                    even: j(function(a, b) {
                        for (var c = 0; b > c; c += 2) a.push(c);
                        return a
                    }),
                    odd: j(function(a, b) {
                        for (var c = 1; b > c; c += 2) a.push(c);
                        return a
                    }),
                    lt: j(function(a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }),
                    gt: j(function(a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                        return a
                    })
                }
            }, y.pseudos.nth = y.pseudos.eq;
            for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) y.pseudos[w] = h(w);
            for (w in {
                submit: !0,
                reset: !0
            }) y.pseudos[w] = i(w);
            return l.prototype = y.filters = y.pseudos, y.setFilters = new l, B = b.compile = function(a, b) {
                var c, d = [],
                    e = [],
                    f = T[a + " "];
                if (!f) {
                    for (b || (b = m(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                    f = T(a, t(e, d))
                }
                return f
            }, x.sortStable = N.split("").sort(U).join("") === N, x.detectDuplicates = !!E, F(), x.sortDetached = e(function(a) {
                return 1 & a.compareDocumentPosition(G.createElement("div"))
            }), e(function(a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || f("type|href|height|width", function(a, b, c) {
                return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
            }), x.attributes && e(function(a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || f("value", function(a, b, c) {
                return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
            }), e(function(a) {
                return null == a.getAttribute("disabled")
            }) || f(cb, function(a, b, c) {
                var d;
                return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
            }), b
        }(a);
        ab.find = eb, ab.expr = eb.selectors, ab.expr[":"] = ab.expr.pseudos, ab.unique = eb.uniqueSort, ab.text = eb.getText, ab.isXMLDoc = eb.isXML, ab.contains = eb.contains;
        var fb = ab.expr.match.needsContext,
            gb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            hb = /^.[^:#\[\.,]*$/;
        ab.filter = function(a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ab.find.matchesSelector(d, a) ? [d] : [] : ab.find.matches(a, ab.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        }, ab.fn.extend({
            find: function(a) {
                var b, c = this.length,
                    d = [],
                    e = this;
                if ("string" != typeof a) return this.pushStack(ab(a).filter(function() {
                    for (b = 0; c > b; b++)
                        if (ab.contains(e[b], this)) return !0
                }));
                for (b = 0; c > b; b++) ab.find(a, e[b], d);
                return d = this.pushStack(c > 1 ? ab.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
            },
            filter: function(a) {
                return this.pushStack(d(this, a || [], !1))
            },
            not: function(a) {
                return this.pushStack(d(this, a || [], !0))
            },
            is: function(a) {
                return !!d(this, "string" == typeof a && fb.test(a) ? ab(a) : a || [], !1).length
            }
        });
        var ib, jb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            kb = ab.fn.init = function(a, b) {
                var c, d;
                if (!a) return this;
                if ("string" == typeof a) {
                    if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : jb.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ib).find(a) : this.constructor(b).find(a);
                    if (c[1]) {
                        if (b = b instanceof ab ? b[0] : b, ab.merge(this, ab.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : $, !0)), gb.test(c[1]) && ab.isPlainObject(b))
                            for (c in b) ab.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                        return this
                    }
                    return d = $.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = $, this.selector = a, this
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ab.isFunction(a) ? "undefined" != typeof ib.ready ? ib.ready(a) : a(ab) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), ab.makeArray(a, this))
            };
        kb.prototype = ab.fn, ib = ab($);
        var lb = /^(?:parents|prev(?:Until|All))/,
            mb = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ab.extend({
            dir: function(a, b, c) {
                for (var d = [], e = void 0 !== c;
                    (a = a[b]) && 9 !== a.nodeType;)
                    if (1 === a.nodeType) {
                        if (e && ab(a).is(c)) break;
                        d.push(a)
                    }
                return d
            },
            sibling: function(a, b) {
                for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
                return c
            }
        }), ab.fn.extend({
            has: function(a) {
                var b = ab(a, this),
                    c = b.length;
                return this.filter(function() {
                    for (var a = 0; c > a; a++)
                        if (ab.contains(this, b[a])) return !0
                })
            },
            closest: function(a, b) {
                for (var c, d = 0, e = this.length, f = [], g = fb.test(a) || "string" != typeof a ? ab(a, b || this.context) : 0; e > d; d++)
                    for (c = this[d]; c && c !== b; c = c.parentNode)
                        if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ab.find.matchesSelector(c, a))) {
                            f.push(c);
                            break
                        }
                return this.pushStack(f.length > 1 ? ab.unique(f) : f)
            },
            index: function(a) {
                return a ? "string" == typeof a ? U.call(ab(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(a, b) {
                return this.pushStack(ab.unique(ab.merge(this.get(), ab(a, b))))
            },
            addBack: function(a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
            }
        }), ab.each({
            parent: function(a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null
            },
            parents: function(a) {
                return ab.dir(a, "parentNode")
            },
            parentsUntil: function(a, b, c) {
                return ab.dir(a, "parentNode", c)
            },
            next: function(a) {
                return e(a, "nextSibling")
            },
            prev: function(a) {
                return e(a, "previousSibling")
            },
            nextAll: function(a) {
                return ab.dir(a, "nextSibling")
            },
            prevAll: function(a) {
                return ab.dir(a, "previousSibling")
            },
            nextUntil: function(a, b, c) {
                return ab.dir(a, "nextSibling", c)
            },
            prevUntil: function(a, b, c) {
                return ab.dir(a, "previousSibling", c)
            },
            siblings: function(a) {
                return ab.sibling((a.parentNode || {}).firstChild, a)
            },
            children: function(a) {
                return ab.sibling(a.firstChild)
            },
            contents: function(a) {
                return a.contentDocument || ab.merge([], a.childNodes)
            }
        }, function(a, b) {
            ab.fn[a] = function(c, d) {
                var e = ab.map(this, b, c);
                return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ab.filter(d, e)), this.length > 1 && (mb[a] || ab.unique(e), lb.test(a) && e.reverse()), this.pushStack(e)
            }
        });
        var nb = /\S+/g,
            ob = {};
        ab.Callbacks = function(a) {
            a = "string" == typeof a ? ob[a] || f(a) : ab.extend({}, a);
            var b, c, d, e, g, h, i = [],
                j = !a.once && [],
                k = function(f) {
                    for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++)
                        if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                            b = !1;
                            break
                        }
                    d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
                },
                l = {
                    add: function() {
                        if (i) {
                            var c = i.length;
                            ! function f(b) {
                                ab.each(b, function(b, c) {
                                    var d = ab.type(c);
                                    "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                                })
                            }(arguments), d ? g = i.length : b && (e = c, k(b))
                        }
                        return this
                    },
                    remove: function() {
                        return i && ab.each(arguments, function(a, b) {
                            for (var c;
                                (c = ab.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (g >= c && g--, h >= c && h--)
                        }), this
                    },
                    has: function(a) {
                        return a ? ab.inArray(a, i) > -1 : !!i && !!i.length
                    },
                    empty: function() {
                        return i = [], g = 0, this
                    },
                    disable: function() {
                        return i = j = b = void 0, this
                    },
                    disabled: function() {
                        return !i
                    },
                    lock: function() {
                        return j = void 0, b || l.disable(), this
                    },
                    locked: function() {
                        return !j
                    },
                    fireWith: function(a, b) {
                        return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
                    },
                    fire: function() {
                        return l.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!c
                    }
                };
            return l
        }, ab.extend({
            Deferred: function(a) {
                var b = [
                        ["resolve", "done", ab.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ab.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ab.Callbacks("memory")]
                    ],
                    c = "pending",
                    d = {
                        state: function() {
                            return c
                        },
                        always: function() {
                            return e.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var a = arguments;
                            return ab.Deferred(function(c) {
                                ab.each(b, function(b, f) {
                                    var g = ab.isFunction(a[b]) && a[b];
                                    e[f[1]](function() {
                                        var a = g && g.apply(this, arguments);
                                        a && ab.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                    })
                                }), a = null
                            }).promise()
                        },
                        promise: function(a) {
                            return null != a ? ab.extend(a, d) : d
                        }
                    },
                    e = {};
                return d.pipe = d.then, ab.each(b, function(a, f) {
                    var g = f[2],
                        h = f[3];
                    d[f[1]] = g.add, h && g.add(function() {
                        c = h
                    }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                        return e[f[0] + "With"](this === e ? d : this, arguments), this
                    }, e[f[0] + "With"] = g.fireWith
                }), d.promise(e), a && a.call(e, e), e
            },
            when: function(a) {
                var b, c, d, e = 0,
                    f = R.call(arguments),
                    g = f.length,
                    h = 1 !== g || a && ab.isFunction(a.promise) ? g : 0,
                    i = 1 === h ? a : ab.Deferred(),
                    j = function(a, c, d) {
                        return function(e) {
                            c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                        }
                    };
                if (g > 1)
                    for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && ab.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                return h || i.resolveWith(d, f), i.promise()
            }
        });
        var pb;
        ab.fn.ready = function(a) {
            return ab.ready.promise().done(a), this
        }, ab.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? ab.readyWait++ : ab.ready(!0)
            },
            ready: function(a) {
                (a === !0 ? --ab.readyWait : ab.isReady) || (ab.isReady = !0, a !== !0 && --ab.readyWait > 0 || (pb.resolveWith($, [ab]), ab.fn.trigger && ab($).trigger("ready").off("ready")))
            }
        }), ab.ready.promise = function(b) {
            return pb || (pb = ab.Deferred(), "complete" === $.readyState ? setTimeout(ab.ready) : ($.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), pb.promise(b)
        }, ab.ready.promise();
        var qb = ab.access = function(a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === ab.type(c)) {
                e = !0;
                for (h in c) ab.access(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, ab.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                return j.call(ab(a), c)
            })), b))
                for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        };
        ab.acceptData = function(a) {
            return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
        }, h.uid = 1, h.accepts = ab.acceptData, h.prototype = {
            key: function(a) {
                if (!h.accepts(a)) return 0;
                var b = {},
                    c = a[this.expando];
                if (!c) {
                    c = h.uid++;
                    try {
                        b[this.expando] = {
                            value: c
                        }, Object.defineProperties(a, b)
                    } catch (d) {
                        b[this.expando] = c, ab.extend(a, b)
                    }
                }
                return this.cache[c] || (this.cache[c] = {}), c
            },
            set: function(a, b, c) {
                var d, e = this.key(a),
                    f = this.cache[e];
                if ("string" == typeof b) f[b] = c;
                else if (ab.isEmptyObject(f)) ab.extend(this.cache[e], b);
                else
                    for (d in b) f[d] = b[d];
                return f
            },
            get: function(a, b) {
                var c = this.cache[this.key(a)];
                return void 0 === b ? c : c[b]
            },
            access: function(a, b, c) {
                var d;
                return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, ab.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
            },
            remove: function(a, b) {
                var c, d, e, f = this.key(a),
                    g = this.cache[f];
                if (void 0 === b) this.cache[f] = {};
                else {
                    ab.isArray(b) ? d = b.concat(b.map(ab.camelCase)) : (e = ab.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(nb) || [])), c = d.length;
                    for (; c--;) delete g[d[c]]
                }
            },
            hasData: function(a) {
                return !ab.isEmptyObject(this.cache[a[this.expando]] || {})
            },
            discard: function(a) {
                a[this.expando] && delete this.cache[a[this.expando]]
            }
        };
        var rb = new h,
            sb = new h,
            tb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            ub = /([A-Z])/g;
        ab.extend({
            hasData: function(a) {
                return sb.hasData(a) || rb.hasData(a)
            },
            data: function(a, b, c) {
                return sb.access(a, b, c)
            },
            removeData: function(a, b) {
                sb.remove(a, b)
            },
            _data: function(a, b, c) {
                return rb.access(a, b, c)
            },
            _removeData: function(a, b) {
                rb.remove(a, b)
            }
        }), ab.fn.extend({
            data: function(a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = sb.get(f), 1 === f.nodeType && !rb.get(f, "hasDataAttrs"))) {
                        for (c = g.length; c--;) d = g[c].name, 0 === d.indexOf("data-") && (d = ab.camelCase(d.slice(5)), i(f, d, e[d]));
                        rb.set(f, "hasDataAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function() {
                    sb.set(this, a)
                }) : qb(this, function(b) {
                    var c, d = ab.camelCase(a);
                    if (f && void 0 === b) {
                        if (c = sb.get(f, a), void 0 !== c) return c;
                        if (c = sb.get(f, d), void 0 !== c) return c;
                        if (c = i(f, d, void 0), void 0 !== c) return c
                    } else this.each(function() {
                        var c = sb.get(this, d);
                        sb.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && sb.set(this, a, b)
                    })
                }, null, b, arguments.length > 1, null, !0)
            },
            removeData: function(a) {
                return this.each(function() {
                    sb.remove(this, a)
                })
            }
        }), ab.extend({
            queue: function(a, b, c) {
                var d;
                return a ? (b = (b || "fx") + "queue", d = rb.get(a, b), c && (!d || ab.isArray(c) ? d = rb.access(a, b, ab.makeArray(c)) : d.push(c)), d || []) : void 0
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = ab.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = ab._queueHooks(a, b),
                    g = function() {
                        ab.dequeue(a, b)
                    };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return rb.get(a, c) || rb.access(a, c, {
                    empty: ab.Callbacks("once memory").add(function() {
                        rb.remove(a, [b + "queue", c])
                    })
                })
            }
        }), ab.fn.extend({
            queue: function(a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ab.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                    var c = ab.queue(this, a, b);
                    ab._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ab.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    ab.dequeue(this, a)
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, b) {
                var c, d = 1,
                    e = ab.Deferred(),
                    f = this,
                    g = this.length,
                    h = function() {
                        --d || e.resolveWith(f, [f])
                    };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = rb.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        });
        var vb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            wb = ["Top", "Right", "Bottom", "Left"],
            xb = function(a, b) {
                return a = b || a, "none" === ab.css(a, "display") || !ab.contains(a.ownerDocument, a)
            },
            yb = /^(?:checkbox|radio)$/i;
        ! function() {
            var a = $.createDocumentFragment(),
                b = a.appendChild($.createElement("div"));
            b.innerHTML = "<input type='radio' checked='checked' name='t'/>", Z.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Z.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
        }();
        var zb = "undefined";
        Z.focusinBubbles = "onfocusin" in a;
        var Ab = /^key/,
            Bb = /^(?:mouse|contextmenu)|click/,
            Cb = /^(?:focusinfocus|focusoutblur)$/,
            Db = /^([^.]*)(?:\.(.+)|)$/;
        ab.event = {
            global: {},
            add: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = rb.get(a);
                if (q)
                    for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = ab.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                        return typeof ab !== zb && ab.event.triggered !== b.type ? ab.event.dispatch.apply(a, arguments) : void 0
                    }), b = (b || "").match(nb) || [""], j = b.length; j--;) h = Db.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = ab.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = ab.event.special[n] || {}, k = ab.extend({
                        type: n,
                        origType: p,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && ab.expr.match.needsContext.test(e),
                        namespace: o.join(".")
                    }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), ab.event.global[n] = !0)
            },
            remove: function(a, b, c, d, e) {
                var f, g, h, i, j, k, l, m, n, o, p, q = rb.hasData(a) && rb.get(a);
                if (q && (i = q.events)) {
                    for (b = (b || "").match(nb) || [""], j = b.length; j--;)
                        if (h = Db.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                            for (l = ab.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                            g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ab.removeEvent(a, n, q.handle), delete i[n])
                        } else
                            for (n in i) ab.event.remove(a, n + b[j], c, d, !0);
                    ab.isEmptyObject(i) && (delete q.handle, rb.remove(a, "events"))
                }
            },
            trigger: function(b, c, d, e) {
                var f, g, h, i, j, k, l, m = [d || $],
                    n = X.call(b, "type") ? b.type : b,
                    o = X.call(b, "namespace") ? b.namespace.split(".") : [];
                if (g = h = d = d || $, 3 !== d.nodeType && 8 !== d.nodeType && !Cb.test(n + ab.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[ab.expando] ? b : new ab.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ab.makeArray(c, [b]), l = ab.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                    if (!e && !l.noBubble && !ab.isWindow(d)) {
                        for (i = l.delegateType || n, Cb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                        h === (d.ownerDocument || $) && m.push(h.defaultView || h.parentWindow || a)
                    }
                    for (f = 0;
                        (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (rb.get(g, "events") || {})[b.type] && rb.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && ab.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                    return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !ab.acceptData(d) || j && ab.isFunction(d[n]) && !ab.isWindow(d) && (h = d[j], h && (d[j] = null), ab.event.triggered = n, d[n](), ab.event.triggered = void 0, h && (d[j] = h)), b.result
                }
            },
            dispatch: function(a) {
                a = ab.event.fix(a);
                var b, c, d, e, f, g = [],
                    h = R.call(arguments),
                    i = (rb.get(this, "events") || {})[a.type] || [],
                    j = ab.event.special[a.type] || {};
                if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                    for (g = ab.event.handlers.call(this, a, i), b = 0;
                        (e = g[b++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = e.elem, c = 0;
                            (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, d = ((ab.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                    return j.postDispatch && j.postDispatch.call(this, a), a.result
                }
            },
            handlers: function(a, b) {
                var c, d, e, f, g = [],
                    h = b.delegateCount,
                    i = a.target;
                if (h && i.nodeType && (!a.button || "click" !== a.type))
                    for (; i !== this; i = i.parentNode || this)
                        if (i.disabled !== !0 || "click" !== a.type) {
                            for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? ab(e, this).index(i) >= 0 : ab.find(e, this, null, [i]).length), d[e] && d.push(f);
                            d.length && g.push({
                                elem: i,
                                handlers: d
                            })
                        }
                return h < b.length && g.push({
                    elem: this,
                    handlers: b.slice(h)
                }), g
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(a, b) {
                    var c, d, e, f = b.button;
                    return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || $, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
                }
            },
            fix: function(a) {
                if (a[ab.expando]) return a;
                var b, c, d, e = a.type,
                    f = a,
                    g = this.fixHooks[e];
                for (g || (this.fixHooks[e] = g = Bb.test(e) ? this.mouseHooks : Ab.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ab.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
                return a.target || (a.target = $), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        return this !== l() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === l() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return "checkbox" === this.type && this.click && ab.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function(a) {
                        return ab.nodeName(a.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(a) {
                        void 0 !== a.result && (a.originalEvent.returnValue = a.result)
                    }
                }
            },
            simulate: function(a, b, c, d) {
                var e = ab.extend(new ab.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? ab.event.trigger(e, null, b) : ab.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, ab.removeEvent = function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        }, ab.Event = function(a, b) {
            return this instanceof ab.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.getPreventDefault && a.getPreventDefault() ? j : k) : this.type = a, b && ab.extend(this, b), this.timeStamp = a && a.timeStamp || ab.now(), void(this[ab.expando] = !0)) : new ab.Event(a, b)
        }, ab.Event.prototype = {
            isDefaultPrevented: k,
            isPropagationStopped: k,
            isImmediatePropagationStopped: k,
            preventDefault: function() {
                var a = this.originalEvent;
                this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
            },
            stopPropagation: function() {
                var a = this.originalEvent;
                this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = j, this.stopPropagation()
            }
        }, ab.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(a, b) {
            ab.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function(a) {
                    var c, d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return (!e || e !== d && !ab.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
                }
            }
        }), Z.focusinBubbles || ab.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            var c = function(a) {
                ab.event.simulate(b, a.target, ab.event.fix(a), !0)
            };
            ab.event.special[b] = {
                setup: function() {
                    var d = this.ownerDocument || this,
                        e = rb.access(d, b);
                    e || d.addEventListener(a, c, !0), rb.access(d, b, (e || 0) + 1)
                },
                teardown: function() {
                    var d = this.ownerDocument || this,
                        e = rb.access(d, b) - 1;
                    e ? rb.access(d, b, e) : (d.removeEventListener(a, c, !0), rb.remove(d, b))
                }
            }
        }), ab.fn.extend({
            on: function(a, b, c, d, e) {
                var f, g;
                if ("object" == typeof a) {
                    "string" != typeof b && (c = c || b, b = void 0);
                    for (g in a) this.on(g, b, c, a[g], e);
                    return this
                }
                if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k;
                else if (!d) return this;
                return 1 === e && (f = d, d = function(a) {
                    return ab().off(a), f.apply(this, arguments)
                }, d.guid = f.guid || (f.guid = ab.guid++)), this.each(function() {
                    ab.event.add(this, a, d, c, b)
                })
            },
            one: function(a, b, c, d) {
                return this.on(a, b, c, d, 1)
            },
            off: function(a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ab(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this
                }
                return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = k), this.each(function() {
                    ab.event.remove(this, a, c, b)
                })
            },
            trigger: function(a, b) {
                return this.each(function() {
                    ab.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                var c = this[0];
                return c ? ab.event.trigger(a, b, c, !0) : void 0
            }
        });
        var Eb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Fb = /<([\w:]+)/,
            Gb = /<|&#?\w+;/,
            Hb = /<(?:script|style|link)/i,
            Ib = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Jb = /^$|\/(?:java|ecma)script/i,
            Kb = /^true\/(.*)/,
            Lb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Mb = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Mb.optgroup = Mb.option, Mb.tbody = Mb.tfoot = Mb.colgroup = Mb.caption = Mb.thead, Mb.th = Mb.td, ab.extend({
            clone: function(a, b, c) {
                var d, e, f, g, h = a.cloneNode(!0),
                    i = ab.contains(a.ownerDocument, a);
                if (!(Z.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ab.isXMLDoc(a)))
                    for (g = r(h), f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
                if (b)
                    if (c)
                        for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]);
                    else q(a, h);
                return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
            },
            buildFragment: function(a, b, c, d) {
                for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
                    if (e = a[m], e || 0 === e)
                        if ("object" === ab.type(e)) ab.merge(l, e.nodeType ? [e] : e);
                        else if (Gb.test(e)) {
                    for (f = f || k.appendChild(b.createElement("div")), g = (Fb.exec(e) || ["", ""])[1].toLowerCase(), h = Mb[g] || Mb._default, f.innerHTML = h[1] + e.replace(Eb, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
                    ab.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
                } else l.push(b.createTextNode(e));
                for (k.textContent = "", m = 0; e = l[m++];)
                    if ((!d || -1 === ab.inArray(e, d)) && (i = ab.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
                        for (j = 0; e = f[j++];) Jb.test(e.type || "") && c.push(e);
                return k
            },
            cleanData: function(a) {
                for (var b, c, d, e, f, g, h = ab.event.special, i = 0; void 0 !== (c = a[i]); i++) {
                    if (ab.acceptData(c) && (f = c[rb.expando], f && (b = rb.cache[f]))) {
                        if (d = Object.keys(b.events || {}), d.length)
                            for (g = 0; void 0 !== (e = d[g]); g++) h[e] ? ab.event.remove(c, e) : ab.removeEvent(c, e, b.handle);
                        rb.cache[f] && delete rb.cache[f]
                    }
                    delete sb.cache[c[sb.expando]]
                }
            }
        }), ab.fn.extend({
            text: function(a) {
                return qb(this, function(a) {
                    return void 0 === a ? ab.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                    })
                }, null, a, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = m(this, a);
                        b.appendChild(a)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = m(this, a);
                        b.insertBefore(a, b.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                })
            },
            remove: function(a, b) {
                for (var c, d = a ? ab.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || ab.cleanData(r(c)), c.parentNode && (b && ab.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
                return this
            },
            empty: function() {
                for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (ab.cleanData(r(a, !1)), a.textContent = "");
                return this
            },
            clone: function(a, b) {
                return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                    return ab.clone(this, a, b)
                })
            },
            html: function(a) {
                return qb(this, function(a) {
                    var b = this[0] || {},
                        c = 0,
                        d = this.length;
                    if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                    if ("string" == typeof a && !Hb.test(a) && !Mb[(Fb.exec(a) || ["", ""])[1].toLowerCase()]) {
                        a = a.replace(Eb, "<$1></$2>");
                        try {
                            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (ab.cleanData(r(b, !1)), b.innerHTML = a);
                            b = 0
                        } catch (e) {}
                    }
                    b && this.empty().append(a)
                }, null, a, arguments.length)
            },
            replaceWith: function() {
                var a = arguments[0];
                return this.domManip(arguments, function(b) {
                    a = this.parentNode, ab.cleanData(r(this)), a && a.replaceChild(b, this)
                }), a && (a.length || a.nodeType) ? this : this.remove()
            },
            detach: function(a) {
                return this.remove(a, !0)
            },
            domManip: function(a, b) {
                a = S.apply([], a);
                var c, d, e, f, g, h, i = 0,
                    j = this.length,
                    k = this,
                    l = j - 1,
                    m = a[0],
                    p = ab.isFunction(m);
                if (p || j > 1 && "string" == typeof m && !Z.checkClone && Ib.test(m)) return this.each(function(c) {
                    var d = k.eq(c);
                    p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
                });
                if (j && (c = ab.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                    for (e = ab.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = ab.clone(g, !0, !0), f && ab.merge(e, r(g, "script"))), b.call(this[i], g, i);
                    if (f)
                        for (h = e[e.length - 1].ownerDocument, ab.map(e, o), i = 0; f > i; i++) g = e[i], Jb.test(g.type || "") && !rb.access(g, "globalEval") && ab.contains(h, g) && (g.src ? ab._evalUrl && ab._evalUrl(g.src) : ab.globalEval(g.textContent.replace(Lb, "")))
                }
                return this
            }
        }), ab.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(a, b) {
            ab.fn[a] = function(a) {
                for (var c, d = [], e = ab(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), ab(e[g])[b](c), T.apply(d, c.get());
                return this.pushStack(d)
            }
        });
        var Nb, Ob = {},
            Pb = /^margin/,
            Qb = new RegExp("^(" + vb + ")(?!px)[a-z%]+$", "i"),
            Rb = function(a) {
                return a.ownerDocument.defaultView.getComputedStyle(a, null)
            };
        ! function() {
            function b() {
                h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", f.appendChild(g);
                var b = a.getComputedStyle(h, null);
                c = "1%" !== b.top, d = "4px" === b.width, f.removeChild(g)
            }
            var c, d, e = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                f = $.documentElement,
                g = $.createElement("div"),
                h = $.createElement("div");
            h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", Z.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(h), a.getComputedStyle && ab.extend(Z, {
                pixelPosition: function() {
                    return b(), c
                },
                boxSizingReliable: function() {
                    return null == d && b(), d
                },
                reliableMarginRight: function() {
                    var b, c = h.appendChild($.createElement("div"));
                    return c.style.cssText = h.style.cssText = e, c.style.marginRight = c.style.width = "0", h.style.width = "1px", f.appendChild(g), b = !parseFloat(a.getComputedStyle(c, null).marginRight), f.removeChild(g), h.innerHTML = "", b
                }
            })
        }(), ab.swap = function(a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        };
        var Sb = /^(none|table(?!-c[ea]).+)/,
            Tb = new RegExp("^(" + vb + ")(.*)$", "i"),
            Ub = new RegExp("^([+-])=(" + vb + ")", "i"),
            Vb = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Wb = {
                letterSpacing: 0,
                fontWeight: 400
            },
            Xb = ["Webkit", "O", "Moz", "ms"];
        ab.extend({
            cssHooks: {
                opacity: {
                    get: function(a, b) {
                        if (b) {
                            var c = v(a, "opacity");
                            return "" === c ? "1" : c
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(a, b, c, d) {
                if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                    var e, f, g, h = ab.camelCase(b),
                        i = a.style;
                    return b = ab.cssProps[h] || (ab.cssProps[h] = x(i, h)), g = ab.cssHooks[b] || ab.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ub.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(ab.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || ab.cssNumber[h] || (c += "px"), Z.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = "", i[b] = c)), void 0)
                }
            },
            css: function(a, b, c, d) {
                var e, f, g, h = ab.camelCase(b);
                return b = ab.cssProps[h] || (ab.cssProps[h] = x(a.style, h)), g = ab.cssHooks[b] || ab.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Wb && (e = Wb[b]), "" === c || c ? (f = parseFloat(e), c === !0 || ab.isNumeric(f) ? f || 0 : e) : e
            }
        }), ab.each(["height", "width"], function(a, b) {
            ab.cssHooks[b] = {
                get: function(a, c, d) {
                    return c ? 0 === a.offsetWidth && Sb.test(ab.css(a, "display")) ? ab.swap(a, Vb, function() {
                        return A(a, b, d)
                    }) : A(a, b, d) : void 0
                },
                set: function(a, c, d) {
                    var e = d && Rb(a);
                    return y(a, c, d ? z(a, b, d, "border-box" === ab.css(a, "boxSizing", !1, e), e) : 0)
                }
            }
        }), ab.cssHooks.marginRight = w(Z.reliableMarginRight, function(a, b) {
            return b ? ab.swap(a, {
                display: "inline-block"
            }, v, [a, "marginRight"]) : void 0
        }), ab.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(a, b) {
            ab.cssHooks[a + b] = {
                expand: function(c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + wb[d] + b] = f[d] || f[d - 2] || f[0];
                    return e
                }
            }, Pb.test(a) || (ab.cssHooks[a + b].set = y)
        }), ab.fn.extend({
            css: function(a, b) {
                return qb(this, function(a, b, c) {
                    var d, e, f = {},
                        g = 0;
                    if (ab.isArray(b)) {
                        for (d = Rb(a), e = b.length; e > g; g++) f[b[g]] = ab.css(a, b[g], !1, d);
                        return f
                    }
                    return void 0 !== c ? ab.style(a, b, c) : ab.css(a, b)
                }, a, b, arguments.length > 1)
            },
            show: function() {
                return B(this, !0)
            },
            hide: function() {
                return B(this)
            },
            toggle: function(a) {
                return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                    xb(this) ? ab(this).show() : ab(this).hide()
                })
            }
        }), ab.Tween = C, C.prototype = {
            constructor: C,
            init: function(a, b, c, d, e, f) {
                this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ab.cssNumber[c] ? "" : "px")
            },
            cur: function() {
                var a = C.propHooks[this.prop];
                return a && a.get ? a.get(this) : C.propHooks._default.get(this)
            },
            run: function(a) {
                var b, c = C.propHooks[this.prop];
                return this.pos = b = this.options.duration ? ab.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
            }
        }, C.prototype.init.prototype = C.prototype, C.propHooks = {
            _default: {
                get: function(a) {
                    var b;
                    return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ab.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
                },
                set: function(a) {
                    ab.fx.step[a.prop] ? ab.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ab.cssProps[a.prop]] || ab.cssHooks[a.prop]) ? ab.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                }
            }
        }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
            set: function(a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
            }
        }, ab.easing = {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return .5 - Math.cos(a * Math.PI) / 2
            }
        }, ab.fx = C.prototype.init, ab.fx.step = {};
        var Yb, Zb, $b = /^(?:toggle|show|hide)$/,
            _b = new RegExp("^(?:([+-])=|)(" + vb + ")([a-z%]*)$", "i"),
            ac = /queueHooks$/,
            bc = [G],
            cc = {
                "*": [
                    function(a, b) {
                        var c = this.createTween(a, b),
                            d = c.cur(),
                            e = _b.exec(b),
                            f = e && e[3] || (ab.cssNumber[a] ? "" : "px"),
                            g = (ab.cssNumber[a] || "px" !== f && +d) && _b.exec(ab.css(c.elem, a)),
                            h = 1,
                            i = 20;
                        if (g && g[3] !== f) {
                            f = f || g[3], e = e || [], g = +d || 1;
                            do h = h || ".5", g /= h, ab.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                        }
                        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                    }
                ]
            };
        ab.Animation = ab.extend(I, {
                tweener: function(a, b) {
                    ab.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                    for (var c, d = 0, e = a.length; e > d; d++) c = a[d], cc[c] = cc[c] || [], cc[c].unshift(b)
                },
                prefilter: function(a, b) {
                    b ? bc.unshift(a) : bc.push(a)
                }
            }), ab.speed = function(a, b, c) {
                var d = a && "object" == typeof a ? ab.extend({}, a) : {
                    complete: c || !c && b || ab.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !ab.isFunction(b) && b
                };
                return d.duration = ab.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ab.fx.speeds ? ab.fx.speeds[d.duration] : ab.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                    ab.isFunction(d.old) && d.old.call(this), d.queue && ab.dequeue(this, d.queue)
                }, d
            }, ab.fn.extend({
                fadeTo: function(a, b, c, d) {
                    return this.filter(xb).css("opacity", 0).show().end().animate({
                        opacity: b
                    }, a, c, d)
                },
                animate: function(a, b, c, d) {
                    var e = ab.isEmptyObject(a),
                        f = ab.speed(b, c, d),
                        g = function() {
                            var b = I(this, ab.extend({}, a), f);
                            (e || rb.get(this, "finish")) && b.stop(!0)
                        };
                    return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                },
                stop: function(a, b, c) {
                    var d = function(a) {
                        var b = a.stop;
                        delete a.stop, b(c)
                    };
                    return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = ab.timers,
                            g = rb.get(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g) g[e] && g[e].stop && ac.test(e) && d(g[e]);
                        for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                        (b || !c) && ab.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return a !== !1 && (a = a || "fx"), this.each(function() {
                        var b, c = rb.get(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = ab.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, ab.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish
                    })
                }
            }), ab.each(["toggle", "show", "hide"], function(a, b) {
                var c = ab.fn[b];
                ab.fn[b] = function(a, d, e) {
                    return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
                }
            }), ab.each({
                slideDown: E("show"),
                slideUp: E("hide"),
                slideToggle: E("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(a, b) {
                ab.fn[a] = function(a, c, d) {
                    return this.animate(b, a, c, d)
                }
            }), ab.timers = [], ab.fx.tick = function() {
                var a, b = 0,
                    c = ab.timers;
                for (Yb = ab.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
                c.length || ab.fx.stop(), Yb = void 0
            }, ab.fx.timer = function(a) {
                ab.timers.push(a), a() ? ab.fx.start() : ab.timers.pop()
            }, ab.fx.interval = 13, ab.fx.start = function() {
                Zb || (Zb = setInterval(ab.fx.tick, ab.fx.interval))
            }, ab.fx.stop = function() {
                clearInterval(Zb), Zb = null
            }, ab.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, ab.fn.delay = function(a, b) {
                return a = ab.fx ? ab.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function() {
                        clearTimeout(d)
                    }
                })
            },
            function() {
                var a = $.createElement("input"),
                    b = $.createElement("select"),
                    c = b.appendChild($.createElement("option"));
                a.type = "checkbox", Z.checkOn = "" !== a.value, Z.optSelected = c.selected, b.disabled = !0, Z.optDisabled = !c.disabled, a = $.createElement("input"), a.value = "t", a.type = "radio", Z.radioValue = "t" === a.value
            }();
        var dc, ec, fc = ab.expr.attrHandle;
        ab.fn.extend({
            attr: function(a, b) {
                return qb(this, ab.attr, a, b, arguments.length > 1)
            },
            removeAttr: function(a) {
                return this.each(function() {
                    ab.removeAttr(this, a)
                })
            }
        }), ab.extend({
            attr: function(a, b, c) {
                var d, e, f = a.nodeType;
                return a && 3 !== f && 8 !== f && 2 !== f ? typeof a.getAttribute === zb ? ab.prop(a, b, c) : (1 === f && ab.isXMLDoc(a) || (b = b.toLowerCase(), d = ab.attrHooks[b] || (ab.expr.match.bool.test(b) ? ec : dc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = ab.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void ab.removeAttr(a, b)) : void 0
            },
            removeAttr: function(a, b) {
                var c, d, e = 0,
                    f = b && b.match(nb);
                if (f && 1 === a.nodeType)
                    for (; c = f[e++];) d = ab.propFix[c] || c, ab.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
            },
            attrHooks: {
                type: {
                    set: function(a, b) {
                        if (!Z.radioValue && "radio" === b && ab.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b
                        }
                    }
                }
            }
        }), ec = {
            set: function(a, b, c) {
                return b === !1 ? ab.removeAttr(a, c) : a.setAttribute(c, c), c
            }
        }, ab.each(ab.expr.match.bool.source.match(/\w+/g), function(a, b) {
            var c = fc[b] || ab.find.attr;
            fc[b] = function(a, b, d) {
                var e, f;
                return d || (f = fc[b], fc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fc[b] = f), e
            }
        });
        var gc = /^(?:input|select|textarea|button)$/i;
        ab.fn.extend({
            prop: function(a, b) {
                return qb(this, ab.prop, a, b, arguments.length > 1)
            },
            removeProp: function(a) {
                return this.each(function() {
                    delete this[ab.propFix[a] || a]
                })
            }
        }), ab.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(a, b, c) {
                var d, e, f, g = a.nodeType;
                return a && 3 !== g && 8 !== g && 2 !== g ? (f = 1 !== g || !ab.isXMLDoc(a), f && (b = ab.propFix[b] || b, e = ab.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0
            },
            propHooks: {
                tabIndex: {
                    get: function(a) {
                        return a.hasAttribute("tabindex") || gc.test(a.nodeName) || a.href ? a.tabIndex : -1
                    }
                }
            }
        }), Z.optSelected || (ab.propHooks.selected = {
            get: function(a) {
                var b = a.parentNode;
                return b && b.parentNode && b.parentNode.selectedIndex, null
            }
        }), ab.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ab.propFix[this.toLowerCase()] = this
        });
        var hc = /[\t\r\n\f]/g;
        ab.fn.extend({
            addClass: function(a) {
                var b, c, d, e, f, g, h = "string" == typeof a && a,
                    i = 0,
                    j = this.length;
                if (ab.isFunction(a)) return this.each(function(b) {
                    ab(this).addClass(a.call(this, b, this.className))
                });
                if (h)
                    for (b = (a || "").match(nb) || []; j > i; i++)
                        if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hc, " ") : " ")) {
                            for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                            g = ab.trim(d), c.className !== g && (c.className = g)
                        }
                return this
            },
            removeClass: function(a) {
                var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                    i = 0,
                    j = this.length;
                if (ab.isFunction(a)) return this.each(function(b) {
                    ab(this).removeClass(a.call(this, b, this.className))
                });
                if (h)
                    for (b = (a || "").match(nb) || []; j > i; i++)
                        if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hc, " ") : "")) {
                            for (f = 0; e = b[f++];)
                                for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                            g = a ? ab.trim(d) : "", c.className !== g && (c.className = g)
                        }
                return this
            },
            toggleClass: function(a, b) {
                var c = typeof a;
                return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(ab.isFunction(a) ? function(c) {
                    ab(this).toggleClass(a.call(this, c, this.className, b), b)
                } : function() {
                    if ("string" === c)
                        for (var b, d = 0, e = ab(this), f = a.match(nb) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                    else(c === zb || "boolean" === c) && (this.className && rb.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : rb.get(this, "__className__") || "")
                })
            },
            hasClass: function(a) {
                for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                    if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hc, " ").indexOf(b) >= 0) return !0;
                return !1
            }
        });
        var ic = /\r/g;
        ab.fn.extend({
            val: function(a) {
                var b, c, d, e = this[0];
                return arguments.length ? (d = ab.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, ab(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ab.isArray(e) && (e = ab.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = ab.valHooks[this.type] || ab.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                })) : e ? (b = ab.valHooks[e.type] || ab.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ic, "") : null == c ? "" : c)) : void 0
            }
        }), ab.extend({
            valHooks: {
                select: {
                    get: function(a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                            if (c = d[i], !(!c.selected && i !== e || (Z.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ab.nodeName(c.parentNode, "optgroup"))) {
                                if (b = ab(c).val(), f) return b;
                                g.push(b)
                            }
                        return g
                    },
                    set: function(a, b) {
                        for (var c, d, e = a.options, f = ab.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = ab.inArray(ab(d).val(), f) >= 0) && (c = !0);
                        return c || (a.selectedIndex = -1), f
                    }
                }
            }
        }), ab.each(["radio", "checkbox"], function() {
            ab.valHooks[this] = {
                set: function(a, b) {
                    return ab.isArray(b) ? a.checked = ab.inArray(ab(a).val(), b) >= 0 : void 0
                }
            }, Z.checkOn || (ab.valHooks[this].get = function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            })
        }), ab.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
            ab.fn[b] = function(a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }
        }), ab.fn.extend({
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            },
            bind: function(a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function(a, b) {
                return this.off(a, null, b)
            },
            delegate: function(a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function(a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
            }
        });
        var jc = ab.now(),
            kc = /\?/;
        ab.parseJSON = function(a) {
            return JSON.parse(a + "")
        }, ab.parseXML = function(a) {
            var b, c;
            if (!a || "string" != typeof a) return null;
            try {
                c = new DOMParser, b = c.parseFromString(a, "text/xml")
            } catch (d) {
                b = void 0
            }
            return (!b || b.getElementsByTagName("parsererror").length) && ab.error("Invalid XML: " + a), b
        };
        var lc, mc, nc = /#.*$/,
            oc = /([?&])_=[^&]*/,
            pc = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            qc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            rc = /^(?:GET|HEAD)$/,
            sc = /^\/\//,
            tc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            uc = {},
            vc = {},
            wc = "*/".concat("*");
        try {
            mc = location.href
        } catch (xc) {
            mc = $.createElement("a"), mc.href = "", mc = mc.href
        }
        lc = tc.exec(mc.toLowerCase()) || [], ab.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: mc,
                type: "GET",
                isLocal: qc.test(lc[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": wc,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ab.parseJSON,
                    "text xml": ab.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(a, b) {
                return b ? L(L(a, ab.ajaxSettings), b) : L(ab.ajaxSettings, a)
            },
            ajaxPrefilter: J(uc),
            ajaxTransport: J(vc),
            ajax: function(a, b) {
                function c(a, b, c, g) {
                    var i, k, r, s, u, w = b;
                    2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (ab.lastModified[e] = u), u = v.getResponseHeader("etag"), u && (ab.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --ab.active || ab.event.trigger("ajaxStop")))
                }
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var d, e, f, g, h, i, j, k, l = ab.ajaxSetup({}, b),
                    m = l.context || l,
                    n = l.context && (m.nodeType || m.jquery) ? ab(m) : ab.event,
                    o = ab.Deferred(),
                    p = ab.Callbacks("once memory"),
                    q = l.statusCode || {},
                    r = {},
                    s = {},
                    t = 0,
                    u = "canceled",
                    v = {
                        readyState: 0,
                        getResponseHeader: function(a) {
                            var b;
                            if (2 === t) {
                                if (!g)
                                    for (g = {}; b = pc.exec(f);) g[b[1].toLowerCase()] = b[2];
                                b = g[a.toLowerCase()]
                            }
                            return null == b ? null : b
                        },
                        getAllResponseHeaders: function() {
                            return 2 === t ? f : null
                        },
                        setRequestHeader: function(a, b) {
                            var c = a.toLowerCase();
                            return t || (a = s[c] = s[c] || a, r[a] = b), this
                        },
                        overrideMimeType: function(a) {
                            return t || (l.mimeType = a), this
                        },
                        statusCode: function(a) {
                            var b;
                            if (a)
                                if (2 > t)
                                    for (b in a) q[b] = [q[b], a[b]];
                                else v.always(a[v.status]);
                            return this
                        },
                        abort: function(a) {
                            var b = a || u;
                            return d && d.abort(b), c(0, b), this
                        }
                    };
                if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || mc) + "").replace(nc, "").replace(sc, lc[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = ab.trim(l.dataType || "*").toLowerCase().match(nb) || [""], null == l.crossDomain && (i = tc.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === lc[1] && i[2] === lc[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (lc[3] || ("http:" === lc[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = ab.param(l.data, l.traditional)), K(uc, l, b, v), 2 === t) return v;
                j = l.global, j && 0 === ab.active++ && ab.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rc.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (kc.test(e) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = oc.test(e) ? e.replace(oc, "$1_=" + jc++) : e + (kc.test(e) ? "&" : "?") + "_=" + jc++)), l.ifModified && (ab.lastModified[e] && v.setRequestHeader("If-Modified-Since", ab.lastModified[e]), ab.etag[e] && v.setRequestHeader("If-None-Match", ab.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + wc + "; q=0.01" : "") : l.accepts["*"]);
                for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
                if (!l.beforeSend || l.beforeSend.call(m, v, l) !== !1 && 2 !== t) {
                    u = "abort";
                    for (k in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) v[k](l[k]);
                    if (d = K(vc, l, b, v)) {
                        v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                            v.abort("timeout")
                        }, l.timeout));
                        try {
                            t = 1, d.send(r, c)
                        } catch (w) {
                            if (!(2 > t)) throw w;
                            c(-1, w)
                        }
                    } else c(-1, "No Transport");
                    return v
                }
                return v.abort()
            },
            getJSON: function(a, b, c) {
                return ab.get(a, b, c, "json")
            },
            getScript: function(a, b) {
                return ab.get(a, void 0, b, "script")
            }
        }), ab.each(["get", "post"], function(a, b) {
            ab[b] = function(a, c, d, e) {
                return ab.isFunction(c) && (e = e || d, d = c, c = void 0), ab.ajax({
                    url: a,
                    type: b,
                    dataType: e,
                    data: c,
                    success: d
                })
            }
        }), ab.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
            ab.fn[b] = function(a) {
                return this.on(b, a)
            }
        }), ab._evalUrl = function(a) {
            return ab.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, ab.fn.extend({
            wrapAll: function(a) {
                var b;
                return ab.isFunction(a) ? this.each(function(b) {
                    ab(this).wrapAll(a.call(this, b))
                }) : (this[0] && (b = ab(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                    return a
                }).append(this)), this)
            },
            wrapInner: function(a) {
                return this.each(ab.isFunction(a) ? function(b) {
                    ab(this).wrapInner(a.call(this, b))
                } : function() {
                    var b = ab(this),
                        c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
            },
            wrap: function(a) {
                var b = ab.isFunction(a);
                return this.each(function(c) {
                    ab(this).wrapAll(b ? a.call(this, c) : a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ab.nodeName(this, "body") || ab(this).replaceWith(this.childNodes)
                }).end()
            }
        }), ab.expr.filters.hidden = function(a) {
            return a.offsetWidth <= 0 && a.offsetHeight <= 0
        }, ab.expr.filters.visible = function(a) {
            return !ab.expr.filters.hidden(a)
        };
        var yc = /%20/g,
            zc = /\[\]$/,
            Ac = /\r?\n/g,
            Bc = /^(?:submit|button|image|reset|file)$/i,
            Cc = /^(?:input|select|textarea|keygen)/i;
        ab.param = function(a, b) {
            var c, d = [],
                e = function(a, b) {
                    b = ab.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            if (void 0 === b && (b = ab.ajaxSettings && ab.ajaxSettings.traditional), ab.isArray(a) || a.jquery && !ab.isPlainObject(a)) ab.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (c in a) O(c, a[c], b, e);
            return d.join("&").replace(yc, "+")
        }, ab.fn.extend({
            serialize: function() {
                return ab.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var a = ab.prop(this, "elements");
                    return a ? ab.makeArray(a) : this
                }).filter(function() {
                    var a = this.type;
                    return this.name && !ab(this).is(":disabled") && Cc.test(this.nodeName) && !Bc.test(a) && (this.checked || !yb.test(a))
                }).map(function(a, b) {
                    var c = ab(this).val();
                    return null == c ? null : ab.isArray(c) ? ab.map(c, function(a) {
                        return {
                            name: b.name,
                            value: a.replace(Ac, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(Ac, "\r\n")
                    }
                }).get()
            }
        }), ab.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (a) {}
        };
        var Dc = 0,
            Ec = {},
            Fc = {
                0: 200,
                1223: 204
            },
            Gc = ab.ajaxSettings.xhr();
        a.ActiveXObject && ab(a).on("unload", function() {
            for (var a in Ec) Ec[a]()
        }), Z.cors = !!Gc && "withCredentials" in Gc, Z.ajax = Gc = !!Gc, ab.ajaxTransport(function(a) {
            var b;
            return Z.cors || Gc && !a.crossDomain ? {
                send: function(c, d) {
                    var e, f = a.xhr(),
                        g = ++Dc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                        for (e in a.xhrFields) f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) f.setRequestHeader(e, c[e]);
                    b = function(a) {
                        return function() {
                            b && (delete Ec[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Fc[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                                text: f.responseText
                            } : void 0, f.getAllResponseHeaders()))
                        }
                    }, f.onload = b(), f.onerror = b("error"), b = Ec[g] = b("abort"), f.send(a.hasContent && a.data || null)
                },
                abort: function() {
                    b && b()
                }
            } : void 0
        }), ab.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(a) {
                    return ab.globalEval(a), a
                }
            }
        }), ab.ajaxPrefilter("script", function(a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
        }), ab.ajaxTransport("script", function(a) {
            if (a.crossDomain) {
                var b, c;
                return {
                    send: function(d, e) {
                        b = ab("<script>").prop({
                            async: !0,
                            charset: a.scriptCharset,
                            src: a.url
                        }).on("load error", c = function(a) {
                            b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                        }), $.head.appendChild(b[0])
                    },
                    abort: function() {
                        c && c()
                    }
                }
            }
        });
        var Hc = [],
            Ic = /(=)\?(?=&|$)|\?\?/;
        ab.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var a = Hc.pop() || ab.expando + "_" + jc++;
                return this[a] = !0, a
            }
        }), ab.ajaxPrefilter("json jsonp", function(b, c, d) {
            var e, f, g, h = b.jsonp !== !1 && (Ic.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ic.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = ab.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ic, "$1" + e) : b.jsonp !== !1 && (b.url += (kc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
                return g || ab.error(e + " was not called"), g[0]
            }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
                g = arguments
            }, d.always(function() {
                a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Hc.push(e)), g && ab.isFunction(f) && f(g[0]), g = f = void 0
            }), "script") : void 0
        }), ab.parseHTML = function(a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || $;
            var d = gb.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : (d = ab.buildFragment([a], b, e), e && e.length && ab(e).remove(), ab.merge([], d.childNodes))
        };
        var Jc = ab.fn.load;
        ab.fn.load = function(a, b, c) {
            if ("string" != typeof a && Jc) return Jc.apply(this, arguments);
            var d, e, f, g = this,
                h = a.indexOf(" ");
            return h >= 0 && (d = a.slice(h), a = a.slice(0, h)), ab.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && ab.ajax({
                url: a,
                type: e,
                dataType: "html",
                data: b
            }).done(function(a) {
                f = arguments, g.html(d ? ab("<div>").append(ab.parseHTML(a)).find(d) : a)
            }).complete(c && function(a, b) {
                g.each(c, f || [a.responseText, b, a])
            }), this
        }, ab.expr.filters.animated = function(a) {
            return ab.grep(ab.timers, function(b) {
                return a === b.elem
            }).length
        };
        var Kc = a.document.documentElement;
        ab.offset = {
            setOffset: function(a, b, c) {
                var d, e, f, g, h, i, j, k = ab.css(a, "position"),
                    l = ab(a),
                    m = {};
                "static" === k && (a.style.position = "relative"), h = l.offset(), f = ab.css(a, "top"), i = ab.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ab.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
            }
        }, ab.fn.extend({
            offset: function(a) {
                if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                    ab.offset.setOffset(this, a, b)
                });
                var b, c, d = this[0],
                    e = {
                        top: 0,
                        left: 0
                    },
                    f = d && d.ownerDocument;
                return f ? (b = f.documentElement, ab.contains(b, d) ? (typeof d.getBoundingClientRect !== zb && (e = d.getBoundingClientRect()), c = P(f), {
                    top: e.top + c.pageYOffset - b.clientTop,
                    left: e.left + c.pageXOffset - b.clientLeft
                }) : e) : void 0
            },
            position: function() {
                if (this[0]) {
                    var a, b, c = this[0],
                        d = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === ab.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ab.nodeName(a[0], "html") || (d = a.offset()), d.top += ab.css(a[0], "borderTopWidth", !0), d.left += ab.css(a[0], "borderLeftWidth", !0)), {
                        top: b.top - d.top - ab.css(c, "marginTop", !0),
                        left: b.left - d.left - ab.css(c, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var a = this.offsetParent || Kc; a && !ab.nodeName(a, "html") && "static" === ab.css(a, "position");) a = a.offsetParent;
                    return a || Kc
                })
            }
        }), ab.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(b, c) {
            var d = "pageYOffset" === c;
            ab.fn[b] = function(e) {
                return qb(this, function(b, e, f) {
                    var g = P(b);
                    return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
                }, b, e, arguments.length, null)
            }
        }), ab.each(["top", "left"], function(a, b) {
            ab.cssHooks[b] = w(Z.pixelPosition, function(a, c) {
                return c ? (c = v(a, b), Qb.test(c) ? ab(a).position()[b] + "px" : c) : void 0
            })
        }), ab.each({
            Height: "height",
            Width: "width"
        }, function(a, b) {
            ab.each({
                padding: "inner" + a,
                content: b,
                "": "outer" + a
            }, function(c, d) {
                ab.fn[d] = function(d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return qb(this, function(b, c, d) {
                        var e;
                        return ab.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? ab.css(b, c, g) : ab.style(b, c, d, g)
                    }, b, f ? d : void 0, f, null)
                }
            })
        }), ab.fn.size = function() {
            return this.length
        }, ab.fn.andSelf = ab.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ab
        });
        var Lc = a.jQuery,
            Mc = a.$;
        return ab.noConflict = function(b) {
            return a.$ === ab && (a.$ = Mc), b && a.jQuery === ab && (a.jQuery = Lc), ab
        }, typeof b === zb && (a.jQuery = a.$ = ab), ab
    }),
    function() {
        var a = this,
            b = a._,
            c = {},
            d = Array.prototype,
            e = Object.prototype,
            f = Function.prototype,
            g = d.push,
            h = d.slice,
            i = d.concat,
            j = (d.unshift, e.toString),
            k = e.hasOwnProperty,
            l = d.forEach,
            m = d.map,
            n = d.reduce,
            o = d.reduceRight,
            p = d.filter,
            q = d.every,
            r = d.some,
            s = d.indexOf,
            t = d.lastIndexOf,
            u = Array.isArray,
            v = Object.keys,
            w = f.bind,
            x = function(a) {
                return a instanceof x ? a : this instanceof x ? (this._wrapped = a, void 0) : new x(a)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.4.1";
        var y = x.each = x.forEach = function(a, b, d) {
            if (l && a.forEach === l) a.forEach(b, d);
            else if (a.length === +a.length) {
                for (var e = 0, f = a.length; f > e; e++)
                    if (b.call(d, a[e], e, a) === c) return
            } else
                for (var g in a)
                    if (x.has(a, g) && b.call(d, a[g], g, a) === c) return
        };
        x.map = x.collect = function(a, b, c) {
            var d = [];
            return m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) {
                d[d.length] = b.call(c, a, e, f)
            }), d)
        }, x.reduce = x.foldl = x.inject = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (n && a.reduce === n) return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
            if (y(a, function(a, f, g) {
                e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
            }), !e) throw new TypeError("Reduce of empty array with no initial value");
            return c
        }, x.reduceRight = x.foldr = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (o && a.reduceRight === o) return d && (b = x.bind(b, d)), arguments.length > 2 ? a.reduceRight(b, c) : a.reduceRight(b);
            var f = a.length;
            if (f !== +f) {
                var g = x.keys(a);
                f = g.length
            }
            if (y(a, function(h, i, j) {
                i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
            }), !e) throw new TypeError("Reduce of empty array with no initial value");
            return c
        }, x.find = x.detect = function(a, b, c) {
            var d;
            return z(a, function(a, e, f) {
                return b.call(c, a, e, f) ? (d = a, !0) : void 0
            }), d
        }, x.filter = x.select = function(a, b, c) {
            var d = [];
            return p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) {
                b.call(c, a, e, f) && (d[d.length] = a)
            }), d)
        }, x.reject = function(a, b, c) {
            var d = [];
            return y(a, function(a, e, f) {
                b.call(c, a, e, f) || (d[d.length] = a)
            }), d
        }, x.every = x.all = function(a, b, d) {
            b || (b = x.identity);
            var e = !0;
            return q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
                return (e = e && b.call(d, a, f, g)) ? void 0 : c
            }), !!e)
        };
        var z = x.some = x.any = function(a, b, d) {
            b || (b = x.identity);
            var e = !1;
            return r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
                return e || (e = b.call(d, a, f, g)) ? c : void 0
            }), !!e)
        };
        x.contains = x.include = function(a, b) {
            var c = !1;
            return s && a.indexOf === s ? -1 != a.indexOf(b) : c = z(a, function(a) {
                return a === b
            })
        }, x.invoke = function(a, b) {
            var c = h.call(arguments, 2);
            return x.map(a, function(a) {
                return (x.isFunction(b) ? b : a[b]).apply(a, c)
            })
        }, x.pluck = function(a, b) {
            return x.map(a, function(a) {
                return a[b]
            })
        }, x.where = function(a, b) {
            return x.isEmpty(b) ? [] : x.filter(a, function(a) {
                for (var c in b)
                    if (b[c] !== a[c]) return !1;
                return !0
            })
        }, x.max = function(a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
            if (!b && x.isEmpty(a)) return -1 / 0;
            var d = {
                computed: -1 / 0
            };
            return y(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g >= d.computed && (d = {
                    value: a,
                    computed: g
                })
            }), d.value
        }, x.min = function(a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
            if (!b && x.isEmpty(a)) return 1 / 0;
            var d = {
                computed: 1 / 0
            };
            return y(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g < d.computed && (d = {
                    value: a,
                    computed: g
                })
            }), d.value
        }, x.shuffle = function(a) {
            var b, c = 0,
                d = [];
            return y(a, function(a) {
                b = x.random(c++), d[c - 1] = d[b], d[b] = a
            }), d
        };
        var A = function(a) {
            return x.isFunction(a) ? a : function(b) {
                return b[a]
            }
        };
        x.sortBy = function(a, b, c) {
            var d = A(b);
            return x.pluck(x.map(a, function(a, b, e) {
                return {
                    value: a,
                    index: b,
                    criteria: d.call(c, a, b, e)
                }
            }).sort(function(a, b) {
                var c = a.criteria,
                    d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c) return 1;
                    if (d > c || void 0 === d) return -1
                }
                return a.index < b.index ? -1 : 1
            }), "value")
        };
        var B = function(a, b, c, d) {
            var e = {},
                f = A(b);
            return y(a, function(b, g) {
                var h = f.call(c, b, g, a);
                d(e, h, b)
            }), e
        };
        x.groupBy = function(a, b, c) {
            return B(a, b, c, function(a, b, c) {
                (x.has(a, b) ? a[b] : a[b] = []).push(c)
            })
        }, x.countBy = function(a, b, c) {
            return B(a, b, c, function(a, b) {
                x.has(a, b) || (a[b] = 0), a[b]++
            })
        }, x.sortedIndex = function(a, b, c, d) {
            c = null == c ? x.identity : A(c);
            for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                var h = f + g >>> 1;
                c.call(d, a[h]) < e ? f = h + 1 : g = h
            }
            return f
        }, x.toArray = function(a) {
            return a ? a.length === +a.length ? h.call(a) : x.values(a) : []
        }, x.size = function(a) {
            return a.length === +a.length ? a.length : x.keys(a).length
        }, x.first = x.head = x.take = function(a, b, c) {
            return null == b || c ? a[0] : h.call(a, 0, b)
        }, x.initial = function(a, b, c) {
            return h.call(a, 0, a.length - (null == b || c ? 1 : b))
        }, x.last = function(a, b, c) {
            return null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
        }, x.rest = x.tail = x.drop = function(a, b, c) {
            return h.call(a, null == b || c ? 1 : b)
        }, x.compact = function(a) {
            return x.filter(a, function(a) {
                return !!a
            })
        };
        var C = function(a, b, c) {
            return y(a, function(a) {
                x.isArray(a) ? b ? g.apply(c, a) : C(a, b, c) : c.push(a)
            }), c
        };
        x.flatten = function(a, b) {
            return C(a, b, [])
        }, x.without = function(a) {
            return x.difference(a, h.call(arguments, 1))
        }, x.uniq = x.unique = function(a, b, c, d) {
            var e = c ? x.map(a, c, d) : a,
                f = [],
                g = [];
            return y(e, function(c, d) {
                (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]))
            }), f
        }, x.union = function() {
            return x.uniq(i.apply(d, arguments))
        }, x.intersection = function(a) {
            var b = h.call(arguments, 1);
            return x.filter(x.uniq(a), function(a) {
                return x.every(b, function(b) {
                    return x.indexOf(b, a) >= 0
                })
            })
        }, x.difference = function(a) {
            var b = i.apply(d, h.call(arguments, 1));
            return x.filter(a, function(a) {
                return !x.contains(b, a)
            })
        }, x.zip = function() {
            for (var a = h.call(arguments), b = x.max(x.pluck(a, "length")), c = new Array(b), d = 0; b > d; d++) c[d] = x.pluck(a, "" + d);
            return c
        }, x.object = function(a, b) {
            for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c
        }, x.indexOf = function(a, b, c) {
            var d = 0,
                e = a.length;
            if (c) {
                if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
                d = 0 > c ? Math.max(0, e + c) : c
            }
            if (s && a.indexOf === s) return a.indexOf(b, c);
            for (; e > d; d++)
                if (a[d] === b) return d;
            return -1
        }, x.lastIndexOf = function(a, b, c) {
            var d = null != c;
            if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
            for (var e = d ? c : a.length; e--;)
                if (a[e] === b) return e;
            return -1
        }, x.range = function(a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a, a += c;
            return f
        };
        var D = function() {};
        x.bind = function(a, b) {
            var c, d;
            if (a.bind === w && w) return w.apply(a, h.call(arguments, 1));
            if (!x.isFunction(a)) throw new TypeError;
            return d = h.call(arguments, 2), c = function() {
                if (this instanceof c) {
                    D.prototype = a.prototype;
                    var e = new D,
                        f = a.apply(e, d.concat(h.call(arguments)));
                    return Object(f) === f ? f : e
                }
                return a.apply(b, d.concat(h.call(arguments)))
            }
        }, x.bindAll = function(a) {
            var b = h.call(arguments, 1);
            return 0 == b.length && (b = x.functions(a)), y(b, function(b) {
                a[b] = x.bind(a[b], a)
            }), a
        }, x.memoize = function(a, b) {
            var c = {};
            return b || (b = x.identity),
                function() {
                    var d = b.apply(this, arguments);
                    return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
                }
        }, x.delay = function(a, b) {
            var c = h.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, c)
            }, b)
        }, x.defer = function(a) {
            return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
        }, x.throttle = function(a, b) {
            var c, d, e, f, g, h, i = x.debounce(function() {
                g = f = !1
            }, b);
            return function() {
                c = this, d = arguments;
                var j = function() {
                    e = null, g && (h = a.apply(c, d)), i()
                };
                return e || (e = setTimeout(j, b)), f ? g = !0 : (f = !0, h = a.apply(c, d)), i(), h
            }
        }, x.debounce = function(a, b, c) {
            var d, e;
            return function() {
                var f = this,
                    g = arguments,
                    h = function() {
                        d = null, c || (e = a.apply(f, g))
                    },
                    i = c && !d;
                return clearTimeout(d), d = setTimeout(h, b), i && (e = a.apply(f, g)), e
            }
        }, x.once = function(a) {
            var b, c = !1;
            return function() {
                return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
            }
        }, x.wrap = function(a, b) {
            return function() {
                var c = [a];
                return g.apply(c, arguments), b.apply(this, c)
            }
        }, x.compose = function() {
            var a = arguments;
            return function() {
                for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                return b[0]
            }
        }, x.after = function(a, b) {
            return 0 >= a ? b() : function() {
                return --a < 1 ? b.apply(this, arguments) : void 0
            }
        }, x.keys = v || function(a) {
            if (a !== Object(a)) throw new TypeError("Invalid object");
            var b = [];
            for (var c in a) x.has(a, c) && (b[b.length] = c);
            return b
        }, x.values = function(a) {
            var b = [];
            for (var c in a) x.has(a, c) && b.push(a[c]);
            return b
        }, x.pairs = function(a) {
            var b = [];
            for (var c in a) x.has(a, c) && b.push([c, a[c]]);
            return b
        }, x.invert = function(a) {
            var b = {};
            for (var c in a) x.has(a, c) && (b[a[c]] = c);
            return b
        }, x.functions = x.methods = function(a) {
            var b = [];
            for (var c in a) x.isFunction(a[c]) && b.push(c);
            return b.sort()
        }, x.extend = function(a) {
            return y(h.call(arguments, 1), function(b) {
                for (var c in b) a[c] = b[c]
            }), a
        }, x.pick = function(a) {
            var b = {},
                c = i.apply(d, h.call(arguments, 1));
            return y(c, function(c) {
                c in a && (b[c] = a[c])
            }), b
        }, x.omit = function(a) {
            var b = {},
                c = i.apply(d, h.call(arguments, 1));
            for (var e in a) x.contains(c, e) || (b[e] = a[e]);
            return b
        }, x.defaults = function(a) {
            return y(h.call(arguments, 1), function(b) {
                for (var c in b) null == a[c] && (a[c] = b[c])
            }), a
        }, x.clone = function(a) {
            return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
        }, x.tap = function(a, b) {
            return b(a), a
        };
        var E = function(a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
            var e = j.call(a);
            if (e != j.call(b)) return !1;
            switch (e) {
                case "[object String]":
                    return a == String(b);
                case "[object Number]":
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a == +b;
                case "[object RegExp]":
                    return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
            }
            if ("object" != typeof a || "object" != typeof b) return !1;
            for (var f = c.length; f--;)
                if (c[f] == a) return d[f] == b;
            c.push(a), d.push(b);
            var g = 0,
                h = !0;
            if ("[object Array]" == e) {
                if (g = a.length, h = g == b.length)
                    for (; g-- && (h = E(a[g], b[g], c, d)););
            } else {
                var i = a.constructor,
                    k = b.constructor;
                if (i !== k && !(x.isFunction(i) && i instanceof i && x.isFunction(k) && k instanceof k)) return !1;
                for (var l in a)
                    if (x.has(a, l) && (g++, !(h = x.has(b, l) && E(a[l], b[l], c, d)))) break;
                if (h) {
                    for (l in b)
                        if (x.has(b, l) && !g--) break;
                    h = !g
                }
            }
            return c.pop(), d.pop(), h
        };
        x.isEqual = function(a, b) {
            return E(a, b, [], [])
        }, x.isEmpty = function(a) {
            if (null == a) return !0;
            if (x.isArray(a) || x.isString(a)) return 0 === a.length;
            for (var b in a)
                if (x.has(a, b)) return !1;
            return !0
        }, x.isElement = function(a) {
            return !!a && 1 === a.nodeType
        }, x.isArray = u || function(a) {
            return "[object Array]" == j.call(a)
        }, x.isObject = function(a) {
            return a === Object(a)
        }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
            x["is" + a] = function(b) {
                return j.call(b) == "[object " + a + "]"
            }
        }), x.isArguments(arguments) || (x.isArguments = function(a) {
            return !!a && !!x.has(a, "callee")
        }), "function" != typeof / . / && (x.isFunction = function(a) {
            return "function" == typeof a
        }), x.isFinite = function(a) {
            return x.isNumber(a) && isFinite(a)
        }, x.isNaN = function(a) {
            return x.isNumber(a) && a != +a
        }, x.isBoolean = function(a) {
            return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
        }, x.isNull = function(a) {
            return null === a
        }, x.isUndefined = function(a) {
            return void 0 === a
        }, x.has = function(a, b) {
            return k.call(a, b)
        }, x.noConflict = function() {
            return a._ = b, this
        }, x.identity = function(a) {
            return a
        }, x.times = function(a, b, c) {
            for (var d = 0; a > d; d++) b.call(c, d)
        }, x.random = function(a, b) {
            return null == b && (b = a, a = 0), a + (0 | Math.random() * (b - a + 1))
        };
        var F = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        F.unescape = x.invert(F.escape);
        var G = {
            escape: new RegExp("[" + x.keys(F.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + x.keys(F.unescape).join("|") + ")", "g")
        };
        x.each(["escape", "unescape"], function(a) {
            x[a] = function(b) {
                return null == b ? "" : ("" + b).replace(G[a], function(b) {
                    return F[a][b]
                })
            }
        }), x.result = function(a, b) {
            if (null == a) return null;
            var c = a[b];
            return x.isFunction(c) ? c.call(a) : c
        }, x.mixin = function(a) {
            y(x.functions(a), function(b) {
                var c = x[b] = a[b];
                x.prototype[b] = function() {
                    var a = [this._wrapped];
                    return g.apply(a, arguments), L.call(this, c.apply(x, a))
                }
            })
        };
        var H = 0;
        x.uniqueId = function(a) {
            var b = H++;
            return a ? a + b : b
        }, x.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var I = /(.)^/,
            J = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "	": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            K = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(a, b, c) {
            c = x.defaults({}, c, x.templateSettings);
            var d = new RegExp([(c.escape || I).source, (c.interpolate || I).source, (c.evaluate || I).source].join("|") + "|$", "g"),
                e = 0,
                f = "__p+='";
            a.replace(d, function(b, c, d, g, h) {
                f += a.slice(e, h).replace(K, function(a) {
                    return "\\" + J[a]
                }), f += c ? "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g ? "';\n" + g + "\n__p+='" : "", e = h + b.length
            }), f += "';\n", c.variable || (f = "with(obj||{}){\n" + f + "}\n"), f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
            try {
                var g = new Function(c.variable || "obj", "_", f)
            } catch (h) {
                throw h.source = f, h
            }
            if (b) return g(b, x);
            var i = function(a) {
                return g.call(this, a, x)
            };
            return i.source = "function(" + (c.variable || "obj") + "){\n" + f + "}", i
        }, x.chain = function(a) {
            return x(a).chain()
        };
        var L = function(a) {
            return this._chain ? x(a).chain() : a
        };
        x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
            var b = d[a];
            x.prototype[a] = function() {
                var c = this._wrapped;
                return b.apply(c, arguments), ("shift" == a || "splice" == a) && 0 === c.length && delete c[0], L.call(this, c)
            }
        }), y(["concat", "join", "slice"], function(a) {
            var b = d[a];
            x.prototype[a] = function() {
                return L.call(this, b.apply(this._wrapped, arguments))
            }
        }), x.extend(x.prototype, {
            chain: function() {
                return this._chain = !0, this
            },
            value: function() {
                return this._wrapped
            }
        }), "function" == typeof define && define.amd && define("underscore", [], function() {
            return x
        })
    }.call(this),
    function() {
        {
            var a, b = this,
                c = b.Backbone,
                d = [],
                e = (d.push, d.slice);
            d.splice
        }
        a = "undefined" != typeof exports ? exports : b.Backbone = {}, a.VERSION = "1.1.0";
        var f = b._;
        !f && "undefined" != typeof require && (f = require("underscore")), a.$ = b.jQuery || b.Zepto || b.ender || b.$, a.noConflict = function() {
            return b.Backbone = c, this
        }, a.emulateHTTP = !1, a.emulateJSON = !1;
        var g = a.Events = {
                on: function(a, b, c) {
                    if (!i(this, "on", a, [b, c]) || !b) return this;
                    this._events || (this._events = {});
                    var d = this._events[a] || (this._events[a] = []);
                    return d.push({
                        callback: b,
                        context: c,
                        ctx: c || this
                    }), this
                },
                once: function(a, b, c) {
                    if (!i(this, "once", a, [b, c]) || !b) return this;
                    var d = this,
                        e = f.once(function() {
                            d.off(a, e), b.apply(this, arguments)
                        });
                    return e._callback = b, this.on(a, e, c)
                },
                off: function(a, b, c) {
                    var d, e, g, h, j, k, l, m;
                    if (!this._events || !i(this, "off", a, [b, c])) return this;
                    if (!a && !b && !c) return this._events = {}, this;
                    for (h = a ? [a] : f.keys(this._events), j = 0, k = h.length; k > j; j++)
                        if (a = h[j], g = this._events[a]) {
                            if (this._events[a] = d = [], b || c)
                                for (l = 0, m = g.length; m > l; l++) e = g[l], (b && b !== e.callback && b !== e.callback._callback || c && c !== e.context) && d.push(e);
                            d.length || delete this._events[a]
                        }
                    return this
                },
                trigger: function(a) {
                    if (!this._events) return this;
                    var b = e.call(arguments, 1);
                    if (!i(this, "trigger", a, b)) return this;
                    var c = this._events[a],
                        d = this._events.all;
                    return c && j(c, b), d && j(d, arguments), this
                },
                stopListening: function(a, b, c) {
                    var d = this._listeningTo;
                    if (!d) return this;
                    var e = !b && !c;
                    !c && "object" == typeof b && (c = this), a && ((d = {})[a._listenId] = a);
                    for (var g in d) a = d[g], a.off(b, c, this), (e || f.isEmpty(a._events)) && delete this._listeningTo[g];
                    return this
                }
            },
            h = /\s+/,
            i = function(a, b, c, d) {
                if (!c) return !0;
                if ("object" == typeof c) {
                    for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
                    return !1
                }
                if (h.test(c)) {
                    for (var f = c.split(h), g = 0, i = f.length; i > g; g++) a[b].apply(a, [f[g]].concat(d));
                    return !1
                }
                return !0
            },
            j = function(a, b) {
                var c, d = -1,
                    e = a.length,
                    f = b[0],
                    g = b[1],
                    h = b[2];
                switch (b.length) {
                    case 0:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx);
                        return;
                    case 1:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f);
                        return;
                    case 2:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g);
                        return;
                    case 3:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g, h);
                        return;
                    default:
                        for (; ++d < e;)(c = a[d]).callback.apply(c.ctx, b)
                }
            },
            k = {
                listenTo: "on",
                listenToOnce: "once"
            };
        f.each(k, function(a, b) {
            g[b] = function(b, c, d) {
                var e = this._listeningTo || (this._listeningTo = {}),
                    g = b._listenId || (b._listenId = f.uniqueId("l"));
                return e[g] = b, !d && "object" == typeof c && (d = this), b[a](c, d, this), this
            }
        }), g.bind = g.on, g.unbind = g.off, f.extend(a, g);
        var l = a.Model = function(a, b) {
            var c = a || {};
            b || (b = {}), this.cid = f.uniqueId("c"), this.attributes = {}, b.collection && (this.collection = b.collection), b.parse && (c = this.parse(c, b) || {}), c = f.defaults({}, c, f.result(this, "defaults")), this.set(c, b), this.changed = {}, this.initialize.apply(this, arguments)
        };
        f.extend(l.prototype, g, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function() {
                return f.clone(this.attributes)
            },
            sync: function() {
                return a.sync.apply(this, arguments)
            },
            get: function(a) {
                return this.attributes[a]
            },
            escape: function(a) {
                return f.escape(this.get(a))
            },
            has: function(a) {
                return null != this.get(a)
            },
            set: function(a, b, c) {
                var d, e, g, h, i, j, k, l;
                if (null == a) return this;
                if ("object" == typeof a ? (e = a, c = b) : (e = {})[a] = b, c || (c = {}), !this._validate(e, c)) return !1;
                g = c.unset, i = c.silent, h = [], j = this._changing, this._changing = !0, j || (this._previousAttributes = f.clone(this.attributes), this.changed = {}), l = this.attributes, k = this._previousAttributes, this.idAttribute in e && (this.id = e[this.idAttribute]);
                for (d in e) b = e[d], f.isEqual(l[d], b) || h.push(d), f.isEqual(k[d], b) ? delete this.changed[d] : this.changed[d] = b, g ? delete l[d] : l[d] = b;
                if (!i) {
                    h.length && (this._pending = !0);
                    for (var m = 0, n = h.length; n > m; m++) this.trigger("change:" + h[m], this, l[h[m]], c)
                }
                if (j) return this;
                if (!i)
                    for (; this._pending;) this._pending = !1, this.trigger("change", this, c);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(a, b) {
                return this.set(a, void 0, f.extend({}, b, {
                    unset: !0
                }))
            },
            clear: function(a) {
                var b = {};
                for (var c in this.attributes) b[c] = void 0;
                return this.set(b, f.extend({}, a, {
                    unset: !0
                }))
            },
            hasChanged: function(a) {
                return null == a ? !f.isEmpty(this.changed) : f.has(this.changed, a)
            },
            changedAttributes: function(a) {
                if (!a) return this.hasChanged() ? f.clone(this.changed) : !1;
                var b, c = !1,
                    d = this._changing ? this._previousAttributes : this.attributes;
                for (var e in a) f.isEqual(d[e], b = a[e]) || ((c || (c = {}))[e] = b);
                return c
            },
            previous: function(a) {
                return null != a && this._previousAttributes ? this._previousAttributes[a] : null
            },
            previousAttributes: function() {
                return f.clone(this._previousAttributes)
            },
            fetch: function(a) {
                a = a ? f.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
                var b = this,
                    c = a.success;
                return a.success = function(d) {
                    return b.set(b.parse(d, a), a) ? (c && c(b, d, a), b.trigger("sync", b, d, a), void 0) : !1
                }, K(this, a), this.sync("read", this, a)
            },
            save: function(a, b, c) {
                var d, e, g, h = this.attributes;
                if (null == a || "object" == typeof a ? (d = a, c = b) : (d = {})[a] = b, c = f.extend({
                    validate: !0
                }, c), d && !c.wait) {
                    if (!this.set(d, c)) return !1
                } else if (!this._validate(d, c)) return !1;
                d && c.wait && (this.attributes = f.extend({}, h, d)), void 0 === c.parse && (c.parse = !0);
                var i = this,
                    j = c.success;
                return c.success = function(a) {
                    i.attributes = h;
                    var b = i.parse(a, c);
                    return c.wait && (b = f.extend(d || {}, b)), f.isObject(b) && !i.set(b, c) ? !1 : (j && j(i, a, c), i.trigger("sync", i, a, c), void 0)
                }, K(this, c), e = this.isNew() ? "create" : c.patch ? "patch" : "update", "patch" === e && (c.attrs = d), g = this.sync(e, this, c), d && c.wait && (this.attributes = h), g
            },
            destroy: function(a) {
                a = a ? f.clone(a) : {};
                var b = this,
                    c = a.success,
                    d = function() {
                        b.trigger("destroy", b, b.collection, a)
                    };
                if (a.success = function(e) {
                    (a.wait || b.isNew()) && d(), c && c(b, e, a), b.isNew() || b.trigger("sync", b, e, a)
                }, this.isNew()) return a.success(), !1;
                K(this, a);
                var e = this.sync("delete", this, a);
                return a.wait || d(), e
            },
            url: function() {
                var a = f.result(this, "urlRoot") || f.result(this.collection, "url") || J();
                return this.isNew() ? a : a + ("/" === a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(a) {
                return a
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return null == this.id
            },
            isValid: function(a) {
                return this._validate({}, f.extend(a || {}, {
                    validate: !0
                }))
            },
            _validate: function(a, b) {
                if (!b.validate || !this.validate) return !0;
                a = f.extend({}, this.attributes, a);
                var c = this.validationError = this.validate(a, b) || null;
                return c ? (this.trigger("invalid", this, c, f.extend(b, {
                    validationError: c
                })), !1) : !0
            }
        });
        var m = ["keys", "values", "pairs", "invert", "pick", "omit"];
        f.each(m, function(a) {
            l.prototype[a] = function() {
                var b = e.call(arguments);
                return b.unshift(this.attributes), f[a].apply(f, b)
            }
        });
        var n = a.Collection = function(a, b) {
                b || (b = {}), b.model && (this.model = b.model), void 0 !== b.comparator && (this.comparator = b.comparator), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, f.extend({
                    silent: !0
                }, b))
            },
            o = {
                add: !0,
                remove: !0,
                merge: !0
            },
            p = {
                add: !0,
                remove: !1
            };
        f.extend(n.prototype, g, {
            model: l,
            initialize: function() {},
            toJSON: function(a) {
                return this.map(function(b) {
                    return b.toJSON(a)
                })
            },
            sync: function() {
                return a.sync.apply(this, arguments)
            },
            add: function(a, b) {
                return this.set(a, f.extend({
                    merge: !1
                }, b, p))
            },
            remove: function(a, b) {
                var c = !f.isArray(a);
                a = c ? [a] : f.clone(a), b || (b = {});
                var d, e, g, h;
                for (d = 0, e = a.length; e > d; d++) h = a[d] = this.get(a[d]), h && (delete this._byId[h.id], delete this._byId[h.cid], g = this.indexOf(h), this.models.splice(g, 1), this.length--, b.silent || (b.index = g, h.trigger("remove", h, this, b)), this._removeReference(h));
                return c ? a[0] : a
            },
            set: function(a, b) {
                b = f.defaults({}, b, o), b.parse && (a = this.parse(a, b));
                var c = !f.isArray(a);
                a = c ? a ? [a] : [] : f.clone(a);
                var d, e, g, h, i, j, k, m = b.at,
                    n = this.model,
                    p = this.comparator && null == m && b.sort !== !1,
                    q = f.isString(this.comparator) ? this.comparator : null,
                    r = [],
                    s = [],
                    t = {},
                    u = b.add,
                    v = b.merge,
                    w = b.remove,
                    x = !p && u && w ? [] : !1;
                for (d = 0, e = a.length; e > d; d++) {
                    if (i = a[d], g = i instanceof l ? h = i : i[n.prototype.idAttribute], j = this.get(g)) w && (t[j.cid] = !0), v && (i = i === h ? h.attributes : i, b.parse && (i = j.parse(i, b)), j.set(i, b), p && !k && j.hasChanged(q) && (k = !0)), a[d] = j;
                    else if (u) {
                        if (h = a[d] = this._prepareModel(i, b), !h) continue;
                        r.push(h), h.on("all", this._onModelEvent, this), this._byId[h.cid] = h, null != h.id && (this._byId[h.id] = h)
                    }
                    x && x.push(j || h)
                }
                if (w) {
                    for (d = 0, e = this.length; e > d; ++d) t[(h = this.models[d]).cid] || s.push(h);
                    s.length && this.remove(s, b)
                }
                if (r.length || x && x.length)
                    if (p && (k = !0), this.length += r.length, null != m)
                        for (d = 0, e = r.length; e > d; d++) this.models.splice(m + d, 0, r[d]);
                    else {
                        x && (this.models.length = 0);
                        var y = x || r;
                        for (d = 0, e = y.length; e > d; d++) this.models.push(y[d])
                    }
                if (k && this.sort({
                    silent: !0
                }), !b.silent) {
                    for (d = 0, e = r.length; e > d; d++)(h = r[d]).trigger("add", h, this, b);
                    (k || x && x.length) && this.trigger("sort", this, b)
                }
                return c ? a[0] : a
            },
            reset: function(a, b) {
                b || (b = {});
                for (var c = 0, d = this.models.length; d > c; c++) this._removeReference(this.models[c]);
                return b.previousModels = this.models, this._reset(), a = this.add(a, f.extend({
                    silent: !0
                }, b)), b.silent || this.trigger("reset", this, b), a
            },
            push: function(a, b) {
                return this.add(a, f.extend({
                    at: this.length
                }, b))
            },
            pop: function(a) {
                var b = this.at(this.length - 1);
                return this.remove(b, a), b
            },
            unshift: function(a, b) {
                return this.add(a, f.extend({
                    at: 0
                }, b))
            },
            shift: function(a) {
                var b = this.at(0);
                return this.remove(b, a), b
            },
            slice: function() {
                return e.apply(this.models, arguments)
            },
            get: function(a) {
                return null == a ? void 0 : this._byId[a.id] || this._byId[a.cid] || this._byId[a]
            },
            at: function(a) {
                return this.models[a]
            },
            where: function(a, b) {
                return f.isEmpty(a) ? b ? void 0 : [] : this[b ? "find" : "filter"](function(b) {
                    for (var c in a)
                        if (a[c] !== b.get(c)) return !1;
                    return !0
                })
            },
            findWhere: function(a) {
                return this.where(a, !0)
            },
            sort: function(a) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return a || (a = {}), f.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(f.bind(this.comparator, this)), a.silent || this.trigger("sort", this, a), this
            },
            pluck: function(a) {
                return f.invoke(this.models, "get", a)
            },
            fetch: function(a) {
                a = a ? f.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
                var b = a.success,
                    c = this;
                return a.success = function(d) {
                    var e = a.reset ? "reset" : "set";
                    c[e](d, a), b && b(c, d, a), c.trigger("sync", c, d, a)
                }, K(this, a), this.sync("read", this, a)
            },
            create: function(a, b) {
                if (b = b ? f.clone(b) : {}, !(a = this._prepareModel(a, b))) return !1;
                b.wait || this.add(a, b);
                var c = this,
                    d = b.success;
                return b.success = function(a, b, e) {
                    e.wait && c.add(a, e), d && d(a, b, e)
                }, a.save(null, b), a
            },
            parse: function(a) {
                return a
            },
            clone: function() {
                return new this.constructor(this.models)
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(a, b) {
                if (a instanceof l) return a.collection || (a.collection = this), a;
                b = b ? f.clone(b) : {}, b.collection = this;
                var c = new this.model(a, b);
                return c.validationError ? (this.trigger("invalid", this, c.validationError, b), !1) : c
            },
            _removeReference: function(a) {
                this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(a, b, c, d) {
                ("add" !== a && "remove" !== a || c === this) && ("destroy" === a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], null != b.id && (this._byId[b.id] = b)), this.trigger.apply(this, arguments))
            }
        });
        var q = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
        f.each(q, function(a) {
            n.prototype[a] = function() {
                var b = e.call(arguments);
                return b.unshift(this.models), f[a].apply(f, b)
            }
        });
        var r = ["groupBy", "countBy", "sortBy"];
        f.each(r, function(a) {
            n.prototype[a] = function(b, c) {
                var d = f.isFunction(b) ? b : function(a) {
                    return a.get(b)
                };
                return f[a](this.models, d, c)
            }
        });
        var s = a.View = function(a) {
                this.cid = f.uniqueId("view"), a || (a = {}), f.extend(this, f.pick(a, u)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            t = /^(\S+)\s*(.*)$/,
            u = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        f.extend(s.prototype, g, {
            tagName: "div",
            $: function(a) {
                return this.$el.find(a)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function(b, c) {
                return this.$el && this.undelegateEvents(), this.$el = b instanceof a.$ ? b : a.$(b), this.el = this.$el[0], c !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function(a) {
                if (!a && !(a = f.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var b in a) {
                    var c = a[b];
                    if (f.isFunction(c) || (c = this[a[b]]), c) {
                        var d = b.match(t),
                            e = d[1],
                            g = d[2];
                        c = f.bind(c, this), e += ".delegateEvents" + this.cid, "" === g ? this.$el.on(e, c) : this.$el.on(e, g, c)
                    }
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _ensureElement: function() {
                if (this.el) this.setElement(f.result(this, "el"), !1);
                else {
                    var b = f.extend({}, f.result(this, "attributes"));
                    this.id && (b.id = f.result(this, "id")), this.className && (b["class"] = f.result(this, "className"));
                    var c = a.$("<" + f.result(this, "tagName") + ">").attr(b);
                    this.setElement(c, !1)
                }
            }
        }), a.sync = function(b, c, d) {
            var e = w[b];
            f.defaults(d || (d = {}), {
                emulateHTTP: a.emulateHTTP,
                emulateJSON: a.emulateJSON
            });
            var g = {
                type: e,
                dataType: "json"
            };
            if (d.url || (g.url = f.result(c, "url") || J()), null == d.data && c && ("create" === b || "update" === b || "patch" === b) && (g.contentType = "application/json", g.data = JSON.stringify(d.attrs || c.toJSON(d))), d.emulateJSON && (g.contentType = "application/x-www-form-urlencoded", g.data = g.data ? {
                model: g.data
            } : {}), d.emulateHTTP && ("PUT" === e || "DELETE" === e || "PATCH" === e)) {
                g.type = "POST", d.emulateJSON && (g.data._method = e);
                var h = d.beforeSend;
                d.beforeSend = function(a) {
                    return a.setRequestHeader("X-HTTP-Method-Override", e), h ? h.apply(this, arguments) : void 0
                }
            }
            "GET" !== g.type && !d.emulateJSON && (g.processData = !1), "PATCH" === g.type && v && (g.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var i = d.xhr = a.ajax(f.extend(g, d));
            return c.trigger("request", c, i, d), i
        };
        var v = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
            w = {
                create: "POST",
                update: "PUT",
                patch: "PATCH",
                "delete": "DELETE",
                read: "GET"
            };
        a.ajax = function() {
            return a.$.ajax.apply(a.$, arguments)
        };
        var x = a.Router = function(a) {
                a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            y = /\((.*?)\)/g,
            z = /(\(\?)?:\w+/g,
            A = /\*\w+/g,
            B = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        f.extend(x.prototype, g, {
            initialize: function() {},
            route: function(b, c, d) {
                f.isRegExp(b) || (b = this._routeToRegExp(b)), f.isFunction(c) && (d = c, c = ""), d || (d = this[c]);
                var e = this;
                return a.history.route(b, function(f) {
                    var g = e._extractParameters(b, f);
                    d && d.apply(e, g), e.trigger.apply(e, ["route:" + c].concat(g)), e.trigger("route", c, g), a.history.trigger("route", e, c, g)
                }), this
            },
            navigate: function(b, c) {
                return a.history.navigate(b, c), this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = f.result(this, "routes");
                    for (var a, b = f.keys(this.routes); null != (a = b.pop());) this.route(a, this.routes[a])
                }
            },
            _routeToRegExp: function(a) {
                return a = a.replace(B, "\\$&").replace(y, "(?:$1)?").replace(z, function(a, b) {
                    return b ? a : "([^/]+)"
                }).replace(A, "(.*?)"), new RegExp("^" + a + "$")
            },
            _extractParameters: function(a, b) {
                var c = a.exec(b).slice(1);
                return f.map(c, function(a) {
                    return a ? decodeURIComponent(a) : null
                })
            }
        });
        var C = a.History = function() {
                this.handlers = [], f.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            D = /^[#\/]|\s+$/g,
            E = /^\/+|\/+$/g,
            F = /msie [\w.]+/,
            G = /\/$/,
            H = /[?#].*$/;
        C.started = !1, f.extend(C.prototype, g, {
            interval: 50,
            getHash: function(a) {
                var b = (a || this).location.href.match(/#(.*)$/);
                return b ? b[1] : ""
            },
            getFragment: function(a, b) {
                if (null == a)
                    if (this._hasPushState || !this._wantsHashChange || b) {
                        a = this.location.pathname;
                        var c = this.root.replace(G, "");
                        a.indexOf(c) || (a = a.slice(c.length))
                    } else a = this.getHash();
                return a.replace(D, "")
            },
            start: function(b) {
                if (C.started) throw new Error("Backbone.history has already been started");
                C.started = !0, this.options = f.extend({
                    root: "/"
                }, this.options, b), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var c = this.getFragment(),
                    d = document.documentMode,
                    e = F.exec(navigator.userAgent.toLowerCase()) && (!d || 7 >= d);
                this.root = ("/" + this.root + "/").replace(E, "/"), e && this._wantsHashChange && (this.iframe = a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(c)), this._hasPushState ? a.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !e ? a.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = c;
                var g = this.location,
                    h = g.pathname.replace(/[^\/]$/, "$&/") === this.root;
                if (this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !h) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                    this._hasPushState && h && g.hash && (this.fragment = this.getHash().replace(D, ""), this.history.replaceState({}, document.title, this.root + this.fragment + g.search))
                }
                return this.options.silent ? void 0 : this.loadUrl()
            },
            stop: function() {
                a.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), C.started = !1
            },
            route: function(a, b) {
                this.handlers.unshift({
                    route: a,
                    callback: b
                })
            },
            checkUrl: function() {
                var a = this.getFragment();
                return a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe))), a === this.fragment ? !1 : (this.iframe && this.navigate(a), this.loadUrl(), void 0)
            },
            loadUrl: function(a) {
                return a = this.fragment = this.getFragment(a), f.any(this.handlers, function(b) {
                    return b.route.test(a) ? (b.callback(a), !0) : void 0
                })
            },
            navigate: function(a, b) {
                if (!C.started) return !1;
                b && b !== !0 || (b = {
                    trigger: !!b
                });
                var c = this.root + (a = this.getFragment(a || ""));
                if (a = a.replace(H, ""), this.fragment !== a) {
                    if (this.fragment = a, "" === a && "/" !== c && (c = c.slice(0, -1)), this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(c);
                        this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, a, b.replace))
                    }
                    return b.trigger ? this.loadUrl(a) : void 0
                }
            },
            _updateHash: function(a, b, c) {
                if (c) {
                    var d = a.href.replace(/(javascript:|#).*$/, "");
                    a.replace(d + "#" + b)
                } else a.hash = "#" + b
            }
        }), a.history = new C;
        var I = function(a, b) {
            var c, d = this;
            c = a && f.has(a, "constructor") ? a.constructor : function() {
                return d.apply(this, arguments)
            }, f.extend(c, d, b);
            var e = function() {
                this.constructor = c
            };
            return e.prototype = d.prototype, c.prototype = new e, a && f.extend(c.prototype, a), c.__super__ = d.prototype, c
        };
        l.extend = n.extend = x.extend = s.extend = C.extend = I;
        var J = function() {
                throw new Error('A "url" property or function must be specified')
            },
            K = function(a, b) {
                var c = b.error;
                b.error = function(d) {
                    c && c(a, d, b), a.trigger("error", a, d, b)
                }
            }
    }.call(this), define("backbone", function() {}), define("utils/Utils", [], function() {
        var a = {
            siteHost: window.location.host + "/",
            cleanUrl: function(a) {
                return a.indexOf(this.siteHost) > -1 ? a.split(this.siteHost)[1] : a
            },
            setTimestamp: function(a) {
                return a = a.split(" "), new Date(a[0], a[1] - 1, a[2]).getTime()
            },
            setColor: function(a, b, c) {
                var d = a.data("color");
                c = c ? " no-bg-transition" : "", a.removeClass(d).addClass(b + c), a.data("color", b)
            },
            getAnchorFromUrl: function(a, b) {
                if (0 === b.length) return null;
                b = "/" + b;
                for (var c = a.length; --c > -1;)
                    if (a[c].href.indexOf(b) >= 0) return a[c];
                return null
            }
        };
        return a
    }), define("views/HeaderView", ["jquery", "underscore", "utils/Utils"], function(a, b, c) {
        var d = Backbone.View.extend({
            $win: null,
            $htmlBody: null,
            $body: null,
            $siteBlock: null,
            $pages: null,
            $buttons: null,
            pages: null,
            buttons: null,
            isOpen: null,
            lastPage: null,
            currentUrl: null,
            events: {
                "click .logo": "onLogoClicked"
            },
            initialize: function() {
                b.bindAll(this, "onSiteBlockClicked", "onLogoClicked", "onLinkClicked"), this.$win = this.model.get("$win"), this.$htmlBody = this.model.get("$htmlBody"), this.$body = this.model.get("$body"), this.$siteBlock = this.model.get("$siteBlock"), this.$pages = this.$el.find(".page"), this.$buttons = this.$el.find(".links a"), this.$siteBlock.on("click", this.onSiteBlockClicked), this.pages = {};
                for (var d = this.$pages.length; --d > -1;) this.pages[this.$pages[d].id] = a(this.$pages[d]);
                this.buttons = {};
                var e;
                for (d = this.$buttons.length; --d > -1;) e = c.cleanUrl(this.$buttons[d].href), this.buttons[e] = a(this.$buttons[d])
            },
            open: function(a, c, d) {
                var e = d ? "no-transition" : "";
                this.$buttons.removeClass("selected"), this.buttons[a].addClass("selected " + e), this.$pages.removeClass("show"), this.pages["/" + a].addClass("show"), this.isOpen || (this.lastPage = c, window.requestAnimationFrame(b.bind(function() {
                    this.$body.addClass("showheader"), d && this.buttons[a].removeClass("no-transition")
                }, this))), this.currentUrl = a, this.isOpen = !0
            },
            close: function() {
                this.isOpen && (this.isOpen = !1, this.currentUrl = null, this.$buttons.removeClass("selected"), this.$body.removeClass("showheader").removeClass("page"))
            },
            onSiteBlockClicked: function(a) {
                a.preventDefault(), this.isOpen && Backbone.history.navigate(this.lastPage, !0)
            },
            onLogoClicked: function(a) {
                if (a.preventDefault(), this.isOpen) Backbone.history.navigate(this.lastPage, !0);
                else if ("home" !== this.model.get("state")) {
                    var b = c.cleanUrl(a.currentTarget.href);
                    Backbone.history.navigate(b, !0)
                } else 0 !== this.$win.scrollLeft() ? this.$htmlBody.animate({
                    scrollLeft: 0
                }, 300, "easeOutSine") : Backbone.history.navigate("lab/", !0)
            },
            onLinkClicked: function(a) {
                a.preventDefault();
                var b = c.cleanUrl(a.currentTarget.href);
                b === this.currentUrl ? Backbone.history.navigate(this.lastPage, !0) : Backbone.history.navigate(b, !0)
            }
        });
        return d
    }), define("views/transitions/panels/VerticalTransitions", ["jquery", "underscore"], function(a, b) {
        var c = "webkitTransitionEnd otransitionend msTransitionEnd transitionend",
            d = Backbone.View.extend({
                $body: null,
                vScrollPos: null,
                initialize: function() {
                    b.bindAll(this, "onHideComplete"), this.$body = this.model.get("$body")
                },
                show: function() {
                    this.$el.addClass("hide"), this.$body.addClass("hidehome"), window.requestAnimationFrame(b.bind(function() {
                        this.$el.removeClass("no-transition").removeClass("hide"), window.requestAnimationFrame(b.bind(function() {
                            this.$body.removeClass("hidehome").removeClass("clearblock"), this.$body.scrollTop(this.vScrollPos)
                        }, this))
                    }, this))
                },
                hide: function() {
                    this.vScrollPos = this.$body.scrollTop(), this.$body.addClass("hidehome clearblock"), this.$el.on(c, this.onHideComplete)
                },
                onHideComplete: function() {
                    this.$el.off(c, this.onHideComplete), this.$el.addClass("hide"), this.$body.scrollTop(0), window.requestAnimationFrame(b.bind(function() {
                        this.model.set("state", this.model.get("nextState")), this.$body.removeClass("hidehome")
                    }, this))
                }
            });
        return d
    }), define("views/transitions/panels/FadeTransitions", ["jquery", "underscore"], function(a, b) {
        var c = "webkitTransitionEnd otransitionend msTransitionEnd transitionend",
            d = Backbone.View.extend({
                $body: null,
                $siteBlock: null,
                initialize: function() {
                    b.bindAll(this, "onFadeToArticleComplete", "onFadeToHomeComplete"), this.$body = this.model.get("$body"), this.$siteBlock = this.model.get("$siteBlock")
                },
                fadeToArticle: function(a) {
                    window.requestAnimationFrame(b.bind(function() {
                        this.$siteBlock.on(c, this.onFadeToArticleComplete);
                        // var b = this.model.get(a).color;
                        var b = 'navy';
                        this.$siteBlock.addClass("color-fade " + b), this.$siteBlock.data("color", b)
                    }, this))
                },
                onFadeToArticleComplete: function() {
                    this.$siteBlock.off(c, this.onFadeToArticleComplete), this.$el.addClass("hide"), this.model.set("state", this.model.get("nextState")), this.resetSiteBlock(), window.requestAnimationFrame(b.bind(function() {
                        this.$siteBlock.removeClass("color-fade")
                    }, this))
                },
                fadeToHome: function(a) {
                    var d = this.model.get(a) || {
                            color: "white"
                        },
                        e = d.color;
                    this.$siteBlock.addClass("color " + e), this.$siteBlock.data("color", e), window.requestAnimationFrame(b.bind(function() {
                        this.$siteBlock.on(c, this.onFadeToHomeComplete), this.$siteBlock.removeClass("color")
                    }, this))
                },
                onFadeToHomeComplete: function() {
                    this.$siteBlock.off(c, this.onFadeToHomeComplete), this.resetSiteBlock()
                },
                resetSiteBlock: function() {
                    var a = this.$siteBlock.data("color");
                    this.$siteBlock.removeClass(a), this.$body.removeClass("clearblock")
                }
            });
        return d
    }), define("views/components/PanelsView", ["jquery", "underscore", "utils/Utils", "views/transitions/panels/VerticalTransitions", "views/transitions/panels/FadeTransitions"], function(a, b, c, d, e) {
        var f = "webkitTransitionEnd otransitionend msTransitionEnd transitionend",
            g = Backbone.View.extend({
                $win: null,
                $htmlBody: null,
                $html: null,
                $body: null,
                $site: null,
                $siteBlock: null,
                $panels: null,
                $panel: null,
                isOpen: null,
                totalInView: null,
                hideCount: null,
                verticalTransitions: null,
                fadeTransitions: null,
                events: {
                    "mouseover .panel": "onMouseOverPanel",
                    "mouseout .panel": "onMouseOutPanel"
                },
                initialize: function() {
                    b.bindAll(this, "onMouseOverPanel", "onMouseOutPanel", "onOpenComplete", "onCloseComplete", "onHideComplete", "onShowComplete"), this.$win = this.model.get("$win"), this.$htmlBody = this.model.get("$htmlBody"), this.$html = this.model.get("$html"), this.$body = this.model.get("$body"), this.$site = this.model.get("$site"), this.$siteBlock = this.model.get("$siteBlock"), this.$panels = this.$el.find(".panel");
                    var a = {
                        el: this.el,
                        model: this.model
                    };
                    this.verticalTransitions = new d(a), this.fadeTransitions = new e(a), this.model.get("isTouch") && window.requestAnimationFrame(b.bind(function() {
                        this.undelegateEvents()
                    }, this))
                },
                addPanels: function(a) {
                    this.$el.append(a), this.$panels = this.$el.find(".panel")
                },
                onMouseOverPanel: function(b) {
                    var c = a(b.currentTarget),
                        d = this.$panels.index(c);
                    c.addClass("expand"), this.$panels.eq(d - 1).addClass("shrink-left"), this.$panels.eq(d + 1).addClass("shrink-right"), this.$el.addClass("hover")
                },
                onMouseOutPanel: function() {
                    this.isOpen || (this.$el.removeClass("hover"), this.$panels.removeClass("shrink-left"), this.$panels.removeClass("shrink-right"), this.$panels.removeClass("expand"))
                },
                setPanelCss: function(b, c, d) {
                    a(this.$panels[0]).css("margin", "0 0 0 -" + c + "px"), b.css("margin", "0 " + d + "px 0 " + c + "px")
                },
                openArticle: function(b) {
                    this.isOpen = !0;
                    var d = a(c.getAnchorFromUrl(this.$panels, b));
                    d.length ? this.openArticleWithTransition(d) : this.fadeTransitions.fadeToArticle(b), this.$body.removeClass("home").addClass("clearblock")
                },
                closeArticle: function(b) {
                    this.isOpen = !1, this.$body.scrollTop(0);
                    var d = a(c.getAnchorFromUrl(this.$panels, b));
                    this.$panels.attr("style", ""), this.$el.removeClass("hide"), this.onMouseOutPanel(null), d.length ? (d.addClass("selected"), this.transitionToHome(d)) : (this.fadeTransitions.fadeToHome(b), this.$panels.removeClass("selected"))
                },
                hidePanels: function(a) {
                    c.setColor(this.$site, a, !0), window.requestAnimationFrame(b.bind(function() {
                        this.$site.removeClass("no-bg-transition"), this.model.set("state", this.model.get("nextState"))
                    }, this)), this.$htmlBody.animate({
                        scrollLeft: 0
                    }, 300, "easeOutSine"), this.hideCount = 0, this.$body.addClass("hidehome clearblock"), this.$el.on(f, this.onHideComplete), this.$panels.on(f, this.onHideComplete)
                },
                onHideComplete: function() {
                    ++this.hideCount, (this.hideCount === this.$panels.length || this.model.get("isVerticalScroll")) && (this.$el.off(f, this.onHideComplete), this.$panels.off(f, this.onHideComplete), this.$body.removeClass("clearblock"), this.$el.addClass("hide"))
                },
                showPanels: function() {
                    this.$el.off(f, this.onHideComplete), this.$panels.off(f, this.onHideComplete), this.$body.addClass("clearblock hidehome"), this.$site.scrollLeft(0), this.$el.addClass("hide"), this.hideCount = 0, this.totalInView = Math.min(Math.ceil(this.$win.width() / this.$panels.first().width()), this.$panels.length), window.requestAnimationFrame(b.bind(function() {
                        this.$el.removeClass("hide"), window.requestAnimationFrame(b.bind(function() {
                            this.$body.addClass("clearblock").removeClass("hidehome"), this.$body.removeClass("hidehome"), this.$panels.on(f, this.onShowComplete)
                        }, this))
                    }, this))
                },
                onShowComplete: function() {
                    ++this.hideCount, this.hideCount === this.totalInView && (this.$panels.off(f, this.onShowComplete), this.$body.removeClass("clearblock").removeClass("intro-transition"))
                },
                openArticleWithTransition: function(a) {
                    if (this.$panel = a, this.$panel.addClass("selected"), c.setColor(this.$site, this.$panel.data("color"), !0), this.model.get("isVerticalScroll")) this.verticalTransitions.hide();
                    else {
                        var b = this.$panel.offset().left - (this.$body.scrollLeft() || this.$html.scrollLeft()),
                            d = this.$win.width() - (b + this.$panel.width());
                        this.$panel.on(f, this.onOpenComplete), this.setPanelCss(this.$panel, b, d)
                    }
                },
                onOpenComplete: function(a) {
                    a.target === this.$panel[0] && (this.$panel.off(f, this.onOpenComplete), this.$el.addClass("hide"), this.$site.removeClass("no-bg-transition"), this.model.set("state", this.model.get("nextState")))
                },
                transitionToHome: function(a) {
                    this.$panel = a, this.$el.addClass("no-transition");
                    var c = .5 * this.$win.width(),
                        d = a.offset().left + .5 * a.width(),
                        e = Math.round(d - c);
                    this.$htmlBody.scrollLeft(e), d = a.offset().left - (this.$body.scrollLeft() || this.$html.scrollLeft());
                    var g = this.$win.width() - (d + a.width());
                    this.setPanelCss(a, d, g), window.requestAnimationFrame(b.bind(function() {
                        this.$el.removeClass("no-transition"), this.$panels.removeClass("selected"), this.$panels.on(f, this.onCloseComplete), this.$panels.attr("style", "")
                    }, this)), this.model.get("isVerticalScroll") && this.verticalTransitions.show()
                },
                onCloseComplete: function(a) {
                    a.target === this.$panels[0] && (this.$panels.off(f, this.onCloseComplete), this.$body.removeClass("clearblock"), c.setColor(this.$site, ""))
                }
            });
        return g
    }),
    function(a) {
        function b(b) {
            var c = b || window.event,
                d = [].slice.call(arguments, 1),
                e = 0,
                f = 0,
                g = 0;
            return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), g = e, void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (g = 0, f = -1 * e), void 0 !== c.wheelDeltaY && (g = c.wheelDeltaY / 120), void 0 !== c.wheelDeltaX && (f = -1 * c.wheelDeltaX / 120), d.unshift(b, e, f, g), (a.event.dispatch || a.event.handle).apply(this, d)
        }
        var c = ["DOMMouseScroll", "mousewheel"];
        if (a.event.fixHooks)
            for (var d = c.length; d;) a.event.fixHooks[c[--d]] = a.event.mouseHooks;
        a.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var a = c.length; a;) this.addEventListener(c[--a], b, !1);
                else this.onmousewheel = b
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var a = c.length; a;) this.removeEventListener(c[--a], b, !1);
                else this.onmousewheel = null
            }
        }, a.fn.extend({
            mousewheel: function(a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
            },
            unmousewheel: function(a) {
                return this.unbind("mousewheel", a)
            }
        })
    }(jQuery), define("libs/jquery/plugins/jquery.mousewheel", function() {}), define("controllers/MouseWheel", ["jquery", "underscore", "libs/jquery/plugins/jquery.mousewheel"], function(a, b) {
        var c = {
            addListener: function(a) {
                a.data("trackpad") || a.on("mousewheel", this.onMouseWheel)
            },
            removeListener: function(a) {
                a.off("mousewheel", this.onMouseWheel)
            },
            onMouseWheel: function(c) {
                var d = c.originalEvent.deltaX,
                    e = c.originalEvent.deltaY;
                if (0 !== d) {
                    var f = a(this);
                    f.off("mousewheel", this.onMouseWheel), f.data("trackpad", !0)
                } else 0 !== e && (c.originalEvent.preventDefault(), window.requestAnimationFrame(b.bind(function() {
                    this.scrollLeft += e
                }, this)))
            }
        };
        return c
    }), define("views/HomeView", ["jquery", "underscore", "views/components/PanelsView", "controllers/MouseWheel", "utils/Utils"], function(a, b, c, d, e) {
        var f = Backbone.View.extend({
            $doc: null,
            $win: null,
            $htmlBody: null,
            $body: null,
            $site: null,
            $panels: null,
            $nextButton: null,
            $verticalNextButton: null,
            model: null,
            loading: null,
            showNext: null,
            hideNext: null,
            panelWidth: null,
            panelsView: null,
            throttledScroll: null,
            isSetup: null,
            events: {
                "click .panel": "onClickPanel"
            },
            initialize: function(a) {
                b.bindAll(this, "onClickPanel", "onPanelsAdded", "onClickNext", "onContentLoaded", "onPageScroll", "onScrollDirectionChanged"), this.$doc = this.model.get("$doc"), this.$win = this.model.get("$win"), this.$htmlBody = this.model.get("$htmlBody"), this.$body = this.model.get("$body"), this.$site = this.model.get("$site"), this.throttleScroll = b.throttle(this.onPageScroll, 30), a.deeplink ? (this.setup(), this.intro()) : (this.model.on("change:home", this.onContentLoaded), this.model.loadHome())
            },
            intro: function() {
                this.$body.hasClass("intro") && (this.$body.removeClass("intro"), this.panelsView.showPanels(), this.$htmlBody.scrollLeft(0))
            },
            setup: function() {
                this.$nextButton = this.$body.find(".next-button.horizontal"), this.$verticalNextButton = this.$el.find(".next-button");
                var d = this.$nextButton.find("a"),
                    e = d.length ? d[0].href : "";
                this.model.set("nextPage", e), 0 === e.length && (this.model.on("change:home", b.bind(function() {
                    var b = a(this.model.get("home"));
                    d = b.last().find("a"), d.length && (this.$nextButton.html(d[0]), d = this.$nextButton.find("a"), e = d.length ? d[0].href : "", this.model.set("nextPage", e))
                }, this)), this.model.loadHome()), this.$nextButton.on("click", this.onClickNext), this.$verticalNextButton.on("click", this.onClickNext), this.loading = !1, this.model.on("change:panels", this.onPanelsAdded), this.showNext = !1;
                var f = this.$el.find(".panel");
                this.panelWidth = a(f[0]).width(), this.panelsView = new c({
                    el: "#panels",
                    model: this.model
                }), this.panelsView.isOpen = "article" === this.model.get("state"), "article" === this.model.get("lastState") && (this.panelsView.isOpen = !0), this.model.set("loading", !1), this.isSetup = !0, this.show()
            },
            show: function() {
                if (!this.isSetup) return this.model.set("loading", !0), void 0;
                switch (this.model.get("lastState")) {
                    case "404":
                        this.panelsView.showPanels();
                        break;
                    case "lab":
                        this.$body.addClass("home"), this.panelsView.showPanels();
                        break;
                    default:
                        this.panelsView.isOpen && this.panelsView.closeArticle(this.model.get("previousUrl"))
                }
                this.hideNextButton(), this.$body.scrollTop(0), this.onScrollDirectionChanged(), d.addListener(this.$site), this.model.on("change:isVerticalScroll", this.onScrollDirectionChanged)
            },
            hide: function(a) {
                switch (this.model.get("nextState")) {
                    case "article":
                        this.panelsView.openArticle(a.url);
                        break;
                    case "404":
                        this.panelsView.hidePanels("white");
                        break;
                    case "lab":
                        this.$body.removeClass("home"), this.panelsView.hidePanels("black")
                }
                this.$win.off("scroll", this.throttleScroll), d.removeListener(this.$site), this.hideNextButton(), this.model.off("change:isVerticalScroll", this.onScrollDirectionChanged)
            },
            addPanels: function(a) {
                this.panelsView.addPanels(a), this.loading = !1, this.$nextButton.removeClass("loading");
                var b = this.model.get("nextPage");
                this.$nextButton.find("a")[0].href = b, this.$verticalNextButton.remove(), this.model.get("pagesLoaded") || (this.$verticalNextButton.find("a")[0].href = b, this.$el.append(this.$verticalNextButton), this.$verticalNextButton.on("click", this.onClickNext))
            },
            loadNextPage: function() {
                this.showNext = !0, this.loading = !0, this.hideNext = this.$win.scrollLeft() + .5 * this.panelWidth, this.$nextButton.addClass("loading show"), this.model.loadNextPage()
            },
            hideNextButton: function() {
                this.showNext = !1, this.$nextButton.removeClass("show"), this.model.get("pagesLoaded") && this.$win.off("scroll", this.throttleScroll)
            },
            onPageScroll: function() {
                !this.loading && this.$win.scrollLeft() + this.$win.width() >= this.$el.width() && this.loadNextPage(), this.showNext && this.$win.scrollLeft() >= this.hideNext && this.hideNextButton()
            },
            onPanelsAdded: function() {
                var a = this.model.get("panels");
                a.length && (this.addPanels(a), this.model.set("panels", []))
            },
            onClickVerticalNext: function(a) {
                a.preventDefault(), this.loading || this.loadNextPage()
            },
            onClickNext: function(a) {
                a.preventDefault(), this.loading || (this.model.get("isVerticalScroll") ? this.loadNextPage() : this.showNext && (this.hideNextButton(), this.$htmlBody.animate({
                    scrollLeft: this.hideNext + this.panelWidth
                }, 300, "easeOutSine")))
            },
            onClickPanel: function(a) {
                a.preventDefault(), Backbone.history.navigate(e.cleanUrl(a.currentTarget.href), !0)
            },
            onContentLoaded: function() {
                this.model.off("change:home", this.onContentLoaded);
                var a = this.model.get("home");
                this.$el.addClass("hide"), this.$el.html(a), this.setup()
            },
            onScrollDirectionChanged: function() {
                this.model.get("isVerticalScroll") || this.model.get("pagesLoaded") ? this.$win.off("scroll", this.throttleScroll) : this.$win.on("scroll", this.throttleScroll)
            }
        });
        return f
    }), define("views/lab/GreyScale", ["jquery", "underscore"], function(a) {
        function b() {
            g(), n.on("resize", g), q.on("mousemove", f), q.on("mouseenter", d), q.on("mouseleave", e), o.on("mousemove", f), o.on("mouseenter", d), o.on("mouseleave", e), w = !0, window.requestAnimationFrame(j)
        }

        function c() {
            n.off("resize", g), q.off("mousemove", f), q.off("mouseenter", d), q.off("mouseleave", e), o.off("mousemove", f), o.off("mouseenter", d), o.off("mouseleave", e), w = !1, x = !1
        }

        function d() {
            x = !0
        }

        function e() {
            x = !1
        }

        function f(a) {
            z = a.pageX, A = a.pageY
        }

        function g() {
            p.width = 10, p.height = 10, s = n.width(), t = n.height(), p.width = s, p.height = t, u = 40, v = Math.ceil(5 * u), h()
        }

        function h() {
            B = [];
            var a, b, c, d, e, f, g = Math.ceil(s / u),
                h = Math.ceil(t / u),
                j = [];
            for (b = 0; g >= b; b++)
                for (j[b] = [], c = 0; h >= c; c++) a = {}, a.x = a.ox = u * b, a.y = a.oy = u * c, B[B.length] = a, j[b][c] = a;
            for (C = [], d = 0; d < j.length - 1; d++)
                for (f = j[d].length - 1, e = 0; f > e; e++) a = {}, a.tl = j[d][e], a.tr = j[d][e + 1], a.br = j[d + 1][e + 1], a.bl = j[d + 1][e], a.color = "#" + ((1 << 24) * Math.random() | 0).toString(16), i(a), C[C.length] = a
        }

        function i(a) {
            var b = 8 + Math.round(30 * Math.random()),
                c = b + 15;
            a.color1 = ["rgb(" + b, b, b + ")"].join(","), a.color2 = ["rgb(" + c, c, c + ")"].join(",")
        }

        function j() {
            w && window.requestAnimationFrame(j);
            for (var a = B.length; --a > -1;) k(B[a]);
            l()
        }

        function k(a) {
            var b, c = z - a.ox,
                d = A - a.oy,
                e = Math.sqrt(c * c + d * d);
            if (!(0 === e || e > v && a.x === a.ox && a.y === a.oy)) {
                var f, g;
                if (v >= e && x) {
                    var h = d / e,
                        i = 180 * Math.asin(h) / Math.PI;
                    z < a.ox && (i = 180 - i), i = 270 - i;
                    var j = Math.sin(i / 180 * Math.PI),
                        k = Math.cos(i / 180 * Math.PI),
                        l = v - 8 * (v / e - 1);
                    l = Math.max(.25 * v, l), f = z + j * l, g = A + k * l, b = .07
                } else f = a.ox, g = a.oy, b = .03; if (a.x != f) {
                    var m = (f - a.x) * b;
                    a.x += m
                }
                if (a.y != g) {
                    var n = (g - a.y) * b;
                    a.y += n
                }
                Math.abs(a.x - f) < y && (a.x = f), Math.abs(a.y - g) < y && (a.y = g)
            }
        }

        function l() {
            r.clearRect(0, 0, s, t);
            for (var a = C.length; --a > -1;) {
                var b = r.createLinearGradient(C[a].tl.x, C[a].tl.y, C[a].br.x, C[a].br.y);
                b.addColorStop(0, C[a].color1), b.addColorStop(1, C[a].color2), r.fillStyle = b, r.beginPath(), r.moveTo(C[a].tl.x, C[a].tl.y), r.lineTo(C[a].tr.x, C[a].tr.y), r.lineTo(C[a].br.x, C[a].br.y), r.lineTo(C[a].bl.x, C[a].bl.y), r.lineTo(C[a].tl.x, C[a].tl.y), r.closePath(), r.fill()
            }
        }
        var m, n, o, p, q, r, s, t, u, v, w, x, y = .1,
            z = 0,
            A = 0,
            B = [],
            C = [],
            D = function(b) {
                m = b.el, p = document.createElement("canvas"), p.className = "greyscale", m.appendChild(p), r = p.getContext("2d"), n = b.win, o = b.site, q = a(p)
            };
        return D.prototype.enable = function() {
            b()
        }, D.prototype.disable = function() {
            c()
        }, D
    }), define("views/LabView", ["jquery", "underscore", "views/lab/GreyScale"], function(a, b, c) {
        var d = Backbone.View.extend({
            $win: null,
            $body: null,
            $site: null,
            greyScale: null,
            initialize: function(a) {
                b.bindAll(this, "onHideComplete"), this.$win = this.model.get("$win"), this.$body = this.model.get("$body"), this.$site = this.model.get("$site"), this.greyScale = new c({
                    el: this.el,
                    site: this.model.get("$siteBlock"),
                    win: this.$win
                }), a.deeplink && this.show()
            },
            show: function() {
                this.$body.addClass("lab"), this.greyScale.enable()
            },
            hide: function() {
                this.greyScale.disable(), this.$body.removeClass("lab").removeClass("page-id-2285").removeClass("page-id-2251");
                var a = this.$site.data("color");
                this.$site.removeClass(a), this.$site.data("color", ""), "home" === this.model.get("nextState") && (this.$site.addClass("white"), this.$site.data("color", "white")), window.requestAnimationFrame(b.bind(function() {
                    this.model.set("state", this.model.get("nextState"))
                }, this))
            },
            onHideComplete: function(a) {
                a.target === this.el && this.$el.off("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onHideComplete)
            }
        });
        return d
    }), define("views/components/ArrowsView", ["jquery", "underscore", "utils/Utils"], function(a, b, c) {
        var d = Backbone.View.extend({
            $body: null,
            $next: null,
            $previous: null,
            $article: null,
            nextColor: null,
            previousColor: null,
            events: {
                "mouseenter .arrow.next": "onMouseEnterNext",
                "mouseleave .arrow.next": "onMouseLeaveNext",
                "mouseenter .arrow.previous": "onMouseEnterPrevious",
                "mouseleave .arrow.previous": "onMouseLeavePrevious",
                "click .arrow.next": "onClicked",
                "click .arrow.previous": "onClicked"
            },
            initialize: function(a) {
                b.bindAll(this, "onMouseEnterNext", "onMouseLeaveNext", "onMouseEnterPrevious", "onMouseLeavePrevious", "onNextUpdated", "onPreviousUpdated", "onClicked"), this.$body = this.model.get("$body"), this.$next = this.$el.find(".arrow.next"), this.$previous = this.$el.find(".arrow.previous"), this.$article = a.$article, this.nextColor = "", this.previousColor = "", this.model.on("change:nextArticle", this.onNextUpdated), this.model.on("change:previousArticle", this.onPreviousUpdated);
                //var d = c.cleanUrl(this.$next[0].href);
                url_pieces = this.$el.context.URL.split('/');
                name = url_pieces[url_pieces.length-2];
                var d = $('#'+name).parent().children('#'+name).next().attr('href');
                this.model.set("nextArticle", d === Backbone.history.fragment ? "" : d);
                // var e = c.cleanUrl(this.$previous[0].href);
                var e = $('#'+name).parent().children('#'+name).previous().attr('href');
                this.model.set("previousArticle", e === Backbone.history.fragment ? "" : e), this.model.get("isTouch") && window.requestAnimationFrame(b.bind(function() {
                    this.undelegateEvents(), this.$el.find(".arrow").on("click", this.onClicked)
                }, this))
            },
            setButton: function(a, c, d) {
                var e = new jQuery.Deferred,
                    f = this.model.get(a);
                return void 0 === f ? (this.model.on("change:" + a, b.bind(function(b) {
                    var f = b.attributes[a].color;
                    c.removeClass(d).addClass(f), e.resolve(f)
                }, this)), this.model.loadArticle(a)) : (c.removeClass(d).addClass(f.color), e.resolve(f.color)), c[0].href = "/" + a, c.removeClass("hide"), e.promise()
            },
            onNextUpdated: function() {
                var c = this.model.get("nextArticle");
                return "" === c || c === Backbone.history.fragment ? (this.$next.addClass("hide"), void 0) : (a.when(this.setButton(c, this.$next, this.nextColor).then(b.bind(function(a) {
                    this.nextColor = a
                }, this))), void 0)
            },
            onPreviousUpdated: function() {
                var c = this.model.get("previousArticle");
                return "" === c || c === Backbone.history.fragment ? (this.$previous.addClass("hide"), void 0) : (a.when(this.setButton(c, this.$previous, this.previousColor).then(b.bind(function(a) {
                    this.previousColor = a
                }, this))), void 0)
            },
            onMouseEnterNext: function() {
                this.$body.addClass("nudge-right")
            },
            onMouseLeaveNext: function() {
                this.$body.removeClass("nudge-right")
            },
            onMouseEnterPrevious: function() {
                this.$body.addClass("nudge-left")
            },
            onMouseLeavePrevious: function() {
                this.$body.removeClass("nudge-left")
            },
            onClicked: function(a) {
                a.preventDefault(), Backbone.history.navigate(c.cleanUrl(a.currentTarget.href), !0)
            }
        });
        return d
    }),
    function(a) {
        function b(b) {
            var c = b.data;
            b.isDefaultPrevented() || (b.preventDefault(), a(this).ajaxSubmit(c))
        }

        function c(b) {
            var c = b.target,
                d = a(c);
            if (!d.is("[type=submit],[type=image]")) {
                var e = d.closest("[type=submit]");
                if (0 === e.length) return;
                c = e[0]
            }
            var f = this;
            if (f.clk = c, "image" == c.type)
                if (void 0 !== b.offsetX) f.clk_x = b.offsetX, f.clk_y = b.offsetY;
                else if ("function" == typeof a.fn.offset) {
                var g = d.offset();
                f.clk_x = b.pageX - g.left, f.clk_y = b.pageY - g.top
            } else f.clk_x = b.pageX - c.offsetLeft, f.clk_y = b.pageY - c.offsetTop;
            setTimeout(function() {
                f.clk = f.clk_x = f.clk_y = null
            }, 100)
        }

        function d() {
            if (a.fn.ajaxSubmit.debug) {
                var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                window.console && window.console.log ? window.console.log(b) : window.opera && window.opera.postError && window.opera.postError(b)
            }
        }
        var e = {};
        e.fileapi = void 0 !== a("<input type='file'/>").get(0).files, e.formdata = void 0 !== window.FormData, a.fn.ajaxSubmit = function(b) {
            function c(b) {
                var c, d, e = a.param(b).split("&"),
                    f = e.length,
                    g = {};
                for (c = 0; f > c; c++) e[c] = e[c].replace(/\+/g, " "), d = e[c].split("="), g[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
                return g
            }

            function f(d) {
                for (var e = new FormData, f = 0; f < d.length; f++) e.append(d[f].name, d[f].value);
                if (b.extraData) {
                    var g = c(b.extraData);
                    for (var i in g) g.hasOwnProperty(i) && e.append(i, g[i])
                }
                b.data = null;
                var j = a.extend(!0, {}, a.ajaxSettings, b, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: h || "POST"
                });
                b.uploadProgress && (j.xhr = function() {
                    var a = jQuery.ajaxSettings.xhr();
                    return a.upload && (a.upload.onprogress = function(a) {
                        var c = 0,
                            d = a.loaded || a.position,
                            e = a.total;
                        a.lengthComputable && (c = Math.ceil(d / e * 100)), b.uploadProgress(a, d, e, c)
                    }), a
                }), j.data = null;
                var k = j.beforeSend;
                return j.beforeSend = function(a, b) {
                    b.data = e, k && k.call(this, a, b)
                }, a.ajax(j)
            }

            function g(c) {
                function e(a) {
                    var b = a.contentWindow ? a.contentWindow.document : a.contentDocument ? a.contentDocument : a.document;
                    return b
                }

                function f() {
                    function b() {
                        try {
                            var a = e(q).readyState;
                            d("state = " + a), a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50)
                        } catch (c) {
                            d("Server abort: ", c, " (", c.name, ")"), g(A), v && clearTimeout(v), v = void 0
                        }
                    }
                    var c = k.attr("target"),
                        f = k.attr("action");
                    w.setAttribute("target", n), h || w.setAttribute("method", "POST"), f != l.url && w.setAttribute("action", l.url), !l.skipEncodingOverride && (!h || /post/i.test(h)) && k.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    }), l.timeout && (v = setTimeout(function() {
                        u = !0, g(z)
                    }, l.timeout));
                    var i = [];
                    try {
                        if (l.extraData)
                            for (var j in l.extraData) l.extraData.hasOwnProperty(j) && (a.isPlainObject(l.extraData[j]) && l.extraData[j].hasOwnProperty("name") && l.extraData[j].hasOwnProperty("value") ? i.push(a('<input type="hidden" name="' + l.extraData[j].name + '">').val(l.extraData[j].value).appendTo(w)[0]) : i.push(a('<input type="hidden" name="' + j + '">').val(l.extraData[j]).appendTo(w)[0]));
                        l.iframeTarget || (p.appendTo("body"), q.attachEvent ? q.attachEvent("onload", g) : q.addEventListener("load", g, !1)), setTimeout(b, 15), w.submit()
                    } finally {
                        w.setAttribute("action", f), c ? w.setAttribute("target", c) : k.removeAttr("target"), a(i).remove()
                    }
                }

                function g(b) {
                    if (!r.aborted && !F) {
                        try {
                            E = e(q)
                        } catch (c) {
                            d("cannot access response document: ", c), b = A
                        }
                        if (b === z && r) return r.abort("timeout"), y.reject(r, "timeout"), void 0;
                        if (b == A && r) return r.abort("server abort"), y.reject(r, "error", "server abort"), void 0;
                        if (E && E.location.href != l.iframeSrc || u) {
                            q.detachEvent ? q.detachEvent("onload", g) : q.removeEventListener("load", g, !1);
                            var f, h = "success";
                            try {
                                if (u) throw "timeout";
                                var i = "xml" == l.dataType || E.XMLDocument || a.isXMLDoc(E);
                                if (d("isXml=" + i), !i && window.opera && (null === E.body || !E.body.innerHTML) && --G) return d("requeing onLoad callback, DOM not available"), setTimeout(g, 250), void 0;
                                var j = E.body ? E.body : E.documentElement;
                                r.responseText = j ? j.innerHTML : null, r.responseXML = E.XMLDocument ? E.XMLDocument : E, i && (l.dataType = "xml"), r.getResponseHeader = function(a) {
                                    var b = {
                                        "content-type": l.dataType
                                    };
                                    return b[a]
                                }, j && (r.status = Number(j.getAttribute("status")) || r.status, r.statusText = j.getAttribute("statusText") || r.statusText);
                                var k = (l.dataType || "").toLowerCase(),
                                    n = /(json|script|text)/.test(k);
                                if (n || l.textarea) {
                                    var o = E.getElementsByTagName("textarea")[0];
                                    if (o) r.responseText = o.value, r.status = Number(o.getAttribute("status")) || r.status, r.statusText = o.getAttribute("statusText") || r.statusText;
                                    else if (n) {
                                        var s = E.getElementsByTagName("pre")[0],
                                            t = E.getElementsByTagName("body")[0];
                                        s ? r.responseText = s.textContent ? s.textContent : s.innerText : t && (r.responseText = t.textContent ? t.textContent : t.innerText)
                                    }
                                } else "xml" == k && !r.responseXML && r.responseText && (r.responseXML = H(r.responseText));
                                try {
                                    D = J(r, k, l)
                                } catch (b) {
                                    h = "parsererror", r.error = f = b || h
                                }
                            } catch (b) {
                                d("error caught: ", b), h = "error", r.error = f = b || h
                            }
                            r.aborted && (d("upload aborted"), h = null), r.status && (h = r.status >= 200 && r.status < 300 || 304 === r.status ? "success" : "error"), "success" === h ? (l.success && l.success.call(l.context, D, "success", r), y.resolve(r.responseText, "success", r), m && a.event.trigger("ajaxSuccess", [r, l])) : h && (void 0 === f && (f = r.statusText), l.error && l.error.call(l.context, r, h, f), y.reject(r, "error", f), m && a.event.trigger("ajaxError", [r, l, f])), m && a.event.trigger("ajaxComplete", [r, l]), m && !--a.active && a.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, r, h), F = !0, l.timeout && clearTimeout(v), setTimeout(function() {
                                l.iframeTarget || p.remove(), r.responseXML = null
                            }, 100)
                        }
                    }
                }
                var i, j, l, m, n, p, q, r, s, t, u, v, w = k[0],
                    x = !!a.fn.prop,
                    y = a.Deferred();
                if (a("[name=submit],[id=submit]", w).length) return alert('Error: Form elements must not have name or id of "submit".'), y.reject(), y;
                if (c)
                    for (j = 0; j < o.length; j++) i = a(o[j]), x ? i.prop("disabled", !1) : i.removeAttr("disabled");
                if (l = a.extend(!0, {}, a.ajaxSettings, b), l.context = l.context || l, n = "jqFormIO" + (new Date).getTime(), l.iframeTarget ? (p = a(l.iframeTarget), t = p.attr("name"), t ? n = t : p.attr("name", n)) : (p = a('<iframe name="' + n + '" src="' + l.iframeSrc + '" />'), p.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), q = p[0], r = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(b) {
                        var c = "timeout" === b ? "timeout" : "aborted";
                        d("aborting upload... " + c), this.aborted = 1;
                        try {
                            q.contentWindow.document.execCommand && q.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        p.attr("src", l.iframeSrc), r.error = c, l.error && l.error.call(l.context, r, c, b), m && a.event.trigger("ajaxError", [r, l, c]), l.complete && l.complete.call(l.context, r, c)
                    }
                }, m = l.global, m && 0 === a.active++ && a.event.trigger("ajaxStart"), m && a.event.trigger("ajaxSend", [r, l]), l.beforeSend && l.beforeSend.call(l.context, r, l) === !1) return l.global && a.active--, y.reject(), y;
                if (r.aborted) return y.reject(), y;
                s = w.clk, s && (t = s.name, t && !s.disabled && (l.extraData = l.extraData || {}, l.extraData[t] = s.value, "image" == s.type && (l.extraData[t + ".x"] = w.clk_x, l.extraData[t + ".y"] = w.clk_y)));
                var z = 1,
                    A = 2,
                    B = a("meta[name=csrf-token]").attr("content"),
                    C = a("meta[name=csrf-param]").attr("content");
                C && B && (l.extraData = l.extraData || {}, l.extraData[C] = B), l.forceSync ? f() : setTimeout(f, 10);
                var D, E, F, G = 50,
                    H = a.parseXML || function(a, b) {
                        return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"), b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
                    },
                    I = a.parseJSON || function(a) {
                        return window.eval("(" + a + ")")
                    },
                    J = function(b, c, d) {
                        var e = b.getResponseHeader("content-type") || "",
                            f = "xml" === c || !c && e.indexOf("xml") >= 0,
                            g = f ? b.responseXML : b.responseText;
                        return f && "parsererror" === g.documentElement.nodeName && a.error && a.error("parsererror"), d && d.dataFilter && (g = d.dataFilter(g, c)), "string" == typeof g && ("json" === c || !c && e.indexOf("json") >= 0 ? g = I(g) : ("script" === c || !c && e.indexOf("javascript") >= 0) && a.globalEval(g)), g
                    };
                return y
            }
            if (!this.length) return d("ajaxSubmit: skipping submit process - no element selected"), this;
            var h, i, j, k = this;
            "function" == typeof b && (b = {
                success: b
            }), h = this.attr("method"), i = this.attr("action"), j = "string" == typeof i ? a.trim(i) : "", j = j || window.location.href || "", j && (j = (j.match(/^([^#]+)/) || [])[1]), d("url:", j), b = a.extend(!0, {
                url: j,
                success: a.ajaxSettings.success,
                type: h || "GET",
                iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
            }, b);
            var l = {};
            if (this.trigger("form-pre-serialize", [this, b, l]), l.veto) return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (b.beforeSerialize && b.beforeSerialize(this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            var m = b.traditional;
            void 0 === m && (m = a.ajaxSettings.traditional);
            var n, o = [],
                p = this.formToArray(b.semantic, o);
            if (b.data && (b.extraData = b.data, n = a.param(b.data, m)), b.beforeSubmit && b.beforeSubmit(p, this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if (this.trigger("form-submit-validate", [p, this, b, l]), l.veto) return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            var q = a.param(p, m);
            n && (q = q ? q + "&" + n : n), "GET" == b.type.toUpperCase() ? (b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + q, b.data = null) : b.data = q;
            var r = [];
            if (b.resetForm && r.push(function() {
                k.resetForm()
            }), b.clearForm && r.push(function() {
                k.clearForm(b.includeHidden)
            }), !b.dataType && b.target) {
                var s = b.success || function() {};
                r.push(function(c) {
                    var d = b.replaceTarget ? "replaceWith" : "html";
                    a(b.target)[d](c).each(s, arguments)
                })
            } else b.success && r.push(b.success);
            b.success = function(a, c, d) {
                for (var e = b.context || this, f = 0, g = r.length; g > f; f++) r[f].apply(e, [a, c, d || k, k])
            };
            var t = a('input[type=file]:enabled[value!=""]', this),
                u = t.length > 0,
                v = "multipart/form-data",
                w = k.attr("enctype") == v || k.attr("encoding") == v,
                x = e.fileapi && e.formdata;
            d("fileAPI :" + x);
            var y, z = (u || w) && !x;
            b.iframe !== !1 && (b.iframe || z) ? b.closeKeepAlive ? a.get(b.closeKeepAlive, function() {
                y = g(p)
            }) : y = g(p) : y = (u || w) && x ? f(p) : a.ajax(b), k.removeData("jqxhr").data("jqxhr", y);
            for (var A = 0; A < o.length; A++) o[A] = null;
            return this.trigger("form-submit-notify", [this, b]), this
        }, a.fn.ajaxForm = function(e) {
            if (e = e || {}, e.delegation = e.delegation && a.isFunction(a.fn.on), !e.delegation && 0 === this.length) {
                var f = {
                    s: this.selector,
                    c: this.context
                };
                return !a.isReady && f.s ? (d("DOM not ready, queuing ajaxForm"), a(function() {
                    a(f.s, f.c).ajaxForm(e)
                }), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)")), this)
            }
            return e.delegation ? (a(document).off("submit.form-plugin", this.selector, b).off("click.form-plugin", this.selector, c).on("submit.form-plugin", this.selector, e, b).on("click.form-plugin", this.selector, e, c), this) : this.ajaxFormUnbind().bind("submit.form-plugin", e, b).bind("click.form-plugin", e, c)
        }, a.fn.ajaxFormUnbind = function() {
            return this.unbind("submit.form-plugin click.form-plugin")
        }, a.fn.formToArray = function(b, c) {
            var d = [];
            if (0 === this.length) return d;
            var f = this[0],
                g = b ? f.getElementsByTagName("*") : f.elements;
            if (!g) return d;
            var h, i, j, k, l, m, n;
            for (h = 0, m = g.length; m > h; h++)
                if (l = g[h], j = l.name)
                    if (b && f.clk && "image" == l.type)!l.disabled && f.clk == l && (d.push({
                        name: j,
                        value: a(l).val(),
                        type: l.type
                    }), d.push({
                        name: j + ".x",
                        value: f.clk_x
                    }, {
                        name: j + ".y",
                        value: f.clk_y
                    }));
                    else if (k = a.fieldValue(l, !0), k && k.constructor == Array)
                for (c && c.push(l), i = 0, n = k.length; n > i; i++) d.push({
                    name: j,
                    value: k[i]
                });
            else if (e.fileapi && "file" == l.type && !l.disabled) {
                c && c.push(l);
                var o = l.files;
                if (o.length)
                    for (i = 0; i < o.length; i++) d.push({
                        name: j,
                        value: o[i],
                        type: l.type
                    });
                else d.push({
                    name: j,
                    value: "",
                    type: l.type
                })
            } else null !== k && "undefined" != typeof k && (c && c.push(l), d.push({
                name: j,
                value: k,
                type: l.type,
                required: l.required
            })); if (!b && f.clk) {
                var p = a(f.clk),
                    q = p[0];
                j = q.name, j && !q.disabled && "image" == q.type && (d.push({
                    name: j,
                    value: p.val()
                }), d.push({
                    name: j + ".x",
                    value: f.clk_x
                }, {
                    name: j + ".y",
                    value: f.clk_y
                }))
            }
            return d
        }, a.fn.formSerialize = function(b) {
            return a.param(this.formToArray(b))
        }, a.fn.fieldSerialize = function(b) {
            var c = [];
            return this.each(function() {
                var d = this.name;
                if (d) {
                    var e = a.fieldValue(this, b);
                    if (e && e.constructor == Array)
                        for (var f = 0, g = e.length; g > f; f++) c.push({
                            name: d,
                            value: e[f]
                        });
                    else null !== e && "undefined" != typeof e && c.push({
                        name: this.name,
                        value: e
                    })
                }
            }), a.param(c)
        }, a.fn.fieldValue = function(b) {
            for (var c = [], d = 0, e = this.length; e > d; d++) {
                var f = this[d],
                    g = a.fieldValue(f, b);
                null === g || "undefined" == typeof g || g.constructor == Array && !g.length || (g.constructor == Array ? a.merge(c, g) : c.push(g))
            }
            return c
        }, a.fieldValue = function(b, c) {
            var d = b.name,
                e = b.type,
                f = b.tagName.toLowerCase();
            if (void 0 === c && (c = !0), c && (!d || b.disabled || "reset" == e || "button" == e || ("checkbox" == e || "radio" == e) && !b.checked || ("submit" == e || "image" == e) && b.form && b.form.clk != b || "select" == f && -1 == b.selectedIndex)) return null;
            if ("select" == f) {
                var g = b.selectedIndex;
                if (0 > g) return null;
                for (var h = [], i = b.options, j = "select-one" == e, k = j ? g + 1 : i.length, l = j ? g : 0; k > l; l++) {
                    var m = i[l];
                    if (m.selected) {
                        var n = m.value;
                        if (n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), j) return n;
                        h.push(n)
                    }
                }
                return h
            }
            return a(b).val()
        }, a.fn.clearForm = function(b) {
            return this.each(function() {
                a("input,select,textarea", this).clearFields(b)
            })
        }, a.fn.clearFields = a.fn.clearInputs = function(b) {
            var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function() {
                var d = this.type,
                    e = this.tagName.toLowerCase();
                c.test(d) || "textarea" == e ? this.value = "" : "checkbox" == d || "radio" == d ? this.checked = !1 : "select" == e ? this.selectedIndex = -1 : "file" == d ? /MSIE/.test(navigator.userAgent) ? a(this).replaceWith(a(this).clone()) : a(this).val("") : b && (b === !0 && /hidden/.test(d) || "string" == typeof b && a(this).is(b)) && (this.value = "")
            })
        }, a.fn.resetForm = function() {
            return this.each(function() {
                ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
            })
        }, a.fn.enable = function(a) {
            return void 0 === a && (a = !0), this.each(function() {
                this.disabled = !a
            })
        }, a.fn.selected = function(b) {
            return void 0 === b && (b = !0), this.each(function() {
                var c = this.type;
                if ("checkbox" == c || "radio" == c) this.checked = b;
                else if ("option" == this.tagName.toLowerCase()) {
                    var d = a(this).parent("select");
                    b && d[0] && "select-one" == d[0].type && d.find("option").selected(!1), this.selected = b
                }
            })
        }, a.fn.ajaxSubmit.debug = !1
    }(jQuery), define("libs/jquery/plugins/jquery.form", function() {}), define("views/components/CommentsView", ["jquery", "underscore", "libs/jquery/plugins/jquery.form"], function(a, b) {
        var c = Backbone.View.extend({
            $body: null,
            $site: null,
            $wrapper: null,
            $button: null,
            $form: null,
            $submit: null,
            $comments: null,
            inputFields: null,
            isLoggedIn: null,
            isOpen: null,
            events: {
                "focus input[type=text], textarea": "onInputFocus",
                "click #comments-button": "onButtonClicked"
            },
            initialize: function() {
                b.bindAll(this, "onInputFocus", "onOpenComplete", "onFormSubmit", "onButtonClicked"), this.$body = this.model.get("$body"), this.$site = this.model.get("$site"), this.$wrapper = this.$el.find("#comments-form-wrapper"), this.$button = this.$el.find("#comments-button"), this.$form = this.$el.find("#commentform"), this.$submit = this.$el.find("#target-submit"), this.$comments = this.$el.find("ol"), this.isLoggedIn = this.$body.hasClass("logged-in"), this.inputFields = [], this.inputFields[0] = this.$form.find("#author"), this.inputFields[1] = this.$form.find("#email"), this.inputFields[2] = this.$form.find("#comment"), this.$form.ajaxForm({
                    success: this.onFormSubmit,
                    clearForm: !0
                })
            },
            open: function() {
                this.isOpen = !0, this.$wrapper.addClass("open");
                var a = this.$wrapper.find("#commentform").height() + 16;
                this.$wrapper.on("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onOpenComplete), this.$wrapper.css("height", a + "px");
                var b = this.$button.data("post");
                this.$button.html(b)
            },
            submit: function() {
                (this.isLoggedIn || this.validate()) && this.$submit.trigger("click")
            },
            validate: function() {
                for (var a = !0, b = this.inputFields.length; --b > -1;) this.checkIfEmpty(this.inputFields[b]) || (a = !1);
                return a
            },
            checkIfEmpty: function(a) {
                return 0 === a.val().split(" ").join("").length ? (a.addClass("inputError"), !1) : !0
            },
            onInputFocus: function(b) {
                a(b.currentTarget).removeClass("inputError")
            },
            onOpenComplete: function() {
                this.$wrapper.off("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onOpenComplete);
                var a = this.$wrapper.position().top + this.$site.scrollTop();
                this.$site.animate({
                    scrollTop: a - 17
                }, 350, "easeOutSine")
            },
            onFormSubmit: function(c) {
                var d = a(c).find("#comments ol li");
                d.length && (d = a(d[0]).addClass("hide"), this.$comments.prepend(d), window.requestAnimationFrame(b.bind(function() {
                    d.removeClass("hide")
                }, this)))
            },
            onButtonClicked: function() {
                this.isOpen ? this.submit() : this.open()
            },
            destroy: function() {
                this.undelegateEvents(), this.$wrapper.off("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onOpenComplete)
            }
        });
        return c
    }), define("controllers/ShareButtons", ["jquery", "underscore"], function() {
        var a = {
            initialize: function() {
                var a = document.createElement("div");
                a.id = "fb-root", document.body.appendChild(a), setTimeout(this.load, 300, document, "script", "twitter-wjs", "//platform.twitter.com/widgets.js"), setTimeout(this.load, 350, document, "script", "facebook-jssdk", "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=519866454702231"), setTimeout(this.load, 400, document, "script", "gplus-jssdk", "//apis.google.com/js/plusone.js")
            },
            load: function(a, b, c, d) {
                try {
                    var e, f = a.getElementsByTagName(b)[0];
                    a.getElementById(c) || (e = a.createElement(b), e.async = !0, e.id = c, e.src = d, f.parentNode.insertBefore(e, f))
                } catch (g) {}
            },
            refresh: function() {
                try {
                    twttr.widgets.load()
                } catch (a) {}
                try {
                    gapi.plusone.go()
                } catch (a) {}
                try {
                    FB.XFBML.parse()
                } catch (a) {}
            }
        };
        return a
    }), define("views/ArticleView", ["jquery", "underscore", "views/components/ArrowsView", "views/components/CommentsView", "controllers/ShareButtons", "utils/Utils"], function(a, b, c, d, e, f) {
        var g = Backbone.View.extend({
            $body: null,
            $site: null,
            $post: null,
            $close: null,
            arrowsView: null,
            commentsView: null,
            color: null,
            pageData: null,
            slideOffClass: null,
            storeNext: null,
            events: {},
            initialize: function(d) {
                b.bindAll(this, "setColor", "changePost", "onHideComplete", "onSlideOffComplete", "onCloseClicked"), this.arrowsView = new c({
                    el: "#arrows",
                    model: this.model,
                    $article: this.$el
                }), this.$body = this.model.get("$body"), this.$site = this.model.get("$site"), this.$close = a("#closebutton"), this.$close.on("click", this.onCloseClicked), d.deeplink ? this.setPostData(d.url) : this.preload(d.url)
            },
            setPostData: function(a) {
                this.$post = this.$el.find(".post");
                var b = this.$post.data();
                b.next = f.cleanUrl(b.next), b.previous = f.cleanUrl(b.previous), b.date = f.setTimestamp(b.date), b.post = this.$post[0], this.model.set(a, b), this.pageData = b, this.color = this.$site.data("color"), this.currentUrl = a, this.commentsView = new d({
                    el: "#comments",
                    model: this.model
                })
            },
            show: function(a) {
                this.currentUrl = a.url, this.$el.removeClass("hide"), this.$body.removeClass("clearblock"), this.pageData = this.model.get(this.currentUrl), void 0 === this.pageData ? (this.model.on("change:" + this.currentUrl, this.changePost), this.model.set("loading", !0)) : this.changePost()
            },
            hide: function() {
                this.$body.addClass("clearblock").removeClass("single-post"), this.pageData ? this.$el.on("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onHideComplete) : (this.model.set("loading", !1), window.requestAnimationFrame(b.bind(function() {
                    this.onHideComplete({
                        target: this.el
                    })
                }, this)))
            },
            preload: function(a) {
                this.currentUrl !== a && (this.currentUrl = a, this.storeNext = this.pageData ? this.pageData.next : "", this.model.loadArticle(this.currentUrl), this.pageData = this.model.get(this.currentUrl), void 0 === this.pageData ? (this.model.on("change:" + this.currentUrl, this.setColor), this.model.loadArticle(this.currentUrl)) : this.setColor())
            },
            slide: function() {
                this.slideOffClass = this.storeNext === this.currentUrl ? "slideoff-right" : "slideoff-left", this.$el.on("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onSlideOffComplete), this.$body.addClass(this.slideOffClass)
            },
            setColor: function() {
                this.pageData = this.pageData || this.model.get(this.currentUrl), this.$site.removeClass(this.color).addClass(this.pageData.color), this.color = this.pageData.color, this.$site.data("color", this.color), this.model.set("nextArticle", this.pageData.next === Backbone.history.fragment ? "" : this.pageData.next), this.model.set("previousArticle", this.pageData.previous === Backbone.history.fragment ? "" : this.pageData.previous)
            },
            changePost: function() {
                this.$body.addClass("single-post prepare"), this.$site.scrollTop(0), this.$post = a(this.pageData.post), this.$el.html(""), this.$el.append(this.$post), this.model.set("loading", !1), this.commentsView = new d({
                    el: "#comments",
                    model: this.model
                }), window.requestAnimationFrame(b.bind(function() {
                    this.$body.removeClass("prepare").removeClass(this.slideOffClass), e.refresh()
                }, this))
            },
            onHideComplete: function(a) {
                a.target === this.el && (this.$el.off("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onHideComplete), this.model.set("state", this.model.get("nextState")), this.$el.addClass("hide"))
            },
            onSlideOffComplete: function(a) {
                a.target === this.el && (this.$el.off("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onSlideOffComplete), this.$post.remove(), void 0 === this.pageData ? (this.model.on("change:" + this.currentUrl, this.changePost), this.model.set("loading", !0)) : this.changePost())
            },
            onCloseClicked: function(a) {
                a.preventDefault(), Backbone.history.navigate(f.cleanUrl(a.currentTarget.href), !0)
            }
        });
        return g
    }), define("views/FourOhFourView", ["jquery", "underscore"], function(a, b) {
        var c = Backbone.View.extend({
            $body: null,
            initialize: function() {
                b.bindAll(this, "onHideComplete"), this.$body = this.model.get("$body")
            },
            show: function() {
                this.$body.addClass("error404")
            },
            hide: function() {
                this.$el.on("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onHideComplete), this.$body.addClass("clearblock").removeClass("error404")
            },
            onHideComplete: function(a) {
                a.target === this.el && (this.$el.off("webkitTransitionEnd otransitionend msTransitionEnd transitionend", this.onHideComplete), this.model.set("state", this.model.get("nextState")))
            }
        });
        return c
    }), define("views/components/LoaderView", ["jquery", "underscore"], function(a, b) {
        var c = Backbone.View.extend({
            timeout: null,
            initialize: function() {
                b.bindAll(this, "removeSpin", "onloadingChanged"), this.model.on("change:loading", this.onloadingChanged)
            },
            removeSpin: function() {
                this.model.get("loading") || (this.$el.removeClass("loaderspin"), this.timeout && clearTimeout(this.timeout))
            },
            onloadingChanged: function() {
                this.model.get("loading") ? this.$el.addClass("loading loaderspin") : (this.$el.removeClass("loading"), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(this.removeSpin, 500))
            }
        });
        return c
    }), define("controllers/Analytics", ["jquery", "underscore"], function() {
        var a = {
            initialize: function() {
                window._gaq = window._gaq || [], window._gaq.push(["_setAccount", "UA-37618282-1"]), window._gaq.push(["_setDomainName", "minimalmonkey.com"]), window._gaq.push(["_setAllowLinker", !0]), window._gaq.push(["_trackPageview"])
            },
            load: function(a) {
                setTimeout(function() {
                    try {
                        var a = document.createElement("script");
                        a.type = "text/javascript", a.async = !0, a.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
                        var b = document.getElementsByTagName("script")[0];
                        b.parentNode.insertBefore(a, b)
                    } catch (c) {}
                }, a || 0)
            },
            update: function(a) {
                try {
                    _gaq.push(["_trackPageview", a])
                } catch (b) {}
            }
        };
        return a
    }), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
        },
        easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
        },
        easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
        },
        easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
        },
        easeInBounce: function(a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function(a, b, c, d, e) {
            return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
        }
    }), define("libs/jquery/plugins/jquery.easing.1.3", function() {}), define("Router", ["jquery", "underscore", "views/HeaderView", "views/HomeView", "views/LabView", "views/ArticleView", "views/FourOhFourView", "views/components/LoaderView", "controllers/Analytics", "utils/Utils", "libs/jquery/plugins/jquery.easing.1.3"], function(a, b, c, d, e, f, g, h, i, j) {
        var k = Backbone.Router.extend({
            $win: null,
            $body: null,
            model: null,
            currentView: null,
            headerView: null,
            homeView: null,
            articleView: null,
            fourOhFourView: null,
            routes: {
                "": "onShowHome",
                "lab(/)(*path)": "onShowLab",
                "*path": "onShowArticle"
            },
            initialize: function(d) {
                b.bindAll(this, "onShowHome", "onShowHeader", "onShowLab", "onShowArticle", "onShow404", "onStateChange", "onRouteUpdated"), this.model = d.model, this.storeRoutes = [], this.$win = this.model.get("$win"), this.$body = this.model.get("$body");
                for (var e, f = a("#header .links a"), g = f.length; --g > -1;) e = j.cleanUrl(f[g].href), this.route(e, "onShowHeader");
                this.headerView = new c({
                    el: "#header",
                    model: this.model
                }), new h({
                    el: "#site",
                    model: this.model
                }), this.$body.hasClass("error404") && this.route(location.pathname.substr(1), "onShow404"), this.model.on("change:state", this.onStateChange), Backbone.history.start({
                    pushState: !0,
                    hashChange: !1
                }), Backbone.history.on("route", this.onRouteUpdated, this), this.onRouteUpdated()
            },
            prepare: function(a, b, c) {
                this.model.set("nextState", a);
                var d = null === this.model.get("state");
                return d && this.model.set("state", a), b && this.currentView && this.currentView.hide(c || {}), d
            },
            onShowHome: function() {
                if ("home" !== this.model.get("state")) {
                    var a = this.prepare("home", !0);
                    this.currentView = this.homeView ? this.homeView : this.homeView = new d({
                        el: "#panels",
                        model: this.model,
                        deeplink: a
                    })
                } else this.headerView.isOpen && this.headerView.close()
            },
            onShowHeader: function() {
                var a = null === this.model.get("state");
                a && this.onShowHome();
                var b = this.headerView.isOpen ? "" : this.storeRoutes[this.storeRoutes.length - 1] || "";
                // this.headerView.open(Backbone.history.fragment, b, a)
            },
            onShowLab: function() {
                if ("lab" !== this.model.get("state")) {
                    this.$body.scrollLeft(0);
                    var a = this.prepare("lab", !0);
                    this.currentView = this.labView ? this.labView : this.labView = new e({
                        el: "#labwrap",
                        model: this.model,
                        deeplink: a
                    })
                } else this.headerView.isOpen && this.headerView.close()
            },
            onShowArticle: function(a) {
                if ("article" !== this.model.get("state")) {
                    var b = this.prepare("article", !0, {
                        url: a
                    });
                    this.currentView = this.articleView ? this.articleView : this.articleView = new f({
                        el: "#article",
                        model: this.model,
                        url: a,
                        deeplink: b
                    }), this.articleView.preload(a)
                } else this.headerView.isOpen ? this.headerView.isOpen && this.headerView.close() : (this.articleView.preload(a), this.articleView.slide())
            },
            onShow404: function() {
                if ("404" !== this.model.get("state")) {
                    {
                        this.prepare("404", !0)
                    }
                    this.currentView = this.fourOhFourView ? this.fourOhFourView : this.fourOhFourView = new g({
                        el: "#wrap404",
                        model: this.model
                    })
                } else this.headerView.isOpen && this.headerView.close()
            },
            onStateChange: function() {
                var a = this.model.get("stateHistory");
                a.push(this.model.get("state")), this.model.set("lastState", a[a.length - 2] || null), this.currentView && this.currentView.show({
                    url: Backbone.history.fragment
                })
            },
            onRouteUpdated: function() {
                var a = this.storeRoutes.length;
                this.storeRoutes[a] = Backbone.history.fragment, this.model.set("previousUrl", this.storeRoutes[a - 1]), i.update(Backbone.history.fragment)
            }
        });
        return k
    }), define("models/AppModel", ["jquery", "underscore", "utils/Utils"], function(a, b, c) {
        var d = Backbone.Model.extend({
            defaults: function() {
                return {
                    $doc: a(document),
                    $win: a(window),
                    $htmlBody: a("body,html"),
                    $html: a("html"),
                    $body: a(document.body),
                    $site: a("#site"),
                    $siteBlock: a("#site-block"),
                    isTouch: "ontouchstart" in window || "onmsgesturechange" in window,
                    state: null,
                    nextState: null,
                    previousState: null,
                    stateHistory: [],
                    home: null,
                    panels: [],
                    articles: {},
                    nextPage: null,
                    pagesLoaded: !1,
                    nextArticle: null,
                    previousArticle: null,
                    previousUrl: null,
                    isVerticalScroll: null,
                    loading: null,
                    404: {
                        color: "white"
                    }
                }
            },
            loadHome: function() {
                a.ajax({
                    url: "/",
                    dataType: "html",
                    success: b.bind(function(b) {
                        var c = a(b),
                            d = c.find(".next-button.horizontal");
                            // e = d.find("a")[0].href;
                        // this.get("$body").find(".next-button.horizontal").html("<a></a>"), this.set("nextPage", e), this.set("home", c.find("#panels").html())
                    }, this)
                })
            },
            loadNextPage: function() {
                if (!this.get("pagesLoaded")) {
                    var c = this.get("nextPage");
                    a.ajax({
                        url: c,
                        dataType: "html",
                        success: b.bind(function(a) {
                            this.onNextPageLoaded(c, a)
                        }, this)
                    })
                }
            },
            loadArticle: function(c) {
                void 0 === this.get(c) && a.ajax({
                    url: c,
                    dataType: "html",
                    success: b.bind(function(a) {
                        this.onArticleLoaded(c, a)
                    }, this)
                })
            },
            onNextPageLoaded: function(b, c) {
                var d = a(c),
                    e = d.find(".panel");
                if (e.length) {
                    var f = d.find(".next-button a")[0];
                    f ? this.set("nextPage", f.href) : this.set("pagesLoaded", !0), this.set("panels", e)
                }
            },
            onArticleLoaded: function(b, d) {
                if (void 0 === this.get(b)) {
                    var e = a(d).find(".post")[0],
                        f = a(e).data();
                    f.next = c.cleanUrl(f.next), f.previous = c.cleanUrl(f.previous), f.date = c.setTimestamp(f.date), f.post = e, this.set(b, f)
                }
            }
        });
        return d
    }), define("controllers/Resize", ["jquery", "underscore"], function(a, b) {
        var c = {
            model: null,
            debounceResize: null,
            isVerticalScroll: null,
            initialize: function(a) {
                this.model = a, b.bindAll(this, "onPageResize"), this.$win = this.model.get("$win"), this.$body = this.model.get("$body"), this.debounceResize = b.debounce(this.onPageResize, 200), this.$win.on("resize", this.debounceResize), this.onPageResize()
            },
            onPageResize: function() {
                this.$body.scrollTop(0), this.isVerticalScroll = this.$win.width() < 570, this.model.set("isVerticalScroll", this.isVerticalScroll)
            }
        };
        return c
    }),
    function() {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
            var c = (new Date).getTime(),
                d = Math.max(0, 16 - (c - a)),
                e = window.setTimeout(function() {
                    b(c + d)
                }, d);
            return a = c + d, e
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        })
    }(), define("libs/polyfills/rAF", function() {}), define("App", ["jquery", "underscore", "Router", "models/AppModel", "controllers/ShareButtons", "controllers/Analytics", "controllers/Resize", "libs/polyfills/rAF"], function(a, b, c, d, e, f, g) {
        var h = {
            initialize: function() {
                f.initialize(), f.load();
                var a = new d;
                g.initialize(a);
                new c({
                    model: a
                });
                e.initialize(), a.get("isTouch") && a.get("$body").addClass("touch").removeClass("notouch")
            }
        };
        return h
    }), require.config({
        paths: {
            jquery: "libs/jquery/jquery-2.1.0.min",
            underscore: "libs/underscore/underscore.min",
            backbone: "libs/backbone/backbone"
        }
    }), require(["jquery", "underscore"], function(a) {
        a(function() {
            require(["backbone", "App"], function(a, b) {
                b.initialize()
            })
        })
    }), define("main", function() {});



$('a.panel').click(function(e) {
    e.preventDefault();
})