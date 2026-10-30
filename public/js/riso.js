/*! reskif-commons — effet riso (trame de points bichrome, WebGL). Sans dépendance.
 * Reprise fidèle du composant <Riso> de reskif.org.
 * Usage HTML :
 *   <div data-riso data-image="photo.jpg" data-ink="#7c2d12" data-paper="#fb923c" style="height:400px"></div>
 *   <script src="riso.js"></script>
 * Options (data-*) : ink, paper, brightness(0), contrast(.25), shader-contrast(1.2), dot-size(6),
 *   angle(45), softness(.5), dot-shape(round|diamond|line), grain(.2), grain-size(.2), alt.
 * L'image doit être servie avec CORS (même origine, ou en-têtes Access-Control-Allow-Origin).
 * Repli sans WebGL : image en niveaux de gris en mode multiply sur la couleur papier.
 */
(function () {
  var VERT = "attribute vec2 a_position; attribute vec2 a_texCoord; varying vec2 v_texCoord;\nvoid main(){ gl_Position=vec4(a_position,0.0,1.0); v_texCoord=a_texCoord; }";
  var FRAG = "precision highp float;\nvarying vec2 v_texCoord;\nuniform sampler2D u_image; uniform vec2 u_resolution;\nuniform float u_brightness, u_contrast, u_dotSize, u_angle, u_softness, u_shaderContrast;\nuniform int u_dotShape; uniform vec3 u_inkColor, u_bgColor;\nuniform float u_grain, u_grainSize; uniform vec2 u_imageSize, u_canvasSize;\nfloat hash(vec2 p){ vec3 p3=fract(vec3(p.xyx)*0.1031); p3+=dot(p3,p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }\nmat2 rotate2d(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }\nvec2 coverUV(vec2 uv, vec2 cs, vec2 is){ float ca=cs.x/cs.y, ia=is.x/is.y; vec2 sc=vec2(1.0);\n  if(ia>ca) sc.x=ca/ia; else sc.y=ia/ca; return (uv-0.5)*sc+0.5; }\nvoid main(){\n  vec2 uv=(u_imageSize.x>0.0&&u_canvasSize.x>0.0)?coverUV(v_texCoord,u_canvasSize,u_imageSize):v_texCoord;\n  vec3 color=texture2D(u_image,uv).rgb + u_brightness;\n  color=clamp((color-0.5)*(1.0+u_contrast)+0.5,0.0,1.0);\n  float luma=dot(color,vec3(0.299,0.587,0.114));\n  luma=clamp((luma-0.5)*(1.0+u_shaderContrast)+0.5,0.0,1.0);\n  vec2 pixelCoord=v_texCoord*u_resolution;\n  vec2 cellPos=fract((rotate2d(u_angle)*pixelCoord)/u_dotSize)-0.5;\n  float dist = u_dotShape==0 ? length(cellPos) : (u_dotShape==1 ? abs(cellPos.x)+abs(cellPos.y) : abs(cellPos.y));\n  float radius=(1.0-luma)*0.7071; float edge=u_softness*0.15+0.005;\n  float ink=1.0-smoothstep(radius-edge,radius+edge,dist);\n  if(u_grain>0.0){ float n=hash(floor(pixelCoord/(u_grainSize*4.0+1.0)))*2.0-1.0; ink=clamp(ink+n*u_grain*0.3,0.0,1.0); }\n  gl_FragColor=vec4(mix(u_bgColor,u_inkColor,ink),1.0);\n}";
  var shared = null, failed = false;
  function hex(h){ return [1,3,5].map(function(i){ return parseInt(h.slice(i,i+2),16)/255; }); }
  function sh(gl,t,src){ var s=gl.createShader(t); gl.shaderSource(s,src); gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){ gl.deleteShader(s); return null; } return s; }
  function ctx(){
    if (shared || failed) return shared;
    var c=document.createElement('canvas'), gl=c.getContext('webgl',{antialias:false,preserveDrawingBuffer:true});
    if(!gl){ failed=true; return null; }
    var v=sh(gl,gl.VERTEX_SHADER,VERT), f=sh(gl,gl.FRAGMENT_SHADER,FRAG), p=v&&f?gl.createProgram():null;
    if(!p){ failed=true; return null; }
    gl.attachShader(p,v); gl.attachShader(p,f); gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS)){ failed=true; return null; }
    gl.useProgram(p);
    function buf(arr,name){ var b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.STATIC_DRAW);
      var l=gl.getAttribLocation(p,name); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l,2,gl.FLOAT,false,0,0); }
    buf([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1],'a_position'); buf([0,1,1,1,0,0,0,0,1,1,1,0],'a_texCoord');
    var tex=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,tex);
    [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(function(k){ gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE); });
    [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER].forEach(function(k){ gl.texParameteri(gl.TEXTURE_2D,k,gl.LINEAR); });
    c.addEventListener('webglcontextlost',function(e){ e.preventDefault(); shared=null; });
    return shared={canvas:c,gl:gl,program:p};
  }
  function opts(el){ var d=el.dataset, n=function(k,def){ return d[k]!==undefined?parseFloat(d[k]):def; };
    return { ink:d.ink||'#00aaff', paper:d.paper||'#ffffff', brightness:n('brightness',0), contrast:n('contrast',.25),
      shaderContrast:n('shaderContrast',1.2), dotSize:n('dotSize',6), angle:n('angle',45), softness:n('softness',.5),
      dotShape:d.dotShape||'round', grain:n('grain',.2), grainSize:n('grainSize',.2) }; }
  function draw(target,img,o){
    var r=ctx(); if(!r) return false; var gl=r.gl, p=r.program, dpr=Math.min(window.devicePixelRatio||1,2);
    var w=Math.round(target.clientWidth*dpr), h=Math.round(target.clientHeight*dpr); if(!w||!h) return true;
    r.canvas.width=target.width=w; r.canvas.height=target.height=h; gl.viewport(0,0,w,h); gl.useProgram(p);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    var u=function(k){ return gl.getUniformLocation(p,k); };
    gl.uniform2f(u('u_resolution'),w,h); gl.uniform1f(u('u_brightness'),o.brightness); gl.uniform1f(u('u_contrast'),o.contrast);
    gl.uniform1f(u('u_dotSize'),o.dotSize*dpr); gl.uniform1f(u('u_angle'),o.angle*Math.PI/180); gl.uniform1f(u('u_softness'),o.softness);
    gl.uniform1f(u('u_shaderContrast'),o.shaderContrast);
    gl.uniform1i(u('u_dotShape'),o.dotShape==='round'?0:o.dotShape==='diamond'?1:2);
    gl.uniform1f(u('u_grain'),o.grain); gl.uniform1f(u('u_grainSize'),o.grainSize);
    var i=hex(o.ink), b=hex(o.paper); gl.uniform3f(u('u_inkColor'),i[0],i[1],i[2]); gl.uniform3f(u('u_bgColor'),b[0],b[1],b[2]);
    gl.uniform2f(u('u_imageSize'),img.naturalWidth,img.naturalHeight); gl.uniform2f(u('u_canvasSize'),w,h);
    gl.drawArrays(gl.TRIANGLES,0,6);
    var c2=target.getContext('2d'); if(!c2) return false; c2.clearRect(0,0,w,h); c2.drawImage(r.canvas,0,0); return true;
  }
  function mount(el){
    if(el.__riso) return; el.__riso=true; var o=opts(el); el.style.backgroundColor=o.paper;
    var cv=document.createElement('canvas'); cv.style.cssText='display:block;width:100%;height:100%'; el.appendChild(cv);
    var img=new Image(); img.crossOrigin='anonymous';
    function fallback(){ cv.remove(); var f=new Image(); f.src=el.dataset.image; f.alt=el.dataset.alt||'';
      f.style.cssText='width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.25);mix-blend-mode:multiply'; el.appendChild(f); }
    function render(){ if(!draw(cv,img,o)) fallback(); }
    img.onload=function(){ render(); new ResizeObserver(render).observe(el); };
    img.onerror=fallback; img.src=el.dataset.image;
  }
  function init(root){
    var els=(root||document).querySelectorAll('[data-riso]');
    if(!('IntersectionObserver' in window)){ els.forEach(mount); return; }
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ io.unobserve(e.target); mount(e.target); } }); },{rootMargin:'300px'});
    els.forEach(function(e){ io.observe(e); });
  }
  window.ReskifRiso={ init:init, mount:mount };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ init(); }); else init();
})();
