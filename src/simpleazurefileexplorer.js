﻿!
function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).azfile = {})
} (this, function (f) {
    "use strict";
    function r(e) {
        return e.toLowerCase()
    }
    var e, m = function () {
        function e(e) {
            if (this._headersMap = {},
            e) for (var t in e) this.set(t, e[t])
        }
        return e.prototype.set = function (e, t) {
            this._headersMap[r(e)] = {
                name: e,
                value: t.toString()
            }
        },
        e.prototype.get = function (e) {
            var t = this._headersMap[r(e)];
            return t ? t.value : void 0
        },
        e.prototype.contains = function (e) {
            return !! this._headersMap[r(e)]
        },
        e.prototype.remove = function (e) {
            var t = this.contains(e);
            return delete this._headersMap[r(e)],
            t
        },
        e.prototype.rawHeaders = function () {
            var e = {};
            for (var t in this._headersMap) {
                var r = this._headersMap[t];
                e[r.name.toLowerCase()] = r.value
            }
            return e
        },
        e.prototype.headersArray = function () {
            var e = [];
            for (var t in this._headersMap) e.push(this._headersMap[t]);
            return e
        },
        e.prototype.headerNames = function () {
            for (var e = [], t = this.headersArray(), r = 0; r < t.length; ++r) e.push(t[r].name);
            return e
        },
        e.prototype.headerValues = function () {
            for (var e = [], t = this.headersArray(), r = 0; r < t.length; ++r) e.push(t[r].value);
            return e
        },
        e.prototype.toJson = function () {
            return this.rawHeaders()
        },
        e.prototype.toString = function () {
            return JSON.stringify(this.toJson())
        },
        e.prototype.clone = function () {
            return new e(this.rawHeaders())
        },
        e
    } ();
    function s(e) {
        for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
        return btoa(t)
    }
    function n(e) {
        for (var t = atob(e), r = new Uint8Array(t.length), i = 0; i < t.length; i++) r[i] = t.charCodeAt(i);
        return r
    }
    for (var d = (e = void 0, function (e) {
        var t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (t) {
            var r = new Uint8Array(16);
            e.exports = function () {
                return t(r),
                r
            }
        } else {
            var i = new Array(16);
            e.exports = function () {
                for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()),
                i[t] = e >>> ((3 & t) << 3) & 255;
                return i
            }
        }
    } (e = {
        exports: {}
    }), e.exports), p = [], t = 0; t < 256; ++t) p[t] = (t + 256).toString(16).substr(1);
    var i = function (e, t, r) {
        var i = t && r || 0;
        "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
        var n, a, o, s, l = (e = e || {}).random || (e.rng || d)();
        if (l[6] = 15 & l[6] | 64, l[8] = 63 & l[8] | 128, t) for (var u = 0; u < 16; ++u) t[i + u] = l[u];
        return t || (o = a || 0, [(s = p)[(n = l)[o++]], s[n[o++]], s[n[o++]], s[n[o++]], "-", s[n[o++]], s[n[o++]], "-", s[n[o++]], s[n[o++]], "-", s[n[o++]], s[n[o++]], "-", s[n[o++]], s[n[o++]], s[n[o++]], s[n[o++]], s[n[o++]], s[n[o++]]].join(""))
    },
    h = {
        msRestVersion: "2.0.3",
        HTTP: "http:",
        HTTPS: "https:",
        HTTP_PROXY: "HTTP_PROXY",
        HTTPS_PROXY: "HTTPS_PROXY",
        HttpConstants: {
            HttpVerbs: {
                PUT: "PUT",
                GET: "GET",
                DELETE: "DELETE",
                POST: "POST",
                MERGE: "MERGE",
                HEAD: "HEAD",
                PATCH: "PATCH"
            },
            StatusCodes: {
                TooManyRequests: 429
            }
        },
        HeaderConstants: {
            AUTHORIZATION: "authorization",
            AUTHORIZATION_SCHEME: "Bearer",
            RETRY_AFTER: "Retry-After",
            USER_AGENT: "User-Agent"
        }
    },
    l = "undefined" != typeof process && !!process.version && !!process.versions && !!process.versions.node;
    function g(e) {
        var t = {};
        return t.body = e.bodyAsText,
        t.headers = e.headers,
        t.status = e.status,
        t
    }
    function v(e) {
        var t = e.clone();
        return t.headers && t.headers.remove("authorization"),
        t
    }
    function y() {
        return i()
    }
    function c(t, r) {
        return new Promise(function (e) {
            return setTimeout(function () {
                return e(r)
            },
            t)
        })
    }
    var u = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function a(e, t, r) {
        return e && t ? e.split(t).join(r || "") : e
    }
    var b = function () {
        function e(e, t) {
            void 0 === e && (e = {}),
            this.modelMappers = e,
            this.isXML = t
        }
        return e.prototype.validateConstraints = function (e, r, i) {
            var t = function (e, t) {
                throw new Error('"' + i + '" with value "' + r + '" should satisfy the constraint "' + e + '": ' + t + ".")
            };
            if (e.constraints && null != r) {
                var n = e.constraints,
                a = n.ExclusiveMaximum,
                o = n.ExclusiveMinimum,
                s = n.InclusiveMaximum,
                l = n.InclusiveMinimum,
                u = n.MaxItems,
                d = n.MaxLength,
                p = n.MinItems,
                c = n.MinLength,
                m = n.MultipleOf,
                f = n.Pattern,
                h = n.UniqueItems;
                if (null != a && a <= r && t("ExclusiveMaximum", a), null != o && r <= o && t("ExclusiveMinimum", o), null != s && s < r && t("InclusiveMaximum", s), null != l && r < l && t("InclusiveMinimum", l), null != u && r.length > u && t("MaxItems", u), null != d && r.length > d && t("MaxLength", d), null != p && r.length < p && t("MinItems", p), null != c && r.length < c && t("MinLength", c), null != m && r % m != 0 && t("MultipleOf", m), f) {
                    var y = "string" == typeof f ? new RegExp(f) : f;
                    "string" == typeof r && null !== r.match(y) || t("Pattern", f)
                }
                h && r.some(function (e, t, r) {
                    return r.indexOf(e) !== t
                }) && t("UniqueItems", h)
            }
        },
        e.prototype.serialize = function (e, t, r) {
            var i = {},
            n = e.type.name;
            r || (r = e.serializedName),
            null !== n.match(/^Sequence$/gi) && (i = []),
            e.isConstant && (t = e.defaultValue);
            var a = e.required,
            o = e.nullable;
            if (a && o && void 0 === t) throw new Error(r + " cannot be undefined.");
            if (a && !o && null == t) throw new Error(r + " cannot be null or undefined.");
            if (!a && !1 === o && null === t) throw new Error(r + " cannot be null.");
            return null == t ? i = t : (this.validateConstraints(e, t, r), null !== n.match(/^any$/gi) ? i = t : null !== n.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/gi) ? i = function (e, t, r) {
                if (null != r) if (null !== e.match(/^Number$/gi)) {
                    if ("number" != typeof r) throw new Error(t + " with value " + r + " must be of type number.")
                } else if (null !== e.match(/^String$/gi)) {
                    if ("string" != typeof r.valueOf()) throw new Error(t + ' with value "' + r + '" must be of type string.')
                } else if (null !== e.match(/^Uuid$/gi)) {
                    if ("string" != typeof r.valueOf() || (n = r, !new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "ig").test(n))) throw new Error(t + ' with value "' + r + '" must be of type string and a valid uuid.')
                } else if (null !== e.match(/^Boolean$/gi)) {
                    if ("boolean" != typeof r) throw new Error(t + " with value " + r + " must be of type boolean.")
                } else if (null !== e.match(/^Stream$/gi)) {
                    var i = typeof r;
                    if (! ("string" === i || "function" === i || r instanceof ArrayBuffer || ArrayBuffer.isView(r) || "function" == typeof Blob && r instanceof Blob)) throw new Error(t + " must be a string, Blob, ArrayBuffer, ArrayBufferView, or a function returning NodeJS.ReadableStream.")
                }
                var n;
                return r
            } (n, r, t) : null !== n.match(/^Enum$/gi) ? i = function (e, t, r) {
                if (!t) throw new Error("Please provide a set of allowedValues to validate " + e + " as an Enum Type.");
                if (!t.some(function (e) {
                    return "string" == typeof e.valueOf() ? e.toLowerCase() === r.toLowerCase() : e === r
                })) throw new Error(r + " is not a valid value for " + e + ". The valid values are: " + JSON.stringify(t) + ".");
                return r
            } (r, e.type.allowedValues, t) : null !== n.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/gi) ? i = function (e, t, r) {
                if (null != t) if (null !== e.match(/^Date$/gi)) {
                    if (! (t instanceof Date || "string" == typeof t.valueOf() && !isNaN(Date.parse(t)))) throw new Error(r + " must be an instanceof Date or a string in ISO8601 format.");
                    t = t instanceof Date ? t.toISOString().substring(0, 10) : new Date(t).toISOString().substring(0, 10)
                } else if (null !== e.match(/^DateTime$/gi)) {
                    if (! (t instanceof Date || "string" == typeof t.valueOf() && !isNaN(Date.parse(t)))) throw new Error(r + " must be an instanceof Date or a string in ISO8601 format.");
                    t = t instanceof Date ? t.toISOString() : new Date(t).toISOString()
                } else if (null !== e.match(/^DateTimeRfc1123$/gi)) {
                    if (! (t instanceof Date || "string" == typeof t.valueOf() && !isNaN(Date.parse(t)))) throw new Error(r + " must be an instanceof Date or a string in RFC-1123 format.");
                    t = t instanceof Date ? t.toUTCString() : new Date(t).toUTCString()
                } else if (null !== e.match(/^UnixTime$/gi)) {
                    if (! (t instanceof Date || "string" == typeof t.valueOf() && !isNaN(Date.parse(t)))) throw new Error(r + " must be an instanceof Date or a string in RFC-1123/ISO8601 format for it to be serialized in UnixTime/Epoch format.");
                    t = function (e) {
                        if (e) return "string" == typeof e.valueOf() && (e = new Date(e)),
                        Math.floor(e.getTime() / 1e3)
                    } (t)
                } else if (null !== e.match(/^TimeSpan$/gi)) {
                    if (i = t, !u.test(i)) throw new Error(r + ' must be a string in ISO 8601 format. Instead was "' + t + '".');
                    t = t
                }
                var i;
                return t
            } (n, t, r) : null !== n.match(/^ByteArray$/gi) ? i = function (e, t) {
                if (null != t) {
                    if (! (t instanceof Uint8Array)) throw new Error(r + " must be of type Uint8Array.");
                    t = s(t)
                }
                return t
            } (0, t) : null !== n.match(/^Base64Url$/gi) ? i = function (e, t) {
                if (null != t) {
                    if (! (t instanceof Uint8Array)) throw new Error(r + " must be of type Uint8Array.");
                    t = function (e) {
                        if (e) {
                            if (! (e instanceof Uint8Array)) throw new Error("Please provide an input of type Uint8Array for converting to Base64Url.");
                            return function (e, t) {
                                for (var r = e.length; 0 <= r - 1 && "=" === e[r - 1];)--r;
                                return e.substr(0, r)
                            } (s(e)).replace(/\+/g, "-").replace(/\//g, "_")
                        }
                    } (t)
                }
                return t
            } (0, t) : null !== n.match(/^Sequence$/gi) ? i = function (e, t, r, i) {
                if (!Array.isArray(r)) throw new Error(i + " must be of type Array.");
                var n = t.type.element;
                if (!n || "object" != typeof n) throw new Error('element" metadata for an Array must be defined in the mapper and it must of type "object" in ' + i + ".");
                for (var a = [], o = 0; o < r.length; o++) a[o] = e.serialize(n, r[o], i);
                return a
            } (this, e, t, r) : null !== n.match(/^Dictionary$/gi) ? i = function (e, t, r, i) {
                if ("object" != typeof r) throw new Error(i + " must be of type object.");
                var n = t.type.value;
                if (!n || "object" != typeof n) throw new Error('"value" metadata for a Dictionary must be defined in the mapper and it must of type "object" in ' + i + ".");
                for (var a = {}, o = 0, s = Object.keys(r); o < s.length; o++) {
                    var l = s[o];
                    a[l] = e.serialize(n, r[l], i + "." + l)
                }
                return a
            } (this, e, t, r) : null !== n.match(/^Composite$/gi) && (i = function (e, t, r, i) {
                var n;
                if (F(e, t) && (t = H(e, t, r, "clientName")), null == r) return r;
                for (var a = {}, o = O(e, t, i), s = 0, l = Object.keys(o); s < l.length; s++) {
                    var u = l[s],
                    d = o[u];
                    if (!d.readOnly) {
                        var p = void 0,
                        c = a;
                        if (e.isXML) p = d.xmlIsWrapped ? d.xmlName : d.xmlElementName || d.xmlName;
                        else {
                            var m = M(d.serializedName);
                            p = m.pop();
                            for (var f = 0, h = m; f < h.length; f++) {
                                var y = h[f];
                                null == c[y] && null != r[u] && (c[y] = {}),
                                c = c[y]
                            }
                        }
                        if (null != c) {
                            var g = "" !== d.serializedName ? i + "." + d.serializedName : i,
                            v = r[u],
                            b = F(e, t);
                            b && b.clientName === u && null == v && (v = t.serializedName);
                            var S = e.serialize(d, v, g);
                            void 0 !== S && null != p && (d.xmlIsAttribute ? (c.$ = c.$ || {},
                            c.$[p] = S) : d.xmlIsWrapped ? c[p] = ((n = {})[d.xmlElementName] = S, n) : c[p] = S)
                        }
                    }
                }
                var N = t.type.additionalProperties;
                if (N) {
                    var x = Object.keys(o),
                    P = function (t) {
                        x.every(function (e) {
                            return e !== t
                        }) && (a[t] = e.serialize(N, r[t], i + '["' + t + '"]'))
                    };
                    for (var _ in r) P(_)
                }
                return a
            } (this, e, t, r))),
            i
        },
        e.prototype.deserialize = function (u, t, e) {
            if (null == t) return this.isXML && "Sequence" === u.type.name && !u.xmlIsWrapped && (t = []),
            void 0 !== u.defaultValue && (t = u.defaultValue),
            t;
            var r, i = u.type.name;
            return e || (e = u.serializedName),
            null !== i.match(/^Composite$/gi) ? r = function (e, t, r, i) {
                F(e, t) && (t = H(e, t, r, "serializedName"));
                for (var n = O(e, t, i), a = {},
                o = [], s = 0, l = Object.keys(n); s < l.length; s++) {
                    var u = l[s],
                    d = n[u],
                    p = M(n[u].serializedName);
                    o.push(p[0]);
                    var c = d.serializedName,
                    m = d.xmlName,
                    f = d.xmlElementName,
                    h = i;
                    "" !== c && void 0 !== c && (h = i + "." + c);
                    var y = d.headerCollectionPrefix;
                    if (y) {
                        for (var g = {}, v = 0, b = Object.keys(r); v < b.length; v++) {
                            var S = b[v];
                            S.startsWith(y) && (g[S.substring(y.length)] = e.deserialize(d.type.value, r[S], h)),
                            o.push(S)
                        }
                        a[u] = g
                    } else if (e.isXML) if (d.xmlIsAttribute && r.$) a[u] = e.deserialize(d, r.$[m], h);
                    else {
                        var N = r[f || m || c];
                        if (d.xmlIsWrapped) void 0 === (N = (N = r[m]) && N[f]) && (N = []);
                        a[u] = e.deserialize(d, N, h)
                    } else {
                        for (var x = void 0, P = r, _ = 0, w = p; _ < w.length; _++) {
                            var T = w[_];
                            if (!P) break;
                            P = P[T]
                        }
                        x = P;
                        var R = t.type.polymorphicDiscriminator;
                        R && u === R.clientName && null == x && (x = t.serializedName);
                        var E = void 0;
                        Array.isArray(r[u]) && "" === n[u].serializedName ? (x = r[u], a = e.deserialize(d, x, h)) : void 0 === x && void 0 === d.defaultValue || (E = e.deserialize(d, x, h), a[u] = E)
                    }
                }
                var z = t.type.additionalProperties;
                if (z) {
                    var C = function (e) {
                        for (var t in n) {
                            if (M(n[t].serializedName)[0] === e) return !1
                        }
                        return !0
                    };
                    for (var q in r) C(q) && (a[q] = e.deserialize(z, r[q], i + '["' + q + '"]'))
                } else if (r) for (var D = 0, I = Object.keys(r); D < I.length; D++) {
                    void 0 !== a[u = I[D]] || o.includes(u) || ["$", "_"].includes(u) || (a[u] = r[u])
                }
                return a
            } (this, u, t, e) : (this.isXML && null != t.$ && null != t._ && (t = t._), null !== i.match(/^Number$/gi) ? (r = parseFloat(t), isNaN(r) && (r = t)) : null !== i.match(/^Boolean$/gi) ? r = "true" === t || "false" !== t && t : null !== i.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/gi) ? r = t : null !== i.match(/^(Date|DateTime|DateTimeRfc1123)$/gi) ? r = new Date(t) : null !== i.match(/^UnixTime$/gi) ? r = function (e) {
                if (t) return new Date(1e3 * t)
            } () : null !== i.match(/^ByteArray$/gi) ? r = n(t) : null !== i.match(/^Base64Url$/gi) ? r = function (e) {
                if (e) {
                    if (e && "string" != typeof e.valueOf()) throw new Error("Please provide an input of type string for converting to Uint8Array");
                    return n(e = e.replace(/\-/g, "+").replace(/\_/g, "/"))
                }
            } (t) : null !== i.match(/^Sequence$/gi) ? r = function (e, t, r, i) {
                var n = u.type.element;
                if (!n || "object" != typeof n) throw new Error('element" metadata for an Array must be defined in the mapper and it must of type "object" in ' + i);
                if (r) {
                    Array.isArray(r) || (r = [r]);
                    for (var a = [], o = 0; o < r.length; o++) a[o] = e.deserialize(n, r[o], i + "[" + o + "]");
                    return a
                }
                return r
            } (this, 0, t, e) : null !== i.match(/^Dictionary$/gi) && (r = function (e, t, r, i) {
                var n = u.type.value;
                if (!n || "object" != typeof n) throw new Error('"value" metadata for a Dictionary must be defined in the mapper and it must of type "object" in ' + i);
                if (r) {
                    for (var a = {}, o = 0, s = Object.keys(r); o < s.length; o++) {
                        var l = s[o];
                        a[l] = e.deserialize(n, r[l], i)
                    }
                    return a
                }
                return r
            } (this, 0, t, e))),
            u.isConstant && (r = u.defaultValue),
            r
        },
        e
    } ();
    function M(e) {
        var t = [],
        r = "";
        if (e) for (var i = 0, n = e.split("."); i < n.length; i++) {
            var a = n[i];
            "\\" === a.charAt(a.length - 1) ? r += a.substr(0, a.length - 1) + "." : (r += a, t.push(r), r = "")
        }
        return t
    }
    function O(e, t, r) {
        var i = t.type.modelProperties;
        if (!i) {
            var n = t.type.className;
            if (!n) throw new Error('Class name for model "' + r + '" is not provided in the mapper "' + JSON.stringify(t, void 0, 2) + '".');
            var a = e.modelMappers[n];
            if (!a) throw new Error('mapper() cannot be null or undefined for model "' + n + '".');
            if (! (i = a.type.modelProperties)) throw new Error('modelProperties cannot be null or undefined in the mapper "' + JSON.stringify(a) + '" of type "' + n + '" for object "' + r + '".')
        }
        return i
    }
    function H(e, t, r, i) {
        var n = F(e, t);
        if (n) {
            var a = n[i];
            if (null != a) {
                var o = r[a];
                if (null != o) {
                    var s = t.type.uberParent || t.type.className,
                    l = o === s ? o : s + "." + o,
                    u = e.modelMappers.discriminators[l];
                    u && (t = u)
                }
            }
        }
        return t
    }
    function F(e, t) {
        return t.type.polymorphicDiscriminator || o(e, t.type.uberParent) || o(e, t.type.className)
    }
    function o(e, t) {
        return t && e.modelMappers[t] && e.modelMappers[t].type.polymorphicDiscriminator
    }
    var z = function (e) {
        for (var t = {}, r = 0, i = ["Base64Url", "Boolean", "ByteArray", "Composite", "Date", "DateTime", "DateTimeRfc1123", "Dictionary", "Enum", "Number", "Object", "Sequence", "String", "Stream", "TimeSpan", "UnixTime"]; r < i.length; r++) {
            var n = i[r];
            t[n] = n
        }
        return t
    } (),
    C = function () {
        function t(e, t, r, i, n, a, o, s, l, u, d, p, c) {
            this.streamResponseBody = a,
            this.url = e || "",
            this.method = t || "GET",
            this.headers = n instanceof m ? n : new m(n),
            this.body = r,
            this.query = i,
            this.formData = void 0,
            this.withCredentials = o || !1,
            this.abortSignal = s,
            this.timeout = l || 0,
            this.onUploadProgress = u,
            this.onDownloadProgress = d,
            this.proxySettings = p,
            this.keepAlive = c
        }
        return t.prototype.validateRequestProperties = function () {
            if (!this.method) throw new Error("WebResource.method is required.");
            if (!this.url) throw new Error("WebResource.url is required.")
        },
        t.prototype.prepare = function (e) {
            if (!e) throw new Error("options object is required");
            if (null == e.method || "string" != typeof e.method.valueOf()) throw new Error("options.method must be a string.");
            if (e.url && e.pathTemplate) throw new Error("options.url and options.pathTemplate are mutually exclusive. Please provide exactly one of them.");
            if (! (null != e.pathTemplate && "string" == typeof e.pathTemplate.valueOf() || null != e.url && "string" == typeof e.url.valueOf())) throw new Error("Please provide exactly one of options.pathTemplate or options.url.");
            if (e.url) {
                if ("string" != typeof e.url) throw new Error('options.url must be of type "string".');
                this.url = e.url
            }
            if (e.method) {
                var t = ["GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST", "PATCH", "TRACE"];
                if (-1 === t.indexOf(e.method.toUpperCase())) throw new Error('The provided method "' + e.method + '" is invalid. Supported HTTP methods are: ' + JSON.stringify(t))
            }
            if (this.method = e.method.toUpperCase(), e.pathTemplate) {
                var i = e.pathTemplate,
                n = e.pathParameters;
                if ("string" != typeof i) throw new Error('options.pathTemplate must be of type "string".');
                e.baseUrl || (e.baseUrl = "https://management.azure.com");
                var r = e.baseUrl,
                a = r + (r.endsWith("/") ? "" : "/") + (i.startsWith("/") ? i.slice(1) : i),
                o = a.match(/({\w*\s*\w*})/gi);
                if (o && o.length) {
                    if (!n) throw new Error("pathTemplate: " + i + " has been provided. Hence, options.pathParameters must also be provided.");
                    o.forEach(function (e) {
                        var t = e.slice(1, -1),
                        r = n[t];
                        if (null == r || "string" != typeof r && "object" != typeof r) throw new Error("pathTemplate: " + i + " contains the path parameter " + t + " however, it is not present in " + n + " - " + JSON.stringify(n, void 0, 2) + '.The value of the path parameter can either be a "string" of the form { ' + t + ': "some sample value" } or it can be an "object" of the form { "' + t + '": { value: "some sample value", skipUrlEncoding: true } }.');
                        if ("string" == typeof r.valueOf() && (a = a.replace(e, encodeURIComponent(r))), "object" == typeof r.valueOf()) {
                            if (!r.value) throw new Error("options.pathParameters[" + t + '] is of type "object" but it does not contain a "value" property.');
                            a = r.skipUrlEncoding ? a.replace(e, r.value) : a.replace(e, encodeURIComponent(r.value))
                        }
                    })
                }
                this.url = a
            }
            if (e.queryParameters) {
                var s = e.queryParameters;
                if ("object" != typeof s) throw new Error('options.queryParameters must be of type object. It should be a JSON object of "query-parameter-name" as the key and the "query-parameter-value" as the value. The "query-parameter-value" may be fo type "string" or an "object" of the form { value: "query-parameter-value", skipUrlEncoding: true }.');
                this.url && -1 === this.url.indexOf("?") && (this.url += "?");
                var l = [];
                for (var u in this.query = {}, s) {
                    var d = s[u];
                    if (d) if ("string" == typeof d) l.push(u + "=" + encodeURIComponent(d)),
                    this.query[u] = encodeURIComponent(d);
                    else if ("object" == typeof d) {
                        if (!d.value) throw new Error("options.queryParameters[" + u + '] is of type "object" but it does not contain a "value" property.');
                        d.skipUrlEncoding ? (l.push(u + "=" + d.value), this.query[u] = d.value) : (l.push(u + "=" + encodeURIComponent(d.value)), this.query[u] = encodeURIComponent(d.value))
                    }
                }
                this.url += l.join("&")
            }
            if (e.headers) for (var p = e.headers, c = 0, m = Object.keys(e.headers); c < m.length; c++) {
                var f = m[c];
                this.headers.set(f, p[f])
            }
            return this.headers.get("accept-language") || this.headers.set("accept-language", "en-US"),
            this.headers.get("x-ms-client-request-id") || e.disableClientRequestId || this.headers.set("x-ms-client-request-id", y()),
            this.headers.get("Content-Type") || this.headers.set("Content-Type", "application/json; charset=utf-8"),
            this.body = e.body,
            null != e.body && (e.bodyIsStream ? (this.headers.get("Transfer-Encoding") || this.headers.set("Transfer-Encoding", "chunked"), "application/octet-stream" !== this.headers.get("Content-Type") && this.headers.set("Content-Type", "application/octet-stream")) : (e.serializationMapper && (this.body = new b(e.mappers).serialize(e.serializationMapper, e.body, "requestBody")), e.disableJsonStringifyOnBody || (this.body = JSON.stringify(e.body)))),
            this.abortSignal = e.abortSignal,
            this.onDownloadProgress = e.onDownloadProgress,
            this.onUploadProgress = e.onUploadProgress,
            this
        },
        t.prototype.clone = function () {
            var e = new t(this.url, this.method, this.body, this.query, this.headers && this.headers.clone(), this.streamResponseBody, this.withCredentials, this.abortSignal, this.timeout, this.onUploadProgress, this.onDownloadProgress);
            return this.formData && (e.formData = this.formData),
            this.operationSpec && (e.operationSpec = this.operationSpec),
            this.shouldDeserialize && (e.shouldDeserialize = this.shouldDeserialize),
            this.operationResponseGetter && (e.operationResponseGetter = this.operationResponseGetter),
            e
        },
        t
    } (),
    S = function (e, t) {
        return (S = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array &&
        function (e, t) {
            e.__proto__ = t
        } ||
        function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
        })(e, t)
    };
    function N(e, t) {
        function r() {
            this.constructor = e
        }
        S(e, t),
        e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
    }
    var q = function () {
        return (q = Object.assign ||
        function (e) {
            for (var t, r = 1, i = arguments.length; r < i; r++) for (var n in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        }).apply(this, arguments)
    };
    function x(a, o, s, l) {
        return new(s || (s = Promise))(function (e, t) {
            function r(e) {
                try {
                    n(l.next(e))
                } catch(e) {
                    t(e)
                }
            }
            function i(e) {
                try {
                    n(l.
                    throw (e))
                } catch(e) {
                    t(e)
                }
            }
            function n(t) {
                t.done ? e(t.value) : new s(function (e) {
                    e(t.value)
                }).then(r, i)
            }
            n((l = l.apply(a, o || [])).next())
        })
    }
    function P(r, i) {
        var n, a, o, e, s = {
            label: 0,
            sent: function () {
                if (1 & o[0]) throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return e = {
            next: t(0),
            throw: t(1),
            return: t(2)
        },
        "function" == typeof Symbol && (e[Symbol.iterator] = function () {
            return this
        }),
        e;
        function t(t) {
            return function (e) {
                return function (t) {
                    if (n) throw new TypeError("Generator is already executing.");
                    for (; s;) try {
                        if (n = 1, a && (o = 2 & t[0] ? a.
                        return : t[0] ? a.
                        throw || ((o = a.
                        return) && o.call(a), 0) : a.next) && !(o = o.call(a, t[1])).done) return o;
                        switch (a = 0, o && (t = [2 & t[0], o.value]), t[0]) {
                        case 0:
                            case 1:
                            o = t;
                            break;
                        case 4:
                            return s.label++,
                            {
                                value: t[1],
                                done: !1
                            };
                        case 5:
                            s.label++,
                            a = t[1],
                            t = [0];
                            continue;
                        case 7:
                            t = s.ops.pop(),
                            s.trys.pop();
                            continue;
                        default:
                            if (! (o = 0 < (o = s.trys).length && o[o.length - 1]) && (6 === t[0] || 2 === t[0])) {
                                s = 0;
                                continue
                            }
                            if (3 === t[0] && (!o || t[1] > o[0] && t[1] < o[3])) {
                                s.label = t[1];
                                break
                            }
                            if (6 === t[0] && s.label < o[1]) {
                                s.label = o[1],
                                o = t;
                                break
                            }
                            if (o && s.label < o[2]) {
                                s.label = o[2],
                                s.ops.push(t);
                                break
                            }
                            o[2] && s.ops.pop(),
                            s.trys.pop();
                            continue
                        }
                        t = i.call(r, s)
                    } catch(e) {
                        t = [6, e],
                        a = 0
                    } finally {
                        n = o = 0
                    }
                    if (5 & t[0]) throw t[1];
                    return {
                        value: t[0] ? t[1] : void 0,
                        done: !0
                    }
                } ([t, e])
            }
        }
    }
    var _, w = function (s) {
        function l(e, t, r, i, n, a) {
            var o = s.call(this, e) || this;
            return o.code = t,
            o.statusCode = r,
            o.request = i,
            o.response = n,
            o.body = a,
            Object.setPrototypeOf(o, l.prototype),
            o
        }
        return N(l, s),
        l.REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR",
        l.REQUEST_ABORTED_ERROR = "REQUEST_ABORTED_ERROR",
        l.PARSE_ERROR = "PARSE_ERROR",
        l
    } (Error),
    T = function () {
        function e() {}
        return e.prototype.sendRequest = function (r) {
            var i = new XMLHttpRequest;
            if (r.proxySettings) throw new Error("HTTP proxy is not supported in browser environment");
            var e = r.abortSignal;
            if (e) {
                var t = function () {
                    i.abort()
                };
                e.addEventListener("abort", t),
                i.addEventListener("readystatechange", function () {
                    i.readyState === XMLHttpRequest.DONE && e.removeEventListener("abort", t)
                })
            }
            if (R(i.upload, r.onUploadProgress), R(i, r.onDownloadProgress), r.formData) {
                for (var n = r.formData, a = new FormData, o = function (e, t) {
                    t && t.hasOwnProperty("value") && t.hasOwnProperty("options") ? a.append(e, t.value, t.options) : a.append(e, t)
                },
                s = 0, l = Object.keys(n); s < l.length; s++) {
                    var u = l[s],
                    d = n[u];
                    if (Array.isArray(d)) for (var p = 0; p < d.length; p++) o(u, d[p]);
                    else o(u, d)
                }
                r.body = a,
                r.formData = void 0;
                var c = r.headers.get("Content-Type");
                c && -1 !== c.indexOf("multipart/form-data") && r.headers.remove("Content-Type")
            }
            i.open(r.method, r.url),
            i.timeout = r.timeout,
            i.withCredentials = r.withCredentials;
            for (var m = 0, f = r.headers.headersArray(); m < f.length; m++) {
                var h = f[m];
                i.setRequestHeader(h.name, h.value)
            }
            return i.responseType = r.streamResponseBody ? "blob" : "text",
            i.send(void 0 === r.body ? null : r.body),
            r.streamResponseBody ? new Promise(function (t, e) {
                i.addEventListener("readystatechange", function () {
                    if (i.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                        var e = new Promise(function (e, t) {
                            i.addEventListener("load", function () {
                                e(i.response)
                            }),
                            D(r, i, t)
                        });
                        t({
                            request: r,
                            status: i.status,
                            headers: E(i),
                            blobBody: e
                        })
                    }
                }),
                D(r, i, e)
            }) : new Promise(function (e, t) {
                i.addEventListener("load", function () {
                    return e({
                        request: r,
                        status: i.status,
                        headers: E(i),
                        bodyAsText: i.responseText
                    })
                }),
                D(r, i, t)
            })
        },
        e
    } ();
    function R(e, t) {
        t && e.addEventListener("progress", function (e) {
            return t({
                loadedBytes: e.loaded
            })
        })
    }
    function E(e) {
        for (var t = new m, r = 0, i = e.getAllResponseHeaders().trim().split(/[\r\n]+/); r < i.length; r++) {
            var n = i[r],
            a = n.indexOf(":"),
            o = n.slice(0, a),
            s = n.slice(a + 2);
            t.set(o, s)
        }
        return t
    }
    function D(e, t, r) {
        t.addEventListener("error", function () {
            return r(new w("Failed to send request to " + e.url, w.REQUEST_SEND_ERROR, void 0, e))
        }),
        t.addEventListener("abort", function () {
            return r(new w("The request was aborted", w.REQUEST_ABORTED_ERROR, void 0, e))
        }),
        t.addEventListener("timeout", function () {
            return r(new w("timeout of " + t.timeout + "ms exceeded", w.REQUEST_SEND_ERROR, void 0, e))
        })
    }
    function I(e) {
        return L(e.parameterPath, e.mapper)
    }
    function L(e, t) {
        return "string" == typeof e ? e : Array.isArray(e) ? e.join(".") : t.serializedName
    }
    function A(e) {
        var t = !1;
        for (var r in e.responses) {
            var i = e.responses[r];
            if (i.bodyMapper && i.bodyMapper.type.name === z.Stream) {
                t = !0;
                break
            }
        }
        return t
    } (_ = f.HttpPipelineLogLevel || (f.HttpPipelineLogLevel = {}))[_.OFF = 0] = "OFF",
    _[_.ERROR = 1] = "ERROR",
    _[_.WARNING = 2] = "WARNING",
    _[_.INFO = 3] = "INFO";
    var U = new DOMParser;
    var j = "";
    try {
        j = U.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI
    } catch(f) {}
    var k = document.implementation.createDocument(null, null, null),
    B = new XMLSerializer;
    function G(e, t) {
        var r = function e(t, r) {
            if ("string" == typeof t || "number" == typeof t || "boolean" == typeof t) return (u = k.createElement(r)).textContent = t.toString(),
            [u];
            if (Array.isArray(t)) {
                for (var i = [], n = 0, a = t; n < a.length; n++) for (var o = 0, s = e(a[n], r); o < s.length; o++) {
                    var l = s[o];
                    i.push(l)
                }
                return i
            }
            if ("object" != typeof t) throw new Error("Illegal value passed to buildObject: " + t);
            for (var u = k.createElement(r), d = 0, p = Object.keys(t); d < p.length; d++) {
                var c = p[d];
                if ("$" === c) for (var m = 0, f = V(t[c]); m < f.length; m++) {
                    var h = f[m];
                    u.attributes.setNamedItem(h)
                } else for (var y = 0, g = e(t[c], c); y < g.length; y++) {
                    l = g[y];
                    u.appendChild(l)
                }
            }
            return [u]
        } (e, t && t.rootName || "root")[0];
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + B.serializeToString(r)
    }
    function V(e) {
        for (var t = [], r = 0, i = Object.keys(e); r < i.length; r++) {
            var n = i[r],
            a = k.createAttribute(n);
            a.value = e[n].toString(),
            t.push(a)
        }
        return t
    }
    var X = function () {
        function e(e, t) {
            this._nextPolicy = e,
            this._options = t
        }
        return e.prototype.shouldLog = function (e) {
            return this._options.shouldLog(e)
        },
        e.prototype.log = function (e, t) {
            this._options.log(e, t)
        },
        e
    } (),
    W = function () {
        function e(e) {
            this._logger = e
        }
        return e.prototype.shouldLog = function (e) {
            return !! this._logger && e !== f.HttpPipelineLogLevel.OFF && e <= this._logger.minimumLogLevel
        },
        e.prototype.log = function (e, t) {
            this._logger && this.shouldLog(e) && this._logger.log(e, t)
        },
        e
    } ();
    function Q(r) {
        return {
            create: function (e, t) {
                return new J(e, r, t)
            }
        }
    }
    var $ = ["application/json", "text/json"],
    Y = ["application/xml", "application/atom+xml"],
    J = function (n) {
        function e(e, t, r) {
            var i = n.call(this, e, r) || this;
            return i.jsonContentTypes = t && t.json || $,
            i.xmlContentTypes = t && t.xml || Y,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (t) {
            return x(this, void 0, void 0, function () {
                var i = this;
                return P(this, function (e) {
                    return [2, this._nextPolicy.sendRequest(t).then(function (e) {
                        return t = i.jsonContentTypes,
                        r = i.xmlContentTypes,
                        function (t, r, n) {
                            var e = function (e) {
                                var t = 'Error "' + e + '" occurred while parsing the response body - ' + n.bodyAsText + ".",
                                r = e.code || w.PARSE_ERROR,
                                i = new w(t, r, n.status, n.request, n, n.bodyAsText);
                                return Promise.reject(i)
                            };
                            if (!n.request.streamResponseBody && n.bodyAsText) {
                                var i = n.bodyAsText,
                                a = n.headers.get("Content-Type") || "",
                                o = a ? a.split(";").map(function (e) {
                                    return e.toLowerCase()
                                }) : [];
                                if (0 === o.length || o.some(function (e) {
                                    return -1 !== t.indexOf(e)
                                })) return new Promise(function (e) {
                                    n.parsedBody = JSON.parse(i),
                                    e(n)
                                }).
                                catch(e);
                                if (o.some(function (e) {
                                    return -1 !== r.indexOf(e)
                                })) return function (e) {
                                    try {
                                        var r = U.parseFromString(e, "application/xml"); !
                                        function (e) {
                                            if (j) {
                                                var t = r.getElementsByTagNameNS(j, "parsererror");
                                                if (t.length) throw new Error(t.item(0).innerHTML)
                                            }
                                        } ();
                                        var t = function e(t) {
                                            var r, i = {},
                                            n = t.childNodes.length,
                                            a = t.childNodes[0],
                                            o = a && 1 === n && a.nodeType === Node.TEXT_NODE && a.nodeValue || void 0,
                                            s = (r = t).attributes && r.hasAttributes() ? r : void 0;
                                            if (s) {
                                                i.$ = {};
                                                for (var l = 0; l < s.attributes.length; l++) {
                                                    var u = s.attributes[l];
                                                    i.$[u.nodeName] = u.nodeValue
                                                }
                                                o && (i._ = o)
                                            } else 0 === n ? i = "" : o && (i = o);
                                            if (!o) for (l = 0; l < n; l++) {
                                                var d = t.childNodes[l];
                                                if (d.nodeType !== Node.TEXT_NODE) {
                                                    var p = e(d);
                                                    i[d.nodeName] ? Array.isArray(i[d.nodeName]) ? i[d.nodeName].push(p) : i[d.nodeName] = [i[d.nodeName], p] : i[d.nodeName] = p
                                                }
                                            }
                                            return i
                                        } (r.childNodes[0]);
                                        return Promise.resolve(t)
                                    } catch(e) {
                                        return Promise.reject(e)
                                    }
                                } (i).then(function (e) {
                                    return n.parsedBody = e,
                                    n
                                }).
                                catch(e)
                            }
                            return Promise.resolve(n)
                        } (t, r, y = e).then(function (t) {
                            var e, r;
                            if (void 0 === (r = (e = t).request.shouldDeserialize) || ("boolean" == typeof r ? r : r(e))) {
                                var i = t.request.operationSpec;
                                if (i && i.responses) {
                                    var n = t.status,
                                    a = Object.keys(i.responses),
                                    o = 0 === a.length || 1 === a.length && "default" === a[0],
                                    s = function (e) {
                                        var t, r = e.request,
                                        i = r.operationSpec;
                                        if (i) {
                                            var n = r.operationResponseGetter;
                                            t = n ? n(i, e) : i.responses[e.status]
                                        }
                                        return t
                                    } (t);
                                    if (o ? 200 <= n && n < 300 : s) {
                                        if (s) {
                                            if (s.bodyMapper) {
                                                var l = t.parsedBody;
                                                i.isXML && s.bodyMapper.type.name === z.Sequence && (l = "object" == typeof l ? l[s.bodyMapper.xmlElementName] : []);
                                                try {
                                                    t.parsedBody = i.serializer.deserialize(s.bodyMapper, l, "operationRes.parsedBody")
                                                } catch(c) {
                                                    var u = new w("Error " + c + " occurred in deserializing the responseBody - " + t.bodyAsText);
                                                    return u.request = v(t.request),
                                                    u.response = g(t),
                                                    Promise.reject(u)
                                                }
                                            } else "HEAD" === i.httpMethod && (t.parsedBody = 200 <= y.status && y.status < 300);
                                            s.headersMapper && (t.parsedHeaders = i.serializer.deserialize(s.headersMapper, t.headers.rawHeaders(), "operationRes.parsedHeaders"))
                                        }
                                    } else {
                                        var d = i.responses.
                                    default;
                                        if (d) {
                                            var p = A(i) ? "Unexpected status code: " + n:
                                            t.bodyAsText,
                                            c = new w(p);
                                            c.statusCode = n,
                                            c.request = v(t.request),
                                            c.response = g(t);
                                            var m = t.parsedBody;
                                            try {
                                                if (m) {
                                                    var f = d.bodyMapper;
                                                    if (f && "CloudError" === f.serializedName) m.error && (m = m.error),
                                                    m.code && (c.code = m.code),
                                                    m.message && (c.message = m.message);
                                                    else {
                                                        var h = m;
                                                        m.error && (h = m.error),
                                                        c.code = h.code,
                                                        h.message && (c.message = h.message)
                                                    }
                                                    f && (l = m, i.isXML && f.type.name === z.Sequence && (l = "object" == typeof m ? m[f.xmlElementName] : []), c.body = i.serializer.deserialize(f, l, "error.body"))
                                                }
                                            } catch(e) {
                                                c.message = 'Error "' + e.message + '" occurred in deserializing the responseBody - "' + t.bodyAsText + '" for the default response.'
                                            }
                                            return Promise.reject(c)
                                        }
                                    }
                                }
                            }
                            return Promise.resolve(t)
                        });
                        var t, r, y
                    })]
                })
            })
        }, e
    } (X),
    Z = function (l) {
        function e(e, t, r, i, n, a) {
            var o = l.call(this, e, t) || this;
            function s(e) {
                return "number" == typeof e
            }
            return o.retryCount = s(r) ? r : 3,
            o.retryInterval = s(i) ? i : 3e4,
            o.minRetryInterval = s(n) ? n : 3e3,
            o.maxRetryInterval = s(a) ? a : 9e4,
            o
        }
        return N(e, l),
        e.prototype.sendRequest = function (t) {
            var r = this;
            return this._nextPolicy.sendRequest(t.clone()).then(function (e) {
                return K(r, t, e)
            }).
            catch(function (e) {
                return K(r, t, e.response, void 0, e)
            })
        },
        e
    } (X);
    function K(t, r, i, n, e) {
        n = function (e, t, r) {
            t || (t = {
                retryCount: 0,
                retryInterval: 0
            }),
            r && (t.error && (r.innerError = t.error), t.error = r),
            t.retryCount++;
            var i = Math.pow(2, t.retryCount) - 1;
            return i *= .8 * e.retryInterval + Math.floor(Math.random() * (1.2 * e.retryInterval - .8 * e.retryInterval)),
            t.retryInterval = Math.min(e.minRetryInterval + i, e.maxRetryInterval),
            t
        } (t, n, e);
        var a = r.abortSignal && r.abortSignal.aborted;
        if (!a &&
        function (e, t, r) {
            if (null == t || t < 500 && 408 !== t || 501 === t || 505 === t) return !1;
            if (!r) throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
            return (r && r.retryCount) < e.retryCount
        } (t, i && i.status, n)) return c(n.retryInterval).then(function () {
            return t._nextPolicy.sendRequest(r.clone())
        }).then(function (e) {
            return K(t, r, e, n, void 0)
        }).
        catch(function (e) {
            return K(t, r, i, n, e)
        });
        if (a || e || !i) {
            var o = n.error || new w("Failed to send the request.", w.REQUEST_SEND_ERROR, i && i.status, i && i.request, i);
            return Promise.reject(o)
        }
        return Promise.resolve(i)
    }
    var ee = function (n) {
        function e(e, t, r) {
            var i = n.call(this, e, t) || this;
            return i._requestIdHeaderName = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (e) {
            return e.headers.contains(this._requestIdHeaderName) || e.headers.set(this._requestIdHeaderName, y()),
            this._nextPolicy.sendRequest(e)
        },
        e
    } (X);
    var te = function () {
        return "x-ms-command-name"
    };
    function re() {
        var e, t, r, i, n = [{
            key: "ms-rest-js",
            value: h.msRestVersion
        }],
        a = [{
            key: "OS",
            value: ((e = window.navigator).oscpu || e.platform).replace(" ", "")
        }];
        return t = n.concat(a),
        void 0 === r && (r = " "),
        void 0 === i && (i = "/"),
        t.map(function (e) {
            var t = e.value ? "" + i + e.value : "";
            return "" + e.key + t
        }).join(r)
    }
    var ie = function (a) {
        function e(e, t, r, i) {
            var n = a.call(this, e, t) || this;
            return n._nextPolicy = e,
            n._options = t,
            n.headerKey = r,
            n.headerValue = i,
            n
        }
        return N(e, a),
        e.prototype.sendRequest = function (e) {
            return this.addUserAgentHeader(e),
            this._nextPolicy.sendRequest(e)
        },
        e.prototype.addUserAgentHeader = function (e) {
            e.headers || (e.headers = new m),
            !e.headers.get(this.headerKey) && this.headerValue && e.headers.set(this.headerKey, this.headerValue)
        },
        e
    } (X),
    ne = function () {
        function s() {
            this._rawQuery = {}
        }
        return s.prototype.any = function () {
            return 0 < Object.keys(this._rawQuery).length
        },
        s.prototype.set = function (e, t) {
            if (e) if (null != t) {
                var r = Array.isArray(t) ? t : t.toString();
                this._rawQuery[e] = r
            } else delete this._rawQuery[e]
        },
        s.prototype.get = function (e) {
            return e ? this._rawQuery[e] : void 0
        },
        s.prototype.toString = function () {
            var e = "";
            for (var t in this._rawQuery) {
                e && (e += "&");
                var r = this._rawQuery[t];
                if (Array.isArray(r)) {
                    for (var i = [], n = 0, a = r; n < a.length; n++) {
                        var o = a[n];
                        i.push(t + "=" + o)
                    }
                    e += i.join("&")
                } else e += t + "=" + r
            }
            return e
        },
        s.parse = function (e) {
            var t = new s;
            if (e) {
                e.startsWith("?") && (e = e.substring(1));
                for (var r = "ParameterName", i = "", n = "", a = 0; a < e.length; ++a) {
                    var o = e[a];
                    switch (r) {
                    case "ParameterName":
                        switch (o) {
                        case "=":
                            r = "ParameterValue";
                            break;
                        case "&":
                            n = i = "";
                            break;
                        default:
                            i += o
                        }
                        break;
                    case "ParameterValue":
                        switch (o) {
                        case "=":
                            n = i = "",
                            r = "Invalid";
                            break;
                        case "&":
                            t.set(i, n),
                            n = i = "",
                            r = "ParameterName";
                            break;
                        default:
                            n += o
                        }
                        break;
                    case "Invalid":
                        "&" === o && (r = "ParameterName");
                        break;
                    default:
                        throw new Error("Unrecognized URLQuery parse state: " + r)
                    }
                }
                "ParameterValue" === r && t.set(i, n)
            }
            return t
        },
        s
    } (),
    ae = function () {
        function r() {}
        return r.prototype.setScheme = function (e) {
            e ? this.set(e, "SCHEME") : this._scheme = void 0
        },
        r.prototype.getScheme = function () {
            return this._scheme
        },
        r.prototype.setHost = function (e) {
            e ? this.set(e, "SCHEME_OR_HOST") : this._host = void 0
        },
        r.prototype.getHost = function () {
            return this._host
        },
        r.prototype.setPort = function (e) {
            null == e || "" === e ? this._port = void 0 : this.set(e.toString(), "PORT")
        },
        r.prototype.getPort = function () {
            return this._port
        },
        r.prototype.setPath = function (e) {
            e ? -1 !== e.indexOf("://") ? this.set(e, "SCHEME") : this.set(e, "PATH") : this._path = void 0
        },
        r.prototype.appendPath = function (e) {
            if (e) {
                var t = this.getPath();
                t && (t.endsWith("/") || (t += "/"), e.startsWith("/") && (e = e.substring(1)), e = t + e),
                this.set(e, "PATH")
            }
        },
        r.prototype.getPath = function () {
            return this._path
        },
        r.prototype.setQuery = function (e) {
            this._query = e ? ne.parse(e) : void 0
        },
        r.prototype.setQueryParameter = function (e, t) {
            e && (this._query || (this._query = new ne), this._query.set(e, t))
        },
        r.prototype.getQueryParameterValue = function (e) {
            return this._query ? this._query.get(e) : void 0
        },
        r.prototype.getQuery = function () {
            return this._query ? this._query.toString() : void 0
        },
        r.prototype.set = function (e, t) {
            for (var r = new se(e, t); r.next();) {
                var i = r.current();
                if (i) switch (i.type) {
                case "SCHEME":
                    this._scheme = i.text || void 0;
                    break;
                case "HOST":
                    this._host = i.text || void 0;
                    break;
                case "PORT":
                    this._port = i.text || void 0;
                    break;
                case "PATH":
                    var n = i.text || void 0;
                    this._path && "/" !== this._path && "/" === n || (this._path = n);
                    break;
                case "QUERY":
                    this._query = ne.parse(i.text);
                    break;
                default:
                    throw new Error("Unrecognized URLTokenType: " + i.type)
                }
            }
        },
        r.prototype.toString = function () {
            var e = "";
            return this._scheme && (e += this._scheme + "://"),
            this._host && (e += this._host),
            this._port && (e += ":" + this._port),
            this._path && (this._path.startsWith("/") || (e += "/"), e += this._path),
            this._query && this._query.any() && (e += "?" + this._query.toString()),
            e
        },
        r.prototype.replaceAll = function (e, t) {
            e && (this.setScheme(a(this.getScheme(), e, t)), this.setHost(a(this.getHost(), e, t)), this.setPort(a(this.getPort(), e, t)), this.setPath(a(this.getPath(), e, t)), this.setQuery(a(this.getQuery(), e, t)))
        },
        r.parse = function (e) {
            var t = new r;
            return t.set(e, "SCHEME_OR_HOST"),
            t
        },
        r
    } (),
    oe = function () {
        function t(e, t) {
            this.text = e,
            this.type = t
        }
        return t.scheme = function (e) {
            return new t(e, "SCHEME")
        },
        t.host = function (e) {
            return new t(e, "HOST")
        },
        t.port = function (e) {
            return new t(e, "PORT")
        },
        t.path = function (e) {
            return new t(e, "PATH")
        },
        t.query = function (e) {
            return new t(e, "QUERY")
        },
        t
    } (),
    se = function () {
        function e(e, t) {
            this._text = e,
            this._textLength = e ? e.length : 0,
            this._currentState = null != t ? t : "SCHEME_OR_HOST",
            this._currentIndex = 0
        }
        return e.prototype.current = function () {
            return this._currentToken
        },
        e.prototype.next = function () {
            if (le(this)) switch (this._currentState) {
            case "SCHEME":
                n = ce(this, function (e) {
                    return 48 <= (t = e.charCodeAt(0)) && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122;
                    var t
                }), this._currentToken = oe.scheme(n),
                le(this) ? this._currentState = "HOST" : this._currentState = "DONE";
                break;
            case "SCHEME_OR_HOST":
                i = me(r = this, ":", "/", "?"),
                le(r) ? ":" === ue(r) ? "://" === pe(r, 3) ? (r._currentToken = oe.scheme(i), r._currentState = "HOST") : (r._currentToken = oe.host(i), r._currentState = "PORT") : (r._currentToken = oe.host(i), "/" === ue(r) ? r._currentState = "PATH" : r._currentState = "QUERY") : (r._currentToken = oe.host(i), r._currentState = "DONE");
                break;
            case "HOST":
                !
                function (e) {
                    "://" === pe(e, 3) && de(e, 3);
                    var t = me(e, ":", "/", "?");
                    e._currentToken = oe.host(t),
                    le(e) ? ":" === ue(e) ? e._currentState = "PORT" : "/" === ue(e) ? e._currentState = "PATH" : e._currentState = "QUERY": e._currentState = "DONE"
                } (this);
                break;
            case "PORT":
                !
                function (e) {
                    ":" === ue(e) && de(e);
                    var t = me(e, "/", "?");
                    e._currentToken = oe.port(t),
                    le(e) ? "/" === ue(e) ? e._currentState = "PATH" : e._currentState = "QUERY" : e._currentState = "DONE"
                } (this);
                break;
            case "PATH":
                t = me(e = this, "?"),
                e._currentToken = oe.path(t),
                le(e) ? e._currentState = "QUERY" : e._currentState = "DONE";
                break;
            case "QUERY":
                !
                function (e) {
                    "?" === ue(e) && de(e);
                    var t, r, i = (r = "", (t = e)._currentIndex < t._textLength && (r = t._text.substring(t._currentIndex), t._currentIndex = t._textLength), r);
                    e._currentToken = oe.query(i),
                    e._currentState = "DONE"
                } (this);
                break;
            default:
                throw new Error("Unrecognized URLTokenizerState: " + this._currentState)
            } else this._currentToken = void 0;
            var e, t, r, i, n;
            return !! this._currentToken
        },
        e
    } ();
    function le(e) {
        return e._currentIndex < e._textLength
    }
    function ue(e) {
        return e._text[e._currentIndex]
    }
    function de(e, t) {
        le(e) && (t || (t = 1), e._currentIndex += t)
    }
    function pe(e, t) {
        var r = e._currentIndex + t;
        return e._textLength < r && (r = e._textLength),
        e._text.substring(e._currentIndex, r)
    }
    function ce(e, t) {
        for (var r = ""; le(e);) {
            var i = ue(e);
            if (!t(i)) break;
            r += i,
            de(e)
        }
        return r
    }
    function me(e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        return ce(e, function (e) {
            return -1 === t.indexOf(e)
        })
    }
    var fe = function (n) {
        function e(e, t, r) {
            void 0 === r && (r = 20);
            var i = n.call(this, e, t) || this;
            return i.maxRetries = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (e) {
            var t = this;
            return this._nextPolicy.sendRequest(e).then(function (e) {
                return function t(r, e, i) {
                    var n = e.request,
                    a = e.status,
                    o = e.headers.get("location");
                    if (o && (300 === a || 307 === a || 303 === a && "POST" === n.method) && (!r.maxRetries || i < r.maxRetries)) {
                        var s = ae.parse(n.url);
                        return s.setPath(o),
                        n.url = s.toString(),
                        303 === a && (n.method = "GET"),
                        r._nextPolicy.sendRequest(n).then(function (e) {
                            return t(r, e, i + 1)
                        })
                    }
                    return Promise.resolve(e)
                } (t, e, 0)
            })
        },
        e
    } (X),
    he = function (n) {
        function e(e, t, r) {
            void 0 === r && (r = 30);
            var i = n.call(this, e, t) || this;
            return i._retryTimeout = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (t) {
            var r = this;
            return this._nextPolicy.sendRequest(t.clone()).then(function (e) {
                return function (t, r, i) {
                    if (409 === i.status) {
                        var e = function (e) {
                            var t, r;
                            if (e) {
                                try {
                                    r = JSON.parse(e)
                                } catch(e) {}
                                if (r && r.error && r.error.message && r.error.code && "MissingSubscriptionRegistration" === r.error.code) {
                                    var i = r.error.message.match(/.*'(.*)'/i);
                                    i && (t = i.pop())
                                }
                            }
                            return t
                        } (i.bodyAsText);
                        if (e) {
                            var n = function (e) {
                                var t = e.match(/.*\/subscriptions\/[a-f0-9-]+\//gi);
                                if (!t || !t[0]) throw new Error("Unable to extract subscriptionId from the given url - " + e + ".");
                                return t[0]
                            } (r.url);
                            return (a = t, o = e, s = r, l = n + "providers/" + o + "/register?api-version=2016-02-01", u = n + "providers/" + o + "?api-version=2016-02-01", d = ye(s), d.method = "POST", d.url = l, a._nextPolicy.sendRequest(d).then(function (e) {
                                if (200 !== e.status) throw new Error("Autoregistration of " + o + " failed. Please try registering manually.");
                                return function r(i, n, a) {
                                    var e = ye(a);
                                    return e.url = n,
                                    e.method = "GET",
                                    i._nextPolicy.sendRequest(e).then(function (e) {
                                        var t = e.parsedBody;
                                        return ! (!e.parsedBody || !t.registrationState || "Registered" !== t.registrationState) || c(1e3 * i._retryTimeout).then(function () {
                                            return r(i, n, a)
                                        })
                                    })
                                } (a, u, s)
                            })).
                            catch(function () {
                                return !1
                            }).then(function (e) {
                                return e ? (r.headers.set("x-ms-client-request-id", y()), t._nextPolicy.sendRequest(r.clone())) : i
                            })
                        }
                    }
                    var a, o, s, l, u, d;
                    return Promise.resolve(i)
                } (r, t, e)
            })
        },
        e
    } (X);
    function ye(e, t) {
        void 0 === t && (t = !1);
        var r = e.clone();
        return t && (r.url = e.url),
        r.headers.set("x-ms-client-request-id", y()),
        r.headers.set("Content-Type", "application/json; charset=utf-8"),
        r
    }
    var ge, ve, be = function (n) {
        function e(e, t, r) {
            var i = n.call(this, e, t) || this;
            return i.authenticationProvider = r,
            i
        }
        return N(e, n),
        e.prototype.signRequest = function (e) {
            return this.authenticationProvider.signRequest(e)
        },
        e.prototype.sendRequest = function (e) {
            var t = this;
            return this.signRequest(e).then(function (e) {
                return t._nextPolicy.sendRequest(e)
            })
        },
        e
    } (X),
    Se = function (s) {
        function e(e, t, r, i, n, a) {
            var o = s.call(this, e, t) || this;
            return o.DEFAULT_CLIENT_RETRY_INTERVAL = 3e4,
            o.DEFAULT_CLIENT_RETRY_COUNT = 3,
            o.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 9e4,
            o.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 3e3,
            o.retryCount = "number" == typeof r ? r : o.DEFAULT_CLIENT_RETRY_COUNT,
            o.retryInterval = "number" == typeof i ? i : o.DEFAULT_CLIENT_RETRY_INTERVAL,
            o.minRetryInterval = "number" == typeof n ? n : o.DEFAULT_CLIENT_MIN_RETRY_INTERVAL,
            o.maxRetryInterval = "number" == typeof a ? a : o.DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
            o
        }
        return N(e, s),
        e.prototype.sendRequest = function (t) {
            var r = this;
            return this._nextPolicy.sendRequest(t.clone()).then(function (e) {
                return function t(r, i, n, a, o) {
                    return a = function (e, t, r) {
                        t || (t = {
                            retryCount: 0,
                            retryInterval: 0
                        }),
                        r && (t.error && (r.innerError = t.error), t.error = r),
                        t.retryCount++;
                        var i = Math.pow(2, t.retryCount) - 1;
                        return i *= .8 * e.retryInterval + Math.floor(Math.random() * (1.2 * e.retryInterval - .8 * e.retryInterval)),
                        t.retryInterval = Math.min(e.minRetryInterval + i, e.maxRetryInterval),
                        t
                    } (r, a, o),
                    o && o.code &&
                    function (e, t) {
                        if (!t) throw new Error("retryData for the SystemErrorRetryPolicyFilter cannot be null.");
                        return (t && t.retryCount) < e.retryCount
                    } (r, a) && ("ETIMEDOUT" === o.code || "ESOCKETTIMEDOUT" === o.code || "ECONNREFUSED" === o.code || "ECONNRESET" === o.code || "ENOENT" === o.code) ? c(a.retryInterval).then(function () {
                        return r._nextPolicy.sendRequest(i.clone())
                    }).then(function (e) {
                        return t(r, i, e, a, o)
                    }).
                    catch(function (e) {
                        return t(r, i, n, a, e)
                    }) : null != o ? (o = a.error, Promise.reject(o)) : Promise.resolve(n)
                } (r, t, e)
            })
        },
        e
    } (X);
    (ve = ge || (ge = {})).Csv = ",",
    ve.Ssv = " ",
    ve.Tsv = "\t",
    ve.Pipes = "|",
    ve.Multi = "Multi";
    var Ne = function (n) {
        function e(e, t, r) {
            var i = n.call(this, e, t) || this;
            return i.proxySettings = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (e) {
            return e.proxySettings || (e.proxySettings = this.proxySettings),
            this._nextPolicy.sendRequest(e)
        },
        e
    } (X),
    xe = h.HttpConstants.StatusCodes,
    Pe = function (n) {
        function o(e, t, r) {
            var i = n.call(this, e, t) || this;
            return i._handleResponse = r || i._defaultResponseHandler,
            i
        }
        return N(o, n),
        o.prototype.sendRequest = function (r) {
            return x(this, void 0, void 0, function () {
                var t = this;
                return P(this, function (e) {
                    return [2, this._nextPolicy.sendRequest(r.clone()).then(function (e) {
                        return e.status !== xe.TooManyRequests ? e : t._handleResponse(r, e)
                    })]
                })
            })
        },
        o.prototype._defaultResponseHandler = function (n, a) {
            return x(this, void 0, void 0, function () {
                var t, r, i = this;
                return P(this, function (e) {
                    return (t = a.headers.get(h.HeaderConstants.RETRY_AFTER)) && (r = o.parseRetryAfterHeader(t)) ? [2, c(r).then(function (e) {
                        return i._nextPolicy.sendRequest(n)
                    })] : [2, a]
                })
            })
        },
        o.parseRetryAfterHeader = function (e) {
            var t = Number(e);
            return Number.isNaN(t) ? o.parseDateRetryAfterHeader(e) : 1e3 * t
        },
        o.parseDateRetryAfterHeader = function (e) {
            try {
                var t = Date.now(),
                r = Date.parse(e) - t;
                return Number.isNaN(r) ? void 0 : r
            } catch(e) {
                return
            }
        },
        o
    } (X),
    _e = function () {
        function e(e, t) {
            if (t || (t = {}), e && !e.signRequest) throw new Error("credentials argument needs to implement signRequest method");
            var r;
            if (this._withCredentials = t.withCredentials || !1, this._httpClient = t.httpClient || new T, this._requestPolicyOptions = new W(t.httpPipelineLogger), Array.isArray(t.requestPolicyFactories)) r = t.requestPolicyFactories;
            else if (r = function (e, t) {
                var r, i, n = [];
                t.generateClientRequestIdHeader && n.push((void 0 === (r = t.clientRequestIdHeaderName) && (r = "x-ms-client-request-id"), {
                    create: function (e, t) {
                        return new ee(e, t, r)
                    }
                })),
                e && ("function" == typeof e.create ? n.push(e) : n.push((i = e, {
                    create: function (e, t) {
                        return new be(e, t, i)
                    }
                })));
                var a, o, s, l, u, d = we(t.userAgentHeaderName, te),
                p = we(t.userAgent, re);
                d && p && n.push((o = null != (a = {
                    key: d,
                    value: p
                }).key ? a.key : "x-ms-command-name", s = null != a.value ? a.value : re(), {
                    create: function (e, t) {
                        return new ie(e, t, o, s)
                    }
                })),
                n.push((void 0 === u && (u = 20), {
                    create: function (e, t) {
                        return new fe(e, t, u)
                    }
                })),
                n.push((void 0 === (l = t.rpRegistrationRetryTimeout) && (l = 30), {
                    create: function (e, t) {
                        return new he(e, t, l)
                    }
                })),
                t.noRetryPolicy || (n.push({
                    create: function (e, t) {
                        return new Z(e, t, void 0, void 0, void 0, void 0)
                    }
                }), n.push({
                    create: function (e, t) {
                        return new Se(e, t, void 0, void 0, void 0, void 0)
                    }
                }), n.push({
                    create: function (e, t) {
                        return new Pe(e, t)
                    }
                })),
                n.push(Q(t.deserializationContentTypes));
                var c, m = t.proxySettings ||
                function (e) {
                    if (e || (e = function () {
                        if (process) return process.env[h.HTTPS_PROXY] ? process.env[h.HTTPS_PROXY] : process.env[h.HTTPS_PROXY.toLowerCase()] ? process.env[h.HTTPS_PROXY.toLowerCase()] : process.env[h.HTTP_PROXY] ? process.env[h.HTTP_PROXY] : process.env[h.HTTP_PROXY.toLowerCase()] ? process.env[h.HTTP_PROXY.toLowerCase()] : void 0
                    } ())) {
                        var t = ae.parse(e);
                        return {
                            host: t.getScheme() + "://" + t.getHost(),
                            port: Number.parseInt(t.getPort() || "80")
                        }
                    }
                } ();
                return m && n.push((c = m, {
                    create: function (e, t) {
                        return new Ne(e, t, c)
                    }
                })),
                n
            } (e, t), t.requestPolicyFactories) {
                var i = t.requestPolicyFactories(r);
                i && (r = i)
            }
            this._requestPolicyFactories = r
        }
        return e.prototype.sendRequest = function (e) {
            if (null == e || "object" != typeof e) throw new Error("options cannot be null or undefined and it must be of type object.");
            var t;
            try {
                t = e instanceof C ? (e.validateRequestProperties(), e) : (t = new C).prepare(e)
            } catch(e) {
                return Promise.reject(e)
            }
            var r = this._httpClient;
            if (this._requestPolicyFactories && 0 < this._requestPolicyFactories.length) for (var i = this._requestPolicyFactories.length - 1; 0 <= i; --i) r = this._requestPolicyFactories[i].create(r, this._requestPolicyOptions);
            return r.sendRequest(t)
        },
        e.prototype.sendOperationRequest = function (e, t, r) {
            "function" == typeof e.options && (r = e.options, e.options = void 0);
            var i, n = new C;
            try {
                var a = t.baseUrl || this.baseUri;
                if (!a) throw new Error("If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use.");
                n.method = t.httpMethod,
                n.operationSpec = t;
                var o = ae.parse(a);
                if (t.path && o.appendPath(t.path), t.urlParameters && 0 < t.urlParameters.length) for (var s = 0, l = t.urlParameters; s < l.length; s++) {
                    var u = l[s],
                    d = Te(this, e, u, t.serializer);
                    d = t.serializer.serialize(u.mapper, d, I(u)),
                    u.skipEncoding || (d = encodeURIComponent(d)),
                    o.replaceAll("{" + (u.mapper.serializedName || I(u)) + "}", d)
                }
                if (t.queryParameters && 0 < t.queryParameters.length) for (var p = 0, c = t.queryParameters; p < c.length; p++) {
                    var m = c[p],
                    f = Te(this, e, m, t.serializer);
                    if (null != f) {
                        if (f = t.serializer.serialize(m.mapper, f, I(m)), null != m.collectionFormat) if (m.collectionFormat === ge.Multi) if (0 === f.length) f = "";
                        else for (var h in f) {
                            var y = f[h];
                            f[h] = null == y ? "" : y.toString()
                        } else f = f.join(m.collectionFormat);
                        if (!m.skipEncoding) if (Array.isArray(f)) for (var h in f) f[h] = encodeURIComponent(f[h]);
                        else f = encodeURIComponent(f);
                        o.setQueryParameter(m.mapper.serializedName || I(m), f)
                    }
                }
                n.url = o.toString();
                var g = t.contentType || this.requestContentType;
                if (g && n.headers.set("Content-Type", g), t.headerParameters) for (var v = 0, b = t.headerParameters; v < b.length; v++) {
                    var S = b[v],
                    N = Te(this, e, S, t.serializer);
                    if (null != N) {
                        N = t.serializer.serialize(S.mapper, N, I(S));
                        var x = S.mapper.headerCollectionPrefix;
                        if (x) for (var P = 0, _ = Object.keys(N); P < _.length; P++) {
                            var w = _[P];
                            n.headers.set(x + w, N[w])
                        } else n.headers.set(S.mapper.serializedName || I(S), N)
                    }
                }
                var T = e.options;
                if (T) {
                    if (T.customHeaders) for (var R in T.customHeaders) n.headers.set(R, T.customHeaders[R]);
                    T.abortSignal && (n.abortSignal = T.abortSignal),
                    T.timeout && (n.timeout = T.timeout),
                    T.onUploadProgress && (n.onUploadProgress = T.onUploadProgress),
                    T.onDownloadProgress && (n.onDownloadProgress = T.onDownloadProgress)
                }
                n.withCredentials = this._withCredentials,
                function (e, t, r, i) {
                    if (i.requestBody && i.requestBody.mapper) {
                        t.body = Te(e, r, i.requestBody, i.serializer);
                        var n = i.requestBody.mapper,
                        a = n.required,
                        o = n.xmlName,
                        s = n.xmlElementName,
                        l = n.serializedName,
                        u = n.type.name;
                        try {
                            if (null != t.body || a) {
                                var d = I(i.requestBody);
                                t.body = i.serializer.serialize(n, t.body, d);
                                var p = u === z.Stream;
                                i.isXML ? u === z.Sequence ? t.body = G((g = t.body, v = s || o || l, Array.isArray(g) || (g = [g]), (b = {})[v] = g, b), {
                                    rootName: o || l
                                }) : p || (t.body = G(t.body, {
                                    rootName: o || l
                                })) : p || (t.body = JSON.stringify(t.body))
                            }
                        } catch(e) {
                            throw new Error('Error "' + e.message + '" occurred in serializing the payload - ' + JSON.stringify(l, void 0, "  ") + ".")
                        }
                    } else if (i.formDataParameters && 0 < i.formDataParameters.length) {
                        t.formData = {};
                        for (var c = 0, m = i.formDataParameters; c < m.length; c++) {
                            var f = m[c],
                            h = Te(e, r, f, i.serializer);
                            if (null != h) {
                                var y = f.mapper.serializedName || I(f);
                                t.formData[y] = i.serializer.serialize(f.mapper, h, I(f))
                            }
                        }
                    }
                    var g, v, b
                } (this, n, e, t),
                null == n.streamResponseBody && (n.streamResponseBody = A(t)),
                i = this.sendRequest(n).then(function (e) {
                    return function (t, e) {
                        var r = t.parsedHeaders,
                        i = e && e.bodyMapper,
                        n = function (e) {
                            return Object.defineProperty(e, "_response", {
                                value: t
                            })
                        };
                        if (i) {
                            var a = i.type.name;
                            if ("Stream" === a) return n(q({},
                            r, {
                                blobBody: t.blobBody,
                                readableStreamBody: t.readableStreamBody
                            }));
                            var o = "Composite" === a && i.type.modelProperties || {},
                            s = Object.keys(o).some(function (e) {
                                return "" === o[e].serializedName
                            });
                            if ("Sequence" === a || s) {
                                for (var l = (t.parsedBody || []).slice(), u = 0, d = Object.keys(o); u < d.length; u++) {
                                    var p = d[u];
                                    o[p].serializedName && (l[p] = t.parsedBody[p])
                                }
                                if (r) for (var c = 0, m = Object.keys(r); c < m.length; c++) {
                                    l[p = m[c]] = r[p]
                                }
                                return n(l),
                                l
                            }
                            if ("Composite" === a || "Dictionary" === a) return n(q({},
                            r, t.parsedBody))
                        }
                        return i || "HEAD" === t.request.method ? n(q({},
                        r, {
                            body: t.parsedBody
                        })) : n(q({},
                        r, t.parsedBody))
                    } (e, t.responses[e.status])
                })
            } catch(e) {
                i = Promise.reject(e)
            }
            var E = r;
            return E && i.then(function (e) {
                return E(null, e._response.parsedBody, e._response.request, e._response)
            }).
            catch(function (e) {
                return E(e)
            }),
            i
        },
        e
    } ();
    function we(e, t) {
        var r;
        return "string" == typeof e ? r = e : (r = t(), "function" == typeof e && (r = e(r))),
        r
    }
    function Te(e, t, r, i) {
        return function e(t, r, i, n, a) {
            var o;
            if ("string" == typeof i && (i = [i]), Array.isArray(i)) {
                if (0 < i.length) {
                    if (n.isConstant) o = n.defaultValue;
                    else {
                        var s = Re(r, i);
                        s.propertyFound || (s = Re(t, i));
                        var l = !1;
                        s.propertyFound || (l = n.required || "options" === i[0] && 2 === i.length),
                        o = l ? n.defaultValue : s.propertyValue
                    }
                    var u = L(i, n);
                    a.serialize(n, o, u)
                }
            } else for (var d in n.required && (o = {}), i) {
                var p = n.type.modelProperties[d],
                c = i[d],
                m = e(t, r, c, p, a),
                f = L(c, p);
                a.serialize(p, m, f),
                void 0 !== m && (o || (o = {}), o[d] = m)
            }
            return o
        } (e, t, r.parameterPath, r.mapper, i)
    }
    function Re(e, t) {
        for (var r = {
            propertyFound: !1
        },
        i = 0; i < t.length; ++i) {
            var n = t[i];
            if (! (null != e && n in e)) break;
            e = e[n]
        }
        return i === t.length && (r.propertyValue = e, r.propertyFound = !0),
        r
    }
    var Ee = Object.freeze({}),
    ze = function () {
        function i(e, t, r, i) {
            var n = this;
            void 0 === t && (t = 0),
            this.onabort = null,
            this._aborted = !1,
            this.children = [],
            this.abortEventListeners = [],
            this.parent = e,
            this.key = r,
            this.value = i,
            0 < t && (this.timer = setTimeout(function () {
                n.abort.call(n)
            },
            t), this.timer && l && this.timer.unref())
        }
        return Object.defineProperty(i.prototype, "aborted", {
            get: function () {
                return this._aborted
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i, "none", {
            get: function () {
                return new i(void 0, 0)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.timeout = function (e) {
            return new i(void 0, e)
        },
        i.prototype.withTimeout = function (e) {
            var t = new i(this, e);
            return this.children.push(t),
            t
        },
        i.prototype.withValue = function (e, t) {
            var r = new i(this, 0, e, t);
            return this.children.push(r),
            r
        },
        i.prototype.getValue = function (e) {
            for (var t = this; t; t = t.parent) if (t.key === e) return t.value
        },
        i.prototype.abort = function () {
            var t = this;
            this.aborted || (this.cancelTimer(), this.onabort && this.onabort.call(this, {
                type: "abort"
            }), this.abortEventListeners.forEach(function (e) {
                e.call(t, {
                    type: "abort"
                })
            }), this.children.forEach(function (e) {
                return e.cancelByParent()
            }), this._aborted = !0)
        },
        i.prototype.addEventListener = function (e, t) {
            this.abortEventListeners.push(t)
        },
        i.prototype.removeEventListener = function (e, t) {
            var r = this.abortEventListeners.indexOf(t); - 1 < r && this.abortEventListeners.splice(r, 1)
        },
        i.prototype.dispatchEvent = function () {
            throw new Error("Method not implemented.")
        },
        i.prototype.cancelByParent = function () {
            this.abort()
        },
        i.prototype.cancelTimer = function () {
            this.timer && clearTimeout(this.timer)
        },
        i
    } (),
    Ce = {
        xmlName: "Handle",
        serializedName: "HandleItem",
        type: {
            name: "Composite",
            className: "HandleItem",
            modelProperties: {
                handleId: {
                    xmlName: "HandleId",
                    required: !0,
                    serializedName: "HandleId",
                    type: {
                        name: "String"
                    }
                },
                path: {
                    xmlName: "Path",
                    required: !0,
                    serializedName: "Path",
                    type: {
                        name: "String"
                    }
                },
                fileId: {
                    xmlName: "FileId",
                    required: !0,
                    serializedName: "FileId",
                    type: {
                        name: "String"
                    }
                },
                parentId: {
                    xmlName: "ParentId",
                    serializedName: "ParentId",
                    type: {
                        name: "String"
                    }
                },
                sessionId: {
                    xmlName: "SessionId",
                    required: !0,
                    serializedName: "SessionId",
                    type: {
                        name: "String"
                    }
                },
                clientIp: {
                    xmlName: "ClientIp",
                    required: !0,
                    serializedName: "ClientIp",
                    type: {
                        name: "String"
                    }
                },
                openTime: {
                    xmlName: "OpenTime",
                    required: !0,
                    serializedName: "OpenTime",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                lastReconnectTime: {
                    xmlName: "LastReconnectTime",
                    serializedName: "LastReconnectTime",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                }
            }
        }
    },
    qe = {
        xmlName: "EnumerationResults",
        serializedName: "ListFilesAndDirectoriesSegmentResponse",
        type: {
            name: "Composite",
            className: "ListFilesAndDirectoriesSegmentResponse",
            modelProperties: {
                serviceEndpoint: {
                    xmlIsAttribute: !0,
                    xmlName: "ServiceEndpoint",
                    required: !0,
                    serializedName: "ServiceEndpoint",
                    type: {
                        name: "String"
                    }
                },
                shareName: {
                    xmlIsAttribute: !0,
                    xmlName: "ShareName",
                    required: !0,
                    serializedName: "ShareName",
                    type: {
                        name: "String"
                    }
                },
                shareSnapshot: {
                    xmlIsAttribute: !0,
                    xmlName: "ShareSnapshot",
                    serializedName: "ShareSnapshot",
                    type: {
                        name: "String"
                    }
                },
                directoryPath: {
                    xmlIsAttribute: !0,
                    xmlName: "DirectoryPath",
                    required: !0,
                    serializedName: "DirectoryPath",
                    type: {
                        name: "String"
                    }
                },
                prefix: {
                    xmlName: "Prefix",
                    required: !0,
                    serializedName: "Prefix",
                    type: {
                        name: "String"
                    }
                },
                marker: {
                    xmlName: "Marker",
                    serializedName: "Marker",
                    type: {
                        name: "String"
                    }
                },
                maxResults: {
                    xmlName: "MaxResults",
                    serializedName: "MaxResults",
                    type: {
                        name: "Number"
                    }
                },
                segment: {
                    xmlName: "Entries",
                    required: !0,
                    serializedName: "Segment",
                    type: {
                        name: "Composite",
                        className: "FilesAndDirectoriesListSegment"
                    }
                },
                nextMarker: {
                    xmlName: "NextMarker",
                    required: !0,
                    serializedName: "NextMarker",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    De = {
        xmlName: "EnumerationResults",
        serializedName: "ListHandlesResponse",
        type: {
            name: "Composite",
            className: "ListHandlesResponse",
            modelProperties: {
                handleList: {
                    xmlIsWrapped: !0,
                    xmlName: "Entries",
                    xmlElementName: "Handle",
                    serializedName: "HandleList",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "HandleItem"
                            }
                        }
                    }
                },
                nextMarker: {
                    xmlName: "NextMarker",
                    required: !0,
                    serializedName: "NextMarker",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ie = {
        xmlName: "EnumerationResults",
        serializedName: "ListSharesResponse",
        type: {
            name: "Composite",
            className: "ListSharesResponse",
            modelProperties: {
                serviceEndpoint: {
                    xmlIsAttribute: !0,
                    xmlName: "ServiceEndpoint",
                    required: !0,
                    serializedName: "ServiceEndpoint",
                    type: {
                        name: "String"
                    }
                },
                prefix: {
                    xmlName: "Prefix",
                    serializedName: "Prefix",
                    type: {
                        name: "String"
                    }
                },
                marker: {
                    xmlName: "Marker",
                    serializedName: "Marker",
                    type: {
                        name: "String"
                    }
                },
                maxResults: {
                    xmlName: "MaxResults",
                    serializedName: "MaxResults",
                    type: {
                        name: "Number"
                    }
                },
                shareItems: {
                    xmlIsWrapped: !0,
                    xmlName: "Shares",
                    xmlElementName: "Share",
                    serializedName: "ShareItems",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "ShareItem"
                            }
                        }
                    }
                },
                nextMarker: {
                    xmlName: "NextMarker",
                    required: !0,
                    serializedName: "NextMarker",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Me = {
        serializedName: "StorageError",
        type: {
            name: "Composite",
            className: "StorageError",
            modelProperties: {
                message: {
                    xmlName: "Message",
                    serializedName: "Message",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Oe = {
        serializedName: "ShareStats",
        type: {
            name: "Composite",
            className: "ShareStats",
            modelProperties: {
                shareUsageBytes: {
                    xmlName: "ShareUsageBytes",
                    required: !0,
                    serializedName: "ShareUsageBytes",
                    type: {
                        name: "Number"
                    }
                }
            }
        }
    },
    He = {
        serializedName: "StorageServiceProperties",
        type: {
            name: "Composite",
            className: "StorageServiceProperties",
            modelProperties: {
                hourMetrics: {
                    xmlName: "HourMetrics",
                    serializedName: "HourMetrics",
                    type: {
                        name: "Composite",
                        className: "Metrics"
                    }
                },
                minuteMetrics: {
                    xmlName: "MinuteMetrics",
                    serializedName: "MinuteMetrics",
                    type: {
                        name: "Composite",
                        className: "Metrics"
                    }
                },
                cors: {
                    xmlIsWrapped: !0,
                    xmlName: "Cors",
                    xmlElementName: "CorsRule",
                    serializedName: "Cors",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "CorsRule"
                            }
                        }
                    }
                }
            }
        }
    },
    Fe = {
        serializedName: "service-setproperties-headers",
        type: {
            name: "Composite",
            className: "ServiceSetPropertiesHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Le = {
        serializedName: "service-getproperties-headers",
        type: {
            name: "Composite",
            className: "ServiceGetPropertiesHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ae = {
        serializedName: "service-listsharessegment-headers",
        type: {
            name: "Composite",
            className: "ServiceListSharesSegmentHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ue = {
        serializedName: "share-create-headers",
        type: {
            name: "Composite",
            className: "ShareCreateHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    je = {
        serializedName: "share-getproperties-headers",
        type: {
            name: "Composite",
            className: "ShareGetPropertiesHeaders",
            modelProperties: {
                metadata: {
                    serializedName: "x-ms-meta",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    },
                    headerCollectionPrefix: "x-ms-meta-"
                },
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                quota: {
                    serializedName: "x-ms-share-quota",
                    type: {
                        name: "Number"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    ke = {
        serializedName: "share-delete-headers",
        type: {
            name: "Composite",
            className: "ShareDeleteHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Be = {
        serializedName: "share-createsnapshot-headers",
        type: {
            name: "Composite",
            className: "ShareCreateSnapshotHeaders",
            modelProperties: {
                snapshot: {
                    serializedName: "x-ms-snapshot",
                    type: {
                        name: "String"
                    }
                },
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ge = {
        serializedName: "share-setquota-headers",
        type: {
            name: "Composite",
            className: "ShareSetQuotaHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ve = {
        serializedName: "share-setmetadata-headers",
        type: {
            name: "Composite",
            className: "ShareSetMetadataHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Xe = {
        serializedName: "share-getaccesspolicy-headers",
        type: {
            name: "Composite",
            className: "ShareGetAccessPolicyHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    We = {
        serializedName: "share-setaccesspolicy-headers",
        type: {
            name: "Composite",
            className: "ShareSetAccessPolicyHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Qe = {
        serializedName: "share-getstatistics-headers",
        type: {
            name: "Composite",
            className: "ShareGetStatisticsHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    $e = {
        serializedName: "directory-create-headers",
        type: {
            name: "Composite",
            className: "DirectoryCreateHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-request-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ye = {
        serializedName: "directory-getproperties-headers",
        type: {
            name: "Composite",
            className: "DirectoryGetPropertiesHeaders",
            modelProperties: {
                metadata: {
                    serializedName: "x-ms-meta",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    },
                    headerCollectionPrefix: "x-ms-meta-"
                },
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Je = {
        serializedName: "directory-delete-headers",
        type: {
            name: "Composite",
            className: "DirectoryDeleteHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ze = {
        serializedName: "directory-setmetadata-headers",
        type: {
            name: "Composite",
            className: "DirectorySetMetadataHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-request-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    Ke = {
        serializedName: "directory-listfilesanddirectoriessegment-headers",
        type: {
            name: "Composite",
            className: "DirectoryListFilesAndDirectoriesSegmentHeaders",
            modelProperties: {
                contentType: {
                    serializedName: "content-type",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    et = {
        serializedName: "directory-listhandles-headers",
        type: {
            name: "Composite",
            className: "DirectoryListHandlesHeaders",
            modelProperties: {
                contentType: {
                    serializedName: "content-type",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    tt = {
        serializedName: "directory-forceclosehandles-headers",
        type: {
            name: "Composite",
            className: "DirectoryForceCloseHandlesHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                marker: {
                    serializedName: "x-ms-marker",
                    type: {
                        name: "String"
                    }
                },
                numberOfHandlesClosed: {
                    serializedName: "x-ms-number-of-handles-closed",
                    type: {
                        name: "Number"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    rt = {
        serializedName: "file-create-headers",
        type: {
            name: "Composite",
            className: "FileCreateHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-request-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    it = {
        serializedName: "file-download-headers",
        type: {
            name: "Composite",
            className: "FileDownloadHeaders",
            modelProperties: {
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                metadata: {
                    serializedName: "x-ms-meta",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    },
                    headerCollectionPrefix: "x-ms-meta-"
                },
                contentLength: {
                    serializedName: "content-length",
                    type: {
                        name: "Number"
                    }
                },
                contentType: {
                    serializedName: "content-type",
                    type: {
                        name: "String"
                    }
                },
                contentRange: {
                    serializedName: "content-range",
                    type: {
                        name: "String"
                    }
                },
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                contentMD5: {
                    serializedName: "content-md5",
                    type: {
                        name: "ByteArray"
                    }
                },
                contentEncoding: {
                    serializedName: "content-encoding",
                    type: {
                        name: "String"
                    }
                },
                cacheControl: {
                    serializedName: "cache-control",
                    type: {
                        name: "String"
                    }
                },
                contentDisposition: {
                    serializedName: "content-disposition",
                    type: {
                        name: "String"
                    }
                },
                contentLanguage: {
                    serializedName: "content-language",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                acceptRanges: {
                    serializedName: "accept-ranges",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                copyCompletionTime: {
                    serializedName: "x-ms-copy-completion-time",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                copyStatusDescription: {
                    serializedName: "x-ms-copy-status-description",
                    type: {
                        name: "String"
                    }
                },
                copyId: {
                    serializedName: "x-ms-copy-id",
                    type: {
                        name: "String"
                    }
                },
                copyProgress: {
                    serializedName: "x-ms-copy-progress",
                    type: {
                        name: "String"
                    }
                },
                copySource: {
                    serializedName: "x-ms-copy-source",
                    type: {
                        name: "String"
                    }
                },
                copyStatus: {
                    serializedName: "x-ms-copy-status",
                    type: {
                        name: "Enum",
                        allowedValues: ["pending", "success", "aborted", "failed"]
                    }
                },
                fileContentMD5: {
                    serializedName: "x-ms-content-md5",
                    type: {
                        name: "ByteArray"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    nt = {
        serializedName: "file-getproperties-headers",
        type: {
            name: "Composite",
            className: "FileGetPropertiesHeaders",
            modelProperties: {
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                metadata: {
                    serializedName: "x-ms-meta",
                    type: {
                        name: "Dictionary",
                        value: {
                            type: {
                                name: "String"
                            }
                        }
                    },
                    headerCollectionPrefix: "x-ms-meta-"
                },
                fileType: {
                    serializedName: "x-ms-type",
                    type: {
                        name: "String"
                    }
                },
                contentLength: {
                    serializedName: "content-length",
                    type: {
                        name: "Number"
                    }
                },
                contentType: {
                    serializedName: "content-type",
                    type: {
                        name: "String"
                    }
                },
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                contentMD5: {
                    serializedName: "content-md5",
                    type: {
                        name: "ByteArray"
                    }
                },
                contentEncoding: {
                    serializedName: "content-encoding",
                    type: {
                        name: "String"
                    }
                },
                cacheControl: {
                    serializedName: "cache-control",
                    type: {
                        name: "String"
                    }
                },
                contentDisposition: {
                    serializedName: "content-disposition",
                    type: {
                        name: "String"
                    }
                },
                contentLanguage: {
                    serializedName: "content-language",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                copyCompletionTime: {
                    serializedName: "x-ms-copy-completion-time",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                copyStatusDescription: {
                    serializedName: "x-ms-copy-status-description",
                    type: {
                        name: "String"
                    }
                },
                copyId: {
                    serializedName: "x-ms-copy-id",
                    type: {
                        name: "String"
                    }
                },
                copyProgress: {
                    serializedName: "x-ms-copy-progress",
                    type: {
                        name: "String"
                    }
                },
                copySource: {
                    serializedName: "x-ms-copy-source",
                    type: {
                        name: "String"
                    }
                },
                copyStatus: {
                    serializedName: "x-ms-copy-status",
                    type: {
                        name: "Enum",
                        allowedValues: ["pending", "success", "aborted", "failed"]
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    at = {
        serializedName: "file-delete-headers",
        type: {
            name: "Composite",
            className: "FileDeleteHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    ot = {
        serializedName: "file-sethttpheaders-headers",
        type: {
            name: "Composite",
            className: "FileSetHTTPHeadersHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-request-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    st = {
        serializedName: "file-setmetadata-headers",
        type: {
            name: "Composite",
            className: "FileSetMetadataHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-request-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    lt = {
        serializedName: "file-uploadrange-headers",
        type: {
            name: "Composite",
            className: "FileUploadRangeHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                contentMD5: {
                    serializedName: "content-md5",
                    type: {
                        name: "ByteArray"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                isServerEncrypted: {
                    serializedName: "x-ms-request-server-encrypted",
                    type: {
                        name: "Boolean"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    ut = {
        serializedName: "file-getrangelist-headers",
        type: {
            name: "Composite",
            className: "FileGetRangeListHeaders",
            modelProperties: {
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                fileContentLength: {
                    serializedName: "x-ms-content-length",
                    type: {
                        name: "Number"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    dt = {
        serializedName: "file-startcopy-headers",
        type: {
            name: "Composite",
            className: "FileStartCopyHeaders",
            modelProperties: {
                eTag: {
                    serializedName: "etag",
                    type: {
                        name: "String"
                    }
                },
                lastModified: {
                    serializedName: "last-modified",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                copyId: {
                    serializedName: "x-ms-copy-id",
                    type: {
                        name: "String"
                    }
                },
                copyStatus: {
                    serializedName: "x-ms-copy-status",
                    type: {
                        name: "Enum",
                        allowedValues: ["pending", "success", "aborted", "failed"]
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    pt = {
        serializedName: "file-abortcopy-headers",
        type: {
            name: "Composite",
            className: "FileAbortCopyHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    ct = {
        serializedName: "file-listhandles-headers",
        type: {
            name: "Composite",
            className: "FileListHandlesHeaders",
            modelProperties: {
                contentType: {
                    serializedName: "content-type",
                    type: {
                        name: "String"
                    }
                },
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    mt = {
        serializedName: "file-forceclosehandles-headers",
        type: {
            name: "Composite",
            className: "FileForceCloseHandlesHeaders",
            modelProperties: {
                requestId: {
                    serializedName: "x-ms-request-id",
                    type: {
                        name: "String"
                    }
                },
                version: {
                    serializedName: "x-ms-version",
                    type: {
                        name: "String"
                    }
                },
                date: {
                    serializedName: "date",
                    type: {
                        name: "DateTimeRfc1123"
                    }
                },
                marker: {
                    serializedName: "x-ms-marker",
                    type: {
                        name: "String"
                    }
                },
                numberOfHandlesClosed: {
                    serializedName: "x-ms-number-of-handles-closed",
                    type: {
                        name: "Number"
                    }
                },
                errorCode: {
                    serializedName: "x-ms-error-code",
                    type: {
                        name: "String"
                    }
                }
            }
        }
    },
    ft = Object.freeze({
        CorsRule: {
            serializedName: "CorsRule",
            type: {
                name: "Composite",
                className: "CorsRule",
                modelProperties: {
                    allowedOrigins: {
                        xmlName: "AllowedOrigins",
                        required: !0,
                        serializedName: "AllowedOrigins",
                        type: {
                            name: "String"
                        }
                    },
                    allowedMethods: {
                        xmlName: "AllowedMethods",
                        required: !0,
                        serializedName: "AllowedMethods",
                        type: {
                            name: "String"
                        }
                    },
                    allowedHeaders: {
                        xmlName: "AllowedHeaders",
                        required: !0,
                        serializedName: "AllowedHeaders",
                        type: {
                            name: "String"
                        }
                    },
                    exposedHeaders: {
                        xmlName: "ExposedHeaders",
                        required: !0,
                        serializedName: "ExposedHeaders",
                        type: {
                            name: "String"
                        }
                    },
                    maxAgeInSeconds: {
                        xmlName: "MaxAgeInSeconds",
                        required: !0,
                        serializedName: "MaxAgeInSeconds",
                        constraints: {
                            InclusiveMinimum: 0
                        },
                        type: {
                            name: "Number"
                        }
                    }
                }
            }
        },
        ListSharesResponse: Ie,
        Metrics: {
            serializedName: "Metrics",
            type: {
                name: "Composite",
                className: "Metrics",
                modelProperties: {
                    version: {
                        xmlName: "Version",
                        required: !0,
                        serializedName: "Version",
                        type: {
                            name: "String"
                        }
                    },
                    enabled: {
                        xmlName: "Enabled",
                        required: !0,
                        serializedName: "Enabled",
                        type: {
                            name: "Boolean"
                        }
                    },
                    includeAPIs: {
                        xmlName: "IncludeAPIs",
                        serializedName: "IncludeAPIs",
                        type: {
                            name: "Boolean"
                        }
                    },
                    retentionPolicy: {
                        xmlName: "RetentionPolicy",
                        serializedName: "RetentionPolicy",
                        type: {
                            name: "Composite",
                            className: "RetentionPolicy"
                        }
                    }
                }
            }
        },
        RetentionPolicy: {
            serializedName: "RetentionPolicy",
            type: {
                name: "Composite",
                className: "RetentionPolicy",
                modelProperties: {
                    enabled: {
                        xmlName: "Enabled",
                        required: !0,
                        serializedName: "Enabled",
                        type: {
                            name: "Boolean"
                        }
                    },
                    days: {
                        xmlName: "Days",
                        serializedName: "Days",
                        constraints: {
                            InclusiveMaximum: 365,
                            InclusiveMinimum: 1
                        },
                        type: {
                            name: "Number"
                        }
                    }
                }
            }
        },
        ServiceGetPropertiesHeaders: Le,
        ServiceListSharesSegmentHeaders: Ae,
        ServiceSetPropertiesHeaders: Fe,
        ShareItem: {
            xmlName: "Share",
            serializedName: "ShareItem",
            type: {
                name: "Composite",
                className: "ShareItem",
                modelProperties: {
                    name: {
                        xmlName: "Name",
                        required: !0,
                        serializedName: "Name",
                        type: {
                            name: "String"
                        }
                    },
                    snapshot: {
                        xmlName: "Snapshot",
                        serializedName: "Snapshot",
                        type: {
                            name: "String"
                        }
                    },
                    properties: {
                        xmlName: "Properties",
                        required: !0,
                        serializedName: "Properties",
                        type: {
                            name: "Composite",
                            className: "ShareProperties"
                        }
                    },
                    metadata: {
                        xmlName: "Metadata",
                        serializedName: "Metadata",
                        type: {
                            name: "Dictionary",
                            value: {
                                type: {
                                    name: "String"
                                }
                            }
                        }
                    }
                }
            }
        },
        ShareProperties: {
            serializedName: "ShareProperties",
            type: {
                name: "Composite",
                className: "ShareProperties",
                modelProperties: {
                    lastModified: {
                        xmlName: "Last-Modified",
                        required: !0,
                        serializedName: "Last-Modified",
                        type: {
                            name: "DateTimeRfc1123"
                        }
                    },
                    etag: {
                        xmlName: "Etag",
                        required: !0,
                        serializedName: "Etag",
                        type: {
                            name: "String"
                        }
                    },
                    quota: {
                        xmlName: "Quota",
                        required: !0,
                        serializedName: "Quota",
                        type: {
                            name: "Number"
                        }
                    }
                }
            }
        },
        StorageError: Me,
        StorageServiceProperties: He
    }),
    ht = {
        parameterPath: "comp",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "comp",
            defaultValue: "properties",
            type: {
                name: "String"
            }
        }
    },
    yt = {
        parameterPath: "comp",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "comp",
            defaultValue: "list",
            type: {
                name: "String"
            }
        }
    },
    gt = {
        parameterPath: "comp",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "comp",
            defaultValue: "metadata",
            type: {
                name: "String"
            }
        }
    },
    vt = {
        parameterPath: "comp",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "comp",
            defaultValue: "acl",
            type: {
                name: "String"
            }
        }
    },
    bt = {
        parameterPath: "comp",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "comp",
            defaultValue: "listhandles",
            type: {
                name: "String"
            }
        }
    },
    St = {
        parameterPath: "comp",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "comp",
            defaultValue: "forceclosehandles",
            type: {
                name: "String"
            }
        }
    },
    Nt = {
        parameterPath: ["options", "fileHTTPHeaders", "fileCacheControl"],
        mapper: {
            serializedName: "x-ms-cache-control",
            type: {
                name: "String"
            }
        }
    },
    xt = {
        parameterPath: ["options", "fileHTTPHeaders", "fileContentDisposition"],
        mapper: {
            serializedName: "x-ms-content-disposition",
            type: {
                name: "String"
            }
        }
    },
    Pt = {
        parameterPath: ["options", "fileHTTPHeaders", "fileContentEncoding"],
        mapper: {
            serializedName: "x-ms-content-encoding",
            type: {
                name: "String"
            }
        }
    },
    _t = {
        parameterPath: ["options", "fileHTTPHeaders", "fileContentLanguage"],
        mapper: {
            serializedName: "x-ms-content-language",
            type: {
                name: "String"
            }
        }
    },
    wt = {
        parameterPath: ["options", "fileHTTPHeaders", "fileContentMD5"],
        mapper: {
            serializedName: "x-ms-content-md5",
            type: {
                name: "ByteArray"
            }
        }
    },
    Tt = {
        parameterPath: ["options", "fileHTTPHeaders", "fileContentType"],
        mapper: {
            serializedName: "x-ms-content-type",
            type: {
                name: "String"
            }
        }
    },
    Rt = {
        parameterPath: "handleId",
        mapper: {
            required: !0,
            serializedName: "x-ms-handle-id",
            type: {
                name: "String"
            }
        }
    },
    Et = {
        parameterPath: ["options", "include"],
        mapper: {
            serializedName: "include",
            type: {
                name: "Sequence",
                element: {
                    type: {
                        name: "Enum",
                        allowedValues: ["snapshots", "metadata"]
                    }
                }
            }
        },
        collectionFormat: ge.Csv
    },
    zt = {
        parameterPath: ["options", "marker"],
        mapper: {
            serializedName: "marker",
            type: {
                name: "String"
            }
        }
    },
    Ct = {
        parameterPath: ["options", "maxresults"],
        mapper: {
            serializedName: "maxresults",
            constraints: {
                InclusiveMinimum: 1
            },
            type: {
                name: "Number"
            }
        }
    },
    qt = {
        parameterPath: ["options", "metadata"],
        mapper: {
            serializedName: "x-ms-meta",
            type: {
                name: "Dictionary",
                value: {
                    type: {
                        name: "String"
                    }
                }
            },
            headerCollectionPrefix: "x-ms-meta-"
        }
    },
    Dt = {
        parameterPath: ["options", "prefix"],
        mapper: {
            serializedName: "prefix",
            type: {
                name: "String"
            }
        }
    },
    It = {
        parameterPath: ["options", "quota"],
        mapper: {
            serializedName: "x-ms-share-quota",
            constraints: {
                InclusiveMinimum: 1
            },
            type: {
                name: "Number"
            }
        }
    },
    Mt = {
        parameterPath: ["options", "range"],
        mapper: {
            serializedName: "x-ms-range",
            type: {
                name: "String"
            }
        }
    },
    Ot = {
        parameterPath: ["options", "recursive"],
        mapper: {
            serializedName: "x-ms-recursive",
            type: {
                name: "Boolean"
            }
        }
    },
    Ht = {
        parameterPath: "restype",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "restype",
            defaultValue: "service",
            type: {
                name: "String"
            }
        }
    },
    Ft = {
        parameterPath: "restype",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "restype",
            defaultValue: "share",
            type: {
                name: "String"
            }
        }
    },
    Lt = {
        parameterPath: "restype",
        mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "restype",
            defaultValue: "directory",
            type: {
                name: "String"
            }
        }
    },
    At = {
        parameterPath: ["options", "sharesnapshot"],
        mapper: {
            serializedName: "sharesnapshot",
            type: {
                name: "String"
            }
        }
    },
    Ut = {
        parameterPath: ["options", "timeout"],
        mapper: {
            serializedName: "timeout",
            constraints: {
                InclusiveMinimum: 0
            },
            type: {
                name: "Number"
            }
        }
    },
    jt = {
        parameterPath: "url",
        mapper: {
            required: !0,
            serializedName: "url",
            defaultValue: "",
            type: {
                name: "String"
            }
        },
        skipEncoding: !0
    },
    kt = {
        parameterPath: "version",
        mapper: {
            required: !0,
            serializedName: "x-ms-version",
            type: {
                name: "String"
            }
        }
    },
    Bt = function () {
        function e(e) {
            this.client = e
        }
        return e.prototype.setProperties = function (e, t, r) {
            return this.client.sendOperationRequest({
                storageServiceProperties: e,
                options: t
            },
            Vt, r)
        },
        e.prototype.getProperties = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Xt, t)
        },
        e.prototype.listSharesSegment = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Wt, t)
        },
        e
    } (),
    Gt = new b(ft, !0),
    Vt = {
        httpMethod: "PUT",
        urlParameters: [jt],
        queryParameters: [Ut, Ht, ht],
        headerParameters: [kt],
        requestBody: {
            parameterPath: "storageServiceProperties",
            mapper: q({},
            He, {
                required: !0
            })
        },
        contentType: "application/xml; charset=utf-8",
        responses: {
            202: {
                headersMapper: Fe
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Gt
    },
    Xt = {
        httpMethod: "GET",
        urlParameters: [jt],
        queryParameters: [Ut, Ht, ht],
        headerParameters: [kt],
        responses: {
            200: {
                bodyMapper: He,
                headersMapper: Le
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Gt
    },
    Wt = {
        httpMethod: "GET",
        urlParameters: [jt],
        queryParameters: [Dt, zt, Ct, Et, Ut, yt],
        headerParameters: [kt],
        responses: {
            200: {
                bodyMapper: Ie,
                headersMapper: Ae
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Gt
    },
    Qt = Object.freeze({
        AccessPolicy: {
            serializedName: "AccessPolicy",
            type: {
                name: "Composite",
                className: "AccessPolicy",
                modelProperties: {
                    start: {
                        xmlName: "Start",
                        serializedName: "Start",
                        type: {
                            name: "String"
                        }
                    },
                    expiry: {
                        xmlName: "Expiry",
                        serializedName: "Expiry",
                        type: {
                            name: "String"
                        }
                    },
                    permission: {
                        xmlName: "Permission",
                        serializedName: "Permission",
                        type: {
                            name: "String"
                        }
                    }
                }
            }
        },
        ShareCreateHeaders: Ue,
        ShareCreateSnapshotHeaders: Be,
        ShareDeleteHeaders: ke,
        ShareGetAccessPolicyHeaders: Xe,
        ShareGetPropertiesHeaders: je,
        ShareGetStatisticsHeaders: Qe,
        ShareSetAccessPolicyHeaders: We,
        ShareSetMetadataHeaders: Ve,
        ShareSetQuotaHeaders: Ge,
        ShareStats: Oe,
        SignedIdentifier: {
            serializedName: "SignedIdentifier",
            type: {
                name: "Composite",
                className: "SignedIdentifier",
                modelProperties: {
                    id: {
                        xmlName: "Id",
                        required: !0,
                        serializedName: "Id",
                        type: {
                            name: "String"
                        }
                    },
                    accessPolicy: {
                        xmlName: "AccessPolicy",
                        serializedName: "AccessPolicy",
                        type: {
                            name: "Composite",
                            className: "AccessPolicy"
                        }
                    }
                }
            }
        },
        StorageError: Me
    }),
    $t = function () {
        function e(e) {
            this.client = e
        }
        return e.prototype.create = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Jt, t)
        },
        e.prototype.getProperties = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Zt, t)
        },
        e.prototype.deleteMethod = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Kt, t)
        },
        e.prototype.createSnapshot = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            er, t)
        },
        e.prototype.setQuota = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            tr, t)
        },
        e.prototype.setMetadata = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            rr, t)
        },
        e.prototype.getAccessPolicy = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            ir, t)
        },
        e.prototype.setAccessPolicy = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            nr, t)
        },
        e.prototype.getStatistics = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            ar, t)
        },
        e
    } (),
    Yt = new b(Qt, !0),
    Jt = {
        httpMethod: "PUT",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft],
        headerParameters: [qt, It, kt],
        responses: {
            201: {
                headersMapper: Ue
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    Zt = {
        httpMethod: "GET",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [At, Ut, Ft],
        headerParameters: [kt],
        responses: {
            200: {
                headersMapper: je
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    Kt = {
        httpMethod: "DELETE",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [At, Ut, Ft],
        headerParameters: [kt, {
            parameterPath: ["options", "deleteSnapshots"],
            mapper: {
                serializedName: "x-ms-delete-snapshots",
                type: {
                    name: "Enum",
                    allowedValues: ["include"]
                }
            }
        }],
        responses: {
            202: {
                headersMapper: ke
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    er = {
        httpMethod: "PUT",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft, {
            parameterPath: "comp",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "comp",
                defaultValue: "snapshot",
                type: {
                    name: "String"
                }
            }
        }],
        headerParameters: [qt, kt],
        responses: {
            201: {
                headersMapper: Be
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    tr = {
        httpMethod: "PUT",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft, ht],
        headerParameters: [kt, It],
        responses: {
            200: {
                headersMapper: Ge
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    rr = {
        httpMethod: "PUT",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft, gt],
        headerParameters: [qt, kt],
        responses: {
            200: {
                headersMapper: Ve
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    ir = {
        httpMethod: "GET",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft, vt],
        headerParameters: [kt],
        responses: {
            200: {
                bodyMapper: {
                    xmlElementName: "SignedIdentifier",
                    serializedName: "parsedResponse",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "SignedIdentifier"
                            }
                        }
                    }
                },
                headersMapper: Xe
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    nr = {
        httpMethod: "PUT",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft, vt],
        headerParameters: [kt],
        requestBody: {
            parameterPath: ["options", "shareAcl"],
            mapper: {
                xmlName: "SignedIdentifiers",
                xmlElementName: "SignedIdentifier",
                serializedName: "shareAcl",
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "SignedIdentifier"
                        }
                    }
                }
            }
        },
        contentType: "application/xml; charset=utf-8",
        responses: {
            200: {
                headersMapper: We
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    ar = {
        httpMethod: "GET",
        path: "{shareName}",
        urlParameters: [jt],
        queryParameters: [Ut, Ft, {
            parameterPath: "comp",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "comp",
                defaultValue: "stats",
                type: {
                    name: "String"
                }
            }
        }],
        headerParameters: [kt],
        responses: {
            200: {
                bodyMapper: Oe,
                headersMapper: Qe
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: Yt
    },
    or = Object.freeze({
        DirectoryCreateHeaders: $e,
        DirectoryDeleteHeaders: Je,
        DirectoryForceCloseHandlesHeaders: tt,
        DirectoryGetPropertiesHeaders: Ye,
        DirectoryItem: {
            xmlName: "Directory",
            serializedName: "DirectoryItem",
            type: {
                name: "Composite",
                className: "DirectoryItem",
                modelProperties: {
                    name: {
                        xmlName: "Name",
                        required: !0,
                        serializedName: "Name",
                        type: {
                            name: "String"
                        }
                    }
                }
            }
        },
        DirectoryListFilesAndDirectoriesSegmentHeaders: Ke,
        DirectoryListHandlesHeaders: et,
        DirectorySetMetadataHeaders: Ze,
        FileItem: {
            xmlName: "File",
            serializedName: "FileItem",
            type: {
                name: "Composite",
                className: "FileItem",
                modelProperties: {
                    name: {
                        xmlName: "Name",
                        required: !0,
                        serializedName: "Name",
                        type: {
                            name: "String"
                        }
                    },
                    properties: {
                        xmlName: "Properties",
                        required: !0,
                        serializedName: "Properties",
                        type: {
                            name: "Composite",
                            className: "FileProperty"
                        }
                    }
                }
            }
        },
        FileProperty: {
            serializedName: "FileProperty",
            type: {
                name: "Composite",
                className: "FileProperty",
                modelProperties: {
                    contentLength: {
                        xmlName: "Content-Length",
                        required: !0,
                        serializedName: "Content-Length",
                        type: {
                            name: "Number"
                        }
                    }
                }
            }
        },
        FilesAndDirectoriesListSegment: {
            xmlName: "Entries",
            serializedName: "FilesAndDirectoriesListSegment",
            type: {
                name: "Composite",
                className: "FilesAndDirectoriesListSegment",
                modelProperties: {
                    directoryItems: {
                        xmlName: "DirectoryItems",
                        xmlElementName: "Directory",
                        required: !0,
                        serializedName: "DirectoryItems",
                        type: {
                            name: "Sequence",
                            element: {
                                type: {
                                    name: "Composite",
                                    className: "DirectoryItem"
                                }
                            }
                        }
                    },
                    fileItems: {
                        xmlName: "FileItems",
                        xmlElementName: "File",
                        required: !0,
                        serializedName: "FileItems",
                        type: {
                            name: "Sequence",
                            element: {
                                type: {
                                    name: "Composite",
                                    className: "FileItem"
                                }
                            }
                        }
                    }
                }
            }
        },
        HandleItem: Ce,
        ListFilesAndDirectoriesSegmentResponse: qe,
        ListHandlesResponse: De,
        StorageError: Me
    }),
    sr = function () {
        function e(e) {
            this.client = e
        }
        return e.prototype.create = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            ur, t)
        },
        e.prototype.getProperties = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            dr, t)
        },
        e.prototype.deleteMethod = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            pr, t)
        },
        e.prototype.setMetadata = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            cr, t)
        },
        e.prototype.listFilesAndDirectoriesSegment = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            mr, t)
        },
        e.prototype.listHandles = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            fr, t)
        },
        e.prototype.forceCloseHandles = function (e, t, r) {
            return this.client.sendOperationRequest({
                handleId: e,
                options: t
            },
            hr, r)
        },
        e
    } (),
    lr = new b(or, !0),
    ur = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [Ut, Lt],
        headerParameters: [qt, kt],
        responses: {
            201: {
                headersMapper: $e
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    dr = {
        httpMethod: "GET",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [At, Ut, Lt],
        headerParameters: [kt],
        responses: {
            200: {
                headersMapper: Ye
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    pr = {
        httpMethod: "DELETE",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [Ut, Lt],
        headerParameters: [kt],
        responses: {
            202: {
                headersMapper: Je
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    cr = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [Ut, Lt, gt],
        headerParameters: [qt, kt],
        responses: {
            200: {
                headersMapper: Ze
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    mr = {
        httpMethod: "GET",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [Dt, At, zt, Ct, Ut, Lt, yt],
        headerParameters: [kt],
        responses: {
            200: {
                bodyMapper: qe,
                headersMapper: Ke
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    fr = {
        httpMethod: "GET",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [zt, Ct, Ut, At, bt],
        headerParameters: [Ot, kt],
        responses: {
            200: {
                bodyMapper: De,
                headersMapper: et
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    hr = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}",
        urlParameters: [jt],
        queryParameters: [Ut, zt, At, St],
        headerParameters: [Rt, Ot, kt],
        responses: {
            200: {
                headersMapper: tt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: lr
    },
    yr = Object.freeze({
        FileAbortCopyHeaders: pt,
        FileCreateHeaders: rt,
        FileDeleteHeaders: at,
        FileDownloadHeaders: it,
        FileForceCloseHandlesHeaders: mt,
        FileGetPropertiesHeaders: nt,
        FileGetRangeListHeaders: ut,
        FileListHandlesHeaders: ct,
        FileSetHTTPHeadersHeaders: ot,
        FileSetMetadataHeaders: st,
        FileStartCopyHeaders: dt,
        FileUploadRangeHeaders: lt,
        HandleItem: Ce,
        ListHandlesResponse: De,
        Range: {
            serializedName: "Range",
            type: {
                name: "Composite",
                className: "Range",
                modelProperties: {
                    start: {
                        xmlName: "Start",
                        required: !0,
                        serializedName: "Start",
                        type: {
                            name: "Number"
                        }
                    },
                    end: {
                        xmlName: "End",
                        required: !0,
                        serializedName: "End",
                        type: {
                            name: "Number"
                        }
                    }
                }
            }
        },
        StorageError: Me
    }),
    gr = function () {
        function e(e) {
            this.client = e
        }
        return e.prototype.create = function (e, t, r) {
            return this.client.sendOperationRequest({
                fileContentLength: e,
                options: t
            },
            br, r)
        },
        e.prototype.download = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Sr, t)
        },
        e.prototype.getProperties = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Nr, t)
        },
        e.prototype.deleteMethod = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            xr, t)
        },
        e.prototype.setHTTPHeaders = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Pr, t)
        },
        e.prototype.setMetadata = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            _r, t)
        },
        e.prototype.uploadRange = function (e, t, r, i, n) {
            return this.client.sendOperationRequest({
                range: e,
                fileRangeWrite: t,
                contentLength: r,
                options: i
            },
            wr, n)
        },
        e.prototype.getRangeList = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            Tr, t)
        },
        e.prototype.startCopy = function (e, t, r) {
            return this.client.sendOperationRequest({
                copySource: e,
                options: t
            },
            Rr, r)
        },
        e.prototype.abortCopy = function (e, t, r) {
            return this.client.sendOperationRequest({
                copyId: e,
                options: t
            },
            Er, r)
        },
        e.prototype.listHandles = function (e, t) {
            return this.client.sendOperationRequest({
                options: e
            },
            zr, t)
        },
        e.prototype.forceCloseHandles = function (e, t, r) {
            return this.client.sendOperationRequest({
                handleId: e,
                options: t
            },
            Cr, r)
        },
        e
    } (),
    vr = new b(yr, !0),
    br = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut],
        headerParameters: [kt, {
            parameterPath: "fileContentLength",
            mapper: {
                required: !0,
                serializedName: "x-ms-content-length",
                type: {
                    name: "Number"
                }
            }
        },
        {
            parameterPath: "fileTypeConstant",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "x-ms-type",
                defaultValue: "file",
                type: {
                    name: "String"
                }
            }
        },
        qt, Tt, Pt, _t, Nt, wt, xt],
        responses: {
            201: {
                headersMapper: rt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Sr = {
        httpMethod: "GET",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut],
        headerParameters: [kt, Mt, {
            parameterPath: ["options", "rangeGetContentMD5"],
            mapper: {
                serializedName: "x-ms-range-get-content-md5",
                type: {
                    name: "Boolean"
                }
            }
        }],
        responses: {
            200: {
                bodyMapper: {
                    serializedName: "parsedResponse",
                    type: {
                        name: "Stream"
                    }
                },
                headersMapper: it
            },
            206: {
                bodyMapper: {
                    serializedName: "parsedResponse",
                    type: {
                        name: "Stream"
                    }
                },
                headersMapper: it
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Nr = {
        httpMethod: "HEAD",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [At, Ut],
        headerParameters: [kt],
        responses: {
            200: {
                headersMapper: nt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    xr = {
        httpMethod: "DELETE",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut],
        headerParameters: [kt],
        responses: {
            202: {
                headersMapper: at
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Pr = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut, ht],
        headerParameters: [kt, {
            parameterPath: ["options", "fileContentLength"],
            mapper: {
                serializedName: "x-ms-content-length",
                type: {
                    name: "Number"
                }
            }
        },
        Tt, Pt, _t, Nt, wt, xt],
        responses: {
            200: {
                headersMapper: ot
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    _r = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut, gt],
        headerParameters: [qt, kt],
        responses: {
            200: {
                headersMapper: st
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    wr = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut, {
            parameterPath: "comp",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "comp",
                defaultValue: "range",
                type: {
                    name: "String"
                }
            }
        }],
        headerParameters: [{
            parameterPath: "range",
            mapper: {
                required: !0,
                serializedName: "x-ms-range",
                type: {
                    name: "String"
                }
            }
        },
        {
            parameterPath: "fileRangeWrite",
            mapper: {
                required: !0,
                serializedName: "x-ms-write",
                defaultValue: "update",
                type: {
                    name: "Enum",
                    allowedValues: ["update", "clear"]
                }
            }
        },
        {
            parameterPath: "contentLength",
            mapper: {
                required: !0,
                serializedName: "Content-Length",
                type: {
                    name: "Number"
                }
            }
        },
        {
            parameterPath: ["options", "contentMD5"],
            mapper: {
                serializedName: "Content-MD5",
                type: {
                    name: "ByteArray"
                }
            }
        },
        kt],
        requestBody: {
            parameterPath: ["options", "optionalbody"],
            mapper: {
                serializedName: "optionalbody",
                type: {
                    name: "Stream"
                }
            }
        },
        contentType: "application/octet-stream",
        responses: {
            201: {
                headersMapper: lt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Tr = {
        httpMethod: "GET",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [At, Ut, {
            parameterPath: "comp",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "comp",
                defaultValue: "rangelist",
                type: {
                    name: "String"
                }
            }
        }],
        headerParameters: [kt, Mt],
        responses: {
            200: {
                bodyMapper: {
                    xmlElementName: "Range",
                    serializedName: "parsedResponse",
                    type: {
                        name: "Sequence",
                        element: {
                            type: {
                                name: "Composite",
                                className: "Range"
                            }
                        }
                    }
                },
                headersMapper: ut
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Rr = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut],
        headerParameters: [kt, qt, {
            parameterPath: "copySource",
            mapper: {
                required: !0,
                serializedName: "x-ms-copy-source",
                type: {
                    name: "String"
                }
            }
        }],
        responses: {
            202: {
                headersMapper: dt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Er = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [{
            parameterPath: "copyId",
            mapper: {
                required: !0,
                serializedName: "copyid",
                type: {
                    name: "String"
                }
            }
        },
        Ut, {
            parameterPath: "comp",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "comp",
                defaultValue: "copy",
                type: {
                    name: "String"
                }
            }
        }],
        headerParameters: [{
            parameterPath: "copyActionAbortConstant",
            mapper: {
                required: !0,
                isConstant: !0,
                serializedName: "x-ms-copy-action",
                defaultValue: "abort",
                type: {
                    name: "String"
                }
            }
        },
        kt],
        responses: {
            204: {
                headersMapper: pt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    zr = {
        httpMethod: "GET",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [zt, Ct, Ut, At, bt],
        headerParameters: [kt],
        responses: {
            200: {
                bodyMapper: De,
                headersMapper: ct
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    Cr = {
        httpMethod: "PUT",
        path: "{shareName}/{directory}/{fileName}",
        urlParameters: [jt],
        queryParameters: [Ut, zt, At, St],
        headerParameters: [Rt, kt],
        responses: {
            200: {
                headersMapper: mt
            },
        default:
            {
                bodyMapper: Me
            }
        },
        isXML: !0,
        serializer: vr
    },
    qr = 4194304,
    Dr = "_",
    Ir = "sharesnapshot",
    Mr = "sig",
    Or = "timeout",
    Hr = "x-ms-client-request-id";
    function Fr(e, t) {
        var r = ae.parse(e),
        i = r.getPath();
        return i = i ? i.endsWith("/") ? "" + i + t : i + "/" + t : t,
        r.setPath(i),
        r.toString()
    }
    function Lr(e, t, r) {
        var i = ae.parse(e);
        return i.setQueryParameter(t, r),
        i.toString()
    }
    function Ar(e, t) {
        void 0 === t && (t = !0);
        var r = e.toISOString();
        return t ? r.substring(0, r.length - 1) + "0000Z" : r.substring(0, r.length - 5) + "Z"
    }
    var Ur, jr = function (r) {
        function e(e, t) {
            return r.call(this, e, t) || this
        }
        return N(e, r),
        e.prototype.sendRequest = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return "GET" !== t.method.toUpperCase() && "HEAD" !== t.method.toUpperCase() || (t.url = Lr(t.url, Dr, (new Date).getTime().toString())),
                    t.headers.remove("Cookie"),
                    t.headers.remove("content-length"),
                    [2, this._nextPolicy.sendRequest(t)]
                })
            })
        },
        e
    } (X),
    kr = function () {
        function e() {}
        return e.prototype.create = function (e, t) {
            return new jr(e, t)
        },
        e
    } (),
    Br = function (a) {
        function e(e, t, r) {
            var i = this;
            if (null == e) throw new Error("'version' cannot be null.");
            if (null == t) throw new Error("'url' cannot be null.");
            if (r || (r = {}), !r.userAgent) {
                var n = re();
                r.userAgent = "azure-storage-file/1.0.0 " + n
            }
            return (i = a.call(this, void 0, r) || this).baseUri = "{url}",
            i.requestContentType = "application/json; charset=utf-8",
            i.version = e,
            i.url = t,
            i
        }
        return N(e, a),
        e
    } (_e),
    Gr = function (n) {
        function e(e, t, r) {
            var i = n.call(this, e, t) || this;
            return i.keepAliveOptions = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return t.keepAlive = this.keepAliveOptions.enable,
                    [2, this._nextPolicy.sendRequest(t)]
                })
            })
        },
        e
    } (X),
    Vr = function () {
        function e(e) {
            void 0 === e && (e = {
                enable: !0
            }),
            this.keepAliveOptions = e
        }
        return e.prototype.create = function (e, t) {
            return new Gr(e, t, this.keepAliveOptions)
        },
        e
    } (),
    Xr = {
        logWarningIfTryOverThreshold: 3e3
    },
    Wr = function (n) {
        function e(e, t, r) {
            void 0 === r && (r = Xr);
            var i = n.call(this, e, t) || this;
            return i.tryCount = 0,
            i.operationStartTime = new Date,
            i.requestStartTime = new Date,
            i.loggingOptions = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (m) {
            return x(this, void 0, void 0, function () {
                var i, n, a, o, s, l, u, d, p, c;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        this.tryCount++,
                        this.requestStartTime = new Date,
                        1 === this.tryCount && (this.operationStartTime = this.requestStartTime),
                        t = i = m.url,
                        r = Mr,
                        ae.parse(t).getQueryParameterValue(r) && (i = Lr(i, Mr, "*****")),
                        this.log(f.HttpPipelineLogLevel.INFO, "'" + i + "'==> OUTGOING REQUEST (Try number=" + this.tryCount + ")."),
                        e.label = 1;
                    case 1:
                        return e.trys.push([1, 3, , 4]),
                        [4, this._nextPolicy.sendRequest(m)];
                    case 2:
                        return n = e.sent(),
                        a = new Date,
                        o = a.getTime() - this.requestStartTime.getTime(),
                        s = a.getTime() - this.operationStartTime.getTime(),
                        l = f.HttpPipelineLogLevel.INFO,
                        u = "",
                        this.shouldLog(f.HttpPipelineLogLevel.INFO) && (u = "Successfully Received Response. "),
                        o >= this.loggingOptions.logWarningIfTryOverThreshold && this.shouldLog(f.HttpPipelineLogLevel.WARNING) && (l = f.HttpPipelineLogLevel.WARNING, u = "SLOW OPERATION. Duration > " + this.loggingOptions.logWarningIfTryOverThreshold + " ms. "),
                        (400 <= n.status && n.status <= 499 && 404 !== n.status && 409 !== n.status && 412 !== n.status && 416 !== n.status || 500 <= n.status && n.status <= 509) && (d = "REQUEST ERROR: HTTP request failed with status code: " + n.status + ". ", u = d, l = f.HttpPipelineLogLevel.ERROR),
                        p = "Request try:" + this.tryCount + ", status:" + n.status + " request duration:" + o + " ms, operation duration:" + s + " ms\n",
                        this.log(l, u + p),
                        [2, n];
                    case 3:
                        throw c = e.sent(),
                        this.log(f.HttpPipelineLogLevel.ERROR, "Unexpected failure attempting to make request. Error message: " + c.message),
                        c;
                    case 4:
                        return [2]
                    }
                    var t, r
                })
            })
        }, e
    } (X),
    Qr = function () {
        function e(e) {
            this.loggingOptions = e
        }
        return e.prototype.create = function (e, t) {
            return new Wr(e, t, this.loggingOptions)
        },
        e
    } (),
    $r = function () {
        function e(e, t) {
            void 0 === t && (t = {}),
            this.factories = e,
            this.options = t
        }
        return e.prototype.toServiceClientOptions = function () {
            return {
                httpClient: this.options.HTTPClient,
                httpPipelineLogger: this.options.logger,
                requestPolicyFactories: this.factories
            }
        },
        e
    } ();
    (Ur = f.RetryPolicyType || (f.RetryPolicyType = {}))[Ur.EXPONENTIAL = 0] = "EXPONENTIAL",
    Ur[Ur.FIXED = 1] = "FIXED";
    var Yr = {
        maxRetryDelayInMs: 12e4,
        maxTries: 4,
        retryDelayInMs: 4e3,
        retryPolicyType: f.RetryPolicyType.EXPONENTIAL,
        tryTimeoutInMs: void 0
    },
    Jr = new w("The request was aborted", w.REQUEST_ABORTED_ERROR),
    Zr = function (n) {
        function e(e, t, r) {
            void 0 === r && (r = Yr);
            var i = n.call(this, e, t) || this;
            return i.retryOptions = {
                retryPolicyType: r.retryPolicyType ? r.retryPolicyType : Yr.retryPolicyType,
                maxTries: r.maxTries && 1 <= r.maxTries ? Math.floor(r.maxTries) : Yr.maxTries,
                tryTimeoutInMs: r.tryTimeoutInMs && 0 <= r.tryTimeoutInMs ? r.tryTimeoutInMs : Yr.tryTimeoutInMs,
                retryDelayInMs: r.retryDelayInMs && 0 <= r.retryDelayInMs ? Math.min(r.retryDelayInMs, r.maxRetryDelayInMs ? r.maxRetryDelayInMs : Yr.maxRetryDelayInMs) : Yr.retryDelayInMs,
                maxRetryDelayInMs: r.maxRetryDelayInMs && 0 <= r.maxRetryDelayInMs ? r.maxRetryDelayInMs : Yr.maxRetryDelayInMs
            },
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.attemptSendRequest(t, !1, 1)]
                })
            })
        },
        e.prototype.attemptSendRequest = function (a, o, s) {
            return x(this, void 0, void 0, function () {
                var t, r, i, n;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        t = a.clone(),
                        r = !0,
                        this.retryOptions.tryTimeoutInMs && (t.url = Lr(t.url, Or, Math.floor(this.retryOptions.tryTimeoutInMs / 1e3).toString())),
                        e.label = 1;
                    case 1:
                        return e.trys.push([1, 3, , 4]),
                        this.logf(f.HttpPipelineLogLevel.INFO, "RetryPolicy: =====> Try=" + s + " " + (r ? "Primary" : "Secondary")),
                        [4, this._nextPolicy.sendRequest(t)];
                    case 2:
                        return i = e.sent(),
                        this.shouldRetry(r, s, i) ? (o = o || !r && 404 === i.status, [3, 4]) : [2, i];
                    case 3:
                        if (n = e.sent(), this.logf(f.HttpPipelineLogLevel.ERROR, "RetryPolicy: Caught error, message: " + n.message + ", code: " + n.code), !this.shouldRetry(r, s, i, n)) throw n;
                        return [3, 4];
                    case 4:
                        return [4, this.delay(r, s, a.abortSignal)];
                    case 5:
                        return e.sent(),
                        [4, this.attemptSendRequest(a, o, ++s)];
                    case 6:
                        return [2, e.sent()]
                    }
                })
            })
        },
        e.prototype.shouldRetry = function (e, t, r, i) {
            if (t >= this.retryOptions.maxTries) return this.logf(f.HttpPipelineLogLevel.INFO, "RetryPolicy: Attempt(s) " + t + " >= maxTries " + this.retryOptions.maxTries + ", no further try."),
            !1;
            if (i) for (var n = 0, a = ["ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ECONNRESET", "ENOENT", "ENOTFOUND", "TIMEOUT", "REQUEST_SEND_ERROR"]; n < a.length; n++) {
                var o = a[n];
                if (i.name.toUpperCase().includes(o) || i.message.toUpperCase().includes(o) || i.code && i.code.toString().toUpperCase().includes(o)) return this.logf(f.HttpPipelineLogLevel.INFO, "RetryPolicy: Network error " + o + " found, will retry."),
                !0
            }
            if (r || i) {
                var s = r ? r.status : i ? i.statusCode : 0;
                if (!e && 404 === s) return this.logf(f.HttpPipelineLogLevel.INFO, "RetryPolicy: Secondary access with 404, will retry."),
                !0;
                if (503 === s || 500 === s) return this.logf(f.HttpPipelineLogLevel.INFO, "RetryPolicy: Will retry for status code " + s + "."),
                !0
            }
            return !1
        },
        e.prototype.logf = function (e, t) {},
        e.prototype.delay = function (r, i, n) {
            return x(this, void 0, void 0, function () {
                var t;
                return P(this, function (e) {
                    if (t = 0, r) switch (this.retryOptions.retryPolicyType) {
                    case f.RetryPolicyType.EXPONENTIAL:
                        t = Math.min((Math.pow(2, i - 1) - 1) * this.retryOptions.retryDelayInMs, this.retryOptions.maxRetryDelayInMs);
                        break;
                    case f.RetryPolicyType.FIXED:
                        t = this.retryOptions.retryDelayInMs
                    } else t = 1e3 * Math.random();
                    return this.logf(f.HttpPipelineLogLevel.INFO, "RetryPolicy: Delay for " + t + "ms"),
                    [2, function (n, a, o) {
                        return x(this, void 0, void 0, function () {
                            return P(this, function (e) {
                                return [2, new Promise(function (e, t) {
                                    var r, i = function () {
                                        void 0 !== r && clearTimeout(r),
                                        t(o)
                                    };
                                    r = setTimeout(function () {
                                        void 0 !== a && a.removeEventListener("abort", i),
                                        e()
                                    },
                                    n),
                                    void 0 !== a && a.addEventListener("abort", i)
                                })]
                            })
                        })
                    } (t, n, Jr)]
                })
            })
        },
        e
    } (X),
    Kr = function () {
        function e(e) {
            this.retryOptions = e
        }
        return e.prototype.create = function (e, t) {
            return new Zr(e, t, this.retryOptions)
        },
        e
    } (),
    ei = function (n) {
        function e(e, t, r) {
            var i = n.call(this, e, t) || this;
            return i.telemetry = r,
            i
        }
        return N(e, n),
        e.prototype.sendRequest = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this._nextPolicy.sendRequest(t)]
                })
            })
        },
        e
    } (X),
    ti = function () {
        function e(e) {
            this.telemetryString = [].join(" ")
        }
        return e.prototype.create = function (e, t) {
            return new ei(e, t, this.telemetryString)
        },
        e
    } (),
    ri = function (r) {
        function e(e, t) {
            return r.call(this, e, t) || this
        }
        return N(e, r),
        e.prototype.sendRequest = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return t.headers.contains(Hr) || t.headers.set(Hr, y()),
                    [2, this._nextPolicy.sendRequest(t)]
                })
            })
        },
        e
    } (X),
    ii = function () {
        function e() {}
        return e.prototype.create = function (e, t) {
            return new ri(e, t)
        },
        e
    } (),
    ni = function () {
        function e(e, t) {
            var r, i, n;
            this.url = (r = e, i = ae.parse(r), n = (n = i.getPath()) || "/", n = encodeURIComponent(n).replace(/%2F/g, "/").replace(/'/g, "%27").replace(/\+/g, "%20").replace(/%25/g, "%"), i.setPath(n), i.toString()),
            this.pipeline = t,
            this.storageClientContext = new Br("2018-11-09", this.url, t.toServiceClientOptions());
            var a = this.storageClientContext;
            a.requestContentType && (a.requestContentType = void 0)
        }
        return e.newPipeline = function (e, t) {
            void 0 === t && (t = {});
            var r = [new Vr(t.keepAliveOptions), new ti(t.telemetry), new ii, new kr, Q(), new Kr(t.retryOptions), new Qr, e];
            return new $r(r, {
                HTTPClient: t.httpClient,
                logger: t.logger
            })
        },
        e
    } (),
    ai = function (i) {
        function r(e, t) {
            var r = i.call(this, e, t) || this;
            return r.context = new $t(r.storageClientContext),
            r
        }
        return N(r, i),
        r.fromServiceURL = function (e, t) {
            return new r(Fr(e.url, t), e.pipeline)
        },
        r.prototype.withPipeline = function (e) {
            return new r(this.url, e)
        },
        r.prototype.withSnapshot = function (e) {
            return new r(Lr(this.url, Ir, 0 === e.length ? void 0 : e), this.pipeline)
        },
        r.prototype.create = function (t, r) {
            return void 0 === r && (r = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.create(q({},
                    r, {
                        abortSignal: t
                    }))]
                })
            })
        },
        r.prototype.getProperties = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.getProperties({
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.delete = function (t, r) {
            return void 0 === r && (r = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.deleteMethod(q({
                        abortSignal: t
                    },
                    r))]
                })
            })
        },
        r.prototype.setMetadata = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.setMetadata({
                        abortSignal: t,
                        metadata: r
                    })]
                })
            })
        },
        r.prototype.getAccessPolicy = function (o) {
            return x(this, void 0, void 0, function () {
                var t, r, i, n, a;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.context.getAccessPolicy({
                            abortSignal: o
                        })];
                    case 1:
                        for (t = e.sent(), r = {
                            _response: t._response,
                            date: t.date,
                            eTag: t.eTag,
                            lastModified: t.lastModified,
                            requestId: t.requestId,
                            signedIdentifiers: [],
                            version: t.version
                        },
                        i = 0, n = t; i < n.length; i++) a = n[i],
                        r.signedIdentifiers.push({
                            accessPolicy: {
                                expiry: new Date(a.accessPolicy.expiry),
                                permission: a.accessPolicy.permission,
                                start: new Date(a.accessPolicy.start)
                            },
                            id: a.id
                        });
                        return [2, r]
                    }
                })
            })
        },
        r.prototype.setAccessPolicy = function (a, o) {
            return x(this, void 0, void 0, function () {
                var t, r, i, n;
                return P(this, function (e) {
                    for (t = [], r = 0, i = o || []; r < i.length; r++) n = i[r],
                    t.push({
                        accessPolicy: {
                            expiry: Ar(n.accessPolicy.expiry),
                            permission: n.accessPolicy.permission,
                            start: Ar(n.accessPolicy.start)
                        },
                        id: n.id
                    });
                    return [2, this.context.setAccessPolicy({
                        abortSignal: a,
                        shareAcl: t
                    })]
                })
            })
        },
        r.prototype.createSnapshot = function (t, r) {
            return void 0 === r && (r = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.createSnapshot(q({
                        abortSignal: t
                    },
                    r))]
                })
            })
        },
        r.prototype.setQuota = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if (r <= 0 || 5120 < r) throw new RangeError("Share quota must be greater than 0, and less than or equal to 5Tib (5120GB)");
                    return [2, this.context.setQuota({
                        abortSignal: t,
                        quota: r
                    })]
                })
            })
        },
        r.prototype.getStatistics = function (r) {
            return x(this, void 0, void 0, function () {
                var t;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.context.getStatistics({
                            abortSignal: r
                        })];
                    case 1:
                        return t = e.sent(),
                        [2, q({},
                        t, {
                            shareUsage: Math.ceil(t.shareUsageBytes / 1073741824)
                        })]
                    }
                })
            })
        },
        r
    } (ni),
    oi = function (i) {
        function r(e, t) {
            var r = i.call(this, e, t) || this;
            return r.context = new sr(r.storageClientContext),
            r
        }
        return N(r, i),
        r.fromShareURL = function (e, t) {
            return new r(Fr(e.url, encodeURIComponent(t)), e.pipeline)
        },
        r.fromDirectoryURL = function (e, t) {
            return new r(Fr(e.url, encodeURIComponent(t)), e.pipeline)
        },
        r.prototype.withPipeline = function (e) {
            return new r(this.url, e)
        },
        r.prototype.create = function (t, r) {
            return void 0 === r && (r = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.create(q({},
                    r, {
                        abortSignal: t
                    }))]
                })
            })
        },
        r.prototype.getProperties = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.getProperties({
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.delete = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.deleteMethod({
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.setMetadata = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.setMetadata({
                        abortSignal: t,
                        metadata: r
                    })]
                })
            })
        },
        r.prototype.listFilesAndDirectoriesSegment = function (t, r, i) {
            return void 0 === i && (i = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.listFilesAndDirectoriesSegment(q({
                        abortSignal: t,
                        marker: r
                    },
                    i))]
                })
            })
        },
        r.prototype.listHandlesSegment = function (r, i, n) {
            return void 0 === n && (n = {}),
            x(this, void 0, void 0, function () {
                var t;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        return i = "" === i ? void 0 : i,
                        [4, this.context.listHandles(q({
                            abortSignal: r,
                            marker: i
                        },
                        n))];
                    case 1:
                        return "" === (t = e.sent()).handleList && (t.handleList = void 0),
                        [2, t]
                    }
                })
            })
        },
        r.prototype.forceCloseHandlesSegment = function (t, r, i) {
            return void 0 === i && (i = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return r = "" === r ? void 0 : r,
                    [2, this.context.forceCloseHandles("*", q({
                        abortSignal: t,
                        marker: r
                    },
                    i))]
                })
            })
        },
        r.prototype.forceCloseHandle = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if ("*" === r) throw new RangeError("Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.");
                    return [2, this.context.forceCloseHandles(r, {
                        abortSignal: t
                    })]
                })
            })
        },
        r
    } (ni);
    function si(e) {
        if (e.offset < 0) throw new RangeError("IRange.offset cannot be smaller than 0.");
        if (e.count && e.count <= 0) throw new RangeError("IRange.count must be larger than 0. Leave it undefined if you want a range from offset to the end.");
        return e.count ? "bytes=" + e.offset + "-" + (e.offset + e.count - 1) : "bytes=" + e.offset + "-"
    }
    var li, ui = function (i) {
        function r(e, t) {
            var r = i.call(this, e, t) || this;
            return r.context = new gr(r.storageClientContext),
            r
        }
        return N(r, i),
        r.fromDirectoryURL = function (e, t) {
            return new r(Fr(e.url, encodeURIComponent(t)), e.pipeline)
        },
        r.prototype.withPipeline = function (e) {
            return new r(this.url, e)
        },
        r.prototype.create = function (t, r, i) {
            return void 0 === i && (i = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if (r < 0 || 1099511627776 < r) throw new RangeError("File size must >= 0 and < 1099511627776.");
                    return i.fileHTTPHeaders = i.fileHTTPHeaders || {},
                    [2, this.context.create(r, {
                        abortSignal: t,
                        fileHTTPHeaders: i.fileHTTPHeaders,
                        metadata: i.metadata
                    })]
                })
            })
        },
        r.prototype.download = function (a, o, r, s) {
            return void 0 === s && (s = {}),
            x(this, void 0, void 0, function () {
                var t, i, n = this;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        if (s.rangeGetContentMD5 && 0 === o && void 0 === r) throw new RangeError("rangeGetContentMD5 only works with partial data downloading");
                        return t = 0 === o && !r,
                        [4, this.context.download({
                            abortSignal: a,
                            onDownloadProgress: l ? void 0 : s.progress,
                            range: t ? void 0 : si({
                                offset: o,
                                count: r
                            }),
                            rangeGetContentMD5: s.rangeGetContentMD5
                        })];
                    case 1:
                        if (i = e.sent(), !l) return [2, i];
                        if ((void 0 === s.maxRetryRequests || s.maxRetryRequests < 0) && (s.maxRetryRequests = 5), void 0 === i.contentLength) throw new RangeError("File download response doesn't contain valid content length header");
                        return [2, new 1(a, i, function (r) {
                            return x(n, void 0, void 0, function () {
                                var t;
                                return P(this, function (e) {
                                    switch (e.label) {
                                    case 0:
                                        return t = {
                                            range: si({
                                                count: o + i.contentLength - r,
                                                offset: r
                                            })
                                        },
                                        [4, this.context.download(q({
                                            abortSignal: a
                                        },
                                        t))];
                                    case 1:
                                        return [2, e.sent().readableStreamBody]
                                    }
                                })
                            })
                        },
                        o, i.contentLength, {
                            maxRetryRequests: s.maxRetryRequests,
                            progress: s.progress
                        })]
                    }
                })
            })
        },
        r.prototype.getProperties = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.getProperties({
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.delete = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.deleteMethod({
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.setHTTPHeaders = function (t, r) {
            return void 0 === r && (r = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.setHTTPHeaders({
                        abortSignal: t,
                        fileHTTPHeaders: r
                    })]
                })
            })
        },
        r.prototype.resize = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if (r < 0) throw new RangeError("Size cannot less than 0 when resizing file.");
                    return [2, this.context.setHTTPHeaders({
                        abortSignal: t,
                        fileContentLength: r
                    })]
                })
            })
        },
        r.prototype.setMetadata = function (t, r) {
            return void 0 === r && (r = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.setMetadata({
                        abortSignal: t,
                        metadata: r
                    })]
                })
            })
        },
        r.prototype.uploadRange = function (t, r, i, n, a) {
            return void 0 === a && (a = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if (i < 0 || n <= 0) throw new RangeError("offset must >= 0 and contentLength must be > 0");
                    if (qr < n) throw new RangeError("offset must be < " + qr + " bytes");
                    return [2, this.context.uploadRange(si({
                        count: n,
                        offset: i
                    }), "update", n, {
                        abortSignal: t,
                        contentMD5: a.contentMD5,
                        onUploadProgress: a.progress,
                        optionalbody: r
                    })]
                })
            })
        },
        r.prototype.clearRange = function (t, r, i) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if (r < 0 || i <= 0) throw new RangeError("offset must >= 0 and contentLength must be > 0");
                    return [2, this.context.uploadRange(si({
                        count: i,
                        offset: r
                    }), "clear", 0, {
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.getRangeList = function (r, i) {
            return void 0 === i && (i = {}),
            x(this, void 0, void 0, function () {
                var t;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.context.getRangeList({
                            abortSignal: r,
                            range: i.range ? si(i.range) : void 0
                        })];
                    case 1:
                        return [2, {
                            _response: (t = e.sent())._response,
                            date: t.date,
                            eTag: t.eTag,
                            errorCode: t.errorCode,
                            fileContentLength: t.fileContentLength,
                            lastModified: t.lastModified,
                            rangeList: t.filter(function () {
                                return !0
                            }),
                            requestId: t.requestId,
                            version: t.version
                        }]
                    }
                })
            })
        },
        r.prototype.startCopyFromURL = function (t, r, i) {
            return void 0 === i && (i = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.startCopy(r, {
                        abortSignal: t,
                        metadata: i.metadata
                    })]
                })
            })
        },
        r.prototype.abortCopyFromURL = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.context.abortCopy(r, {
                        abortSignal: t
                    })]
                })
            })
        },
        r.prototype.listHandlesSegment = function (r, i, n) {
            return void 0 === n && (n = {}),
            x(this, void 0, void 0, function () {
                var t;
                return P(this, function (e) {
                    switch (e.label) {
                    case 0:
                        return i = "" === i ? void 0 : i,
                        [4, this.context.listHandles(q({
                            abortSignal: r,
                            marker: i
                        },
                        n))];
                    case 1:
                        return "" === (t = e.sent()).handleList && (t.handleList = void 0),
                        [2, t]
                    }
                })
            })
        },
        r.prototype.forceCloseHandlesSegment = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return r = "" === r ? void 0 : r,
                    [2, this.context.forceCloseHandles("*", {
                        abortSignal: t,
                        marker: r
                    })]
                })
            })
        },
        r.prototype.forceCloseHandle = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    if ("*" === r) throw new RangeError("Parameter handleID should be a specified handle ID. Use forceCloseHandlesSegment() to close all handles.");
                    return [2, this.context.forceCloseHandles(r, {
                        abortSignal: t
                    })]
                })
            })
        },
        r
    } (ni),
    di = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return N(t, e),
        t.prototype.sendRequest = function (e) {
            return this._nextPolicy.sendRequest(this.signRequest(e))
        },
        t.prototype.signRequest = function (e) {
            return e
        },
        t
    } (X),
    pi = function (r) {
        function e(e, t) {
            return r.call(this, e, t) || this
        }
        return N(e, r),
        e
    } (di),
    ci = function () {
        function e() {}
        return e.prototype.create = function (e, t) {
            throw new Error("Method should be implemented in children classes.")
        },
        e
    } (),
    mi = function (e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return N(t, e),
        t.prototype.create = function (e, t) {
            return new pi(e, t)
        },
        t
    } (ci),
    fi = "object" == typeof Reflect ? Reflect : null,
    hi = fi && "function" == typeof fi.apply ? fi.apply : function (e, t, r) {
        return Function.prototype.apply.call(e, t, r)
    };
    li = fi && "function" == typeof fi.ownKeys ? fi.ownKeys : Object.getOwnPropertySymbols ?
    function (e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    } : function (e) {
        return Object.getOwnPropertyNames(e)
    };
    var yi = Number.isNaN ||
    function (e) {
        return e != e
    };
    function gi() {
        gi.init.call(this)
    }
    var vi = gi;
    (gi.EventEmitter = gi).prototype._events = void 0,
    gi.prototype._eventsCount = 0,
    gi.prototype._maxListeners = void 0;
    var bi = 10;
    function Si(e) {
        return void 0 === e._maxListeners ? gi.defaultMaxListeners : e._maxListeners
    }
    function Ni(e, t, r, i) {
        var n, a, o, s;
        if ("function" != typeof r) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
        if (void 0 === (a = e._events) ? (a = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== a.newListener && (e.emit("newListener", t, r.listener ? r.listener : r), a = e._events), o = a[t]), void 0 === o) o = a[t] = r,
        ++e._eventsCount;
        else if ("function" == typeof o ? o = a[t] = i ? [r, o] : [o, r] : i ? o.unshift(r) : o.push(r), 0 < (n = Si(e)) && o.length > n && !o.warned) {
            o.warned = !0;
            var l = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            l.name = "MaxListenersExceededWarning",
            l.emitter = e,
            l.type = t,
            l.count = o.length,
            s = l,
            console && console.warn && console.warn(s)
        }
        return e
    }
    function xi(e, t, r) {
        var i = {
            fired: !1,
            wrapFn: void 0,
            target: e,
            type: t,
            listener: r
        },
        n = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
            this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, hi(this.listener, this.target, e))
        }.bind(i);
        return n.listener = r,
        i.wrapFn = n
    }
    function Pi(e, t, r) {
        var i = e._events;
        if (void 0 === i) return [];
        var n = i[t];
        return void 0 === n ? [] : "function" == typeof n ? r ? [n.listener || n] : [n] : r ?
        function (e) {
            for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
            return t
        } (n) : wi(n, n.length)
    }
    function _i(e) {
        var t = this._events;
        if (void 0 !== t) {
            var r = t[e];
            if ("function" == typeof r) return 1;
            if (void 0 !== r) return r.length
        }
        return 0
    }
    function wi(e, t) {
        for (var r = new Array(t), i = 0; i < t; ++i) r[i] = e[i];
        return r
    }
    Object.defineProperty(gi, "defaultMaxListeners", {
        enumerable: !0,
        get: function () {
            return bi
        },
        set: function (e) {
            if ("number" != typeof e || e < 0 || yi(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
            bi = e
        }
    }),
    gi.init = function () {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0),
        this._maxListeners = this._maxListeners || void 0
    },
    gi.prototype.setMaxListeners = function (e) {
        if ("number" != typeof e || e < 0 || yi(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e,
        this
    },
    gi.prototype.getMaxListeners = function () {
        return Si(this)
    },
    gi.prototype.emit = function (e) {
        for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
        var i = "error" === e,
        n = this._events;
        if (void 0 !== n) i = i && void 0 === n.error;
        else if (!i) return !1;
        if (i) {
            var a;
            if (0 < t.length && (a = t[0]), a instanceof Error) throw a;
            var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
            throw o.context = a,
            o
        }
        var s = n[e];
        if (void 0 === s) return !1;
        if ("function" == typeof s) hi(s, this, t);
        else {
            var l = s.length,
            u = wi(s, l);
            for (r = 0; r < l; ++r) hi(u[r], this, t)
        }
        return !0
    },
    gi.prototype.on = gi.prototype.addListener = function (e, t) {
        return Ni(this, e, t, !1)
    },
    gi.prototype.prependListener = function (e, t) {
        return Ni(this, e, t, !0)
    },
    gi.prototype.once = function (e, t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        return this.on(e, xi(this, e, t)),
        this
    },
    gi.prototype.prependOnceListener = function (e, t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        return this.prependListener(e, xi(this, e, t)),
        this
    },
    gi.prototype.off = gi.prototype.removeListener = function (e, t) {
        var r, i, n, a, o;
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        if (void 0 === (i = this._events)) return this;
        if (void 0 === (r = i[e])) return this;
        if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, r.listener || t));
        else if ("function" != typeof r) {
            for (n = -1, a = r.length - 1; 0 <= a; a--) if (r[a] === t || r[a].listener === t) {
                o = r[a].listener,
                n = a;
                break
            }
            if (n < 0) return this;
            0 === n ? r.shift() : function (e, t) {
                for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                e.pop()
            } (r, n),
            1 === r.length && (i[e] = r[0]),
            void 0 !== i.removeListener && this.emit("removeListener", e, o || t)
        }
        return this
    },
    gi.prototype.removeAllListeners = function (e) {
        var t, r, i;
        if (void 0 === (r = this._events)) return this;
        if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[e]),
        this;
        if (0 === arguments.length) {
            var n, a = Object.keys(r);
            for (i = 0; i < a.length; ++i)"removeListener" !== (n = a[i]) && this.removeAllListeners(n);
            return this.removeAllListeners("removeListener"),
            this._events = Object.create(null),
            this._eventsCount = 0,
            this
        }
        if ("function" == typeof(t = r[e])) this.removeListener(e, t);
        else if (void 0 !== t) for (i = t.length - 1; 0 <= i; i--) this.removeListener(e, t[i]);
        return this
    },
    gi.prototype.listeners = function (e) {
        return Pi(this, e, !0)
    },
    gi.prototype.rawListeners = function (e) {
        return Pi(this, e, !1)
    },
    gi.listenerCount = function (e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : _i.call(e, t)
    },
    gi.prototype.listenerCount = _i,
    gi.prototype.eventNames = function () {
        return 0 < this._eventsCount ? li(this._events) : []
    };
    var Ti, Ri, Ei = vi.EventEmitter;
    (Ri = Ti || (Ti = {}))[Ri.Good = 0] = "Good",
    Ri[Ri.Error = 1] = "Error";
    var zi = function () {
        function e(e) {
            if (void 0 === e && (e = 5), this.actives = 0, this.completed = 0, this.offset = 0, this.operations = [], this.state = Ti.Good, e < 1) throw new RangeError("concurrency must be larger than 0");
            this.concurrency = e,
            this.emitter = new Ei
        }
        return e.prototype.addOperation = function (r) {
            var e = this;
            this.operations.push(function () {
                return x(e, void 0, void 0, function () {
                    var t;
                    return P(this, function (e) {
                        switch (e.label) {
                        case 0:
                            return e.trys.push([0, 2, , 3]),
                            this.actives++,
                            [4, r()];
                        case 1:
                            return e.sent(),
                            this.actives--,
                            this.completed++,
                            this.parallelExecute(),
                            [3, 3];
                        case 2:
                            return t = e.sent(),
                            this.emitter.emit("error", t),
                            [3, 3];
                        case 3:
                            return [2]
                        }
                    })
                })
            })
        },
        e.prototype.do = function () {
            return x(this, void 0, void 0, function () {
                var r = this;
                return P(this, function (e) {
                    return this.parallelExecute(),
                    [2, new Promise(function (e, t) {
                        r.emitter.on("finish", e),
                        r.emitter.on("error", function (e) {
                            r.state = Ti.Error,
                            t(e)
                        })
                    })]
                })
            })
        },
        e.prototype.nextOperation = function () {
            return this.offset < this.operations.length ? this.operations[this.offset++] : null
        },
        e.prototype.parallelExecute = function () {
            if (this.state !== Ti.Error) if (this.completed >= this.operations.length) this.emitter.emit("finish");
            else for (; this.actives < this.concurrency;) {
                var e = this.nextOperation();
                if (!e) return;
                e()
            }
        },
        e
    } ();
    var Ci = function (i) {
        function t(e, t) {
            var r = i.call(this, e, t) || this;
            return r.serviceContext = new Bt(r.storageClientContext),
            r
        }
        return N(t, i),
        t.prototype.withPipeline = function (e) {
            return new t(this.url, e)
        },
        t.prototype.getProperties = function (t) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.serviceContext.getProperties({
                        abortSignal: t
                    })]
                })
            })
        },
        t.prototype.setProperties = function (t, r) {
            return x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.serviceContext.setProperties(r, {
                        abortSignal: t
                    })]
                })
            })
        },
        t.prototype.listSharesSegment = function (t, r, i) {
            return void 0 === i && (i = {}),
            x(this, void 0, void 0, function () {
                return P(this, function (e) {
                    return [2, this.serviceContext.listSharesSegment(q({
                        abortSignal: t,
                        marker: r
                    },
                    i))]
                })
            })
        },
        t
    } (ni);
    f.Aborter = ze,
    f.AnonymousCredential = mi,
    f.AnonymousCredentialPolicy = pi,
    f.BaseRequestPolicy = X,
    f.BrowserPolicyFactory = kr,
    f.Credential = ci,
    f.CredentialPolicy = di,
    f.DirectoryURL = oi,
    f.FileURL = ui,
    f.HttpHeaders = m,
    f.LoggingPolicyFactory = Qr,
    f.Models = Ee,
    f.Pipeline = $r,
    f.RequestPolicyOptions = W,
    f.RestError = w,
    f.RetryPolicyFactory = Kr,
    f.ServiceURL = Ci,
    f.ShareURL = ai,
    f.StorageURL = ni,
    f.TelemetryPolicyFactory = ti,
    f.UniqueRequestIDPolicyFactory = ii,
    f.WebResource = C,
    f.deserializationPolicy = Q,
    f.uploadBrowserDataToAzureFile = function (t, i, n, a) {
        return x(this, void 0, void 0, function () {
            var r;
            return P(this, function (e) {
                return r = new Blob([i]),
                [2, function (l, u, d, p, c) {
                    return void 0 === c && (c = {}),
                    x(this, void 0, void 0, function () {
                        var a, o, t, r, i, s = this;
                        return P(this, function (e) {
                            switch (e.label) {
                            case 0:
                                if (c.rangeSize || (c.rangeSize = qr), c.rangeSize < 0 || c.rangeSize > qr) throw new RangeError("options.rangeSize must be > 0 and <= " + qr);
                                if (c.fileHTTPHeaders || (c.fileHTTPHeaders = {}), c.parallelism || (c.parallelism = 5), c.parallelism < 0) throw new RangeError("options.parallelism cannot less than 0.");
                                return [4, p.create(l, d, {
                                    fileHTTPHeaders: c.fileHTTPHeaders,
                                    metadata: c.metadata
                                })];
                            case 1:
                                for (e.sent(), a = Math.floor((d - 1) / c.rangeSize) + 1, o = 0, t = new zi(c.parallelism), r = function (n) {
                                    t.addOperation(function () {
                                        return x(s, void 0, void 0, function () {
                                            var t, r, i;
                                            return P(this, function (e) {
                                                switch (e.label) {
                                                case 0:
                                                    return t = c.rangeSize * n,
                                                    r = n === a - 1 ? d : t + c.rangeSize,
                                                    i = r - t,
                                                    [4, p.uploadRange(l, u(t, i), t, i)];
                                                case 1:
                                                    return e.sent(),
                                                    o += i,
                                                    c.progress && c.progress({
                                                        loadedBytes: o
                                                    }),
                                                    [2]
                                                }
                                            })
                                        })
                                    })
                                },
                                i = 0; i < a; i++) r(i);
                                return [2, t.do()]
                            }
                        })
                    })
                } (t, function (e, t) {
                    return r.slice(e, e + t)
                },
                r.size, n, a)]
            })
        })
    },
    Object.defineProperty(f, "__esModule", {
        value: !0
    })
}),
function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
} (function (d) {
    d.ui = d.ui || {};
    d.ui.version = "1.12.1";
    var n, r = 0,
    s = Array.prototype.slice;
    d.cleanData = (n = d.cleanData, function (e) {
        var t, r, i;
        for (i = 0; null != (r = e[i]); i++) try {
            (t = d._data(r, "events")) && t.remove && d(r).triggerHandler("remove")
        } catch(e) {}
        n(e)
    }),
    d.widget = function (e, r, t) {
        var i, n, a, o = {},
        s = e.split(".")[0],
        l = s + "-" + (e = e.split(".")[1]);
        return t || (t = r, r = d.Widget),
        d.isArray(t) && (t = d.extend.apply(null, [{}].concat(t))),
        d.expr[":"][l.toLowerCase()] = function (e) {
            return !! d.data(e, l)
        },
        d[s] = d[s] || {},
        i = d[s][e],
        n = d[s][e] = function (e, t) {
            if (!this._createWidget) return new n(e, t);
            arguments.length && this._createWidget(e, t)
        },
        d.extend(n, i, {
            version: t.version,
            _proto: d.extend({},
            t),
            _childConstructors: []
        }),
        (a = new r).options = d.widget.extend({},
        a.options),
        d.each(t, function (t, a) {
            d.isFunction(a) ? o[t] = function () {
                function i() {
                    return r.prototype[t].apply(this, arguments)
                }
                function n(e) {
                    return r.prototype[t].apply(this, e)
                }
                return function () {
                    var e, t = this._super,
                    r = this._superApply;
                    return this._super = i,
                    this._superApply = n,
                    e = a.apply(this, arguments),
                    this._super = t,
                    this._superApply = r,
                    e
                }
            } () : o[t] = a
        }),
        n.prototype = d.widget.extend(a, {
            widgetEventPrefix: i && a.widgetEventPrefix || e
        },
        o, {
            constructor: n,
            namespace: s,
            widgetName: e,
            widgetFullName: l
        }),
        i ? (d.each(i._childConstructors, function (e, t) {
            var r = t.prototype;
            d.widget(r.namespace + "." + r.widgetName, n, t._proto)
        }), delete i._childConstructors) : r._childConstructors.push(n),
        d.widget.bridge(e, n),
        n
    },
    d.widget.extend = function (e) {
        for (var t, r, i = s.call(arguments, 1), n = 0, a = i.length; n < a; n++) for (t in i[n]) r = i[n][t],
        i[n].hasOwnProperty(t) && void 0 !== r && (d.isPlainObject(r) ? e[t] = d.isPlainObject(e[t]) ? d.widget.extend({},
        e[t], r) : d.widget.extend({},
        r) : e[t] = r);
        return e
    },
    d.widget.bridge = function (a, t) {
        var o = t.prototype.widgetFullName || a;
        d.fn[a] = function (r) {
            var e = "string" == typeof r,
            i = s.call(arguments, 1),
            n = this;
            return e ? this.length || "instance" !== r ? this.each(function () {
                var e, t = d.data(this, o);
                return "instance" === r ? (n = t, !1) : t ? d.isFunction(t[r]) && "_" !== r.charAt(0) ? (e = t[r].apply(t, i)) !== t && void 0 !== e ? (n = e && e.jquery ? n.pushStack(e.get()) : e, !1) : void 0 : d.error("no such method '" + r + "' for " + a + " widget instance") : d.error("cannot call methods on " + a + " prior to initialization; attempted to call method '" + r + "'")
            }) : n = void 0 : (i.length && (r = d.widget.extend.apply(null, [r].concat(i))), this.each(function () {
                var e = d.data(this, o);
                e ? (e.option(r || {}), e._init && e._init()) : d.data(this, o, new t(r, this))
            })),
            n
        }
    },
    d.Widget = function () {},
    d.Widget._childConstructors = [],
    d.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function (e, t) {
            t = d(t || this.defaultElement || this)[0],
            this.element = d(t),
            this.uuid = r++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = d(),
            this.hoverable = d(),
            this.focusable = d(),
            this.classesElementLookup = {},
            t !== this && (d.data(t, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (e) {
                    e.target === t && this.destroy()
                }
            }), this.document = d(t.style ? t.ownerDocument : t.document || t), this.window = d(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = d.widget.extend({},
            this.options, this._getCreateOptions(), e),
            this._create(),
            this.options.disabled && this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: function () {
            return {}
        },
        _getCreateEventData: d.noop,
        _create: d.noop,
        _init: d.noop,
        destroy: function () {
            var r = this;
            this._destroy(),
            d.each(this.classesElementLookup, function (e, t) {
                r._removeClass(t, e)
            }),
            this.element.off(this.eventNamespace).removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace)
        },
        _destroy: d.noop,
        widget: function () {
            return this.element
        },
        option: function (e, t) {
            var r, i, n, a = e;
            if (0 === arguments.length) return d.widget.extend({},
            this.options);
            if ("string" == typeof e) if (a = {},
            e = (r = e.split(".")).shift(), r.length) {
                for (i = a[e] = d.widget.extend({},
                this.options[e]), n = 0; n < r.length - 1; n++) i[r[n]] = i[r[n]] || {},
                i = i[r[n]];
                if (e = r.pop(), 1 === arguments.length) return void 0 === i[e] ? null : i[e];
                i[e] = t
            } else {
                if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                a[e] = t
            }
            return this._setOptions(a),
            this
        },
        _setOptions: function (e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function (e, t) {
            return "classes" === e && this._setOptionClasses(t),
            this.options[e] = t,
            "disabled" === e && this._setOptionDisabled(t),
            this
        },
        _setOptionClasses: function (e) {
            var t, r, i;
            for (t in e) i = this.classesElementLookup[t],
            e[t] !== this.options.classes[t] && i && i.length && (r = d(i.get()), this._removeClass(i, t), r.addClass(this._classes({
                element: r,
                keys: t,
                classes: e,
                add: !0
            })))
        },
        _setOptionDisabled: function (e) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e),
            e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function () {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function (n) {
            var a = [],
            o = this;
            function e(e, t) {
                var r, i;
                for (i = 0; i < e.length; i++) r = o.classesElementLookup[e[i]] || d(),
                r = n.add ? d(d.unique(r.get().concat(n.element.get()))) : d(r.not(n.element).get()),
                o.classesElementLookup[e[i]] = r,
                a.push(e[i]),
                t && n.classes[e[i]] && a.push(n.classes[e[i]])
            }
            return n = d.extend({
                element: this.element,
                classes: this.options.classes || {}
            },
            n),
            this._on(n.element, {
                remove: "_untrackClassesElement"
            }),
            n.keys && e(n.keys.match(/\S+/g) || [], !0),
            n.extra && e(n.extra.match(/\S+/g) || []),
            a.join(" ")
        },
        _untrackClassesElement: function (r) {
            var i = this;
            d.each(i.classesElementLookup, function (e, t) { - 1 !== d.inArray(r.target, t) && (i.classesElementLookup[e] = d(t.not(r.target).get()))
            })
        },
        _removeClass: function (e, t, r) {
            return this._toggleClass(e, t, r, !1)
        },
        _addClass: function (e, t, r) {
            return this._toggleClass(e, t, r, !0)
        },
        _toggleClass: function (e, t, r, i) {
            i = "boolean" == typeof i ? i : r;
            var n = "string" == typeof e || null === e,
            a = {
                extra: n ? t : r,
                keys: n ? e : t,
                element: n ? this.element : e,
                add: i
            };
            return a.element.toggleClass(this._classes(a), i),
            this
        },
        _on: function (o, s, e) {
            var l, u = this;
            "boolean" != typeof o && (e = s, s = o, o = !1),
            e ? (s = l = d(s), this.bindings = this.bindings.add(s)) : (e = s, s = this.element, l = this.widget()),
            d.each(e, function (e, t) {
                function r() {
                    if (o || !0 !== u.options.disabled && !d(this).hasClass("ui-state-disabled")) return ("string" == typeof t ? u[t] : t).apply(u, arguments)
                }
                "string" != typeof t && (r.guid = t.guid = t.guid || r.guid || d.guid++);
                var i = e.match(/^([\w:-]*)\s*(.*)$/),
                n = i[1] + u.eventNamespace,
                a = i[2];
                a ? l.on(n, a, r) : s.on(n, r)
            })
        },
        _off: function (e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.off(t).off(t),
            this.bindings = d(this.bindings.not(e).get()),
            this.focusable = d(this.focusable.not(e).get()),
            this.hoverable = d(this.hoverable.not(e).get())
        },
        _delay: function (e, t) {
            var r = this;
            return setTimeout(function () {
                return ("string" == typeof e ? r[e] : e).apply(r, arguments)
            },
            t || 0)
        },
        _hoverable: function (e) {
            this.hoverable = this.hoverable.add(e),
            this._on(e, {
                mouseenter: function (e) {
                    this._addClass(d(e.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function (e) {
                    this._removeClass(d(e.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function (e) {
            this.focusable = this.focusable.add(e),
            this._on(e, {
                focusin: function (e) {
                    this._addClass(d(e.currentTarget), null, "ui-state-focus")
                },
                focusout: function (e) {
                    this._removeClass(d(e.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function (e, t, r) {
            var i, n, a = this.options[e];
            if (r = r || {},
            (t = d.Event(t)).type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), t.target = this.element[0], n = t.originalEvent) for (i in n) i in t || (t[i] = n[i]);
            return this.element.trigger(t, r),
            !(d.isFunction(a) && !1 === a.apply(this.element[0], [t].concat(r)) || t.isDefaultPrevented())
        }
    },
    d.each({
        show: "fadeIn",
        hide: "fadeOut"
    },
    function (a, o) {
        d.Widget.prototype["_" + a] = function (t, e, r) {
            var i;
            "string" == typeof e && (e = {
                effect: e
            });
            var n = e ? !0 === e || "number" == typeof e ? o : e.effect || o : a;
            "number" == typeof(e = e || {}) && (e = {
                duration: e
            }),
            i = !d.isEmptyObject(e),
            e.complete = r,
            e.delay && t.delay(e.delay),
            i && d.effects && d.effects.effect[n] ? t[a](e) : n !== a && t[n] ? t[n](e.duration, e.easing, r) : t.queue(function (e) {
                d(this)[a](),
                r && r.call(t[0]),
                e()
            })
        }
    });
    d.widget
}),
function (e) {
    "use strict";
    var i = function (e, t) {
        var r = /[^\w\-.:]/.test(e) ? new Function(i.arg + ",tmpl", "var _e=tmpl.encode" + i.helper + ",_s='" + e.replace(i.regexp, i.func) + "';return _s;") : i.cache[e] = i.cache[e] || i(i.load(e));
        return t ? r(t, i) : function (e) {
            return r(e, i)
        }
    };
    i.cache = {},
    i.load = function (e) {
        return document.getElementById(e).innerHTML
    },
    i.regexp = /([\s'\\])(?!(?:[^{]|\{(?!%))*%\})|(?:\{%(=|#)([\s\S]+?)%\})|(\{%)|(%\})/g,
    i.func = function (e, t, r, i, n, a) {
        return t ? {
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            " ": " "
        } [t] || "\\" + t : r ? "=" === r ? "'+_e(" + i + ")+'" : "'+(" + i + "==null?'':" + i + ")+'" : n ? "';" : a ? "_s+='" : void 0
    },
    i.encReg = /[<>&"'\x00]/g,
    i.encMap = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;"
    },
    i.encode = function (e) {
        return (null == e ? "" : "" + e).replace(i.encReg, function (e) {
            return i.encMap[e] || ""
        })
    },
    i.arg = "o",
    i.helper = ",print=function(s,e){_s+=e?(s==null?'':s):_e(s);},include=function(s,d){_s+=tmpl(s,d);}",
    "function" == typeof define && define.amd ? define(function () {
        return i
    }) : "object" == typeof module && module.exports ? module.exports = i : e.tmpl = i
} (this),
function (n) {
    "use strict";
    function o(t, r, i) {
        var n, a = document.createElement("img");
        return a.onerror = function (e) {
            return o.onerror(a, e, t, r, i)
        },
        a.onload = function (e) {
            return o.onload(a, e, t, r, i)
        },
        "string" == typeof t ? (o.fetchBlob(t, function (e) {
            e ? n = o.createObjectURL(t = e) : (n = t, i && i.crossOrigin && (a.crossOrigin = i.crossOrigin)),
            a.src = n
        },
        i), a) : o.isInstanceOf("Blob", t) || o.isInstanceOf("File", t) ? (n = a._objectURL = o.createObjectURL(t)) ? (a.src = n, a) : o.readFile(t, function (e) {
            var t = e.target;
            t && t.result ? a.src = t.result : r && r(e)
        }) : void 0
    }
    var t = n.createObjectURL && n || n.URL && URL.revokeObjectURL && URL || n.webkitURL && webkitURL;
    function a(e, t) { ! e._objectURL || t && t.noRevoke || (o.revokeObjectURL(e._objectURL), delete e._objectURL)
    }
    o.fetchBlob = function (e, t, r) {
        t()
    },
    o.isInstanceOf = function (e, t) {
        return Object.prototype.toString.call(t) === "[object " + e + "]"
    },
    o.transform = function (e, t, r, i, n) {
        r(e, n)
    },
    o.onerror = function (e, t, r, i, n) {
        a(e, n),
        i && i.call(e, t)
    },
    o.onload = function (e, t, r, i, n) {
        a(e, n),
        i && o.transform(e, n, i, r, {
            originalWidth: e.naturalWidth || e.width,
            originalHeight: e.naturalHeight || e.height
        })
    },
    o.createObjectURL = function (e) {
        return !! t && t.createObjectURL(e)
    },
    o.revokeObjectURL = function (e) {
        return !! t && t.revokeObjectURL(e)
    },
    o.readFile = function (e, t, r) {
        if (n.FileReader) {
            var i = new FileReader;
            if (i.onload = i.onerror = t, i[r = r || "readAsDataURL"]) return i[r](e),
            i
        }
        return !1
    },
    "function" == typeof define && define.amd ? define(function () {
        return o
    }) : "object" == typeof module && module.exports ? module.exports = o : n.loadImage = o
} ("undefined" != typeof window && window || this),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : "object" == typeof module && module.exports ? e(require("./load-image")) : e(window.loadImage)
} (function (x) {
    "use strict";
    var a = x.transform;
    x.transform = function (e, t, r, i, n) {
        a.call(x, x.scale(e, t, n), t, r, i, n)
    },
    x.transformCoordinates = function () {},
    x.getTransformedOptions = function (e, t) {
        var r, i, n, a, o = t.aspectRatio;
        if (!o) return t;
        for (i in r = {},
        t) t.hasOwnProperty(i) && (r[i] = t[i]);
        return r.crop = !0,
        o < (n = e.naturalWidth || e.width) / (a = e.naturalHeight || e.height) ? (r.maxWidth = a * o, r.maxHeight = a) : (r.maxWidth = n, r.maxHeight = n / o),
        r
    },
    x.renderImageToCanvas = function (e, t, r, i, n, a, o, s, l, u) {
        return e.getContext("2d").drawImage(t, r, i, n, a, o, s, l, u),
        e
    },
    x.hasCanvasOption = function (e) {
        return e.canvas || e.crop || !!e.aspectRatio
    },
    x.scale = function (e, t, r) {
        t = t || {};
        var i, n, a, o, s, l, u, d, p, c, m, f = document.createElement("canvas"),
        h = e.getContext || x.hasCanvasOption(t) && f.getContext,
        y = e.naturalWidth || e.width,
        g = e.naturalHeight || e.height,
        v = y,
        b = g;
        function S() {
            var e = Math.max((a || v) / v, (o || b) / b);
            1 < e && (v *= e, b *= e)
        }
        function N() {
            var e = Math.min((i || v) / v, (n || b) / b);
            e < 1 && (v *= e, b *= e)
        }
        if (h && (u = (t = x.getTransformedOptions(e, t, r)).left || 0, d = t.top || 0, t.sourceWidth ? (s = t.sourceWidth, void 0 !== t.right && void 0 === t.left && (u = y - s - t.right)) : s = y - u - (t.right || 0), t.sourceHeight ? (l = t.sourceHeight, void 0 !== t.bottom && void 0 === t.top && (d = g - l - t.bottom)) : l = g - d - (t.bottom || 0), v = s, b = l), i = t.maxWidth, n = t.maxHeight, a = t.minWidth, o = t.minHeight, h && i && n && t.crop ? (m = s / l - (v = i) / (b = n)) < 0 ? (l = n * s / i, void 0 === t.top && void 0 === t.bottom && (d = (g - l) / 2)) : 0 < m && (s = i * l / n, void 0 === t.left && void 0 === t.right && (u = (y - s) / 2)) : ((t.contain || t.cover) && (a = i = i || a, o = n = n || o), t.cover ? (N(), S()) : (S(), N())), h) {
            if (1 < (p = t.pixelRatio) && (f.style.width = v + "px", f.style.height = b + "px", v *= p, b *= p, f.getContext("2d").scale(p, p)), 0 < (c = t.downsamplingRatio) && c < 1 && v < s && b < l) for (; v < s * c;) f.width = s * c,
            f.height = l * c,
            x.renderImageToCanvas(f, e, u, d, s, l, 0, 0, f.width, f.height),
            d = u = 0,
            s = f.width,
            l = f.height,
            (e = document.createElement("canvas")).width = s,
            e.height = l,
            x.renderImageToCanvas(e, f, 0, 0, s, l, 0, 0, s, l);
            return f.width = v,
            f.height = b,
            x.transformCoordinates(f, t),
            x.renderImageToCanvas(f, e, u, d, s, l, 0, 0, v, b)
        }
        return e.width = v,
        e.height = b,
        e
    }
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : "object" == typeof module && module.exports ? e(require("./load-image")) : e(window.loadImage)
} (function (f) {
    "use strict";
    var e = "undefined" != typeof Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    f.blobSlice = e &&
    function () {
        return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
    },
    f.metaDataParsers = {
        jpeg: {
            65505: [],
            65517: []
        }
    },
    f.parseMetaData = function (e, d, p, c) {
        c = c || {};
        var m = this,
        t = (p = p || {}).maxMetaDataSize || 262144;
        "undefined" != typeof DataView && e && 12 <= e.size && "image/jpeg" === e.type && f.blobSlice && f.readFile(f.blobSlice.call(e, 0, t), function (e) {
            if (e.target.error) return console.log(e.target.error),
            void d(c);
            var t, r, i, n, a = e.target.result,
            o = new DataView(a),
            s = 2,
            l = o.byteLength - 4,
            u = s;
            if (65496 === o.getUint16(0)) {
                for (; s < l && (65504 <= (t = o.getUint16(s)) && t <= 65519 || 65534 === t);) {
                    if (s + (r = o.getUint16(s + 2) + 2) > o.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if (i = f.metaDataParsers.jpeg[t]) for (n = 0; n < i.length; n += 1) i[n].call(m, o, s, r, c, p);
                    u = s += r
                } ! p.disableImageHead && 6 < u && (a.slice ? c.imageHead = a.slice(0, u) : c.imageHead = new Uint8Array(a).subarray(0, u))
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            d(c)
        },
        "readAsArrayBuffer") || d(c)
    },
    f.hasMetaOption = function (e) {
        return e && e.meta
    };
    var a = f.transform;
    f.transform = function (t, r, i, n, e) {
        f.hasMetaOption(r) ? f.parseMetaData(n, function (e) {
            a.call(f, t, r, i, n, e)
        },
        r, e) : a.apply(f, arguments)
    }
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
} (function (i) {
    "use strict";
    "undefined" != typeof fetch && "undefined" != typeof Request && (i.fetchBlob = function (e, t, r) {
        if (i.hasMetaOption(r)) return fetch(new Request(e, r)).then(function (e) {
            return e.blob()
        }).then(t).
        catch(function (e) {
            console.log(e),
            t()
        });
        t()
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-scale", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-scale"), require("./load-image-meta")) : e(window.loadImage)
} (function (l) {
    "use strict";
    var t = l.hasCanvasOption,
    r = l.hasMetaOption,
    u = l.transformCoordinates,
    s = l.getTransformedOptions;
    l.hasCanvasOption = function (e) {
        return !! e.orientation || t.call(l, e)
    },
    l.hasMetaOption = function (e) {
        return e && !0 === e.orientation || r.call(l, e)
    },
    l.transformCoordinates = function (e, t) {
        u.call(l, e, t);
        var r = e.getContext("2d"),
        i = e.width,
        n = e.height,
        a = e.style.width,
        o = e.style.height,
        s = t.orientation;
        if (s && !(8 < s)) switch (4 < s && (e.width = n, e.height = i, e.style.width = o, e.style.height = a), s) {
        case 2:
            r.translate(i, 0),
            r.scale(-1, 1);
            break;
        case 3:
            r.translate(i, n),
            r.rotate(Math.PI);
            break;
        case 4:
            r.translate(0, n),
            r.scale(1, -1);
            break;
        case 5:
            r.rotate(.5 * Math.PI),
            r.scale(1, -1);
            break;
        case 6:
            r.rotate(.5 * Math.PI),
            r.translate(0, -n);
            break;
        case 7:
            r.rotate(.5 * Math.PI),
            r.translate(i, -n),
            r.scale(-1, 1);
            break;
        case 8:
            r.rotate(-.5 * Math.PI),
            r.translate(-i, 0)
        }
    },
    l.getTransformedOptions = function (e, t, r) {
        var i, n, a = s.call(l, e, t),
        o = a.orientation;
        if (!0 === o && r && r.exif && (o = r.exif.get("Orientation")), !o || 8 < o || 1 === o) return a;
        for (n in i = {},
        a) a.hasOwnProperty(n) && (i[n] = a[n]);
        switch (i.orientation = o) {
        case 2:
            i.left = a.right,
            i.right = a.left;
            break;
        case 3:
            i.left = a.right,
            i.top = a.bottom,
            i.right = a.left,
            i.bottom = a.top;
            break;
        case 4:
            i.top = a.bottom,
            i.bottom = a.top;
            break;
        case 5:
            i.left = a.top,
            i.top = a.left,
            i.right = a.bottom,
            i.bottom = a.right;
            break;
        case 6:
            i.left = a.top,
            i.top = a.right,
            i.right = a.bottom,
            i.bottom = a.left;
            break;
        case 7:
            i.left = a.bottom,
            i.top = a.right,
            i.right = a.top,
            i.bottom = a.left;
            break;
        case 8:
            i.left = a.bottom,
            i.top = a.left,
            i.right = a.top,
            i.bottom = a.right
        }
        return 4 < i.orientation && (i.maxWidth = a.maxHeight, i.maxHeight = a.maxWidth, i.minWidth = a.minHeight, i.minHeight = a.minWidth, i.sourceWidth = a.sourceHeight, i.sourceHeight = a.sourceWidth),
        i
    }
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
} (function (m) {
    "use strict";
    m.ExifMap = function () {
        return this
    },
    m.ExifMap.prototype.map = {
        Orientation: 274
    },
    m.ExifMap.prototype.get = function (e) {
        return this[e] || this[this.map[e]]
    },
    m.getExifThumbnail = function (e, t, r) {
        if (r && !(t + r > e.byteLength)) return m.createObjectURL(new Blob([e.buffer.slice(t, t + r)]));
        console.log("Invalid Exif data: Invalid thumbnail data.")
    },
    m.exifTagTypes = {
        1: {
            getValue: function (e, t) {
                return e.getUint8(t)
            },
            size: 1
        },
        2: {
            getValue: function (e, t) {
                return String.fromCharCode(e.getUint8(t))
            },
            size: 1,
            ascii: !0
        },
        3: {
            getValue: function (e, t, r) {
                return e.getUint16(t, r)
            },
            size: 2
        },
        4: {
            getValue: function (e, t, r) {
                return e.getUint32(t, r)
            },
            size: 4
        },
        5: {
            getValue: function (e, t, r) {
                return e.getUint32(t, r) / e.getUint32(t + 4, r)
            },
            size: 8
        },
        9: {
            getValue: function (e, t, r) {
                return e.getInt32(t, r)
            },
            size: 4
        },
        10: {
            getValue: function (e, t, r) {
                return e.getInt32(t, r) / e.getInt32(t + 4, r)
            },
            size: 8
        }
    },
    m.exifTagTypes[7] = m.exifTagTypes[1],
    m.getExifValue = function (e, t, r, i, n, a) {
        var o, s, l, u, d, p, c = m.exifTagTypes[i];
        if (c) {
            if (! ((s = 4 < (o = c.size * n) ? t + e.getUint32(r + 8, a) : r + 8) + o > e.byteLength)) {
                if (1 === n) return c.getValue(e, s, a);
                for (l = [], u = 0; u < n; u += 1) l[u] = c.getValue(e, s + u * c.size, a);
                if (c.ascii) {
                    for (d = "", u = 0; u < l.length && "\0" !== (p = l[u]); u += 1) d += p;
                    return d
                }
                return l
            }
            console.log("Invalid Exif data: Invalid data offset.")
        } else console.log("Invalid Exif data: Invalid tag type.")
    },
    m.parseExifTag = function (e, t, r, i, n) {
        var a = e.getUint16(r, i);
        n.exif[a] = m.getExifValue(e, t, r, e.getUint16(r + 2, i), e.getUint32(r + 4, i), i)
    },
    m.parseExifTags = function (e, t, r, i, n) {
        var a, o, s;
        if (r + 6 > e.byteLength) console.log("Invalid Exif data: Invalid directory offset.");
        else {
            if (! ((o = r + 2 + 12 * (a = e.getUint16(r, i))) + 4 > e.byteLength)) {
                for (s = 0; s < a; s += 1) this.parseExifTag(e, t, r + 2 + 12 * s, i, n);
                return e.getUint32(o, i)
            }
            console.log("Invalid Exif data: Invalid directory size.")
        }
    },
    m.parseExifData = function (e, t, r, i, n) {
        if (!n.disableExif) {
            var a, o, s, l = t + 10;
            if (1165519206 === e.getUint32(t + 4)) if (l + 8 > e.byteLength) console.log("Invalid Exif data: Invalid segment size.");
            else if (0 === e.getUint16(t + 8)) {
                switch (e.getUint16(l)) {
                case 18761:
                    a = !0;
                    break;
                case 19789:
                    a = !1;
                    break;
                default:
                    return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                }
                42 === e.getUint16(l + 2, a) ? (o = e.getUint32(l + 4, a), i.exif = new m.ExifMap, (o = m.parseExifTags(e, l, l + o, a, i)) && !n.disableExifThumbnail && (s = {
                    exif: {}
                },
                o = m.parseExifTags(e, l, l + o, a, s), s.exif[513] && (i.exif.Thumbnail = m.getExifThumbnail(e, l + s.exif[513], s.exif[514]))), i.exif[34665] && !n.disableExifSub && m.parseExifTags(e, l, l + i.exif[34665], a, i), i.exif[34853] && !n.disableExifGps && m.parseExifTags(e, l, l + i.exif[34853], a, i)) : console.log("Invalid Exif data: Missing TIFF marker.")
            } else console.log("Invalid Exif data: Missing byte alignment offset.")
        }
    },
    m.metaDataParsers.jpeg[65505].push(m.parseExifData)
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-exif"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-exif")) : e(window.loadImage)
} (function (e) {
    "use strict";
    e.ExifMap.prototype.tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright",
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        42240: "Gamma",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubSecTime",
        37521: "SubSecTimeOriginal",
        37522: "SubSecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "PhotographicSensitivity",
        34856: "OECF",
        34864: "SensitivityType",
        34865: "StandardOutputSensitivity",
        34866: "RecommendedExposureIndex",
        34867: "ISOSpeed",
        34868: "ISOSpeedLatitudeyyy",
        34869: "ISOSpeedLatitudezzz",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRatio",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        42016: "ImageUniqueID",
        42032: "CameraOwnerName",
        42033: "BodySerialNumber",
        42034: "LensSpecification",
        42035: "LensMake",
        42036: "LensModel",
        42037: "LensSerialNumber",
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential",
        31: "GPSHPositioningError"
    },
    e.ExifMap.prototype.stringValues = {
        ExposureProgram: {
            0: "Undefined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Undefined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        ComponentsConfiguration: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        },
        Orientation: {
            1: "top-left",
            2: "top-right",
            3: "bottom-right",
            4: "bottom-left",
            5: "left-top",
            6: "right-top",
            7: "right-bottom",
            8: "left-bottom"
        }
    },
    e.ExifMap.prototype.getText = function (e) {
        var t = this.get(e);
        switch (e) {
        case "LightSource":
            case "Flash":
            case "MeteringMode":
            case "ExposureProgram":
            case "SensingMethod":
            case "SceneCaptureType":
            case "SceneType":
            case "CustomRendered":
            case "WhiteBalance":
            case "GainControl":
            case "Contrast":
            case "Saturation":
            case "Sharpness":
            case "SubjectDistanceRange":
            case "FileSource":
            case "Orientation":
            return this.stringValues[e][t];
        case "ExifVersion":
            case "FlashpixVersion":
            if (!t) return;
            return String.fromCharCode(t[0], t[1], t[2], t[3]);
        case "ComponentsConfiguration":
            if (!t) return;
            return this.stringValues[e][t[0]] + this.stringValues[e][t[1]] + this.stringValues[e][t[2]] + this.stringValues[e][t[3]];
        case "GPSVersionID":
            if (!t) return;
            return t[0] + "." + t[1] + "." + t[2] + "." + t[3]
        }
        return String(t)
    },
    function (e) {
        var t, r = e.tags,
        i = e.map;
        for (t in r) r.hasOwnProperty(t) && (i[r[t]] = t)
    } (e.ExifMap.prototype),
    e.ExifMap.prototype.getAll = function () {
        var e, t, r = {};
        for (e in this) this.hasOwnProperty(e) && (t = this.tags[e]) && (r[t] = this.getText(t));
        return r
    }
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
} (function (p) {
    "use strict";
    p.IptcMap = function () {
        return this
    },
    p.IptcMap.prototype.map = {
        ObjectName: 5
    },
    p.IptcMap.prototype.get = function (e) {
        return this[e] || this[this.map[e]]
    },
    p.parseIptcTags = function (e, t, r, i) {
        function n(e, t, r) {
            for (var i = "", n = t; n < t + r; n++) i += String.fromCharCode(e.getUint8(n));
            return i
        }
        for (var a, o, s, l = t; l < t + r;) 28 === e.getUint8(l) && 2 === e.getUint8(l + 1) && (s = e.getUint8(l + 2)) in i.iptc.tags && (o = e.getInt16(l + 3), a = n(e, l + 5, o), i.iptc.hasOwnProperty(s) ? i.iptc[s] instanceof Array ? i.iptc[s].push(a) : i.iptc[s] = [i.iptc[s], a] : i.iptc[s] = a),
        l++
    },
    p.parseIptcData = function (e, t, r, i, n) {
        if (!n.disableIptc) {
            for (var a, o, s = t + r; t + 8 < s;) {
                if (o = t, 943868237 === (a = e).getUint32(o) && 1028 === a.getUint16(o + 4)) {
                    var l = e.getUint8(t + 7);
                    l % 2 != 0 && (l += 1),
                    0 === l && (l = 4);
                    var u = t + 8 + l;
                    if (s < u) {
                        console.log("Invalid IPTC data: Invalid segment offset.");
                        break
                    }
                    var d = e.getUint16(t + 6 + l);
                    if (s < t + d) {
                        console.log("Invalid IPTC data: Invalid segment size.");
                        break
                    }
                    return i.iptc = new p.IptcMap,
                    p.parseIptcTags(e, u, d, i)
                }
                t++
            }
            console.log("No IPTC data at this offset - could be XMP")
        }
    },
    p.metaDataParsers.jpeg[65517].push(p.parseIptcData)
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-iptc"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-iptc")) : e(window.loadImage)
} (function (e) {
    "use strict";
    e.IptcMap.prototype.tags = {
        3: "ObjectType",
        4: "ObjectAttribute",
        5: "ObjectName",
        7: "EditStatus",
        8: "EditorialUpdate",
        10: "Urgency",
        12: "SubjectRef",
        15: "Category",
        20: "SupplCategory",
        22: "FixtureID",
        25: "Keywords",
        26: "ContentLocCode",
        27: "ContentLocName",
        30: "ReleaseDate",
        35: "ReleaseTime",
        37: "ExpirationDate",
        38: "ExpirationTime",
        40: "SpecialInstructions",
        42: "ActionAdvised",
        45: "RefService",
        47: "RefDate",
        50: "RefNumber",
        55: "DateCreated",
        60: "TimeCreated",
        62: "DigitalCreationDate",
        63: "DigitalCreationTime",
        65: "OriginatingProgram",
        70: "ProgramVersion",
        75: "ObjectCycle",
        80: "Byline",
        85: "BylineTitle",
        90: "City",
        92: "Sublocation",
        95: "State",
        100: "CountryCode",
        101: "CountryName",
        103: "OrigTransRef",
        105: "Headline",
        110: "Credit",
        115: "Source",
        116: "CopyrightNotice",
        118: "Contact",
        120: "Caption",
        122: "WriterEditor",
        130: "ImageType",
        131: "ImageOrientation",
        135: "LanguageID"
    },
    e.IptcMap.prototype.getText = function (e) {
        var t = this.get(e);
        return String(t)
    },
    function (e) {
        var t, r = e.tags,
        i = e.map || {};
        for (t in r) r.hasOwnProperty(t) && (i[r[t]] = t)
    } (e.IptcMap.prototype),
    e.IptcMap.prototype.getAll = function () {
        var e, t, r = {};
        for (e in this) this.hasOwnProperty(e) && (t = this.tags[e]) && (r[t] = this.getText(t));
        return r
    }
}),
function (e) {
    "use strict";
    var n = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype,
    d = e.Blob &&
    function () {
        try {
            return Boolean(new Blob)
        } catch(e) {
            return !1
        }
    } (),
    p = d && e.Uint8Array &&
    function () {
        try {
            return 100 === new Blob([new Uint8Array(100)]).size
        } catch(e) {
            return !1
        }
    } (),
    c = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder,
    m = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
    a = (d || c) && e.atob && e.ArrayBuffer && e.Uint8Array &&
    function (e) {
        var t, r, i, n, a, o, s, l, u;
        if (! (t = e.match(m))) throw new Error("invalid data URI");
        for (r = t[2] ? t[1] : "text/plain" + (t[3] || ";charset=US-ASCII"), i = !!t[4], n = e.slice(t[0].length), a = i ? atob(n) : decodeURIComponent(n), o = new ArrayBuffer(a.length), s = new Uint8Array(o), l = 0; l < a.length; l += 1) s[l] = a.charCodeAt(l);
        return d ? new Blob([p ? s : o], {
            type: r
        }) : ((u = new c).append(o), u.getBlob(r))
    };
    e.HTMLCanvasElement && !n.toBlob && (n.mozGetAsFile ? n.toBlob = function (e, t, r) {
        var i = this;
        setTimeout(function () {
            r && n.toDataURL && a ? e(a(i.toDataURL(t, r))) : e(i.mozGetAsFile("blob", t))
        })
    } : n.toDataURL && a && (n.toBlob = function (e, t, r) {
        var i = this;
        setTimeout(function () {
            e(a(i.toDataURL(t, r)))
        })
    })),
    "function" == typeof define && define.amd ? define(function () {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : e.dataURLtoBlob = a
} (window),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "jquery-ui/ui/widget"], e) : "object" == typeof exports ? e(require("jquery"), require("./vendor/jquery.ui.widget")) : e(window.jQuery)
} (function (g) {
    "use strict";
    function e(r) {
        var i = "dragover" === r;
        return function (e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var t = e.dataTransfer;
            t && -1 !== g.inArray("Files", t.types) && !1 !== this._trigger(r, g.Event(r, {
                delegatedEvent: e
            })) && (e.preventDefault(), i && (t.dropEffect = "copy"))
        }
    }
    g.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || g('<input type="file"/>').prop("disabled")),
    g.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader),
    g.support.xhrFormDataFileUpload = !!window.FormData,
    g.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice),
    g.widget("blueimp.fileupload", {
        options: {
            dropZone: g(document),
            pasteZone: void 0,
            fileInput: void 0,
            replaceFileInput: !0,
            paramName: void 0,
            singleFileUploads: !0,
            limitMultiFileUploads: void 0,
            limitMultiFileUploadSize: void 0,
            limitMultiFileUploadSizeOverhead: 512,
            sequentialUploads: !1,
            limitConcurrentUploads: void 0,
            forceIframeTransport: !1,
            redirect: void 0,
            redirectParamName: void 0,
            postMessage: void 0,
            multipart: !0,
            maxChunkSize: void 0,
            uploadedBytes: void 0,
            recalculateProgress: !0,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: !0,
            uniqueFilenames: void 0,
            messages: {
                uploadedBytes: "Uploaded bytes exceed file size"
            },
            i18n: function (r, e) {
                return r = this.messages[r] || r.toString(),
                e && g.each(e, function (e, t) {
                    r = r.replace("{" + e + "}", t)
                }),
                r
            },
            formData: function (e) {
                return e.serializeArray()
            },
            add: function (e, t) {
                if (e.isDefaultPrevented()) return !1;
                (t.autoUpload || !1 !== t.autoUpload && g(this).fileupload("option", "autoUpload")) && t.process().done(function () {
                    t.submit()
                })
            },
            processData: !1,
            contentType: !1,
            cache: !1,
            timeout: 0
        },
        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _blobSlice: g.support.blobSlice &&
        function () {
            return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
        },
        _BitrateTimer: function () {
            this.timestamp = Date.now ? Date.now() : (new Date).getTime(),
            this.loaded = 0,
            this.bitrate = 0,
            this.getBitrate = function (e, t, r) {
                var i = e - this.timestamp;
                return (!this.bitrate || !r || r < i) && (this.bitrate = (t - this.loaded) * (1e3 / i) * 8, this.loaded = t, this.timestamp = e),
                this.bitrate
            }
        },
        _isXHRUpload: function (e) {
            return !e.forceIframeTransport && (!e.multipart && g.support.xhrFileUpload || g.support.xhrFormDataFileUpload)
        },
        _getFormData: function (e) {
            var r;
            return "function" === g.type(e.formData) ? e.formData(e.form) : g.isArray(e.formData) ? e.formData : "object" === g.type(e.formData) ? (r = [], g.each(e.formData, function (e, t) {
                r.push({
                    name: e,
                    value: t
                })
            }), r) : []
        },
        _getTotal: function (e) {
            var r = 0;
            return g.each(e, function (e, t) {
                r += t.size || 1
            }),
            r
        },
        _initProgressObject: function (e) {
            var t = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            e._progress ? g.extend(e._progress, t) : e._progress = t
        },
        _initResponseObject: function (e) {
            var t;
            if (e._response) for (t in e._response) Object.prototype.hasOwnProperty.call(e._response, t) && delete e._response[t];
            else e._response = {}
        },
        _onProgress: function (e, t) {
            if (e.lengthComputable) {
                var r, i = Date.now ? Date.now() : (new Date).getTime();
                if (t._time && t.progressInterval && i - t._time < t.progressInterval && e.loaded !== e.total) return;
                t._time = i,
                r = Math.floor(e.loaded / e.total * (t.chunkSize || t._progress.total)) + (t.uploadedBytes || 0),
                this._progress.loaded += r - t._progress.loaded,
                this._progress.bitrate = this._bitrateTimer.getBitrate(i, this._progress.loaded, t.bitrateInterval),
                t._progress.loaded = t.loaded = r,
                t._progress.bitrate = t.bitrate = t._bitrateTimer.getBitrate(i, r, t.bitrateInterval),
                this._trigger("progress", g.Event("progress", {
                    delegatedEvent: e
                }), t),
                this._trigger("progressall", g.Event("progressall", {
                    delegatedEvent: e
                }), this._progress)
            }
        },
        _initProgressListener: function (r) {
            var i = this,
            e = r.xhr ? r.xhr() : g.ajaxSettings.xhr();
            e.upload && (g(e.upload).bind("progress", function (e) {
                var t = e.originalEvent;
                e.lengthComputable = t.lengthComputable,
                e.loaded = t.loaded,
                e.total = t.total,
                i._onProgress(e, r)
            }), r.xhr = function () {
                return e
            })
        },
        _deinitProgressListener: function (e) {
            var t = e.xhr ? e.xhr() : g.ajaxSettings.xhr();
            t.upload && g(t.upload).unbind("progress")
        },
        _isInstanceOf: function (e, t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        },
        _getUniqueFilename: function (e, t) {
            return t[e = String(e)] ? (e = e.replace(/(?: \(([\d]+)\))?(\.[^.]+)?$/, function (e, t, r) {
                return " (" + (t ? Number(t) + 1 : 1) + ")" + (r || "")
            }), this._getUniqueFilename(e, t)) : (t[e] = !0, e)
        },
        _initXHRData: function (i) {
            var n, a = this,
            e = i.files[0],
            t = i.multipart || !g.support.xhrFileUpload,
            o = "array" === g.type(i.paramName) ? i.paramName[0] : i.paramName;
            i.headers = g.extend({},
            i.headers),
            i.contentRange && (i.headers["Content-Range"] = i.contentRange),
            t && !i.blob && this._isInstanceOf("File", e) || (i.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(e.uploadName || e.name) + '"'),
            t ? g.support.xhrFormDataFileUpload && (i.postMessage ? (n = this._getFormData(i), i.blob ? n.push({
                name: o,
                value: i.blob
            }) : g.each(i.files, function (e, t) {
                n.push({
                    name: "array" === g.type(i.paramName) && i.paramName[e] || o,
                    value: t
                })
            })) : (a._isInstanceOf("FormData", i.formData) ? n = i.formData : (n = new FormData, g.each(this._getFormData(i), function (e, t) {
                n.append(t.name, t.value)
            })), i.blob ? n.append(o, i.blob, e.uploadName || e.name) : g.each(i.files, function (e, t) {
                if (a._isInstanceOf("File", t) || a._isInstanceOf("Blob", t)) {
                    var r = t.uploadName || t.name;
                    i.uniqueFilenames && (r = a._getUniqueFilename(r, i.uniqueFilenames)),
                    n.append("array" === g.type(i.paramName) && i.paramName[e] || o, t, r)
                }
            })), i.data = n) : (i.contentType = e.type || "application/octet-stream", i.data = i.blob || e),
            i.blob = null
        },
        _initIframeSettings: function (e) {
            var t = g("<a></a>").prop("href", e.url).prop("host");
            e.dataType = "iframe " + (e.dataType || ""),
            e.formData = this._getFormData(e),
            e.redirect && t && t !== location.host && e.formData.push({
                name: e.redirectParamName || "redirect",
                value: e.redirect
            })
        },
        _initDataSettings: function (e) {
            this._isXHRUpload(e) ? (this._chunkedUpload(e, !0) || (e.data || this._initXHRData(e), this._initProgressListener(e)), e.postMessage && (e.dataType = "postmessage " + (e.dataType || ""))) : this._initIframeSettings(e)
        },
        _getParamName: function (e) {
            var t = g(e.fileInput),
            i = e.paramName;
            return i ? g.isArray(i) || (i = [i]) : (i = [], t.each(function () {
                for (var e = g(this), t = e.prop("name") || "files[]", r = (e.prop("files") || [1]).length; r;) i.push(t),
                r -= 1
            }), i.length || (i = [t.prop("name") || "files[]"])),
            i
        },
        _initFormSettings: function (e) {
            e.form && e.form.length || (e.form = g(e.fileInput.prop("form")), e.form.length || (e.form = g(this.options.fileInput.prop("form")))),
            e.paramName = this._getParamName(e),
            e.url || (e.url = e.form.prop("action") || location.href),
            e.type = (e.type || "string" === g.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(),
            "POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"),
            e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"))
        },
        _getAJAXSettings: function (e) {
            var t = g.extend({},
            this.options, e);
            return this._initFormSettings(t),
            this._initDataSettings(t),
            t
        },
        _getDeferredState: function (e) {
            return e.state ? e.state() : e.isResolved() ? "resolved" : e.isRejected() ? "rejected" : "pending"
        },
        _enhancePromise: function (e) {
            return e.success = e.done,
            e.error = e.fail,
            e.complete = e.always,
            e
        },
        _getXHRPromise: function (e, t, r) {
            var i = g.Deferred(),
            n = i.promise();
            return t = t || this.options.context || n,
            !0 === e ? i.resolveWith(t, r) : !1 === e && i.rejectWith(t, r),
            n.abort = i.promise,
            this._enhancePromise(n)
        },
        _addConvenienceMethods: function (e, r) {
            var i = this,
            n = function (e) {
                return g.Deferred().resolveWith(i, e).promise()
            };
            r.process = function (e, t) {
                return (e || t) && (r._processQueue = this._processQueue = (this._processQueue || n([this])).then(function () {
                    return r.errorThrown ? g.Deferred().rejectWith(i, [r]).promise() : n(arguments)
                }).then(e, t)),
                this._processQueue || n([this])
            },
            r.submit = function () {
                return "pending" !== this.state() && (r.jqXHR = this.jqXHR = !1 !== i._trigger("submit", g.Event("submit", {
                    delegatedEvent: e
                }), this) && i._onSend(e, this)),
                this.jqXHR || i._getXHRPromise()
            },
            r.abort = function () {
                return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort", i._trigger("fail", null, this), i._getXHRPromise(!1))
            },
            r.state = function () {
                return this.jqXHR ? i._getDeferredState(this.jqXHR) : this._processQueue ? i._getDeferredState(this._processQueue) : void 0
            },
            r.processing = function () {
                return !this.jqXHR && this._processQueue && "pending" === i._getDeferredState(this._processQueue)
            },
            r.progress = function () {
                return this._progress
            },
            r.response = function () {
                return this._response
            }
        },
        _getUploadedBytes: function (e) {
            var t = e.getResponseHeader("Range"),
            r = t && t.split("-"),
            i = r && 1 < r.length && parseInt(r[1], 10);
            return i && i + 1
        },
        _chunkedUpload: function (a, e) {
            a.uploadedBytes = a.uploadedBytes || 0;
            var t, o, s = this,
            r = a.files[0],
            l = r.size,
            u = a.uploadedBytes,
            d = a.maxChunkSize || l,
            p = this._blobSlice,
            c = g.Deferred(),
            i = c.promise();
            return ! (! (this._isXHRUpload(a) && p && (u || ("function" === g.type(d) ? d(a) : d) < l)) || a.data) && ( !! e || (l <= u ? (r.error = a.i18n("uploadedBytes"), this._getXHRPromise(!1, a.context, [null, "error", r.error])) : (o = function () {
                var i = g.extend({},
                a),
                n = i._progress.loaded;
                i.blob = p.call(r, u, u + ("function" === g.type(d) ? d(i) : d), r.type),
                i.chunkSize = i.blob.size,
                i.contentRange = "bytes " + u + "-" + (u + i.chunkSize - 1) + "/" + l,
                s._trigger("chunkbeforesend", null, i),
                s._initXHRData(i),
                s._initProgressListener(i),
                t = (!1 !== s._trigger("chunksend", null, i) && g.ajax(i) || s._getXHRPromise(!1, i.context)).done(function (e, t, r) {
                    u = s._getUploadedBytes(r) || u + i.chunkSize,
                    n + i.chunkSize - i._progress.loaded && s._onProgress(g.Event("progress", {
                        lengthComputable: !0,
                        loaded: u - i.uploadedBytes,
                        total: u - i.uploadedBytes
                    }), i),
                    a.uploadedBytes = i.uploadedBytes = u,
                    i.result = e,
                    i.textStatus = t,
                    i.jqXHR = r,
                    s._trigger("chunkdone", null, i),
                    s._trigger("chunkalways", null, i),
                    u < l ? o() : c.resolveWith(i.context, [e, t, r])
                }).fail(function (e, t, r) {
                    i.jqXHR = e,
                    i.textStatus = t,
                    i.errorThrown = r,
                    s._trigger("chunkfail", null, i),
                    s._trigger("chunkalways", null, i),
                    c.rejectWith(i.context, [e, t, r])
                }).always(function () {
                    s._deinitProgressListener(i)
                })
            },
            this._enhancePromise(i), i.abort = function () {
                return t.abort()
            },
            o(), i)))
        },
        _beforeSend: function (e, t) {
            0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer, this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0),
            this._initResponseObject(t),
            this._initProgressObject(t),
            t._progress.loaded = t.loaded = t.uploadedBytes || 0,
            t._progress.total = t.total = this._getTotal(t.files) || 1,
            t._progress.bitrate = t.bitrate = 0,
            this._active += 1,
            this._progress.loaded += t.loaded,
            this._progress.total += t.total
        },
        _onDone: function (e, t, r, i) {
            var n = i._progress.total,
            a = i._response;
            i._progress.loaded < n && this._onProgress(g.Event("progress", {
                lengthComputable: !0,
                loaded: n,
                total: n
            }), i),
            a.result = i.result = e,
            a.textStatus = i.textStatus = t,
            a.jqXHR = i.jqXHR = r,
            this._trigger("done", null, i)
        },
        _onFail: function (e, t, r, i) {
            var n = i._response;
            i.recalculateProgress && (this._progress.loaded -= i._progress.loaded, this._progress.total -= i._progress.total),
            n.jqXHR = i.jqXHR = e,
            n.textStatus = i.textStatus = t,
            n.errorThrown = i.errorThrown = r,
            this._trigger("fail", null, i)
        },
        _onAlways: function (e, t, r, i) {
            this._trigger("always", null, i)
        },
        _onSend: function (e, t) {
            t.submit || this._addConvenienceMethods(e, t);
            var r, i, n, a, o = this,
            s = o._getAJAXSettings(t),
            l = function () {
                return o._sending += 1,
                s._bitrateTimer = new o._BitrateTimer,
                r = r || ((i || !1 === o._trigger("send", g.Event("send", {
                    delegatedEvent: e
                }), s)) && o._getXHRPromise(!1, s.context, i) || o._chunkedUpload(s) || g.ajax(s)).done(function (e, t, r) {
                    o._onDone(e, t, r, s)
                }).fail(function (e, t, r) {
                    o._onFail(e, t, r, s)
                }).always(function (e, t, r) {
                    if (o._deinitProgressListener(s), o._onAlways(e, t, r, s), o._sending -= 1, o._active -= 1, s.limitConcurrentUploads && s.limitConcurrentUploads > o._sending) for (var i = o._slots.shift(); i;) {
                        if ("pending" === o._getDeferredState(i)) {
                            i.resolve();
                            break
                        }
                        i = o._slots.shift()
                    }
                    0 === o._active && o._trigger("stop")
                })
            };
            return this._beforeSend(e, s),
            this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? ((a = 1 < this.options.limitConcurrentUploads ? (n = g.Deferred(), this._slots.push(n), n.then(l)) : (this._sequence = this._sequence.then(l, l), this._sequence)).abort = function () {
                return i = [void 0, "abort", "abort"],
                r ? r.abort() : (n && n.rejectWith(s.context, i), l())
            },
            this._enhancePromise(a)) : l()
        },
        _onAdd: function (i, n) {
            var a, e, o, t, s = this,
            l = !0,
            r = g.extend({},
            this.options, n),
            u = n.files,
            d = u.length,
            p = r.limitMultiFileUploads,
            c = r.limitMultiFileUploadSize,
            m = r.limitMultiFileUploadSizeOverhead,
            f = 0,
            h = this._getParamName(r),
            y = 0;
            if (!d) return !1;
            if (c && void 0 === u[0].size && (c = void 0), (r.singleFileUploads || p || c) && this._isXHRUpload(r)) if (r.singleFileUploads || c || !p) if (!r.singleFileUploads && c) for (o = [], a = [], t = 0; t < d; t += 1) f += u[t].size + m,
            (t + 1 === d || f + u[t + 1].size + m > c || p && p <= t + 1 - y) && (o.push(u.slice(y, t + 1)), (e = h.slice(y, t + 1)).length || (e = h), a.push(e), y = t + 1, f = 0);
            else a = h;
            else for (o = [], a = [], t = 0; t < d; t += p) o.push(u.slice(t, t + p)),
            (e = h.slice(t, t + p)).length || (e = h),
            a.push(e);
            else o = [u],
            a = [h];
            return n.originalFiles = u,
            g.each(o || u, function (e, t) {
                var r = g.extend({},
                n);
                return r.files = o ? t : [t],
                r.paramName = a[e],
                s._initResponseObject(r),
                s._initProgressObject(r),
                s._addConvenienceMethods(i, r),
                l = s._trigger("add", g.Event("add", {
                    delegatedEvent: i
                }), r)
            }),
            l
        },
        _replaceFileInput: function (e) {
            var r = e.fileInput,
            i = r.clone(!0),
            t = r.is(document.activeElement);
            e.fileInputClone = i,
            g("<form></form>").append(i)[0].reset(),
            r.after(i).detach(),
            t && i.focus(),
            g.cleanData(r.unbind("remove")),
            this.options.fileInput = this.options.fileInput.map(function (e, t) {
                return t === r[0] ? i[0] : t
            }),
            r[0] === this.element[0] && (this.element = i)
        },
        _handleFileTreeEntry: function (r, i) {
            var e, n = this,
            a = g.Deferred(),
            o = [],
            s = function (e) {
                e && !e.entry && (e.entry = r),
                a.resolve([e])
            },
            l = function () {
                e.readEntries(function (e) {
                    var t;
                    e.length ? (o = o.concat(e), l()) : (t = o, n._handleFileTreeEntries(t, i + r.name + "/").done(function (e) {
                        a.resolve(e)
                    }).fail(s))
                },
                s)
            };
            return i = i || "",
            r.isFile ? r._file ? (r._file.relativePath = i, a.resolve(r._file)) : r.file(function (e) {
                e.relativePath = i,
                a.resolve(e)
            },
            s) : r.isDirectory ? (e = r.createReader(), l()) : a.resolve([]),
            a.promise()
        },
        _handleFileTreeEntries: function (e, t) {
            var r = this;
            return g.when.apply(g, g.map(e, function (e) {
                return r._handleFileTreeEntry(e, t)
            })).then(function () {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function (e) {
            var t = (e = e || {}).items;
            return t && t.length && (t[0].webkitGetAsEntry || t[0].getAsEntry) ? this._handleFileTreeEntries(g.map(t, function (e) {
                var t;
                return e.webkitGetAsEntry ? ((t = e.webkitGetAsEntry()) && (t._file = e.getAsFile()), t) : e.getAsEntry()
            })) : g.Deferred().resolve(g.makeArray(e.files)).promise()
        },
        _getSingleFileInputFiles: function (e) {
            var t, r, i = (e = g(e)).prop("webkitEntries") || e.prop("entries");
            if (i && i.length) return this._handleFileTreeEntries(i);
            if ((t = g.makeArray(e.prop("files"))).length) void 0 === t[0].name && t[0].fileName && g.each(t, function (e, t) {
                t.name = t.fileName,
                t.size = t.fileSize
            });
            else {
                if (! (r = e.prop("value"))) return g.Deferred().resolve([]).promise();
                t = [{
                    name: r.replace(/^.*\\/, "")
                }]
            }
            return g.Deferred().resolve(t).promise()
        },
        _getFileInputFiles: function (e) {
            return e instanceof g && 1 !== e.length ? g.when.apply(g, g.map(e, this._getSingleFileInputFiles)).then(function () {
                return Array.prototype.concat.apply([], arguments)
            }) : this._getSingleFileInputFiles(e)
        },
        _onChange: function (t) {
            var r = this,
            i = {
                fileInput: g(t.target),
                form: g(t.target.form)
            };
            this._getFileInputFiles(i.fileInput).always(function (e) {
                i.files = e,
                r.options.replaceFileInput && r._replaceFileInput(i),
                !1 !== r._trigger("change", g.Event("change", {
                    delegatedEvent: t
                }), i) && r._onAdd(t, i)
            })
        },
        _onPaste: function (e) {
            var t = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items,
            i = {
                files: []
            };
            t && t.length && (g.each(t, function (e, t) {
                var r = t.getAsFile && t.getAsFile();
                r && i.files.push(r)
            }), !1 !== this._trigger("paste", g.Event("paste", {
                delegatedEvent: e
            }), i) && this._onAdd(e, i))
        },
        _onDrop: function (t) {
            t.dataTransfer = t.originalEvent && t.originalEvent.dataTransfer;
            var r = this,
            e = t.dataTransfer,
            i = {};
            e && e.files && e.files.length && (t.preventDefault(), this._getDroppedFiles(e).always(function (e) {
                i.files = e,
                !1 !== r._trigger("drop", g.Event("drop", {
                    delegatedEvent: t
                }), i) && r._onAdd(t, i)
            }))
        },
        _onDragOver: e("dragover"),
        _onDragEnter: e("dragenter"),
        _onDragLeave: e("dragleave"),
        _initEventHandlers: function () {
            this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                dragover: this._onDragOver,
                drop: this._onDrop,
                dragenter: this._onDragEnter,
                dragleave: this._onDragLeave
            }), this._on(this.options.pasteZone, {
                paste: this._onPaste
            })),
            g.support.fileInput && this._on(this.options.fileInput, {
                change: this._onChange
            })
        },
        _destroyEventHandlers: function () {
            this._off(this.options.dropZone, "dragenter dragleave dragover drop"),
            this._off(this.options.pasteZone, "paste"),
            this._off(this.options.fileInput, "change")
        },
        _destroy: function () {
            this._destroyEventHandlers()
        },
        _setOption: function (e, t) {
            var r = -1 !== g.inArray(e, this._specialOptions);
            r && this._destroyEventHandlers(),
            this._super(e, t),
            r && (this._initSpecialOptions(), this._initEventHandlers())
        },
        _initSpecialOptions: function () {
            var e = this.options;
            void 0 === e.fileInput ? e.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : e.fileInput instanceof g || (e.fileInput = g(e.fileInput)),
            e.dropZone instanceof g || (e.dropZone = g(e.dropZone)),
            e.pasteZone instanceof g || (e.pasteZone = g(e.pasteZone))
        },
        _getRegExp: function (e) {
            var t = e.split("/"),
            r = t.pop();
            return t.shift(),
            new RegExp(t.join("/"), r)
        },
        _isRegExpOption: function (e, t) {
            return "url" !== e && "string" === g.type(t) && /^\/.*\/[igm]{0,3}$/.test(t)
        },
        _initDataAttributes: function () {
            var n = this,
            a = this.options,
            o = this.element.data();
            g.each(this.element[0].attributes, function (e, t) {
                var r, i = t.name.toLowerCase();
                /^data-/.test(i) && (i = i.slice(5).replace(/-[a-z]/g, function (e) {
                    return e.charAt(1).toUpperCase()
                }), r = o[i], n._isRegExpOption(i, r) && (r = n._getRegExp(r)), a[i] = r)
            })
        },
        _create: function () {
            this._initDataAttributes(),
            this._initSpecialOptions(),
            this._slots = [],
            this._sequence = this._getXHRPromise(!0),
            this._sending = this._active = 0,
            this._initProgressObject(this),
            this._initEventHandlers()
        },
        active: function () {
            return this._active
        },
        progress: function () {
            return this._progress
        },
        add: function (t) {
            var r = this;
            t && !this.options.disabled && (t.fileInput && !t.files ? this._getFileInputFiles(t.fileInput).always(function (e) {
                t.files = e,
                r._onAdd(null, t)
            }) : (t.files = g.makeArray(t.files), this._onAdd(null, t)))
        },
        send: function (t) {
            if (t && !this.options.disabled) {
                if (t.fileInput && !t.files) {
                    var r, i, n = this,
                    a = g.Deferred(),
                    e = a.promise();
                    return e.abort = function () {
                        return i = !0,
                        r ? r.abort() : (a.reject(null, "abort", "abort"), e)
                    },
                    this._getFileInputFiles(t.fileInput).always(function (e) {
                        i || (e.length ? (t.files = e, (r = n._onSend(null, t)).then(function (e, t, r) {
                            a.resolve(e, t, r)
                        },
                        function (e, t, r) {
                            a.reject(e, t, r)
                        })) : a.reject())
                    }),
                    this._enhancePromise(e)
                }
                if (t.files = g.makeArray(t.files), t.files.length) return this._onSend(null, t)
            }
            return this._getXHRPromise(!1, t && t.context)
        }
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./jquery.fileupload"], e) : "object" == typeof exports ? e(require("jquery"), require("./jquery.fileupload")) : e(window.jQuery)
} (function (o) {
    "use strict";
    var i = o.blueimp.fileupload.prototype.options.add;
    o.widget("blueimp.fileupload", o.blueimp.fileupload, {
        options: {
            processQueue: [],
            add: function (e, t) {
                var r = o(this);
                t.process(function () {
                    return r.fileupload("process", t)
                }),
                i.call(this, e, t)
            }
        },
        processActions: {},
        _processFile: function (e, i) {
            var n = this,
            a = o.Deferred().resolveWith(n, [e]).promise();
            return this._trigger("process", null, e),
            o.each(e.processQueue, function (e, t) {
                var r = function (e) {
                    return i.errorThrown ? o.Deferred().rejectWith(n, [i]).promise() : n.processActions[t.action].call(n, e, t)
                };
                a = a.then(r, t.always && r)
            }),
            a.done(function () {
                n._trigger("processdone", null, e),
                n._trigger("processalways", null, e)
            }).fail(function () {
                n._trigger("processfail", null, e),
                n._trigger("processalways", null, e)
            }),
            a
        },
        _transformProcessQueue: function (n) {
            var t = [];
            o.each(n.processQueue, function () {
                var r = {},
                e = this.action,
                i = !0 === this.prefix ? e : this.prefix;
                o.each(this, function (e, t) {
                    "string" === o.type(t) && "@" === t.charAt(0) ? r[e] = n[t.slice(1) || (i ? i + e.charAt(0).toUpperCase() + e.slice(1) : e)] : r[e] = t
                }),
                t.push(r)
            }),
            n.processQueue = t
        },
        processing: function () {
            return this._processing
        },
        process: function (i) {
            var n = this,
            a = o.extend({},
            this.options, i);
            return a.processQueue && a.processQueue.length && (this._transformProcessQueue(a), 0 === this._processing && this._trigger("processstart"), o.each(i.files, function (e) {
                var t = e ? o.extend({},
                a) : a,
                r = function () {
                    return i.errorThrown ? o.Deferred().rejectWith(n, [i]).promise() : n._processFile(t, i)
                };
                t.index = e,
                n._processing += 1,
                n._processingQueue = n._processingQueue.then(r, r).always(function () {
                    n._processing -= 1,
                    0 === n._processing && n._trigger("processstop")
                })
            })),
            this._processingQueue
        },
        _create: function () {
            this._super(),
            this._processing = 0,
            this._processingQueue = o.Deferred().resolveWith(this).promise()
        }
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "load-image", "load-image-meta", "load-image-scale", "load-image-exif", "canvas-to-blob", "./jquery.fileupload-process"], e) : "object" == typeof exports ? e(require("jquery"), require("blueimp-load-image/js/load-image"), require("blueimp-load-image/js/load-image-meta"), require("blueimp-load-image/js/load-image-scale"), require("blueimp-load-image/js/load-image-exif"), require("blueimp-canvas-to-blob"), require("./jquery.fileupload-process")) : e(window.jQuery, window.loadImage)
} (function (s, l) {
    "use strict";
    s.blueimp.fileupload.prototype.options.processQueue.unshift({
        action: "loadImageMetaData",
        disableImageHead: "@",
        disableExif: "@",
        disableExifThumbnail: "@",
        disableExifSub: "@",
        disableExifGps: "@",
        disabled: "@disableImageMetaDataLoad"
    },
    {
        action: "loadImage",
        prefix: !0,
        fileTypes: "@",
        maxFileSize: "@",
        noRevoke: "@",
        disabled: "@disableImageLoad"
    },
    {
        action: "resizeImage",
        prefix: "image",
        maxWidth: "@",
        maxHeight: "@",
        minWidth: "@",
        minHeight: "@",
        crop: "@",
        orientation: "@",
        forceResize: "@",
        disabled: "@disableImageResize"
    },
    {
        action: "saveImage",
        quality: "@imageQuality",
        type: "@imageType",
        disabled: "@disableImageResize"
    },
    {
        action: "saveImageMetaData",
        disabled: "@disableImageMetaDataSave"
    },
    {
        action: "resizeImage",
        prefix: "preview",
        maxWidth: "@",
        maxHeight: "@",
        minWidth: "@",
        minHeight: "@",
        crop: "@",
        orientation: "@",
        thumbnail: "@",
        canvas: "@",
        disabled: "@disableImagePreview"
    },
    {
        action: "setImage",
        name: "@imagePreviewName",
        disabled: "@disableImagePreview"
    },
    {
        action: "deleteImageReferences",
        disabled: "@disableImageReferencesDeletion"
    }),
    s.widget("blueimp.fileupload", s.blueimp.fileupload, {
        options: {
            loadImageFileTypes: /^image\/(gif|jpeg|png|svg\+xml)$/,
            loadImageMaxFileSize: 1e7,
            imageMaxWidth: 1920,
            imageMaxHeight: 1080,
            imageOrientation: !1,
            imageCrop: !1,
            disableImageResize: !0,
            previewMaxWidth: 80,
            previewMaxHeight: 80,
            previewOrientation: !0,
            previewThumbnail: !0,
            previewCrop: !1,
            previewCanvas: !0
        },
        processActions: {
            loadImage: function (t, e) {
                if (e.disabled) return t;
                var r = this,
                i = t.files[t.index],
                n = s.Deferred();
                return "number" === s.type(e.maxFileSize) && i.size > e.maxFileSize || e.fileTypes && !e.fileTypes.test(i.type) || !l(i, function (e) {
                    e.src && (t.img = e),
                    n.resolveWith(r, [t])
                },
                e) ? t : n.promise()
            },
            resizeImage: function (t, r) {
                if (r.disabled || !t.canvas && !t.img) return t;
                r = s.extend({
                    canvas: !0
                },
                r);
                var e, i = this,
                n = s.Deferred(),
                a = r.canvas && t.canvas || t.img,
                o = function (e) {
                    e && (e.width !== a.width || e.height !== a.height || r.forceResize) && (t[e.getContext ? "canvas" : "img"] = e),
                    t.preview = e,
                    n.resolveWith(i, [t])
                };
                if (t.exif) {
                    if (!0 === r.orientation && (r.orientation = t.exif.get("Orientation")), r.thumbnail && (e = t.exif.get("Thumbnail"))) return l(e, o, r),
                    n.promise();
                    t.orientation ? delete r.orientation : t.orientation = r.orientation
                }
                return a ? (o(l.scale(a, r)), n.promise()) : t
            },
            saveImage: function (t, e) {
                if (!t.canvas || e.disabled) return t;
                var r = this,
                i = t.files[t.index],
                n = s.Deferred();
                return t.canvas.toBlob ? (t.canvas.toBlob(function (e) {
                    e.name || (i.type === e.type ? e.name = i.name : i.name && (e.name = i.name.replace(/\.\w+$/, "." + e.type.substr(6)))),
                    i.type !== e.type && delete t.imageHead,
                    t.files[t.index] = e,
                    n.resolveWith(r, [t])
                },
                e.type || i.type, e.quality), n.promise()) : t
            },
            loadImageMetaData: function (t, e) {
                if (e.disabled) return t;
                var r = this,
                i = s.Deferred();
                return l.parseMetaData(t.files[t.index], function (e) {
                    s.extend(t, e),
                    i.resolveWith(r, [t])
                },
                e),
                i.promise()
            },
            saveImageMetaData: function (e, t) {
                if (! (e.imageHead && e.canvas && e.canvas.toBlob) || t.disabled) return e;
                var r = e.files[e.index],
                i = new Blob([e.imageHead, this._blobSlice.call(r, 20)], {
                    type: r.type
                });
                return i.name = r.name,
                e.files[e.index] = i,
                e
            },
            setImage: function (e, t) {
                return e.preview && !t.disabled && (e.files[e.index][t.name || "preview"] = e.preview),
                e
            },
            deleteImageReferences: function (e, t) {
                return t.disabled || (delete e.img, delete e.canvas, delete e.preview, delete e.imageHead),
                e
            }
        }
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "load-image", "./jquery.fileupload-process"], e) : "object" == typeof exports ? e(require("jquery"), require("blueimp-load-image/js/load-image"), require("./jquery.fileupload-process")) : e(window.jQuery, window.loadImage)
} (function (a, o) {
    "use strict";
    a.blueimp.fileupload.prototype.options.processQueue.unshift({
        action: "loadAudio",
        prefix: !0,
        fileTypes: "@",
        maxFileSize: "@",
        disabled: "@disableAudioPreview"
    },
    {
        action: "setAudio",
        name: "@audioPreviewName",
        disabled: "@disableAudioPreview"
    }),
    a.widget("blueimp.fileupload", a.blueimp.fileupload, {
        options: {
            loadAudioFileTypes: /^audio\/.*$/
        },
        _audioElement: document.createElement("audio"),
        processActions: {
            loadAudio: function (e, t) {
                if (t.disabled) return e;
                var r, i, n = e.files[e.index];
                return this._audioElement.canPlayType && this._audioElement.canPlayType(n.type) && ("number" !== a.type(t.maxFileSize) || n.size <= t.maxFileSize) && (!t.fileTypes || t.fileTypes.test(n.type)) && (r = o.createObjectURL(n)) && ((i = this._audioElement.cloneNode(!1)).src = r, i.controls = !0, e.audio = i),
                e
            },
            setAudio: function (e, t) {
                return e.audio && !t.disabled && (e.files[e.index][t.name || "preview"] = e.audio),
                e
            }
        }
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "load-image", "./jquery.fileupload-process"], e) : "object" == typeof exports ? e(require("jquery"), require("blueimp-load-image/js/load-image"), require("./jquery.fileupload-process")) : e(window.jQuery, window.loadImage)
} (function (a, o) {
    "use strict";
    a.blueimp.fileupload.prototype.options.processQueue.unshift({
        action: "loadVideo",
        prefix: !0,
        fileTypes: "@",
        maxFileSize: "@",
        disabled: "@disableVideoPreview"
    },
    {
        action: "setVideo",
        name: "@videoPreviewName",
        disabled: "@disableVideoPreview"
    }),
    a.widget("blueimp.fileupload", a.blueimp.fileupload, {
        options: {
            loadVideoFileTypes: /^video\/.*$/
        },
        _videoElement: document.createElement("video"),
        processActions: {
            loadVideo: function (e, t) {
                if (t.disabled) return e;
                var r, i, n = e.files[e.index];
                return this._videoElement.canPlayType && this._videoElement.canPlayType(n.type) && ("number" !== a.type(t.maxFileSize) || n.size <= t.maxFileSize) && (!t.fileTypes || t.fileTypes.test(n.type)) && (r = o.createObjectURL(n)) && ((i = this._videoElement.cloneNode(!1)).src = r, i.controls = !0, e.video = i),
                e
            },
            setVideo: function (e, t) {
                return e.video && !t.disabled && (e.files[e.index][t.name || "preview"] = e.video),
                e
            }
        }
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "./jquery.fileupload-process"], e) : "object" == typeof exports ? e(require("jquery"), require("./jquery.fileupload-process")) : e(window.jQuery)
} (function (o) {
    "use strict";
    o.blueimp.fileupload.prototype.options.processQueue.push({
        action: "validate",
        always: !0,
        acceptFileTypes: "@",
        maxFileSize: "@",
        minFileSize: "@",
        maxNumberOfFiles: "@",
        disabled: "@disableValidation"
    }),
    o.widget("blueimp.fileupload", o.blueimp.fileupload, {
        options: {
            getNumberOfFiles: o.noop,
            messages: {
                maxNumberOfFiles: "Maximum number of files exceeded",
                acceptFileTypes: "File type not allowed",
                maxFileSize: "File is too large",
                minFileSize: "File is too small"
            }
        },
        processActions: {
            validate: function (e, t) {
                if (t.disabled) return e;
                var r, i = o.Deferred(),
                n = this.options,
                a = e.files[e.index];
                return (t.minFileSize || t.maxFileSize) && (r = a.size),
                "number" === o.type(t.maxNumberOfFiles) && (n.getNumberOfFiles() || 0) + e.files.length > t.maxNumberOfFiles ? a.error = n.i18n("maxNumberOfFiles") : !t.acceptFileTypes || t.acceptFileTypes.test(a.type) || t.acceptFileTypes.test(a.name) ? r > t.maxFileSize ? a.error = n.i18n("maxFileSize") : "number" === o.type(r) && r < t.minFileSize ? a.error = n.i18n("minFileSize") : delete a.error : a.error = n.i18n("acceptFileTypes"),
                a.error || e.files.error ? (e.files.error = !0, i.rejectWith(this, [e])) : i.resolveWith(this, [e]),
                i.promise()
            }
        }
    })
}),
function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "blueimp-tmpl", "./jquery.fileupload-image", "./jquery.fileupload-audio", "./jquery.fileupload-video", "./jquery.fileupload-validate"], e) : "object" == typeof exports ? e(require("jquery"), require("blueimp-tmpl"), require("./jquery.fileupload-image"), require("./jquery.fileupload-audio"), require("./jquery.fileupload-video"), require("./jquery.fileupload-validate")) : e(window.jQuery, window.tmpl)
} (function (l, t) {
    "use strict";
    l.blueimp.fileupload.prototype._specialOptions.push("filesContainer", "uploadTemplateId", "downloadTemplateId"),
    l.widget("blueimp.fileupload", l.blueimp.fileupload, {
        options: {
            autoUpload: !1,
            uploadTemplateId: "template-upload",
            downloadTemplateId: "template-download",
            filesContainer: void 0,
            prependFiles: !1,
            dataType: "json",
            messages: {
                unknownError: "Unknown error"
            },
            getNumberOfFiles: function () {
                return this.filesContainer.children().not(".processing").length
            },
            getFilesFromResponse: function (e) {
                return e.result && l.isArray(e.result.files) ? e.result.files : []
            },
            add: function (e, r) {
                if (e.isDefaultPrevented()) return !1;
                var t = l(this),
                i = t.data("blueimp-fileupload") || t.data("fileupload"),
                n = i.options;
                r.context = i._renderUpload(r.files).data("data", r).addClass("processing"),
                n.filesContainer[n.prependFiles ? "prepend" : "append"](r.context),
                i._forceReflow(r.context),
                i._transition(r.context),
                r.process(function () {
                    return t.fileupload("process", r)
                }).always(function () {
                    r.context.each(function (e) {
                        l(this).find(".size").text(i._formatFileSize(r.files[e].size))
                    }).removeClass("processing"),
                    i._renderPreviews(r)
                }).done(function () {
                    r.context.find(".start").prop("disabled", !1),
                    !1 !== i._trigger("added", e, r) && (n.autoUpload || r.autoUpload) && !1 !== r.autoUpload && r.submit()
                }).fail(function () {
                    r.files.error && r.context.each(function (e) {
                        var t = r.files[e].error;
                        t && l(this).find(".error").text(t)
                    })
                })
            },
            send: function (e, t) {
                if (e.isDefaultPrevented()) return !1;
                var r = l(this).data("blueimp-fileupload") || l(this).data("fileupload");
                return t.context && t.dataType && "iframe" === t.dataType.substr(0, 6) && t.context.find(".progress").addClass(!l.support.transition && "progress-animated").attr("aria-valuenow", 100).children().first().css("width", "100%"),
                r._trigger("sent", e, t)
            },
            done: function (r, i) {
                if (r.isDefaultPrevented()) return !1;
                var n, a, o = l(this).data("blueimp-fileupload") || l(this).data("fileupload"),
                s = (i.getFilesFromResponse || o.options.getFilesFromResponse)(i);
                i.context ? i.context.each(function (e) {
                    var t = s[e] || {
                        error: "Empty file upload result"
                    };
                    a = o._addFinishedDeferreds(),
                    o._transition(l(this)).done(function () {
                        var e = l(this);
                        n = o._renderDownload([t]).replaceAll(e),
                        o._forceReflow(n),
                        o._transition(n).done(function () {
                            i.context = l(this),
                            o._trigger("completed", r, i),
                            o._trigger("finished", r, i),
                            a.resolve()
                        })
                    })
                }) : (n = o._renderDownload(s)[o.options.prependFiles ? "prependTo" : "appendTo"](o.options.filesContainer), o._forceReflow(n), a = o._addFinishedDeferreds(), o._transition(n).done(function () {
                    i.context = l(this),
                    o._trigger("completed", r, i),
                    o._trigger("finished", r, i),
                    a.resolve()
                }))
            },
            fail: function (r, i) {
                if (r.isDefaultPrevented()) return !1;
                var n, a, o = l(this).data("blueimp-fileupload") || l(this).data("fileupload");
                i.context ? i.context.each(function (e) {
                    if ("abort" !== i.errorThrown) {
                        var t = i.files[e];
                        t.error = t.error || i.errorThrown || i.i18n("unknownError"),
                        a = o._addFinishedDeferreds(),
                        o._transition(l(this)).done(function () {
                            var e = l(this);
                            n = o._renderDownload([t]).replaceAll(e),
                            o._forceReflow(n),
                            o._transition(n).done(function () {
                                i.context = l(this),
                                o._trigger("failed", r, i),
                                o._trigger("finished", r, i),
                                a.resolve()
                            })
                        })
                    } else a = o._addFinishedDeferreds(),
                    o._transition(l(this)).done(function () {
                        l(this).remove(),
                        o._trigger("failed", r, i),
                        o._trigger("finished", r, i),
                        a.resolve()
                    })
                }) : "abort" !== i.errorThrown ? (i.context = o._renderUpload(i.files)[o.options.prependFiles ? "prependTo" : "appendTo"](o.options.filesContainer).data("data", i), o._forceReflow(i.context), a = o._addFinishedDeferreds(), o._transition(i.context).done(function () {
                    i.context = l(this),
                    o._trigger("failed", r, i),
                    o._trigger("finished", r, i),
                    a.resolve()
                })) : (o._trigger("failed", r, i), o._trigger("finished", r, i), o._addFinishedDeferreds().resolve())
            },
            progress: function (e, t) {
                if (e.isDefaultPrevented()) return !1;
                var r = Math.floor(t.loaded / t.total * 100);
                t.context && t.context.each(function () {
                    l(this).find(".progress").attr("aria-valuenow", r).children().first().css("width", r + "%")
                })
            },
            progressall: function (e, t) {
                if (e.isDefaultPrevented()) return !1;
                var r = l(this),
                i = Math.floor(t.loaded / t.total * 100),
                n = r.find(".fileupload-progress"),
                a = n.find(".progress-extended");
                a.length && a.html((r.data("blueimp-fileupload") || r.data("fileupload"))._renderExtendedProgress(t)),
                n.find(".progress").attr("aria-valuenow", i).children().first().css("width", i + "%")
            },
            start: function (e) {
                if (e.isDefaultPrevented()) return !1;
                var t = l(this).data("blueimp-fileupload") || l(this).data("fileupload");
                t._resetFinishedDeferreds(),
                t._transition(l(this).find(".fileupload-progress")).done(function () {
                    t._trigger("started", e)
                })
            },
            stop: function (e) {
                if (e.isDefaultPrevented()) return !1;
                var t = l(this).data("blueimp-fileupload") || l(this).data("fileupload"),
                r = t._addFinishedDeferreds();
                l.when.apply(l, t._getFinishedDeferreds()).done(function () {
                    t._trigger("stopped", e)
                }),
                t._transition(l(this).find(".fileupload-progress")).done(function () {
                    l(this).find(".progress").attr("aria-valuenow", "0").children().first().css("width", "0%"),
                    l(this).find(".progress-extended").html("&nbsp;"),
                    r.resolve()
                })
            },
            processstart: function (e) {
                if (e.isDefaultPrevented()) return !1;
                l(this).addClass("fileupload-processing")
            },
            processstop: function (e) {
                if (e.isDefaultPrevented()) return !1;
                l(this).removeClass("fileupload-processing")
            },
            destroy: function (e, t) {
                if (e.isDefaultPrevented()) return !1;
                var r = l(this).data("blueimp-fileupload") || l(this).data("fileupload"),
                i = function () {
                    r._transition(t.context).done(function () {
                        l(this).remove(),
                        r._trigger("destroyed", e, t)
                    })
                };
                t.url ? (t.dataType = t.dataType || r.options.dataType, l.ajax(t).done(i).fail(function () {
                    r._trigger("destroyfailed", e, t)
                })) : i()
            }
        },
        _resetFinishedDeferreds: function () {
            this._finishedUploads = []
        },
        _addFinishedDeferreds: function (e) {
            var t = e || l.Deferred();
            return this._finishedUploads.push(t),
            t
        },
        _getFinishedDeferreds: function () {
            return this._finishedUploads
        },
        _enableDragToDesktop: function () {
            var e = l(this),
            t = e.prop("href"),
            r = e.prop("download"),
            i = "application/octet-stream";
            e.bind("dragstart", function (e) {
                try {
                    e.originalEvent.dataTransfer.setData("DownloadURL", [i, r, t].join(":"))
                } catch(e) {}
            })
        },
        _formatFileSize: function (e) {
            return "number" != typeof e ? "" : 1e9 <= e ? (e / 1e9).toFixed(2) + " GB" : 1e6 <= e ? (e / 1e6).toFixed(2) + " MB" : (e / 1e3).toFixed(2) + " KB"
        },
        _formatBitrate: function (e) {
            return "number" != typeof e ? "" : 1e9 <= e ? (e / 1e9).toFixed(2) + " Gbit/s" : 1e6 <= e ? (e / 1e6).toFixed(2) + " Mbit/s" : 1e3 <= e ? (e / 1e3).toFixed(2) + " kbit/s" : e.toFixed(2) + " bit/s"
        },
        _formatTime: function (e) {
            var t = new Date(1e3 * e),
            r = Math.floor(e / 86400);
            return (r = r ? r + "d " : "") + ("0" + t.getUTCHours()).slice(-2) + ":" + ("0" + t.getUTCMinutes()).slice(-2) + ":" + ("0" + t.getUTCSeconds()).slice(-2)
        },
        _formatPercentage: function (e) {
            return (100 * e).toFixed(2) + " %"
        },
        _renderExtendedProgress: function (e) {
            return this._formatBitrate(e.bitrate) + " | " + this._formatTime(8 * (e.total - e.loaded) / e.bitrate) + " | " + this._formatPercentage(e.loaded / e.total) + " | " + this._formatFileSize(e.loaded) + " / " + this._formatFileSize(e.total)
        },
        _renderTemplate: function (e, t) {
            if (!e) return l();
            var r = e({
                files: t,
                formatFileSize: this._formatFileSize,
                options: this.options
            });
            return r instanceof l ? r : l(this.options.templatesContainer).html(r).children()
        },
        _renderPreviews: function (r) {
            r.context.find(".preview").each(function (e, t) {
                l(t).append(r.files[e].preview)
            })
        },
        _renderUpload: function (e) {
            return this._renderTemplate(this.options.uploadTemplate, e)
        },
        _renderDownload: function (e) {
            return this._renderTemplate(this.options.downloadTemplate, e).find("a[download]").each(this._enableDragToDesktop).end()
        },
        _startHandler: function (e) {
            e.preventDefault();
            var t = l(e.currentTarget),
            r = t.closest(".template-upload").data("data");
            t.prop("disabled", !0),
            r && r.submit && r.submit()
        },
        _cancelHandler: function (e) {
            e.preventDefault();
            var t = l(e.currentTarget).closest(".template-upload,.template-download"),
            r = t.data("data") || {};
            r.context = r.context || t,
            r.abort ? r.abort() : (r.errorThrown = "abort", this._trigger("fail", e, r))
        },
        _deleteHandler: function (e) {
            e.preventDefault();
            var t = l(e.currentTarget);
            this._trigger("destroy", e, l.extend({
                context: t.closest(".template-download"),
                type: "DELETE"
            },
            t.data()))
        },
        _forceReflow: function (e) {
            return l.support.transition && e.length && e[0].offsetWidth
        },
        _transition: function (t) {
            var r = l.Deferred();
            return l.support.transition && t.hasClass("fade") && t.is(":visible") ? t.bind(l.support.transition.end, function (e) {
                e.target === t[0] && (t.unbind(l.support.transition.end), r.resolveWith(t))
            }).toggleClass("in") : (t.toggleClass("in"), r.resolveWith(t)),
            r
        },
        _initButtonBarEventHandlers: function () {
            var t = this.element.find(".fileupload-buttonbar"),
            r = this.options.filesContainer;
            this._on(t.find(".start"), {
                click: function (e) {
                    e.preventDefault(),
                    r.find(".start").click()
                }
            }),
            this._on(t.find(".cancel"), {
                click: function (e) {
                    e.preventDefault(),
                    r.find(".cancel").click()
                }
            }),
            this._on(t.find(".delete"), {
                click: function (e) {
                    e.preventDefault(),
                    r.find(".toggle:checked").closest(".template-download").find(".delete").click(),
                    t.find(".toggle").prop("checked", !1)
                }
            }),
            this._on(t.find(".toggle"), {
                change: function (e) {
                    r.find(".toggle").prop("checked", l(e.currentTarget).is(":checked"))
                }
            })
        },
        _destroyButtonBarEventHandlers: function () {
            this._off(this.element.find(".fileupload-buttonbar").find(".start, .cancel, .delete"), "click"),
            this._off(this.element.find(".fileupload-buttonbar .toggle"), "change.")
        },
        _initEventHandlers: function () {
            this._super(),
            this._on(this.options.filesContainer, {
                "click .start": this._startHandler,
                "click .cancel": this._cancelHandler,
                "click .delete": this._deleteHandler
            }),
            this._initButtonBarEventHandlers()
        },
        _destroyEventHandlers: function () {
            this._destroyButtonBarEventHandlers(),
            this._off(this.options.filesContainer, "click"),
            this._super()
        },
        _enableFileInputButton: function () {
            this.element.find(".fileinput-button input").prop("disabled", !1).parent().removeClass("disabled")
        },
        _disableFileInputButton: function () {
            this.element.find(".fileinput-button input").prop("disabled", !0).parent().addClass("disabled")
        },
        _initTemplates: function () {
            var e = this.options;
            e.templatesContainer = this.document[0].createElement(e.filesContainer.prop("nodeName")),
            t && (e.uploadTemplateId && (e.uploadTemplate = t(e.uploadTemplateId)), e.downloadTemplateId && (e.downloadTemplate = t(e.downloadTemplateId)))
        },
        _initFilesContainer: function () {
            var e = this.options;
            void 0 === e.filesContainer ? e.filesContainer = this.element.find(".files") : e.filesContainer instanceof l || (e.filesContainer = l(e.filesContainer))
        },
        _initSpecialOptions: function () {
            this._super(),
            this._initFilesContainer(),
            this._initTemplates()
        },
        _create: function () {
            this._super(),
            this._resetFinishedDeferreds(),
            l.support.fileInput || this._disableFileInputButton()
        },
        enable: function () {
            var e = !1;
            this.options.disabled && (e = !0),
            this._super(),
            e && (this.element.find("input, button").prop("disabled", !1), this._enableFileInputButton())
        },
        disable: function () {
            this.options.disabled || (this.element.find("input, button").prop("disabled", !0), this._disableFileInputButton()),
            this._super()
        }
    })
});