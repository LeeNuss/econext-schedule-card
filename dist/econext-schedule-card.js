function e(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new o(i,e,r)},l=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:a,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,_=globalThis,y=_.trustedTypes,g=y?y.emptyScript:"",f=_.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!a(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&c(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const o=r?.call(this);s?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,r)=>{if(i)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=i.cssText,e.appendChild(r)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=r;const o=s.fromAttribute(t,e.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,s){if(void 0!==e){const o=this.constructor;if(!1===r&&(s=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??v)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==s||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,f?.({ReactiveElement:$}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,k=e=>e,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,P=`<${T}>`,D=document,M=()=>D.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,U="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,H=/>/g,N=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,W=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),q=new WeakMap,G=D.createTreeWalker(D,129);function X(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":3===t?"<math>":"",n=I;for(let t=0;t<i;t++){const i=e[t];let l,a,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,a=n.exec(i),null!==a);)d=n.lastIndex,n===I?"!--"===a[1]?n=z:void 0!==a[1]?n=H:void 0!==a[2]?(L.test(a[2])&&(s=RegExp("</"+a[2],"g")),n=N):void 0!==a[3]&&(n=N):n===N?">"===a[0]?(n=s??I,c=-1):void 0===a[1]?c=-2:(c=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?N:'"'===a[3]?j:V):n===j||n===V?n=N:n===z||n===H?n=I:(n=N,s=void 0);const h=n===N&&e[t+1].startsWith("/>")?" ":"";o+=n===I?i+P:c>=0?(r.push(l),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[X(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Z{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,l=this.parts,[a,c]=Y(e,t);if(this.el=Z.createElement(a,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=G.nextNode())&&l.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(S)){const t=c[o++],i=r.getAttribute(e).split(C),n=/([.?@])?(.*)/.exec(t);l.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?te:"?"===n[1]?ie:"@"===n[1]?re:ee}),r.removeAttribute(e)}else e.startsWith(C)&&(l.push({type:6,index:s}),r.removeAttribute(e));if(L.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],M()),G.nextNode(),l.push({type:2,index:++s});r.append(e[t],M())}}}else if(8===r.nodeType)if(r.data===T)l.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)l.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,r){if(t===B)return t;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=O(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(e),s._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(t=J(e,s._$AS(e,t.values),s,r)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);G.currentNode=r;let s=G.nextNode(),o=0,n=0,l=i[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new Q(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new se(s,this,e)),this._$AV.push(t),l=i[++n]}o!==l?.index&&(s=G.nextNode(),o++)}return G.currentNode=D,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),O(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new K(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,s){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=J(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==B,o&&(this._$AH=e);else{const r=e;let n,l;for(e=s[0],n=0;n<s.length-1;n++)l=J(this,r[i+n],t,n),l===B&&(l=this._$AH[n]),o||=!O(l)||l!==this._$AH[n],l===F?e=F:e!==F&&(e+=(l??"")+s[n+1]),this._$AH[n]=l}o&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class re extends ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??F)===B)return;const i=this._$AH,r=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==F&&(i===F||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=x.litHtmlPolyfillSupport;oe?.(Z,Q),(x.litHtmlVersions??=[]).push("3.3.2");const ne=globalThis;let le=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let s=r._$litPart$;if(void 0===s){const e=i?.renderBefore??null;r._$litPart$=s=new Q(t.insertBefore(M(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},de={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},he=(e=de,t,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(void 0===o&&globalThis.litPropertyMetadata.set(s,o=new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===r){const{name:r}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,s,e,!0,i)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=i;return function(i){const s=this[r];t.call(this,i),this.requestUpdate(r,s,e,!0,i)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const r=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function pe(e){return ue({...e,state:!0,attribute:!1})}const _e=1,ye=3,ge=4,fe=e=>(...t)=>({_$litDirective$:e,values:t});let me=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const be=fe(class extends me{constructor(e){if(super(e),e.type!==_e||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return B}}),ve="important",we=" !"+ve,$e=fe(class extends me{constructor(e){if(super(e),e.type!==_e||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const r=e[i];return null==r?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const r=t[e];if(null!=r){this.ft.add(e);const t="string"==typeof r&&r.endsWith(we);e.includes("-")||t?i.setProperty(e,t?r.slice(0,-11):r,t?ve:""):i[e]=r}}return B}}),xe={},ke=fe(class extends me{constructor(e){if(super(e),e.type!==ye&&e.type!==_e&&e.type!==ge)throw Error("The `live` directive is not allowed on child or event bindings");if(!(e=>void 0===e.strings)(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===B||t===F)return t;const i=e.element,r=e.name;if(e.type===ye){if(t===i[r])return B}else if(e.type===ge){if(!!t===i.hasAttribute(r))return B}else if(e.type===_e&&i.getAttribute(r)===t+"")return B;return((e,t=xe)=>{e._$AH=t})(e),t}});function Ae(e){const t=[];for(let i=0;i<24;i++)t.push(1==(e>>>i&1));return t}function Ee(e,t){return[...Ae(e),...Ae(t)]}const Se=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];const Ce={sunday:"Sun",monday:"Mon",tuesday:"Tue",wednesday:"Wed",thursday:"Thu",friday:"Fri",saturday:"Sat"};function Te(){return Se[(new Date).getDay()]}function Pe(e){const t=e%2*30;return`${Math.floor(e/2).toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}`}const De="#00bcd4",Me="#e0e0e0",Oe=n`
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

  /* Copy controls */
  .copy-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 0 16px;
  }

  .copy-label {
    color: var(--secondary-text-color);
    font-size: 13px;
    margin-right: 2px;
  }

  .copy-source-select {
    min-height: 32px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
    font-size: 13px;
    padding: 0 8px;
  }

  .copy-button {
    appearance: none;
    border: 0;
    border-radius: 8px;
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    line-height: 32px;
    min-height: 32px;
    padding: 0 12px;
  }

  .copy-status {
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .copy-button:hover {
    filter: brightness(1.08);
  }

  .copy-button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Schedule row container */
  .schedule-container {
    width: 100%;
  }

  /* Weekly layout: the whole week fits without scrolling */
  .weekly-grid-wrapper {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .weekly-grid {
    /* Lines are drawn over the cell colour, so a translucent default reads
       on light, dark and active cells alike. */
    --weekly-grid-line-color: rgba(0, 0, 0, 0.18);
    --weekly-row-height: 10px;
    display: grid;
  }

  /* Tall: days as columns, one row per half hour */
  .weekly-grid.tall {
    grid-template-columns: 38px repeat(7, minmax(0, 1fr));
    grid-template-rows: 26px repeat(48, var(--weekly-row-height));
  }

  .weekly-grid.tall.labelled {
    --weekly-row-height: 20px;
  }

  /* Wide: days as rows, one column per half hour */
  .weekly-grid.wide {
    --weekly-row-height: 22px;
    grid-template-columns: 38px repeat(48, minmax(0, 1fr));
    grid-template-rows: repeat(7, var(--weekly-row-height)) auto;
  }

  .weekly-time-header,
  .weekly-day-header {
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
    font-size: 11px;
    font-weight: 600;
    padding: 0;
    text-align: center;
  }

  .weekly-day-header {
    border-radius: 0;
    cursor: pointer;
  }

  .weekly-grid.wide .weekly-day-header {
    border-right: 1px solid var(--divider-color, #e0e0e0);
  }

  .weekly-hour-label {
    color: var(--secondary-text-color);
    font-size: 9px;
    line-height: 16px;
    overflow: hidden;
    padding-left: 1px;
    white-space: nowrap;
  }

  .weekly-day-header.copy-source {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }

  .weekly-day-header.error {
    box-shadow: inset 0 -3px 0 var(--error-color, #db4437);
  }

  .weekly-day-header.current-day:not(.copy-source) {
    background: color-mix(in srgb, var(--primary-color) 18%, var(--card-background-color));
    color: var(--primary-color);
  }

  .weekly-time-label {
    box-sizing: border-box;
    border-right: 1px solid var(--divider-color, #e0e0e0);
    color: var(--secondary-text-color);
    font-size: 9px;
    line-height: var(--weekly-row-height);
    overflow: hidden;
    padding-right: 4px;
    text-align: right;
    white-space: nowrap;
  }

  .weekly-time-label.hour {
    line-height: 1;
    padding-top: 1px;
  }

  .weekly-cell {
    box-sizing: border-box;
    appearance: none;
    border: 0;
    cursor: pointer;
    font: inherit;
    font-size: 9px;
    font-weight: 600;
    line-height: var(--weekly-row-height);
    min-width: 0;
    overflow: hidden;
    padding: 0 2px;
    text-align: center;
    text-transform: uppercase;
  }

  .weekly-grid.tall .weekly-cell {
    border-right: 1px solid var(--weekly-grid-line-color);
  }

  .weekly-grid.tall .weekly-cell.hour-end,
  .weekly-grid.tall.labelled .weekly-cell {
    border-bottom: 1px solid var(--weekly-grid-line-color);
  }

  .weekly-grid.wide .weekly-cell {
    border-bottom: 1px solid var(--weekly-grid-line-color);
    padding: 0;
  }

  .weekly-grid.wide .weekly-cell.hour-end {
    border-right: 1px solid var(--weekly-grid-line-color);
  }

  .weekly-cell ha-icon {
    --mdc-icon-size: 12px;
    display: inline-block;
    height: 12px;
    vertical-align: middle;
    width: 12px;
  }

  .weekly-cell-content {
    align-items: center;
    display: inline-flex;
    gap: 3px;
    justify-content: center;
    max-width: 100%;
    white-space: nowrap;
  }

  .weekly-cell-content ha-icon {
    flex: 0 0 auto;
  }

  .weekly-cell:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  .weekly-cell:disabled {
    cursor: default;
  }

  .weekly-cell.current-slot {
    outline: 2px solid var(--current-slot-outline);
    outline-offset: -2px;
    position: relative;
    z-index: 1;
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

    .copy-controls {
      gap: 6px;
    }

    .copy-button {
      padding: 0 8px;
    }

    .weekly-grid.tall {
      grid-template-columns: 32px repeat(7, minmax(0, 1fr));
    }

    .weekly-grid.wide {
      grid-template-columns: 32px repeat(48, minmax(0, 1fr));
    }

    .weekly-time-label,
    .weekly-hour-label {
      font-size: 8px;
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
`,Re="_sunday_am";function Ue(e){if(!e?.states)return[];const t=e.entities,i=Object.keys(e.states).filter(e=>e.startsWith("number.")&&e.endsWith(Re)).filter(e=>!t?.[e]?.platform||"econext"===t[e].platform).map(e=>e.slice(0,-10)).filter(t=>Se.every(i=>`${t}_${i}_am`in e.states&&`${t}_${i}_pm`in e.states)),r=e=>e.includes("dhw")?0:1;return i.sort((e,t)=>r(e)-r(t)||e.localeCompare(t))}function Ie(e,t){const i=e?.states[`${t}${Re}`]?.attributes?.friendly_name;if("string"!=typeof i)return t;const r=i.replace(/\s*sunday\s*am\s*$/i,"").trim().split(/\s+/).filter(Boolean);for(let e=Math.floor(r.length/2);e>=1;e--){if(r.slice(0,e).join(" ").toLowerCase()===r.slice(e,2*e).join(" ").toLowerCase()){r.splice(0,e);break}}return r.join(" ")||t}var ze;let He=ze=class extends le{constructor(){super(...arguments),this._selectedDay=Te(),this._pendingValues=new Map,this._errorEntityIds=new Set,this._inFlight=new Set,this._debounceTimers=new Map}static get styles(){return Oe}setConfig(e){if(!e.schedule_entity_prefix)throw new Error("Please define schedule_entity_prefix");this._config={editable:!0,show_time_labels:!0,highlight_current_day:!0,highlight_current_slot:!0,active_color:De,inactive_color:Me,...e}}getCardSize(){const e=(this._config?.title?1:0)+(this._config?.show_copy_controls?1:0);return"weekly"===this._config?.layout?("tall"===this._config.weekly_orientation?11:4)+e:3+e}getGridOptions(){return{columns:"full",rows:"auto",min_columns:6}}getLayoutOptions(){return{grid_columns:"full",grid_rows:"auto",grid_min_columns:2}}static getStubConfig(e){const t=Ue(e)[0];return{schedule_entity_prefix:t??"number.dhw_dhw_schedule",title:t?Ie(e,t):"Schedule"}}static getConfigElement(){return document.createElement("econext-schedule-card-editor")}_displayDays(){return function(e){const t=Se.indexOf(e),i=-1===t?1:t;return Se.map((e,t)=>Se[(t+i)%Se.length])}(this.hass?.locale?.first_weekday)}_getEntityId(e,t){return`${this._config.schedule_entity_prefix}_${e}_${t}`}_getEntityValue(e){const t=this.hass?.states[e];if(!t)return null;const i=parseFloat(t.state);return isNaN(i)?null:i}_getEffectiveValue(e){const t=this._pendingValues.get(e);return void 0!==t?t:this._getEntityValue(e)}_buildDaySchedule(e){const t=this._getEntityId(e,"am"),i=this._getEntityId(e,"pm"),r=this._getEffectiveValue(t),s=this._getEffectiveValue(i);return null===r||null===s?null:{day:e,amEntityId:t,pmEntityId:i,amValue:r,pmValue:s,slots:Ee(r,s)}}_handleCellClick(e,t){if(!this._config?.editable||!this.hass)return;const i=function(e){return e<24}(t),r=function(e){return e%24}(t),s=this._getEntityId(e,i?"am":"pm"),o=this._pendingValues.get(s)??this._getEntityValue(s);if(null===o)return;const n=(o^1<<r)>>>0;this._pendingValues=new Map(this._pendingValues),this._pendingValues.set(s,n),this._scheduleSend(s)}_copySelectedDayTo(e){if(!this._config?.editable||!this.hass)return;const t=this._buildDaySchedule(this._selectedDay);if(!t)return;const i=new Map(this._pendingValues),r=[];for(const s of e){if(s===this._selectedDay)continue;const e=this._getEntityId(s,"am"),o=this._getEntityId(s,"pm");this._getEffectiveValue(e)!==t.amValue&&(i.set(e,t.amValue),r.push(e)),this._getEffectiveValue(o)!==t.pmValue&&(i.set(o,t.pmValue),r.push(o))}if(0!==r.length){this._pendingValues=i;for(const e of r)this._flush(e)}}_scheduleSend(e){const t=this._debounceTimers.get(e);void 0!==t&&clearTimeout(t);const i=setTimeout(()=>this._flush(e),ze.DEBOUNCE_MS);this._debounceTimers.set(e,i)}_flush(e){const t=this._debounceTimers.get(e);void 0!==t&&(clearTimeout(t),this._debounceTimers.delete(e)),this._inFlight.has(e)||this._send(e)}async _send(e){let t=this._pendingValues.get(e);if(void 0!==t){this._inFlight=new Set([...this._inFlight,e]);try{for(;;){const i=await this._executeServiceCall(e,t);if(null===i){const t=new Map(this._pendingValues);return t.delete(e),this._pendingValues=t,void this._showError(e)}const r=this._pendingValues.get(e);if(void 0===r||r===i||this._debounceTimers.has(e))return;t=r}}finally{const t=new Set(this._inFlight);t.delete(e),this._inFlight=t}}}async _executeServiceCall(e,t){for(let i=0;i<=ze.MAX_RETRIES;i++)try{return await this.hass.callService("number","set_value",{entity_id:e,value:t}),t}catch(r){if(console.error(`Failed to update ${e} (attempt ${i+1}/${ze.MAX_RETRIES+1}):`,r),i<ze.MAX_RETRIES){const r=ze.RETRY_BASE_MS*Math.pow(2,i);await new Promise(e=>setTimeout(e,r));const s=this._pendingValues.get(e);if(void 0===s)return t;t=s}}return null}_showError(e){this._errorEntityIds=new Set([...this._errorEntityIds,e]),setTimeout(()=>{const t=new Set(this._errorEntityIds);t.delete(e),this._errorEntityIds=t},5e3)}_hasErrorForDay(e){const t=this._getEntityId(e,"am"),i=this._getEntityId(e,"pm");return this._errorEntityIds.has(t)||this._errorEntityIds.has(i)}willUpdate(e){if(super.willUpdate(e),e.has("hass")&&this._pendingValues.size>0){const e=[];for(const[t,i]of this._pendingValues)if(!this._debounceTimers.has(t)){this._getEntityValue(t)===i&&e.push(t)}if(e.length>0){const t=new Map(this._pendingValues);for(const i of e)t.delete(i);this._pendingValues=t}}}disconnectedCallback(){super.disconnectedCallback();for(const e of[...this._debounceTimers.keys()])this._flush(e)}render(){if(!this._config||!this.hass)return W``;const e=Te(),t=function(){const e=new Date;return 2*e.getHours()+(e.getMinutes()>=30?1:0)}(),i=this._buildDaySchedule(this._selectedDay);if(!i){if(!Se.find(e=>null!==this._buildDaySchedule(e)))return W`
          <ha-card>
            <div class="warning">
              No schedule entities found for prefix:
              ${this._config.schedule_entity_prefix}
            </div>
          </ha-card>
        `}const r=this._config.active_color||De,s=this._config.inactive_color||Me;return W`
      <ha-card>
        ${this._config.title?W`
              <div class="card-header">
                <div class="title">${this._config.title}</div>
              </div>
            `:F}

        ${"weekly"!==this._config.layout?W`
              <div class="day-tabs">
                ${this._displayDays().map(t=>W`
                  <button
                    class="day-tab ${be({active:t===this._selectedDay,"current-day":!1!==this._config.highlight_current_day&&t===e,error:this._hasErrorForDay(t)})}"
                    @click=${()=>{this._selectedDay=t}}
                  >
                    ${Ce[t]}
                  </button>
                `)}
              </div>
            `:F}

        ${this._renderErrorBanner()}

        ${this._config.show_copy_controls&&!1!==this._config.editable?this._renderCopyControls():F}

        ${"weekly"===this._config.layout?this._renderWeeklyGrid(e,t,r,s):W`
              <div class="schedule-container">
                <div class="schedule-row-wrapper">
                  ${i?this._renderScheduleRow(i,this._selectedDay===e,t,r,s):this._renderEmptyRow()}

                  ${!1!==this._config.show_time_labels?this._renderTimeLabels():F}
                </div>
              </div>
            `}
      </ha-card>
    `}_renderErrorBanner(){const e=this._displayDays().filter(e=>this._hasErrorForDay(e));return 0===e.length?F:W`
      <div class="error-banner">
        Failed to save ${e.map(e=>Ce[e]).join(", ")}. Changes were reverted.
      </div>
    `}_renderCopyControls(){const e=Ce[this._selectedDay],t=["monday","tuesday","wednesday","thursday","friday"],i=["saturday","sunday"];return W`
      <div class="copy-controls" role="group" aria-label="Copy ${e} schedule">
        <label class="copy-label" for="copy-source">Copy</label>
        <select
          id="copy-source"
          class="copy-source-select"
          @change=${e=>{this._selectedDay=e.target.value}}
        >
          ${this._displayDays().map(e=>W`
            <option value=${e} .selected=${ke(e===this._selectedDay)}>${Ce[e]}</option>
          `)}
        </select>
        <span class="copy-label">to</span>
        <button class="copy-button" @click=${()=>this._copySelectedDayTo(Se)}>
          All days
        </button>
        <button class="copy-button" @click=${()=>this._copySelectedDayTo(t)}>
          Weekdays
        </button>
        <button class="copy-button" @click=${()=>this._copySelectedDayTo(i)}>
          Weekend
        </button>
        ${this._inFlight.size>0||this._debounceTimers.size>0?W`<span class="copy-status" role="status">Saving...</span>`:F}
      </div>
    `}_renderWeeklyGrid(e,t,i,r){const s="tall"===this._config?.weekly_orientation,o=s?this._config?.weekly_cell_label_mode:"none",n={currentDay:e,currentSlot:t,activeColor:i,inactiveColor:r,editable:!1!==this._config?.editable,showLabels:"state"===o||"state_icon"===o,showIcons:"icon"===o||"state_icon"===o,schedules:new Map(Se.map(e=>[e,this._buildDaySchedule(e)]))},l=$e(this._config?.grid_line_color?{"--weekly-grid-line-color":this._config.grid_line_color}:{}),a=this._displayDays();return W`
      <div class="weekly-grid-wrapper">
        <div
          class="weekly-grid ${be({tall:s,wide:!s,labelled:n.showLabels||n.showIcons})}"
          aria-label="Weekly schedule"
          style=${l}
        >
          ${s?this._renderTallGrid(a,n):this._renderWideGrid(a,n)}
        </div>
      </div>
    `}_renderTallGrid(e,t){const i=this._config?.weekly_time_label_mode??"hour";return W`
      <div class="weekly-time-header" style="grid-row: 1; grid-column: 1"></div>
      ${e.map((e,t)=>this._renderDayHeader(e,1,t+2))}
      ${Array.from({length:48},(r,s)=>{const o="all"===i?W`<div class="weekly-time-label" style="grid-row: ${s+2}; grid-column: 1">
                ${Pe(s)}
              </div>`:s%2==0?W`<div class="weekly-time-label hour" style="grid-row: ${s+2} / span 2; grid-column: 1">
                  ${Pe(s)}
                </div>`:F;return W`
          ${o}
          ${e.map((e,i)=>this._renderWeeklyCell(e,s,s+2,i+2,t))}
        `})}
    `}_renderWideGrid(e,t){const i=e.length+1;return W`
      ${e.map((e,i)=>W`
        ${this._renderDayHeader(e,i+1,1)}
        ${Array.from({length:48},(r,s)=>this._renderWeeklyCell(e,s,i+1,s+2,t))}
      `)}
      ${!1!==this._config?.show_time_labels?Array.from({length:24},(e,t)=>W`
            <div class="weekly-hour-label" style="grid-row: ${i}; grid-column: ${2*t+2} / span 2">
              ${t}
            </div>
          `):F}
    `}_renderDayHeader(e,t,i){return W`
      <button
        class="weekly-day-header ${be({"current-day":!1!==this._config.highlight_current_day&&e===Te(),"copy-source":e===this._selectedDay,error:this._hasErrorForDay(e)})}"
        style="grid-row: ${t}; grid-column: ${i}"
        aria-pressed=${e===this._selectedDay?"true":"false"}
        @click=${()=>{this._selectedDay=e}}
      >
        ${Ce[e]}
      </button>
    `}_renderWeeklyCell(e,t,i,r,s){const o=s.schedules.get(e)??null,n=o?.slots[t]??!1,l=!1!==this._config?.highlight_current_slot&&e===s.currentDay&&t===s.currentSlot,a=n?this._config?.active_label??"On":this._config?.inactive_label??"Off",c=n?this._config?.active_text_color??"#ffffff":this._config?.inactive_text_color??"#212121",d=n?this._config?.active_icon??"mdi:weather-sunny":this._config?.inactive_icon??"mdi:weather-night",h=!s.editable||!o;return W`
      <button
        class="weekly-cell ${be({active:n,inactive:!n,"hour-end":t%2==1,"current-slot":l,readonly:h})}"
        style=${$e({gridRow:String(i),gridColumn:String(r),backgroundColor:n?s.activeColor:s.inactiveColor,color:c})}
        title="${Ce[e]} ${Pe(t)} - ${n?"Active":"Inactive"}"
        ?disabled=${h}
        @click=${()=>o&&this._handleCellClick(e,t)}
      >${s.showLabels||s.showIcons?W`<span class="weekly-cell-content">
            ${s.showIcons?W`<ha-icon .icon=${d}></ha-icon>`:F}
            ${s.showLabels?W`<span>${a}</span>`:F}
          </span>`:F}</button>
    `}_renderTimeLabels(){return W`
      <div class="time-labels">
        ${Array.from({length:48},(e,t)=>{const i=Math.floor(t/2);return W`
            <div class="time-label">
              ${t%2!=0?"":i}
            </div>
          `})}
      </div>
    `}_renderScheduleRow(e,t,i,r,s){const o=!1!==this._config?.editable;return W`
      <div class="schedule-row">
        ${e.slots.map((n,l)=>{const a=!1!==this._config?.highlight_current_slot&&t&&l===i;return W`
            <div
              class="schedule-cell ${be({active:n,inactive:!n,"current-slot":a,readonly:!o})}"
              style=${$e({backgroundColor:n?r:s})}
              title="${Pe(l)} - ${n?"Active":"Inactive"}"
              @click=${()=>this._handleCellClick(e.day,l)}
            ></div>
          `})}
      </div>
    `}_renderEmptyRow(){return W`
      <div class="schedule-row">
        ${Array.from({length:48},()=>W`
          <div
            class="schedule-cell inactive readonly"
            style="opacity: 0.3"
            title="No data"
          ></div>
        `)}
      </div>
    `}};He.DEBOUNCE_MS=500,He.MAX_RETRIES=2,He.RETRY_BASE_MS=1e3,e([ue({attribute:!1})],He.prototype,"hass",void 0),e([pe()],He.prototype,"_config",void 0),e([pe()],He.prototype,"_selectedDay",void 0),e([pe()],He.prototype,"_pendingValues",void 0),e([pe()],He.prototype,"_errorEntityIds",void 0),e([pe()],He.prototype,"_inFlight",void 0),He=ze=e([ce("econext-schedule-card")],He),window.customCards=window.customCards||[],window.customCards.push({type:"econext-schedule-card",name:"ecoNEXT Schedule Card",description:"Display and edit weekly schedules from ecoNEXT integration",preview:!0});let Ne=class extends le{constructor(){super(...arguments),this._config={},this._computeLabel=e=>Be[e.name]??e.name}setConfig(e){this._config={...e}}get _formData(){return{...Ve,...this._config}}render(){return W`
      <ha-form
        .hass=${this.hass}
        .data=${this._formData}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="colour-pickers">
        ${this._renderColourPicker("active_color","Active cell colour","#00bcd4")}
        ${this._renderColourPicker("inactive_color","Inactive cell colour","#e0e0e0")}
        ${"weekly"===this._config.layout?this._renderColourPicker("grid_line_color","Grid-line colour","#e0e0e0"):""}
        ${"weekly"===this._config.layout&&"tall"===this._config.weekly_orientation&&"none"!==(this._config.weekly_cell_label_mode??"none")?W`
              ${this._renderColourPicker("active_text_color","Active text colour","#ffffff")}
              ${this._renderColourPicker("inactive_text_color","Inactive text colour","#212121")}
            `:""}
      </div>
    `}_schema(){const e=Ue(this.hass),t=this._config.schedule_entity_prefix;return t&&!e.includes(t)&&e.unshift(t),0===e.length?We:[{name:"schedule_entity_prefix",required:!0,selector:{select:{mode:"dropdown",custom_value:!0,options:e.map(e=>({value:e,label:`${Ie(this.hass,e)} (${e})`}))}}},...We.slice(1)]}_valueChanged(e){e.stopPropagation();const t=e.detail.value,i=this._formData,r={...this._config};for(const[e,s]of Object.entries(t))s!==i[e]&&(void 0===s||""===s?delete r[e]:r[e]=s);this._config=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_renderColourPicker(e,t,i){return W`
      <ha-selector
        .hass=${this.hass}
        .label=${t}
        .selector=${{color_rgb:{}}}
        .value=${this._colourToRgb(this._config[e],i)}
        @value-changed=${t=>this._colourChanged(e,t)}
      ></ha-selector>
    `}_colourChanged(e,t){const[i,r,s]=t.detail.value;[i,r,s].every(Number.isFinite)&&(this._config={...this._config,[e]:`#${[i,r,s].map(e=>e.toString(16).padStart(2,"0")).join("")}`},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0})))}_colourToRgb(e,t){const i=(e??t).trim().replace(/^#/,"");return/^[0-9a-f]{6}$/i.test(i)?[0,2,4].map(e=>parseInt(i.slice(e,e+2),16)):this._colourToRgb(t,"#000000")}};Ne.styles=n`
    .colour-pickers {
      display: grid;
      gap: 16px;
      margin-top: 16px;
    }
  `,e([ue({attribute:!1})],Ne.prototype,"hass",void 0),e([pe()],Ne.prototype,"_config",void 0),Ne=e([ce("econext-schedule-card-editor")],Ne);const Ve={layout:"tabs",editable:!0,show_time_labels:!0,highlight_current_day:!0,highlight_current_slot:!0,weekly_orientation:"wide",weekly_time_label_mode:"hour",weekly_cell_label_mode:"none"},je=[{field:"layout",value:"weekly"},{field:"weekly_orientation",value:"tall"}],Le=[...je,{field:"weekly_cell_label_mode",operator:"not_eq",value:"none"}],We=[{name:"schedule_entity_prefix",required:!0,selector:{text:{}}},{name:"title",selector:{text:{}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"tabs",label:"One day at a time"},{value:"weekly",label:"Weekly grid"}]}}},{name:"editable",selector:{boolean:{}}},{name:"show_copy_controls",selector:{boolean:{}},visible:{field:"editable",value:!0}},{name:"weekly_orientation",selector:{select:{mode:"dropdown",options:[{value:"wide",label:"Wide: days as rows (compact)"},{value:"tall",label:"Tall: days as columns"}]}},visible:{field:"layout",value:"weekly"}},{name:"show_time_labels",selector:{boolean:{}},visible:{condition:"or",conditions:[{field:"layout",value:"tabs"},{field:"weekly_orientation",value:"wide"}]}},{name:"weekly_time_label_mode",selector:{select:{mode:"dropdown",options:[{value:"hour",label:"Hour labels"},{value:"all",label:"All slot labels"}]}},visible:je},{name:"weekly_cell_label_mode",selector:{select:{mode:"dropdown",options:[{value:"none",label:"No cell labels"},{value:"state",label:"Show state labels"},{value:"icon",label:"Show state icons"},{value:"state_icon",label:"Show state labels and icons"}]}},visible:je},{name:"active_label",selector:{text:{}},visible:Le},{name:"inactive_label",selector:{text:{}},visible:Le},{name:"active_icon",selector:{icon:{}},visible:Le},{name:"inactive_icon",selector:{icon:{}},visible:Le},{name:"highlight_current_day",selector:{boolean:{}}},{name:"highlight_current_slot",selector:{boolean:{}}}],Be={schedule_entity_prefix:"Schedule entity prefix",title:"Title",layout:"Layout",weekly_orientation:"Weekly grid shape",editable:"Allow editing",show_copy_controls:"Show copy controls",show_time_labels:"Show time labels",weekly_time_label_mode:"Time-label mode",weekly_cell_label_mode:"Cell-label mode",active_label:"Active label",inactive_label:"Inactive label",active_icon:"Active icon",inactive_icon:"Inactive icon",highlight_current_day:"Highlight current day",highlight_current_slot:"Highlight current time slot"};export{He as EconextScheduleCard};
//# sourceMappingURL=econext-schedule-card.js.map
