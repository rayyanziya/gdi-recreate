# NeoTheorem — Platform Summary

> **Platform Type:** Proprietary Order Management System (OMS) & Analytics Suite  
> **User:** hades (Master role)  
> **Markets Covered:** Multi-account, multi-exchange trading across global venues  
> **Timezone Support:** ET / WIB / UTC — displayed simultaneously in the header

---

## Table of Contents

1. [Overview](#overview)
2. [Order Management System (OMS)](#order-management-system-oms)
3. [Dashboard & Analytics](#dashboard--analytics)
4. [Signal Logs](#signal-logs)
5. [Financial Records](#financial-records)
6. [Trading Calendar](#trading-calendar)
7. [Fundamentals Module](#fundamentals-module)
8. [Account Management](#account-management)
9. [System Health & Connectivity](#system-health--connectivity)
10. [Audit Logs & Activity Tracking](#audit-logs--activity-tracking)
11. [User Management](#user-management)
12. [Key Metrics Snapshot](#key-metrics-snapshot)

---

## Overview

NeoTheorem is a full-stack, multi-account trading platform built for professional use. It consolidates order execution, portfolio analytics, fundamental research, signal automation, and account administration into a single dark-themed interface. The system manages **8 brokerage accounts** across geographically distributed sub-accounts (Kuwait, London, Manisrenggo, Metro, Monaco, New York, Osaka, Rome), all linked to Interactive Brokers (IBKR) as the clearing/execution broker.

The platform header displays live market indices at all times:
- **S&P 500**, **Dow Jones**, **Nasdaq**, **VIX**, **Bitcoin**, **Gold**, and **Mata Uang Sakti (local FX)**

---

## Order Management System (OMS)

The OMS is the core trade execution layer. It features a **New Order panel** on the left and a **Positions Table** in the center, with a real-time mini chart and Time & Sales feed on the right.

### New Order Panel
- **Buy / Sell** toggle buttons
- **Symbol** input (e.g., AAPL)
- **Order Type:** LMT (Limit) with DAY TIF (Time In Force)
- **Quantity** and **Price** fields
- **Account selector** — routes the order to any of the 8 accounts

### Positions Table

Each position row shows:

| Field | Description |
|---|---|
| Symbol | Ticker (e.g., HWM, PWR, WCC, CLS) |
| Side | LONG (all current positions) |
| Qty | Number of shares held |
| Avg Cost | Average cost basis per share |
| Mkt Price | Current market price |
| Mkt Value | Total market value of position |
| Unrealized P&L | Open profit/loss with % |
| Daily P&L | Intraday change |
| TP | Take Profit target price |
| Account | Account the position belongs to |

**Positions observed (across accounts: London, Manisrenggo, Metro, New York, Osaka):**

| Ticker | Qty | Avg Cost | Mkt Price | Unrealized P&L |
|---|---|---|---|---|
| HWM | 7 / 5 / 8 / 15 / 5 | $235.21–$235.23 | $222.60 | -$88.28 to -$100.84 |
| PWR | 3 / 3 / 5 | $558.29 | $532.80 | -$76.46 |
| WCC | 6 / 4 / 7 / 7 | $274.19–$274.29 | $256.97–$256.98 | -$68.86 to -$120.55 |
| CLS | 15 | $258.65 | $255.90 | -$41.30 |

> All positions are currently **underwater** (negative unrealized P&L), ranging from -0.40% to -6.28%.

### Manage Position Panel

Clicking a position opens a sidebar panel with:
- Current Qty, Avg Cost, Mkt Price, Mkt Value, Unrealized P&L
- **Market Sell All** button (e.g., "Market Sell All (15)")
- **Partial Sell Qty** input with a Sell button
- **Modify TP** (Take Profit) field — editable inline
- **Cancel Order** button

### Execution Blotter

Located at the bottom, it shows today's filled orders:

| Symbol | Side | Fills | Qty | VWAP | Commission | Exchange | Account | Time |
|---|---|---|---|---|---|---|---|---|
| CLS | BOT | 1 | 15 | $258.63 | $0.35 | DARK | NEW YORK | 00:44:53 |
| HWM | BOT | 1 | 15 | $223.48 | $0.35 | DARK | NEW YORK | 00:22:04 |

Both fills executed via **DARK** pool routing.

---

## Dashboard & Analytics

The Dashboard provides consolidated performance analytics across all accounts, with a filter panel to isolate specific accounts (e.g., Manisrenggo + New York selected in screenshots).

### Top-Level KPIs

| Metric | Value |
|---|---|
| Total Accounts | 6 (5 online) |
| Open Trades | 13 (across all accounts) |
| Avg Monthly Return | +4.17% (current month) |
| Total P&L | $1,897.04 (123 closed trades) |
| Manager Fee (YTD) | $758.82 (from $1,897.04) |
| IBKR Commissions | $119.76 total paid |

### Risk-Adjusted Performance Metrics

| Metric | Value |
|---|---|
| Win Rate | 94.31% |
| Profit Factor | 4.25 |
| Sharpe Ratio | 7.42 |
| Sortino Ratio | 9.14 |
| Max Drawdown | -2.06% |
| CAGR | 17.06% |
| TWR | 10.43% |
| MWR | 10.43% |
| Avg ROI per trade | $21.39 |

### Win / Loss Summary

- **Total Trades:** 123
- **Wins:** 116 (94%)
- **Losses:** 7 (6%)

### P&L Breakdown (Donut Chart)

- **Manager Fee:** $758.82 (40%)
- **Client Net:** $1,138.22
- **IBKR Commissions:** $119.76

### Key Metrics

| Metric | Value |
|---|---|
| Expectancy | $15.42 per trade |
| Avg Hold Time | 74.0 hours |
| Calmar Ratio | 8.27 |
| Gross Profit | $1,897.04 |

### Equity Curve

The equity curve shows **steady compounding growth** from approximately $10,000 to $20,085.07 since August 2025, with one visible pullback period in September/October 2025 before resuming the uptrend.

### Monthly Returns Bar Chart

Monthly returns display predominantly positive months, with two minor negative months visible. The most recent months (Jan–Apr 2026) show positive returns.

### Account-Level Performance Cards

Each account card shows: Return %, Trades, Diversity, TP %, and Mgr Fee %.

**Observed cards:**
- **Manisrenggo:** Return +6.38%, 2 trades, Diversity 2, TP 1.5%, Mgr Fee 40%
- **New York:** Return -0.25%, 2 trades, Diversity 2, TP 1.5%, Mgr Fee 40%

### Per-Ticker Performance Table (Returns View)

Sorted by Total P&L descending, top performers include:

| Ticker | Trades | Win Rate | Total P&L | Avg P&L | Avg Hold |
|---|---|---|---|---|---|
| CLS | 4 | 100% | $197.60 | $49.40 | 0h |
| QBTS | 4 | 100% | $143.22 | $35.80 | 0h |
| KC | 7 | 100% | $141.80 | $20.26 | 82.5h |
| RDW | 1 | 100% | $121.60 | $121.60 | 20.1h |
| OKLO | 4 | 100% | $114.48 | $28.62 | 0.1h |
| PLTR | 2 | 100% | $85.02 | $42.51 | 0h |
| QUBT | 4 | 75% | $83.79 | $20.95 | 139.9h |
| RKLB | 3 | 66.7% | $76.77 | $25.59 | 288.1h |
| HWM | 2 | 100% | $66.70 | $34.35 | 61.8h |
| SIMO | 2 | 100% | $57.42 | $28.71 | 4.6h |
| RKT | 2 | 100% | $53.48 | $26.74 | 0h |

---

## Signal Logs

The Signals module tracks automated trading signals sent to accounts, with 30 total signals recorded.

### Signal Log Table

Each log entry includes:
- **Time** — timestamp of the signal
- **Ticker** — the stock symbol triggered
- **Price** — signal trigger price
- **Accounts** — number of accounts targeted (consistently 8)
- **Executed** — number of successful executions
- **Failed** — number of failed executions
- **Errors** — error count
- **Account Results** — per-account status badges (Kuwait, London, Manisrenggo, Metro, Monaco, New York, Osaka, Rome)

### Signal Status Observations

- **Most signals show 0 executed, 5–7 failed, 1–3 errors** — indicating the system received signals but many accounts blocked or rejected execution (likely due to account connectivity: Kuwait, Monaco, Rome were offline)
- **Two signals executed successfully** (00:44:52 CLS @ $258.75 and 00:22:03 HWM @ $223.48 — NEW YORK account, 1 execution each) — matching the fills in the Execution Blotter
- Signal tickers observed: **WCC, CLS, PWR, HWM, CAAP, FLEX, NGL**

### Signal Filtering

- Filter by ticker search
- Status filter (All Status / specific)
- Time format filter (hh/bb/tttt)

---

## Financial Records

The Records module provides per-account financial reporting with import/export capabilities.

### Osaka Account — Financial Summary

| Metric | Value |
|---|---|
| Total Deposits | $5,580.10 |
| Total Withdrawals | $0.00 |
| Net Cashflow | $5,580.10 |
| Realized P&L | $740.71 |
| Dividends (Net) | $9.67 |
| IBKR Commissions | $131.31 |
| Net Performance | $750.38 |
| Win Rate | 91.2% (114W / 11L) |

### Deposits & Withdrawals History

| Date | Account | Type | Description | Amount |
|---|---|---|---|---|
| 2025-10-08 | U21073351 | Deposits/Withdrawals | Cash Receipts / Electronic Fund Transfers | $3,770.89 |
| 2025-08-01 | U21073351 | Deposits/Withdrawals | Cash Receipts / Electronic Fund Transfers | $1,809.21 |

### Export Options

- **Deposit/Withdrawal CSV** export
- **Dividends CSV** export

---

## Trading Calendar

A calendar view showing daily profitability and order activity for **March 2026**.

### Monthly Summary

- **Total Month P&L:** $4,176.73
- **Total Sells:** 63

### Notable Trading Days (March 2026)

| Date | P&L | Activity |
|---|---|---|
| March 3 | -$1,079.61 | 5 sells (losing day) |
| March 4 | -$12.98 | 1 sell (minor loss) |
| March 5 | $98.38 | 4 sells |
| March 13 | $989.47 | 5 sells + 15 buys (major accumulation day) |
| March 16 | $82.28 | 3 sells + 1 buy |
| March 17 | $257.48 | 11 sells |
| March 18 | $221.00 | 5 sells + 5 buys |
| **March 19** | **$1,830.12** | **22 sells + 16 buys — best day of the month** |
| March 20 | $166.86 | 1 sell + 14 buys |
| March 23 | $981.51 | 15 sells + 4 buys |
| March 24 | $642.21 | 11 sells + 11 buys |
| March 26 | — | 17 buys (accumulation, no sells) |

### Order Detail Panel (March 19 example — 38 orders)

Symbols traded: FLEX, CLS, WCC, PWR
- Multiple BUY and SELL fills visible at various account levels (Monaco, Rome, London, Osaka, Metro, Manisrenggo)
- FLEX traded in large quantities (175, 329 shares per fill)
- CLS sold at ~$274.17 across multiple accounts
- Daily P&L confirmed at **$1,830.12**

---

## Fundamentals Module

The Fundamentals module is a research and screening tool with three views: **Board**, **Calendar**, and sub-modules for **Research** and **Grand Reports**.

### Ticker Board

A watchlist of 26 whitelisted tickers with composite fundamental scores (0–100):

| Ticker | Score | Status |
|---|---|---|
| AGI | 77 | Whitelisted |
| FLEX | 68 | Whitelisted |
| CAAP | 78 | Whitelisted |
| JPM | 78 | Whitelisted |
| PWR | 62 | Whitelisted |
| HWM | 63 | Whitelisted |
| WCC | 72 | Whitelisted |
| CLS | 71 (70 on later view) | Whitelisted |
| NVDA | 73 | Whitelisted |
| META | 72 | Whitelisted |
| GOOGL | 75 | Whitelisted |
| MIRM | 54 | Whitelisted |
| AAPL | 65 | Whitelisted |
| CEPU | 73–74 | Whitelisted |
| PLTR | 68 | Whitelisted |
| QUBT | 53 | Whitelisted |

- **Summary:** 26 Whitelisted, 0 Restricted, 0 Under Review

### Ticker Detail Panel — Example: MIRM (Mirum Pharmaceuticals)

**Composite Score: 54/100**

| Sub-Score | Value |
|---|---|
| Valuation | 17 |
| Growth | 100 |
| Health | 46 |
| Momentum | 54 |

**Company Profile:**  
Mirum Pharmaceuticals, Inc. — biopharmaceutical company focused on rare and orphan diseases. Lead product: LIVMARLI (maralixibat), an orally administered IBAT inhibitor approved for cholestatic pruritus in Alagille syndrome.

**Financials:**
- Market Cap: $5.30B
- Price: $87.90
- 52W High: $109.28
- Shares: 36.88M, Avg Vol: 0.8M
- Employees: 369
- P/S: 14.50, Forward P/S: 10.17, EPS: -0.47
- Revenue: $521.3M, Net Growth: 49.8%

### Research View — Knowledge Graph

The Research tab displays an **interactive knowledge graph** mapping all news articles and research queries around a central ticker node. Nodes represent topics (regulation, elections, currency risk, sanctions, ESG, labor, geopolitics, etc.) with connections showing article relevance and sentiment (green = positive, red = negative, grey = neutral).

**Example — CLS (Celestica Inc.) Grand Report:**

- **Whitelist Confidence: 80%**
- **Fundamentals:** Positive — margin expansion, shift to high-value engineering-intensive offerings, predicted EPS of $2.07 (+72.5% YoY), revenue of $4 billion (+51.96% QoQ)
- **News Sentiment:** Neutral — mixed articles; 9.47% stock decline on Mar 27, 5.2% decline in another instance
- **Risk Factors:** Moderate — operational risk, regulatory risk, supply chain disruption risk (Strait of Hormuz exposure)
- **Catalysts:** Bullish — margin expansion story, buying opportunity narrative, hardware platform shift
- **Deep Insights:** Shift to hardware platform solutions (servers, storage, HPC networking) provides pricing power vs traditional EMS; well-positioned for data center and AI infrastructure growth

**Example — MIRM Grand Report Search: "Mirum Pharmaceuticals stock price prediction 2026"**  
Articles retrieved include bullish and neutral coverage around LIVMARLI approval trajectory, $125 price target raised by TD Cowen, and 91% stock surge in 2025.

### Events Calendar (Fundamentals → Calendar)

Tracks upcoming corporate events for watchlist tickers in **March 2026**:

**Ex-Dividend Dates:**
- Mar 9: GOOGL Ex-Div
- Mar 11: NVDA Ex-Div
- Mar 12: AGI Ex-Div
- Mar 13: WCC Ex-Div
- Mar 16: META Ex-Div

**Dividend Pay Dates:**
- Mar 16: GOOGL Div Pay
- Mar 20: WMT Div Pay
- Mar 26: AGI, META Div Pay
- Mar 31: WCC Div Pay

**Upcoming Events Sidebar (300d horizon, 12 upcoming):**
CLS Earnings, GOOGL Earnings, JPM Earnings, TSLA Earnings, SOFI Earnings, AGI Earnings, META Earnings all visible in the upcoming panel.

---

## Account Management

### Health Status (8 accounts)

| Account | Status | Latency |
|---|---|---|
| Kuwait | **Offline** | — |
| London | Online | 27.8ms |
| Manisrenggo | Online | 12.8ms |
| Metro | Online | 31.6ms |
| Monaco | **Offline** | — |
| New York | Online | 26.9ms |
| Osaka | Online | 25.4ms |
| Rome | **Offline** | — |

3 accounts offline (Kuwait, Monaco, Rome) at the time of the screenshot — explaining the high failure count in Signal Logs.

---

## Audit Logs & Activity Tracking

### Reconciliation & Audit Log

Located under **Manage → Audit (86 entries)**, the log records every user action with timestamp, user, action type, target account, and detail payload.

**Recent entries (user: hades):**

| Timestamp | Action | Target | Details |
|---|---|---|---|
| 31/3/2026, 05:05:27 | login | — | — |
| 30/3/2026, 18:33:09 | login | — | — |
| 27/3/2026, 03:43:13 | order_modified | osaka | PWR → 566.53 |
| 26/3/2026, 21:43:06 | limit_sell | osaka | HWM qty:5 price:238.75 |
| 26/3/2026, 21:32:56 | limit_sell | osaka | HWM qty:5 price:238.75 |
| 26/3/2026, 21:29:59 | limit_sell | osaka | WCC qty:7 price:277.99 |
| 26/3/2026, 21:28:50 | trade_intervened | osaka | WCC |
| 26/3/2026, 21:25:21 | service_restart | metro | IBC service restart |
| 26/3/2026, 08:58:33 | reconciliation_run | rome | OK |
| 26/3/2026, 08:29:19 | account_hide_toggled | rome / kuwait / manisrenggo / monaco | hidden: false |

### Activity Audit (Manage → Activity Audit)

A broader audit view with **304 total events** categorized by type.

**By Category:**
- Fundamentals: 304 events (100% of all activity)

**Recent Activity:**
- MIRM ticker analyzed — Score: 54.3/100 (multiple times)
- AAPL ticker analyzed — Score: 64.5/100 (multiple times)
- TSLA ticker analyzed — Score: 45.5/100
- RIVN ticker analyzed — Score: 35.0/100
- Bulk imports performed (1–2 tickers each batch)

---

## User Management

Located under **Manage → Accounts**.

| User | Role | Status | Accounts | Mode | Last Login | Created |
|---|---|---|---|---|---|---|
| hades | Master | Active | All | Full | 7m ago | Feb 11, 2026 |
| guest | Client | Active | 1 | Full | Never | Feb 11, 2026 |

- **hades** is the system owner with full access to all 8 accounts
- **guest** is a client user with access to 1 account, never logged in
- New user creation available via "+ New User" button

---

## Key Metrics Snapshot

| Category | Metric | Value |
|---|---|---|
| Portfolio | Total P&L (Realized) | $1,897.04 |
| Portfolio | Open Positions | 13 |
| Portfolio | Win Rate | 94.31% |
| Portfolio | Profit Factor | 4.25 |
| Portfolio | Sharpe Ratio | 7.42 |
| Portfolio | Max Drawdown | -2.06% |
| Portfolio | Avg Hold Time | 74.0 hours |
| Portfolio | Expectancy | $15.42/trade |
| Costs | IBKR Commissions (YTD) | $119.76 |
| Costs | Manager Fee (YTD) | $758.82 |
| Account Health | Online Accounts | 5 / 8 |
| Signals | Total Signals Recorded | 30 |
| Signals | Successful Executions | 2 |
| Fundamentals | Whitelisted Tickers | 26 |
| Best Single Day | March 19, 2026 | $1,830.12 |
| Best Month (shown) | March 2026 | $4,176.73 |

---

*Document generated from NeoTheorem platform screenshots. All financial data reflects the state captured in the provided screenshots.*
