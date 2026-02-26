function t(t,e,s,i){var r,n=arguments.length,o=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,s,o):r(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,f=_?_.emptyScript:"",y=p.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},m=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:m};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??m)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[g("elementProperties")]=new Map,b[g("finalized")]=new Map,y?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,T=`<${P}>`,M=document,R=()=>M.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,k="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,H=/>/g,I=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,z=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Q=new WeakMap,W=M.createTreeWalker(M,129);function F(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=D;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,c=0;for(;c<s.length&&(o.lastIndex=c,l=o.exec(s),null!==l);)c=o.lastIndex,o===D?"!--"===l[1]?o=N:void 0!==l[1]?o=H:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=r??D,h=-1):void 0===l[1]?h=-2:(h=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?I:'"'===l[3]?z:V):o===z||o===V?o=I:o===N||o===H?o=D:(o=I,r=void 0);const d=o===I&&t[e+1].startsWith("/>")?" ":"";n+=o===D?s+T:h>=0?(i.push(a),s.slice(0,h)+x+s.slice(h)+C+d):s+C+(-2===h?e:d)}return[F(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,h]=Y(t,e);if(this.el=X.createElement(l,s),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=W.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=h[n++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:G}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],R()),W.nextNode(),a.push({type:2,index:++r});i.append(t[e],R())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===B)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=U(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);W.currentNode=i;let r=W.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new K(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=W.nextNode(),n++)}return W.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new X(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new K(this.O(R()),this.O(R()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class G{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,i[s+o],e,o),a===B&&(a=this._$AH[o]),n||=!U(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends G{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends G{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??q)===B)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(X,K),(A.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;let ot=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new K(e.insertBefore(R(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:m},ht=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ct(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function dt(t){return ct({...t,state:!0,attribute:!1})}const ut=1,pt=t=>(...e)=>({_$litDirective$:t,values:e});let _t=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const ft=pt(class extends _t{constructor(t){if(super(t),t.type!==ut||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const s=t.element.classList;for(const t of this.st)t in e||(s.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(s.add(t),this.st.add(t)):(s.remove(t),this.st.delete(t)))}return B}}),yt="important",gt=" !"+yt,$t=pt(class extends _t{constructor(t){if(super(t),t.type!==ut||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(gt);t.includes("-")||e?s.setProperty(t,e?i.slice(0,-11):i,e?yt:""):s[t]=i}}return B}});function mt(t){const e=[];for(let s=0;s<24;s++)e.push(1==(t>>>s&1));return e}function vt(t,e){return[...mt(t),...mt(e)]}const bt=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],At={sunday:"Sun",monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat"};function wt(){return bt[(new Date).getDay()]}const Et="#00bcd4",St="#e0e0e0",xt=((t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)})`
  :host {
    --cell-height: 40px;
    --cell-gap: 1px;
    --active-color: var(--schedule-active-color, #00bcd4);
    --inactive-color: var(--schedule-inactive-color, #e0e0e0);
    --current-day-color: var(--primary-color, #03a9f4);
    --current-slot-outline: rgba(0, 188, 212, 0.8);
    --border-radius: 3px;
    display: block;
  }

  ha-card {
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
  }

  .card-header .title {
    font-size: 1.1em;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  /* Day tabs */
  .day-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    padding-bottom: 8px;
  }

  .day-tab {
    flex: 1;
    padding: 8px 4px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
    background: none;
    border: none;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: capitalize;
  }

  .day-tab:hover {
    background-color: var(--secondary-background-color, #f5f5f5);
    color: var(--primary-text-color);
  }

  .day-tab.active {
    color: var(--current-day-color);
    border-bottom: 2px solid var(--current-day-color);
    font-weight: 600;
  }

  .day-tab.current-day {
    color: var(--current-day-color);
  }

  .day-tab.current-day::after {
    content: '';
    display: block;
    width: 4px;
    height: 4px;
    background-color: var(--current-day-color);
    border-radius: 50%;
    margin: 4px auto 0;
  }

  .day-tab.active.current-day::after {
    display: none;
  }

  /* Schedule row container */
  .schedule-container {
    width: 100%;
  }

  .schedule-row-wrapper {
    width: 100%;
  }

  /* Schedule cells row */
  .schedule-row {
    display: flex;
    gap: var(--cell-gap);
    width: 100%;
  }

  .schedule-cell {
    flex: 1;
    min-width: 0;
    height: var(--cell-height);
    border-radius: var(--border-radius);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: pointer;
  }

  .schedule-cell.active {
    background-color: var(--active-color);
  }

  .schedule-cell.inactive {
    background-color: var(--inactive-color);
  }

  .schedule-cell:hover {
    transform: scaleY(1.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    z-index: 10;
    position: relative;
  }

  .schedule-cell.current-slot {
    outline: 2px solid var(--current-slot-outline);
    outline-offset: -1px;
  }

  .schedule-cell.readonly {
    cursor: default;
  }

  .schedule-cell.readonly:hover {
    transform: none;
    box-shadow: none;
  }

  /* Time labels below schedule */
  .time-labels {
    display: flex;
    gap: var(--cell-gap);
    margin-top: 6px;
    width: 100%;
  }

  .time-label {
    flex: 1;
    min-width: 0;
    font-size: 10px;
    color: var(--secondary-text-color);
    text-align: center;
    overflow: hidden;
  }

  /* Hide labels when cells are too narrow */
  @container (max-width: 500px) {
    .time-label:nth-child(odd) {
      visibility: hidden;
    }
  }

  /* Warning/error states */
  .warning {
    padding: 16px;
    color: var(--error-color, #db4437);
    text-align: center;
  }

  .error-banner {
    padding: 8px 12px;
    margin-bottom: 12px;
    background-color: var(--error-color, #db4437);
    color: #fff;
    border-radius: var(--border-radius);
    font-size: 13px;
    text-align: center;
    animation: fade-in 0.2s ease;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .day-tab.error {
    color: var(--error-color, #db4437);
  }

  /* Mobile responsiveness */
  @media (max-width: 600px) {
    :host {
      --cell-height: 32px;
    }

    .day-tab {
      font-size: 11px;
      padding: 6px 2px;
    }

    .time-label {
      font-size: 9px;
    }

    ha-card {
      padding: 12px;
    }
  }

  @media (max-width: 400px) {
    :host {
      --cell-height: 28px;
    }

    .day-tab {
      font-size: 10px;
    }

    .time-label {
      font-size: 8px;
    }
  }
`;var Ct;let Pt=Ct=class extends ot{constructor(){super(...arguments),this._selectedDay=wt(),this._pendingValues=new Map,this._errorEntityIds=new Set,this._debounceTimers=new Map,this._sendQueue=[],this._queueProcessing=!1}static get styles(){return xt}setConfig(t){if(!t.schedule_entity_prefix)throw new Error("Please define schedule_entity_prefix");this._config={editable:!0,show_time_labels:!0,highlight_current_day:!0,highlight_current_slot:!0,active_color:Et,inactive_color:St,...t}}getCardSize(){return this._config?.title?4:3}getLayoutOptions(){return{grid_rows:this._config?.title?4:3,grid_min_rows:this._config?.title?4:3}}static getStubConfig(){return{schedule_entity_prefix:"number.econext_dhw_schedule",title:"Schedule"}}_getEntityId(t,e){return`${this._config.schedule_entity_prefix}_${t}_${e}`}_getEntityValue(t){const e=this.hass?.states[t];if(!e)return null;const s=parseFloat(e.state);return isNaN(s)?null:s}_getEffectiveValue(t){const e=this._pendingValues.get(t);return void 0!==e?e:this._getEntityValue(t)}_buildDaySchedule(t){const e=this._getEntityId(t,"am"),s=this._getEntityId(t,"pm"),i=this._getEffectiveValue(e),r=this._getEffectiveValue(s);return null===i||null===r?null:{day:t,amEntityId:e,pmEntityId:s,amValue:i,pmValue:r,slots:vt(i,r)}}_handleCellClick(t,e){if(!this._config?.editable||!this.hass)return;const s=function(t){return t<24}(e),i=function(t){return t%24}(e),r=this._getEntityId(t,s?"am":"pm"),n=this._pendingValues.get(r)??this._getEntityValue(r);if(null===n)return;const o=(n^1<<i)>>>0;this._pendingValues=new Map(this._pendingValues),this._pendingValues.set(r,o),this._scheduleSend(r)}_scheduleSend(t){const e=this._debounceTimers.get(t);void 0!==e&&clearTimeout(e);const s=setTimeout(()=>{this._enqueueFlush(t)},Ct.DEBOUNCE_MS);this._debounceTimers.set(t,s)}_enqueueFlush(t){this._debounceTimers.delete(t);void 0!==this._pendingValues.get(t)&&(this._sendQueue.includes(t)||this._sendQueue.push(t),this._processQueue())}async _processQueue(){if(!this._queueProcessing){this._queueProcessing=!0;try{for(;this._sendQueue.length>0;){const t=this._sendQueue[0],e=this._pendingValues.get(t);if(void 0===e){this._sendQueue.shift();continue}const s=await this._executeServiceCall(t,e);if(!s){const e=new Map(this._pendingValues);e.delete(t),this._pendingValues=e,this._showError(t)}this._sendQueue.shift(),s&&this._sendQueue.length>0&&await new Promise(t=>setTimeout(t,Ct.INTER_CALL_DELAY_MS))}}finally{this._queueProcessing=!1}}}async _executeServiceCall(t,e){for(let s=0;s<=Ct.MAX_RETRIES;s++)try{return await this.hass.callService("number","set_value",{entity_id:t,value:e}),!0}catch(i){if(console.error(`Failed to update ${t} (attempt ${s+1}/${Ct.MAX_RETRIES+1}):`,i),s<Ct.MAX_RETRIES){const i=Ct.RETRY_BASE_MS*Math.pow(2,s);await new Promise(t=>setTimeout(t,i));const r=this._pendingValues.get(t);if(void 0===r)return!0;e=r}}return!1}_showError(t){this._errorEntityIds=new Set([...this._errorEntityIds,t]),setTimeout(()=>{const e=new Set(this._errorEntityIds);e.delete(t),this._errorEntityIds=e},5e3)}_hasErrorForDay(t){const e=this._getEntityId(t,"am"),s=this._getEntityId(t,"pm");return this._errorEntityIds.has(e)||this._errorEntityIds.has(s)}willUpdate(t){if(super.willUpdate(t),t.has("hass")&&this._pendingValues.size>0){const t=[];for(const[e,s]of this._pendingValues)if(!this._debounceTimers.has(e)){this._getEntityValue(e)===s&&t.push(e)}if(t.length>0){const e=new Map(this._pendingValues);for(const s of t)e.delete(s);this._pendingValues=e}}}disconnectedCallback(){super.disconnectedCallback();for(const t of this._debounceTimers.values())clearTimeout(t);this._debounceTimers.clear(),this._sendQueue=[]}render(){if(!this._config||!this.hass)return L``;const t=wt(),e=function(){const t=new Date;return 2*t.getHours()+(t.getMinutes()>=30?1:0)}(),s=this._buildDaySchedule(this._selectedDay);if(!s){if(!bt.find(t=>null!==this._buildDaySchedule(t)))return L`
          <ha-card>
            <div class="warning">
              No schedule entities found for prefix:
              ${this._config.schedule_entity_prefix}
            </div>
          </ha-card>
        `}const i=this._config.active_color||Et,r=this._config.inactive_color||St;return L`
      <ha-card>
        ${this._config.title?L`
              <div class="card-header">
                <div class="title">${this._config.title}</div>
              </div>
            `:q}

        <!-- Day tabs -->
        <div class="day-tabs">
          ${bt.map(e=>L`
            <button
              class="day-tab ${ft({active:e===this._selectedDay,"current-day":!1!==this._config.highlight_current_day&&e===t,error:this._hasErrorForDay(e)})}"
              @click=${()=>{this._selectedDay=e}}
            >
              ${At[e]}
            </button>
          `)}
        </div>

        ${this._hasErrorForDay(this._selectedDay)?L`
              <div class="error-banner">
                Failed to save schedule. Changes were reverted.
              </div>
            `:q}

        <!-- Schedule row -->
        <div class="schedule-container">
          <div class="schedule-row-wrapper">
            ${s?this._renderScheduleRow(s,this._selectedDay===t,e,i,r):this._renderEmptyRow()}

            ${!1!==this._config.show_time_labels?this._renderTimeLabels():q}
          </div>
        </div>
      </ha-card>
    `}_renderTimeLabels(){return L`
      <div class="time-labels">
        ${Array.from({length:48},(t,e)=>{const s=Math.floor(e/2);return L`
            <div class="time-label">
              ${e%2!=0?"":s}
            </div>
          `})}
      </div>
    `}_renderScheduleRow(t,e,s,i,r){const n=!1!==this._config?.editable;return L`
      <div class="schedule-row">
        ${t.slots.map((o,a)=>{const l=!1!==this._config?.highlight_current_slot&&e&&a===s;return L`
            <div
              class="schedule-cell ${ft({active:o,inactive:!o,"current-slot":l,readonly:!n})}"
              style=${$t({backgroundColor:o?i:r})}
              title="${function(t){const e=t%2*30;return`${Math.floor(t/2).toString().padStart(2,"0")}:${e.toString().padStart(2,"0")}`}(a)} - ${o?"Active":"Inactive"}"
              @click=${()=>this._handleCellClick(t.day,a)}
            ></div>
          `})}
      </div>
    `}_renderEmptyRow(){return L`
      <div class="schedule-row">
        ${Array.from({length:48},()=>L`
          <div
            class="schedule-cell inactive readonly"
            style="opacity: 0.3"
            title="No data"
          ></div>
        `)}
      </div>
    `}};Pt.DEBOUNCE_MS=500,Pt.MAX_RETRIES=2,Pt.RETRY_BASE_MS=1e3,Pt.INTER_CALL_DELAY_MS=3e3,t([ct({attribute:!1})],Pt.prototype,"hass",void 0),t([dt()],Pt.prototype,"_config",void 0),t([dt()],Pt.prototype,"_selectedDay",void 0),t([dt()],Pt.prototype,"_pendingValues",void 0),t([dt()],Pt.prototype,"_errorEntityIds",void 0),Pt=Ct=t([(t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("econext-schedule-card")],Pt),window.customCards=window.customCards||[],window.customCards.push({type:"econext-schedule-card",name:"ecoNEXT Schedule Card",description:"Display and edit weekly schedules from ecoNEXT integration",preview:!0});export{Pt as EconextScheduleCard};
//# sourceMappingURL=econext-schedule-card.js.map
