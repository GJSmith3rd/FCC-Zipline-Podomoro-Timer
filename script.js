/*! (c) 2016 mobileCreature - GJSmith3rd - Gilbert Joseph Smith III (MIT) */
$(document).ready(function(){function e(){$(".minutes").text(("0"+c).slice(-2)),$(".seconds").text("00".slice(-2)),$("#sessText").text("Start Session"),document.title="Pomodoro Timer"}function s(){$(".minutes").text(("0"+c).slice(-2)),$(".seconds").text("00".slice(-2))}function a(e,s,a){$(".minutes").text(("0"+e).slice(-2)),$(".seconds").text(("0"+s).slice(-2)),$("#sessText").text(a)}function n(e,s,a){document.title=a+" "+("0"+e).slice(-2)+":"+("0"+s).slice(-2)}function i(){for(var e=1;999>e;e++)window.clearInterval(e);for(var s=1;999>s;s++)window.clearTimeout(s)}function l(){i(),e(),$.ionSound.play(y),g=!1;for(var l=0,d=0;m>d;d++)setTimeout(function(i){return function(){function d(t,d){var r=o(t),p=o(d);switch(!0){case r.total<=0&&i===m-1:clearInterval(u),e(),$.ionSound.play(S);break;case r.total<=0&&g:a(p.mins,p.secs,"Break: "+l),n(p.mins,p.secs,"Break"),$.ionSound.play(y),g=!1;break;case r.total<=0&&p.total>1:a(p.mins,p.secs,"Break: "+l),n(p.mins,p.secs,"Break"),$.ionSound.play(w);break;case r.total>0:a(r.mins,r.secs,"Session: "+l),n(r.mins,r.secs,"Session"),$.ionSound.play(w),g=!0;break;case r.total<=0:clearInterval(u),a("00","00"+c,"Session: "+l),n("00","00","Session"),$.ionSound.play(y),s()}}l+=1;var u=setInterval(d,1e3,t(c).timeMins,t(c+r).timeMins)}}(d),(c+r)*d*1e3*60)}function t(e){var s=1e3*e,a=60*e*1e3,n=new Date(Date.now()+s),i=new Date(Date.now()+a);return{timeDate:new Date(Date.now()),timeSecs:n,timeMins:i}}function o(e){var s=Date.parse(e)-Date.parse(new Date),a=Math.floor(s/1e3%60),n=Math.floor(s/1e3/60%60),i=Math.floor(s/36e5%24),l=Math.floor(s/864e5);return{total:s,days:l,hours:i,mins:n,secs:a}}var d=!1;/^10.0.0/.test(location.hostname)&&d?$(".adsense").remove():$.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");var c=25,r=5,m=4,u=10,p=20,h=25,b=50,f=3,v=4,C=5,k=10,g=!1,w="snap",y="start",S="finish";e(),function(){$(".panel").find(".panel-body").slideUp(),$(".panel").children(".clickable").addBack().addClass("panel-collapsed"),$(".panel").children(".clickable").addBack().find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")}(),$("#timer-startReset").click(function(){$("#timer-minus").removeClass("disabled"),$("#timer-minus").addClass("enabled"),$("#timer-plus").removeClass("disabled"),$("#timer-plus").addClass("enabled"),l()}),$("#timer-minus").click(function(){switch(!0){case 2>c:$(this).removeClass("enabled"),$(this).addClass("disabled"),$("#timer-plus").removeClass("disabled"),$("#timer-plus").addClass("enabled");break;default:$("#timer-plus").hasClass("disabled")===!0&&($("#timer-plus").removeClass("disabled"),$("#timer-plus").addClass("enabled")),i(),c-=1,e()}}),$("#timer-plus").click(function(){switch(!0){case c>49:$(this).removeClass("enabled"),$(this).addClass("disabled"),$("#timer-minus").removeClass("disabled"),$("#timer-minus").addClass("enabled");break;default:$("#timer-minus").hasClass("disabled")===!0&&($("#timer-minus").removeClass("disabled"),$("#timer-minus").addClass("enabled")),i(),c+=1,e()}}),$(".short, .medium, .standard, .long").click(function(s){var a=$(this);switch(!0){case a.hasClass("short"):c=u,r=f;break;case a.hasClass("medium"):c=p,r=v;break;case a.hasClass("standard"):c=h,r=C;break;case a.hasClass("long"):c=b,r=k}i(),e()}),$(".main-panel").click(function(e){function s(){n.parents(".panel").find(".panel-body").slideUp(),n.siblings(".clickable").addBack().addClass("panel-collapsed"),n.siblings(".clickable").addBack().find("i").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")}function a(){n.parents(".panel").find(".panel-body").slideDown(),n.siblings(".clickable").addBack().removeClass("panel-collapsed"),n.siblings(".clickable").addBack().find("i").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")}var n=$(this);switch(!0){case!n.hasClass("panel-collapsed"):s();break;default:a()}}),$("#sound-off").click(function(){w="null",y="null",S="null",$(this).blur(),$(this).removeClass("active")}),$("#sound-on").click(function(){w="snap",y="start",S="finish",$(this).blur(),$(this).removeClass("active")});var D="http://mobilecreature-cdn.appspot.com/pomodoro/media/sounds/";$.ionSound({sounds:[{name:"",alias:"null"},{name:"bell_ring",alias:"start"},{name:"bell_ring",loop:3,alias:"finish"},{name:"snap"}],volume:.1,multiplay:!0,path:D,preload:!0})});