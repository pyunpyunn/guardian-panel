# Guardian Panel

the files attached is the FRONTEND files for household status page

display these at the side panel instead of at the top of the page
- hh summary bar
- hh progress
- <section class="hh-ops-panel"><div class="hh-ops-head"><span>Purok triage</span><span>8 areas</span></div><div class="hh-detail-table-wrap"><table class="hh-mini-table"><thead><tr><th>Purok</th><th>Total</th><th>Reported</th><th>Unchecked</th><th>Unsafe</th><th>Device risk</th><th>Next</th></tr></thead><tbody><tr class="hh-row-urgent"><td><strong>Sitio Pag-utlan</strong></td><td>1</td><td>1</td><td>0</td><td class="hh-num-danger">1</td><td>0</td><td><span class="hh-risk-pill urgent">Dispatch focus</span></td></tr><tr class=""><td><strong>Purok 1, Sitio Viking</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>0</td><td><span class="hh-risk-pill stable">Monitor</span></td></tr><tr class=""><td><strong>Purok Banana</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>0</td><td><span class="hh-risk-pill stable">Monitor</span></td></tr><tr class=""><td><strong>Purok Mangga</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>0</td><td><span class="hh-risk-pill stable">Monitor</span></td></tr><tr class=""><td><strong>Sitio Alaska</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>0</td><td><span class="hh-risk-pill stable">Monitor</span></td></tr><tr class=""><td><strong>Sitio Dawis</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>0</td><td><span class="hh-risk-pill stable">Monitor</span></td></tr><tr class=""><td><strong>Sitio Kadasig</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>0</td><td><span class="hh-risk-pill stable">Monitor</span></td></tr><tr class=""><td><strong>Unassigned</strong></td><td>1</td><td>0</td><td>1</td><td class="hh-num-danger">0</td><td>1</td><td><span class="hh-risk-pill watch">Check devices</span></td></tr></tbody></table></div></section>


remove the 
<section class="hh-ops-panel"><div class="hh-ops-head"><span>Activity timeline</span><span>Last 10</span></div><div class="empty-state"><strong>No status activity yet</strong><span>Household and responder reports will appear here after the active event receives updates.</span></div><div class="log-perf-note"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>Latest status rows load first. Full household history loads only when a household is opened.</div></section>


FOR THE HOUSEHOLDS TABLE
- displayy only the necessary details that is need for rescue
- dont add these Source / time and Device

remove these for the review modal of household
Household status: Unsafe

Member Rollup - Sep 17, 2026 11:02 PM

Unsafe

Lowest battery

No battery data

Last location

55 Pag-utlan Lane, Sitio Pag-utlan, Mambaling, Cebu City, 5594

Devices

0 synced

Risk flags

None recorded

put the household status at the modal head only



make sure u only rearrange the layout and maintain the backend as is do not do anything to change a single bit of the backend just rearrange and redesign it

i want a modern and minimal design and less wordss but more data and u should make sure to create the side panel based what i asked u to do

apply an appropriate padding and font typography theme make sure it looks industry standard and industry level

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/30d73532-a799-47e8-b956-ac63ff46c5a1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
