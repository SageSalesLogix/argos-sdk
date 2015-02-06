/*
 * 
 */
(function(){var d=Sage,a=Sage.namespace("Sage.SData.Client.Ajax");var h=function(i){return((i>=200&&i<300)||i===304)};var b=function(m,l){if(m.readyState==4){if(h(m.status)){if(l.success){l.success.call(l.scope||this,m,l)}}else{if(m.status===0){var k=false;try{k=(m.statusText==="")}catch(i){k=true}if(k){var j=l.aborted||l.failure;if(j){j.call(l.scope||this,m,l)}}else{if(l.failure){l.failure.call(l.scope||this,m,l)}}}else{if(l.failure){l.failure.call(l.scope||this,m,l)}}}}};var f=function(j,i){if(i.failure){i.failure.call(i.scope||this,j,i)}};var e=function(j,i){j.ontimeout=function(){f.call(j,j,i)}};var c=function(j,i){j.onreadystatechange=function(){b.call(j,j,i)}};var g=function(j){var i=[];for(var k in j){i.push(encodeURIComponent(k)+"="+encodeURIComponent(j[k]))}return i.join("&")};Sage.apply(Sage.SData.Client.Ajax,{request:function(l){var l=d.apply({},l);l.params=d.apply({},l.params);l.headers=d.apply({},l.headers);if(l.cache!==true){l.params[l.cacheParam||"_t"]=(new Date()).getTime()}l.method=l.method||"GET";var i=g(l.params);if(i){l.url=l.url+(/\?/.test(l.url)?"&":"?")+i}var k=new XMLHttpRequest();if(l.user){k.open(l.method,l.url,l.async!==false,l.user,l.password)}else{k.open(l.method,l.url,l.async!==false)}if(l.withCredentials){k.withCredentials=true}try{k.setRequestHeader("Accept",l.accept||"*/*");k.setRequestHeader("X-Requested-With","XMLHttpRequest");if(l.contentType){k.setRequestHeader("Content-Type",l.contentType)}for(var m in l.headers){k.setRequestHeader(m,l.headers[m])}}catch(j){}if(typeof l.timeout==="number"&&l.timeout>=0&&req.hasOwnProperty("timeout")){k.timeout=l.timeout;e(k,l)}if(l.async!==false){c(k,l);k.send(l.body||null)}else{k.send(l.body||null);b(k,l)}return k},cancel:function(i){i.abort()}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataBaseRequest=Sage.Class.define({service:null,uri:null,completeHeaders:null,extendedHeaders:null,constructor:function(c){this.base.apply(this,arguments);this.service=c;this.completeHeaders={};this.extendedHeaders={};this.uri=new Sage.SData.Client.SDataUri();var d;if(this.service){this.uri.setVersion(this.service.getVersion());d=this.service.getIncludeContent();if(typeof d!=="undefined"){this.uri.setIncludeContent(d)}this.uri.setServer(this.service.getVirtualDirectory()?this.service.getVirtualDirectory():"sdata");this.uri.setScheme(this.service.getProtocol());this.uri.setHost(this.service.getServerName());this.uri.setPort(this.service.getPort())}},clone:function(){return new Sage.SData.Client.SDataBaseRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},setRequestHeader:function(c,d){this.completeHeaders[c]=d},extendRequestHeader:function(c,d){this.extendedHeaders[c]=d},clearRequestHeader:function(c){delete this.completeHeaders[c];delete this.extendedHeaders[c]},getAccept:function(){return this.extendedHeaders.Accept},setAccept:function(c){this.extendRequestHeader("Accept",c);return this},getService:function(){return this.service},getUri:function(){return this.uri},setUri:function(c){this.uri=c;return this},getServerName:function(){return this.uri.getHost()},setServerName:function(c){this.uri.setHost(c);return this},getVirtualDirectory:function(){return this.uri.getServer()},setVirtualDirectory:function(c){this.uri.setServer(c);return this},getProtocol:function(){return this.uri.getScheme()},setProtocol:function(c){this.uri.setScheme(c);return this},getPort:function(){return this.uri.getPort()},setPort:function(c){this.uri.setPort(c);return this},getQueryArgs:function(){return this.uri.getQueryArgs()},setQueryArgs:function(d,c){this.uri.setQueryArgs(d,c);return this},getQueryArg:function(c){return this.uri.getQueryArg(c)},setQueryArg:function(c,d){this.uri.setQueryArg(c,d);return this},build:function(c){return this.uri.build(c)},toString:function(c){return this.build(c)}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataApplicationRequest=Sage.SData.Client.SDataBaseRequest.extend({constructor:function(){this.base.apply(this,arguments);if(this.service){this.uri.setProduct(this.service.getApplicationName()?this.service.getApplicationName():"-");this.uri.setContract(this.service.getContractName()?this.service.getContractName():"-");this.uri.setCompanyDataset(this.service.getDataSet()?this.service.getDataSet():"-")}},clone:function(){return new Sage.SData.Client.SDataApplicationRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},getApplicationName:function(){return this.uri.getProduct()},setApplicationName:function(c){this.uri.setProduct(c);return this},getContractName:function(){return this.uri.getContract()},setContractName:function(c){this.uri.setContract(c);return this},getDataSet:function(){return this.uri.getCompanyDataset()},setDataSet:function(c){this.uri.setCompanyDataset(c);return this},getResourceKind:function(){return this.uri.getCollectionType()},setResourceKind:function(c){this.uri.setCollectionType(c);return this}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataResourceCollectionRequest=Sage.SData.Client.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments)},clone:function(){return new Sage.SData.Client.SDataResourceCollectionRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},getCount:function(){return this.uri.getCount()},setCount:function(c){this.uri.setCount(c);return this},getStartIndex:function(){return this.uri.getStartIndex()},setStartIndex:function(c){this.uri.setStartIndex(c);return this},read:function(c){return this.service.readFeed(this,c)}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataNamedQueryRequest=Sage.SData.Client.SDataResourceCollectionRequest.extend({constructor:function(){this.base.apply(this,arguments);this.uri.setPathSegment(b.SDataUri.ResourcePropertyIndex,b.SDataUri.NamedQuerySegment)},clone:function(){return new Sage.SData.Client.SDataNamedQueryRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},getQueryName:function(){return this.uri.getPathSegment(b.SDataUri.ResourcePropertyIndex+1)},setQueryName:function(c){this.uri.setPathSegment(b.SDataUri.ResourcePropertyIndex+1,c);return this}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataSingleResourceRequest=Sage.SData.Client.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments)},clone:function(){return new Sage.SData.Client.SDataSingleResourceRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},read:function(c){return this.service.readEntry(this,c)},update:function(d,c){return this.service.updateEntry(this,d,c)},create:function(d,c){return this.service.createEntry(this,d,c)},"delete":function(d,c){return this.service.deleteEntry(this,d,c)},getResourceSelector:function(){return this.uri.getCollectionPredicate()},setResourceSelector:function(c){this.uri.setCollectionPredicate(c);return this}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataResourcePropertyRequest=Sage.SData.Client.SDataSingleResourceRequest.extend({constructor:function(){this.base.apply(this,arguments)},clone:function(){return new Sage.SData.Client.SDataResourcePropertyRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},readFeed:function(c){return this.service.readFeed(this,c)},getResourceProperty:function(){return this.uri.getPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex)},setResourceProperty:function(c){this.uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex,c);return this}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataSystemRequest=Sage.SData.Client.SDataBaseRequest.extend({constructor:function(){this.base.apply(this,arguments);this.uri.setPathSegment(Sage.SData.Client.SDataUri.ProductPathIndex,Sage.SData.Client.SDataUri.SystemSegment)},clone:function(){return new Sage.SData.Client.SDataSystemRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},getCategory:function(){this.uri.getPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex)},setCategory:function(c){this.uri.setPathSegment(Sage.SData.Client.SDataUri.ContractTypePathIndex,c);return this},read:function(c){return this.service.readFeed(this,c)}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataTemplateResourceRequest=Sage.SData.Client.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments);this.uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex,Sage.SData.Client.SDataUri.TemplateSegment)},clone:function(){return new Sage.SData.Client.SDataTemplateResourceRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},read:function(c){return this.service.readEntry(this,c)}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataServiceOperationRequest=Sage.SData.Client.SDataApplicationRequest.extend({constructor:function(){this.base.apply(this,arguments);this.uri.setPathSegment(b.SDataUri.ResourcePropertyIndex,b.SDataUri.ServiceMethodSegment)},clone:function(){return new Sage.SData.Client.SDataServiceOperationRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri))},execute:function(d,c){return this.service.executeServiceOperation(this,d,c)},getOperationName:function(){return this.uri.getPathSegment(b.SDataUri.ResourcePropertyIndex+1)},setOperationName:function(c){this.uri.setPathSegment(b.SDataUri.ResourcePropertyIndex+1,c);return this}})})();(function(){var a=Sage,b=Sage.namespace("Sage.SData.Client");Sage.SData.Client.SDataBatchRequest=Sage.SData.Client.SDataApplicationRequest.extend({items:null,constructor:function(){this.base.apply(this,arguments);this.items=[];this.uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex,Sage.SData.Client.SDataUri.BatchSegment)},clone:function(){return new Sage.SData.Client.SDataBatchRequest(this.service).setUri(new Sage.SData.Client.SDataUri(this.uri)).setItems(this.items.slice(0))},getItems:function(){return this.items},setItems:function(c){this.items=c;return this},using:function(d,c){if(this.service){this.service.registerBatchScope(this)}else{throw"A service must be associated with the batch request."}try{d.call(c||this,this)}catch(f){this.service.clearBatchScope(this);throw f}this.service.clearBatchScope(this);return this},add:function(c){this.items.push(c)},commit:function(c){this.service.commitBatch(this,c)}})})();(function(){var a=Sage,c=Sage.namespace("Sage.SData.Client"),b=/^true$/i;Sage.SData.Client.SDataUri=Sage.Class.define({scheme:"http",host:"",server:"",port:-1,version:null,queryArgs:null,pathSegments:null,constructor:function(d){this.base.apply(this,arguments);a.apply(this,d);this.queryArgs=a.apply({},d&&d.queryArgs);this.pathSegments=(d&&d.pathSegments&&d.pathSegments.slice(0))||[];this.version=(d&&d.version&&a.apply({},d.version))||{major:1,minor:0}},clone:function(){return new Sage.SData.Client.SDataUri(this)},getVersion:function(){return this.version},setVersion:function(d){this.version=a.apply({major:0,minor:0},d);return this},getScheme:function(){return this.scheme},setScheme:function(d){this.scheme=d;return this},getHost:function(){return this.host},setHost:function(d){this.host=d;return this},getPort:function(){return this.port},setPort:function(d){this.port=d;return this},getServer:function(){return this.server},setServer:function(d){this.server=d;return this},getQueryArgs:function(){return this.queryArgs},setQueryArgs:function(e,d){this.queryArgs=d?e:a.apply(this.queryArgs,e);return this},getQueryArg:function(d){return this.queryArgs[d]},setQueryArg:function(d,e){this.queryArgs[d]=e;return this},getPathSegments:function(){return this.pathSegments},setPathSegments:function(d){this.pathSegments=d;return this},getPathSegment:function(d){return this.pathSegments.length>d?this.pathSegments[d]:false},setPathSegment:function(e,g,d){if(!g&&!d){this.pathSegments[e]=null}else{if(typeof g==="object"){this.pathSegments[e]=a.apply({},g,this.pathSegments[e])}else{var f={};if(g){f.text=g}if(d){f.predicate=d}this.pathSegments[e]=a.apply({},f,this.pathSegments[e])}}return this},getStartIndex:function(){return this.queryArgs[c.SDataUri.QueryArgNames.StartIndex]?parseInt(this.queryArgs[c.SDataUri.QueryArgNames.StartIndex]):-1},setStartIndex:function(d){this.queryArgs[c.SDataUri.QueryArgNames.StartIndex]=d;return this},getCount:function(){return this.queryArgs[c.SDataUri.QueryArgNames.Count]?parseInt(this.queryArgs[c.SDataUri.QueryArgNames.Count]):-1},setCount:function(d){this.queryArgs[c.SDataUri.QueryArgNames.Count]=d;return this},getIncludeContent:function(){var d,e;d=this.version.major>=1?c.SDataUri.QueryArgNames.IncludeContent:c.SDataUri.QueryArgNames.LegacyIncludeContent;e=this.queryArgs[d];if(typeof e!=="undefined"){return b.test(e)}else{return e}},setCompact:function(d){this.queryArgs[c.SDataUri.QueryArgNames.Compact]=d;return this},getCompact:function(){return this.queryArgs[c.SDataUri.QueryArgNames]},setIncludeContent:function(e){var d=this.version.major>=1?c.SDataUri.QueryArgNames.IncludeContent:c.SDataUri.QueryArgNames.LegacyIncludeContent;this.queryArgs[d]=""+e;return this},appendPath:function(e){var d=typeof e==="string"?{text:e}:e;this.pathSegments.push(d);return this},toString:function(d){return this.build(d)},build:function(e){var d=[];d.push(this.getScheme()||c.SDataUri.Http);d.push(c.SDataUri.SchemeSuffix);d.push(c.SDataUri.PathSegmentPrefix);d.push(c.SDataUri.PathSegmentPrefix);d.push(this.getHost());if(this.getPort()>0){d.push(c.SDataUri.PortPrefix,this.getPort())}d.push(c.SDataUri.PathSegmentPrefix);var j=this.getPathSegments();var n=[];var g=this.getServer();if(g&&g.length>0){n=n.concat(g.split("/"))}for(var h=0;h<j.length;h++){var k=j[h];if(k&&k.text){if(k.predicate){n.push(encodeURIComponent(k.text+"("+k.predicate+")"))}else{n.push(encodeURIComponent(k.text))}}}d.push(n.join(c.SDataUri.PathSegmentPrefix));if(e){return d.join("")}var f=this.getQueryArgs();var l=[];for(var m in f){l.push(encodeURIComponent(m)+c.SDataUri.QueryArgValuePrefix+encodeURIComponent(f[m]))}if(l.length>0){d.push(c.SDataUri.QueryPrefix);d.push(l.join(c.SDataUri.QueryArgPrefix))}return d.join("")},getProduct:function(){return this.getPathSegment(c.SDataUri.ProductPathIndex)},setProduct:function(d){return this.setPathSegment(c.SDataUri.ProductPathIndex,d)},getContract:function(){return this.getPathSegment(c.SDataUri.ContractTypePathIndex)},setContract:function(d){return this.setPathSegment(c.SDataUri.ContractTypePathIndex,d)},getCompanyDataset:function(){return this.getPathSegment(c.SDataUri.CompanyDatasetPathIndex)},setCompanyDataset:function(d){return this.setPathSegment(c.SDataUri.CompanyDatasetPathIndex,d)},getCollectionType:function(){return this.getPathSegment(c.SDataUri.CollectionTypePathIndex)},setCollectionType:function(d){return this.setPathSegment(c.SDataUri.CollectionTypePathIndex,d)},getCollectionPredicate:function(){var d=this.getPathSegment(c.SDataUri.CollectionTypePathIndex);return(d&&d.predicate)||false},setCollectionPredicate:function(d){return this.setPathSegment(c.SDataUri.CollectionTypePathIndex,{predicate:d})}});Sage.apply(Sage.SData.Client.SDataUri,{Http:"http",Https:"https",PathSegmentPrefix:"/",PortPrefix:":",QueryArgPrefix:"&",QueryArgValuePrefix:"=",QueryPrefix:"?",SchemeSuffix:":",UnspecifiedPort:-1,UriName:"uri",QueryArgNames:{Compact:"_compact",Count:"count",Exclude:"exclude",Format:"format",Include:"include",IncludeContent:"_includeContent",LegacyIncludeContent:"includeContent",IncludeSchema:"includeSchema",Language:"language",OrderBy:"orderby",Precedence:"precedence",ReturnDelta:"returnDelta",Search:"search",Select:"select",StartIndex:"startIndex",Thumbnail:"thumbnail",TrackingID:"trackingID",Where:"where"},ProductPathIndex:0,ContractTypePathIndex:1,CompanyDatasetPathIndex:2,CollectionTypePathIndex:3,ResourcePropertyIndex:4,ServiceMethodSegment:"$service",TemplateSegment:"$template",SystemSegment:"$system",NamedQuerySegment:"$queries",BatchSegment:"$batch"})})();(function(){var c=Sage,f=Sage.namespace("Sage.SData.Client"),b=function(g){return typeof g!=="undefined"},d=function(k,l,j){var g={},i=typeof k==="object"?k.url:k;var h=(typeof parseUri==="function")&&parseUri(i);if(h){if(h.host){g.serverName=h.host}var m=h.path.split("/").slice(1);if(m[0]){g.virtualDirectory=m[0]}if(m[1]){g.applicationName=m[1]}if(m[2]){g.contractName=m[2]}if(m[3]){g.dataSet=m[3]}if(h.port){g.port=parseInt(h.port)}if(h.protocol){g.protocol=h.protocol}}if(typeof k==="object"){c.apply(g,k)}if(b(l)){g.userName=l}if(b(j)){g.password=j}return g},a=function(g){return g&&g["#text"]?g["#text"]:g},e=/^(.+?):(.*)$/;Sage.SData.Client.SDataService=Sage.Evented.extend({uri:null,useCredentialedRequest:false,useCrossDomainCookies:false,userAgent:"Sage",userName:false,password:"",batchScope:null,timeout:0,constructor:function(i,j,h){this.base.call(this,i);this.uri=new Sage.SData.Client.SDataUri();var g=d(i,j,h);if(b(g.uri)){this.uri=new Sage.SData.Client.SDataUri(g.uri)}if(b(g.serverName)){this.uri.setHost(g.serverName)}if(b(g.virtualDirectory)){this.uri.setServer(g.virtualDirectory)}if(b(g.applicationName)){this.uri.setProduct(g.applicationName)}if(b(g.contractName)){this.uri.setContract(g.contractName)}if(b(g.dataSet)){this.uri.setCompanyDataset(g.dataSet)}if(b(g.port)){this.uri.setPort(g.port)}if(b(g.protocol)){this.uri.setScheme(g.protocol)}if(b(g.includeContent)){this.uri.setIncludeContent(g.includeContent)}if(b(g.version)){this.uri.setVersion(g.version)}if(b(g.json)){this.json=g.json}if(b(g.timeout)){this.timeout=g.timeout}if(b(g.compact)){this.uri.setCompact(g.compact)}if(b(g.userName)){this.userName=g.userName}if(b(g.password)){this.password=g.password}if(b(g.useCredentialedRequest)){this.useCredentialedRequest=g.useCredentialedRequest}if(b(g.useCrossDomainCookies)){this.useCrossDomainCookies=g.useCrossDomainCookies}this.addEvents("beforerequest","requestcomplete","requestexception","requestaborted")},isJsonEnabled:function(){return this.json},enableJson:function(){this.json=true;return this},disableJson:function(){this.json=false;return this},getVersion:function(){return this.uri.getVersion()},setVersion:function(g){this.uri.setVersion(g);return this},getUri:function(){return this.uri},getUserName:function(){return this.userName},setUserName:function(g){this.userName=g;return this},getPassword:function(){return this.password},setPassword:function(g){this.password=g;return this},getProtocol:function(){return this.uri.getScheme()},setProtocol:function(g){this.uri.setScheme(g);return this},getServerName:function(){return this.uri.getHost()},setServerName:function(g){this.uri.setHost(g);return this},getPort:function(){return this.uri.getPort()},setPort:function(g){this.uri.setPort(g);return this},getVirtualDirectory:function(){return this.uri.getServer()},setVirtualDirectory:function(g){this.uri.setServer(g);return this},getApplicationName:function(){return this.uri.getProduct()},setApplicationName:function(g){this.uri.setProduct(g);return this},getContractName:function(){return this.uri.getContract()},setContractName:function(g){this.uri.setContract(g);return this},getDataSet:function(){return this.uri.getCompanyDataset()},setDataSet:function(g){this.uri.setCompanyDataset(g);return this},getIncludeContent:function(){return this.uri.getIncludeContent()},setIncludeContent:function(g){this.uri.setIncludeContent(g);return this},getUserAgent:function(){return this.userAgent},setUserAgent:function(g){this.userAgent=g;return this},registerBatchScope:function(g){this.batchScope=g},clearBatchScope:function(g){this.batchScope=null},createBasicAuthToken:function(){return"Basic "+Base64.encode(this.userName+":"+this.password)},createHeadersForRequest:function(g){var h={"X-Authorization-Mode":"no-challenge"};if(this.userName&&!this.useCredentialedRequest){h.Authorization=h["X-Authorization"]=this.createBasicAuthToken()}return h},extendAcceptRequestHeader:function(g,h){if(g){return g.split(/\s*,\s*/).join(";"+h+",")+";"+h}return g},executeRequest:function(h,g,i){if(this.json){h.setQueryArg("format","json")}var j=c.apply({async:g.async,headers:{},method:"GET",url:h.build()},{scope:this,success:function(k,l){var m=this.processFeed(k);this.fireEvent("requestcomplete",h,l,m);if(g.success){g.success.call(g.scope||this,m)}},failure:function(k,l){this.fireEvent("requestexception",h,l,k);if(g.failure){g.failure.call(g.scope||this,k,l)}},aborted:function(k,l){this.fireEvent("requestaborted",h,l,k);if(g.aborted){g.aborted.call(g.scope||this,k,l)}}},i);c.apply(j.headers,this.createHeadersForRequest(h),h.completeHeaders);if(typeof this.timeout==="number"){j.timeout=this.timeout}if(h.extendedHeaders.Accept){j.headers.Accept=this.extendAcceptRequestHeader(j.headers.Accept,h.extendedHeaders.Accept)}if(this.useCredentialedRequest||this.useCrossDomainCookies){j.withCredentials=true}if(this.useCredentialedRequest&&this.userName){j.user=this.userName;j.password=this.password}this.fireEvent("beforerequest",h,j);if(typeof j.result!=="undefined"){if(g.success){g.success.call(g.scope||this,j.result)}return}return f.Ajax.request(j)},abortRequest:function(g){f.Ajax.cancel(g)},readFeed:function(h,g){g=g||{};if(this.batchScope){this.batchScope.add({url:h.build(),method:"GET"});return}var i={headers:{Accept:this.json?"application/json,*/*":"application/atom+xml;type=feed,*/*"}};if(g.httpMethodOverride){if(this.json){h.setQueryArg("format","json")}i.headers["X-HTTP-Method-Override"]="GET";i.method="POST";i.body=h.build();i.url=h.build(true)}return this.executeRequest(h,g,i)},readEntry:function(h,g){g=g||{};if(this.batchScope){this.batchScope.add({url:h.build(),method:"GET"});return}var i=c.apply({},{success:function(k){var j=k["$resources"][0]||false;if(g.success){g.success.call(g.scope||this,j)}}},g);return this.executeRequest(h,i,{headers:{Accept:this.json?"application/json,*/*":"application/atom+xml;type=entry,*/*"}})},createEntry:function(j,i,h){h=h||{};if(this.batchScope){this.batchScope.add({url:j.build(),entry:i,method:"POST"});return}var l=c.apply({},{success:function(n){var m=n["$resources"][0]||false;if(h.success){h.success.call(h.scope||this,m)}}},h);var k=c.apply({},{method:"POST"});if(this.isJsonEnabled()){c.apply(k,{body:JSON.stringify(i),headers:{"Content-Type":"application/json"}})}else{var g=new XML.ObjTree();g.attr_prefix="@";c.apply(k,{body:g.writeXML(this.formatEntry(i)),headers:{"Content-Type":"application/atom+xml;type=entry",Accept:"application/atom+xml;type=entry,*/*"}})}return this.executeRequest(j,l,k)},updateEntry:function(j,i,h){h=h||{};if(this.batchScope){this.batchScope.add({url:j.build(),entry:i,method:"PUT",etag:i["$etag"]});return}var m=c.apply({},{success:function(o){var n=o["$resources"][0]||false;if(h.success){h.success.call(h.scope||this,n)}}},h);var l={},k={method:"PUT",headers:l};if(i["$etag"]&&!(h&&h.ignoreETag)){l["If-Match"]=i["$etag"]}if(this.isJsonEnabled()){l["Content-Type"]="application/json";k.body=JSON.stringify(i)}else{var g=new XML.ObjTree();g.attr_prefix="@";l["Content-Type"]="application/atom+xml;type=entry";l.Accept="application/atom+xml;type=entry,*/*";k.body=g.writeXML(this.formatEntry(i))}return this.executeRequest(j,m,k)},deleteEntry:function(i,h,g){g=g||{};if(this.batchScope){this.batchScope.add({url:i.build(),method:"DELETE",etag:!(g&&g.ignoreETag)&&h["$etag"]});return}var k={},j={method:"DELETE",headers:k};if(h["$etag"]&&!(g&&g.ignoreETag)){k["If-Match"]=h["$etag"]}return this.executeRequest(i,g,j)},executeServiceOperation:function(j,i,h){var l=c.apply({},{success:function(o){var n=o["$resources"][0]||false,m=n&&n.response,q=m&&m["$resources"],p=q&&q[0];if(p&&p["$name"]){n.response={};n.response[p["$name"]]=p}if(h.success){h.success.call(h.scope||this,n)}}},h);var k=c.apply({},{method:"POST"});if(this.isJsonEnabled()){c.apply(k,{body:JSON.stringify(i),headers:{"Content-Type":"application/json"}})}else{var g=new XML.ObjTree();g.attr_prefix="@";c.apply(k,{body:g.writeXML(this.formatEntry(i)),headers:{"Content-Type":"application/atom+xml;type=entry",Accept:"application/atom+xml;type=entry,*/*"}})}return this.executeRequest(j,l,k)},commitBatch:function(g,p){p=p||{};var k=g.getItems(),o,m,n={"$resources":[]};for(var h=0;h<k.length;h++){o=k[h];m=c.apply({},o.entry);if(o.url){m["$url"]=o.url}if(o.etag){m["$ifMatch"]=o.etag}if(o.method){m["$httpMethod"]=o.method}delete m["$etag"];n["$resources"].push(m)}var l=c.apply({},{method:"POST"});if(this.isJsonEnabled()){c.apply(l,{body:JSON.stringify(n),headers:{"Content-Type":"application/json"}})}else{var j=new XML.ObjTree();j.attr_prefix="@";c.apply(l,{body:j.writeXML(this.formatFeed(n)),headers:{"Content-Type":"application/atom+xml;type=feed",Accept:"application/atom+xml;type=feed,*/*"}})}return this.executeRequest(g,p,l)},parseFeedXml:function(h){var g=new XML.ObjTree();g.attr_prefix="@";return g.parseXML(h)},isIncludedReference:function(h,g,i){return i&&i.hasOwnProperty("@sdata:key")},isIncludedCollection:function(j,h,k){if(k.hasOwnProperty("@sdata:key")){return false}if(k.hasOwnProperty("@sdata:uri")||k.hasOwnProperty("@sdata:url")){return true}var l,i;for(var g in k){if(g.charAt(0)==="@"){continue}l=k[g];break}if(l){if(c.isArray(l)){i=l[0]}else{i=l}if(i&&i.hasOwnProperty("@sdata:key")){return true}}return false},convertEntity:function(l,g,i,h){h=h||{};h["$name"]=g;h["$key"]=i["@sdata:key"];h["$url"]=i["@sdata:uri"];h["$uuid"]=i["@sdata:uuid"];for(var o in i){if(o.charAt(0)==="@"){continue}var p=e.exec(o),j=p?p[1]:false,k=p?p[2]:o,m=i[o];if(typeof m==="object"){if(m.hasOwnProperty("@xsi:nil")){var n=null}else{if(this.isIncludedReference(j,k,m)){var n=this.convertEntity(j,k,m)}else{if(this.isIncludedCollection(j,k,m)){var n=this.convertEntityCollection(j,k,m)}else{n=this.convertCustomEntityProperty(j,k,m)}}}m=n}h[k]=m}return h},convertEntityCollection:function(m,g,j){for(var p in j){if(p.charAt(0)==="@"){continue}var q=e.exec(p),k=q?q[1]:false,l=q?q[2]:p,n=j[p];if(c.isArray(n)){var o=[];for(var h=0;h<n.length;h++){o.push(this.convertEntity(m,l,n[h]))}return{"$resources":o}}else{return{"$resources":[this.convertEntity(m,l,n)]}}break}return null},convertCustomEntityProperty:function(h,g,i){return i},formatEntity:function(i,h,k){k=k||{};if(h["$key"]){k["@sdata:key"]=h["$key"]}for(var g in h){if(g.charAt(0)==="$"){continue}var j=h[g];if(j==null){j={"@xsi:nil":"true"}}else{if(typeof j==="object"&&j.hasOwnProperty("$resources")){j=this.formatEntityCollection(i,j)}else{if(typeof j==="object"){j=this.formatEntity(i,j)}}}k[g]=j}return k},formatEntityCollection:function(k,m){var g={};for(var j=0;j<m["$resources"].length;j++){var l=m["$resources"][j],h=l["$name"],n=(g[h]=g[h]||[]);n.push(this.formatEntity(k,m["$resources"][j]))}return g},convertEntry:function(l){var g={};g["$descriptor"]=l.title;g["$etag"]=l["http:etag"];g["$httpStatus"]=l["http:httpStatus"];var n=l["sdata:payload"];for(var j in n){if(j.charAt(0)==="@"){continue}if(n.hasOwnProperty(j)==false){continue}var m=j.split(":"),k,i,h=n[j];if(m.length==2){k=m[0];i=m[1]}else{if(m.length<2){k=false;i=j}else{continue}}this.convertEntity(k,i,h,g)}return g},formatEntry:function(h,i){var g={};if(!i){g["@xmlns:sdata"]="http://schemas.sage.com/sdata/2008/1";g["@xmlns:xsi"]="http://www.w3.org/2001/XMLSchema-instance";g["@xmlns:http"]="http://schemas.sage.com/sdata/http/2008/1";g["@xmlns"]="http://www.w3.org/2005/Atom"}if(h["$httpMethod"]){g["http:httpMethod"]=h["$httpMethod"]}if(h["$ifMatch"]){g["http:ifMatch"]=h["$ifMatch"]}if(h["$etag"]){g["http:etag"]=h["$etag"]}if(h["$url"]){g.id=h["$url"]}g["sdata:payload"]={};g["sdata:payload"][h["$name"]]={"@xmlns":"http://schemas.sage.com/dynamic/2007"};this.formatEntity(false,h,g["sdata:payload"][h["$name"]]);return{entry:g}},convertFeed:function(j){var g={};if(j["opensearch:totalResults"]){g["$totalResults"]=parseInt(a(j["opensearch:totalResults"]))}if(j["opensearch:startIndex"]){g["$startIndex"]=parseInt(a(j["opensearch:startIndex"]))}if(j["opensearch:itemsPerPage"]){g["$itemsPerPage"]=parseInt(a(j["opensearch:itemsPerPage"]))}if(j.link){g["$link"]={};for(var h=0;h<j.link.length;h++){g["$link"][j.link[h]["@rel"]]=j.link[h]["@href"]}if(g["$link"]["self"]){g["$url"]=g["$link"]["self"]}}g["$resources"]=[];if(c.isArray(j.entry)){for(var h=0;h<j.entry.length;h++){g["$resources"].push(this.convertEntry(j.entry[h]))}}else{if(typeof j.entry==="object"){g["$resources"].push(this.convertEntry(j.entry))}}return g},formatFeed:function(j){var g={};g["@xmlns:sdata"]="http://schemas.sage.com/sdata/2008/1";g["@xmlns:xsi"]="http://www.w3.org/2001/XMLSchema-instance";g["@xmlns:http"]="http://schemas.sage.com/sdata/http/2008/1";g["@xmlns"]="http://www.w3.org/2005/Atom";if(j["$url"]){g.id=j["$url"]}g.entry=[];for(var h=0;h<j["$resources"].length;h++){g.entry.push(this.formatEntry(j["$resources"][h],true)["entry"])}return{feed:g}},processFeed:function(g){if(!g.responseText){return null}var i=g.getResponseHeader&&g.getResponseHeader("Content-Type");if(/application\/json/i.test(i)||(!i&&this.isJsonEnabled())){var h=JSON.parse(g.responseText);if(h.hasOwnProperty("$resources")){return h}else{return{"$resources":[h]}}}else{var h=this.parseFeedXml(g.responseText);if(h.hasOwnProperty("feed")){return this.convertFeed(h.feed)}else{if(h.hasOwnProperty("entry")){return{"$resources":[this.convertEntry(h.entry)]}}else{return false}}}}})})();