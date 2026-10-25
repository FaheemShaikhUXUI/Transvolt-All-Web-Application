# Project Memory & Deployment Guide

## Overview
- **Project Name**: `transvolt-all-web-application`
- **Framework**: React 18 + Vite 6 + Tailwind CSS v4
- **Local Dev Server**: [http://localhost:5173/](http://localhost:5173/)
- **Vercel Production Baseline**: 10 Projects (3 Web, 2 Mobile, 5 Other)

## Git Configuration
- **Repository**: `https://github.com/FaheemShaikhUXUI/Transvolt-All-Web-Application.git`
- **Primary Branch**: `main`
- **Remote**: `origin`

## Vercel Deployment
- **Live Preview URL**: [https://transvolt-all-web-application-fjp0gwtu3-design25.vercel.app/](https://transvolt-all-web-application-fjp0gwtu3-design25.vercel.app/)
- **Vercel Project Name**: `transvolt-all-web-application`
- **Project ID**: `prj_QrZY1BHacIR1byd8Amf6VFaAzuLK`
- **Org ID**: `team_wbjf1HIhx24FLd9VaDvkC2bO`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: `vite`
- **Routing**: SPA rewrites configured (`/(.*)` -> `/index.html`) via `vercel.json`

## Vercel Production Snapshot (10 Projects)
1. **All Web Application (3)**:
   - `1. MIS Dashbaord` (Live Since 09 July 2026, connected)
   - `2. Incidennt Accident` (Working)
   - `3. Insurance` (Working, connected with dedicated TailAdmin Insurance Module matching Image 2)
2. **All Mobile Application (2)**:
   - `1. Mine Ops.` (Planning)
   - `2. Depot Ops.` (Planning)
3. **Other Projects (5)**:
   - `1. Transvolt Website` (Hold)
   - `2. Transvolt Branding Portal` (Live Since 22 October 2026, connected)
   - `3. Contech Brain` (Hold)
   - `4. Eleverve Green Website - EFS` (Hold)
   - `5. Document Controller` (Planning)

## Smart Localhost Memory Sync Logic
- Storage keys: `transvolt_all_projects_data` (projects state) & `transvolt_vercel_sync_version` (`v2_vercel_synced_state`).
- Auto-seeds and updates Localhost memory to align with Vercel baseline if version mismatch.
- Interactive **"Sync with Vercel"** button available in header for on-demand resets to production state.
