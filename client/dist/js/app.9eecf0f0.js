(function(e){function t(t){for(var s,i,r=t[0],l=t[1],c=t[2],m=0,d=[];m<r.length;m++)i=r[m],o[i]&&d.push(o[i][0]),o[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],s=!0,r=1;r<n.length;r++){var l=n[r];0!==o[l]&&(s=!1)}s&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},o={app:0},a=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var s=n("64a9"),o=n.n(s);o.a},"0bac":function(e,t,n){"use strict";var s=n("c6c6"),o=n.n(s);o.a},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var s=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],i=(n("034f"),n("2877")),r={},l=Object(i["a"])(r,o,a,!1,null,null,null),c=l.exports,u=n("8c4f"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Welcome")],1)},d=[],h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"welcome-box",attrs:{id:"welcome"}},[e._m(0),n("button",{staticClass:"welcome-button"},[n("router-link",{attrs:{to:"/start"}},[e._v("START GAME")])],1),n("button",{staticClass:"welcome-button"},[n("router-link",{attrs:{to:"/join"}},[e._v("JOIN GAME")])],1)])},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v("Welcome"),n("br"),e._v("to"),n("br"),e._v("GAME-20")])}],g={name:"Welcome",components:{},mounted:function(){localStorage.sessionCode&&le.push({name:"game",params:{sessionCode:localStorage.sessionCode}})}},f=g,v=(n("0bac"),Object(i["a"])(f,h,p,!1,null,"e08e1eec",null)),w=v.exports,y={name:"Login",components:{Welcome:w}},b=y,_=Object(i["a"])(b,m,d,!1,null,null,null),C=_.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"auth-box"},[n("p",{staticStyle:{"font-size":"20px"}},[e._v("Create Game")]),n("form",{staticClass:"auth-form",on:{submit:function(t){return t.preventDefault(),e.createGameSession(t)}}},[n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.game.name,expression:"game.name"}],staticClass:"auth-input",attrs:{placeholder:"Your name",minlength:"3",required:""},domProps:{value:e.game.name},on:{input:function(t){t.target.composing||e.$set(e.game,"name",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.game.answer,expression:"game.answer"}],staticClass:"auth-input margin-top-10",attrs:{placeholder:"The Game Word",minlength:"3",required:""},domProps:{value:e.game.answer},on:{input:function(t){t.target.composing||e.$set(e.game,"answer",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.game.hint,expression:"game.hint"}],staticClass:"auth-input margin-top-10",attrs:{placeholder:"Optional Hint",minlength:"3"},domProps:{value:e.game.hint},on:{input:function(t){t.target.composing||e.$set(e.game,"hint",t.target.value)}}}),n("input",{staticClass:"auth-submit-button margin-top-10",staticStyle:{color:"white"},attrs:{type:"submit",value:"START GAME"}})])])])},P=[],O=n("8055"),x=n.n(O),q={name:"CreateGame",data:function(){return{game:{name:"",answer:"",hint:""},socket:x()("/")}},methods:{createGameSession:function(e){e.preventDefault(),this.socket.emit("start",this.game)}},mounted:function(){this.socket.on("failure",function(e){console.log("failure"),console.log(e),alert(e.body)}),this.socket.on("started_game",function(e){console.log("success");var t=e.body;localStorage.sessionCode=t.sessionCode,localStorage.name=t.playerOne,le.push({name:"game",params:{sessionCode:t.sessionCode}})})}},k=q,G=Object(i["a"])(k,S,P,!1,null,"2721d18d",null),j=G.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"auth-box"},[n("h1",{staticStyle:{"font-size":"20px"}},[e._v("Join Game")]),n("p",{staticStyle:{"font-size":"20px"}},[e._v("Enter your name and the session code of the game you want to join.")]),n("form",{staticClass:"auth-form",attrs:{id:"login-form"},on:{submit:function(t){return t.preventDefault(),e.joinGameSession(t)}}},[n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.game.sessionCode,expression:"game.sessionCode"}],staticClass:"auth-input",attrs:{placeholder:"Game Session Code",minlength:"3",required:""},domProps:{value:e.game.sessionCode},on:{input:function(t){t.target.composing||e.$set(e.game,"sessionCode",t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.game.name,expression:"game.name"}],staticClass:"auth-input margin-top-10",attrs:{placeholder:"Your name",minlength:"3",required:""},domProps:{value:e.game.name},on:{input:function(t){t.target.composing||e.$set(e.game,"name",t.target.value)}}}),n("input",{staticClass:"auth-submit-button margin-top-10",staticStyle:{color:"white"},attrs:{type:"submit",value:"JOIN GAME"}})])])])},H=[],$={name:"CreateGame",data:function(){return{game:{name:"",sessionCode:""},socket:x()("/")}},methods:{joinGameSession:function(e){e.preventDefault(),this.socket.emit("join",this.game)}},mounted:function(){this.socket.on("failure",function(e){console.log(e),alert(e.error)}),this.socket.on("joined_game",function(e){var t=e.body.session;localStorage.sessionCode=t.sessionCode,localStorage.name=!0===e.body.isPlayerOne?t.playerOne:t.playerTwo,le.push({name:"game",params:{sessionCode:t.sessionCode}})})}},N=$,A=Object(i["a"])(N,E,H,!1,null,"b191d0fa",null),T=A.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row",staticStyle:{"padding-top":"10px",margin:"auto"}},[n("div",{class:{"col-6":!0,"selected-header":e.showHintsPage,"label-text":!0},staticStyle:{color:"white"},on:{click:function(t){return e.navigate("hints")}}},[n("h4",[e._v("HINTS")])]),n("div",{class:{"col-6":!0,"selected-header":e.showGuessesPage,"label-text":!0},on:{click:function(t){return e.navigate("play")}}},[n("h4",[e._v("PLAY")])]),""!==e.otherPlayer?n("div",{staticClass:"container label-text",staticStyle:{"margin-bottom":"10px"}},[e._v("\n    Other player: "+e._s(e.otherPlayer)+"\n  ")]):e._e(),n("div",{class:{"col-sm-6":!0,unselected:!e.showHintsPage,selected:e.showHintsPage},attrs:{id:"hints-page"}},[n("HintSection",{staticClass:"content-box",attrs:{game:e.game,"is-player-one":e.isPlayerOne},on:{"question-asked":e.sendHintQuestion,"question-answered":e.sendHintAnswer}})],1),n("div",{class:{"col-sm-6":!0,unselected:!e.showGuessesPage,selected:e.showGuessesPage},attrs:{id:"play-page"}},[n("Play",{staticClass:"content-box",attrs:{game:e.game,"is-player-one":e.isPlayerOne},on:{"answer-sent":e.sendGameAnswer}})],1),n("button",{attrs:{id:"logoutButton",title:"Logout"},on:{click:e.logoutUser}},[n("i",{staticClass:"fa fa-sign-out",staticStyle:{"font-size":"24px"}})])])},z=[],M=n("768b"),B=(n("7f7f"),n("bc3a"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("h6",{attrs:{STYLE:"color: white; text-align: left"}},[e._v("Hints Left: "+e._s(20-e.game.questions.length))]),n("div",{staticStyle:{overflow:"auto",height:"70%","padding-bottom":"0px"}},e._l(e.game.questions,function(t){return n("Hint",{staticStyle:{margin:"auto"},attrs:{question:t,"is-player-one":e.isPlayerOne},on:{"question-answered":e.optionSelected}})}),1),e.isPlayerOne||e.game.ended?e._e():n("form",{staticClass:"container ask-hint-body page-footer form-inline",attrs:{id:"ask-form"},on:{submit:function(t){return e.$emit("question-asked",e.question)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.question,expression:"question"}],staticClass:"col-10 form-control",attrs:{type:"text",title:"question",placeholder:"type your question here",required:""},domProps:{value:e.question},on:{input:function(t){t.target.composing||(e.question=t.target.value)}}}),n("input",{staticClass:"col-2 btn btn-primary",attrs:{type:"submit",value:"SEND"}})])])}),I=[],D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("form",{staticClass:"container hint-body"},[n("label",{class:{"col-8":e.isPlayerOne,"col-10":null!==e.question.answer,"col-12":!e.isPlayerOne&&null===e.question.answer},staticStyle:{"text-align":"left"}},[e._v(e._s(e.question.question))]),null===e.question.answer&&e.isPlayerOne?n("input",{staticClass:"btn btn-primary col-2 hint-answer-button",attrs:{type:"button",value:"YES",disabled:e.question.answer},on:{click:function(t){return e.$emit("question-answered",[e.question.id,"yes"])}}}):e._e(),null===e.question.answer&&e.isPlayerOne?n("input",{staticClass:"btn btn-primary col-2 hint-answer-button",attrs:{type:"button",value:"NO",disabled:e.question.answer},on:{click:function(t){return e.$emit("question-answered",[e.question.id,"nope"])}}}):e._e(),!0===e.question.answer?n("input",{staticClass:"btn btn-primary hint-answer-button col-2",attrs:{type:"button",value:"YES",disabled:""}}):e._e(),!1===e.question.answer?n("input",{staticClass:"btn btn-primary hint-answer-button col-2",attrs:{type:"button",value:"NO",disabled:""}}):e._e()])])},L=[],W={name:"Hint",props:{question:Object,isPlayerOne:Boolean},data:function(){return{}},methods:{handleSelection:function(e){}}},Y=W,J=Object(i["a"])(Y,D,L,!1,null,null,null),Q=J.exports,U={name:"HintSection",components:{Hint:Q},props:{game:Object,isPlayerOne:Boolean},data:function(){return{question:""}},mounted:function(){},methods:{optionSelected:function(e){this.$emit("question-answered",e)}}},F=U,K=Object(i["a"])(F,B,I,!1,null,null,null),V=K.exports,X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",staticStyle:{"text-align":"left",color:"white"}},[n("h5",[e._v("Game Session Code: "+e._s(e.game.sessionCode))]),e.game.hint?n("h6",[e._v("Hint: "+e._s(e.game.hint))]):e._e(),e.isPlayerOne?n("h4",[e._v("Answer word: "+e._s(e.game.answer))]):e._e(),n("h6",{staticStyle:{"text-align":"left"}},[e._v("Guesses")]),e._l(e.game.guesses,function(t){return n("div",{staticClass:"container",staticStyle:{"text-align":"left",color:"white"}},[n("p",[e._v(e._s(t))])])}),e.isPlayerOne||e.game.ended?e._e():n("form",{staticClass:"container ask-hint-body page-footer form-inline",on:{submit:function(t){return e.$emit("answer-sent",e.answer)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.answer,expression:"answer"}],staticClass:"col-10 form-control",attrs:{type:"text",title:"answer",placeholder:"guess the word here",required:""},domProps:{value:e.answer},on:{input:function(t){t.target.composing||(e.answer=t.target.value)}}}),n("input",{staticClass:"col-2 btn btn-primary",attrs:{type:"submit",value:"SEND"}})])],2)},Z=[],ee={name:"Play",props:{game:Object,isPlayerOne:Boolean},data:function(){return{answer:""}}},te=ee,ne=Object(i["a"])(te,X,Z,!1,null,null,null),se=ne.exports,oe={name:"Game",components:{HintSection:V,Play:se},data:function(){return{game:{},socket:x()("/"),isPlayerOne:!1,showHintsPage:!0,showGuessesPage:!1,otherPlayer:"",window:{width:0,height:0}}},props:["sessionCode"],created:function(){window.addEventListener("resize",this.handleResize)},destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){this.window.width=window.innerWidth,this.window.height=window.innerHeight,document.getElementById("hints-page").style.height="".concat(this.window.height-.1*this.window.height,"px"),document.getElementById("play-page").style.height="".concat(this.window.height-.1*this.window.height,"px")},isSmallScreen:function(){var e=window.innerWidth;return e<=767},navigate:function(e){switch(e){case"hints":this.showHintsPage=!0,this.showGuessesPage=!1;break;case"play":this.showHintsPage=!1,this.showGuessesPage=!0;break}},createGameSession:function(e){e.preventDefault(),this.socket.emit("start",this.game)},getGameByCode:function(e){this.socket.emit("game_data",{sessionCode:e})},sendHintQuestion:function(e){this.socket.emit("ask_question",{question:e,name:localStorage.name,sessionCode:this.sessionCode})},sendHintAnswer:function(e){var t=Object(M["a"])(e,2),n=t[0],s=t[1],o={questionId:n,name:localStorage.name,sessionCode:this.sessionCode,answer:s};this.socket.emit("answer_question",o)},sendGameAnswer:function(e){var t={name:localStorage.name,sessionCode:this.sessionCode,answer:e};this.socket.emit("answer",t)},handleSocketResponse:function(e){this.game=e,!1===this.isPlayerOne&&this.game.correct?alert("You win!!\nThe guess word was ".concat(this.game.answer)):this.game.ended&&alert("Game session has ended")},logoutUser:function(){localStorage.removeItem("name"),localStorage.removeItem("sessionCode"),le.push({name:"home"})}},mounted:function(){var e=this;this.getGameByCode(this.sessionCode),this.handleResize(),this.socket.on("failure",function(e){console.log("failure"),console.log(e),alert(e.error)}),this.socket.on("game_data_received",function(t){console.log("game_data_received"),console.log(t.body),e.game=t.body,e.isPlayerOne=localStorage.name===e.game.playerOne,e.otherPlayer=e.isPlayerOne?e.game.playerTwo:e.game.playerOne,e.handleSocketResponse(e.game)}),this.socket.on("hint_question_received",function(t){console.log("hint_question_received"),e.handleSocketResponse(t.body)}),this.socket.on("hint_answer_received",function(t){console.log("hint_answer_received"),e.handleSocketResponse(t.body)}),this.socket.on("answer_received",function(t){console.log("answer_received"),e.handleSocketResponse(t.body)})}},ae=oe,ie=Object(i["a"])(ae,R,z,!1,null,"6370877f",null),re=ie.exports;s["a"].use(u["a"]);var le=new u["a"]({routes:[{path:"/",name:"home",component:C},{path:"/start",name:"start",component:j},{path:"/join",name:"join",component:T},{path:"/game/:sessionCode",name:"game",component:re,props:!0}]});s["a"].config.productionTip=!1,new s["a"]({router:le,render:function(e){return e(c)}}).$mount("#app")},"64a9":function(e,t,n){},c6c6:function(e,t,n){}});
//# sourceMappingURL=app.9eecf0f0.js.map