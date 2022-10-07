import{e as g,R as D,l as s,a as k,U as R}from"./index.1c04ff0a.js";import{I as T,C as c,F as w,D as _,a as C,S as d}from"./cssWorker.24decd40.js";import"./editorWorker.6c0d8014.js";var A=2*60*1e3,M=function(){function r(e){var o=this;this._defaults=e,this._worker=null,this._idleCheckInterval=window.setInterval(function(){return o._checkIfIdle()},30*1e3),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return o._stopWorker()})}return r.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},r.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},r.prototype._checkIfIdle=function(){if(!!this._worker){var e=Date.now()-this._lastUsedTime;e>A&&this._stopWorker()}},r.prototype._getClient=function(){return this._lastUsedTime=Date.now(),this._client||(this._worker=g.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{options:this._defaults.options,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client},r.prototype.getLanguageServiceWorker=function(){for(var e=this,o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];var n;return this._getClient().then(function(t){n=t}).then(function(t){return e._worker.withSyncedResources(o)}).then(function(t){return n})},r}(),E=function(){function r(e,o,a){var n=this;this._languageId=e,this._worker=o,this._disposables=[],this._listener=Object.create(null);var t=function(u){var f=u.getModeId();if(f===n._languageId){var h;n._listener[u.uri.toString()]=u.onDidChangeContent(function(){window.clearTimeout(h),h=window.setTimeout(function(){return n._doValidate(u.uri,f)},500)}),n._doValidate(u.uri,f)}},i=function(u){g.setModelMarkers(u,n._languageId,[]);var f=u.uri.toString(),h=n._listener[f];h&&(h.dispose(),delete n._listener[f])};this._disposables.push(g.onDidCreateModel(t)),this._disposables.push(g.onWillDisposeModel(i)),this._disposables.push(g.onDidChangeModelLanguage(function(u){i(u.model),t(u.model)})),a.onDidChange(function(u){g.getModels().forEach(function(f){f.getModeId()===n._languageId&&(i(f),t(f))})}),this._disposables.push({dispose:function(){for(var u in n._listener)n._listener[u].dispose()}}),g.getModels().forEach(t)}return r.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},r.prototype._doValidate=function(e,o){this._worker(e).then(function(a){return a.doValidation(e.toString())}).then(function(a){var n=a.map(function(i){return P(e,i)}),t=g.getModel(e);t&&t.getModeId()===o&&g.setModelMarkers(t,o,n)}).then(void 0,function(a){console.error(a)})},r}();function F(r){switch(r){case _.Error:return k.Error;case _.Warning:return k.Warning;case _.Information:return k.Info;case _.Hint:return k.Hint;default:return k.Info}}function P(r,e){var o=typeof e.code=="number"?String(e.code):e.code;return{severity:F(e.severity),startLineNumber:e.range.start.line+1,startColumn:e.range.start.character+1,endLineNumber:e.range.end.line+1,endColumn:e.range.end.character+1,message:e.message,code:o,source:e.source}}function m(r){if(!!r)return{character:r.column-1,line:r.lineNumber-1}}function K(r){if(!!r)return{start:{line:r.startLineNumber-1,character:r.startColumn-1},end:{line:r.endLineNumber-1,character:r.endColumn-1}}}function p(r){if(!!r)return new D(r.start.line+1,r.start.character+1,r.end.line+1,r.end.character+1)}function H(r){return typeof r.insert<"u"&&typeof r.replace<"u"}function W(r){var e=s.CompletionItemKind;switch(r){case c.Text:return e.Text;case c.Method:return e.Method;case c.Function:return e.Function;case c.Constructor:return e.Constructor;case c.Field:return e.Field;case c.Variable:return e.Variable;case c.Class:return e.Class;case c.Interface:return e.Interface;case c.Module:return e.Module;case c.Property:return e.Property;case c.Unit:return e.Unit;case c.Value:return e.Value;case c.Enum:return e.Enum;case c.Keyword:return e.Keyword;case c.Snippet:return e.Snippet;case c.Color:return e.Color;case c.File:return e.File;case c.Reference:return e.Reference}return e.Property}function I(r){if(!!r)return{range:p(r.range),text:r.newText}}var L=function(){function r(e){this._worker=e}return Object.defineProperty(r.prototype,"triggerCharacters",{get:function(){return[" ",":"]},enumerable:!1,configurable:!0}),r.prototype.provideCompletionItems=function(e,o,a,n){var t=e.uri;return this._worker(t).then(function(i){return i.doComplete(t.toString(),m(o))}).then(function(i){if(!!i){var u=e.getWordUntilPosition(o),f=new D(o.lineNumber,u.startColumn,o.lineNumber,u.endColumn),h=i.items.map(function(l){var v={label:l.label,insertText:l.insertText||l.label,sortText:l.sortText,filterText:l.filterText,documentation:l.documentation,detail:l.detail,range:f,kind:W(l.kind)};return l.textEdit&&(H(l.textEdit)?v.range={insert:p(l.textEdit.insert),replace:p(l.textEdit.replace)}:v.range=p(l.textEdit.range),v.insertText=l.textEdit.newText),l.additionalTextEdits&&(v.additionalTextEdits=l.additionalTextEdits.map(I)),l.insertTextFormat===T.Snippet&&(v.insertTextRules=s.CompletionItemInsertTextRule.InsertAsSnippet),v});return{isIncomplete:i.isIncomplete,suggestions:h}}})},r}();function N(r){return r&&typeof r=="object"&&typeof r.kind=="string"}function S(r){return typeof r=="string"?{value:r}:N(r)?r.kind==="plaintext"?{value:r.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:r.value}:{value:"```"+r.language+`
`+r.value+"\n```\n"}}function V(r){if(!!r)return Array.isArray(r)?r.map(S):[S(r)]}var U=function(){function r(e){this._worker=e}return r.prototype.provideHover=function(e,o,a){var n=e.uri;return this._worker(n).then(function(t){return t.doHover(n.toString(),m(o))}).then(function(t){if(!!t)return{range:p(t.range),contents:V(t.contents)}})},r}();function O(r){switch(r){case C.Read:return s.DocumentHighlightKind.Read;case C.Write:return s.DocumentHighlightKind.Write;case C.Text:return s.DocumentHighlightKind.Text}return s.DocumentHighlightKind.Text}var j=function(){function r(e){this._worker=e}return r.prototype.provideDocumentHighlights=function(e,o,a){var n=e.uri;return this._worker(n).then(function(t){return t.findDocumentHighlights(n.toString(),m(o))}).then(function(t){if(!!t)return t.map(function(i){return{range:p(i.range),kind:O(i.kind)}})})},r}();function x(r){return{uri:R.parse(r.uri),range:p(r.range)}}var B=function(){function r(e){this._worker=e}return r.prototype.provideDefinition=function(e,o,a){var n=e.uri;return this._worker(n).then(function(t){return t.findDefinition(n.toString(),m(o))}).then(function(t){if(!!t)return[x(t)]})},r}(),$=function(){function r(e){this._worker=e}return r.prototype.provideReferences=function(e,o,a,n){var t=e.uri;return this._worker(t).then(function(i){return i.findReferences(t.toString(),m(o))}).then(function(i){if(!!i)return i.map(x)})},r}();function q(r){if(!(!r||!r.changes)){var e=[];for(var o in r.changes)for(var a=R.parse(o),n=0,t=r.changes[o];n<t.length;n++){var i=t[n];e.push({resource:a,edit:{range:p(i.range),text:i.newText}})}return{edits:e}}}var z=function(){function r(e){this._worker=e}return r.prototype.provideRenameEdits=function(e,o,a,n){var t=e.uri;return this._worker(t).then(function(i){return i.doRename(t.toString(),m(o),a)}).then(function(i){return q(i)})},r}();function G(r){var e=s.SymbolKind;switch(r){case d.File:return e.Array;case d.Module:return e.Module;case d.Namespace:return e.Namespace;case d.Package:return e.Package;case d.Class:return e.Class;case d.Method:return e.Method;case d.Property:return e.Property;case d.Field:return e.Field;case d.Constructor:return e.Constructor;case d.Enum:return e.Enum;case d.Interface:return e.Interface;case d.Function:return e.Function;case d.Variable:return e.Variable;case d.Constant:return e.Constant;case d.String:return e.String;case d.Number:return e.Number;case d.Boolean:return e.Boolean;case d.Array:return e.Array}return e.Function}var J=function(){function r(e){this._worker=e}return r.prototype.provideDocumentSymbols=function(e,o){var a=e.uri;return this._worker(a).then(function(n){return n.findDocumentSymbols(a.toString())}).then(function(n){if(!!n)return n.map(function(t){return{name:t.name,detail:"",containerName:t.containerName,kind:G(t.kind),tags:[],range:p(t.location.range),selectionRange:p(t.location.range)}})})},r}(),Q=function(){function r(e){this._worker=e}return r.prototype.provideDocumentColors=function(e,o){var a=e.uri;return this._worker(a).then(function(n){return n.findDocumentColors(a.toString())}).then(function(n){if(!!n)return n.map(function(t){return{color:t.color,range:p(t.range)}})})},r.prototype.provideColorPresentations=function(e,o,a){var n=e.uri;return this._worker(n).then(function(t){return t.getColorPresentations(n.toString(),o.color,K(o.range))}).then(function(t){if(!!t)return t.map(function(i){var u={label:i.label};return i.textEdit&&(u.textEdit=I(i.textEdit)),i.additionalTextEdits&&(u.additionalTextEdits=i.additionalTextEdits.map(I)),u})})},r}(),X=function(){function r(e){this._worker=e}return r.prototype.provideFoldingRanges=function(e,o,a){var n=e.uri;return this._worker(n).then(function(t){return t.getFoldingRanges(n.toString(),o)}).then(function(t){if(!!t)return t.map(function(i){var u={start:i.startLine+1,end:i.endLine+1};return typeof i.kind<"u"&&(u.kind=Y(i.kind)),u})})},r}();function Y(r){switch(r){case w.Comment:return s.FoldingRangeKind.Comment;case w.Imports:return s.FoldingRangeKind.Imports;case w.Region:return s.FoldingRangeKind.Region}}var Z=function(){function r(e){this._worker=e}return r.prototype.provideSelectionRanges=function(e,o,a){var n=e.uri;return this._worker(n).then(function(t){return t.getSelectionRanges(n.toString(),o.map(m))}).then(function(t){if(!!t)return t.map(function(i){for(var u=[];i;)u.push({range:p(i.range)}),i=i.parent;return u})})},r}();function ne(r){var e=[],o=[],a=new M(r);e.push(a);var n=function(){for(var i=[],u=0;u<arguments.length;u++)i[u]=arguments[u];return a.getLanguageServiceWorker.apply(a,i)};function t(){var i=r.languageId,u=r.modeConfiguration;y(o),u.completionItems&&o.push(s.registerCompletionItemProvider(i,new L(n))),u.hovers&&o.push(s.registerHoverProvider(i,new U(n))),u.documentHighlights&&o.push(s.registerDocumentHighlightProvider(i,new j(n))),u.definitions&&o.push(s.registerDefinitionProvider(i,new B(n))),u.references&&o.push(s.registerReferenceProvider(i,new $(n))),u.documentSymbols&&o.push(s.registerDocumentSymbolProvider(i,new J(n))),u.rename&&o.push(s.registerRenameProvider(i,new z(n))),u.colors&&o.push(s.registerColorProvider(i,new Q(n))),u.foldingRanges&&o.push(s.registerFoldingRangeProvider(i,new X(n))),u.diagnostics&&o.push(new E(i,n,r)),u.selectionRanges&&o.push(s.registerSelectionRangeProvider(i,new Z(n)))}return t(),e.push(b(o)),b(e)}function b(r){return{dispose:function(){return y(r)}}}function y(r){for(;r.length;)r.pop().dispose()}export{ne as setupMode};