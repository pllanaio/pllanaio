import { pushDataLayer } from "@/lib/tracking";

export type WebsiteCheckEvent =
  | "website_check_started"
  | "website_check_completed"
  | "website_check_failed"
  | "report_form_viewed"
  | "report_requested"
  | "marketing_opt_in_selected"
  | "consultation_cta_clicked";

type EventPayload = {
  event: WebsiteCheckEvent;
  analysis_id?: string;
  domain?: string;
  strategy?: "mobile" | "desktop";
  error_code?: string;
};

export function trackWebsiteCheckEvent({ event, ...params }: EventPayload) {
  pushDataLayer(event, params);
}
