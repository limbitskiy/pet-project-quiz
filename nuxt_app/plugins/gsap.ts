import { gsap } from "gsap";
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { Draggable } from 'gsap/Draggable'
// import { Observer } from 'gsap/Observer'

export default defineNuxtPlugin(() => {
  //   gsap.registerPlugin(Observer, ScrollTrigger, InertiaPlugin)

  if (process.client) {
    // gsap.registerPlugin(Draggable)
    // gsap.fromTo("#index-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "elastic.out" });
  }

  return {
    provide: {
      gsap,
      //   Observer,
      //   ScrollTrigger,
      //   Draggable
    },
  };
});
