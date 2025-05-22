import { gsap } from "gsap";

import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin);

export { gsap, ScrambleTextPlugin, ScrollTrigger, ScrollSmoother, SplitText, TextPlugin };
