(function(){
// Saved products. Kept in this browser only (localStorage), newest first.
var K='fav4',HP='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20.5l-1.3-1.2C5.6 14.7 2.5 11.9 2.5 8.4 2.5 5.6 4.7 3.5 7.4 3.5c1.6 0 3.4.8 4.6 2.4 1.2-1.6 3-2.4 4.6-2.4 2.7 0 4.9 2.1 4.9 4.9 0 3.5-3.1 6.3-8.2 10.9z"/></svg>';
function get(){try{var a=JSON.parse(localStorage.getItem(K)||'[]');return Array.isArray(a)?a:[]}catch(e){return[]}}
function put(a){try{localStorage.setItem(K,JSON.stringify(a))}catch(e){}}
var mem=get();
function has(s){return mem.indexOf(s)>=0}
function emit(){try{window.dispatchEvent(new Event('favchange'))}catch(e){}}
function toggle(s){var i=mem.indexOf(s);if(i>=0)mem.splice(i,1);else mem.unshift(s);put(mem);sync();emit();return i<0}
window.__fav={has:has,list:function(){return mem.slice()},toggle:toggle};
function slugOf(pc){var a=pc.querySelector('a[href^="/"]');if(!a)return'';var m=a.getAttribute('href').match(/^\/([^\/?#]+)\/$/);return m?m[1]:''}
function decorate(root){(root.querySelectorAll?root:document).querySelectorAll('.pc').forEach(function(pc){
  if(pc.querySelector('.fav'))return;var s=slugOf(pc);if(!s)return;
  var b=document.createElement('button');b.type='button';b.className='fav';b.dataset.fav=s;b.innerHTML=HP;pc.appendChild(b)});sync()}
function sync(){document.querySelectorAll('[data-fav]').forEach(function(b){var on=has(b.dataset.fav);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);
    b.setAttribute('aria-label',on?'Remove from saved':'Save this product');var t=b.querySelector('span');if(t)t.textContent=on?'Saved':'Save'});
  document.querySelectorAll('.fav-pill .n').forEach(function(n){n.textContent=mem.length||''})}
var tt,toast;
function say(msg){if(!toast){toast=document.createElement('div');toast.className='favtoast';toast.setAttribute('role','status');document.body.appendChild(toast)}
  toast.innerHTML=msg;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},2600)}
document.addEventListener('click',function(e){var b=e.target.closest('[data-fav]');if(!b)return;e.preventDefault();e.stopPropagation();
  var on=toggle(b.dataset.fav);b.classList.remove('pop');void b.offsetWidth;if(on)b.classList.add('pop');
  if(location.pathname!=='/saved/')say(on?'Saved. <a href="/saved/">See your saved list</a>':'Removed from saved')},true);
window.addEventListener('storage',function(e){if(e.key===K){mem=get();sync();emit()}});
decorate(document);
var q=false;new MutationObserver(function(){if(q)return;q=true;requestAnimationFrame(function(){q=false;decorate(document)})}).observe(document.body,{childList:true,subtree:true});
})();
