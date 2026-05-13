/**
 * Current lab focus — shown in the "Now operating" live status pill on the home page.
 * Edit focus and since to reflect the lab's current primary effort.
 * since should be YYYY-MM format.
 */

export interface NowStatus {
  focus: string;
  since: string;
}

export const nowStatus: NowStatus = {
  focus: "MOSI prospective validation",
  since: "2026-04",
};
