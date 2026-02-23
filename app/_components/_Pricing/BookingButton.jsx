/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function BookingButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"intro-call"});
      cal("ui", {"theme":"dark","cssVarsPerTheme":{"dark":{"cal-brand":"#126cfd"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  // return <button data-cal-namespace="intro-call"
  //   data-cal-link="websual.agency/intro-call"

  //   data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
  // >Click me</button>
  return <Button data-cal-namespace="intro-call" data-cal-link="websual.agency/intro-call" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="cursor-pointer w-full relative z-10 rounded-lg h-10 sm:h-11 px-3 sm:px-4 py-2 font-semibold text-white text-base sm:text-lg bg-gradient-to-b from-[#3a86ff] to-[#3a86ff] shadow-[0_10px_25px_rgba(59,134,255,0.3)] group overflow-hidden" >
    <div className="relative overflow-hidden h-6 sm:h-7 flex flex-col items-center justify-start">
      <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] h-full flex items-center">
        Book a Call
      </span>
      <span className="absolute top-full group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] h-full flex items-center">
        Book a Call
      </span>
    </div>
  </Button>

};
