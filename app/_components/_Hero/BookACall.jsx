/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { FlowButton } from "@/components/ui/flow-button";
export default function BookACall() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "intro-call" });
      cal("ui", { "theme": "dark", "cssVarsPerTheme": { "dark": { "cal-brand": "#126cfd" } }, "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])
  // return <button data-cal-namespace="intro-call"
  //   data-cal-link="websual.agency/intro-call"

  //   data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
  // >Click me</button>
  return (
    <div data-cal-namespace="intro-call" data-cal-link="websual.agency/intro-call" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'>
      <FlowButton text="Book a Call" />
    </div>
  )

};
