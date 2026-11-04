(function(){
  // reading progress + nav shadow + sticky bar
  var bar=document.getElementById('progress'),nav=document.getElementById('bnav'),st=document.getElementById('sticky'),app=document.getElementById('app');
  function onScroll(){
    var h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=h.scrollTop||document.body.scrollTop;
    if(bar)bar.style.width=(max>0?y/max*100:0)+'%';
    if(nav)nav.classList.toggle('scrolled',y>30);
    if(st){var appVisible=false;if(app){var r=app.getBoundingClientRect();appVisible=r.top<innerHeight&&r.bottom>0}st.classList.toggle('show',y>innerHeight*0.6&&!appVisible)}
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // scroll reveal
  var els=document.querySelectorAll('.answer,.visual,article>*,.appcard,.faq details,.faq h2,.mini,.more h2,.card,.lhead>*');
  els.forEach(function(e){e.classList.add('rv')});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
  }else{els.forEach(function(e){e.classList.add('on')})}

  var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(!fine)return;
  // custom cursor: dot follows instantly, ring follows smoothly (same as reviso.in)
  var dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing'),mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.transform='translate('+(mx-3)+'px,'+(my-3)+'px)';document.body.classList.add('has-cursor')});
  document.addEventListener('mouseleave',function(){document.body.classList.remove('has-cursor')});
  (function loop(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;var s=ring.classList.contains('expand')?24:16;ring.style.transform='translate('+(rx-s)+'px,'+(ry-s)+'px)';requestAnimationFrame(loop)})();
  document.querySelectorAll('a,button,summary,.card,.visual').forEach(function(el){
    el.addEventListener('mouseenter',function(){ring.classList.add('expand')});
    el.addEventListener('mouseleave',function(){ring.classList.remove('expand')});
  });
  // magnetic buttons: lean towards the mouse and grow a little
  document.querySelectorAll('.mag').forEach(function(el){
    el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);el.style.transform='translate('+dx*.18+'px,'+dy*.28+'px) scale(1.05)'});
    el.addEventListener('mouseleave',function(){el.style.transform=''});
  });
})();
