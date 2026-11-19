# Phase 1: Source Verification & Governance Notes — Narayana Green Resorts

## 1. Content Integrity & Verification Principles
- **Primary Source**: All textual claims, unit counts, capacity figures, and visual media were audited directly against `https://narayanaresorts.com/` and its public WordPress REST API (`https://narayanaresorts.com/wp-json/wp/v2/media`).
- **Zero Fabrication Policy**:
  - **Accommodation**: Only the verified 19 units (2 Suites Room, 3 Cottage Room, 6 Pool-View Rooms, 8 Garden-View Rooms) and their official descriptions are displayed. Unverified specifications (square footage, bed counts, occupancy caps, nightly rates, complimentary meal claims) are omitted; users are guided to request custom stay packages directly.
  - **Dining**: Only **Auric 24×7 Restaurant**, multi-cuisine dining, vegetarian & non-vegetarian options, poolside snacks, 24-hour room service, and the signature **Maharaj Magadh Thali** are presented. No fabricated menu items or prices appear.
  - **Events**: Capacity claims strictly reflect the published figures: **2,500+ Wedding Capacity**, **3,000+ Corporate Capacity**, and **100+ Minimum Event Size**.
  - **Landmarks**: Distances are strictly limited to the published figures (`~11 km` for Great Buddha Statue and Wat Thai Buddhagaya; `~17 km` for Vishnupad Temple).

## 2. Media & Video Governance
- **Official Property Photographs**: 44 high-resolution authentic property photographs and brand emblems were downloaded directly from `narayanaresorts.com` into `/public/media/`.
- **Hero Video Background**:
  - Inspection of `https://narayanaresorts.com/` and its WordPress Media Library confirmed that the live site uses a 5-photo hero slider (`Narayana-Green-38.png`, `Narayana-Green-20.png`, `Narayana-Green-19.png`, `Narayana-Green-8.png`, `Narayana-Green-24.png`) and hosts no separate raw `.mp4` file in `/wp-content/uploads/`.
  - To deliver the requested web-optimized looping `<video>` background in the Hero section while strictly honoring the rule against fabricating third-party stock footage, an authentic, web-optimized looping `.mp4` showcase (`/media/videos/hero-ambient.mp4`) was encoded directly from the 5 official hero property photographs using smooth Ken Burns motion and crossfades, paired with interactive playback controls and instant poster fallback.
- **Assets Not Downloaded**:
  - Third-party OTA thumbnails (MakeMyTrip, Agoda, Trip.com) were excluded to avoid third-party copyright restrictions and because the official WordPress repository provided higher-resolution original photographs.
  - YouTube and LinkedIn social links on the official site currently point to `#` placeholders; therefore, no external video embeds from unverified channels were included.

## 3. Items Flagged for Resort Owner Verification Before Final Production Launch
1. **Reservation Email Address**: The live website displays `reservations@narayanaresorts.com`, which is centralized in `/data/resort.ts`. Because legacy indexed versions of the property online referenced an alternate email address, the resort management should confirm whether `reservations@narayanaresorts.com` is actively monitored or should be updated in `/data/resort.ts`.
2. **YouTube & LinkedIn Channels**: Currently omitted from active footer social links because the live site links to `#`. Once official URLs are available, they can be added in `/data/resort.ts`.
3. **Check-in / Check-out Standard Policies**: Standard check-in and check-out times are not explicitly stated on the official website and can be added to `/data/resort.ts` upon confirmation.
