/*! DataTables 1.10.0-dev
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */ (function (R, S, n) {
    var ea = function (g) {
        function T(a) {
            var b, c, d = {};
            g.each(a, function (e) {
                if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== "a aa ao as b fn i m o s ".indexOf(b[1] + " ")) c = e
                    .replace(b[0], b[2].toLowerCase()), d[c] = e, "o" === b[1] && T(a[e])
            });
            a._hungarianMap = d
        }
        function J(a, b, c) {
            a._hungarianMap || T(a);
            var d;
            g.each(b, function (e) {
                d = a._hungarianMap[e];
                if (d !== n && (c || b[d] === n)) b[d] = b[e], "o" === d.charAt(0) && J(a[d], b[e])
            })
        }
        function za(a) {
            var b = o.defaults.oLanguage,
                c = a.sZeroRecords;
            !a.sEmptyTable && (c && "No data available in table" ===
                b.sEmptyTable) && C(a, a, "sZeroRecords", "sEmptyTable");
            !a.sLoadingRecords && (c && "Loading..." === b.sLoadingRecords) && C(a, a, "sZeroRecords",
                "sLoadingRecords")
        }
        function ea(a) {
            A(a, "ordering", "bSort");
            A(a, "orderMulti", "bSortMulti");
            A(a, "orderClasses", "bSortClasses");
            A(a, "orderCellsTop", "bSortCellsTop");
            A(a, "order", "aaSorting");
            A(a, "orderFixed", "aaSortingFixed");
            A(a, "paging", "bPaginate");
            A(a, "pagingType", "sPaginationType");
            A(a, "pageLength", "iDisplayLength");
            A(a, "searching", "bFilter")
        }
        function Ya(a) {
            A(a, "orderable",
                "bSortable");
            A(a, "orderData", "aDataSort");
            A(a, "orderSequence", "asSorting");
            A(a, "orderDataType", "sortDataType")
        }
        function Za(a) {
            var a = a.oBrowser,
                b = g("<div/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: 1,
                    width: 1,
                    overflow: "hidden"
                }).append(g("<div/>").css({
                    position: "absolute",
                    top: 1,
                    left: 1,
                    width: 100,
                    overflow: "scroll"
                }).append(g('<div class="test"/>').css({
                    width: "100%",
                    height: 10
                }))).appendTo("body"),
                c = b.find(".test");
            a.bScrollOversize = 100 === c[0].offsetWidth;
            a.bScrollbarLeft = 1 !== c.offset().left;
            b.remove()
        }

        function Aa(a, b) {
            var c = o.defaults.column,
                d = a.aoColumns.length,
                c = g.extend({}, o.models.oColumn, c, {
                    sSortingClass: a.oClasses.sSortable,
                    sSortingClassJUI: a.oClasses.sSortJUI,
                    nTh: b ? b : S.createElement("th"),
                    sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
                    aDataSort: c.aDataSort ? c.aDataSort : [d],
                    mData: c.mData ? c.mData : d
                });
            a.aoColumns.push(c);
            if (a.aoPreSearchCols[d] === n || null === a.aoPreSearchCols[d]) a.aoPreSearchCols[d] = g.extend(!0, {}, o.models
                .oSearch);
            else if (c = a.aoPreSearchCols[d], c.bRegex === n && (c.bRegex = !0), c.bSmart ===
            n && (c.bSmart = !0), c.bCaseInsensitive === n) c.bCaseInsensitive = !0;
            fa(a, d, null)
        }
        function fa(a, b, c) {
            var d = a.aoColumns[b],
                b = a.oClasses;
            if (!d.sWidthOrig) {
                var e = g(d.nTh);
                d.sWidthOrig = e.attr("width") || null;
                if (e = (e.attr("style") || "").match(/width:\s*(\d+[pxem%])/)) d.sWidthOrig = e[1]
            }
            c !== n && null !== c && (Ya(c), J(o.defaults.column, c), c.mDataProp !== n && !c.mData && (c.mData = c.mDataProp),
                d._sManualType = c.sType, c.className && !c.sClass && (c.sClass = c.className), g.extend(d, c), C(d, c,
                "sWidth", "sWidthOrig"), "number" === typeof c.iDataSort &&
            (d.aDataSort = [c.iDataSort]), C(d, c, "aDataSort"));
            var c = d.mData,
                f = U(c),
                i = d.mRender ? U(d.mRender) : null,
                e = function (a) {
                    return "string" === typeof a && -1 !== a.indexOf("@")
                };
            d._bAttrSrc = g.isPlainObject(c) && (e(c.sort) || e(c.type) || e(c.filter));
            d.fnGetData = function (a, b) {
                var c = f(a, b);
                return d.mRender && b && "" !== b ? i(c, b, a) : c
            };
            d.fnSetData = Ba(c);
            a.oFeatures.bSort || (d.bSortable = !1);
            a = -1 !== g.inArray("asc", d.asSorting);
            c = -1 !== g.inArray("desc", d.asSorting);
            !d.bSortable || !a && !c ? (d.sSortingClass = b.sSortableNone, d.sSortingClassJUI =
                "") : a && !c ? (d.sSortingClass = b.sSortableAsc, d.sSortingClassJUI = b.sSortJUIAscAllowed) : !a && c &&
                (d.sSortingClass = b.sSortableDesc, d.sSortingClassJUI = b.sSortJUIDescAllowed)
        }
        function V(a) {
            if (!1 !== a.oFeatures.bAutoWidth) {
                var b = a.aoColumns;
                Ca(a);
                for (var c = 0, d = b.length; c < d; c++) b[c].nTh.style.width = b[c].sWidth
            }
            b = a.oScroll;
            ("" !== b.sY || "" !== b.sX) && W(a);
            u(a, null, "column-sizing", [a])
        }
        function ga(a, b) {
            var c = N(a, "bVisible");
            return "number" === typeof c[b] ? c[b] : null
        }
        function X(a, b) {
            var c = N(a, "bVisible"),
                c = g.inArray(b, c);
            return -1 !== c ? c : null
        }
        function Y(a) {
            return N(a, "bVisible").length
        }
        function N(a, b) {
            var c = [];
            g.map(a.aoColumns, function (a, e) {
                a[b] && c.push(e)
            });
            return c
        }
        function Da(a) {
            var b = a.aoColumns,
                c = a.aoData,
                d = o.ext.type.detect,
                e, f, i, j, h, g, l, r, p;
            e = 0;
            for (f = b.length; e < f; e++) if (l = b[e], p = [], !l.sType && l._sManualType) l.sType = l._sManualType;
            else if (!l.sType) {
                i = 0;
                for (j = d.length; i < j; i++) {
                    h = 0;
                    for (g = c.length; h < g && !(p[h] === n && (p[h] = x(a, h, e, "type")), r = d[i](p[h]), !r ||
                    "html" === r); h++);
                    if (r) {
                        l.sType = r;
                        break
                    }
                }
                l.sType || (l.sType = "string")
            }
        }

        function $a(a, b, c, d) {
            var e, f, i, j, h, k;
            if (b) for (e = b.length - 1; 0 <= e; e--) {
                k = b[e];
                var l = k.targets !== n ? k.targets : k.aTargets;
                g.isArray(l) || (l = [l]);
                f = 0;
                for (i = l.length; f < i; f++) if ("number" === typeof l[f] && 0 <= l[f]) {
                    for (; a.aoColumns.length <= l[f];) Aa(a);
                    d(l[f], k)
                } else if ("number" === typeof l[f] && 0 > l[f]) d(a.aoColumns.length + l[f], k);
                else if ("string" === typeof l[f]) {
                    j = 0;
                    for (h = a.aoColumns.length; j < h; j++)("_all" == l[f] || g(a.aoColumns[j].nTh).hasClass(l[f])) &&
                    d(j, k)
                }
            }
            if (c) {
                e = 0;
                for (a = c.length; e < a; e++) d(e, c[e])
            }
        }
        function I(a,
                   b, c, d) {
            var e = a.aoData.length,
                f = g.extend(!0, {}, o.models.oRow, {
                    src: c ? "dom" : "data"
                });
            f._aData = b;
            a.aoData.push(f);
            for (var b = a.aoColumns, f = 0, i = b.length; f < i; f++) c && Ea(a, e, f, x(a, e, f)), b[f].sType = null;
            a.aiDisplayMaster.push(e);
            a.oFeatures.bDeferRender || Fa(a, e, c, d);
            return e
        }
        function ha(a, b) {
            var c;
            b instanceof g || (b = g(b));
            return b.map(function (b, e) {
                c = ia(a, e);
                return I(a, c.data, e, c.cells)
            })
        }
        function ab(a, b) {
            return b._DT_RowIndex !== n ? b._DT_RowIndex : null
        }
        function Ob(a, b, c) {
            return g.inArray(c, a.aoData[b].anCells)
        }

        function bb(a, b, c, d) {
            for (var e = [], f = 0, i = d.length; f < i; f++) e.push(x(a, b, d[f], c));
            return e
        }
        function x(a, b, c, d) {
            var c = a.aoColumns[c],
                e = a.aoData[b]._aData,
                f = c.fnGetData(e, d);
            if (f === n) return a.iDrawError != a.iDraw && null === c.sDefaultContent && (O(a, 0,
                "Requested unknown parameter " + ("function" == typeof c.mData ? "{function}" : "'" + c.mData + "'") +
                " for row " + b, 4), a.iDrawError = a.iDraw), c.sDefaultContent;
            if ((f === e || null === f) && null !== c.sDefaultContent) f = c.sDefaultContent;
            else if ("function" === typeof f) return f();
            return null ===
            f && "display" == d ? "" : f
        }
        function Ea(a, b, c, d) {
            a.aoColumns[c].fnSetData(a.aoData[b]._aData, d)
        }
        function Ga(a) {
            return g.map(a.match(/(\\.|[^\.])+/g), function (a) {
                return a.replace("\\.", ".")
            })
        }
        function U(a) {
            if (g.isPlainObject(a)) {
                var b = {};
                g.each(a, function (a, c) {
                    c && (b[a] = U(c))
                });
                return function (a, c, f) {
                    return b[b[c] !== n ? c : "_"](a, c, f)
                }
            }
            if (null === a) return function (a) {
                return a
            };
            if ("function" === typeof a) return function (b, c, f) {
                return a(b, c, f)
            };
            if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !==
                a.indexOf("("))) {
                var c = function (a, b, f) {
                    var i, j;
                    if ("" !== f) {
                        j = Ga(f);
                        for (var h = 0, g = j.length; h < g; h++) {
                            f = j[h].match(Z);
                            i = j[h].match(P);
                            if (f) {
                                j[h] = j[h].replace(Z, "");
                                "" !== j[h] && (a = a[j[h]]);
                                i = [];
                                j.splice(0, h + 1);
                                j = j.join(".");
                                h = 0;
                                for (g = a.length; h < g; h++) i.push(c(a[h], b, j));
                                a = f[0].substring(1, f[0].length - 1);
                                a = "" === a ? i : i.join(a);
                                break
                            } else if (i) {
                                j[h] = j[h].replace(P, "");
                                a = a[j[h]]();
                                continue
                            }
                            if (null === a || a[j[h]] === n) return n;
                            a = a[j[h]]
                        }
                    }
                    return a
                };
                return function (b, e) {
                    return c(b, e, a)
                }
            }
            return function (b) {
                return b[a]
            }
        }

        function Ba(a) {
            if (g.isPlainObject(a)) return Ba(a._);
            if (null === a) return function () {};
            if ("function" === typeof a) return function (b, d) {
                a(b, "set", d)
            };
            if ("string" === typeof a && (-1 !== a.indexOf(".") || -1 !== a.indexOf("[") || -1 !== a.indexOf("("))) {
                var b = function (a, d, e) {
                    var e = Ga(e),
                        f;
                    f = e[e.length - 1];
                    for (var i, j, h = 0, g = e.length - 1; h < g; h++) {
                        i = e[h].match(Z);
                        j = e[h].match(P);
                        if (i) {
                            e[h] = e[h].replace(Z, "");
                            a[e[h]] = [];
                            f = e.slice();
                            f.splice(0, h + 1);
                            i = f.join(".");
                            j = 0;
                            for (g = d.length; j < g; j++) f = {}, b(f, d[j], i), a[e[h]].push(f);
                            return
                        }
                        j &&
                        (e[h] = e[h].replace(P, ""), a = a[e[h]](d));
                        if (null === a[e[h]] || a[e[h]] === n) a[e[h]] = {};
                        a = a[e[h]]
                    }
                    if (f.match(P)) a[f.replace(P, "")](d);
                    else a[f.replace(Z, "")] = d
                };
                return function (c, d) {
                    return b(c, d, a)
                }
            }
            return function (b, d) {
                b[a] = d
            }
        }
        function Ha(a) {
            return B(a.aoData, "_aData")
        }
        function ja(a) {
            a.aoData.length = 0;
            a.aiDisplayMaster.length = 0;
            a.aiDisplay.length = 0
        }
        function ka(a, b, c) {
            for (var d = -1, e = 0, f = a.length; e < f; e++) a[e] == b ? d = e : a[e] > b && a[e]--; - 1 != d && c ===
            n && a.splice(d, 1)
        }
        function la(a, b, c, d) {
            var e = a.aoData[b],
                f;
            if ("dom" ===
                c || (!c || "auto" === c) && "dom" === e.src) e._aData = ia(a, e.nTr).data;
            else {
                var i = e.anCells,
                    c = 0;
                for (f = i.length; c < f; c++) i[c].innerHTML = x(a, b, c, "display")
            }
            e._aSortData = null;
            e._aFilterData = null;
            a = a.aoColumns;
            if (d !== n) a[d].sType = null;
            else {
                c = 0;
                for (f = a.length; c < f; c++) a[c].sType = null
            }
            Ia(e)
        }
        function ia(a, b) {
            for (var c = [], d = [], e = b.firstChild, f, i, j = 0, h, k = a.aoColumns, l = function (a, b, c) {
                "string" === typeof a && (b = a.indexOf("@"), -1 !== b && (a = a.substring(b + 1), i["@" + a] = c.getAttribute(
                    a)))
            }; e;) {
                f = e.nodeName.toUpperCase();
                if ("TD" ==
                    f || "TH" == f) f = k[j], h = g.trim(e.innerHTML), f && f._bAttrSrc ? (i = {
                    display: h
                }, l(f.mData.sort, i, e), l(f.mData.type, i, e), l(f.mData.filter, i, e), c.push(i)) : c.push(h), d
                    .push(e), j++;
                e = e.nextSibling
            }
            return {
                data: c,
                cells: d
            }
        }
        function Fa(a, b, c, d) {
            var e = a.aoData[b],
                f = e._aData,
                i = [],
                j, h, g, l;
            if (null === e.nTr) {
                j = c || S.createElement("tr");
                e.nTr = j;
                e.anCells = i;
                j._DT_RowIndex = b;
                Ia(e);
                g = 0;
                for (l = a.aoColumns.length; g < l; g++) {
                    h = a.aoColumns[g];
                    e = c ? d[g] : S.createElement(h.sCellType);
                    i.push(e);
                    if (!c || h.mRender || h.mData !== g) e.innerHTML =
                        x(a, b, g, "display");
                    null !== h.sClass && (e.className += " " + h.sClass);
                    h.bVisible && !c ? j.appendChild(e) : !h.bVisible && c && e.parentNode.removeChild(e);
                    h.fnCreatedCell && h.fnCreatedCell.call(a.oInstance, e, x(a, b, g, "display"), f, b, g)
                }
                u(a, "aoRowCreatedCallback", null, [j, f, b])
            }
        }
        function Ia(a) {
            var b = a.nTr,
                c = a._aData;
            if (b) {
                c.DT_RowId && (b.id = c.DT_RowId);
                if (c.DT_RowClass) {
                    var d = c.DT_RowClass.split(" ");
                    a.__rowc = a.__rowc ? Ja(a.__rowc.concat(d)) : d;
                    g(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)
                }
                c.DT_RowData &&
                g(b).data(c.DT_RowData)
            }
        }
        function cb(a) {
            var b, c, d, e, f, i = a.nTHead,
                j = a.nTFoot,
                h = 0 === g("th, td", i).length,
                k = a.oClasses,
                l = a.aoColumns;
            h && (e = g("<tr/>").appendTo(i));
            b = 0;
            for (c = l.length; b < c; b++) f = l[b], d = g(f.nTh).addClass(f.sClass), h && d.appendTo(e), a.oFeatures.bSort &&
            (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr("tabindex", a.iTabIndex).attr(
                "aria-controls", a.sTableId), Ka(a, f.nTh, b))), f.sTitle != d.html() && d.html(f.sTitle), La(a,
                "header")(a, d, f, b, k);
            h && $(a.aoHeader, i);
            g(i).find(">tr").attr("role", "row");
            g(i).find(">tr>th, >tr>td").addClass(k.sHeaderTH);
            g(j).find(">tr>th, >tr>td").addClass(k.sFooterTH);
            if (null !== j) {
                a = a.aoFooter[0];
                b = 0;
                for (c = a.length; b < c; b++) f = l[b], f.nTf = a[b].cell, f.sClass && g(f.nTf).addClass(f.sClass)
            }
        }
        function K(a, b, c) {
            var d, e, f, i = [],
                j = [],
                h = a.aoColumns.length,
                k;
            if (b) {
                c === n && (c = !1);
                d = 0;
                for (e = b.length; d < e; d++) {
                    i[d] = b[d].slice();
                    i[d].nTr = b[d].nTr;
                    for (f = h - 1; 0 <= f; f--)!a.aoColumns[f].bVisible && !c && i[d].splice(f, 1);
                    j.push([])
                }
                d = 0;
                for (e = i.length; d < e; d++) {
                    if (a = i[d].nTr) for (; f = a.firstChild;) a.removeChild(f);
                    f = 0;
                    for (b = i[d].length; f < b; f++) if (k = h = 1, j[d][f] === n) {
                        a.appendChild(i[d][f].cell);
                        for (j[d][f] = 1; i[d + h] !== n && i[d][f].cell == i[d + h][f].cell;) j[d + h][f] = 1, h++;
                        for (; i[d][f + k] !== n && i[d][f].cell == i[d][f + k].cell;) {
                            for (c = 0; c < h; c++) j[d + c][f + k] = 1;
                            k++
                        }
                        g(i[d][f].cell).attr("rowspan", h).attr("colspan", k)
                    }
                }
            }
        }
        function L(a) {
            var b = u(a, "aoPreDrawCallback", "preDraw", [a]);
            if (-1 !== g.inArray(!1, b)) F(a, !1);
            else {
                var b = [],
                    c = 0,
                    d = a.asStripeClasses,
                    e = d.length,
                    f = a.oLanguage,
                    i = a.iInitDisplayStart,
                    j = "ssp" == D(a),
                    h = a.aiDisplay;
                a.bDrawing = !0;
                i !== n && -1 !== i && (a._iDisplayStart = j ? i : i >= a.fnRecordsDisplay() ? 0 : i, a.iInitDisplayStart = -
                    1);
                var i = a._iDisplayStart,
                    k = a.fnDisplayEnd();
                if (a.bDeferLoading) a.bDeferLoading = !1, a.iDraw++, F(a, !1);
                else if (j) {
                    if (!a.bDestroying && !db(a)) return
                } else a.iDraw++; if (0 !== h.length) {
                    f = j ? a.aoData.length : k;
                    for (j = j ? 0 : i; j < f; j++) {
                        var l = h[j],
                            r = a.aoData[l];
                        null === r.nTr && Fa(a, l);
                        l = r.nTr;
                        if (0 !== e) {
                            var p = d[c % e];
                            r._sRowStripe != p && (g(l).removeClass(r._sRowStripe).addClass(p), r._sRowStripe = p)
                        }
                        u(a, "aoRowCallback", null, [l, r._aData,
                            c, j]);
                        b.push(l);
                        c++
                    }
                } else c = f.sZeroRecords, 1 == a.iDraw && "ajax" == D(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 ===
                    a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = g("<tr/>", {
                    "class": e ? d[0] : ""
                }).append(g("<td />", {
                    valign: "top",
                    colSpan: Y(a),
                    "class": a.oClasses.sRowEmpty
                }).html(c))[0];
                u(a, "aoHeaderCallback", "header", [g(a.nTHead).children("tr")[0], Ha(a), i, k, h]);
                u(a, "aoFooterCallback", "footer", [g(a.nTFoot).children("tr")[0], Ha(a), i, k, h]);
                d = g(a.nTBody);
                d.children().detach();
                d.append(g(b));
                u(a, "aoDrawCallback", "draw", [a]);
                a.bSorted = !1;
                a.bFiltered = !1;
                a.bDrawing = !1
            }
        }
        function M(a, b) {
            var c = a.oFeatures,
                d = c.bFilter;
            c.bSort && eb(a);
            d ? aa(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();
            !0 !== b && (a._iDisplayStart = 0);
            L(a)
        }
        function fb(a) {
            var b = g("<div></div>")[0];
            a.nTable.parentNode.insertBefore(b, a.nTable);
            a.nTableWrapper = g('<div id="' + a.sTableId + '_wrapper" class="' + a.oClasses.sWrapper +
                '" role="grid"></div>')[0];
            a.nTableReinsertBefore = a.nTable.nextSibling;
            for (var c = a.nTableWrapper, d = a.sDom.split(""), e, f, i, j, h, k,
                     l, r = 0; r < d.length; r++) {
                f = 0;
                i = d[r];
                if ("<" == i) {
                    j = g("<div></div>")[0];
                    h = d[r + 1];
                    if ("'" == h || '"' == h) {
                        k = "";
                        for (l = 2; d[r + l] != h;) k += d[r + l], l++;
                        "H" == k ? k = a.oClasses.sJUIHeader : "F" == k && (k = a.oClasses.sJUIFooter); - 1 != k.indexOf(
                            ".") ? (h = k.split("."), j.id = h[0].substr(1, h[0].length - 1), j.className = h[1]) : "#" ==
                        k.charAt(0) ? j.id = k.substr(1, k.length - 1) : j.className = k;
                        r += l
                    }
                    c.appendChild(j);
                    c = j
                } else if (">" == i) c = c.parentNode;
                else if ("l" == i && a.oFeatures.bPaginate && a.oFeatures.bLengthChange) e = gb(a), f = 1;
                else if ("f" == i && a.oFeatures.bFilter) e =
                    hb(a), f = 1;
                else if ("r" == i && a.oFeatures.bProcessing) e = ib(a), f = 1;
                else if ("t" == i) e = jb(a), f = 1;
                else if ("i" == i && a.oFeatures.bInfo) e = kb(a), f = 1;
                else if ("p" == i && a.oFeatures.bPaginate) e = lb(a), f = 1;
                else if (0 !== o.ext.feature.length) {
                    j = o.ext.feature;
                    l = 0;
                    for (h = j.length; l < h; l++) if (i == j[l].cFeature) {
                        (e = j[l].fnInit(a)) && (f = 1);
                        break
                    }
                }
                1 == f && null !== e && ("object" !== typeof a.aanFeatures[i] && (a.aanFeatures[i] = []), a.aanFeatures[
                    i].push(e), c.appendChild(e))
            }
            b.parentNode.replaceChild(a.nTableWrapper, b)
        }
        function $(a, b) {
            var c =
                    g(b).children("tr"),
                d, e, f, i, j, h, k, l, r, p;
            a.splice(0, a.length);
            f = 0;
            for (h = c.length; f < h; f++) a.push([]);
            f = 0;
            for (h = c.length; f < h; f++) {
                d = c[f];
                for (e = d.firstChild; e;) {
                    if ("TD" == e.nodeName.toUpperCase() || "TH" == e.nodeName.toUpperCase()) {
                        l = 1 * e.getAttribute("colspan");
                        r = 1 * e.getAttribute("rowspan");
                        l = !l || 0 === l || 1 === l ? 1 : l;
                        r = !r || 0 === r || 1 === r ? 1 : r;
                        i = 0;
                        for (j = a[f]; j[i];) i++;
                        k = i;
                        p = 1 === l ? !0 : !1;
                        for (j = 0; j < l; j++) for (i = 0; i < r; i++) a[f + i][k + j] = {
                            cell: e,
                            unique: p
                        }, a[f + i].nTr = d
                    }
                    e = e.nextSibling
                }
            }
        }
        function ma(a, b, c) {
            var d = [];
            c || (c = a.aoHeader,
            b && (c = [], $(c, b)));
            for (var b = 0, e = c.length; b < e; b++) for (var f = 0, i = c[b].length; f < i; f++) if (c[b][f].unique &&
                (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell;
            return d
        }
        function na(a, b, c) {
            u(a, "aoServerParams", "serverParams", [b]);
            if (b && b.__legacy) {
                var d = {}, e = /(.*?)\[\]$/;
                g.each(b, function (a, b) {
                    var c = b.name.match(e);
                    c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value
                });
                b = d
            }
            var f, i = a.ajax,
                j = a.oInstance;
            if (g.isPlainObject(i) && i.data) {
                f = i.data;
                var h = g.isFunction(f) ? f(b) : f,
                    b = g.isFunction(f) && h ? h : g.extend(!0,
                        b, h);
                delete i.data
            }
            h = {
                data: b,
                success: function (b) {
                    var d = b.error || b.sError;
                    d && a.oApi._fnLog(a, 0, d);
                    a.json = b;
                    u(a, null, "xhr", [a, b]);
                    c(b)
                },
                dataType: "json",
                cache: !1,
                type: a.sServerMethod,
                error: function (b, c) {
                    var d = a.oApi._fnLog;
                    "parsererror" == c ? d(a, 0, "Invalid JSON response", 1) : d(a, 0, "Ajax error", 7)
                }
            };
            a.fnServerData ? a.fnServerData.call(j, a.sAjaxSource, b, c, a) : a.sAjaxSource || "string" === typeof i ?
                a.jqXHR = g.ajax(g.extend(h, {
                    url: i || a.sAjaxSource
                })) : g.isFunction(i) ? a.jqXHR = i.call(j, b, c, a) : (a.jqXHR = g.ajax(g.extend(h,
                    i)), i.data = f)
        }
        function db(a) {
            if (a.bAjaxDataGet) {
                a.iDraw++;
                F(a, !0);
                var b = mb(a);
                na(a, b, function (b) {
                    nb(a, b)
                }, a);
                return !1
            }
            return !0
        }
        function mb(a) {
            var b = a.aoColumns,
                c = b.length,
                d = a.oFeatures,
                e = a.oPreviousSearch,
                f = a.aoPreSearchCols,
                i, j = [],
                h, k, l, r = Q(a);
            i = a._iDisplayStart;
            h = !1 !== d.bPaginate ? a._iDisplayLength : -1;
            var p = function (a, b) {
                j.push({
                    name: a,
                    value: b
                })
            };
            p("sEcho", a.iDraw);
            p("iColumns", c);
            p("sColumns", B(b, "sName").join(","));
            p("iDisplayStart", i);
            p("iDisplayLength", h);
            var m = {
                draw: a.iDraw,
                columns: [],
                order: [],
                start: i,
                length: h,
                search: {
                    value: e.sSearch,
                    regex: e.bRegex
                }
            };
            for (i = 0; i < c; i++) k = b[i], l = f[i], h = "function" == typeof k.mData ? "function" : k.mData, m.columns
                .push({
                    data: h,
                    name: k.sName,
                    searchable: k.bSearchable,
                    orderable: k.bSortable,
                    search: {
                        value: l.sSearch,
                        regex: l.bRegex
                    }
                }), p("mDataProp_" + i, h), d.bFilter && (p("sSearch_" + i, l.sSearch), p("bRegex_" + i, l.bRegex), p(
                "bSearchable_" + i, k.bSearchable)), d.bSort && p("bSortable_" + i, k.bSortable);
            g.each(r, function (a, b) {
                m.order.push({
                    column: b.col,
                    dir: b.dir
                });
                p("iSortCol_" + a, b.col);
                p("sSortDir_" + a, b.dir)
            });
            d.bFilter && (p("sSearch", e.sSearch), p("bRegex", e.bRegex));
            d.bSort && p("iSortingCols", r.length);
            j.__legacy = !0;
            return a.sAjaxSource || o.ext.legacy.ajax ? j : m
        }
        function nb(a, b) {
            var c = b.sEcho !== n ? b.sEcho : b.draw,
                d = b.iTotalRecords !== n ? b.iTotalRecords : b.recordsTotal,
                e = b.iTotalDisplayRecords !== n ? b.iTotalDisplayRecords : b.recordsFiltered;
            if (c) {
                if (1 * c < a.iDraw) return;
                a.iDraw = 1 * c
            }
            ja(a);
            a._iRecordsTotal = parseInt(d, 10);
            a._iRecordsDisplay = parseInt(e, 10);
            c = oa(a, b);
            d = 0;
            for (e = c.length; d < e; d++) I(a,
                c[d]);
            a.aiDisplay = a.aiDisplayMaster.slice();
            a.bAjaxDataGet = !1;
            L(a);
            a._bInitComplete || pa(a, b);
            a.bAjaxDataGet = !0;
            F(a, !1)
        }
        function oa(a, b) {
            var c = g.isPlainObject(a.ajax) && a.ajax.dataSrc !== n ? a.ajax.dataSrc : a.sAjaxDataProp;
            return "data" === c ? b.aaData || b[c] : "" !== c ? U(c)(b) : b
        }
        function hb(a) {
            var b = a.oClasses,
                c = a.sTableId,
                d = a.oPreviousSearch,
                e = a.aanFeatures,
                f = '<input type="search" class="' + b.sFilterInput + '"/>',
                i = a.oLanguage.sSearch,
                i = i.match(/_INPUT_/) ? i.replace("_INPUT_", f) : i + f,
                b = g("<div/>", {
                    id: !e.f ? c + "_filter" : null,
                    "class": b.sFilter
                }).append(g("<label/>").append(i)),
                j = g('input[type="search"]', b).val(d.sSearch.replace('"', '"')).bind(
            "keyup.DT search.DT input.DT paste.DT cut.DT", function () {
                var b = !this.value ? "" : this.value;
                b != d.sSearch && (aa(a, {
                    sSearch: b,
                    bRegex: d.bRegex,
                    bSmart: d.bSmart,
                    bCaseInsensitive: d.bCaseInsensitive
                }), a._iDisplayStart = 0, L(a))
            }).bind("keypress.DT", function (a) {
                if (13 == a.keyCode) return !1
            }).attr("aria-controls", c);
            g(a.nTable).on("filter.DT", function () {
                try {
                    j[0] !== S.activeElement && j.val(d.sSearch)
                } catch (a) {}
            });
            return b[0]
        }
        function aa(a, b, c) {
            var d = a.oPreviousSearch,
                e = a.aoPreSearchCols,
                f = function (a) {
                    d.sSearch = a.sSearch;
                    d.bRegex = a.bRegex;
                    d.bSmart = a.bSmart;
                    d.bCaseInsensitive = a.bCaseInsensitive
                };
            Da(a);
            if ("ssp" != D(a)) {
                ob(a, b.sSearch, c, b.bRegex, b.bSmart, b.bCaseInsensitive);
                f(b);
                for (b = 0; b < e.length; b++) pb(a, e[b].sSearch, b, e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
                qb(a)
            } else f(b);
            a.bFiltered = !0;
            u(a, null, "search", [a])
        }
        function qb(a) {
            for (var b = o.ext.search, c = N(a, "bSearchable"), d = 0, e = b.length; d < e; d++) for (var f =
                0, i = 0, j = a.aiDisplay.length; i < j; i++) {
                var h = a.aiDisplay[i - f];
                b[d](a, bb(a, h, "filter", c), h) || (a.aiDisplay.splice(i - f, 1), f++)
            }
        }
        function pb(a, b, c, d, e, f) {
            if ("" !== b) for (var i = a.aiDisplay, d = Ma(b, d, e, f), e = i.length - 1; 0 <= e; e--) b = a.aoData[i[e]]
                ._aFilterData[c], d.test(b) || i.splice(e, 1)
        }
        function ob(a, b, c, d, e, f) {
            var d = Ma(b, d, e, f),
                e = a.oPreviousSearch.sSearch,
                f = a.aiDisplayMaster,
                i;
            0 !== o.ext.search.length && (c = !0);
            i = rb(a);
            if (0 >= b.length) a.aiDisplay = f.slice();
            else {
                if (i || c || e.length > b.length || 0 !== b.indexOf(e) || a.bSorted) a.aiDisplay =
                    f.slice();
                b = a.aiDisplay;
                for (c = b.length - 1; 0 <= c; c--) d.test(a.aoData[b[c]]._sFilterRow) || b.splice(c, 1)
            }
        }
        function Ma(a, b, c, d) {
            a = b ? a : sb(a);
            c && (c = a.split(" "), a = "^(?=.*?" + c.join(")(?=.*?") + ").*$");
            return RegExp(a, d ? "i" : "")
        }
        function sb(a) {
            return a.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"), "\\$1")
        }
        function rb(a) {
            var b = a.aoColumns,
                c, d, e, f, i, j, h, g, l = o.ext.type.search;
            c = !1;
            d = 0;
            for (f = a.aoData.length; d < f; d++) if (g = a.aoData[d], !g._aFilterData) {
                j = [];
                e = 0;
                for (i = b.length; e <
                i; e++) c = b[e], c.bSearchable ? (h = x(a, d, e, "filter"), h = l[c.sType] ? l[c.sType](h) :
                    null !== h ? h : "") : h = "", h.indexOf && -1 !== h.indexOf("&") && (qa.innerHTML = h, h =
                    Pb ? qa.textContent : qa.innerText, h = h.replace(/[\r\n]/g, "")), j.push(h);
                g._aFilterData = j;
                g._sFilterRow = j.join("  ");
                c = !0
            }
            return c
        }
        function kb(a) {
            var b = a.sTableId,
                c = a.aanFeatures.i,
                d = g("<div/>", {
                    "class": a.oClasses.sInfo,
                    id: !c ? b + "_info" : null
                });
            c || (a.aoDrawCallback.push({
                fn: tb,
                sName: "information"
            }), d.attr("role", "alert").attr("aria-live", "polite").attr("aria-relevant",
                "all"), g(a.nTable).attr("aria-describedby", b + "_info"));
            return d[0]
        }
        function tb(a) {
            var b = a.aanFeatures.i;
            if (0 !== b.length) {
                var c = a.oLanguage,
                    d = a._iDisplayStart + 1,
                    e = a.fnDisplayEnd(),
                    f = a.fnRecordsTotal(),
                    i = a.fnRecordsDisplay(),
                    j = i ? c.sInfo : c.sInfoEmpty;
                i !== f && (j += " " + c.sInfoFiltered);
                j += c.sInfoPostFix;
                j = ub(a, j);
                c = c.fnInfoCallback;
                null !== c && (j = c.call(a.oInstance, a, d, e, f, i, j));
                g(b).html(j)
            }
        }
        function ub(a, b) {
            var c = a.fnFormatNumber,
                d = a._iDisplayStart + 1,
                e = a._iDisplayLength,
                f = a.fnRecordsDisplay(),
                i = -1 === e;
            return b.replace(/_START_/g,
                c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal()))
                .replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, i ? 1 : Math.ceil(d / e))).replace(
                    /_PAGES_/g, c.call(a, i ? 1 : Math.ceil(f / e)))
        }
        function ra(a) {
            var b, c, d = a.iInitDisplayStart,
                e = a.aoColumns,
                f;
            c = a.oFeatures;
            if (a.bInitialised) {
                fb(a);
                cb(a);
                K(a, a.aoHeader);
                K(a, a.aoFooter);
                F(a, !0);
                c.bAutoWidth && Ca(a);
                b = 0;
                for (c = e.length; b < c; b++) f = e[b], f.sWidth && (f.nTh.style.width = t(f.sWidth));
                M(a);
                e = D(a);
                "ssp" != e && ("ajax" ==
                e ? na(a, [], function (c) {
                    var e = oa(a, c);
                    for (b = 0; b < e.length; b++) I(a, e[b]);
                    a.iInitDisplayStart = d;
                    M(a);
                    F(a, !1);
                    pa(a, c)
                }, a) : (F(a, !1), pa(a)))
            } else setTimeout(function () {
                ra(a)
            }, 200)
        }
        function pa(a, b) {
            a._bInitComplete = !0;
            b && V(a);
            u(a, "aoInitComplete", "init", [a, b])
        }
        function Na(a, b) {
            var c = parseInt(b, 10);
            a._iDisplayLength = c;
            Oa(a);
            u(a, null, "length", [a, c])
        }
        function gb(a) {
            for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = g.isArray(d[0]), f = e ? d[0] : d, d = e ?
                d[1] : d, i = g("<select/>", {
                    name: c + "_length",
                    "aria-controls": c,
                    "class": b.sLengthSelect
                }),
                     e = 0, j = f.length; e < j; e++) i[0][e] = new Option(d[e], f[e]);
            b = g("<div><label/></div>").addClass(b.sLength);
            a.aanFeatures.l || (b[0].id = c + "_length");
            c = a.oLanguage.sLengthMenu.split(/(_MENU_)/);
            b.children().append(c[0]).append(i).append(c[2]);
            i.val(a._iDisplayLength).bind("change.DT", function () {
                Na(a, g(this).val());
                L(a)
            });
            g(a.nTable).bind("length", function (a, b, c) {
                i.val(c)
            });
            return b[0]
        }
        function lb(a) {
            var b = a.sPaginationType,
                c = o.ext.pager[b],
                d = "function" === typeof c,
                e = function (a) {
                    L(a)
                }, b = g("<div/>").addClass(a.oClasses.sPaging +
                b)[0],
                f = a.aanFeatures;
            d || c.fnInit(a, b, e);
            f.p || (b.id = a.sTableId + "_paginate", a.aoDrawCallback.push({
                fn: function (a) {
                    if (d) {
                        var b = a._iDisplayStart,
                            h = a._iDisplayLength,
                            g = a.fnRecordsDisplay(),
                            l = -1 === h,
                            b = l ? 0 : Math.ceil(b / h),
                            h = l ? 1 : Math.ceil(g / h),
                            g = c(b, h),
                            r, l = 0;
                        for (r = f.p.length; l < r; l++) La(a, "pageButton")(a, f.p[l], l, g, b, h)
                    } else c.fnUpdate(a, e)
                },
                sName: "pagination"
            }));
            return b
        }
        function Pa(a, b, c) {
            var d = a._iDisplayStart,
                e = a._iDisplayLength,
                f = a.fnRecordsDisplay();
            0 === f || -1 === e ? d = 0 : "number" === typeof b ? (d = b * e, d > f &&
            (d = 0)) : "首页" == b ? d = 0 : "上一页" == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : "下一页" ==
            b ? d + e < f && (d += e) : "尾页" == b ? d = Math.floor((f - 1) / e) * e : O(a, 0,
                "Unknown paging action: " + b, 5);
            b = a._iDisplayStart !== d;
            a._iDisplayStart = d;
            u(a, null, "page", [a]);
            c && L(a);
            return b
        }
        function ib(a) {
            return g("<div/>", {
                id: !a.aanFeatures.r ? a.sTableId + "_processing" : null,
                "class": a.oClasses.sProcessing
            }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]
        }
        function F(a, b) {
            a.oFeatures.bProcessing && g(a.aanFeatures.r).css("visibility", b ? "visible" : "hidden");
            u(a, null, "processing", [a, b])
        }
        function jb(a) {
            var b = a.oScroll;
            if ("" === b.sX && "" === b.sY) return a.nTable;
            var c = b.sX,
                d = b.sY,
                e = a.oClasses,
                f = g(a.nTable),
                i = f.children("caption"),
                j = i.length ? i[0]._captionSide : null,
                h = g(f[0].cloneNode(!1)),
                k = g(f[0].cloneNode(!1)),
                l = f.children("tfoot");
            l.length || (l = null);
            b = g("<div/>", {
                "class": e.sScrollWrapper
            }).append(g("<div/>", {
                "class": e.sScrollHead
            }).css({
                overflow: "hidden",
                position: "relative",
                border: 0,
                width: c ? !c ? null : t(c) : "100%"
            }).append(g("<div/>", {
                "class": e.sScrollHeadInner
            }).css({
                "box-sizing": "content-box",
                width: b.sXInner || "100%"
            }).append(h.removeAttr("id").css("margin-left", 0).append(f.children("thead")))).append("top" === j ? i :
                null)).append(g("<div/>", {
                "class": e.sScrollBody
            }).css({
                overflow: "auto",
                height: !d ? null : t(d),
                width: !c ? null : t(c)
            }).append(f));
            l && b.append(g("<div/>", {
                "class": e.sScrollFoot
            }).css({
                overflow: "hidden",
                border: 0,
                width: c ? !c ? null : t(c) : "100%"
            }).append(g("<div/>", {
                "class": e.sScrollFootInner
            }).append(k.removeAttr("id").css("margin-left", 0).append(f.children("tfoot")))).append("bottom" === j ? i :
                null));
            var e = b.children(),
                r = e[0],
                f = e[1],
                p = l ? e[2] : null;
            c && g(f).scroll(function () {
                var a = this.scrollLeft;
                r.scrollLeft = a;
                l && (p.scrollLeft = a)
            });
            a.nScrollHead = r;
            a.nScrollBody = f;
            a.nScrollFoot = p;
            a.aoDrawCallback.push({
                fn: W,
                sName: "scrolling"
            });
            return b[0]
        }
        function W(a) {
            var b = a.oScroll,
                c = b.sX,
                d = b.sXInner,
                e = b.sY,
                f = b.iBarWidth,
                i = g(a.nScrollHead),
                j = i[0].style,
                h = i.children("div"),
                k = h[0].style,
                l = h.children("table"),
                h = a.nScrollBody,
                r = g(h),
                p = h.style,
                m = g(a.nScrollFoot).children("div"),
                n = m.children("table"),
                o = g(a.nTHead),
                G = g(a.nTable),
                q = G[0],
                s = q.style,
                u = a.nTFoot ? g(a.nTFoot) : null,
                v = a.oBrowser,
                w = v.bScrollOversize,
                A, x, z, y, B, C = [],
                D = [],
                E, F = function (a) {
                    a = a.style;
                    a.paddingTop = "0";
                    a.paddingBottom = "0";
                    a.borderTopWidth = "0";
                    a.borderBottomWidth = "0";
                    a.height = 0
                };
            G.children("thead, tfoot").remove();
            B = o.clone().prependTo(G);
            A = o.find("tr");
            z = B.find("tr");
            B.find("th, td").removeAttr("tabindex");
            u && (y = u.clone().prependTo(G), x = u.find("tr"), y = y.find("tr"));
            c || (p.width = "100%", i[0].style.width = "100%");
            g.each(ma(a, B), function (b, c) {
                E = ga(a,
                    b);
                c.style.width = a.aoColumns[E].sWidth
            });
            u && H(function (a) {
                a.style.width = ""
            }, y);
            b.bCollapse && "" !== e && (p.height = r.offsetHeight + o[0].offsetHeight + "px");
            i = G.outerWidth();
            if ("" === c) {
                if (s.width = "100%", w && (G.find("tbody").height() > h.offsetHeight || "scroll" == r.css("overflow-y")))
                    s.width = t(G.outerWidth() - f)
            } else "" !== d ? s.width = t(d) : i == r.width() && r.height() < G.height() ? (s.width = t(i - f), G.outerWidth() >
            i - f && (s.width = t(i))) : s.width = t(i);
            i = G.outerWidth();
            H(F, z);
            H(function (a) {
                C.push(t(g(a).css("width")))
            }, z);
            H(function (a,
                        b) {
                a.style.width = C[b]
            }, A);
            g(z).height(0);
            u && (H(F, y), H(function (a) {
                D.push(t(g(a).css("width")))
            }, y), H(function (a, b) {
                a.style.width = D[b]
            }, x), g(y).height(0));
            H(function (a, b) {
                a.innerHTML = "";
                a.style.width = C[b]
            }, z);
            u && H(function (a, b) {
                a.innerHTML = "";
                a.style.width = D[b]
            }, y);
            if (G.outerWidth() < i) {
                x = h.scrollHeight > h.offsetHeight || "scroll" == r.css("overflow-y") ? i + f : i;
                if (w && (h.scrollHeight > h.offsetHeight || "scroll" == r.css("overflow-y"))) s.width = t(x - f);
                ("" === c || "" !== d) && O(a, 1, "Possible column misalignment", 6)
            } else x =
                "100%";
            p.width = t(x);
            j.width = t(x);
            u && (a.nScrollFoot.style.width = t(x));
            !e && w && (p.height = t(q.offsetHeight + f));
            e && b.bCollapse && (p.height = t(e), b = c && q.offsetWidth > h.offsetWidth ? f : 0, q.offsetHeight < h.offsetHeight &&
            (p.height = t(q.offsetHeight + b)));
            b = G.outerWidth();
            l[0].style.width = t(b);
            k.width = t(b);
            l = G.height() > h.clientHeight || "scroll" == r.css("overflow-y");
            v = "padding" + (v.bScrollbarLeft ? "Left" : "Right");
            k[v] = l ? f + "px" : "0px";
            u && (n[0].style.width = t(b), m[0].style.width = t(b), m[0].style[v] = l ? f + "px" : "0px");
            r.scroll();
            if (a.bSorted || a.bFiltered) h.scrollTop = 0
        }
        function H(a, b, c) {
            for (var d = 0, e = 0, f = b.length, i, j; e < f;) {
                i = b[e].firstChild;
                for (j = c ? c[e].firstChild : null; i;) 1 === i.nodeType && (c ? a(i, j, d) : a(i, d), d++), i = i.nextSibling,
                    j = c ? j.nextSibling : null;
                e++
            }
        }
        function Ca(a) {
            var b = a.nTable,
                c = a.aoColumns,
                d = a.oScroll,
                e = d.sY,
                f = d.sX,
                i = d.sXInner,
                j = c.length,
                d = N(a, "bVisible"),
                h = g("th", a.nTHead),
                k = b.getAttribute("width"),
                l = b.parentNode,
                r = !1,
                p, m;
            for (p = 0; p < d.length; p++) m = c[d[p]], null !== m.sWidth && (m.sWidth = vb(m.sWidthOrig, l), r = !0);
            if (!r && !f && !e && j == Y(a) && j == h.length) for (p = 0; p < j; p++) c[p].sWidth = t(h.eq(p).width());
            else {
                j = g(b.cloneNode(!1)).css("visibility", "hidden").removeAttr("id").append(g(a.nTHead).clone(!1)).append(
                    g(a.nTFoot).clone(!1)).append(g("<tbody><tr/></tbody>"));
                j.find("tfoot th, tfoot td").css("width", "");
                var n = j.find("tbody tr"),
                    h = ma(a, j.find("thead")[0]);
                for (p = 0; p < d.length; p++) m = c[d[p]], h[p].style.width = null !== m.sWidthOrig && "" !== m.sWidthOrig ?
                    t(m.sWidthOrig) : "";
                if (a.aoData.length) for (p = 0; p < d.length; p++) r = d[p], m = c[r],
                    g(wb(a, r)).clone(!1).append(m.sContentPadding).appendTo(n);
                j.appendTo(l);
                f && i ? j.width(i) : f ? (j.css("width", "auto"), j.width() < l.offsetWidth && j.width(l.offsetWidth)) :
                    e ? j.width(l.offsetWidth) : k && j.width(k);
                xb(a, j[0]);
                if (f) {
                    for (p = f = 0; p < d.length; p++) m = c[d[p]], e = g(h[p]).outerWidth(), f += null === m.sWidthOrig ?
                        e : parseInt(m.sWidth, 10) + e - g(h[p]).width();
                    j.width(t(f));
                    b.style.width = t(f)
                }
                for (p = 0; p < d.length; p++) if (m = c[d[p]], e = g(h[p]).width()) m.sWidth = t(e);
                b.style.width = t(j.css("width"));
                j.remove()
            }
            k && (b.style.width =
                t(k), a._reszEvt || (g(R).bind("resize.DT-" + a.sInstance, yb(function () {
                V(a)
            })), a._reszEvt = !0))
        }
        function yb(a) {
            var b, c;
            return function () {
                var d = +new Date;
                b && d < b + 200 ? (clearTimeout(c), c = setTimeout(function () {
                    b = d;
                    a()
                }, 200)) : (b = d, a())
            }
        }
        function vb(a, b) {
            if (!a) return 0;
            var c = g("<div/>").css("width", t(a)).appendTo(b || S.body),
                d = c[0].offsetWidth;
            c.remove();
            return d
        }
        function xb(a, b) {
            var c = a.oScroll;
            if (c.sX || c.sY) c = !c.sX ? c.iBarWidth : 0, b.style.width = t(g(b).outerWidth() - c)
        }
        function wb(a, b) {
            var c = zb(a, b);
            if (0 > c) return null;
            var d = a.aoData[c];
            return !d.nTr ? g("<td/>").html(x(a, c, b, "display"))[0] : d.anCells[b]
        }
        function zb(a, b) {
            for (var c, d = -1, e = -1, f = 0, i = a.aoData.length; f < i; f++) c = x(a, f, b, "display") + "", c = c.replace(
                Qb, ""), c.length > d && (d = c.length, e = f);
            return e
        }
        function t(a) {
            return null === a ? "0px" : "number" == typeof a ? 0 > a ? "0px" : a + "px" : a.match(/\d$/) ? a + "px" : a
        }
        function Ab() {
            if (!o.__scrollbarWidth) {
                var a = g("<p/>").css({
                        width: "100%",
                        height: 200,
                        padding: 0
                    })[0],
                    b = g("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 200,
                        height: 150,
                        padding: 0,
                        overflow: "hidden",
                        visibility: "hidden"
                    }).append(a).appendTo("body"),
                    c = a.offsetWidth;
                b.css("overflow", "scroll");
                a = a.offsetWidth;
                c === a && (a = b[0].clientWidth);
                b.remove();
                o.__scrollbarWidth = c - a
            }
            return o.__scrollbarWidth
        }
        function Q(a) {
            var b, c, d = [],
                e = a.aoColumns,
                f, i, j, h;
            b = a.aaSortingFixed;
            c = g.isPlainObject(b);
            var k = [];
            f = function (a) {
                a.length && !g.isArray(a[0]) ? k.push(a) : k.push.apply(k, a)
            };
            g.isArray(b) && f(b);
            c && b.pre && f(b.pre);
            f(a.aaSorting);
            c && b.post && f(b.post);
            for (a = 0; a < k.length; a++) {
                h = k[a][0];
                f = e[h].aDataSort;
                b = 0;
                for (c = f.length; b < c; b++) i = f[b], j = e[i].sType || "string", d.push({
                    src: h,
                    col: i,
                    dir: k[a][1],
                    index: k[a][2],
                    type: j,
                    formatter: o.ext.type.order[j + "-pre"]
                })
            }
            return d
        }
        function eb(a) {
            var b, c, d = [],
                e = o.ext.type.order,
                f = a.aoData,
                i = 0,
                j, h = a.aiDisplayMaster,
                g = Q(a);
            Da(a);
            b = 0;
            for (c = g.length; b < c; b++) j = g[b], j.formatter && i++, Bb(a, j.col);
            if ("ssp" != D(a) && 0 !== g.length) {
                b = 0;
                for (c = h.length; b < c; b++) d[h[b]] = b;
                i === g.length ? h.sort(function (a, b) {
                    var c, e, i, h, j = g.length,
                        n = f[a]._aSortData,
                        o = f[b]._aSortData;
                    for (i = 0; i < j; i++) if (h = g[i],
                        c = n[h.col], e = o[h.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c) return "asc" === h.dir ?
                        c : -c;
                    c = d[a];
                    e = d[b];
                    return c < e ? -1 : c > e ? 1 : 0
                }) : h.sort(function (a, b) {
                    var c, i, h, j, n = g.length,
                        o = f[a]._aSortData,
                        q = f[b]._aSortData;
                    for (h = 0; h < n; h++) if (j = g[h], c = o[j.col], i = q[j.col], j = e[j.type + "-" + j.dir] || e[
                    "string-" + j.dir], c = j(c, i), 0 !== c) return c;
                    c = d[a];
                    i = d[b];
                    return c < i ? -1 : c > i ? 1 : 0
                })
            }
            a.bSorted = !0
        }
        function Cb(a) {
            for (var b, c, d = a.aoColumns, e = Q(a), a = a.oLanguage.oAria, f = 0, i = d.length; f < i; f++) {
                c = d[f];
                var j = c.asSorting;
                b = c.sTitle.replace(/<.*?>/g, "");
                var h = g(c.nTh).removeAttr("aria-sort");
                c.bSortable && (0 < e.length && e[0].col == f ? (h.attr("aria-sort", "asc" == e[0].dir ? "ascending" :
                    "descending"), c = j[e[0].index + 1] || j[0]) : c = j[0], b += "asc" === c ? a.sSortAscending : a.sSortDescending);
                h.attr("aria-label", b)
            }
        }
        function Db(a, b, c, d) {
            var e = a.aaSorting,
                f = a.aoColumns[b].asSorting,
                i = function (a) {
                    var b = a._idx;
                    b === n && (b = g.inArray(a[1], f));
                    return b + 1 >= f.length ? 0 : b + 1
                };
            c && a.oFeatures.bSortMulti ? (c = g.inArray(b, B(e, "0")), -1 !== c ? (b = i(e[c]), e[c][1] = f[b], e[c]._idx =
                b) : (e.push([b, f[0],
                0]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = i(e[0]), e.length = 1, e[0][1] = f[b],
                e[0]._idx = b) : (e.length = 0, e.push([b, f[0]]), e[0]._idx = 0);
            M(a);
            "function" == typeof d && d(a)
        }
        function Ka(a, b, c, d) {
            var e = a.aoColumns[c];
            Qa(b, {}, function (b) {
                !1 !== e.bSortable && (F(a, !0), setTimeout(function () {
                    Db(a, c, b.shiftKey, d);
                    "ssp" !== D(a) && F(a, !1)
                }, 0))
            })
        }
        function sa(a) {
            var b = a.aLastSort,
                c = a.oClasses.sSortColumn,
                d = Q(a),
                e = a.oFeatures,
                f, i;
            if (e.bSort && e.bSortClasses) {
                e = 0;
                for (f = b.length; e < f; e++) i = b[e].src, g(B(a.aoData, "anCells",
                    i)).removeClass(c + (2 > e ? e + 1 : 3));
                e = 0;
                for (f = d.length; e < f; e++) i = d[e].src, g(B(a.aoData, "anCells", i)).addClass(c + (2 > e ? e + 1 :
                    3))
            }
            a.aLastSort = d
        }
        function Bb(a, b) {
            var c = a.aoColumns[b],
                d = o.ext.order[c.sSortDataType],
                e;
            d && (e = d.call(a.oInstance, a, b, X(a, b)));
            for (var f, i = o.ext.type.order[c.sType + "-pre"], j = 0, h = a.aoData.length; j < h; j++) if (c = a.aoData[
                j], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d) f = d ? e[j] : x(a, j, b, "sort"),
                c._aSortData[b] = i ? i(f) : f
        }
        function ta(a) {
            if (a.oFeatures.bStateSave && !a.bDestroying) {
                var b,
                    c, d = {
                        iCreate: (new Date).getTime(),
                        iStart: a._iDisplayStart,
                        iLength: a._iDisplayLength,
                        aaSorting: g.extend(!0, [], a.aaSorting),
                        oSearch: g.extend(!0, {}, a.oPreviousSearch),
                        aoSearchCols: g.extend(!0, [], a.aoPreSearchCols),
                        abVisCols: []
                    };
                b = 0;
                for (c = a.aoColumns.length; b < c; b++) d.abVisCols.push(a.aoColumns[b].bVisible);
                u(a, "aoStateSaveParams", "stateSaveParams", [a, d]);
                a.fnStateSaveCallback.call(a.oInstance, a, d)
            }
        }
        function Eb(a) {
            var b, c, d = a.aoColumns;
            if (a.oFeatures.bStateSave) {
                var e = a.fnStateLoadCallback.call(a.oInstance,
                    a);
                if (e && (b = u(a, "aoStateLoadParams", "stateLoadParams", [a, e]), -1 === g.inArray(!1, b) && !(e.iCreate <
                    (new Date).getTime() - 1E3 * a.iStateDuration) && d.length === e.aoSearchCols.length)) {
                    a.oLoadedState = g.extend(!0, {}, e);
                    a._iDisplayStart = e.iStart;
                    a.iInitDisplayStart = e.iStart;
                    a._iDisplayLength = e.iLength;
                    a.aaSorting = [];
                    var f = e.aaSorting;
                    b = 0;
                    for (c = f.length; b < c; b++) a.aaSorting.push(f[b][0] >= d.length ? [0, f[b][1]] : f[b]);
                    g.extend(a.oPreviousSearch, e.oSearch);
                    g.extend(!0, a.aoPreSearchCols, e.aoSearchCols);
                    b = 0;
                    for (c = e.abVisCols.length; b <
                    c; b++) d[b].bVisible = e.abVisCols[b];
                    u(a, "aoStateLoaded", "stateLoaded", [a, e])
                }
            }
        }
        function ua(a) {
            var b = o.settings,
                a = g.inArray(a, B(b, "nTable"));
            return -1 !== a ? b[a] : null
        }
        function O(a, b, c, d) {
            c = "DataTables warning: " + (null !== a ? "table id=" + a.sTableId + " - " : "") + c;
            d && (c += ". For more information about this error, please see http://datatables.net/tn/" + d);
            if (b) R.console && console.log && console.log(c);
            else if (a = o.ext, "alert" == (a.sErrMode || a.errMode)) alert(c);
            else throw Error(c);
        }
        function C(a, b, c, d) {
            g.isArray(c) ? g.each(c, function (c, d) {
                g.isArray(d) ? C(a, b, d[0], d[1]) : C(a, b, d)
            }) : (d === n && (d = c), b[c] !== n && (a[d] = b[c]))
        }
        function Fb(a, b, c) {
            var d, e;
            for (e in b) b.hasOwnProperty(e) && (d = b[e], g.isPlainObject(d) ? (g.isPlainObject(a[e]) || (a[e] = {}),
                g.extend(!0, a[e], d)) : a[e] = c && "data" !== e && "aaData" !== e && g.isArray(d) ? d.slice() : d);
            return a
        }
        function Qa(a, b, c) {
            g(a).bind("click.DT", b, function (b) {
                a.blur();
                c(b)
            }).bind("keypress.DT", b, function (a) {
                13 === a.which && c(a)
            }).bind("selectstart.DT", function () {
                return !1
            })
        }
        function z(a, b, c, d) {
            c && a[b].push({
                fn: c,
                sName: d
            })
        }
        function u(a, b, c, d) {
            var e = [];
            b && (e = g.map(a[b].slice().reverse(), function (b) {
                return b.fn.apply(a.oInstance, d)
            }));
            null !== c && g(a.nTable).trigger(c + ".dt", d);
            return e
        }
        function Oa(a) {
            var b = a._iDisplayStart,
                c = a.fnDisplayEnd(),
                d = a._iDisplayLength;
            c === a.fnRecordsDisplay() && (b = c - d);
            if (-1 === d || 0 > b) b = 0;
            a._iDisplayStart = b
        }
        function La(a, b) {
            var c = a.renderer,
                d = o.ext.renderer[b];
            return g.isPlainObject(c) && c[b] ? d[c[b]] || d._ : "string" === typeof c ? d[c] || d._ : d._
        }
        function D(a) {
            return a.oFeatures.bServerSide ? "ssp" :
                a.ajax || a.sAjaxSource ? "ajax" : "dom"
        }
        function Ra(a, b) {
            var c = [],
                c = Gb.numbers_length,
                d = Math.floor(c / 2);
            b <= c ? c = ba(0, b) : a <= d ? (c = ba(0, c - 2), c.push("ellipsis"), c.push(b - 1)) : (a >= b - 1 - d ?
                c = ba(b - (c - 2), b) : (c = ba(a - 1, a + 2), c.push("ellipsis"), c.push(b - 1)), c.splice(0, 0,
                "ellipsis"), c.splice(0, 0, 0));
            c.DT_el = "span";
            return c
        }
        var o, y, s, q, v, Hb = /[\r\n]/g,
            va = /<.*?>/g,
            Sa = /[',$\u00a3\u20ac\u00a5%]/g,
            Rb = /^[\d\+\-a-zA-Z]/,
            ca = function (a) {
                return !a || "-" === a ? !0 : !1
            }, Ib = function (a) {
                var b = parseInt(a, 10);
                return !isNaN(b) && isFinite(a) ? b :
                    null
            }, Ta = function (a, b) {
                b && "string" === typeof a && (a = a.replace(Sa, ""));
                return !a || "-" === a || !isNaN(parseFloat(a)) && isFinite(a)
            }, Jb = function (a, b) {
                return ca(a) ? !0 : a && "string" !== typeof a ? null : Ta(a.replace(va, ""), b) ? !0 : null
            }, B = function (a, b, c) {
                var d = [],
                    e = 0,
                    f = a.length;
                if (c !== n) for (; e < f; e++) a[e] && a[e][b] && d.push(a[e][b][c]);
                else for (; e < f; e++) a[e] && d.push(a[e][b]);
                return d
            }, wa = function (a, b, c, d) {
                var e = [],
                    f = 0,
                    i = b.length;
                if (d !== n) for (; f < i; f++) e.push(a[b[f]][c][d]);
                else for (; f < i; f++) e.push(a[b[f]][c]);
                return e
            }, ba = function (a, b) {
                var c = [],
                    d;
                b === n ? (b = 0, d = a) : (d = b, b = a);
                for (var e = b; e < d; e++) c.push(e);
                return c
            }, Ja = function (a) {
                var b = [],
                    c, d, e = a.length,
                    f, i = 0;
                d = 0;
                a: for (; d < e; d++) {
                    c = a[d];
                    for (f = 0; f < i; f++) if (b[f] === c) continue a;
                    b.push(c);
                    i++
                }
                return b
            }, A = function (a, b, c) {
                a[b] !== n && (a[c] = a[b])
            }, Z = /\[.*?\]$/,
            P = /\(\)$/,
            qa = g("<div>")[0],
            Pb = qa.textContent !== n,
            Qb = /<.*?>/g;
        o = function (a) {
            function b(a) {
                return function () {
                    var b = [ua(this[o.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                    return o.ext.internal[a].apply(this,
                        b)
                }
            }
            this.$ = function (a, b) {
                return this.api(!0).$(a, b)
            };
            this._ = function (a, b) {
                return this.api(!0).rows(a, b).data()
            };
            this.api = function (a) {
                return a ? new s(ua(this[y.iApiIndex])) : new s(this)
            };
            this.fnAddData = function (a, b) {
                var c = this.api(!0),
                    d = g.isArray(a) && (g.isArray(a[0]) || g.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a);
                (b === n || b) && c.draw();
                return d.flatten().toArray()
            };
            this.fnAdjustColumnSizing = function (a) {
                var b = this.api(!0).columns.adjust(),
                    c = b.settings()[0],
                    d = c.oScroll;
                a === n || a ? b.draw(!1) : ("" !== d.sX ||
                    "" !== d.sY) && W(c)
            };
            this.fnClearTable = function (a) {
                var b = this.api(!0).clear();
                (a === n || a) && b.draw()
            };
            this.fnClose = function (a) {
                this.api(!0).row(a).child.hide()
            };
            this.fnDeleteRow = function (a, b, c) {
                var d = this.api(!0),
                    a = d.rows(a),
                    e = a.settings()[0],
                    f = e.aoData[a[0][0]];
                a.remove();
                b && b.call(this, e, f);
                (c === n || c) && d.draw();
                return f
            };
            this.fnDestroy = function (a) {
                this.api(!0).destroy(a)
            };
            this.fnDraw = function (a) {
                this.api(!0).draw(!a)
            };
            this.fnFilter = function (a, b, c, d, e, f) {
                e = this.api(!0);
                null === b || b === n ? e.search(a, c, d,
                    f) : e.column(b).search(a, c, d, f);
                e.draw()
            };
            this.fnGetData = function (a, b) {
                var c = this.api(!0);
                if (a !== n) {
                    var d = a.nodeName ? a.nodeName.toLowerCase() : "";
                    return b !== n || "td" == d || "th" == d ? c.cell(a, b).data() : c.row(a).data()
                }
                return c.data().toArray()
            };
            this.fnGetNodes = function (a) {
                var b = this.api(!0);
                return a !== n ? b.row(a).node() : b.rows().nodes().toArray()
            };
            this.fnGetPosition = function (a) {
                var b = this.api(!0),
                    c = a.nodeName.toUpperCase();
                return "TR" == c ? b.row(a).index() : "TD" == c || "TH" == c ? (a = b.cell(a).index(), [a.row, a.columnVisible,
                    a.column]) : null
            };
            this.fnIsOpen = function (a) {
                return this.api(!0).row(a).child.isShown()
            };
            this.fnOpen = function (a, b, c) {
                return this.api(!0).row(a).child(b, c).show()
            };
            this.fnPageChange = function (a, b) {
                var c = this.api(!0).page(a);
                (b === n || b) && c.draw(!1)
            };
            this.fnSetColumnVis = function (a, b, c) {
                a = this.api(!0).column(a).visible(b);
                (c === n || c) && a.columns.adjust().draw()
            };
            this.fnSettings = function () {
                return ua(this[y.iApiIndex])
            };
            this.fnSort = function (a) {
                this.api(!0).order(a).draw()
            };
            this.fnSortListener = function (a, b, c) {
                this.api(!0).order.listener(a,
                    b, c)
            };
            this.fnUpdate = function (a, b, c, d, e) {
                var f = this.api(!0);
                c === n || null === c ? f.row(b).data(a) : f.cell(b, c).data(a);
                (e === n || e) && f.columns.adjust();
                (d === n || d) && f.draw();
                return 0
            };
            this.fnVersionCheck = y.fnVersionCheck;
            this.oApi = this.internal = {
                _fnExternApiFunc: b,
                _fnBuildAjax: na,
                _fnAjaxUpdate: db,
                _fnAjaxParameters: mb,
                _fnAjaxUpdateDraw: nb,
                _fnAjaxDataSrc: oa,
                _fnAddColumn: Aa,
                _fnColumnOptions: fa,
                _fnAdjustColumnSizing: V,
                _fnVisibleToColumnIndex: ga,
                _fnColumnIndexToVisible: X,
                _fnVisbleColumns: Y,
                _fnGetColumns: N,
                _fnColumnTypes: Da,
                _fnApplyColumnDefs: $a,
                _fnHungarianMap: T,
                _fnCamelToHungarian: J,
                _fnLanguageCompat: za,
                _fnBrowserDetect: Za,
                _fnAddData: I,
                _fnAddTr: ha,
                _fnNodeToDataIndex: ab,
                _fnNodeToColumnIndex: Ob,
                _fnGetRowData: bb,
                _fnGetCellData: x,
                _fnSetCellData: Ea,
                _fnSplitObjNotation: Ga,
                _fnGetObjectDataFn: U,
                _fnSetObjectDataFn: Ba,
                _fnGetDataMaster: Ha,
                _fnClearTable: ja,
                _fnDeleteIndex: ka,
                _fnInvalidateRow: la,
                _fnGetRowElements: ia,
                _fnCreateTr: Fa,
                _fnBuildHead: cb,
                _fnDrawHead: K,
                _fnDraw: L,
                _fnReDraw: M,
                _fnAddOptionsHtml: fb,
                _fnDetectHeader: $,
                _fnGetUniqueThs: ma,
                _fnFeatureHtmlFilter: hb,
                _fnFilterComplete: aa,
                _fnFilterCustom: qb,
                _fnFilterColumn: pb,
                _fnFilter: ob,
                _fnFilterCreateSearch: Ma,
                _fnEscapeRegex: sb,
                _fnFilterData: rb,
                _fnFeatureHtmlInfo: kb,
                _fnUpdateInfo: tb,
                _fnInfoMacros: ub,
                _fnInitialise: ra,
                _fnInitComplete: pa,
                _fnLengthChange: Na,
                _fnFeatureHtmlLength: gb,
                _fnFeatureHtmlPaginate: lb,
                _fnPageChange: Pa,
                _fnFeatureHtmlProcessing: ib,
                _fnProcessingDisplay: F,
                _fnFeatureHtmlTable: jb,
                _fnScrollDraw: W,
                _fnApplyToChildren: H,
                _fnCalculateColumnWidths: Ca,
                _fnThrottle: yb,
                _fnConvertToWidth: vb,
                _fnScrollingWidthAdjust: xb,
                _fnGetWidestNode: wb,
                _fnGetMaxLenString: zb,
                _fnStringToCss: t,
                _fnScrollBarWidth: Ab,
                _fnSortFlatten: Q,
                _fnSort: eb,
                _fnSortAria: Cb,
                _fnSortListener: Db,
                _fnSortAttachListener: Ka,
                _fnSortingClasses: sa,
                _fnSortData: Bb,
                _fnSaveState: ta,
                _fnLoadState: Eb,
                _fnSettingsFromNode: ua,
                _fnLog: O,
                _fnMap: C,
                _fnBindAction: Qa,
                _fnCallbackReg: z,
                _fnCallbackFire: u,
                _fnLengthOverflow: Oa,
                _fnRenderer: La,
                _fnDataSource: D,
                _fnRowAttributes: Ia,
                _fnCalculateEnd: function () {}
            };
            g.extend(o.ext.internal, this.internal);
            for (var c in o.ext.internal) c &&
            (this[c] = b(c));
            var d = this,
                e = a === n,
                f = this.length;
            e && (a = {});
            this.each(function () {
                var b = {}, c = 1 < f ? Fb(b, a, !0) : a,
                    h = 0,
                    k, l = this.getAttribute("id"),
                    b = !1,
                    r = o.defaults;
                if ("table" != this.nodeName.toLowerCase()) O(null, 0, "Non-table node initialisation (" + this.nodeName +
                    ")", 2);
                else {
                    ea(r);
                    Ya(r.column);
                    J(r, r, !0);
                    J(r.column, r.column, !0);
                    J(r, c);
                    var p = o.settings,
                        h = 0;
                    for (k = p.length; h < k; h++) {
                        if (p[h].nTable == this) {
                            k = c.bRetrieve !== n ? c.bRetrieve : r.bRetrieve;
                            if (e || k) return p[h].oInstance;
                            if (c.bDestroy !== n ? c.bDestroy : r.bDestroy) {
                                p[h].oInstance.fnDestroy();
                                break
                            } else {
                                O(p[h], 0, "Cannot reinitialise DataTable", 3);
                                return
                            }
                        }
                        if (p[h].sTableId == this.id) {
                            p.splice(h, 1);
                            break
                        }
                    }
                    if (null === l || "" === l) this.id = l = "DataTables_Table_" + o.ext._unique++;
                    var m = g.extend(!0, {}, o.models.oSettings, {
                        nTable: this,
                        oApi: d.internal,
                        oInit: c,
                        sDestroyWidth: g(this)[0].style.width,
                        sInstance: l,
                        sTableId: l
                    });
                    p.push(m);
                    m.oInstance = 1 === d.length ? d : g(this).dataTable();
                    ea(c);
                    c.oLanguage && za(c.oLanguage);
                    c.aLengthMenu && !c.iDisplayLength && (c.iDisplayLength = g.isArray(c.aLengthMenu[0]) ? c.aLengthMenu[
                            0][0] :
                        c.aLengthMenu[0]);
                    c = Fb(g.extend(!0, {}, r), c);
                    C(m.oFeatures, c,
                        "bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender"
                            .split(" "));
                    C(m, c, ["asStripeClasses", "ajax", "fnServerData", "fnFormatNumber", "sServerMethod", "aaSorting",
                        "aaSortingFixed", "aLengthMenu", "sPaginationType", "sAjaxSource", "sAjaxDataProp",
                        "iStateDuration", "sDom", "bSortCellsTop", "iTabIndex", "fnStateLoadCallback",
                        "fnStateSaveCallback", "renderer", ["iCookieDuration", "iStateDuration"],
                        ["oSearch", "oPreviousSearch"], ["aoSearchCols", "aoPreSearchCols"], ["iDisplayLength",
                            "_iDisplayLength"], ["bJQueryUI", "bJUI"]]);
                    C(m.oScroll, c, [["sScrollX", "sX"], ["sScrollXInner", "sXInner"], ["sScrollY", "sY"], [
                        "bScrollCollapse", "bCollapse"]]);
                    C(m.oLanguage, c, "fnInfoCallback");
                    z(m, "aoDrawCallback", c.fnDrawCallback, "user");
                    z(m, "aoServerParams", c.fnServerParams, "user");
                    z(m, "aoStateSaveParams", c.fnStateSaveParams, "user");
                    z(m, "aoStateLoadParams", c.fnStateLoadParams, "user");
                    z(m, "aoStateLoaded", c.fnStateLoaded,
                        "user");
                    z(m, "aoRowCallback", c.fnRowCallback, "user");
                    z(m, "aoRowCreatedCallback", c.fnCreatedRow, "user");
                    z(m, "aoHeaderCallback", c.fnHeaderCallback, "user");
                    z(m, "aoFooterCallback", c.fnFooterCallback, "user");
                    z(m, "aoInitComplete", c.fnInitComplete, "user");
                    z(m, "aoPreDrawCallback", c.fnPreDrawCallback, "user");
                    c.bJQueryUI ? (g.extend(m.oClasses, o.ext.oJUIClasses, c.oClasses), c.sDom === r.sDom && "lfrtip" ===
                    r.sDom && (m.sDom = '<"H"lfr>t<"F"ip>'), m.renderer) ? g.isPlainObject(m.renderer) && !m.renderer
                        .header && (m.renderer.header =
                        "jqueryui") : m.renderer = "jqueryui" : g.extend(m.oClasses, o.ext.classes, c.oClasses);
                    g(this).addClass(m.oClasses.sTable);
                    if ("" !== m.oScroll.sX || "" !== m.oScroll.sY) m.oScroll.iBarWidth = Ab();
                    !0 === m.oScroll.sX && (m.oScroll.sX = "100%");
                    m.iInitDisplayStart === n && (m.iInitDisplayStart = c.iDisplayStart, m._iDisplayStart = c.iDisplayStart);
                    null !== c.iDeferLoading && (m.bDeferLoading = !0, h = g.isArray(c.iDeferLoading), m._iRecordsDisplay =
                        h ? c.iDeferLoading[0] : c.iDeferLoading, m._iRecordsTotal = h ? c.iDeferLoading[1] : c.iDeferLoading);
                    "" !== c.oLanguage.sUrl ? (m.oLanguage.sUrl = c.oLanguage.sUrl, g.getJSON(m.oLanguage.sUrl, null, function (
                        a) {
                        za(a);
                        J(r.oLanguage, a);
                        g.extend(true, m.oLanguage, c.oLanguage, a);
                        ra(m)
                    }), b = !0) : g.extend(!0, m.oLanguage, c.oLanguage);
                    null === c.asStripeClasses && (m.asStripeClasses = [m.oClasses.sStripeOdd, m.oClasses.sStripeEven]);
                    var h = m.asStripeClasses,
                        q = g("tbody tr:eq(0)", this); - 1 !== g.inArray(!0, g.map(h, function (a) {
                        return q.hasClass(a)
                    })) && (g("tbody tr", this).removeClass(h.join(" ")), m.asDestroyStripes = h.slice());
                    l = [];
                    h = this.getElementsByTagName("thead");
                    0 !== h.length && ($(m.aoHeader, h[0]), l = ma(m));
                    if (null === c.aoColumns) {
                        p = [];
                        h = 0;
                        for (k = l.length; h < k; h++) p.push(null)
                    } else p = c.aoColumns;
                    h = 0;
                    for (k = p.length; h < k; h++) Aa(m, l ? l[h] : null);
                    $a(m, c.aoColumnDefs, p, function (a, b) {
                        fa(m, a, b)
                    });
                    if (q.length) {
                        var s = function (a, b) {
                            return a.getAttribute("data-" + b) ? b : null
                        };
                        g.each(ia(m, q[0]).cells, function (a, b) {
                            var c = m.aoColumns[a];
                            if (c.mData === a) {
                                var d = s(b, "sort") || s(b, "order"),
                                    e = s(b, "filter") || s(b, "search");
                                if (d !== null || e !== null) {
                                    c.mData = {
                                        _: a + ".display",
                                        sort: d !== null ? a + ".@data-" + d : n,
                                        type: d !== null ? a + ".@data-" + d : n,
                                        filter: e !== null ? a + ".@data-" + e : n
                                    };
                                    fa(m, a)
                                }
                            }
                        })
                    }
                    c.bStateSave && (m.oFeatures.bStateSave = !0, Eb(m, c), z(m, "aoDrawCallback", ta, "state_save"));
                    if (c.aaSorting === n) {
                        h = 0;
                        for (k = m.aaSorting.length; h < k; h++) m.aaSorting[h][1] = m.aoColumns[h].asSorting[0]
                    }
                    sa(m);
                    m.oFeatures.bSort && z(m, "aoDrawCallback", function () {
                        if (m.bSorted) {
                            var a = Q(m),
                                b = {};
                            g.each(a, function (a, c) {
                                b[c.src] = c.dir
                            });
                            u(m, null, "order", [m, a, b]);
                            sa(m);
                            Cb(m)
                        }
                    });
                    Za(m);
                    h = g(this).children("caption").each(function () {
                        this._captionSide =
                            g(this).css("caption-side")
                    });
                    k = g(this).children("thead");
                    0 === k.length && (k = g("<thead/>").appendTo(this));
                    m.nTHead = k[0];
                    k = g(this).children("tbody");
                    0 === k.length && (k = g("<tbody/>").appendTo(this));
                    m.nTBody = k[0];
                    k = g(this).children("tfoot");
                    if (0 === k.length && 0 < h.length && ("" !== m.oScroll.sX || "" !== m.oScroll.sY)) k = g(
                        "<tfoot/>").appendTo(this);
                    0 === k.length || 0 === k.children().length ? g(this).addClass(m.oClasses.sNoFooter) : 0 < k.length &&
                        (m.nTFoot = k[0], $(m.aoFooter, m.nTFoot));
                    if (c.aaData) for (h = 0; h < c.aaData.length; h++) I(m,
                        c.aaData[h]);
                    else(m.bDeferLoading || "dom" == D(m)) && ha(m, g(m.nTBody).children("tr"));
                    m.aiDisplay = m.aiDisplayMaster.slice();
                    m.bInitialised = !0;
                    !1 === b && ra(m)
                }
            });
            d = null;
            return this
        };
        var Kb = [],
            w = Array.prototype;
        o.Api = s = function (a, b) {
            if (!this instanceof s) throw "DT API must be constructed as a new object";
            var c = [],
                d = function (a) {
                    var b, d, e = o.settings,
                        f = g.map(e, function (a) {
                            return a.nTable
                        });
                    a.nTable && a.oApi ? a = [a] : a.nodeName && "table" === a.nodeName.toLowerCase() ? (b = g.inArray(
                        a, f), a = -1 !== b ? [e[b]] : null) : ("string" ===
                    typeof a ? d = g(a) : a instanceof g && (d = a), a = d ? d.map(function () {
                        b = g.inArray(this, f);
                        return -1 !== b ? e[b] : null
                    }).toArray() : void 0);
                    a && c.push.apply(c, a)
                };
            if (g.isArray(a)) for (var e = 0, f = a.length; e < f; e++) d(a[e]);
            else d(a);
            this.context = Ja(c);
            b && this.push.apply(this, b.toArray ? b.toArray() : b);
            this.selector = {
                rows: null,
                cols: null,
                opts: null
            };
            s.extend(this, this, Kb)
        };
        s.prototype = {
            concat: w.concat,
            context: [],
            each: function (a) {
                if (w.forEach) w.forEach.call(this, a, this);
                else for (var b = 0, c = this.length; b < c; b++) a.call(this, this[b],
                    b, this);
                return this
            },
            filter: function (a) {
                var b = [];
                if (w.filter) b = w.filter.call(this, a, this);
                else for (var c = 0, d = this.length; c < d; c++) a.call(this, this[c], c, this) && b.push(this[c]);
                return new s(this.context, b)
            },
            flatten: function () {
                var a = [];
                return new s(this.context, a.concat.apply(a, this.toArray()))
            },
            join: w.join,
            indexOf: w.indexOf || function (a, b) {
                for (var c = b || 0, d = this.length; c < d; c++) if (this[c] === a) return c;
                return -1
            },
            iterator: function (a, b, c) {
                var d = [],
                    e, f, g, j, h, k = this.context,
                    l, r, p = this.selector;
                "string" === typeof a &&
                (c = b, b = a, a = !1);
                f = 0;
                for (g = k.length; f < g; f++) if ("table" === b) e = c(k[f], f), e !== n && d.push(e);
                else if ("columns" === b || "rows" === b) e = c(k[f], this[f], f), e !== n && d.push(e);
                else if ("column" === b || "column-rows" === b || "row" === b || "cell" === b) {
                    r = this[f];
                    "column-rows" === b && (l = Ua(k[f], p.opts));
                    j = 0;
                    for (h = r.length; j < h; j++) e = r[j], e = "cell" === b ? c(k[f], e.row, e.column, f, j) : c(k[f],
                        e, f, j, l), e !== n && d.push(e)
                }
                return d.length ? (a = new s(k, a ? d.concat.apply([], d) : d), b = a.selector, b.rows = p.rows, b.cols =
                    p.cols, b.opts = p.opts, a) : this
            },
            lastIndexOf: w.lastIndexOf || function (a, b) {
                return this.indexOf.apply(this.toArray.reverse(), arguments)
            },
            length: 0,
            map: function (a) {
                var b = [];
                if (w.map) b = w.map.call(this, a, this);
                else for (var c = 0, d = this.length; c < d; c++) b.push(a.call(this, this[c], c));
                return new s(this.context, b)
            },
            pluck: function (a) {
                return this.map(function (b) {
                    return b[a]
                })
            },
            pop: w.pop,
            push: w.push,
            reduce: w.reduce || function (a, b) {
                var c, d = !1;
                1 < arguments.length && (c = b, d = !0);
                for (var e = 0, f = this.length; e < f; e++) this.hasOwnProperty(e) && (c = d ? a(c, this[e], e, this) :
                    this[e], d = !0);
                return c
            },
            reduceRight: w.reduceRight || function (a, b) {
                var c, d = !1;
                1 < arguments.length && (c = b, d = !0);
                for (var e = this.length - 1; 0 <= e; e--) this.hasOwnProperty(e) && (c = d ? a(c, this[e], e, this) :
                    this[e], d = !0);
                return c
            },
            reverse: w.reverse,
            selector: null,
            shift: w.shift,
            sort: w.sort,
            splice: w.splice,
            toArray: function () {
                return w.slice.call(this)
            },
            to$: function () {
                return g(this)
            },
            toJQuery: function () {
                return g(this)
            },
            unique: function () {
                return new s(this.context, Ja(this))
            },
            unshift: w.unshift
        };
        s.extend = function (a, b, c) {
            if (b && (b instanceof s || b.__dt_wrapper)) {
                var d,
                    e, f, g = function (b, c) {
                        return function () {
                            var d = b.apply(a, arguments);
                            s.extend(d, d, c.methodExt);
                            return d
                        }
                    };
                d = 0;
                for (e = c.length; d < e; d++) f = c[d], b[f.name] = "function" === typeof f.val ? g(f.val, f) : f.val,
                    b[f.name].__dt_wrapper = !0, s.extend(a, b[f.name], f.propExt)
            }
        };
        s.register = q = function (a, b) {
            if (g.isArray(a)) for (var c = 0, d = a.length; c < d; c++) s.register(a[c], b);
            else {
                for (var e = a.split("."), f = Kb, i, j, c = 0, d = e.length; c < d; c++) {
                    i = (j = -1 !== e[c].indexOf("()")) ? e[c].replace("()", "") : e[c];
                    var h;
                    a: {
                        h = 0;
                        for (var k = f.length; h < k; h++) if (f[h].name ===
                            i) {
                            h = f[h];
                            break a
                        }
                        h = null
                    }
                    h || (h = {
                        name: i,
                        val: {},
                        methodExt: [],
                        propExt: []
                    }, f.push(h));
                    c === d - 1 ? h.val = b : f = j ? h.methodExt : h.propExt
                }
                s.ready && o.api.build()
            }
        };
        s.registerPlural = v = function (a, b, c) {
            s.register(a, c);
            s.register(b, function () {
                var a = c.apply(this, arguments);
                return a === this ? this : a instanceof s ? a.length ? g.isArray(a[0]) ? new s(a.context, a[0]) : a[0] :
                    n : a
            })
        };
        q("tables()", function (a) {
            var b;
            if (a) {
                b = s;
                var c = this.context;
                if ("number" === typeof a) a = [c[a]];
                else var d = g.map(c, function (a) {
                        return a.nTable
                    }),
                    a = g(d).filter(a).map(function () {
                        var a =
                            g.inArray(this, d);
                        return c[a]
                    }).toArray();
                b = new b(a)
            } else b = this;
            return b
        });
        q("table()", function (a) {
            var a = this.tables(a),
                b = a.context;
            b.length && (b.length = 1);
            return a
        });
        v("tables().nodes()", "table().node()", function () {
            return this.iterator("table", function (a) {
                return a.nTable
            })
        });
        v("tables().body()", "table().body()", function () {
            return this.iterator("table", function (a) {
                return a.nTBody
            })
        });
        v("tables().header()", "table().header()", function () {
            return this.iterator("table", function (a) {
                return a.nTHead
            })
        });
        v("tables().footer()",
            "table().footer()", function () {
                return this.iterator("table", function (a) {
                    return a.nTFoot
                })
            });
        q("draw()", function (a) {
            return this.iterator("table", function (b) {
                M(b, !1 === a)
            })
        });
        q("page()", function (a) {
            return a === n ? this.page.info().page : this.iterator("table", function (b) {
                Pa(b, a)
            })
        });
        q("page.info()", function () {
            if (0 === this.context.length) return n;
            var a = this.context[0],
                b = a._iDisplayStart,
                c = a._iDisplayLength,
                d = a.fnRecordsDisplay(),
                e = -1 === c;
            return {
                page: e ? 0 : Math.floor(b / c),
                pages: e ? 1 : Math.ceil(d / c),
                start: b,
                end: a.fnDisplayEnd(),
                length: c,
                recordsTotal: a.fnRecordsTotal(),
                recordsDisplay: d
            }
        });
        q("page.len()", function (a) {
            return a === n ? 0 !== this.context.length ? this.context[0]._iDisplayLength : n : this.iterator("table", function (
                b) {
                Na(b, a)
            })
        });
        var Lb = function (a, b, c) {
            "ssp" == D(a) ? M(a, b) : na(a, [], function (d) {
                ja(a);
                for (var e = oa(a, d), f = 0, g = e.length; f < g; f++) I(a, e[f]);
                M(a, b);
                c && c(d)
            })
        };
        q("ajax.json()", function () {
            var a = this.context;
            if (0 < a.length) return a[0].json
        });
        q("ajax.reload()", function (a, b) {
            return this.iterator("table", function (c) {
                Lb(c, !1 ===
                    b, a)
            })
        });
        q("ajax.url()", function (a) {
            var b = this.context;
            if (a === n) {
                if (0 === b.length) return n;
                b = b[0];
                return b.ajax ? g.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource
            }
            return this.iterator("table", function (b) {
                g.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a
            })
        });
        q("ajax.url().load()", function (a, b) {
            return this.iterator("table", function (c) {
                Lb(c, !1 === b, a)
            })
        });
        var Va = function (a, b) {
            var c = [],
                d, e, f, i, j, h;
            g.isArray(a) || (a = [a]);
            f = 0;
            for (i = a.length; f < i; f++) {
                e = a[f] && a[f].split ? a[f].split(",") : [a[f]];
                j = 0;
                for (h = e.length; j <
                h; j++)(d = b("string" === typeof e[j] ? g.trim(e[j]) : e[j])) && d.length && c.push.apply(c, d)
            }
            return c
        }, Wa = function (a) {
            a || (a = {});
            a.filter && !a.search && (a.search = a.filter);
            return {
                search: a.search || "none",
                order: a.order || "current",
                page: a.page || "all"
            }
        }, Xa = function (a) {
            for (var b = 0, c = a.length; b < c; b++) if (0 < a[b].length) return a[0] = a[b], a.length = 1, a.context = [
                a.context[b]], a;
            a.length = 0;
            return a
        }, Ua = function (a, b) {
            var c, d, e, f = [],
                i = a.aiDisplay;
            c = a.aiDisplayMaster;
            var j = b.search;
            d = b.order;
            if ("current" == b.page) {
                c = a._iDisplayStart;
                for (d = a.fnDisplayEnd(); c < d; c++) f.push(i[c])
            } else if ("current" == d || "applied" == d) f = "none" == j ? c.slice() : "applied" == j ? i.slice() :
                g.map(c, function (a) {
                    return -1 === g.inArray(a, i) ? a : null
                });
            else if ("index" == d || "original" == d) {
                c = 0;
                for (d = a.aoData.length; c < d; c++) "none" == j ? f.push(c) : (e = g.inArray(c, i), (-1 === e &&
                    "removed" == j || 1 === e && "applied" == j) && f.push(c))
            }
            return f
        };
        q("rows()", function (a, b) {
            a === n ? a = "" : g.isPlainObject(a) && (b = a, a = "");
            var b = Wa(b),
                c = this.iterator("table", function (c) {
                    var e = b;
                    return Va(a, function (a) {
                        var b =
                            Ib(a);
                        if (b !== null && !e) return [b];
                        var j = Ua(c, e);
                        if (b !== null && g.inArray(b, j) !== -1) return [b];
                        if (!a) return j;
                        for (var b = [], h = 0, k = j.length; h < k; h++) b.push(c.aoData[j[h]].nTr);
                        return a.nodeName && g.inArray(a, b) !== -1 ? [a._DT_RowIndex] : g(b).filter(a).map(function () {
                            return this._DT_RowIndex
                        }).toArray()
                    })
                });
            c.selector.rows = a;
            c.selector.opts = b;
            return c
        });
        v("rows().nodes()", "row().node()", function () {
            return this.iterator("row", function (a, b) {
                return a.aoData[b].nTr || n
            })
        });
        q("rows().data()", function () {
            return this.iterator(!0,
                "rows", function (a, b) {
                    return wa(a.aoData, b, "_aData")
                })
        });
        v("rows().cache()", "row().cache()", function (a) {
            return this.iterator("row", function (b, c) {
                var d = b.aoData[c];
                return "search" === a ? d._aFilterData : d._aSortData
            })
        });
        v("rows().invalidate()", "row().invalidate()", function (a) {
            return this.iterator("row", function (b, c) {
                la(b, c, a)
            })
        });
        v("rows().indexes()", "row().index()", function () {
            return this.iterator("row", function (a, b) {
                return b
            })
        });
        v("rows().remove()", "row().remove()", function () {
            var a = this;
            return this.iterator("row", function (b, c, d) {
                var e = b.aoData;
                e.splice(c, 1);
                for (var f = 0, i = e.length; f < i; f++) null !== e[f].nTr && (e[f].nTr._DT_RowIndex = f);
                g.inArray(c, b.aiDisplay);
                ka(b.aiDisplayMaster, c);
                ka(b.aiDisplay, c);
                ka(a[d], c, !1);
                Oa(b)
            })
        });
        q("rows.add()", function (a) {
            var b = this.iterator("table", function (b) {
                    var c, f, g, j = [];
                    f = 0;
                    for (g = a.length; f < g; f++) c = a[f], c.nodeName && "TR" === c.nodeName.toUpperCase() ? j.push(ha(b,
                        c)[0]) : j.push(I(b, c));
                    return j
                }),
                c = this.rows(-1);
            c.pop();
            c.push.apply(c, b.toArray());
            return c
        });
        q("row()", function (a, b) {
            return Xa(this.rows(a,
                b))
        });
        q("row().data()", function (a) {
            var b = this.context;
            if (a === n) return b.length && this.length ? b[0].aoData[this[0]]._aData : n;
            b[0].aoData[this[0]]._aData = a;
            la(b[0], this[0], "data");
            return this
        });
        q("row.add()", function (a) {
            a instanceof g && a.length && (a = a[0]);
            var b = this.iterator("table", function (b) {
                return a.nodeName && "TR" === a.nodeName.toUpperCase() ? ha(b, a)[0] : I(b, a)
            });
            return this.row(b[0])
        });
        var Mb = function (a) {
            var b = this.context;
            if (b.length && this.length) {
                var c = b[0].aoData[this[0]];
                if (c._details) {
                    (c._detailsShow =
                        a) ? c._details.insertAfter(c.nTr) : c._details.remove();
                    var d = b[0],
                        e = g(d.nTable);
                    e.off("draw.DT_details");
                    e.off("column-visibility.DT_details");
                    0 < B(d.aoData, "_details").length && (e.on("draw.DT_details", function () {
                        e.find("tbody tr").each(function () {
                            var a = ab(d, this),
                                a = d.aoData[a];
                            a._detailsShow && a._details.insertAfter(this)
                        })
                    }), e.on("column-visibility.DT_details", function (a, b) {
                        for (var c, d = Y(b), e = 0, g = b.aoData.length; e < g; e++) c = b.aoData[e], c._details && c._details
                            .children("td[colspan]").attr("colspan", d)
                    }))
                }
            }
            return this
        };
        q("row().child()", function (a, b) {
            var c = this.context;
            if (a === n) return c.length && this.length ? c[0].aoData[this[0]]._details : n;
            if (c.length && this.length) {
                var d = c[0],
                    c = c[0].aoData[this[0]],
                    e = [],
                    f = function (a, b) {
                        if (!a.nodeName || "tr" !== a.nodeName.toUpperCase()) a = g("<tr><td></td></tr>").find("td").html(
                            a).parent();
                        g("td", a).addClass(b)[0].colSpan = Y(d);
                        e.push(a[0])
                    };
                if (g.isArray(a) || a instanceof g) for (var i = 0, j = a.length; i < j; i++) f(a[i], b);
                else f(a, b);
                c._details && c._details.remove();
                c._details = g(e);
                c._detailsShow &&
                c._details.insertAfter(c.nTr)
            }
            return this
        });
        q(["row().child.show()", "row().child().show()"], function () {
            Mb.call(this, !0)
        });
        q(["row().child.hide()", "row().child().hide()"], function () {
            Mb.call(this, !1)
        });
        q("row().child.isShown()", function () {
            var a = this.context;
            return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1
        });
        var Sb = /^(.*):(name|visIdx|visible)$/;
        q("columns()", function (a, b) {
            a === n ? a = "" : g.isPlainObject(a) && (b = a, a = "");
            var b = Wa(b),
                c = this.iterator("table", function (b) {
                    var c = a,
                        f = b.aoColumns,
                        i = B(f, "sName"),
                        j = B(f, "nTh");
                    return Va(c, function (a) {
                        var c = Ib(a);
                        if (a === "") return ba(f.length);
                        if (c !== null) return [c >= 0 ? c : f.length + c];
                        var e = a.match(Sb);
                        if (e) switch (e[2]) {
                            case "visIdx":
                            case "visible":
                                a = parseInt(e[1], 10);
                                if (a < 0) {
                                    c = g.map(f, function (a, b) {
                                        return a.bVisible ? b : null
                                    });
                                    return [c[c.length + a]]
                                }
                                return [ga(b, a)];
                            case "name":
                                return g.map(i, function (a, b) {
                                    return a === e[1] ? b : null
                                })
                        } else return g(j).filter(a).map(function () {
                            return g.inArray(this, j)
                        }).toArray()
                    })
                });
            c.selector.cols = a;
            c.selector.opts = b;
            return c
        });
        v("columns().header()", "column().header()", function () {
            return this.iterator("column", function (a, b) {
                return a.aoColumns[b].nTh
            })
        });
        v("columns().footer()", "column().footer()", function () {
            return this.iterator("column", function (a, b) {
                return a.aoColumns[b].nTf
            })
        });
        v("columns().data()", "column().data()", function () {
            return this.iterator("column-rows", function (a, b, c, d, e) {
                for (var c = [], d = 0, f = e.length; d < f; d++) c.push(x(a, e[d], b, ""));
                return c
            })
        });
        v("columns().cache()", "column().cache()", function (a) {
            return this.iterator("column-rows", function (b, c, d, e, f) {
                return wa(b.aoData, f, "search" === a ? "_aFilterData" : "_aSortData", c)
            })
        });
        v("columns().nodes()", "column().nodes()", function () {
            return this.iterator("column-rows", function (a, b, c, d, e) {
                return wa(a.aoData, e, "anCells", b)
            })
        });
        v("columns().visible()", "column().visible()", function (a) {
            return this.iterator("column", function (b, c) {
                var d;
                var e = b.aoColumns;
                d = e[c];
                var f = b.aoData,
                    i, j, h;
                if (a === n) d = d.bVisible;
                else {
                    if (d.bVisible !== a) {
                        if (a) {
                            var k = g.inArray(!0, B(e, "bVisible"), c + 1);
                            i = 0;
                            for (j = f.length; i < j; i++) h =
                                f[i].nTr, e = f[i].anCells, h && h.insertBefore(e[c], e[k] || null)
                        } else g(B(b.aoData, "anCells", c)).remove(), d.bVisible = !1, K(b, b.aoHeader), K(b, b.aoFooter),
                            ta(b);
                        d.bVisible = a;
                        K(b, b.aoHeader);
                        K(b, b.aoFooter);
                        V(b);
                        (b.oScroll.sX || b.oScroll.sY) && W(b);
                        u(b, null, "column-visibility", [b, c, a]);
                        ta(b)
                    }
                    d = void 0
                }
                return d
            })
        });
        v("columns().indexes()", "column().index()", function (a) {
            return this.iterator("column", function (b, c) {
                return "visible" === a ? X(b, c) : c
            })
        });
        q("columns.adjust()", function () {
            return this.iterator("table", function (a) {
                V(a)
            })
        });
        q("column.index()", function (a, b) {
            if (0 !== this.context.length) {
                var c = this.context[0];
                if ("fromVisible" === a || "toData" === a) return X(c, b);
                if ("fromData" === a || "toVisible" === a) return ga(c, b)
            }
        });
        q("column()", function (a, b) {
            return Xa(this.columns(a, b))
        });
        q("cells()", function (a, b, c) {
            g.isPlainObject(a) && (c = a, a = null);
            g.isPlainObject(b) && (c = b, b = null);
            if (null === b || b === n) return this.iterator("table", function (b) {
                var d = a,
                    e = Wa(c),
                    f = b.aoData,
                    h = Ua(b, e),
                    e = wa(f, h, "anCells"),
                    i = g([].concat.apply([], e)),
                    j, k = b.aoColumns.length,
                    l, n, o, q;
                return Va(d, function (a) {
                    if (!a) {
                        l = [];
                        n = 0;
                        for (o = h.length; n < o; n++) {
                            j = h[n];
                            for (q = 0; q < k; q++) l.push({
                                row: j,
                                column: q
                            })
                        }
                        return l
                    }
                    return i.filter(a).map(function (a, b) {
                        j = b.parentNode._DT_RowIndex;
                        return {
                            row: j,
                            column: g.inArray(b, f[j].anCells)
                        }
                    })
                })
            });
            var d = this.columns(b, c),
                e = this.rows(a, c),
                f, i, j, h, k, l = this.iterator("table", function (a, b) {
                    f = [];
                    i = 0;
                    for (j = e[b].length; i < j; i++) {
                        h = 0;
                        for (k = d[b].length; h < k; h++) f.push({
                            row: e[b][i],
                            column: d[b][h]
                        })
                    }
                    return f
                });
            g.extend(l.selector, {
                cols: b,
                rows: a,
                opts: c
            });
            return l
        });
        v("cells().nodes()", "cell().node()", function () {
            return this.iterator("cell", function (a, b, c) {
                return a.aoData[b].anCells[c]
            })
        });
        q("cells().data()", function () {
            return this.iterator("cell", function (a, b, c) {
                return x(a, b, c)
            })
        });
        v("cells().cache()", "cell().cache()", function (a) {
            a = "search" === a ? "_aFilterData" : "_aSortData";
            return this.iterator("cell", function (b, c, d) {
                return b.aoData[c][a][d]
            })
        });
        v("cells().indexes()", "cell().index()", function () {
            return this.iterator("cell", function (a, b, c) {
                return {
                    row: b,
                    column: c,
                    columnVisible: X(a,
                        c)
                }
            })
        });
        q(["cells().invalidate()", "cell().invalidate()"], function (a) {
            var b = this.selector;
            this.rows(b.rows, b.opts).invalidate(a);
            return this
        });
        q("cell()", function (a, b, c) {
            return Xa(this.cells(a, b, c))
        });
        q("cell().data()", function (a) {
            var b = this.context,
                c = this[0];
            if (a === n) return b.length && c.length ? x(b[0], c[0].row, c[0].column) : n;
            Ea(b[0], c[0].row, c[0].column, a);
            la(b[0], c[0].row, "data", c[0].column);
            return this
        });
        q("order()", function (a, b) {
            var c = this.context;
            if (a === n) return 0 !== c.length ? c[0].aaSorting : n;
            "number" ===
            typeof a ? a = [[a, b]] : g.isArray(a[0]) || (a = Array.prototype.slice.call(arguments));
            return this.iterator("table", function (b) {
                b.aaSorting = a.slice()
            })
        });
        q("order.listener()", function (a, b, c) {
            return this.iterator("table", function (d) {
                Ka(d, a, b, c)
            })
        });
        q(["columns().order()", "column().order()"], function (a) {
            var b = this;
            return this.iterator("table", function (c, d) {
                var e = [];
                g.each(b[d], function (b, c) {
                    e.push([c, a])
                });
                c.aaSorting = e
            })
        });
        q("search()", function (a, b, c, d) {
            var e = this.context;
            return a === n ? 0 !== e.length ? e[0].oPreviousSearch.sSearch :
                n : this.iterator("table", function (e) {
                e.oFeatures.bFilter && aa(e, g.extend({}, e.oPreviousSearch, {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === d ? !0 : d
                }), 1)
            })
        });
        q(["columns().search()", "column().search()"], function (a, b, c, d) {
            return this.iterator("column", function (e, f) {
                var i = e.aoPreSearchCols;
                if (a === n) return i[f].sSearch;
                e.oFeatures.bFilter && (g.extend(i[f], {
                    sSearch: a + "",
                    bRegex: null === b ? !1 : b,
                    bSmart: null === c ? !0 : c,
                    bCaseInsensitive: null === d ? !0 : d
                }), aa(e, e.oPreviousSearch, 1))
            })
        });
        o.versionCheck = o.fnVersionCheck = function (a) {
            for (var b = o.version.split("."), a = a.split("."), c, d, e = 0, f = a.length; e < f; e++) if (c =
                parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d) return c > d;
            return !0
        };
        o.isDataTable = o.fnIsDataTable = function (a) {
            var b = g(a).get(0),
                c = !1;
            g.each(o.settings, function (a, e) {
                if (e.nTable === b || e.nScrollHead === b || e.nScrollFoot === b) c = !0
            });
            return c
        };
        o.tables = o.fnTables = function (a) {
            return jQuery.map(o.settings, function (b) {
                if (!a || a && g(b.nTable).is(":visible")) return b.nTable
            })
        };
        q("$()", function (a,
                           b) {
            var c = this.rows(b).nodes(),
                c = g(c);
            return g([].concat(c.filter(a).toArray(), c.find(a).toArray()))
        });
        g.each(["on", "one", "off"], function (a, b) {
            q(b + "()", function () {
                var a = Array.prototype.slice.call(arguments); - 1 === a[0].indexOf(".dt") && (a[0] += ".dt");
                var d = g(this.tables().nodes());
                d[b].apply(d, a);
                return this
            })
        });
        q("clear()", function () {
            return this.iterator("table", function (a) {
                ja(a)
            })
        });
        q("settings()", function () {
            return new s(this.context, this.context)
        });
        q("data()", function () {
            return this.iterator("table", function (a) {
                return B(a.aoData, "_aData")
            }).flatten()
        });
        q("destroy()", function (a) {
            a = a || !1;
            return this.iterator("table", function (b) {
                var c = b.nTableWrapper.parentNode,
                    d = b.oClasses,
                    e = b.nTable,
                    f = b.nTBody,
                    i = b.nTHead,
                    j = b.nTFoot,
                    h = g(e),
                    f = g(f),
                    k = g(b.nTableWrapper),
                    l = g.map(b.aoData, function (a) {
                        return a.nTr
                    }),
                    n;
                b.bDestroying = !0;
                u(b, "aoDestroyCallback", "destroy", [b]);
                a || (new s(b)).columns().visible(!0);
                k.unbind(".DT").find(":not(tbody *)").unbind(".DT");
                g(R).unbind(".DT-" + b.sInstance);
                e != i.parentNode && (h.children("thead").remove(),
                    h.append(i));
                j && e != j.parentNode && (h.children("tfoot").remove(), h.append(j));
                h.remove();
                k.remove();
                b.aaSorting = [];
                b.aaSortingFixed = [];
                sa(b);
                g(l).removeClass(b.asStripeClasses.join(" "));
                g("th, td", i).removeClass(d.sSortable + " " + d.sSortableAsc + " " + d.sSortableDesc + " " + d.sSortableNone);
                b.bJUI && (g("th span." + d.sSortIcon + ", td span." + d.sSortIcon, i).remove(), g("th, td", i).each(function () {
                    var a = g("div." + d.sSortJUIWrapper, this);
                    g(this).append(a.contents());
                    a.remove()
                }));
                a || c.insertBefore(e, b.nTableReinsertBefore);
                f.children().detach();
                f.append(l);
                h.css("width", b.sDestroyWidth).removeClass(d.sTable);
                (n = b.asDestroyStripes.length) && f.children().each(function (a) {
                    g(this).addClass(b.asDestroyStripes[a % n])
                });
                c = g.inArray(b, o.settings); - 1 !== c && o.settings.splice(c, 1)
            })
        });
        o.version = "1.10.0-dev";
        o.settings = [];
        o.models = {};
        o.models.oSearch = {
            bCaseInsensitive: !0,
            sSearch: "",
            bRegex: !1,
            bSmart: !0
        };
        o.models.oRow = {
            nTr: null,
            anCells: null,
            _aData: [],
            _aSortData: null,
            _aFilterData: null,
            _sFilterRow: null,
            _sRowStripe: "",
            src: null
        };
        o.models.oColumn = {
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bVisible: null,
            _sManualType: null,
            _bAttrSrc: !1,
            fnCreatedCell: null,
            fnGetData: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        };
        o.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: [],
            ajax: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: !0,
            bDeferRender: !1,
            bDestroy: !1,
            bFilter: !0,
            bInfo: !0,
            bJQueryUI: !1,
            bLengthChange: !0,
            bPaginate: !0,
            bProcessing: !1,
            bRetrieve: !1,
            bScrollCollapse: !1,
            bServerSide: !1,
            bSort: !0,
            bSortMulti: !0,
            bSortCellsTop: !1,
            bSortClasses: !0,
            bStateSave: !1,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function (a) {
                return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sInfoThousands)
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: null,
            fnServerParams: null,
            fnStateLoadCallback: function (a) {
                try {
                    return JSON.parse(localStorage.getItem("DataTables_" + a.sInstance + "_" + R.location.pathname))
                } catch (b) {}
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSaveCallback: function (a, b) {
                try {
                    localStorage.setItem("DataTables_" + a.sInstance + "_" + R.location.pathname, JSON.stringify(b))
                } catch (c) {}
            },
            fnStateSaveParams: null,
            iStateDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iTabIndex: 0,
            oClasses: {},
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {
                    sFirst: "首页",
                    sLast: "尾页",
                    sNext: "下一页",
                    sPrevious: "上一页"
                },
                sEmptyTable: "表中没有数据",
                sInfo: "当前为第 _START_ 条到第 _END_ 条，共 _TOTAL_ 条数据",
                sInfoEmpty: "0条数据",
                sInfoFiltered: "(从 _MAX_ 条记录中过滤)",
                sInfoPostFix: "",
                sInfoThousands: ",",
                sLengthMenu: "展示 _MENU_ 的内容",
                sLoadingRecords: "加载中...",
                sProcessing: "处理中...",
                sSearch: "查找:",
                sUrl: "",
                sZeroRecords: "未找到记录"
            },
            oSearch: g.extend({}, o.models.oSearch),
            sAjaxDataProp: "data",
            sAjaxSource: null,
            sDom: "lfrtip",
            sPaginationType: "simple_numbers",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET",
            renderer: null
        };
        T(o.defaults);
        o.defaults.column = {
            aDataSort: null,
            iDataSort: -1,
            asSorting: ["asc", "desc"],
            bSearchable: !0,
            bSortable: !0,
            bVisible: !0,
            fnCreatedCell: null,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        };
        T(o.defaults.column);
        o.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortMulti: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bCollapse: null,
                iBarWidth: 0,
                sX: null,
                sXInner: null,
                sY: null
            },
            oLanguage: {
                fnInfoCallback: null
            },
            oBrowser: {
                bScrollOversize: !1,
                bScrollbarLeft: !1
            },
            ajax: null,
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: [],
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: !1,
            bInitialised: !1,
            aoOpenRows: [],
            sDom: null,
            sPaginationType: "two_button",
            iStateDuration: 0,
            aoStateSave: [],
            aoStateLoad: [],
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: !0,
            jqXHR: null,
            json: n,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: !1,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: !1,
            bSorted: !1,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function () {
                return "ssp" == D(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function () {
                return "ssp" == D(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length
            },
            fnDisplayEnd: function () {
                var a = this._iDisplayLength,
                    b = this._iDisplayStart,
                    c = b + a,
                    d = this.aiDisplay.length,
                    e = this.oFeatures,
                    f = e.bPaginate;
                return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c >
                d || -1 === a ? d : c
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null,
            aLastSort: [],
            oPlugins: {}
        };
        o.ext = y = {
            classes: {},
            errMode: "alert",
            feature: [],
            search: [],
            internal: {},
            legacy: {
                ajax: !1
            },
            pager: {},
            renderer: {
                pageButton: {},
                header: {}
            },
            order: {},
            type: {
                detect: [],
                search: {},
                order: {}
            },
            _unique: 0,
            fnVersionCheck: o.fnVersionCheck,
            iApiIndex: 0,
            oJUIClasses: {},
            sVersion: o.version
        };
        g.extend(y, {
            afnFiltering: y.search,
            aTypes: y.type.detect,
            ofnSearch: y.type.search,
            oSort: y.type.order,
            afnSortData: y.order,
            aoFeatures: y.feature,
            oApi: y.internal,
            oStdClasses: y.classes,
            oPagination: y.pager
        });
        g.extend(o.ext.classes, {
            sTable: "dataTable",
            sNoFooter: "no-footer",
            sPageButton: "paginate_button",
            sPageButtonActive: "current",
            sPageButtonDisabled: "disabled",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sFilterInput: "",
            sLengthSelect: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sHeaderTH: "",
            sFooterTH: "",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sJUIHeader: "",
            sJUIFooter: ""
        });
        var xa = "",
            xa = "",
            E = xa + "ui-state-default",
            da = xa + "css_right ui-icon ui-icon-",
            Nb = xa + "fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";
        g.extend(o.ext.oJUIClasses, o.ext.classes, {
            sPageButton: "fg-button ui-button " + E,
            sPageButtonActive: "ui-state-disabled",
            sPageButtonDisabled: "ui-state-disabled",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: E + " sorting_asc",
            sSortDesc: E + " sorting_desc",
            sSortable: E + " sorting",
            sSortableAsc: E + " sorting_asc_disabled",
            sSortableDesc: E + " sorting_desc_disabled",
            sSortableNone: E + " sorting_disabled",
            sSortJUIAsc: da + "triangle-1-n",
            sSortJUIDesc: da + "triangle-1-s",
            sSortJUI: da + "carat-2-n-s",
            sSortJUIAscAllowed: da + "carat-1-n",
            sSortJUIDescAllowed: da + "carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead " + E,
            sScrollFoot: "dataTables_scrollFoot " + E,
            sHeaderTH: E,
            sFooterTH: E,
            sJUIHeader: Nb + " ui-corner-tl ui-corner-tr",
            sJUIFooter: Nb + " ui-corner-bl ui-corner-br"
        });
        var Gb = o.ext.pager;
        g.extend(Gb, {
            simple: function () {
                return ["上一页", "下一页"]
            },
            full: function () {
                return ["首页", "上一页", "下一页", "尾页"]
            },
            simple_numbers: function (a,
                                      b) {
                return ["上一页", Ra(a, b), "下一页"]
            },
            full_numbers: function (a, b) {
                return ["首页", "上一页", Ra(a, b), "下一页", "尾页"]
            },
            _numbers: Ra,
            numbers_length: 7
        });
        g.extend(!0, o.ext.renderer, {
            pageButton: {
                _: function (a, b, c, d, e, f) {
                    var i = a.oClasses,
                        j = a.oLanguage.oPaginate,
                        h, k, l = function (b, d) {
                            var m, n, o, q, s = function (b) {
                                Pa(a, b.data.action, true)
                            };
                            m = 0;
                            for (n = d.length; m < n; m++) {
                                q = d[m];
                                if (g.isArray(q)) {
                                    o = g("<" + (q.DT_el || "div") + "/>").appendTo(b);
                                    l(o, q)
                                } else {
                                    k = h = "";
                                    switch (q) {
                                        case "ellipsis":
                                            b.append("<span>…</span>");
                                            break;
                                        case "首页":
                                            h = j.sFirst;
                                            k = q + (e > 0 ? "" : " " + i.sPageButtonDisabled);
                                            break;
                                        case "上一页":
                                            h = j.sPrevious;
                                            k = q + (e > 0 ? "" : " " + i.sPageButtonDisabled);
                                            break;
                                        case "下一页":
                                            h = j.sNext;
                                            k = q + (e < f - 1 ? "" : " " + i.sPageButtonDisabled);
                                            break;
                                        case "尾页":
                                            h = j.sLast;
                                            k = q + (e < f - 1 ? "" : " " + i.sPageButtonDisabled);
                                            break;
                                        default:
                                            h = q + 1;
                                            k = e === q ? i.sPageButtonActive : ""
                                    }
                                    if (h) {
                                        o = g("<a>", {
                                            "class": i.sPageButton + " " + k,
                                            "aria-controls": a.sTableId,
                                            tabindex: a.iTabIndex,
                                            id: c === 0 && typeof q === "string" ? a.sTableId + "_" + q : null
                                        }).html(h).appendTo(b);
                                        Qa(o, {
                                                action: q
                                            },
                                            s)
                                    }
                                }
                            }
                        };
                    l(g(b).empty(), d)
                }
            }
        });
        var ya = function (a, b, c) {
            if (!a || "-" === a) return -Infinity;
            a.replace && (b && (a = a.replace(b, "")), c && (a = a.replace(c, "")));
            return 1 * a
        };
        g.extend(o.ext.type.order, {
            "date-pre": function (a) {
                return Date.parse(a) || 0
            },
            "numeric-pre": function (a) {
                return ya(a)
            },
            "numeric-fmt-pre": function (a) {
                return ya(a, Sa)
            },
            "html-numeric-pre": function (a) {
                return ya(a, va)
            },
            "html-numeric-fmt-pre": function (a) {
                return ya(a, va, Sa)
            },
            "html-pre": function (a) {
                return a.replace ? a.replace(/<.*?>/g, "").toLowerCase() : a + ""
            },
            "string-pre": function (a) {
                return "string" === typeof a ? a.toLowerCase() : !a || !a.toString ? "" : a.toString()
            },
            "string-asc": function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0
            },
            "string-desc": function (a, b) {
                return a < b ? 1 : a > b ? -1 : 0
            }
        });
        g.extend(o.ext.type.detect, [function (a) {
            return Ta(a) ? "numeric" : null
        }, function (a) {
            if (a && !Rb.test(a)) return null;
            var b = Date.parse(a);
            return null !== b && !isNaN(b) || ca(a) ? "date" : null
        }, function (a) {
            return Ta(a, !0) ? "numeric-fmt" : null
        }, function (a) {
            return Jb(a) ? "html-numeric" : null
        }, function (a) {
            return Jb(a, !0) ?
                "html-numeric-fmt" : null
        }, function (a) {
            return ca(a) || "string" === typeof a && -1 !== a.indexOf("<") ? "html" : null
        }]);
        g.extend(o.ext.type.search, {
            html: function (a) {
                return ca(a) ? "" : "string" === typeof a ? a.replace(Hb, " ").replace(va, "") : ""
            },
            string: function (a) {
                return ca(a) ? "" : "string" === typeof a ? a.replace(Hb, " ") : a
            }
        });
        g.extend(!0, o.ext.renderer, {
            header: {
                _: function (a, b, c, d, e) {
                    g(a.nTable).on("order.dt", function (a, g, j, h) {
                        b.removeClass(c.sSortingClass + " " + e.sSortAsc + " " + e.sSortDesc).addClass(h[d] == "asc" ?
                            e.sSortAsc : h[d] ==
                            "desc" ? e.sSortDesc : c.sSortingClass)
                    })
                },
                jqueryui: function (a, b, c, d, e) {
                    g("<div/>").addClass(e.sSortJUIWrapper).append(b.contents()).append(g("<span/>").addClass(e.sSortIcon +
                        " " + c.sSortingClassJUI)).appendTo(b);
                    g(a.nTable).on("order.dt", function (a, g, j, h) {
                        b.removeClass(e.sSortAsc + " " + e.sSortDesc).addClass(h[d] == "asc" ? e.sSortAsc : h[d] ==
                        "desc" ? e.sSortDesc : c.sSortingClass);
                        b.find("span").removeClass(e.sSortJUIAsc + " " + e.sSortJUIDesc + " " + e.sSortJUI + " " + e.sSortJUIAscAllowed +
                            " " + e.sSortJUIDescAllowed).addClass(h[d] ==
                        "asc" ? e.sSortJUIAsc : h[d] == "desc" ? e.sSortJUIDesc : c.sSortingClassJUI)
                    })
                }
            }
        });
        g.fn.dataTable = o;
        g.fn.dataTableSettings = o.settings;
        g.fn.dataTableExt = o.ext;
        g.fn.DataTable = function (a) {
            return g(this).dataTable(a).api()
        };
        g.each(o, function (a, b) {
            g.fn.DataTable[a] = b
        })
    };
    "function" === typeof define && define.amd ? define("datatables", ["jquery"], ea) : jQuery && !jQuery.fn.dataTable &&
        ea(jQuery)
})(window, document);
