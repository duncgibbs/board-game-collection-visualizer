(this["webpackJsonpboard-game-collection-visualizer"]=this["webpackJsonpboard-game-collection-visualizer"]||[]).push([[0],{46:function(e,a,t){e.exports=t(61)},51:function(e,a,t){},57:function(e,a,t){},60:function(e,a,t){},61:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(7),m=t.n(i),o=(t(51),t(14)),l=t(92),c=t(87),s=t(91),u=t(30),p=t(32);t(57);function g(e){return r.a.createElement("div",{className:"board-game-gallery"},r.a.createElement(l.a,{cols:4,cellHeight:250},function(a){var t=["maxplayers"];return a.sort((function(a,n){return t.includes(e.sort)?n[e.sort]-a[e.sort]:"name"===e.sort?a[e.sort].localeCompare(n[e.sort]):a[e.sort]-n[e.sort]})),a}(e.games).map((function(e){var a=r.a.createElement("div",{className:"game-info-bar"},r.a.createElement("div",{className:"title"},e.name),r.a.createElement("div",{className:"players"},r.a.createElement(u.a,{icon:p.b}),e.minplayers===e.maxplayers?"".concat(e.minplayers):"".concat(e.minplayers,"-").concat(e.maxplayers)),r.a.createElement("div",{className:"time"},r.a.createElement(u.a,{icon:p.a}),e.minplaytime===e.maxplaytime?"".concat(e.minplaytime):"".concat(e.minplaytime,"-").concat(e.maxplaytime)));return r.a.createElement(c.a,{key:e.id},r.a.createElement("img",{src:e.image,alt:e.name}),r.a.createElement(s.a,{title:a}))}))))}var y=t(99),d=t(95),b=t(97),f=t(96),h=t(33),v=t.n(h),E=t(38),x=function(e,a){return e.getElementsByTagName(a)[0].getAttribute("value")},w=function(e,a){return Array.from(e.querySelectorAll("link[type=".concat(a,"]"))).map((function(e){return e.getAttribute("value")}))},N={getCollectionForUser:function(e){return fetch("https://www.boardgamegeek.com/xmlapi2/collection?username=".concat(e,"&excludesubtype=boardgameexpansion&own=1")).then((function(e){return e.text()})).then((function(e){return(new DOMParser).parseFromString(e,"text/xml")})).then((function(e){return Promise.all(Array.from(e.getElementsByTagName("item")).map((function(e){var a=e.getAttribute("objectid");return N.getBoardGame(a)})))}))},getBoardGame:function(){var e=Object(E.a)(v.a.mark((function e(a){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("https://www.boardgamegeek.com/xmlapi2/thing?id=".concat(a,"&type=boardgame")).then((function(e){return e.text()})).then((function(e){return(new DOMParser).parseFromString(e,"text/xml").getElementsByTagName("item")[0]})).then((function(e){return{id:(a=e).getAttribute("id"),name:a.querySelector('name[type="primary"]').getAttribute("value"),description:a.getElementsByTagName("description")[0].innerHTML,image:a.getElementsByTagName("image")[0].innerHTML,thumbnail:a.getElementsByTagName("thumbnail")[0].innerHTML,yearpublished:x(a,"yearpublished"),minplayers:x(a,"minplayers"),maxplayers:x(a,"maxplayers"),playingtime:x(a,"playingtime"),minplaytime:x(a,"minplaytime"),maxplaytime:x(a,"maxplaytime"),boardgamecategory:w(a,"boardgamecategory"),boardgamemechanic:w(a,"boardgamemechanic"),boardgamefamily:w(a,"boardgamefamily"),boardgamedesigner:w(a,"boardgamedesigner"),boardgameartist:w(a,"boardgameartist"),boardgamepublisher:w(a,"boardgamepublisher")};var a})));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()},S=N;function A(e){new URLSearchParams(window.location.search);var a=Object(n.useState)(""),t=Object(o.a)(a,2),i=t[0],m=t[1],l=function(){S.getCollectionForUser(i).then((function(a){e.setCollection(a)}))},c=r.a.useRef(null),s=r.a.useState(0),u=Object(o.a)(s,2),p=u[0],g=u[1];return r.a.useEffect((function(){g(c.current.offsetWidth)}),[]),r.a.createElement("div",{className:"search-bar"},r.a.createElement(y.a,{id:"collection-username",label:"Username",variant:"outlined",onKeyUp:function(e){13!==e.charCode&&"Enter"!==e.key||l()},onChange:function(e){m(e.target.value)}}),r.a.createElement(d.a,{variant:"outlined"},r.a.createElement(b.a,{ref:c,htmlFor:"outlined-sort-native-simple"},"Sort"),r.a.createElement(f.a,{native:!0,value:e.collectionSort,onChange:function(a){e.setCollectionSort(a.target.value)},labelWidth:p,inputProps:{name:"sort",id:"outlined-sort-native-simple"}},[{name:"name",display:"Name"},{name:"yearpublished",display:"Year Published"},{name:"minplayers",display:"Minimum Players"},{name:"maxplayers",display:"Maximum Players"},{name:"playingtime",display:"Play Time"}].map((function(e){return r.a.createElement("option",{value:e.name,key:e.name},e.display)})))))}t(60);var C=function(){var e=Object(n.useState)(Array()),a=Object(o.a)(e,2),t=a[0],i=a[1],m=Object(n.useState)("name"),l=Object(o.a)(m,2),c=l[0],s=l[1];return r.a.createElement("div",{className:"App"},r.a.createElement(A,{collection:t,setCollection:i,collectionSort:c,setCollectionSort:s}),r.a.createElement(g,{games:t,sort:c}))};m.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.a36e82ed.chunk.js.map